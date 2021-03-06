
Communicating Sequential Processes
==================================

The book *Communicating Sequential Processes* introduces a formal calculus of processes; 
its formalisms and structures are reflected in the design of modern concurrent languages 
and libraries such as occam, libthread, Go, CHP, and more.

This article is a brief overview of the book Communicating Sequential Processes, by 
C.A.R. Hoare, June 21, 2004, first published in 1985 by Prentice Hall International, 
and obtained online at: <http://www.usingcsp.com/>

I took a lot of notes while reading the book, and thought that the notes might help 
others tackle the subject matter. I'd appreciate any corrections or suggestions on how 
to make this article more useful.

Hoare's student [Bill Roscoe](http://web.comlab.ox.ac.uk/people/Bill.Roscoe/) developed 
the ideas further, and published a new book in 1997 (revised through 2005) called 
*The Theory and Practice of Concurrency.* In this revised version of my CSP article, 
I factor in my notes on reading Roscoe. Roscoe's book is available online at 
[this location](http://web.comlab.ox.ac.uk/oucl/work/bill.roscoe/publications/68b.pdf). 

Introduction
============

CSP is a system for describing the behavior of concurrent systems, which are systems that 
perform a number of activities at the same time. The systems need to coordinate their 
activities in some way, and communicate between themselves. The systems might be as 
loosely coupled as workstations on a network, or as integrated as a number of components 
on a single VLSI chip. The intent of the theory of CSP is threefold: 


* To describe interesting applications
* Be efficiently implementable
* Assist the programmer in specification, design, verification, and validation of systems

CSP is a calculus of interaction.

Processes
=========

A process is the behavior pattern of an object. Behavior is described as a pattern wherein 
events lead to other behaviors. Events are instantaneous actions - atomic actions 
without duration. 
There's nothing special about an event, they imply no causality. Events are not considered 
to be sent or received, rather, they merely represent that something has occurred, and 
therefore a further pattern of action is expected. Another way to describe an event is 
as a synchronization primitive that one or more processes can engage with.

We might denote some sample processes:

    (guestsArrived -> LETS_EAT) (keyTurned -> ENGINE_STARTS)
    
Generally, we might write:

    (x -> P)
    
which we read as "x then P". The process described engages in event "x", then behaves as 
described by "P". The arrow operator always takes an event on the left and a process 
on the right. The arrow operator is right associative, which means that we could write: 

    (x -> (y -> P)) = (x -> y -> P)
    
CSP defines two special primitive processes, STOP and SKIP. SKIP is a process that is 
always ready to go, and immediately terminates successfully. STOP is a process that is 
never ready, does nothing, and never terminates. It is mostly used as dummy item.

Since actions are instantaneous, we need to represent extended actions as a pair of events 
indicating the start and the end. In CSP, timing is ignored since timing can be treated 
independently of logical correctness. Simultaneity is not a concept; if it is important 
that two events occur simultaneously, they are treated as a single event.

A machine that accepts two coins, dispenses two chocolates, and stops can be described as:

    (coin -> (choc -> (coin -> (choc -> STOP))))

First, the machine waits for a coin insert event. Then it waits for a chocolate extracted event, then a coin inserted event, a chocolate extracted event, and finally it executes the STOP process.
    
If this sequence was to repeat indefinitely, recursion could be used. A clock might be 
described by ticks:

    (tick -> CLOCK)
    
A CLOCK can emit a single tick, and we can define 

    CLOCK = (tick -> CLOCK)
    
This can then be expanded via substitution as many times as we want. 

    CLOCK = (tick -> (tick -> (tick -> (tick -> (tick -> CLOCK)))))

    
If the chocolate vending machine described earlier has an unlimited supply of chocolate, 
it could be defined as 

    VM = (coin -> (choc -> VM))

These recursions have a prefix, which is to say: they start with a one or more events. 
Such an equation is called guarded, and all guarded equations have a solution.
 
We can prove that all guarded equations have a solution: every guarded equation can have a 
process substituted that just makes the chain longer but still satisfies the original 
equation.

This lets us say that two processes that behave the same are the same process, which 
comes in handy for proofs and simplifications.

Recursion can be mutual:

    CLOCKA = (ticka -> CLOCKB) 
    CLOCKB = (tickb -> CLOCKA)

Choices are indicated with a bar. This equation 

     (x -> P | y -> Q | z -> R)

says that if x occurs behavior P results; if event y occurs behavior Q happens; and if 
z occurs, R results. No other event is engaged with this process.

This idea can be used to implement a copy process. 

    COPYBIT = (in.0 -> out.0 -> COPYBIT | in.1 -> out.1 -> COPYBIT)

The only distinction between the notions of input and output in a process is that the 
environment can provide an input of in.0, or in.1, but the corresponding output has no 
choices.

Traces
------

Traces are a record of events. The trace of the coin for chocolate machine described 
earlier would be 

    <coin, choc, coin, choc, STOP>

Various algebraic laws are introduced, ultimately for the purpose of proving whether two 
traces are equivalent. Two processes that generate the same trace are identical, so the 
utility of proving traces are identical is that it might be easier to algebraically reduce 
traces to each other than it might be to reduce the corresponding processes in order to 
prove equivalence.

Specifications are defined (for example, x never exceeds 10); and satisfactions go with 
them - one asserts that for every possible observation of a process, the specification 
will be true. An algebra for conjunction of specifications is developed. The notions of 
traces and specifications are important for proving that a system works properly.

Concurrency
===========

    P || Q 

indicates two processes that share an alphabet and proceed in lock-step synchronization; 
in other words, in parallel, not concurrently. Should one process expect an event that 
does not come from the other, a deadlock occurs. Deadlock means that each process is 
prepared to engage in further action; but the the further actions are different, and 
nothing further can happen.

An algebra on the || operator is defined, and the dining philosophers problem explored, 
including the deadlock situation where all philosophers sit simultaneously. Various 
solutions to the problem are derived.

Algebraic tools on concurrency are developed, allowing for various transformations on 
processes. The utility of the algebra is that processes can be broken down, and composed 
such that details of processes can be hidden so that processes can operate in a common 
environment but not interact with each other. Actions can be further labeled so that the
action engages only a single process. 

Nondeterminism
==============

Internal and external choice.
              _
R = (a -> B) | | (b -> C)

R will choice internally whether to respect the first or second process.

External choice

R = (a -> B) [] (b -> C)

The first or second process will be selected externally, for example

Nondeterminism is introduced to describe situations where multiple actions are possible, 
but the choice cannot be anticipated; it is made at the time the action occurs. For 
example, a process cannot know which lever a user might pull, until the moment the lever 
is pulled:

    (leftLever -> A) [] (rightLever-> B)
 
Rules are developed to determine what should happen if two events are available 
simultaneously, or if an event can satisfy two processes simultaneously.

Refusals are defined as the set of actions that result in deadlock in a first step. The 
existence of a known refusal can be used to implement an alternate choice that does not 
result in a deadlock for the requested action.

Concealment is introduced to hide members of the alphabet whose occurrence requires 
simultaneous participation with the environment. In other words, if an action is strictly 
an internal transition, there is no need to expose that action to the alphabet the 
environment can use on a process. Unfortunately, the introduction of concealment means 
that guarded recursions are not constructive, and therefore liable to have more than one 
solution. Divergence describes the case where non-determinism is required to describe a 
process since no solution is otherwise possible.

Interleaving is similar to the || operator. If two processes with the same alphabet 
are interleaved -

    P ||| Q

then one or the other of the processes can engage an action. If P cannot accept an action, 
then Q can take it, and vice versa. If both can accept it, then one or the other will take 
it, nondeterministically. If neither can take it, deadlock results. An algebra is 
developed, as well as the behavior of traces and refusals, and the use of specifications.

(a -> b -> STOP) ||| (c -> b -> STOP)

means that a, c, b, STOP and c, a, b, STOP are both valid sequences. 

Communications
==============

A communication is a special class of event described as a pair, c.v where c is the name 
of a channel where the communication takes place, and v is the value of the passed message. 
There are functions that can pick these apart:

    channel(c.v) = c, message(c.v) = v
    
Channels are defined to be unidirectional, and between two processes. A channel is a 
potential set of events; one event for each value that might be communicated down the 
channel. Channels are named into the alphabet of actions, for example, a copy process 
might be written as

    COPY(left, right) = (left?x -> right!x -> X)

The question mark denotes input, the exclamation mark, output, so the equation says any 
value x communicable on left arriving on the left channel results in the value x being 
emitted from the right channel, followed by process X.

More complex expressions are introduced using if/then/else statements to perform 
transformations on an input stream. The choice operator can be used to invoke different 
processes when different actions arrive, as developed in previous chapters. The concurrency 
operator || is extended when P || Q communicate via channel. In that case, the definition 
of concurrent actions is extended to say that actions can occur when P outputs a value on 
c that is expected as an input on Q, and vice versa. Communication can thus be regarded 
as a special case of the prefix operator. Internal communications can be concealed. 
Similarly to previous chapters, proving the absence of deadlock between communicating 
processes can be proven.

Since two processes are connected by a single channel, any network of non-stopping 
processes free of cycles cannot deadlock, since any acyclic graph can be decomposed 
into subgraphs connected only by a single arrow.

Various examples show how data flow networks can be set up to compute streams of results 
from streams of input data. In general, if processes describe an operation, any 
mathematical expression can be described as processes communicating via channels. When 
the networks are large but regular, a subscripted notation can describe an iterative 
array. If the connection diagram has no directed cycles, the array is known as a 
systolic array.

Pipes
-----

Processes that have only two channels in their alphabet, namely an input and an output, 
are called pipes.

    P >> Q

which is read as "P pipes to Q".

Concatenated pipes can become a single pipe through concealment. Pipes are associative 
if the connected channels are capable of transmitting the same kind of message. The 
process within a pipe may transform the stream.

The chaining operator connects two processes by just one channel, 
and so can't deadlock. It can however introduce a new danger of livelock, which results 
when P and Q spend all their time communicating with each other and never the external 
world. To prove that livelock is not a danger, P must be left-guarded in the sense that 
the sequence of outputs of P must be bounded by some function of the sequence of inputs. 
Q must be right-guarded in the sense that it must output no more symbols than are input.

Buffers
-------

Buffers are special processes that output exactly their input, possibly after some delay. 
When non-empty, a buffer is always ready to output. A buffer is free of livelock.

Protocols describe two processes, a transmitter and a receiver, connected in series as a 
buffer.

    (T >> R)

In practice T and R might be connected by a process WIRE, which might not behave exactly 
as a buffer, due to unreliability. A protocol is a layered process that allows a 
nondeterministic process to behave as a buffer, by layering communication, usually 
involving a second backflowing channel used for handshaking. Various laws are 
described to prove the correctness of a protocol.

Sequential processes
====================

A process P might be broken broken down into two processes that must execute in sequence. 
This is denoted
    P = Q ; R

A repeating process or loop can be defined recursively:

    P = (P ; X) = P ; P ; P ; P ; ...

A sequence of symbols is said to be a sentence of process P if P terminates successfully 
after engaging in the corresponding sequence of actions. The set of all such sentences 
is called the language accepted by P. The notation of describing sequential processes may 
thus be used to define the grammar of a language. This treatment is familiar to anyone who
has studied parsers.

Algebraic treatment of deterministic and non-deterministic processes is presented.

Interrupts
----------

Interrupts are defined as a sequential composition 

    (P ^ Q) 

where the progress of P is interrupted on occurrence of the first event of Q, and P is 
never resumed. A catastrophe is an interrupt that occurs for some unspecified reason; 
the catastrophe symbol can be used to specify a recovery process Q. A restart facility is 
one such recovery process. Checkpoints can indicate restarts of lesser severity than 
restarting the whole system.

Assignments, conditionals, and loops are defined to encompass the most important aspects 
of conventional sequential programming. There are no surprises here.

Shared resources
================

Since channels cannot explicitly be shared, methods, such as labeling or interleaving 
must be contrived to create enough separate channels for independent communication in a 
way that the equations are satisfied.

The problem of interference is introduced, wherein two processes attempt to modify a 
shared variable, but since both read the initial value before either completes its write, 
a transaction is lost. A critical region is proposed as a possible solution to the 
problem. A mutex is also suggested. Finally, it is noted that atomic operations are best, 
since no ambiguity of sequence can result. It is reasonably proposed that each shared 
resource in a system be specifically designed for its purpose, and that pure storage not 
be explicitly shared in a concurrent system design.

Discussion
==========

The central premise driving CSP is that a single job should be able to take advantage of 
the parallelism provided by a computer's hardware.

Shared storage is a typical hardware solution to this, but has the problem previously 
introduced of interference.

Fork and join, wherein the locus of program control can be split such that two processors 
execute the same program independently, and then rejoined when a specific label is waited 
upon by both processors simultaneously, is deemed unnecessarily complicated to use, and 
therefore problem prone.

Dijkstra proposed that forked processes should execute to completion and that the join 
should be implicit when all forked processes have completed. These processes would have 
no shared interaction, save through channels. This notion forms the basis of the 
concurrent processes in CSP.

Dijkstra further proposed critical regions should protect shared storage so that 
concurrent processes could share variables. Variables declared as shared give a compiler 
a hint that a critical region can surround operations on that variable automatically. 
Such a pattern might look like this:

    shared n : integer with n do n := n + 1;

Synchronization between processes could be further elaborated:

    with n when condition do critical region

Condition is tested on entry, and the critical region executed immediately if possible, 
or deferred until condition is satisfied. There is a potential performance problem if 
many processes need to enter the critical region, although this is a semantically 
elegant solution.

Monitors are described. In modern parlance, a monitor is a class with private member 
variables; all meaningful operations on data occur within method calls, these method 
calls internally are made to operate sequentially by protecting the execution of each 
method with a semaphore.

Specific embodiments of concurrency in Pascal Plus, Ada, a language named CSP, and Occam 
are described. Certain advantages and limitations are mentioned.

We are reminded that a pipe is a unidirectional channel between two processes. Multiple 
buffered channels are a natural generalization to allow any process to communicate with 
any other in either direction. Unfortunately multiple buffered channels can allow deadlock. 
It is noted that the ARPAnet is such a system, and that mathematical treatment is 
complicated.

The book ends by noting that the case for the practical application of CSP is overstated, 
but nonetheless, it has presented a sound mathematical basis for reasoning about 
specifications, designs, and implementations.

The mathematical treatment convinced me of the practicality of the approach and its 
correctness. I did feel that without automated tools, calculating the correctness of a 
process in anything but the most trivial processes would be cumbersome.

This article has been a brief overview of a complex subject, mostly I am hoping to provide 
a bit of a glimpse as to what the book covers in order to pique your interest. I 
encourage you to read the book and work through the proofs to get a stronger 
understanding of the theoretical foundations. As multicore, concurrent, and parallel
processes become more and more prevalent, the concepts in CSP are going to become 
increasingly relevant today.

Footnote
========

If you wish to experiment with some of the concepts in CSP, 
a useful implementation written in Haskell can be found here
<http://chplib.wordpress.com/2009/11/16/an-introduction-to-communicating-sequential-processes>
