+++ 
date = "2008-09-10"
title = "Excel条件格式化"
tags = ["excel"]
authors = ["Weiwei"]
categories = []
series = []
+++

刚才下载了最近在KGS的对局记录，表格格式如下：

| White             | Black             | Type   | Result |
|-------------------|-------------------|--------|--------|
| Hactar \[3d\]     | Artem \[1d\]      | Ranked | W+Res. |
| Hactar \[3d\]     | dariari \[2d\]    | Ranked | W+Res. |
| Hactar \[3d\]     | oayamado \[3d\]   | Ranked | W+17.5 |
| Hactar \[3d\]     | gukkei \[3d\]     | Ranked | W+Res. |
| Hactar \[3d\]     | hansuiob \[2d\]   | Ranked | W+Res. |
| Hactar \[3d\]     | matane11 \[3d\]   | Ranked | B+11.5 |
| Hactar \[3d\]     | gokichiB \[2d\]   | Ranked | W+Res. |
| Hactar \[3d\]     | man8888 \[?\]     | Ranked | W+Res. |
| Hactar \[3d\]     | novak \[3d\]      | Ranked | W+3.5  |
| Horizoneer \[3d\] | Hactar \[3d\]     | Ranked | B+Res. |
| Hactar \[3d\]     | Frusci \[2d\]     | Ranked | B+Res. |
| Hactar \[3d\]     | dangerboy \[2d\]  | Ranked | W+Res. |
| Hactar \[3d\]     | miyosi1921 \[2d\] | Ranked | B+Res. |
| Hactar \[3d\]     | WildW \[1k\]      | Ranked | W+50.5 |
| Hactar \[3d\]     | BadShape \[2d\]   | Ranked | B+Res. |

打算把胜局用高亮表示出来，自然要用到Excel的条件格式化功能了。

胜局的条件是：

1.  执白胜。第一列是我的名字“Hactar”，最后一列包含“W+”，或者，
2.  执黑胜。第二列是我的名字“Hactar”，最后一列包含“B+”

这么复杂的条件，默认的条件格式化选项是不够用了，于是自然少不了使用逻辑公式啦。

名字好判断，用等于号就可以了：

`A1="Hactar [3d]"`

第二部分有点麻烦，包含某个字串用什么验证呢？好像只能用Search：

`SEARCH("W+",D2)`

似乎也不坏，搜索到时会返回1。不过当没有搜索到就不好玩了，返回的是“值错误”，添乱。最好让它能和前一个条件一样，返回True和False就好了，于是来了改进版：

`NOT(ISERR(SEARCH("W+",D2)))`

这回保险了，如果SEARCH返回的不是错误信息，这就是我要的结果了。合并一下，终结版如下：

```
=OR(AND(A2="Hactar [3d]",NOT(ISERR(SEARCH("W+",D2)))),AND(B2="Hactar [3d]",NOT(ISERR(SEARCH("B+",D2)))))
```

两个AND，一个OR，总算搞定。感觉好像是在写lisp一样，一堆的括号哈哈。
