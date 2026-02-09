#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import translators as ts
import pandas as pd
from datetime import datetime
from pathlib import Path

# https://github.com/UlionTse/translators

# 翻译语言映射
lanMap = {
    "tha": "th",
    "es_mx": "es",
    "pt": "pt-PT"
}

# 日志文件路径
LOG_FILE = "translation_errors.log"
TRANSLATE_SERVICE = "bing"


def log_error(message):
    """记录错误信息到文本文件"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_message = f"[{timestamp}] {message}\n"
    
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_message)
    
    print(f"{message}")


def translate(text, to_lan, translator):
    """翻译文本"""
    try:
        if not text or pd.isna(text):
            return None
        
        res = ts.translate_text(
            str(text).strip(),
            translator=translator,
            to_language=to_lan
        )
        return res
    except Exception as e:
        error_msg = f"翻译失败: '{text}' -> {to_lan} | 错误: {str(e)}"
        log_error(error_msg)
        return None


def normalize_language_code(lan):
    """规范化语言代码"""
    try:
        tolan = lan.split(".")[0].strip()
        if tolan in lanMap:
            tolan = lanMap[tolan]
        return tolan
    except Exception as e:
        log_error(f"语言代码规范化失败: {lan} | 错误: {str(e)}")
        return None


def translate_xls(xls_file, translator):
    """翻译 Excel 文件"""
    try:
        # 指定 dtype 为 object，防止写入时报错
        df = pd.read_excel(xls_file, dtype=object)
        
        # 获取第一行第三列后面的数据（语言列）
        first_row = df.iloc[0]
        languages = first_row.index[3:]
        
        total_cells = 0
        failed_cells = 0
        
        print(f"\n 开始翻译文件: {xls_file}")
        
        # 遍历每一行第三列数据（中文字符串）
        for index, row in df.iterrows():
            zh_value = row.iloc[2]
            code = row.iloc[0]
            print(f"\n行 {index + 1}: {zh_value}")
            
            for lan in languages:
                # 判断单元格是否为空
                if pd.isna(df.at[index, lan]):
                    # 规范化语言代码
                    tolan = normalize_language_code(lan)
                    
                    if tolan is None:
                        failed_cells += 1
                        total_cells += 1
                        continue
                    
                    # 获取翻译源文本（非英文语言使用英文翻译）
                    source_text = zh_value
                    if tolan != "en":
                        source_text = row.iloc[3]  # 使用英文列作为源
                    
                    # 执行翻译
                    translate_value = translate(source_text, tolan, translator)
                    
                    if translate_value!="need2check":
                        df.at[index, lan] = translate_value
                        print(f"{tolan}: {translate_value}")
                    else:
                        print(f"{source_text}: 翻译失败")
                        failed_cells += 1
                        log_error(f"{xls_file} 行{index + 1} {source_text} > {tolan} 翻译失败")
                    
                    total_cells += 1
            
            # 翻译一行就保存数据（防止数据丢失）
            try:
                df.to_excel(xls_file, engine="openpyxl", index=False)
            except Exception as e:
                log_error(f"保存文件失败 {xls_file}: {str(e)}")
        
        # 重新命名列（去掉扩展名）
        column_mapping = {col: col.split('.')[0] for col in df.columns}
        df.rename(columns=column_mapping, inplace=True)
        
        # 最终保存
        try:
            sheet_name = Path(xls_file).stem  # 获取不带扩展名的文件名
            df.to_excel(xls_file, engine="openpyxl", sheet_name=sheet_name, index=False)
            print(f"\n 文件翻译完成: {xls_file}")
            print(f"   总翻译单元格数: {total_cells}")
            print(f"   失败单元格数: {failed_cells}")
            print(f"   成功率: {((total_cells - failed_cells) / total_cells * 100):.2f}%" if total_cells > 0 else "无需翻译")
        except Exception as e:
            log_error(f"最终保存文件失败 {xls_file}: {str(e)}")
            
    except Exception as e:
        log_error(f"处理文件失败 {xls_file}: {str(e)}")


def main():
    """主函数"""
    # 清空之前的日志（可选）
    # if os.path.exists(LOG_FILE):
    #     os.remove(LOG_FILE)
    
    print("=" * 60)
    print(f"翻译服务: {TRANSLATE_SERVICE}")
    print(f"翻译库版本: {ts.__version__}")
    print(f"错误日志文件: {LOG_FILE}")
    print("=" * 60)
    
    # 获取当前目录
    current_directory = os.getcwd()
    
    # 统计处理的文件数
    xls_files = [
        file for file in os.listdir(current_directory)
        if file.endswith('.xls') and file != "tpl.xls"
    ]
    
    if not xls_files:
        print("当前目录中没有找到 .xls 文件")
        return
    
    print(f"找到 {len(xls_files)} 个 .xls 文件\n")
    
    # 遍历并翻译每个 .xls 文件
    for file in xls_files:
        try:
            translate_xls(file, TRANSLATE_SERVICE)
        except Exception as e:
            log_error(f"处理文件 {file} 时发生异常: {str(e)}")
    
    print("\n" + "=" * 60)
    print("所有文件处理完成")
    print(f"请查看 {LOG_FILE} 获取详细的错误信息")
    print("=" * 60)
    
    os.system("pause")


if __name__ == "__main__":
    main()