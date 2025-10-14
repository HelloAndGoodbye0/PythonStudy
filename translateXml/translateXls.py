
#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import translators as ts
import pandas as pd
# https://github.com/UlionTse/translators

#xls文件批量翻译一个语言

lanMap = {
    "tha":"th",
    "es_mx":"es",
}
#翻译文本
def translate(text,toLan,translator):
    res = ts.translate_text(text,translator=translator,to_language=toLan)
    return res

#翻译xls 
def translateXls(xlsFile,translator):
    df = pd.read_excel(xlsFile,dtype=object) #指定dtype为object，防止写入时报错
    #获取第一行第三列后面的数据
    firstRow = df.iloc[0]
    languages = firstRow.index[3:]
    
    # #遍历每一行第三列数据(en字符串)
    for index, row in df.iterrows():
        zh_value = row.iloc[2]
        code = row.iloc[0]
        print(f"translate:{zh_value}")
        for lan in languages:

                
            #判断df.at[index, lan]中是否为空
            if pd.isna(df.at[index, lan]):
                # print(lan)
                tolan = lan.split(".")[0].strip() 
                #去掉字符串中的空格
                if tolan in lanMap:
                    tolan = lanMap[tolan]
                #其他语言使用en翻译
                if(tolan !="en"):
                    zh_value = row.iloc[3]
                translate_value = translate(zh_value, tolan,translator)
                print(f"\t{tolan}:{translate_value}")
                #写入到对应的cell中
                df.at[index, lan] = translate_value
    
        #翻译一行就保存数据
        df.to_excel(xlsFile,engine="openpyxl",index=False)
        
    column_mapping = {col: col.split('.')[0] for col in df.columns}
    df.rename(columns=column_mapping, inplace=True)
    df.to_excel(xlsFile,engine="openpyxl",index=False)



#翻译服务
translateService = "bing"
print("translateService:",translateService,ts.__version__)
#遍历当前文件夹下面的xls文件
current_directory = os.getcwd()

#获取当前文件夹下面的文件
for file in os.listdir(current_directory):
    if file.endswith('.xls') and file!="tpl.xls":
        print("translatexls:",file)
        translateXls(file,translateService)
        print("translatexls  end:",file)
        
os.system("pause")