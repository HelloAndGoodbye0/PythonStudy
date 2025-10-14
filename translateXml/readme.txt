使用说明
1 按照tpl.xml中的格式写好 第一行的数据 code id zh en...   可以复制tpl.xml文件 然后改名

2 可以自己写好中文或者中英，
  2.1 如果只写了中文,翻译的时候会从中文翻译到EN,然后用EN翻译成其他语言
  2.2 如果写了中英文,翻译不会从中文翻译到EN，直接EN翻译成其他语言

注意 当文本中是富文本,可能会有点问题:
    比如 Cash up to <color=#FFFF00>%s</color>can be claimed 翻译成其他语言 可能会导致 <color=#FFFF00>%s</color>不对
    
暂时只支持 pt vi tha es_mx bn id ar	my几种语言的翻译
