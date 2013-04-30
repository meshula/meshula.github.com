
# Stone Soup

## Exotic and Rare, the C Compiler

Once upon a time, a C compiler was a rare and exotic thing. They weren't commonly available outside of research labs or well funded corporations, and if you were working on a newly minted microprocessor based machine, you were out of luck. In those days you were lucky to have an assembler - sometimes your day started by keying in your program address by address, byte by byte, or by laying some rudimentary tools into RAM from a tape and pushing the Go button. Once upon a time, lifting a machine by its bootstraps was an important start of the development process.

## 3D0G!

The bootstrapping process was well known to old school game coders. We knew all the Apple \]\[ system vectors and how to lay in boot loaders to hijack the startup process straight into a game. The boot ROM in the disk controller card loaded the first 256 bytes of code and jumped into it; increasingly complicated loaders were overlaid until finally your game was in memory, and you were off. The Apple \]\[ was a great to-the-metal playground for learning to code. Its primal tool was a marvelous mini-assembler; no symbols or branch calculation helpers, it had just a simple translator from opcode mnemonics to bytes, and its greatest treasure was the “L” command to list a few more lines of code. It was enough to put together a lot of fun, and to reveal the innermost secrets of programming. Steve Wozniak wrote the mini-assembler. He was a teacher from the start, and the Apple \]\[ monitor was the best school.

## Early Console Hackery

But what about systems not quite so hacker friendly? One of my favorite bootstraps was the one we did at Interphase Technologies on the Colecovision. 

![Aquattack on Colecovision] (http://i148.photobucket.com/albums/s29/meshula/aquattack.jpg "Aquattack on Colecovision")

The Colecovision was an archetypal closed gaming console, popular long before the days of SDKs. When we started we knew nothing about the machine, some components were sealed under epoxy blobs, some parts had numbers removed. Our first order of business was some radical deconstruction. This involved acids, sledgehammers, microscopes, and drops from high altitudes. It also involved diagramming out circuits and other down to earth engineering. We worked out the general capabilities of the machine; most importantly we found that it was sporting a Z80. Going back to an unpulverized unit, we desoldered the CPU and wired in a breakout header, then carefully reattached the CPU above it. We attached a signal analyzer to the breakout header, and built a latch on the address lines so that we could halt the CPU when a certain address was requested from the ROM. We wired LEDs to some outputs. Now we had a debugger! We dumped the system ROM, and it was all straight forward from there. 

We hacked a TRS-80 assembler to target the features of the Colecovision, got some EPROM burners and UV lights to erase the ROMs for the next debugging sessions, and we had a development system. A couple of weeks later, an early success - I was able to display an X in the middle of the screen! It was only a small step from there to a fully functioning game. You can grab my first console ROM, Aquattack, from this [link](Aquattack.zip). It works in any Colecovision emulator. My proudest moment was when the Coleco engineers came by at the 1984 CES during the Colecovision rollout because they had heard I had managed smooth scrolling, despite there being no hardware support for it. The advantage of not having any documentation or guidance was that we didn't know what the machine couldn't do!

## Coding in Silos

In those days we coded in silos. A little light came in from the top, but you might go weeks or months without actually talking with someone who was doing the same things as you. Occasionally you'd hear rumors of something called Siggraph or what have you, but it could take a really long time to track down those sorts of resources. In the mean time you did the next best thing, which was to work it out for yourself... At that time the C compiler was still a rare and exotic thing, but at last the great day arrived - I managed to dredge up the source code for a C compiler off usenet. It was a stunning surprise to discover that the C compiler was written in... C. The source code was not the most readable thing in the world. 

I was determined to work out how it could be that C might be written in C. I turned to Forth, a language I was already familiar with from my work in robotics. Forth is the classic boot-strappable language.

## Bootstrapping a Compiler

At its simplest level, Forth doesn't do much. Here's my implementation of the innermost bit, written in 68000 code (it was certainly a luxury to not have to build the assembler first!):

    doNext MACRO movea.l (a5)+,a3 ; fetch next instruction
              adda.l a4,a3        ; base address  to absolute
              jmp (a3)            ; execute the next word
    ENDM`

Every Forth command ends with the doNext macro which picks up the next opcode to execute, adjusts its address via the base pointer in a4, and jumps through it. To start Forth, a few registers are set up in assembly code to point to the first executable bit of Forth code, and the doNext macro is invoked. That drops into the cold start, written as a series of hard coded Forth word offsets, and so it begins.

    cold bra doColon 
    dc.l coldStuff    ; do all the neat power up stuff 
    dc.l clrPage      ; clear screen 
    dc.l adotqa       ; write the following message
    dc.b 53 
    dc.b 'FUSION FORTH 1.00',13,10 
    dc.b 'by Nick Porcino and Don Palmer' 
    dc.b 27,'e'       ; make cursor visible 
    dc.b 27,'v'       ; wrap around 
    EVEN 
    dc.l cr           ; do a carriage return 
    dc.l shell        ; start the command line stuff 
    dc.l exit         ; end of definition

Once this much code was written in assembly, I wrote a few of the most basic bits such as “compile a Forth word definition”, “save to disk”, and “parse a number”. Little by little enough functionality came on line that more and more sophisticated parts of the language could be written directly in Forth, and the Forth implementation began to compile itself as part of the bootstrap sequence. The file below is part of the start up; it invokes bits of Forth code to keep building up more of the compiler and base libraries. The last file that is loaded is the saving code that allows new Forth programs to be saved out to disk.

    ( Fusion FORTH compilation link file ) 
    " INIT.BLK" ENTER LOAD 
    ENTER GRAFIX.4TH LOAD ENTER MISC.4TH 
    LOAD ENTER FEN.4TH LOAD ENTER FSEL.4TH LOAD 
    CD . CD 
    EDITOR ENTER PRINT.4TH LOAD ENTER 
    EDFEN.4TH LOAD ENTER ED2.4TH LOAD 
    CD . CD CORE ENTER SAVEFORTH.4TH LOAD

If you are interested in digging through the code, a version of Fusion Forth for the Atari ST is available on [github](http://github.com/meshula/Fusion-Forth). Ultimately, I enlisted a couple of friends to help, and we built the language out completely, including a GUI, a text editor, a graphical IDE, some games and utilities, and more, and all of it bootstrapped up from only a few lines of initial assembly code. It's a bit like the old parable of Stone Soup. I never did get around to compiling that C compiler though!

## Stone Soup

The process of bootstrapping goes on around us all the time, in the form of new platforms and protocols. When I think back on the humble beginnings of the computer revolution, and how recently it was a major effort just to display an X on the screen, I am simply awed at how complexity has enfolded upon complexity to turn the microprocessor into an engine of societal change. 

> A kindly old stranger happened upon a village. The villagers locked their doors and windows when they saw him. The old man smiled and asked, "Why are you all so frightened? I am a simple traveler, looking for a warm place to stay for the night, and a meal."

> "There's not a bite to eat in the whole province," said the village headman, "Better keep moving on." 

> "Oh, I have everything I need," said the traveler. "In fact, I was thinking of making some stone soup to share with all of you." He pulled an iron cauldron from his cloak, filled it with water, and began to build a fire under it. He drew an ordinary-looking stone from a silken bag and dropped it into the water. By now, hearing the rumor of food, the villagers were starting to come out of their homes. The stranger sniffed the cauldron and licked his lips.

> "Ahh," the stranger said to himself rather loudly, "I do like a tasty stone soup. Of course, stone soup with cabbage - that's hard to beat." Soon a villager approached hesitantly, holding a small cabbage, and added it to the pot. 

> "Wonderful!!" cried the stranger. "You know, I once had stone soup with cabbage and a bit of salt beef as well, and it was fit for a king." The village butcher managed to find some salt beef... someone found potatoes, onions, carrots, mushrooms... Finally there was a delicious meal for everyone in the village to share. 

> The villager elder offered to buy the stone, but the stranger refused to sell it. As he left town, he came upon some village children standing near the road. He gave the silken bag containing the stone to the youngest child, and whispered to the group, "it's not really a magic stone." He left with a wink. 

> [Source](http://en.wikipedia.org/wiki/Stone_soup)
