+++ 
date = "2015-03-26"
title = "Mel Kaye的故事"
tags = ["翻译"]
authors = ["Weiwei"]
categories = []
series = []
+++

真·程序员用十六进制码编程


主角Mel Kaye，后排最右

【这是一篇翻译，原文链接[在此](http://www.cs.utah.edu/~elb/folklore/mel.html)，这是1983年的一篇仿史诗体文章，所以里边提到“当今”指的都是80年代早期。作者Ed Nather，主角Mel Kaye均已年长去世。TLDR:真·程序员用机器代码编程，真·程序员一个字节一个字节地手动优化存储器物理寻址，真·程序员不但技术高超，而且有原则有个性。】

最近有一篇展现编程的“大丈夫”一面的文章，里边有这么一句粗暴直接的话：

    真·程序员用FORTRAN编程

也许现在的程序员是这样吧，
在这个堕落腐朽的年代
到处都充斥着淡啤酒、计算器、还有“用户友好”的软件
但是在过去美好的日子里，
“软件”还是一个听上去有点滑稽的新词
而真·计算机是使用磁鼓和真空管组装起来的，
真·程序员写的则是机器代码。
不是FORTRAN，不是RATFOR，甚至，连汇编语言都不是。
机器·代码。
实实在在、原汁原味、深不可测的十六进制代码。
直截了当。

为了避免新一代程序员
对这段辉煌的历史一无所知
我觉得自己义不容辞，我要用文字
努力填补这一段代沟，
真·程序员是怎样写代码的
我把这个程序员叫做Mel，
因为这就是他的名字。
LGP-30

我是在Royal McBee计算机公司上班时第一次碰到Mel的，
这是隶属于Royal Typewriter的一家子公司，现在已经解散了
Royal Typewriter制造了LGP-30，
一种小型的，低价的（以当时的标准）
磁鼓存储计算机，
而且刚刚开始制造
RPC-4000，一种大大改进了的
更大、更好、更快的——磁鼓存储计算机。
RPC-4000

我当时被雇来为这个新机器
写一个Fortran编译器，而Mel则负责引导我了解这台新机器。

Mel对编译器不感冒。
“如果程序不能重写自己的代码，”
Mel说，“那它能有多挫啊？”

用十六进制代码，
Mel写了公司最受欢迎的计算机程序
程序运行在LGP-30上面
能跟人玩“二十一点”，
每次计算机展会上
它都能戏剧般的吸引到不少人
IBM的销售都会围成一圈，对它指指点点
究竟展览对于销售有没有帮助
我们从来没有讨论过
21点的程序是用打印机输出的，当时还不知道什么叫显示器

Mel的任务，是为
RPC-4000重写二十一点游戏
(平台移植是什么意思？没听说过)
新机器有一个一加一寻址模式，
每一个机器指令
和它的操作代码
以及操作所需的内存
都拥有一个第二地址，用来告诉你
下一个指令在旋转磁鼓上的具体位置

用现代术语讲
就是相当于每个指令都捆绑了一个goto
放到Pascal的烟管里抽一口吧
磁鼓

Mel对RPC-4000情有独钟
因为他可以优化自己的代码
他可以手动设置指令在磁鼓上的存储位置，
然后当一条指令执行完的时候，
磁头会正好停到下一条指令所处的位置上
然后下条指令就可以好不耽误时间地立即执行了
有一个程序也可以做这件事
叫做“优化汇编器”
但Mel拒绝使用它。

“你永远不知道它会把东西放到哪里，”
他解释道，“所以你只能使用不同的常量。”

这句评论我花了很久才明白是什么意思，
因为Mel知道每一条
操作指令的数字值，
而且手动分配了磁鼓的存储地址，
他写的每一条指令，
都可以被认为是一个数字常量。
他可以把比如说一条“加值”指令，
当作一个数值去做乘法，
如果“加值”指令对应的正好是一个合适数值的话。
别人要改他的代码可不容易。

我把Mel手动优化过的代码
和优化汇编器“按摩”过的代码比较了一下，
Mel的总是跑得更快。
因为在那会“自顶向下”的程序设计
还没被发明，
而且就算发明了，Mel也不会去使用的。

他会先把程序循环中最里层的部分写好，
让这部分内容优先
运行在磁鼓最合适的位置上。
优化汇编器做不到这点，它没有这么聪明。
Mel也从来不会去写延时循环，
即使Flexowriter这种笨重的输出设备
需要在输出之间延时才能工作正常。
新式磁鼓

他只需把磁鼓上的指令放在特殊位置上，
这样下一条指令会刚好跳过磁头，
然后磁鼓只能重新旋转一圈
才能找到这条指令。这样就正好实现了延时。
他为这个流程创造了一个很好记名字。
虽然“最优”是一个绝对化的术语，
就和“独一无二”一样，但在习惯使用过程中
它也变得相对化了：
“不是特别最优”或“不够最优”
或者“不是特别最优”。
Mel把导致磁鼓最大延时的存储地址叫做“最劣”址。

当他写完“二十一点”程序
并且让它运行起来后
（就连初始程序都被优化过了，
他骄傲地说），
他从销售部门得到一个修改·需求
程序用了一个优美的（优化过的）
随机数生成器
用来洗牌以及处理牌局，
有的销售人员认为这个游戏太公正了，
因为有时候客户会输掉。
他们想要Mel修改程序，
让可以通过控制台的感知开关
调整获胜几率，这样就可以让客户能赢了。

Mel很抗拒
他觉得这是绝对的不诚实，
的确也是
他还觉得这是对他作为一个程序员的人格侮辱，
这话也没错
所以他就拒绝做这件事。
销售部·领导和Mel谈过，
大·老板也和Mel谈过，程序员·同事也劝过，
最后Mel还是让步了，去写了代码
但他把条件写反了，
于是当感知开关打开以后，
程序就会作弊，不是会输，而是次次会赢。
Mel对他的杰作相当满意，
说他潜意识里有无法控制的道德感，
并且坚决拒绝修正这个问题。

Mel离职另谋高就以后，
大·老板让我看看代码
看能不能把这个条件判断修改过来。
虽然不怎么情愿，我还是答应了。
追踪Mel的代码是一场真正的历险。
我常常觉得编程是一种艺术形式，
它的真正价值只能被
别的熟知这种艰深艺术的人理解；
一些美妙的细节和智慧的处理，
常人可能永远都看不到，更不用说去欣赏了，
软件的过程天然就是这样子的。
通过阅读一个人的代码，
你可以了解很多关于这个人的东西，
即使十六进制代码也是一样的。
Mel在我的眼里，就是一个不为外人所知的天才。

也许最让我吃惊的
是我在里边找到了一个没有条件判断的循环。
没有条件判断。没有
常识告诉我这必须是一个闭循环，
程序走到这里会永远不停地循环下去。
但实际情况是，程序可以直接跑进这段代码
然后再安全地抵达了另外一边。
我花了两个星期才弄明白这是怎么回事。

RPC-4000计算机有一个相当现代化的功能
叫做索引注册器。
它可以让程序员写一个循环，
在里边使用索引过的指令；
不过每使用一次，
索引注册器里的数字
就会被加到这条指令的地址上面，
这样它就会指向
序列中的下一条数据。
不过他就需要每次
手动为索引注册器增值。
Mel从来没这么做过。

取而代之的是，他会把指令拖到一个机器注册器里，
为它的地址加1，
再把它存储回来。
然后他再直接从注册器中
执行修改过的指令。
循环在写的时候就
把增加的执行时间也算进去了——
这条指令执行完后，
下一条就会刚好处在磁头的阅读位置上，
可以直接继续。
但循环里边没有条件判断。

最重要的线索出现了，
当我我注意到索引注册器位元的时候，
这个位元处在指令的地址码和操作码之间，
而且是开启的——
尽管Mel从来没使用过索引注册器，
所以此处一直是为0的。
当我看明白的时候，我简直被亮瞎了。

他把工作的数据
放在了存储的最顶端——
指令能处理的最大的地址值——
所以，当最后一条数据处理完以后，
增加指令地址
就会让地址发生溢出。
然后就会导致操作码被加1，
让它成了指令集里的下一条指令：
一条跳过指令。
于是理所当然，下一条程序指令
就到了地址位置0，
然后程序就开心地运行下去了。

我没有和Mel再联系过，
所以我不知道他是不是
面对着洪水般的编程技术变革
已经让步了。
我喜欢想象他没有让步。
无论如何，
我已经被他的技术深深折服，
不想再去找那处有问题的条件判断了。
我告诉大·老板我找不出。
大·老板听了也没觉得奇怪。

当我离开这家公司的时候，
在你打开对应的感知开关以后，
“二十一点”还是会作弊的，
我觉得这样挺不错。
深入研究了真·程序员的代码，
我觉得自己有点心累。

---

原文


The Story of Mel, a Real Programmer

This was posted to USENET by its author, Ed Nather (utastro!nather), on May 21, 1983.

A recent article devoted to the *macho* side of programming made the bald and unvarnished statement:

         Real Programmers write in FORTRAN.

     Maybe they do now,
     in this decadent era of
     Lite beer, hand calculators, and "user-friendly" software
     but back in the Good Old Days,
     when the term "software" sounded funny
     and Real Computers were made out of drums and vacuum tubes,
     Real Programmers wrote in machine code.
     Not FORTRAN.  Not RATFOR.  Not, even, assembly language.
     Machine Code.
     Raw, unadorned, inscrutable hexadecimal numbers.
     Directly.

     Lest a whole new generation of programmers
     grow up in ignorance of this glorious past,
     I feel duty-bound to describe,
     as best I can through the generation gap,
     how a Real Programmer wrote code.
     I'll call him Mel,
     because that was his name.

     I first met Mel when I went to work for Royal McBee Computer Corp.,
     a now-defunct subsidiary of the typewriter company.
     The firm manufactured the LGP-30,
     a small, cheap (by the standards of the day)
     drum-memory computer,
     and had just started to manufacture
     the RPC-4000, a much-improved,
     bigger, better, faster --- drum-memory computer.
     Cores cost too much,
     and weren't here to stay, anyway.
     (That's why you haven't heard of the company,
     or the computer.)

     I had been hired to write a FORTRAN compiler
     for this new marvel and Mel was my guide to its wonders.
     Mel didn't approve of compilers.

     "If a program can't rewrite its own code",
     he asked, "what good is it?"

     Mel had written,
     in hexadecimal,
     the most popular computer program the company owned.
     It ran on the LGP-30
     and played blackjack with potential customers
     at computer shows.
     Its effect was always dramatic.
     The LGP-30 booth was packed at every show,
     and the IBM salesmen stood around
     talking to each other.
     Whether or not this actually sold computers
     was a question we never discussed.

     Mel's job was to re-write
     the blackjack program for the RPC-4000.
     (Port?  What does that mean?)
     The new computer had a one-plus-one
     addressing scheme,
     in which each machine instruction,
     in addition to the operation code
     and the address of the needed operand,
     had a second address that indicated where, on the revolving drum,
     the next instruction was located.

     In modern parlance,
     every single instruction was followed by a GO TO!
     Put *that* in Pascal's pipe and smoke it.

     Mel loved the RPC-4000
     because he could optimize his code:
     that is, locate instructions on the drum
     so that just as one finished its job,
     the next would be just arriving at the "read head"
     and available for immediate execution.
     There was a program to do that job,
     an "optimizing assembler",
     but Mel refused to use it.

     "You never know where it's going to put things",
     he explained, "so you'd have to use separate constants".

     It was a long time before I understood that remark.
     Since Mel knew the numerical value
     of every operation code,
     and assigned his own drum addresses,
     every instruction he wrote could also be considered
     a numerical constant.
     He could pick up an earlier "add" instruction, say,
     and multiply by it,
     if it had the right numeric value.
     His code was not easy for someone else to modify.

     I compared Mel's hand-optimized programs
     with the same code massaged by the optimizing assembler program,
     and Mel's always ran faster.
     That was because the "top-down" method of program design
     hadn't been invented yet,
     and Mel wouldn't have used it anyway.
     He wrote the innermost parts of his program loops first,
     so they would get first choice
     of the optimum address locations on the drum.
     The optimizing assembler wasn't smart enough to do it that way.

     Mel never wrote time-delay loops, either,
     even when the balky Flexowriter
     required a delay between output characters to work right.
     He just located instructions on the drum
     so each successive one was just *past* the read head
     when it was needed;
     the drum had to execute another complete revolution
     to find the next instruction.
     He coined an unforgettable term for this procedure.
     Although "optimum" is an absolute term,
     like "unique", it became common verbal practice
     to make it relative:
     "not quite optimum" or "less optimum"
     or "not very optimum".
     Mel called the maximum time-delay locations
     the "most pessimum".

     After he finished the blackjack program
     and got it to run
     ("Even the initializer is optimized",
     he said proudly),
     he got a Change Request from the sales department.
     The program used an elegant (optimized)
     random number generator
     to shuffle the "cards" and deal from the "deck",
     and some of the salesmen felt it was too fair,
     since sometimes the customers lost.
     They wanted Mel to modify the program
     so, at the setting of a sense switch on the console,
     they could change the odds and let the customer win.

     Mel balked.
     He felt this was patently dishonest,
     which it was,
     and that it impinged on his personal integrity as a programmer,
     which it did,
     so he refused to do it.
     The Head Salesman talked to Mel,
     as did the Big Boss and, at the boss's urging,
     a few Fellow Programmers.
     Mel finally gave in and wrote the code,
     but he got the test backwards,
     and, when the sense switch was turned on,
     the program would cheat, winning every time.
     Mel was delighted with this,
     claiming his subconscious was uncontrollably ethical,
     and adamantly refused to fix it.

     After Mel had left the company for greener pa$ture$,
     the Big Boss asked me to look at the code
     and see if I could find the test and reverse it.
     Somewhat reluctantly, I agreed to look.
     Tracking Mel's code was a real adventure.

     I have often felt that programming is an art form,
     whose real value can only be appreciated
     by another versed in the same arcane art;
     there are lovely gems and brilliant coups
     hidden from human view and admiration, sometimes forever,
     by the very nature of the process.
     You can learn a lot about an individual
     just by reading through his code,
     even in hexadecimal.
     Mel was, I think, an unsung genius.

     Perhaps my greatest shock came
     when I found an innocent loop that had no test in it.
     No test.  *None*.
     Common sense said it had to be a closed loop,
     where the program would circle, forever, endlessly.
     Program control passed right through it, however,
     and safely out the other side.
     It took me two weeks to figure it out.

     The RPC-4000 computer had a really modern facility
     called an index register.
     It allowed the programmer to write a program loop
     that used an indexed instruction inside;
     each time through,
     the number in the index register
     was added to the address of that instruction,
     so it would refer
     to the next datum in a series.
     He had only to increment the index register
     each time through.
     Mel never used it.

     Instead, he would pull the instruction into a machine register,
     add one to its address,
     and store it back.
     He would then execute the modified instruction
     right from the register.
     The loop was written so this additional execution time
     was taken into account ---
     just as this instruction finished,
     the next one was right under the drum's read head,
     ready to go.
     But the loop had no test in it.

     The vital clue came when I noticed
     the index register bit,
     the bit that lay between the address
     and the operation code in the instruction word,
     was turned on ---
     yet Mel never used the index register,
     leaving it zero all the time.
     When the light went on it nearly blinded me.

     He had located the data he was working on
     near the top of memory ---
     the largest locations the instructions could address ---
     so, after the last datum was handled,
     incrementing the instruction address
     would make it overflow.
     The carry would add one to the
     operation code, changing it to the next one in the instruction set:
     a jump instruction.
     Sure enough, the next program instruction was
     in address location zero,
     and the program went happily on its way.

     I haven't kept in touch with Mel,
     so I don't know if he ever gave in to the flood of
     change that has washed over programming techniques
     since those long-gone days.
     I like to think he didn't.
     In any event,
     I was impressed enough that I quit looking for the
     offending test,
     telling the Big Boss I couldn't find it.
     He didn't seem surprised.

     When I left the company,
     the blackjack program would still cheat
     if you turned on the right sense switch,
     and I think that's how it should be.
     I didn't feel comfortable
     hacking up the code of a Real Programmer.

This is one of hackerdom's great heroic epics, free verse or no. In a few spare images it captures more about the esthetics and psychology of hacking than all the scholarly volumes on the subject put together.

[1992 postscript --- the author writes: "The original submission to the net was not in free verse, nor any approximation to it --- it was straight prose style, in non-justified paragraphs. In bouncing around the net it apparently got modified into the `free verse' form now popular. In other words, it got hacked on the net. That seems appropriate, somehow."]
