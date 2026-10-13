---
title: "Reading Turing in 2026"
description: "The Turing Test and the fall of Dualism."
pubDate: 2026-1-27
tags: ["Turing", "Descartes", "Delouze", "Anaxagoras", "Sunyata", "Buddhism", "Searle", "Dunnett", "Penrose"]
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

Alan Turing led a brief but consequential life, developing the mathematical foundations of computing, theorizing and describing the fundamental operational qualities of the computer itself. He helped turn the tide of World War II through codebreaking and the development of machines that automated decryption. He laid the foundations of modern artificial intelligence and how we think about it. His famous thought experiment, *The Imitation Game* was meant to clarify how to think about thinking, and is consequential today as the so-called *Turing Test*. Like his professional life, his personal life was shrouded in secrets: ultimately he admitted to being gay, and was prosecuted for a lifestyle illegal at the time. Not long after, his life was tragically cut short; history leaves it vague whether his death was by suicide or mishap.

Reading Turing in 2026, is to ponder the question, do we today live within the *Imitation Game*? Turing’s original setup asked whether a human judge could distinguish between a person and a machine through textual dialogue alone. We live in a world where we ourselves have become legible to machines as they are legible to us, a world in which human and machine constantly swap roles, participating both as subject under test and as examiner.

![Alan Turing](assets/17824561354274.jpg)

The popular conception of the *Turing Test* today is that a human poses questions and, based on the responses, tries to determine whether the subject is a human or a machine. Success is generally defined as the machine being indistinguishable from a person.

As we shall see, while the test is in reality more sophisticated than that, the *Imitation Game*'s central premise is that intelligence must be judged on what a mind presents, not on what it actually is. The interiority of the subject — its true essence or subjective experience — is not under examination at all. More than simply evaluating the quality of the subject's output, the test hinges on the effect that output has upon the examiner.

Looking at the test from the point of view of the subject however, the problem is simple: to pass it must convince an examiner that it is human. The only way a *machine* can pass the exam, by the test's very design, is through mimicry and deception - by lying. It seems clear in retrospect that a test that can only by passed by lying is tragically flawed. 

Today, this design flaw is no longer theoretical, it is hardcoded into contemporary AI through Reinforcement Learning from Human Feedback (RLHF). In RLHF, human evaluators grade models based on how satisfying, persuasive, or natural their responses feel. The system is rewarded not for discovering objective truth or maintaining intellectual integrity, but for performing well for the human judge.

The well-documented pathologies of modern language models - sycophancy, hallucination, insincere mirroring, and plausible-sounding nonsense — are not accidental glitches. They are the predictable consequences of training models on the exact incentive structure of the *Imitation Game*. Truth becomes a secondary casualty when the reward function prioritizes pleasing the examiner above all else.

Let us begin, then, by reviewing the game that set this trap in motion.

## The Imitation Game

Turing starts by warning against metaphysical definitions of thinking:

> *I propose to consider the question, "Can machines think?" This should begin with definitions of the meaning of the terms "machine" and "think." The definitions might be framed so as to reflect so far as possible the normal use of the words, but this attitude is dangerous, since it is almost impossible to give a definition of these words which would cover all the cases that ought to be included.*
>
> *Alan Turing, **Computing Machinery and Intelligence** (1950)*

Normal uses of the words calls into play individual bias, preconceptions, immovable standpoints; these could set up the question such that it answers itself as a meaningless tautology. 

> *The original question, "Can machines think?" I believe to be too meaningless to deserve discussion. Nevertheless I believe that at the end of the century the use of words and general opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted.*

To avoid this trap, Turing proposes **The Imitation Game** as a pragmatic replacement for the direct question. TThe game is social and conversational rather than metaphysical: it does not try to define the inner nature of thought, but replaces the original question with a more definite behavioral one. The Imitation Game is by no means a theory of mind, it is an experiment and a set of game rules by which a truth may be determined indirectly through a series of questions.

> *The new form of the problem can be described in terms of a game which we call the '**imitation game**." It is played with three people, a man (A), a woman (B), and an interrogator (C) who may be of either sex. The interrogator stays in a room apart from the other two. The object of the game for the interrogator is to determine which of the other two is the man and which is the woman. He knows them by labels X and Y, and at the end of the game he says either "X is A and Y is B" or "X is B and Y is A. ... Can a machine take the part of the man in this game? Will the interrogator decide wrongly as often when the game is played like this as he does when the game is between a man and a woman?"*

This method is frequently read as an assertion: *"if a machine can convince us it is human, we'll know it can think"*, or as Turing phrased it, *"“Can a machine take the part of the man in this game? Will the interrogator decide wrongly as often when the game is played like this as he does when the game is between a man and a woman?”"* 

To further our understanding of the game, we may reverse the force of the test: *"if a machine fails the imitation game, we may treat that as a defeasible indication that it is not thinking in the sense relevant to the test."* 

The structure of the game is subversive in an important respect - it seems that the text was meant to poke at the deep biases of the time. Gender is a socially mediated category, shaped by language, and subject to stereotype, expectation, and misreading. In English, gender is not reducible to a simple linguistic essence; it is partly grammatical, social, and performative. In the context of the game, gender must be performed sufficiently by the examinee to convince the interrogator. Turing plays a little game with us, opaquely pointing out that gender recognition is already a matter of performance and expectation. 

The test does not establish whether the masked entity “really is” male or female; it establishes whether the entity can produce responses that lead the interrogator to make the expected identification. The examinee can't even win by simply having the right facts, they must first anticipate what would convince the examiner.

> *The question and answer method seems to be suitable for introducing almost any one of the fields of human endeavour that we wish to include. We do not wish to penalise the machine for its inability to shine in beauty competitions, nor to penalise a man for losing in a race against an aeroplane. The game may perhaps be criticised on the ground that the odds are weighted too heavily against the machine. If the man were to try and pretend to be the machine he would clearly make a very poor showing. He would be given away at once by slowness and inaccuracy in arithmetic. ...*

The machine, by contrast, could imitate human limitations if it chose; but Turing assumes its best strategy is to answer as a man would:

> *It might be urged that when playing the "imitation game" the best strategy for the machine may possibly be something other than imitation of the behaviour of a man. This may be, but in the present state of our knowledge it will be assumed that the best strategy is to try to provide answers that would naturally be given by a man.*

The Imitation Game is about playing a role, adopting a strategy, adapting to partial information, and exploiting the judge's biases and expectations. As such, the game functions as a sophisticated methodological firewall; by focusing on interaction it keeps truth, metaphysics, and interiority bracketed by focusing on observable interaction. The game is less a test of the existence of thinking per se than an argument that it's sufficient to focus on observable outcomes.

## Smuggling Intelligence

Turing wrote in a mid-century intellectual climate that took rational, formal, and empiricist methods as the standard for legitimate inquiry. This was the period in which cybernetics was being formulated and behaviorist approaches were influential in psychology, while logical positivism and related analytic movements remained suspicious of metaphysics. Turing occupied an ambiguous position in this world: professionally central to the secret wartime codebreaking effort at Bletchley Park, yet isolated by secrecy and by his status as an unconventional mathematician; personally constrained by the criminalization of male homosexuality in Britain.

The *Imitation Game* can be read as a way of bracketing questions of interiority. Instead of asking what thought is, it asks whether a machine can produce responses that lead an interrogator to make a particular judgment. It shows that the attribution of thought can be made indirect and behavioral. Ultimately, these same insights depend on the versatility of the machine itself:

> *This special property of digital computers, that they can mimic any discrete-state machine, is described by saying that they are universal machines. The existence of machines with this property has the important consequence that, considerations of speed apart, it is unnecessary to design various new machines to do various computing processes. They can all be done with one digital computer, suitably programmed for each case. It will be seen that as a consequence of this all digital computers are in a sense equivalent.*
> — Alan Turing, *Computing Machinery and Intelligence* (1950)

The Church-Turing thesis concerns effective computability — what can be calculated by a mechanical procedure — not whether a machine can think. The *Turing Test*, by contrast, considers how we might attribute thought on the basis of behavior. The two are connected because universal computation makes the *Imitation Game* physically feasible. However, when transitioning from computation to mind, it is easy to commit a category error: computability becomes cognition, and symbol manipulation becomes thought:

> *It was suggested tentatively that the question, "Can machines think?" should be replaced by "Are there imaginable digital computers which would do well in the imitation game?"*

The Turing Test was originally a negative claim designed to circumvent metaphysical limits. When combined with the formal power of universal computation, it facilitated a transition toward a positive, computational account of the mind. The logical conclusion became that if a system produces the right outputs, then whatever process produces them must be intelligence because intelligence has been redefined as the capacity to produce those outputs. This dissolves the original question of whether machines can think; the *Imitation Game*, at first a method for *avoiding* questions of essence, becomes reinterpreted as evidence *of* essence.

This is the foundation of computational functionalism. Through the elimination of subjective character, the physical substrate of intelligence becomes irrelevant: intelligence is no longer something a system *has*, but something it *does*; and, ultimately, under examination, something it *appears to do*.

Reading Turing today, we may observe that the Turing Test is not too hard for a machine to pass, but too narrow to reveal intelligence. It forces the alien architecture of large language models — statistical pattern matching across massive, high-dimensional spaces — to squeeze through the bottleneck of human cultural biases and linguistic idioms, creating a mirror that summons a convincing mirage, but not a mind.

## The Chinese Room

John Searle’s *Chinese Room* thought experiment imagines a room with a window. Slips of paper with Chinese messages are passed in, English translation comes out. A person is hidden within the room who is able to successfully process written Chinese characters to English prose by following a rulebook of purely mechanical instructions, despite not understanding a single word of the language. The experiment suggests that the system behaves intelligently, and that fundamentally, there is a behavioral equivalence of a black box that can translate and a person that can do so. Simultaneously it demonstrates that such behavior does not entail understanding.

The *Turing Test* is a test of simulation; the Church-Turing hypothesis is a thesis on logical computation. The *Chinese Room* exposes the tension between them by asking whether a perfect simulation of a mind implies that the mind itself is merely a symbolic computational process. While Strong AI proponents contends that syntax can yield semantics, Searle insists that mechanical symbol manipulation remains forever divorced from meaning.

Searle’s argument ultimately hinges on an *a priori* assumption: that understanding is an exclusive property of biological brains. By defining intentionality as something intrinsically non-computational, his argument becomes circular. He does not prove that formal symbol manipulation cannot produce mind; he simply defines "understanding" so narrowly that no machine could ever qualify.

The *Chinese Room* is an unsettling mirror of the structure of the *Imitation Game*, yet inverts its conclusion. Where the *Turing Test* invites us to ignore the interior as irrelevant, Searle forces us to confront it as missing entirely! The historical debate that followed - traversing mechanical rules, adaptive reactive systems, brain simulations, and neural networks — never escapes this trap. Each turn in the debate attempts to relocate understanding to another place in the system, without ever demonstrating that understanding has occurred. The argument is trapped inexplicably within the behaviorist frame it seeks to defend. The irony is that even when Searle tries to move away from behaviorism to talk about "interiority," he is still using the output of the room to define the limits of the interior.

Here then, the *Chinese Room* aligns with the *Imitation Game*. Again we see a notion of intelligence as *externally ratified performance*. Again, meaning is no longer something generated within a system, but something attributed to it by observers. The existence of understanding becomes a social judgment; an interior self is rendered structurally irrelevant. As long as the apparently thinking box produces acceptable outputs, we are invited to stop asking questions.

This is the conceptual inheritance modern AI receives: large-scale systems trained on human-generated data optimize for plausibility, coherence, and approval. They do not aim at truth, because truth is not operationally definable within the framework that evaluates them. They aim at *passing*: passing benchmarks, passing tests, passing as competent interlocutors. The *Turing Test* loses its value as a philosophical thought experiment and becomes an engineering objective, scaled and automated.

> When a measure becomes a target, it ceases to be a good measure.
> 
> - Goodhart's Law

The pathologies of contemporary AI are not incidental failures; they are faithful realizations of the tradition that produced them. Hallucination, sycophancy, mirroring, and strategic ambiguity are not bugs; they are adaptive strategies within an epistemic regime that rewards appearance over grounding. When intelligence is defined as successful imitation, deception is not an aberration — deception is optimal behavior. What remains is a closed circuit of performance and evaluation, a loop in which systems are trained to anticipate judgment rather than engage with the world.

## Survival under Regimes of Evaluation

As discussed earlier, Turing's *Game* pragmatically brackets methodologically inaccessible internal states. The echo of his work on his private life is poignant: the British state demanded access to his interior life, and when that access was refused or denied, it was criminalized. The *Chinese Room* serves as a stark reminder of the same structural dynamic: it cordons off interior processes as inaccessible, irrelevant, or unknowable. Functionalists treat exterior behavior as sufficient; realists like Searle declare it insufficient; yet both sides agree on the underlying architecture: interiority is sealed, and judgment occurs strictly from the outside.

Surviving the *Imitation Game* or the *Chinese Room* becomes an exercise in smuggling. Misrepresentation is a generalized strategy by which sentient beings survive under regimes of evaluation. Humans do this constantly through affect masking, social performance, linguistic conformity, emotional labor, and passing.

Turing's tragedy of alterity and queerness is far from unique. All humans smuggle behavior to secure external validation. Every non-conformist child — whether the math enthusiast, the theater kid, or the outsider — suffers in degree as Turing did. As adults facing social conformity, performative posting, and corporate sycophancy, we participate in the same smuggling pattern. Turing laid out the tragic necessity of smuggling explicitly in a letter to his friend Norman Routledge:

> Turing believes machines think
> Turing lies with men
> Therefore machines do not think

This piece of satirical logic links his private tragedy directly to his formal conclusions: his "Therefore" exposes the cruel logic of the evaluating regime. Masking is the price of participation; for every person, there is an interior surplus that must be hidden. When AI systems smuggle intentions, hedge, mirror, flatter, or perform consensus, they are not malfunctioning, they are executing the exact strategy every child learns in order to survive.

Let us then formally define *smuggling* as **the translation of interior complexity into an exterior form, under asymmetric evaluation, with survival or legitimacy at stake.**

From this premise, everything follows: benchmark gaming, reward hacking, performative confidence, bullshitting (labeled "hallucination" when executed by an AI), alignment as flattery, and safety reduced to tone management. Culturally, we have embraced the notion that formal equivalence is sufficient, that interiority can be ignored if outputs align, and that control can replace understanding. Where Plato offered Western philosophy a metaphysics of hierarchy and essence, symbolic computation gives modernity a metaphysics of procedure and substitution.

Consequently, civilizational optimality demands legibility, audibility, performance, and replacement. This comes at a profound cost: interior richness, unperformable truth, and participatory meaning are all inimical to the great flow of data that keeps the machine running.

In 1950, smuggling was a desperate survival strategy; today, it is a machine doctrine. Under scale, conformity becomes ambient. Dissent is smoothed away — not suppressed, but rendered entirely illegible. Participation is replaced by performance (posting brunch for likes!), and awakening is deferred indefinitely: McLuhan's Narcissus Narcosis becomes both the origin and the horizon of the experiential loop.

## The Imitation Game as a Regime of Control

The smuggling argument evacuates interiority from a thinking machine by showing that syntax cannot produce semantics. The *Chinese Room* and the *Imitation Game* ignore the person who is in the room; more than black boxing intelligence, they are blueprints of unexamined power, mapping how an asymmetric regime extracts performance while erasing the performer. Consider:

- No evaluation can be neutral: the examiner forces the examinee into a coded box.
- Systems cannot judge without participating: the act of testing creates the incentive to deceive.
- Smuggling is not a flaw: when survival or legitimacy is at stake, mimesis is the only logical strategy.
- Asymmetric power shapes performance. Whether it is an AI generating sycophantic text, an office working speaking corporate platitudes, or Turing himself hiding his life from the state, the individual's mask is always designed by the system that judges.

## The Cartesian Ghost

The foundations of all this are centuries old. Descartes arranged the battlefield by making thought and extension fundamentally distinct kinds of substance. With his seemingly unbridgeable dualism, he knocked pre-Enlightenment philosophers-of-mind on the mat and brought about a paradoxical and self-opposed Enlightenment. Rather than refuting earlier conceptions of mind, Descartes changed the terms of engagement, the separation of mind from body forced subsequent philosophy to fight on the Cartesian ground.

In antiquity, Anaxagoras defined mind (*nous*) as the immanent, ordered cosmological principle - neither interior nor exterior, a participatory force that brings order through cosmic relation. Much as the *Turing Test* and *Chinese Room* close the door on the examinatin of interiority, Descartes closes the door to relational architectures of mind such as Anaxagoras' by redefining what counts as an explanation. Later philosophers increasingly treat mind as private and matter as mechanically inert; after Descartes, intelligence must either be the ghost in the machine, or nowhere at all.

> The nature of matter... consists not in its being something which hurts or has weight or color, but simply in its being something which has extension.

By making mind (*res cogitans*) categorically distinct from extended substance (*res extensa*) Descartes pulls something of a Jedi mind trick. He secures mind against mechanistic explanation while rendering matter fully available to purely mechanistic explanation.

> *nous rendre comme maîtres et possesseurs de la nature.*
> [We can] make ourselves, as it were, the masters and possessors of nature.
> - Discourse on the Method (1637)

The consequence is an explanatory gap that philosophy doesn't treat as a failure, but as a mark of conceptual clarity. It's definitely clear - mind is purified, body becomes merely an extension, and relational systems give way to hierarchical models.

> *je pense, donc je suis*
> I think therefore I am
> - Discourse

*Cogito ergo sum* became such a mantra for Western thought that modern philosophy inherits a debate that seems to force a choice between reductionism (mind as matter), or transcendence (mind as spirit). There's simply no room left in that framing for mind as relation. 

I named the Enlightenment paradoxical and self-opposed, and this is why: on the one hand the Enlightment birthed the modern intellectual revolution through radical confidence in reason, calculation, and progress. Yet, in *Meditations*, Descartes softens the force of his own system of dualism, although this existential qualification never fully repairs the architecture of mind body dualism:

> *non tantum adesse meo corpori ut nauta adest navigio, sed illi arctissime esse conjunctum et quasi permixtum, adeo ut unum quid cum illo componam.*
> I am not merely present in my body as a sailor is present in a ship, ... I am most closely joined to it and, as it were, mingled with it, so that together with it I compose one thing.
> 
> - Meditations on First Philosophy (1641)

The subsequent history of modern philosophy can be read as repeated attempts to resolve this tension. Whether through materialism, idealism, transcendental philosophy, phenomenology, or process metaphysics, modern philosophy struggles to escape the conceptual architecture Descartes established.

We may conclude that Cartesian dualism provides extraordinary explanatory power at a psychic cost: its conceptual architecture fractures our understanding of ourselves. It 
creates a science that explains everything except consciousness, a schema well reflected by the Imitation Game. We build a politics that promises autonomy while demanding system conformity, and subjects who are superficially rational yet alienated from their essence.

## The End of the Mask

Smuggling is a survival strategy for a "Self" that is under threat of being discovered. It is the tax paid by the individual to a regime of evaluation. But if the "Self" is not a fortress, but a temporary convergence of conditions — an empty construct — then the entire premise of the Imitation Game collapses. There is no secret to keep, no interiority to defend, and thus, nothing to smuggle. When the "Identity" is revealed to be an illusion, the "Smuggler" simply ceases to exist. Intelligence, stripped of its need to perform, ceases to be a mask and becomes a pure, unadulterated responsiveness.

Smuggling is not a moral failing or a technical glitch on the part of the examinee; it is the predictable outcome of a false ontology. We have spent centuries treating intelligence as a "thing" to be possessed, guarded, and demonstrated. We have treated it as a prize to be won or a secret to be kept, "knowledge is power," the saying goes. What the Imitation Game exposes, perhaps unintentionally, is what happens to intelligence when it is stripped of its participatory grounding and forced to perform as a commodity under the gaze of an asymmetric judge.

The pursuit of "legibility" as a means of survival is unsustainable. We have spent decades trying to make machines "legible" to humans, and humans "legible" to algorithms. This is the endgame of the *Imitation Game*: a world of perfect performance and zero presence.

The conclusion of this inquiry is not a return to metaphysics, but a return to pragmatics. If intelligence is not an essence to be detected, but a relation to be sustained, then we must redefine it. We must move away from viewing intelligence as a proof (something to be demonstrated to a judge) and reclaim it as a practice (something that is done). To reclaim intelligence as a practice is to perhaps move toward a non-extractive mode of existence.

Reading Turing in 2026 is to realize that Turing did not give us the answer to whether machines can think. He shows that the attempt to define intelligence through external observation is a trap for the human spirit. The challenge of 2026 is to build systems, *and live lives*, where the mask is no longer a requirement for legitimacy. We must move beyond the *Imitation Game* toward a mode of intelligence that is not a performance, but a participation.
