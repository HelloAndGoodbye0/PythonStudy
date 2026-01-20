#!/usr/bin/python
# -*- coding: UTF-8 -*-

'''
Author: lee (Optimized with Error Logging)
Date: 2025-09-02
Description: Excel多语言自动翻译工具 (支持多线程、断点续传、错误日志记录)
'''

import os
import sys
import time
import datetime
import pandas as pd
import translators as ts
from concurrent.futures import ThreadPoolExecutor, as_completed
from tqdm import tqdm  # pip install tqdm

# --- 配置项 ---
TRANSLATOR_SERVICE = "bing"  # 翻译服务商
MAX_WORKERS = 10             # 线程数
MAX_RETRIES = 3              # 重试次数
SOURCE_COL_INDEX = 3         # 英文源文所在的列索引 (第4列)
KEY_COL_INDEX = 0            # Key键所在的列索引 (第1列)
ERROR_LOG_FILE = "translation_errors.txt" # 错误日志文件名

def log_error_to_file(error_list):
    """
    将错误列表写入文件
    """
    if not error_list:
        return

    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    with open(ERROR_LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"\n{'='*20} {timestamp} 批次记录 {'='*20}\n")
        for item in error_list:
            f.write(f"文件: {item['file']}\n")
            f.write(f"Key : {item['code']}\n")
            f.write(f"原文: {item['text']}\n")
            f.write(f"错误: {item['error']}\n")
            f.write("-" * 50 + "\n")
    
    print(f"\n[注意] 共有 {len(error_list)} 条翻译失败，详情已保存在: {ERROR_LOG_FILE}")

def translate_text_safe(text, from_lan, to_lan, translator, retries=0):
    """
    带重试机制的翻译函数
    返回: (翻译结果, 错误信息)
    如果成功，错误信息为 None
    如果失败，翻译结果为 原文，错误信息为 异常字符串
    """
    if not text or pd.isna(text) or str(text).strip() == "":
        return "", None
    
    try:
        res = ts.translate_text(
            str(text), 
            translator=translator, 
            from_language=from_lan, 
            to_language=to_lan,
            timeout=10
        )
        return res, None
    except Exception as e:
        if retries < MAX_RETRIES:
            # 失败等待一下再重试
            time.sleep(1)
            return translate_text_safe(text, from_lan, to_lan, translator, retries + 1)
        else:
            return text, str(e) # 最终失败，返回原文和错误信息

def process_row(row_data, to_lan, translator):
    """
    处理单行数据
    """
    index, code, en_text = row_data
    
    # 逻辑判断：如果是 name_ 或 language_ 开头，不翻译
    code_str = str(code)
    if code_str.startswith("name_") or code_str.startswith("language_"):
        return index, en_text, None # 视为成功，无错误
    
    # 执行翻译
    translated_text, error_msg = translate_text_safe(en_text, "en", to_lan, translator)
    return index, translated_text, error_msg

def translate_xls(xls_file, add_lan):
    """
    处理单个Excel文件
    """
    print(f"正在处理文件: {xls_file}")
    
    try:
        df = pd.read_excel(xls_file)
    except Exception as e:
        print(f"读取文件 {xls_file} 失败: {e}")
        return

    if len(df.columns) <= SOURCE_COL_INDEX:
        print(f"跳过文件 {xls_file}: 列数不足。")
        return

    # 准备任务
    tasks = []
    original_columns = list(df.columns)
    
    # 提取数据 (Index, Code, En_Value)
    for idx, row in df.iterrows():
        code = row.iloc[KEY_COL_INDEX]
        en_value = row.iloc[SOURCE_COL_INDEX]
        tasks.append((idx, code, en_value))

    translation_results = [None] * len(df)
    file_errors = [] # 当前文件的错误列表

    print(f"  - 开始翻译 {len(tasks)} 条目到 [{add_lan}]...")
    
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_info = {
            executor.submit(process_row, task, add_lan, TRANSLATOR_SERVICE): task 
            for task in tasks
        }
        
        # 这里的 task 包含 (idx, code, en_value)
        
        for future in tqdm(as_completed(future_to_info), total=len(tasks), unit="key"):
            idx, code, original_text = future_to_info[future]
            try:
                row_idx, result_text, error_msg = future.result()
                translation_results[row_idx] = result_text
                
                # 如果有错误信息，记录下来
                if error_msg:
                    file_errors.append({
                        "file": xls_file,
                        "code": code,
                        "text": original_text,
                        "error": error_msg
                    })

            except Exception as e:
                print(f"  - 线程严重异常: {e}")

    # --- 记录错误日志 ---
    if file_errors:
        log_error_to_file(file_errors)

    # --- 数据回写 ---
    clean_columns = [str(col).split('.')[0] for col in original_columns]
    df.columns = clean_columns

    if add_lan in df.columns:
        df[add_lan] = translation_results
    else:
        df.insert(len(df.columns), add_lan, translation_results)

    # 保存文件
    try:
        output_file = xls_file
        # if xls_file.endswith('.xls'):
        #     output_file = xls_file + 'x' 
        sheet_name = xls_file.split('.')[0]
        df.to_excel(output_file,sheet_name=sheet_name, engine="openpyxl", index=False)
        print(f"  - 保存成功: {output_file}\n")
    except Exception as e:
        print(f"  - 保存文件失败: {e}")

def main():
    if len(sys.argv) < 2:
        print("使用方法: python addOneLan.py <目标语言代码>")
        sys.exit(1)

    add_lan = sys.argv[1]
    current_directory = os.getcwd()
    
    # 清空之前的错误日志(可选，如果想保留历史记录则注释掉这行)
    if os.path.exists(ERROR_LOG_FILE):
        os.remove(ERROR_LOG_FILE)
    
    files_found = False
    for file in os.listdir(current_directory):
        if (file.endswith('.xls') or file.endswith('.xlsx')) and file != "tpl.xls" and not file.startswith("~$"):
            files_found = True
            translate_xls(file, add_lan)

    if not files_found:
        print("未找到 Excel 文件。")

    print("任务完成。")
    if os.name == 'nt':
        os.system("pause")

if __name__ == "__main__":
    main()