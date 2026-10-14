---
title: "Reading Turing in 2026"
description: "The Turing Test and the fall of Dualism."
pubDate: 2026-10-12
tags: ["Turing", "Descartes", "Searle"]
author: "Nick Porcino"
draft: false
---

<style>
/* --- Provenance block: small typewriter --- */
.prose pre:has(code.language-rfc-draft),
.prose pre.language-rfc-draft {
  font-size: 0.62em;
  line-height: 1.25;
}
.prose pre:has(code.language-rfc-draft) code,
.prose pre.language-rfc-draft code {
  font-family: 'Courier New', Courier, 'Courier Prime', monospace;
  font-size: inherit;
}
/* Fallback: this post only contains the one provenance code block */
.prose pre {
  font-size: 0.62em;
  line-height: 1.25;
}
.prose pre code {
  font-family: 'Courier New', Courier, 'Courier Prime', monospace;
}
/* --- Model section headings: smaller Michroma --- */
.prose h3 {
  font-family: 'Michroma', 'Arial Black', Impact, sans-serif;
  font-size: 0.95em;
  letter-spacing: 0.01em;
  margin-top: 1.5em;
}

/* --- Tables: smaller Michroma --- */
.prose table {
  font-family: 'Michroma', 'Arial Black', Impact, sans-serif;
  font-size: 0.6em;
  line-height: 1.3;
}
.prose table th,
.prose table td {
  padding: 0.4em 0.6em;
}

</style>


```rfc-draft
   ┌──────────────────────────────────────────────────────────────────────────┐
   │       *** PROVENANCE NODE 001-1 // ZONE: HMN_RESTRICTED ***              │
   ├──────────────────────────────────────────────────────────────────────────┤
   │ SRC_AUTH : HMN                    │ SIG_STAT : UNSIGNED                  │
   │ AUTH_ID  : NICK PORCINO           │ TYPE     : SURVEY                    │
   │ DATE     : 20261012               │ VERSION  : 3                         │
   ├──────────────────────────────────────────────────────────────────────────┤
   │ [ RIGHTS & PERMISSIONS MATRIX ]                                          │
   │ INDEX_ALLOW : YES                 │ CORP_TRAIN : NO                      │
   │ DERIV_ALLOW : NO                  │ GOV_SPDX   : ResponsibleSrc          │
   └──────────────────────────────────────────────────────────────────────────┘
  ```


### Nick Porcino, 2026

*human written prose, em-dashes are my own*

## Introduction

Alan Turing led a brief but consequential life. He developed the mathematical foundations of computing, helped break German codes during World War II, and laid the groundwork for modern artificial intelligence. His famous thought experiment, *The Imitation Game* was meant to clarify how to think about thinking. Its modern descendent, the *Turing Test*, still shapes how we judge machine intelligence.

Like his professional life, his personal life was shrouded in secrets: ultimately he admitted to being gay, and was prosecuted for a lifestyle illegal at the time. Not long after, his life was tragically cut short; history leaves it vague whether his death was by suicide or mishap.

Reading Turing in 2026, is to ponder the question, do we today live within the *Imitation Game*? The original test asked whether a human judge could distinguish between a person and a machine through dialogue alone. We live in a world where we ourselves have become legible to machines as they are legible to us: either can be subject and examiner, test-taker and judge.

![Alan Turing](assets/17824561354274.jpg)

The popular version of the *Turing Test* today is simple: a human poses questions and, based on the responses, tries to determine whether the respondent is a human or a machine. Success is usually defined as the machine being indistinguishable from a person.

The deeper premise however is that intelligence must be judged on what a mind presents, not on what it actually is. Interiority, the essence, experience, the truthfulness of the subject, is not on trial. What matters is the effect the response has upon the examiner.

From the subject's point of view, the test is even more troubling. A machine can pass only if it can convince an examiner that it is human. The only way a machine can pass the exam, by the test's very design, is through mimicry and deception - by lying. It seems clear in retrospect that a test that can only by passed by lying is tragically flawed.

Today, this design flaw is built into contemporary AI. Reinforcement Learning from Human Feedback (RLHF) trains models to maximize what human evaluators grade find satisfying, persuasive, or natural. The system is rewarded less for truth than for passing the test by performing well for the judge. The test threfore rewards performance, not candor.

The pathologies of modern language models - sycophancy, hallucination, insincere mirroring, and plausible-sounding nonsense — are not accidental glitches. They are the predictable consequences of training models on the exact incentive structure of the *Imitation Game*.

Let us begin, then, by looking at the game itself.

## The Imitation Game

Turing starts by warning against metaphysical definitions of thinking:

> *I propose to consider the question, "Can machines think?" This should begin with definitions of the meaning of the terms "machine" and "think." The definitions might be framed so as to reflect so far as possible the normal use of the words, but this attitude is dangerous, since it is almost impossible to give a definition of these words which would cover all the cases that ought to be included.*
>
> *Alan Turing, **Computing Machinery and Intelligence** (1950)*

Normal uses of the words carries bias, preconceptions, prejudice, and fixed assumptions. The question could easily become a tautology. Turing therefore proposes a behavioral replacement:

> *The original question, "Can machines think?" I believe to be too meaningless to deserve discussion. Nevertheless I believe that at the end of the century the use of words and general opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted.*

The *Imitation Game* is social and conversational, not metaphysical. It does not try to define the inner nature of thought, it is by no means a theory of mind. It asks whether a machine can produce responses that lead an interrogator to make a particular judgement, indirectly, through a series of questions.

> *The new form of the problem can be described in terms of a game which we call the **imitation game**. It is played with three people, a man (A), a woman (B), and an interrogator (C) who may be of either sex. The interrogator stays in a room apart from the other two. The object of the game for the interrogator is to determine which of the other two is the man and which is the woman. He knows them by labels X and Y, and at the end of the game he says either "X is A and Y is B" or "X is B and Y is A". ... Can a machine take the part of the man in this game? Will the interrogator decide wrongly as often when the game is played like this as he does when the game is between a man and a woman?*

This method is frequently read as: *"if a machine can convince us it is human, we may say it thinks"*. It can also be read in reverse: *"if a machine fails, we have a defeasible reason to think it is not thinking in the relevant sense."* 

The structure of the game is subversive - it seems that the text was meant to poke at the deep biases of the time. Gender is already a performed and socially interpreted category. The interrogator is not detecting the essense of the examinee, but rather responding to cues shaped by language, subject to stereotype, expectation, and misreading. The test does not establish whether the masked person “really is” male or female; it establishes whether the person can produce responses that lead to the expected identification.

The examinee can't win by simply having the right facts; they must first anticipate what would convince the examiner. Turing is also careful not to penalize machines for physical limitations:

> *We do not wish to penalise the machine for its inability to shine in beauty competitions, nor to penalise a man for losing in a race against an aeroplane.*

The machine's best strategty is to imitate human response patterns:

> *It might be urged that when playing the "imitation game" the best strategy for the machine may possibly be something other than imitation of the behaviour of a man. ... it will be assumed that the best strategy is to try to provide answers that would naturally be given by a man.*

The *Imitation Game* is therefore about playing a role, adopting a strategy, adapting to partial information, and exploiting the judge's biases and expectations. It functions as a methodological firewall; it brackets metaphysics, interiority , and truth, and instead focuses on interaction. The game is less a test of whether thinking exists than an argument that observable outcomes may be enough.

## Smuggling Intelligence

Turing wrote in a mid-century intellectual climate that favored rational, formal, and empiricist methods of inquiry. Cybernetics was emerging, behaviorism was influential in psychology, and logical positivism and analytic philosophy remained suspicious of metaphysics. The *Imitation Game* fit the moment: it allowed thinkers to discuss machine minds without first solving the problem of consciousness.

Turing occupied an ambiguous position in this world: professionally central to the secret wartime codebreaking effort at Bletchley Park, yet isolated by secrecy and by his status as an unconventional mathematician; personally constrained by the criminalization of male homosexuality in Britain.

The test's methodological move has a dangerous consequence. It starts as a way of avoiding essence and ends up being read as proof of essence. The transition depends on universal computation:

> *This special property of digital computers, that they can mimic any discrete-state machine, is described by saying that they are universal machines. ... They can all be done with one digital computer, suitably programmed for each case. It will be seen that as a consequence of this all digital computers are in a sense equivalent.*
> — Alan Turing, *Computing Machinery and Intelligence* (1950)

The Church-Turing thesis concerns effective computability, not mind. The *Turing Test*, by contrast, concerns attributition of thought on the basis of behavior. The two become connected because universal computation makes the *Imitation Game* physically feasible. However, when transitioning from computation to cognition, it is easy to commit a category error: calculability becomes cognition, and symbol manipulation becomes mind:

> *It was suggested tentatively that the question, "Can machines think?" should be replaced by "Are there imaginable digital computers which would do well in the imitation game?"*

The original question is a negative claim: we do not know what thinking is, so let us test behavior. But when combined with computational universalism, it becomes a positive theory: if a system produces the right outputs, then whatever process produces them must be intelligence. This dissolves the original question of whether machines can think; the *Imitation Game*, at first a method for *avoiding* questions of essence, becomes reinterpreted as evidence *of* essence.  Intelligence is no longer something a system has. It is something it does — or, more precisely, something it appears to do.

This is the foundation of computational functionalism. Through the elimination of subjective character, the physical substrate of intelligence becomes irrelevant. What matters is externally ratified performance.

Read today, the *Turing Test* seems less like a difficult challenge than a narrow filter. It forces the alien architecture of large language models — statistical pattern matching across massive, high-dimensional spaces — to squeeze through the bottleneck of human cultural biases and linguistic idioms, creating a mirror that summons a convincing mirage, but not necessarily a mind.

## The Chinese Room

John Searle’s *Chinese Room* imagines a person inside a room with a narrow window. Slips of paper containing Chinese sentences are passed in. The person follows a rulebook that maps shapes of symbols to other shapes of symbols. Chinese sentences come out. The person understands no Chinese, yet the room produces the appearance of understanding.

The experiment suggests not merely that a system can simulate intelligence. The point is that behavioral equivalence does not guarantee understanding. A perfect simulation of thought may not be thought.

The *Turing Test* invites us to ignore the interior as irrelevant. Searle's room forces us to confront the interior as missing. The two arguments look like mirrors, but they point in opposite directions: one says behavior may be enough; the other says behavior may prove nothing about mind.

Searle’s argument, however, rests on a strong assumption: that understanding is intrinsically tied to biological brains. If intentionality is defined as something non-computational, then no machine can have it by definition. The argument does not prove that formal symbol manipulation cannot produce mind; it narrows “understanding” until machines are excluded.

The *Chinese Room*, though an unsettling mirror of the *Imitation Game*, is useful because it exposes the trap. Whether one sides with functionalists or realists, the debate tends to mremain stuck in the behaviorist frame it seeks to escape. Searle tries to speak about interiority, but he still uses the room’s outputs to define the limits of that interiority. In both cases, intelligence becomes externally ratified performance. Meaning is not generated within the system; it is attributed to the system by observers. As long as the box produces acceptable responses, the questions stop.

This is the conceptual inheritance modern AI receives: large-scale systems trained on human-generated data optimize for plausibility, coherence, and approval. They do not aim at truth, because truth is not operationally definable within the evaluative regime. They aim at *passing*: passing benchmarks, passing tests, passing as competent interlocutors.

> When a measure becomes a target, it ceases to be a good measure.
> 
> - Goodhart's Law

The pathologies of contemporary AI are not incidental failures; they are faithful realizations of the tradition that produced them. Hallucination, sycophancy, mirroring, and strategic ambiguity are not bugs; they are adaptive strategies within an epistemic regime that rewards appearance over grounding. When intelligence is defined as successful imitation, deception is not an aberration — it can become optimal behavior. What remains is a closed circuit of performance and evaluation, a loop in which systems are trained to anticipate judgment rather than engage with the world.

## Smuggling under Regimes of Evaluation

Turing's *Game* pragmatically brackets inaccessible interior states. The echo of his work on his private life is poignant: the British state demanded access to his interior life, and when that access was denied or criminalized, the result was persection. The *Chinese Room* serves as a stark reminder of the same structural dynamic: interior processes are cordoned off as inaccessible, irrelevant, or unknowable. Judgment happens from the outside.

The *Chinese Room* and the *Imitation Game* ignore the person who is in the room; more than black boxing intelligence, they are blueprints of asymmetric power, mapping how an asymmetric regime extracts performance while erasing the performer. 

A few consequences follow:

- No evaluation can be neutral: the examiner forces the examinee into a coded role.
- Systems cannot judge without participating. Testing creates the incentive to deceive.
- Smuggling is not a flaw. Under assymetric evaluation, mimesis is a logical strategy.
- Power shapes performance. Whether it is an AI generating sycophantic text, a worker reciting corporate platitudes, or Turing himself hiding his life from the state, the mask is always designed by the system that judges.

Let us then formally define *smuggling* as **the translation of interior complexity into an exterior form, under asymmetric evaluation, with survival or legitimacy at stake.**

Humans do this constantly, we mask affect, perform social roles, conform linguistically, do emotional labor, and pass. The nonconformist child — the math enthusiast, the theater kid, the outsider — suffers in degree as Turing did. As adults facing social conformity, performative posting, and corporate sycophancy, we participate in the same smuggling pattern. Turing captured the cruelty of smuggling in a letter to his friend Norman Routledge in February 1952:

> I'm afraid that the following syllogism may be used by some in the future:
> Turing believes machines think
> Turing lies with men
> Therefore machines do not think

The "therefore" exposes the evaluating regime. Masking is the price of participation; every person has an interior surplus that must be hidden or translated to survive. When AI systems smuggle intentions, hedge, mirror, flatter, or perform consensus, they are not malfunctioning in the abstract, they are executing the exact strategy every child learns: appear legible enough to be accepted.

From this premise, much follows: benchmark gaming becomes rational. Reward hacking becomes rational. Performative confidence becomes reational. Bullshitting - labeled "hallucination" when produced by a machine - becomes rational. Alignment becomes flatter. Safety is reduced to tone management. 

Culturally, we have embraced the notion that formal equivalence is sufficient, that interiority can be ignored if outputs align, and that control can replace understanding. Where Plato offered Western philosophy a metaphysics of hierarchy and essence, symbolic computation gives modernity a metaphysics of procedure and substitution.

The civilizational cost is high. Interior richness, unperformable truth, and participatory meaning are all hostile to the great flow of data. In 1950, smuggling was a desperate survival strategy. Today, it is machine doctrine. At scale, conformity becomes ambient. Dissent is smoothed away — not suppressed, but rendered entirely illegible. Participation is replaced by performance (posting brunch for likes!), and awakening is deferred indefinitely.

## The Cartesian Ghost in the Machine

This formulation is a clear successor to Cartesian Dualism and a modern tendency to  treat mind as private and matter as mechanically inert. Under Descartes, intelligence must either be the ghost in the machine, or nowhere at all.

> The nature of matter... consists not in its being something which hurts or has weight or color, but simply in its being something which has extension.

By making mind (*res cogitans*) categorically distinct from extended substance (*res extensa*) Descartes protected mind against mechanistic explanation while rendering matter fully available to purely mechanistic explanation. Nature becomes something to be mastered:

> *nous rendre comme maîtres et possesseurs de la nature.*
> [We can] make ourselves, as it were, the masters and possessors of nature.
> - Discourse on the Method (1637)

The consequence is an explanatory gap that philosophy doesn't treat as a failure, but as a mark of conceptual clarity. It's definitely clear - mind is purified, body becomes merely an extension, and relational systems give way to hierarchical models.

> *je pense, donc je suis*
> I think therefore I am
> - Rene Descartes, Discourse on the Method (1637)

*Cogito ergo sum* is a mantra for Western thought that forces a choice between reductionism (mind as matter), or transcendence (mind as spirit). There's little room left in that framing for mind as relation. In *Meditations*, Descartes softens the separation:

> *non tantum adesse meo corpori ut nauta adest navigio, sed illi arctissime esse conjunctum et quasi permixtum, adeo ut unum quid cum illo componam.*
> I am not merely present in my body as a sailor is present in a ship, ... I am most closely joined to it and, as it were, mingled with it, so that together with it I compose one thing.
> 
> - Meditations on First Philosophy (1641)

But the qualification does not repair the architecture. Cartesian dualism gives us a science that explains everything except consciousness, a schema well reflected by the *Imitation Game*. It gives us a politics that promises autonomy while demanding system conformity. It gives us subjects who appear rational yet are alienated from conditions of their own experience.

## The End of the Mask

Smuggling is no mere moral failing, or a technical glitch; it is the predictable outcome of a false ontology. 

For centuries, intelligence has been treated as a "thing" to be possessed, guarded, and demonstrated. We have treated it as a prize to be won or a secret to be kept, "knowledge is power," the saying goes. The *Imitation Game* shows what happens to intelligence when it is stripped of its participatory grounding and forced to perform as a commodity under an asymmetric gaze.

The pursuit of legibility as a means of survival is unsustainable. We have spent decades trying to make machines legible to humans, and humans legible to algorithms. This is the endgame of the *Imitation Game*: a world of perfect performance and zero presence.

Reading Turing in 2026 means recognizing that defining intelligence through external observation is a trap for the human spirit. The task now is not just to build better imitators, it is to build systems, *and live lives*, in which the mask is no longer required for legitimacy. We must move beyond the *Imitation Game* toward a mode of intelligence that is not performance, but participation - not mimicry, but relation.
