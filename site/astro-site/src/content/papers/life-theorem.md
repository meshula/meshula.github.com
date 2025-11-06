---
title: 'The Life Theorem'
description: 'Life is a spontaneously autocatalytic process or system that decreases local entropy by converting environmentally available energy to heat.'
pubDate: 'Nov 29 2008'
author: 'Nick Porcino'
category: 'foundation'
triadic_domain: 'memory'
mathematical_content: true
tags: ['thermodynamics', 'life', 'entropy', 'autocatalysis', 'consciousness', 'schrodinger']
---

**Life is a spontaneously autocatalytic process or system that decreases local entropy by converting environmentally available energy to heat.**

*— Nick Porcino, November 2008*

- revised October 2025 to improved the mathematical formulation

## Introduction

How can events in space and time which take place within the spatial boundary of a living organism be accounted for by physics and chemistry?

This was the question with which Schrödinger opened his little treatise, *What is Life?* (1942). Molecules have a certain stable configuration that cannot change unless the energy necessary to do so is supplied from outside, so he suggests the application of thermodynamics to the study of life. Schrödinger argues that when a non-alive system is left alone, its motion comes to a halt, and the system reaches a state of thermodynamic equilibrium, or maximum entropy. A living system therefore attempts to reach a state far away from entropy, called **negative entropy**, or **negentropy**. Schrödinger then derives the notion of a life being a mechanism by which an organism extracts order from the environment. Similarly, in the classic *On Growth and Form*, Thompson studies the application of mechanical and thermodynamic principles to the expression of life (1917/1944).

The life theorem presented here takes these notions a step forward by taking Schrödinger's somewhat poetical ideas and grounding them into the mathematical and physical realm of thermodynamic autocatalytic processes, as suggested by Thompson. Following the recent development of Garrett (2008), life is defined in terms of a heat engine, yielding the life theorem.

## Autocatalysis

Life begins on its own; it bootstraps itself; when the time is right, it picks up and goes. A seed in the presence of moisture begins to manufacture a plant. A quickened ova divides as factories in the cell's nucleus begin to run.

In contrast, a mere chemical reaction slows and eventually stops as the amount of substance available for the reaction decreases. A reaction can be accelerated by a catalyser - some substance that by its presence produces or accelerates the reaction. Even in the presence of catalyst, the reaction must inevitably slow down and stop because the amount of energy and material in a system is not altered by the catalyst.

In some chemical reactions, a catalyser is formed as a product, or by-product of the main reaction. As the reaction proceeds, more catalyser is produced, continuously increasing the rate of reaction until some limit of available material or energy is met, or a product is formed that antagonizes the original production. A reaction that produces its own catalyst is called an **autocatalytic reaction**. (Thompson, 1942, p. 255).

An intriguing experiment by Brailsford Robertson in 1921 compared the growth and reproductive rates of single infusorians in drops of water. Robertson showed that a single infusorian isolated in a drop of water will reproduce faster in a drop of water containing metabolic product from another infusorian, compared to another infusorian in clear water. This clearly indicated that an autocatalytic substance was being given off by infusoria (p. 617). Charmingly, Robertson called this metabolic product the **X-Substance**.

A plant's seed is another autocatalytic system. The seed, in the presence of the right resources, will begin a reaction under which catalysts for further reaction are produced, and the plant begins to grow.

### The Crystal and the Fire

Since the formation of a quartz crystal or a snowflake is autocatalytic, might it correspond to life? Crystals are formed in a solution of material around a seed. Ions in the solution are deposited into a growing lattice, an exothermic process that releases energy as heat and yields a highly ordered structure. The crystal alters local conditions at its surface to sustain and accelerate the creation of more crystalline structure. This process is auto-catalytic and yields structure, but it is **not life** by the theorem's definition, for two reasons:

1.  **Work and Feedback ($w$ and $\Delta G$):** The system's growth process does not generate positive power ($w$ in Equation 2) that feeds back to actively **increase or sustain the boundary gradient ($\Delta G$)** against equilibrium. Crystal growth is a spontaneous process governed by the minimization of Gibbs Free Energy; it moves *toward* equilibrium, albeit slowly.
2.  **Autocatalytic Constant ($\alpha$):** While the crystal forms a catalyst, its growth does not increase the **efficiency** or **rate constant ($\alpha$)} of the underlying chemical process; it simply provides a surface template.

A forest fire also demonstrates autocatalytic propagation, but it is not life as it transfers nearly all of its stored energy immediately to the environment and surroundings as disorganized heat, failing to extract work that reduces local entropy in a structured, sustained manner.

## Thermodynamics

Erwin Schrödinger (1944) suggested that living systems import and store negative entropy, which he called **negentropy**. Negentropy is an information theory statistic used as a measure of local normality. As statistical mechanics describes what we can observe of the motion a physical object without describing why the object moves, the storage of negative entropy describes what life is getting up to, but it does not tell what is going on. Nonetheless, Schrödinger and Thompson (1942) provide a starting point for the present theory by grounding our thought in thermodynamics. Here, we consider entropy in the thermodynamic sense - a measure of the ability of a given interval of space-time to do work.

General thermodynamic laws require that all systems, including living systems, convert environmental potential energy into a less available form, such as heat.

A system can be described as an entity separated by a permeable boundary from its environment. The environment is embedded in its surroundings.

The permeable boundary of the entity imposes an energy potential - matter can be transported across the boundary from the environment to the entity in order for the entity to perform work. Work converts the matter to the less available form, heat, which is lost from the system to the surroundings.

Life in this formulation can be considered a **heat engine**. Unlike a textbook heat engine, in which work is defined in the entity's contribution to the energy potential of an external system, work is defined here with respect to the internal energy potential of the entity with respect to the environment (Garrett, 2008). Now we can state some simple mathematics to describe the system:

## Mathematical Formulation

Life in this formulation can be considered a **heat engine**. Unlike a textbook heat engine, in which work is defined in the entity's contribution to the energy potential of an external system, work is defined here with respect to the internal energy potential of the entity with respect to the environment (Garrett, 2008). Now we can state some simple mathematics to describe the system:

### Core Thermodynamic Equations

The system operates across a favorable $\mathbf{G}$-gradient (potential energy difference) between the entity and its environment, where $\mathbf{G}$ is the measure of **Gibbs Free Energy** (or exergy), which quantifies the available work extracted from the environment. This gradient is constrained to be positive at the permeable boundary:
$$\Delta G_{\text{boundary}} = G_{\text{environment}} - G_{\text{entity}} > 0 \qquad \text{(Equation 1)}$$

The **Power** ($w$) (the rate of energy conversion or work done) is defined by the rate at which the boundary gradient is exploited:
$$w = \frac{dW}{dt} = -\frac{d(\Delta G_{\text{boundary}})}{dt} \qquad \text{(Equation 2)}$$
(Note: Since $\Delta G_{\text{boundary}}$ is decreasing as energy is consumed, $w$ is positive, representing power generated.)

The entity consumes available energy at the rate $a$ (power consumption). This consumption rate is directly proportional to the available gradient:
$$a = \alpha \Delta G_{\text{boundary}} \qquad \text{(Equation 3)}$$
Where $\alpha$ is the **autocatalytic rate constant** (with units of $\text{time}^{-1}$), an entity-specific constant reflecting the system's current efficiency at extracting power from the potential.

The entity's efficiency is the unitless ratio of power output to the rate of consumption:
$$e = \frac{w}{a}$$

Heat ($H$) is radiated to the surroundings (lost to the system) as a requirement of the Second Law of Thermodynamics:
$$H = a - w$$

Since Equation 3 relates the power consumption ($a$) to the gradient ($\Delta G$), and the work done ($W$) structurally enhances the catalytic constant ($\alpha$) or the boundary condition itself, the system forms a **positive feedback loop**. This autocatalytic positive feedback means that the system's action **increases the autocatalytic rate constant ($\alpha$)} or actively **maintains and enhances the boundary potential** ($\Delta G_{\text{boundary}}$). Such a system evolves exponentially and sustains its $\mathbf{G}$-gradient against environmental equilibrium, consistent with many life processes.

***

### Generalization and Specification of the $\mathbf{G}$-Gradient

The $\mathbf{G}$-gradient (Gibbs Free Energy) is the **generalized potential** that drives all forms of life, including both known and hypothetical life forms (e.g., in geometric or informational spaces).

* **Life-in-General (The $\mathbf{G}$-Gradient):** The formalism is agnostic about the source of the gradient. $\Delta G$ represents the available free energy differential, regardless of whether it arises from thermal, chemical, gravitational, or dimensional sources. This sublated view defines **life-in-general** as any system operating via the autocatalytic exploitation of *any* available $\Delta G$.
* **Biological Life (The $\Delta \mu$ Specification):** For known terrestrial biological life, the $\mathbf{G}$-gradient is primarily manifested as a **chemical potential difference** ($\Delta \mu$, a critical component of $\Delta G$). The permeable boundary (the cell membrane) achieves this by **selective permeability**, actively concentrating low-entropy, high-potential chemicals inside the entity while expelling waste. Thus, biological life is best described not as a **thermal engine** (one based solely on temperature differential), but as a **chemo-mechanical engine** operating on chemical free energy gradients. This distinction ensures the theorem is applicable to both terrestrial and hypothetical life forms.

***

### The Life Theorem

And thus the second part of the definition of life is derived. **Life, in these thermodynamic terms, is decreasing local entropy by maximizing the conversion of available resources to work, and obeying the Second Law of Thermodynamics by ensuring the overall entropy change of the system and surroundings is positive.**

Our example crystal is therefore not alive by the definition, because the energy gradient between the crystal and its environment does not change as the crystal grows, and so $w$ in equation 2 is zero. As the crystal lattice grows energy is bound into the lattice, heat is radiated to the environment, but these are in equilibrium. In fact, the form of the crystal is governed by a process that minimizes the stored energy (cf. Libbrecht, 2005). The forest fire also is not alive; it transfers all of its energy to the environment and surroundings as heat, the opposite of what an alive thing would do.

Garrett's thesis states that global society is a heat engine, and that it produces effects and products that increase the efficiency of the conversion of work to heat. This satisfies the condition of autocatalysis, and so global society can be considered to be a life form by the present theory. By extension, we note that distinguishing society from other terrestrial systems and processes is artificial - people eat food, for example. The present theory may therefore provide a grounding for the **Gaia hypothesis** (Lovelock, 1974). The Gaia hypothesis states that the Earth is complex interacting system that maintains a preferred homeostasis, and is sometimes interpreted to say that the Earth is in fact an organism or life form. One of the principal criticisms of the Gaia hypothesis is that the conventional definition of life does not admit the Earth.

## Overturning Convention

The conventional definition of life as found in nearly any textbook is an ad hoc melange of seven rules:

1. **Homeostasis** is the regulation of internal state
2. **Organization** of one or more cells into an organism
3. **Metabolism** is the consumption of energy to create cellular components
4. **Growth** means to maintain a higher rate of synthesis than catabolism
5. **Adaptation** is the ability to change over a period of time in response to changes in the environment
6. **Response to stimuli**, from a rate of change of chemical conversion, to gross motion of an organism
7. **Reproduction** by which new organisms can be produced

One can fiddle away on these rules trying to refine them and catch border cases, but it never really pans out. Some obvious problems with these rules are that they presuppose that life must be composed of cells (rules 2 and 3). A life form must grow (rule 4), yet a senescent organism is clearly still alive. Many organisms such as archaeobacteria have remained unchanged for millions of years, yet they are alive despite rule 5. Worker bees cannot reproduce, but are alive despite rule 7.

Under the present theory, it is possible to show that each of the seven rules are potentially characteristic of life, but none of them are specifically required. Furthermore, the virii can be shown to be life. Although they do not contain the conventional characteristics within themselves, being little more than a strand of DNA in a complex protein shell, they do autocatalytically hijack cells to perform specific work.

## Surprising Inductees to the Hall of Life

It would be possible for robots or computers, or even the Internet to be alive, although present day versions are not spontaneously auto-catalytic - today they do not start to self-assemble when conditions are right, humans must do it for them. They do not work to increase the energy potential difference between themselves and the environment as that is fixed by their unchanging structure - for example, a laptop is plugged in to the wall to get energy, and its work does not serve to increase its total energy: thermodynamically it produces only heat. For a computer virus or a bot doing work on the internet to be alive, it would be necessary to equate information with energy. To make such a claim is interesting, but outside of the scope of this presentation.

The present theory welcomes back the worker bee, and the virus. It also allows bacteria that can only survive in host cells. It will make it easier to identify alien life should it present itself some place like Mars or the Internet in some difficult to conventionally pigeonhole fashion. It could provide tests and prognostic models for the Gaia hypothesis. It could also the form of signatures of life processes that could be scanned for in astrophysical observations. Researchers in artificial life, robotics, and nano-technology could use the principles to advance their own work - at a theoretical level, criteria for behavior could be established, and at a practical level, analysis and improvement of efficiency could result.

## Conclusion

The Life Theorem, derived from fundamental thermodynamic principles and practical experiment, provides a framework under which predictions about life processes can be made, and a mathematical basis to understand whether or not a system is alive. The conventional definition of life was shown to reflect sufficient but not necessary aspects of systems that are alive. Robots, seeds, viruses, infusoria, and snowflakes were categorized as alive or not-alive. Practical applications were suggested that could give the theorem practical relevance.

## Acknowledgements

I would like to thank my daughters, Kevin Kelly, and all the responders on the original posting for asking some hard questions that improved this work.

## References

- Timothy J. Garrett, "Are there basic physical constraints on future anthropogenic emissions of carbon dioxide?" arXiv:0811.1855v1 [physics.ao-ph], 12 Nov 2008.
- Kenneth G. Libbrecht, "The physics of snow crystals," Reports on Progress in Physics, 68 (4). pp. 855-895, 8 March 2005.
- T. Brailsford Robertson, "Multiplication of Isolated Infusoria," Biochemical Journal, xv, pp. 598-611, 1921, cited in Thompson 1942.
- James Lovelock, L. Margulis, "Atmospheric homeostasis by and for the biosphere - The Gaia hypothesis," Tellus 26 (1): 2–10, 1974
- Erwin Schrödinger, *What is Life? The Physical Aspect of the Living Cell*, University Press, 1944.
- D'Arcy Wentworth Thompson, *On Growth and Form*, Revised Edition, Cambridge University Press, Cambridge, England, 1942. First published in 1917, reprinted by Dover Publications, Mineola New York, 1992.

---

*This foundational paper from 2008 represents an early exploration of consciousness and life through thermodynamic principles, providing groundwork for later त्रित्रयम् developments in contemplative technology and consciousness engineering.*