'''
Author: lee 497232807@qq.com
Date: 2025-09-02 08:57:44
LastEditors: lee 497232807@qq.com
LastEditTime: 2025-09-02 09:03:18
FilePath: \多语言xml翻译\addOneLan.py
Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
'''

#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import sys
import translators as ts
import pandas as pd
# https://github.com/UlionTse/translators

#xls文件批量翻译一个语言

#翻译文本
def translate(text, fromLan,toLan,translator):
    res = ts.translate_text(text,translator=translator,from_language=fromLan,to_language=toLan)
    return res

#翻译xls 默认从en到addLan
def translateXls(addLan,xlsFile,translator):
    df = pd.read_excel(xlsFile)
    lanData = [] #添加列的数据
    colName = df.columns.to_list()
    #遍历每一行第三列数据(en字符串)
    for index, row in df.iterrows():
        en_value = row[3]
        code = row[0]
        print(f"translate:{en_value}")
        if(code.startswith("name_") or code.startswith("language_")):
            translate_value = en_value
        else:
            translate_value = translate(en_value, "en", addLan,translator)
        print(f"\t{addLan}:{translate_value}")
        lanData.append(translate_value)
  
    #重复列名修改 不要.1的后缀
    column_mapping = {col: col.split('.')[0] for col in df.columns}
    df.rename(columns=column_mapping, inplace=True)
    
    #判断是否有对应addlan的列,没有就添加
    if addLan not in colName:  
        # colName.append(addLan)
        df.insert(len(colName), addLan, lanData)
    else:
        df[addLan] = lanData

    df.to_excel(xlsFile,engine="openpyxl",index=False)


# 获取输入的参数作为翻译的语言
args = sys.argv
#需要添加的语言
addLan = args[1]
#翻译服务
translateService = "bing"
#遍历当前文件夹下面的xls文件
current_directory = os.getcwd()
#获取当前文件夹下面的文件
for file in os.listdir(current_directory):
    if file.endswith('.xls') and file!="tpl.xls":
            print("translateXls:",file)
            translateXls(addLan,file,translateService)



os.system("pause")




