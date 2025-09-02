使用说明
按照tpl.xml中的格式写好  code id zh en 4列 需要新增翻译的数据


然后放入当前文件夹 ，然后运行translateXls.exe,后面的多语言会自动翻译

注意 当文本中是富文本,可能会有点问题:
    比如 Cash up to <color=#FFFF00>%s</color>can be claimed 翻译成其他语言 可能会导致 <color=#FFFF00>%s</color>不对

暂时只支持 pt vi tha es_mx bn id ar	my几种语言的翻译
