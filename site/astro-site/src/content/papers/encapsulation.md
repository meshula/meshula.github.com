---
title: "Elements of Compositional Stability in USD"
description: "Formal proofs of determinism and O(n) complexity for the USD Prim Composition Pipeline, with an interactive flow chart and annotated C++ source explorer."
pubDate: 2026-02-28
category: "research"
tags: ["USD", "OpenUSD", "PCP", "formal methods", "composition"]
author: "Nick Porcino"
draft: false
---

An interactive four-panel scholarly IDE pairing formal theoretical proofs with the PCP algorithm flow chart and annotated C++ source.

[Open the interactive explorer →](/pcp-explorer/)

## Introduction

This article breaks down the relationship between state propagation and composition stability, moving from abstract graph theory into the specific mechanics of Universal Scene Description (USD). We provide a foundational proof for the determinism and linear complexity ($O(n)$) of the USD composition engine. USD composition works because opinions form a deterministic reduction over an acycle dependency graph such that a total precedence order on opinons exists within each conflict set (same prim, same field). We formalize why USD’s "LIVERPS" (Local, Inherits, VariantSets, rElocates, Payloads, References) strength ordering derives from strict, non-cyclical opinion ordering. Further, we prove that LIVERPS correctly embodies total global ordering of composition and is thus strictly deterministic. We prove that USD composition is a confluent rewrite system with externalized precedence, which means that composition is equivalent to functional reduction.


A second contribution of this article is a formal definition of encapsulation through the concepts of **Leakage** and **Infiltration**, establishing the conditions required for **Hermeticity** within a scene graph. This is not a change in USD semantics, but a proposal for formal language for reasoning about encapsulation. Furthermore, it validates the mechanism of **relocation** and **specializes** as essential mechanisms for maintaining namespace stability and referential transparency. We conclude by showing that through enforcing a strict phase separation between variant selection and value evaluation, USD avoids the exponential complexity explosion ($O(k^n)$) inherent in systems that allow unrestricted state leakage. The paper includes a technical appendix cross-referencing these theorems against the OpenUSD C++ implementation.

# Definitions

Unique terms have been chosen to clearly distinguish theoretical constructions from existing USD terms of art; this is intentional in service of clear exposition.

## Formal Definitions for Color-Logic Systems

First we define hypothetical nodes as tuples that separate their identity from their state. We invent an infinite alphabet so that every node can have a unique need. We create a global map of nodes to values, operators that can perform a function on those values, and rules by which operators may rewrite the map.

### Foundational Definitions: Color-Logic Operators

1. **Color-Set ($\mathcal{C}$)**: A finite, discrete set of color values, such that $c \in \mathcal{C}$.

2. **Color-Node ($v$)**: A discrete entity defined by a unique identifier $id \in \mathcal{A}$, where $\mathcal{A} = \{a_0, a_1, a_2, \dots\}$ is an unbounded alphabet.

3. **Color-Map ($\sigma$)**: A partial function $\sigma: V \to \mathcal{C}$ that maps a set of Color-Nodes to their currently assigned colors. 

4. **Color-Operator ($\omega$)**: A transformational element contained within a node $v_s$ that targets a node $v_t$. It is defined by a value $c_\omega \in \mathcal{C}$ and a rewrite rule on the Color-Map:
   $$\omega(\sigma) = \sigma[v_t \mapsto c_\omega]$$
   (where $\sigma[v_t \mapsto c_\omega]$ denotes a map identical to $\sigma$ except that $v_t$ is now mapped to $c_\omega$).

5. **Conditional Color-Operator ($\omega_{cond}$)**: An operator comprised of a target $v_t$ and a set of conditional axioms $\Phi$. Given the current Color-Map $\sigma$, the operator selects a color $c \in \mathcal{C}$ based on the evaluation of $\Phi(\sigma)$ and performs the rewrite:
   $$\omega_{cond}(\sigma) = \sigma[v_t \mapsto f(\Phi(\sigma))]$$

1. **Color-DAG ($G$)**: A Directed Acyclic Graph $G = (V, E)$ where the vertices $V$ are Color-Nodes and an edge $(v_i, v_j) \in E$ exists if node $v_i$ contains an operator (static or conditional) that targets node $v_j$.

### Structural and Operational Properties

Next, we focus on structural integrity and scoping in order to define the impacts of operators being able to write to the map. We set up conditions for stable total ordering, and also describe relocations, so that we can reason about stability if a DAG supports a notion of nodes whose identity can be decoupled from its scope.

1. **Leakage ($\uparrow$)**: A property of an operator $\omega$ hosted by node $v_i$ where the target $v_t$ exists in a scope $S'$ such that $S(v_i) \subset S'$. It represents an upward or outward structural mutation where a child affects a parent or ancestor.

2. **Infiltration ($\downarrow$)**: A property of an operator $\omega$ hosted by node $v_s$ (external to a subgraph $H$) where the target $v_t \in H$. It represents an inward structural effect where an external scope redefines the internal state of a contained node.

3. **Hermetic Asset ($\mathcal{H}$)**: A subgraph $\mathcal{H} \subset G$ defined by the absence of boundary-crossing operators:
   $$\forall \omega \in \mathcal{H}, \text{target}(\omega) \in \mathcal{H} \quad \text{and} \quad \forall \omega \notin \mathcal{H}, \text{target}(\omega) \notin \mathcal{H}$$
   A Hermetic Asset is both "leak-proof" and "leak-resistant."

4. **Stability ($\mathbb{S}$)**: The property of a Color-Map sequence where the resolution of all operators $(\omega_1, \omega_2, \dots, \omega_n)$ results in a single, reproducible state $\sigma_{final}$. This requires a **deterministic total ordering** ($<$) over the set of operators $\Omega$.

5. **Relocation ($\rho$)**: A transformation function $\rho: V \to \mathcal{A}'$ that maps a node's unique identifier to a new namespace $\mathcal{A}'$ without altering the node's internal operators or its relative position in the DAG. This decouples **Identity** from **Scope**.

### Formalism: Namespace, Scope, and Identity

We need to be able to distinguish between a node's global address, and it's position in a compositional hierarchy; this is the affordance that allows a node to be "relocated" without breaking the logical references (the operators) that point to it. By keeping namespace flat, the Color-DAG may serve the independence of a node's location, and its scope.

Relocation therefore allows a subgraph to treated as a module that can be moved from one scope into another without having to rewrite its operators, provided that its targets exist in global namespace.

1. **Namespace ($\mathcal{N}$)**: A global set of unique identifiers $\mathcal{N} \subset \mathcal{A}$ where each $id \in \mathcal{N}$ corresponds to exactly one Color-Node $v$. The namespace is flat and provides the absolute address for any operator $\omega$ to target a node.

2. **Compositional Scope ($S$)**: A recursive mapping $S: V \to \mathcal{P}(V)$ that defines a directed tree structure (the "containment tree") overlaid on the Color-DAG. If $v_j \in S(v_i)$, then $v_j$ is said to be "contained" within the scope of $v_i$.

3. **Identity-Scope Decoupling**: The property where the identifier $id(v)$ is invariant under a change in $S(v)$. 
   $$\forall v \in V, \text{if } S(v) \to S'(v), \text{ then } id(v) = id(v)$$
   This ensures that an operator $\omega$ targeting $v$ via its $id$ remains valid even if $v$ is relocated to a different branch of the containment tree.

4. **Relocation Operator ($\rho$)**: A structural transformation $\rho(v, S_{new})$ that updates the mapping $S$ such that $v$ is removed from its current parent scope and inserted into $S_{new}$. 
   * A **Stable Relocation** is one where $v$ is not part of a **Hermetic Asset** $\mathcal{H}$, or where the relocation moves the entire subgraph $\mathcal{H}$ as a unit.

5. **Boundary Violation (Formalized)**:
   * **Leakage**: An operator $\omega$ in $v$ where $\text{target}(\omega) = v_t$ and $v_t \notin S(v)$ (and $v_t$ is not a descendant).
   * **Infiltration**: An operator $\omega$ in $v$ where $\text{target}(\omega) = v_t$ and $v \notin S(v_t)$ (where $v$ is an ancestor or external).

### CSP-Derived Formalisms: Coordination and Messaging

Next, we move from static graph rewrites to a dynamic algebra of events. In this context, the Superior Process acts as a discrete scheduler that prevent captures leakage and infilttration, and forces them sequentially through defined ports. We will use the mechanisms of Hoare's *Communicating Sequential Processes* to accomplish this.

Through this means we step towards a resolution function, which will be a trace of events processed by the Superior Process. Since the Sequential Channel is FIFO, the order of operations from a single source is guaranteed. The total ordering required for stability is now a matter of merging multiple channels in a structured manner. It is a central invariant that graph structure is immutable during resolution; only $\sigma$ is rewritten.

1. **Superior Process ($\mathcal{P}_{sup}$)**: A specialized, non-terminating process (e.g., `exec`) that possesses exclusive authority to execute the **Color-Map** updates. It acts as the mediator between Hermetic Assets $\mathcal{H}_i$, ensuring that no asset can directly mutate the state of another.

2. **Sequential Channel ($ch$)**: A reliable, directed FIFO (First-In-First-Out) queue. It is defined as a sequence of messages $M = \langle m_1, m_2, \dots, m_n \rangle$, where each message $m$ represents a requested **Color-Operator** $\omega$ or a state-query.

3. **Message ($\mu$)**: A communication primitive sent from a node $v$ to $\mathcal{P}_{sup}$. A message is a tuple $(v_{source}, v_{target}, c_{value}, \tau)$, where $\tau$ is a timestamp or sequence index used to ensure **Stability**.

4. **Event ($\alpha$)**: The atomic act of the Superior Process popping a message from a Sequential Channel and applying the operator to the Color-Map:
   $$\sigma_{t+1} = \alpha(\sigma_t, m)$$

1. **Interleaving**: The property where $\mathcal{P}_{sup}$ handles multiple Sequential Channels by non-deterministically (or by priority) choosing which channel to service next, effectively serializing parallel requests into a total order.

## From Partial to Total Order

7. **Precedence Relation ($\prec$):** We define $v_i \prec v_j$ if there exists a directed path from $v_i$ to $v_j$ in the Color-DAG. This represents a structural dependency where the state of $v_i$ must be determined before the operators in $v_j$ can be evaluated.

8. **Topological Extension ($<$):** A total ordering $<$ is a linear extension of the partial order $\prec$ such that:
   $$\forall v_i, v_j \in V: (v_i \prec v_j) \implies (v_i < v_j)$$
   In this system, the **Superior Process** utilizes $<$ to serialize the **Sequential Channel**, ensuring that if two operators $\omega_1, \omega_2$ target the same node $v_t$, the one originating from the "earlier" node in the total order is processed first (or last, depending on the override logic).

## Tie-Breaking and the Logic of Overwrites

9. **Lexicographical Tie-Breaker ($\ll$):** For any two nodes $v_i, v_j$ where $v_i \nprec v_j$ and $v_j \nprec v_i$ (incomparable in the DAG), we define a relation $\ll$ such that $v_i \ll v_j$ if $id(v_i)$ precedes $id(v_j)$ in the alphabet $\mathcal{A}$.

10. **Canonical Total Order ($<$):** The absolute evaluation order is defined as:
    $v_i < v_j \iff (v_i \prec v_j) \lor (v_i \ll v_j \text{ given } v_i, v_j \text{ are incomparable})$.


---

## Common Notions (Axiomatic Foundations)

The first notion, transitivity of state, will allow us to prove substitution theorems, if two subgraphs are color-equivalent, they are exchangable without altering the final resolution.

The second, compositional integrity, tells us that if we know the behavior of a subgraph, we can predict the behavior of the whole.

The third, parental invariance, explains the constraints under which a child will not induce chaos on itself.

The fourth states that a node retains its identity irrespective of value or relocation.

1. **Transitivity of State**: For any two Color-Nodes $v_i, v_j$ and a specific mapping $\sigma$, if $\sigma(v_i) = c$ and $\sigma(v_j) = c$, then $v_i$ and $v_j$ are equivalent with respect to the property of color. If a third node $v_k$ also maps to $c$, then $v_i \equiv v_k$.

2. **Compositional Integrity**: The state of a subgraph $\mathcal{H}$ is the union of the states of its constituent parts $\{v_1, v_2, \dots, v_n\}$. If no internal operator $\omega$ or external infiltration $\downarrow$ overrides a node $v \in \mathcal{H}$, the global state $\sigma(\mathcal{H})$ is preserved as the sum of its unchanged parts.

3. **Local Invariance (Scoping Law)**: If an operator $\omega$ (mutation) is confined to a child node $v_c$ within the compositional scope of a parent $v_p$, and the operator does not exhibit Leakage ($\uparrow$), then the state $\sigma(v_p)$ remains invariant. The parent's identity and properties are not modified by internal child-state transitions.

4. **Identity Persistence**: A node $v$ retains its unique identifier $id \in \mathcal{A}$ regardless of the value $c \in \mathcal{C}$ assigned to it by the Color-Map or its Relocation $\rho$ within the DAG.


## Compositional Axioms: Encapsulation and Boundary Control

1. **Axiom of Leakage Encapsulation**: 
   A subgraph $\mathcal{H}$ is Leakage-Encapsulated if no operator $\omega$ hosted within $\mathcal{H}$ has a target $v_t \notin \mathcal{H}$. 
   * *Consequence*: The internal logic of $\mathcal{H}$ cannot "reach out" to modify the global Color-Map $\sigma$ outside its own boundary.

2. **Axiom of Infiltration Encapsulation**: 
   A subgraph $\mathcal{H}$ is Infiltration-Encapsulated if no operator $\omega$ hosted outside $\mathcal{H}$ has a target $v_t \in \mathcal{H}$. 
   * *Consequence*: The internal state of $\mathcal{H}$ is protected from "spooky action" or overrides from the parent or sibling scopes.

3. **Axiom of Strict Encapsulation (Hermeticity)**: 
   A subgraph $\mathcal{H}$ is Strictly Encapsulated if and only if it satisfies both Leakage and Infiltration Encapsulation. 
   * *Consequence*: $\mathcal{H}$ becomes a **Hermetic Asset**. Its final state $\sigma^*(\mathcal{H})$ is a pure function of its internal operators and its initial local state $\sigma_0(\mathcal{H})$.

4. **Axiom of Delegated Interaction**: 
   Communication between two Strictly Encapsulated subgraphs $\mathcal{H}_1$ and $\mathcal{H}_2$ must be mediated by a **Superior Process** via **Sequential Channels**. Direct mutation is replaced by message-passing, preserving the internal stability of both assets.

---

# Part 1: Tree Based Mutation

This first set of theorems describes a directed acyclic graph (DAG) where state is strictly hierarchical. For the  purposes of proof, a restricted yellow-green tree is sufficient to demonstrate principles that apply generally to trees of any degree, and subsequently to DAGs. What is shown here is that any topological evaluation yields the same result because dependencies are acyclic and opinion precedence is fixed.

For the purposes of illustration the proofs are described in terms of mutation. USD opinions do not mutate or override nodes in-place during traversal; opinions are gathered, they are resolved via strength ordering, and finally a value is produced. USD composition is thus closer to functional reduction than mutation; however for the purposes of these theorems, the analogy is sufficient.

---

### Theorem 1.1: Locality (The Principle of Downward Causality)

**Introduction**:

Stability is a structural guarantee of the DAG. By restricting action to children, we ensure that even in the presence of message interleaving in the Sequential Channel, the final coloring of the graph remains the same. This justifies why we can reason about a node and its children in isolation without worrying about spooky action at a distance from unrelated subgraphs.

**Premise**: 
Let $G = (V, E)$ be a Color-DAG. For every node $v \in V$, the set of operators $\Omega_v$ contained within $v$ may only target nodes $v_t$ such that there exists a directed path from $v$ to $v_t$. 

**Statement**: 
The state $\sigma$ converges to a unique fixed point $\sigma^*$ such that for any two valid topological sortings $L_1$ and $L_2$ of $V$, the resulting Color-Map is identical: $\mathcal{R}(L_1) = \mathcal{R}(L_2) = \sigma^*$.

**Proof Sketch**: 
1. **Partial Order**: A DAG induces a partial order $(\le)$ on $V$. If $v_i \le v_j$, then $v_j$ cannot contain an operator targeting $v_i$ (Acyclicity).
2. **Independence**: For any two nodes $v_a, v_b$ that are incomparable in the partial order (siblings or unrelated branches), the operators $\omega_a$ and $\omega_b$ defer to the canonical order.
3. **Convergence**: Since each operator is a substitution $(\sigma[v_t \mapsto c])$, and signals only propagate "downward" relative to the partial order, the state of any node $v$ becomes constant once all ancestors of $v$ have been evaluated. 
4. **Conclusion**: Traversal order is irrelevant as long as it is a linear extension of the partial order.

---

### Proposition 1.2: Linearity (Global Ordering)

**Introduction**
The acyclic nature of the graph ensures that state settles.

**Statement**: 
If the set of all nodes $V$ is partitioned into disjoint subgraphs $\{G_1, G_2, \dots, G_n\}$, the final state $\sigma^*$ remains stable provided that the operator targeting rule respects a total order across subgraphs. Specifically, an operator in $G_i$ may only target a node in $G_j$ if $i \le j$.

**Remark**: 
This extends the local DAG property to the global system. By treating "Subsequent Trees" as extended children, we maintain the unidirectional flow of information required for a fixed-point resolution.

---

### Proposition 1.3: Stability in Disjoint DAGs (The Flattening Principle)

**Introduction**
Flattening multiple DAGs into one demonstrates why the Superior Process can treat the collection of DAGs via a single Sequential Channel.

**Statement**: 
Stability in a forest of disjoint trees reduces to the stability properties of a single tree.

**Proof**: 
Given a set of trees $\mathcal{T} = \{T_1, T_2, \dots, T_n\}$, we define a synthetic root $R$ such that edges $(R, root(T_i))$ are added for all $i$. The resulting structure is a single DAG. Under the condition that operators only target nodes "subsequent" in the global topological order, the evaluation of the forest is functionally identical to the evaluation of the single flattened DAG.

---

### Theorem 1.4: Uniqueness of Identity (The Alphabet Constraint)

**Introduction**
No DAG manipulation, including Relocation, can cause two nodes to collide in namespace.

**Statement**: 
The state $\sigma$ of the Color-Map is injective with respect to identifiers $id : V \rightarrow A$ is injective. No transformation (Mutation, Relocation, or Flattening) can result in two distinct Color-Nodes sharing the same $id$.

**Proof**: 
1. **By Construction**: The alphabet $\mathcal{A}$ is unbounded and identifiers are assigned uniquely at node inception.
2. **Namespace Preservation**: Relocation $\rho$ decouples scope from identity but does not modify the identity itself.
3. **Collision Avoidance**: Because $id_i \neq id_j$, an operator targeting $id_t$ has a single, unambiguous entry in the Color-Map $\sigma$. Therefore, the "Stability" of the map is never compromised by identity-ambiguity.

---

# Part 2: Conditional State

In this section we lay the groundwork of conditional evaluation in which total ordering is subject to axiomatic determination during evaluation.

---

### Theorem 2.1: Reduction of Conditional Mutation

**Introduction**:
Control nodes that activate or deactivate subgraphs based on their color don't break stability. The topology of the DAG embodies data flow in addition to introducing a computability structure conditional on state made global via the color-map.

**Given**:
* A Color-Node $v_s$ with state $\sigma(v_s) = c \in \mathcal{C}$.
* A Conditional Operator $\omega_{cond}$ hosted in $v_s$, with conditional axioms $\Phi$ evaluated against the Color-Map $\sigma$. It performs the rewrite $\sigma[v_t \mapsto f(\Phi(\sigma))]$ for some target $v_t$.
* The constraint that $v_t$ is a descendant of $v_s$ in the DAG.

**Statement**:
Conditional mutation resolves to a unique fixed point and is functionally reducible to Theorem 1.1 (Locality).

**Proof**:
1. **Dependency Integrity**: The evaluation of $\Phi(\sigma)$ depends only on states already present in $\sigma$. Because $v_t$ is a descendant of $v_s$, all nodes whose states $\Phi$ may consult are either $v_s$ itself or ancestors of $v_s$, all of which are upstream in the partial order.
2. **Temporal Precedence**: By Theorem 1.1, $\sigma(v_s)$ and all ancestor states are fixed before any descendant is evaluated. Therefore $\Phi(\sigma)$ is fully determined at the moment $\omega_{cond}$ is processed.
3. **Execution Path**: Since $\Phi(\sigma)$ is determined, $f(\Phi(\sigma))$ yields a unique color $c' \in \mathcal{C}$, and $\omega_{cond}$ collapses into a simple operator $\omega$ performing the rewrite $\sigma[v_t \mapsto c']$.
4. **Conclusion**: The conditional introduces no back-edges: the choice is a function of stable upstream state and the result is a strictly downward mutation. The system maintains a total order and converges to a unique fixed point.

---

### Theorem 2.2: Inductive Stability of Conditionals

**Introduction**:
If two nodes are not related by a path, but both target the same value in the map, a precedence rule is required.

**Statement**: 
The necessity of a total ordering $<$ ensures that even in complex conditional branching, the resolution of the Color-Map $\sigma$ is an inductive process.

**Proof**:
1. **Base Case**: Nodes with in-degree 0 (roots) have their colors $\sigma(v_{root})$ fixed at $t=0$.
2. **Inductive Step**: Assume all nodes $v < v_k$ in the total order have reached a stable state. 
3. **Resolution**: The node $v_k$ is targeted by a set of operators $M_k = \{ \omega_1, \omega_2, \dots \}$. Since all source nodes $v_s$ of these operators satisfy $v_s < v_k$, their states (and thus their conditional choices) are already stable by the inductive hypothesis.
4. **Conclusion**: $v_k$ resolves to a unique color $c \in \mathcal{C}$ based on the total order of incoming messages. By induction, the entire map $\sigma$ reaches a unique fixed point.

---

### Proposition 2.3: Deterministic Tie-Breaking

**Introduction**:
If a precedence rule yields a tie, we fall back to lexicographic ordering in order to have a global total order, even in the presence of precedence ties.

**Statement**: 
The combination of structural dependency ($\prec$) and identity-based priority ($\ll$) induces a unique total order $<$ over the set of all operators $\Omega$, ensuring the Sequential Channel is populated deterministically.

**Proof**:
Since every node possesses a unique $id$ from $\mathcal{A}$, the relation $\ll$ is a total ordering on the set of identifiers. Because the DAG is acyclic, $\prec$ is a strict partial order. The union of a strict partial order and a lexicographical order on unique IDs provides a linear extension, ensuring that for any two operators $\omega_1, \omega_2$, either $\omega_1 < \omega_2$ or $\omega_2 < \omega_1$.

---

### Theorem 2.4: Erasure (The Displacement Principle)

**Introduction**:
Finally we declare that since we have precedence and tie breaking rules, when multiple operators target the same value, we can overwrite the map according to precedence.

**Statement**: 
Given a target node $v_t$ and a set of operators $M_t = \{ \omega_1, \omega_2, \dots, \omega_n \}$ ordered by $<$, the final state $\sigma(v_t)$ is determined solely by the operator $\omega_n$ where $n$ is the maximal index. All preceding operators $1 \dots (n-1)$ are "erased."

**Proof**:
1. **Assignment Semantics**: By definition (Section I.4), an operator performs a rewrite $\sigma[v_t \mapsto c]$.
2. **Sequentiality**: The Superior Process $\mathcal{P}_{sup}$ processes the Sequential Channel in the order defined by $<$.
3. **Overwriting**: If $\omega_i$ sets $\sigma(v_t) = \text{yellow}$ and $\omega_j$ (where $i < j$) sets $\sigma(v_t) = \text{green}$, the subsequent write at index $j$ displaces the value at index $i$.
4. **Conclusion**: The "last" operator in the total order has terminal authority. This ensures that even with overlapping conditional logic, the result is a single, stable color.

---

# Part 3: Identity and Concurrency

### Theorem 3.1: Persistence of Identity (The Relocation Invariant)

**Introduction**:
For Hermetic assets, we don't need a global Superior Process. A local Superior Process is sufficient, enabling parallelism. The global Superior Process handles delegated interactions resulting from messages passed between assets.

**Statement**: 
The logical mapping of an operator $\omega$ to its target $v_t$ is invariant under the Relocation operator $\rho$. 

**Proof**:
1. By **Identity-Scope Decoupling**, $\rho(v, S_{new})$ changes the compositional mapping $S$ but leaves $id(v) \in \mathcal{A}$ unchanged.
2. By **Section I.4**, an operator $\omega$ addresses its target via its $id$.
3. Since the global namespace $\mathcal{N}$ is flat and identity-persistent (Common Notion 4), the rewrite rule $\sigma[v_t \mapsto c]$ remains valid regardless of the parent scope $S(v_t)$.
4. **Conclusion**: Moving a node (Relocation) does not "break" the incoming or outgoing pointers of its operators.

---

### Theorem 3.2: Embarrassing Parallelism (The Hermetic Concurrency)

**Introduction**:
Computing two hermetic assets concurrently will never yield a race condition.

**Statement**: 
A system $\Sigma$ composed of $n$ Strictly Encapsulated (Hermetic) Assets $\{\mathcal{H}_1, \mathcal{H}_2, \dots, \mathcal{H}_n\}$ can be evaluated in parallel with zero synchronization overhead between assets.

**Proof**:
1. **Disjoint Write-Sets**: By the **Axiom of Infiltration Encapsulation**, no operator external to $\mathcal{H}_i$ can target a node within $\mathcal{H}_i$. Thus, the set of target IDs for all operators in $\mathcal{H}_i$ is disjoint from the target sets of all $\mathcal{H}_j$ (where $i \neq j$).
2. **Disjoint Read-Sets**: By the **Axiom of Leakage Encapsulation**, internal conditional axioms $\Phi$ only query the local state $\sigma(\mathcal{H}_i)$.
3. **Independence**: Since there is no shared mutable state and no cross-boundary dependencies, the resolution of $\mathcal{H}_i$ does not require knowledge of the intermediate states of $\mathcal{H}_j$.
4. **Conclusion**: The **Superior Process** can delegate the evaluation of each Hermetic Asset to independent processing threads. The final global state $\sigma^*$ is simply the union of the locally determined fixed points.

---

### Theorem 3.3: Stability of Delegated Hermetic Interaction

**Introduction**:
Enforcing non-recursion, the Superor Process becomes a pure pipe with no feedback. This caps the execution cost at $\mathcal{O}(m)$. The Superior Process collects all opinions and applies them in a single pass. Finally a full composition can be treated as globally totally ordered as long as they all communicate via the same Sequential Channel.

**Statement**: 
A composition of Hermetic Assets $\mathcal{G} = \{\mathcal{H}_1, \mathcal{H}_2, \dots, \mathcal{H}_n\}$ mediated by a Superior Process $\mathcal{P}$ reaches a stable fixed point if and only if:
1. All inter-asset interactions are serialized via a FIFO Sequential Channel $\mathcal{C}$.
2. The Superior Process $\mathcal{P}$ is the exclusive writer to the Global Color-Map $\sigma$.
3. The evaluation of a message $m \in \mathcal{C}$ does not trigger the generation of a new message $m' \in \mathcal{C}$ (Non-Recursion).

**Proof**:
1. **Determinism via Sequentiality**: Since $\mathcal{C}$ is a FIFO queue, it imposes a total ordering $(<)$ on all requested mutations. For any target node $v_t$, the **Theorem of Erasure (2.4)** ensures that the final value is the result of the last message in $\mathcal{C}$ targeting $v_t$, eliminating race conditions.
2. **Isolation via Hermeticity**: Because assets are strictly encapsulated, an operation within $\mathcal{H}_i$ cannot bypass $\mathcal{P}$ to affect $\mathcal{H}_j$. This ensures that $\mathcal{P}$ maintains a consistent "View" of the state throughout the traversal.
3. **Termination via Non-Recursion**: Let $M$ be the set of messages initially populated in $\mathcal{C}$ by the assets. If the act of $\mathcal{P}$ processing a message $m_i$ cannot append a new message $m_{n+1}$ to $\mathcal{C}$, then the length of the queue $|\mathcal{C}|$ is monotonically decreasing. 
4. **Conclusion**: The process is guaranteed to terminate in exactly $m$ steps, where $m$ is the initial count of inter-asset signals. The final state $\sigma^*$ is unique and reproducible.

---

# Part 4: Functional Determinism

---

### Theorem 4.1: Final State as Pure Function

**Introduction**:
There is no ghost in the machine; output is a strict product of input configuration and the defined operators. Isolated components are guaranteed to function the same way when plugged into a larger composition. Subgraphs may be memoized; if predecessor subgraphs have not changed, re-evaluation is unnecessary. 

**Statement**: 
For any Color-DAG $G$, initial state $\sigma_0$, and set of Sequential Channels $\mathcal{C}$, the final resolved state $\sigma^*$ is a pure function of the triple $(G, \sigma_0, \mathcal{C})$. 

$$\mathcal{R}(G, \sigma_0, \mathcal{C}) \to \sigma^*$$

**Proof**:
1. **Structural Determinism**: By Theorem 1.1 (Locality) and Theorem 2.1 (Reduction of Conditionals), the flow of influence is restricted to the downward partial order of the DAG, ensuring the "topology of choice" is fixed.
2. **Sequential Determinism**: By Proposition 2.3 (Tie-Breaking) and Theorem 3.3 (Stability of Interaction), every possible interaction is mapped to a total order $(<)$ within the Sequential Channel.
3. **Value Determinism**: By Theorem 2.4 (Erasure), the final value of any node is the result of the last writer in the total order.
4. **Conclusion**: Since every step of the resolution, from the identification of nodes to the ordering of overrides, is governed by deterministic axioms with no side effects or hidden states, the resolution process $\mathcal{R}$ is a pure function.

---

### Corollary 4.1.1: The Compositional Identity

If a Hermetic Asset $\mathcal{H}$ is replaced by a single node $v$ that produces the same output messages to the Sequential Channel $\mathcal{C}$, the state of the remainder of the graph $(G - \mathcal{H})$ remains invariant.

---

## Formal Algorithm: The Prim Composition Pipeline (PCP)

The PCP algorithm is the mechanism that constructs the Total Order ($<$) from the Composition Space. It operates in two distinct phases: Index Construction and Value Resolution. Because PCP creates a dependency DAG for each primitive, composition can be composed in parallel; the only shared state is the read-only layer stack, which satisfies Axiom 5.3 (Strict Encapsulation).

For the purposes of these derivations, we claim formal equivalence between PCP and a CSP: Given PCP with discovered opinion set $\Omega$ and deterministic LIVERPS ordering $<$, there exists a CSP system with channels containing $\Omega$ and a scheduler implementing $<$ such that the trace of $\sigma$ is identical. Further we claim that this process implements ordering.

#### 1. Index Construction (The Discovery Phase)
Given a prim path $p$, the algorithm recursively discovers all contributing nodes $n = (s, l)$ to build the dependency set $D_p$.

* **Step A: Root Discovery.** Begin with the local LayerStack opinions at path $p$.
* **Step B: Relocation.** Apply the **Relocation Mirage** $\sigma : l_{child} \rightarrow l_{parent}$. If a node has been relocated, all downstream arcs are re-targeted to the new namespace identity. This step precedes all arc expansion so that every subsequent arc resolution sees the correct namespace.
* **Step C: Arc Expansion.** For each node, identify arcs in **LIVERPS** order:
    1.  **References/Payloads:** Open external files and map their internal $l_{child}$ to the current $l_{parent}$.
    2.  **Inherits/Specializes:** Query the global `library` for shared class data.
    3.  **Variants:** Evaluate the current Color-Map $\sigma$ to select the active branch.
* **Step D: Cycle Detection.** Maintain a visited set $V$. If a discovered node $n \in V$, the arc is pruned (Acyclicity Constraint).

Step 1B confirms relocation happens before any arc is expanded, establishing namespace identity as a precondition for all subsequent arc resolution (Theorem 5.2, below).

Step 1C shows that signal only moves inwards (references) or across (inherits), but never up, to change the structure of the caller. (Theorem 1.1, Locality).

Step 1D prevents reccursion via the Sequential Channel (Theorem 3.3, Non-Recursion).

#### 2. Value Resolution (The Winnowing Phase)
Once the set $D_p$ is discovered, the **Superior Process** (the USD Stage) resolves the final color $\sigma^*(p)$.

$$\sigma^*(p) = \text{Reduce}(D_p, \text{LIVERPS}_<)$$

The `Reduce` function follows the **Theorem of Erasure**:
1. Sort $D_p$ by arc type (LIVERPS) and then by LayerStack strength (Sublayer Monotonicity).
2. Traverse the sorted list from **Strongest to Weakest**.
3. The first node $n$ that contains an explicit "opinion" (a non-null color) defines the state. 
4. All subsequent (weaker) opinions are masked (The Displacement Principle).

The PCP algorithm is thus a series of map rewrites and sorted merges, and is shown to be a strictly deterministic machine.

---

# Part 5: USD PCP-LIVERPS Correctness

**Definition: The USD Prim-Index as a Total Order (<)**
In USD, the state of a prim is not a single value, but a "Winnowing" of an opinion set. We define the **PCP Function** $\mathcal{PCP}: \mathcal{N} \to \mathcal{C}$ which maps a Prim Path to a resolved color value by evaluating the set of contributing nodes $N$ via the LIVERPS priority relation.

### Proposition 5.1: LIVERPS as a Sequential Channel
**Statement**: The LIVERPS strength ordering is a structural implementation of the **Sequential Channel (Theorem 3.3)**, ensuring that the composition of disparate layers remains a pure function.

**Proof**:
1. **Serialization of Opinions**: LIVERPS provides a total ordering over opinion sources. Local opinions ($L$) are those of the root node's own layer stack and are implicitly the strongest, as the root node is initialized before any arc expansion. The remaining letters name composition arc types in decreasing strength: $I > V > E > R > P > S$. Even if multiple sources provide conflicting colors for a prim, the **Theorem of Erasure (2.4)** applies: the strongest opinion in the LIVERPS sequence displaces all weaker ones.
2. **Prevention of Inversion**: By the **Sublayer Monotonicity Constraint**, a weaker layer in the `LayerStack` cannot provide an opinion that overrides a stronger layer. This enforces **Leakage Encapsulation (Axiom 5.1)**; the child (referenced asset) cannot reach "up" to change the "opinion" of the parent (local stage).
3. **Fixed-Point Termination**: Because **PCP** detects and prunes cycles during index construction (**Acyclic-DAG Constraint**), and because LIVERPS forbids "Backwards Strength" (a Reference arc cannot contribute opinions that override the root node's local layer stack), the evaluation is non-recursive. By **Theorem 3.3**, the process terminates in $O(m)$ time relative to the number of opinions.

---

### Theorem 5.2: The Relocation Mirage (Namespace Stability)
**Statement**: The **Relocates (E)** arc preserves **Theorem 3.1 (Persistence of Identity)** while allowing for the resolution of namespace collisions.

**Proof**:
1. **Order of Operation**: Two distinct orderings apply to Relocates and must not be conflated. In *opinion strength* (value resolution), Relocates rank between Variants and References ($V > E > R$). In *execution order* (index construction), Relocations are resolved *before all arc expansion* — before References, Inherits, Variants, or Payloads are processed — because namespace identity must be established as a precondition for every arc to correctly resolve its target path.
2. **Namespace Binding**: By establishing the "Mirage" (the new $id \to path$ mapping) before any arc is bound, the Superior Process ensures that every **Infiltration Axiom** targets the correct node.
3. **Collision Safety**: Relocates allow two Hermetic Assets with identical internal naming alphabets to be composed without violating **Theorem 1.4 (Uniqueness of Identity)** by re-mapping their identities to disjoint paths in the global stage.

---

### Theorem 5.3: Specializes as the "Backstop" Axiom
**Statement**: The **Specializes (S)** arc functions as a formal fallback, satisfying the requirement for **Referential Transparency** in the absence of external Infiltration.

**Proof**:
In a **Strictly Encapsulated** asset, if no external "Over" (Infiltration) is provided, the node must still resolve to a state. **Specializes** provides the "default" axioms. Mathematically, $S$ is the identity element in the composition algebra: it provides values only when the stronger LIVERPS channels are empty, preserving the **Stability of Delegated Interaction**.

The backstop property is not achieved merely by the arc-type enum value. It requires a non-local graph transformation. Specialize arcs are first recorded as **inert placeholder nodes** during arc expansion. After all other expressed arcs have been processed, an **implied-specializes propagation** phase physically relocates each specialize node to be a direct child of the root node, adjusting its namespace mapping accordingly. Without this propagation, a Specialize arc authored inside a referenced asset would inherit Reference-strength rather than Specialize-strength, violating the backstop guarantee. The propagation ensures that specialize opinions are always the weakest in the final graph, regardless of where in the composition hierarchy they were originally authored.

## Theorems of Variant Set Stability

USD variant sets introduce composition arcs which may or may not be present according to selection state of the variant set. We will establish that Variant Sets are stable switches as long as they don't leak upwards. The selection of the set must be Local or Inherited, anchoring choices before weaker arcs such as References are invoked.

### Theorem 5.4: Variant Selection Primacy (Anti-Recursion)

**Statement**: 
A Variant Selection must be determined by a state $\sigma(v_s)$ that is strictly stronger in the LIVERPS order than any opinion contained within the selected Variant $\mathcal{V}$.

**Proof**:
1. **Dependency Direction**: Assume a Variant $\mathcal{V}$ is selected based on a value $c$. If an opinion within $\mathcal{V}$ could modify $c$, a feedback loop is created ($\mathcal{V} \to c \to \mathcal{V}$).
2. **Topological Constraint**: By **Theorem 1.1 (Locality)**, signal only moves downward. Since the Variant Selection act precedes the expansion of the Variant's internal prim-index, any internal opinion attempting to "Leak" upward to change the selection is ignored by the **Superior Process**.
3. **Conclusion**: By forcing selection to occur at a stronger level than the variant’s contents, USD ensures the choice is a "pre-condition" of the subgraph, not a "result" of it.

---

### Proposition 5.5: The Infiltration Guard (Variant Logic Integrity)

**Statement**: 
If an external Infiltration ($\downarrow$) could bypass the internal logic of a Variant Set $\mathcal{V}$, the composition is non-deterministic.

**Proof**:
1. **Encapsulation**: A Variant Set defines a set of discrete axiomatic paths (e.g., Yellow Path vs. Green Path).
2. **Violation**: If an external arc (like an `Inherit` from a distant scope) can force a value into a prim inside the Variant, bypassing the Variant's own internal opinions, the Variant's "Hermeticity" is compromised.
3. **Resolution**: USD maintains stability by treating the Variant as a **Hermetic Asset**. While external "Overs" can provide values, they are integrated into the LIVERPS order for that prim index. Infiltration is "Controlled"—it cannot invalidate the fact that a specific branch was chosen; it can only contribute to the final value resolution within that branch.

---

### Theorem 5.6: Variant Set Leakage Instability (The Paradox of Choice)

**Statement**: 
If a Variant Set is permitted to escape outward encapsulation (Leakage), the global total order $<$ is invalidated.

**Proof**:
1. **Scope of Effect**: A Variant Set $\mathcal{V}$ at path $p$ is strictly contained within the subtree rooted at $p$. 
2. **Leakage Scenario**: If a selection at $p$ could add a `Reference` arc to a parent node $p_{parent}$, it would redefine the structure that is currently traversing $p$.
3. **Stability Failure**: This would require the **Superior Process** to restart the **Prim Indexing Algorithm (Section VIII)** for the entire stage, potentially leading to a new selection at $p$, creating an infinite cycle.
4. **Conclusion**: Stability is only maintained if the "Outward effect" of a Variant is null. A Variant may change its children, but never its ancestors.

---

## Reduction of PCP Evaluation to Sequential Functional Reduction

This section establishes the operational equivalence between the USD composition procedure described previously and a deterministic sequential reduction over the set of discovered opinions. The result serves as the structural bridge between the mechanism developed in earlier chapters and the complexity and encapsulation results that follow.

---

### Proposition 5.7: Evaluation Invariants

The arguments in this chapter depend on two invariants established earlier but restated here for clarity.

**Invariant 1 — Graph Immutability**

During a single evaluation of composition, the dependency graph

$$
\mathcal{G} = (\mathcal{V}, \mathcal{E})
$$

is not structurally modified. Arcs may be conditionally activated (e.g., variants), but no operator mutates the topology of the graph during reduction.

**Invariant 2 — State-Only Mutation**

Operators do not mutate the graph. They rewrite only the state function

$$
\sigma : \mathcal{V} \rightarrow \mathcal{C}
$$

Thus composition consists entirely of a sequence of state rewrites.

These invariants ensure that evaluation can be modeled independently from graph construction.

---

### Proposition 5.8: Opinion Set Extraction

Let $\Omega$ denote the set of all opinions reachable from a prim index under PCP traversal.

Formally,

$$
\Omega = \{ \omega_1, \omega_2, \dots, \omega_n \}
$$

where each opinion is a write operation on $\sigma$.

Because the composition graph is acyclic and finite, traversal terminates and $\Omega$ is finite.

### Lemma 5.8.1: Finite Opinion Set

PCP discovery yields a finite set $\Omega$.

*Sketch.*

The dependency graph is finite and acyclic; traversal visits each contributing node at most once under the composition rules. Therefore the number of discovered opinions is finite.

---

### Proposition 5.9: Canonical Ordering

Earlier chapters established the precedence relation derived from the composition rules (LIVERPS and associated tie-breakers). This relation defines a deterministic ordering over opinions. The ordering rules themselves together form a lexicographic ordering over a finite tuple. 

layer strength → arc type → site → prim path → property → time sample (if applicable)

As a lexicographic comparison over finite keys, totality is provided by the rules.

Let

$$
< : \Omega \times \Omega
$$

be the canonical precedence relation.

### Lemma 5.9.1: Totality

The precedence rules refine the dependency partial order into a deterministic total order over $\Omega$.

Consequently, there exists a unique sequence

$$
\omega(1) < \omega(2) < \dots < \omega(n)
$$

representing the evaluation order of all opinions.

This transforms composition from graph traversal into ordered evaluation.

---

### Proposition 5.10: Operational Realization via Sequential Channel

We now show that the PCP evaluation procedure is equivalent to a sequential process consuming opinions from a FIFO channel.

Consider a system consisting of:

• a process $\mathcal{S}$ (the Superior Process)
• a FIFO channel $\mathcal{Q}$

The process $\mathcal{S}$ emits opinions into $\mathcal{Q}$ according to the canonical order $<$. The channel is consumed sequentially, applying each opinion to $\sigma$.

Formally the system executes:

```
enqueue(Q, ω(1))
enqueue(Q, ω(2))
...
enqueue(Q, ω(n))
```

and then

```
σ ← apply( dequeue(Q), σ )
```

until $\mathcal{Q}$ is empty.

---

### Theorem 5.11: PCP / Channel Equivalence

Evaluation of composition under PCP yields the same final state as the sequential channel system defined above.

**Proof (sketch).**

1. PCP determines the same precedence relation $\prec_{PCP}$.
2. The algorithm processes opinions respecting this ordering.
3. The channel system applies the same operations in the same order.

Since operators only rewrite $\sigma$ and have no side effects on graph structure, the two executions are identical with respect to $\sigma$.

Therefore the final state is the same.

---

### Proposition 5.12: Reduction to Functional Fold

Because the channel system produces a deterministic sequence of operations, the entire evaluation can be expressed as a functional reduction.

Let $\sigma_0$ be the initial state.

Define the operator

$$
\text{apply} : \Omega \times \Sigma \rightarrow \Sigma
$$

Then evaluation becomes

```
σ₁ = apply(ω(1), σ₀)
σ₂ = apply(ω(2), σ₁)
...
σₙ = apply(ω(n), σₙ₋₁)
```

or equivalently

```
σ_final = fold(apply, Ω, σ₀)
```

---

### Theorem 5.13: Sequential Reduction

USD composition for a prim index is equivalent to a left-fold over the ordered opinion set $\Omega$.

**Proof.**

From Theorem 4.1 evaluation reduces to sequential application of opinions in canonical order. Sequential application is definitionally equivalent to a fold over that ordered set.

---

### Immediate Consequences

Several properties follow directly from the reduction.

**Determinism**

Since $<$ is deterministic and fold evaluation is deterministic, composition produces a unique result.

**Linear Work**

Each opinion is processed exactly once.

$$
\mathcal{T}(n) = \mathcal{O}(n)
$$

where $n = |\Omega|$.

**Locality**

Operators affect only their targets in $\sigma$ and do not alter graph structure, ensuring bounded propagation.

**Encapsulation**

If a subgraph is closed under opinion targets, its evaluation is independent of the rest of the graph.

These consequences form the basis of the complexity and encapsulation analyses in the following chapters.

---

# Part 6: Complexity and Latency

## Combinatorial Stability: The Complexity of the State Space

In USD, because the Superior Process (PCP) never performs a state-space search, the system remains $\mathcal{O}(n)$, where $n$ is the number of contributing opinions on the prim index. Leakage however would require validity checking to  explore every possible permutation. As a minor clarification please note that the order $n$ here is shorthand, and hides superlinear operations for algorithmic operations such as walking ancestor chains, and so on.

### Theorem 6.1: Linear Complexity of Hermetic Composition

**Statement**: 
The total state space $\Omega$ of a composition of $n$ Strictly Encapsulated (Hermetic) Assets $\mathcal{H}$, each with $k$ internal variant states, grows linearly ($O(n)$) with respect to the reasoning required for a single resolution.

**Proof**:
1. **Independence**: By the **Axiom of Strict Encapsulation (5.3)**, the internal state of $\mathcal{H}_i$ is independent of $\mathcal{H}_j$.
2. **Local Resolution**: The Superior Process resolves each asset using its local variant selection $\sigma(v_i)$. 
3. **Additive Complexity**: To resolve the entire stage, the process performs $n$ discrete resolutions. Since no asset can "Leak" to change the selection of another, the complexity of determining a valid fixed point is $\sum_{i=1}^{n} \text{cost}(\mathcal{H}_i)$.
4. **Conclusion**: The total complexity is $O(n \cdot k_{avg})$, which is linear.

---

### Theorem 6.2: Exponential Explosion (The Leakage Penalty)

**Statement**: 
If Leakage ($\uparrow$) is permitted, such that the internal state of $\mathcal{H}_i$ can redefine the selection state of $\mathcal{H}_j$, the state space $\Omega$ transforms into a Cartesian product, resulting in exponential complexity ($O(k^n)$).

**Proof**:
1. **Coupling**: If $\mathcal{H}_1$ leaks into $\mathcal{H}_2$, then the validity of $\mathcal{H}_1$ depends on the state of $\mathcal{H}_2$. 
2. **State Dependency**: If every asset can potentially influence the configuration variables of every other asset, the system is no longer a set of $n$ independent choices, but a single global choice across $k \times k \times \dots \times k$ possibilities.
3. **Search Requirement**: To guarantee a "Stable" and "Correct" composition in a leaking system, a validator must explore the entire Cartesian product $k^n$ to ensure no selection leads to a cycle or an invalid fixed point.
4. **Conclusion**: Permitting leakage breaks the "LEGO" property, turning a modular system into a monolithic, NP-hard coordination problem.

---

### Corollary 6.2.1: The Uncountable Forest (Non-Termination)

**Statement**: 
Unstable orderings (circular dependencies via leakage) produce an undefined evaluation state.

**Proof**:
If $\mathcal{H}_1$ sets a variant in $\mathcal{H}_2$ that in turn triggers a leakage mutation back to $\mathcal{H}_1$, the Sequential Channel $\mathcal{C}$ becomes infinite (violating **Theorem 3.3: Non-Recursion**). Because the Superior Process cannot find a fixed point, the "Color" of the forest is mathematically uncountable—it exists in a state of perpetual oscillation.

---

## The Theorem of Structural Latency (The Payload Hazard)

Payloads are mechanism for structural latency; until observed, a payload is a node that exists in the namespace but has a null contribution to the sequential channel. Infiltration into an unloaded payload (e.g. an `over` targeting a prim inside a latent payload) results in a phantom index, something of a message to nowhere. After loading the targeted prim appears, and the total order is updated.

Payloads represent the cost of observability; although the system is deterministic with respect to a given set of loaded payloads, it is "Schrödinger-stable" because the act of loading or unloading a payload expands or contracts the graph. Collapse of stability does not occur because the payload mask is constant during any single execution of the PCP algorithm.

### Theorem 6.3: Determinancy of the Latent State

**Statement**: 
A Stage containing unloaded Payloads exists in a state of **Partial Total Order**. The final state $\sigma^*$ is stable with respect to the *current* observation mask, but potentially unstable with respect to the *global* state space.

**Proof**:
1. **The Observation Mask ($\mathcal{M}$)**: We define a boolean mask $\mathcal{M}: V_{payload} \to \{0, 1\}$. 
2. **Conditional Inclusion**: An operator $\omega$ within a payload $\mathcal{P}$ is only appended to the Sequential Channel $\mathcal{C}$ if $\mathcal{M}(\mathcal{P}) = 1$.
3. **The "Phantom" Index**: When $\mathcal{M}(\mathcal{P}) = 0$, the Superior Process ignores the branch. The Total Order ($<$) is calculated as if the branch does not exist.
4. **The Shift**: When an observer toggles $\mathcal{M}(\mathcal{P}) \to 1$, the Sequential Channel must be re-evaluated. Because LIVERPS places Payloads (P) near the bottom of the strength order, the new messages are usually "weak," but they can introduce new **Namespace Identities** or **Relocates** that shift the indices of existing weak opinions (like Specializes).

---

### Corollary 6.3.1: The Observation Safety of LIVERPS

**Statement**: 
The LIVERPS ordering minimizes the "Payload Hazard" by ensuring that the most volatile structural changes (References/Payloads) are weaker than the logic-defining opinion sources (the root node's local layer stack, Inherits, and Variants).

**Proof**:
Since local opinions, Inherits, and Variants all outrank Payloads in LIVERPS strength, loading a payload cannot change the **Variant Selection** or the **Inherit Class** of the prim that loaded it. The "Schrödinger's Cat" can change its own internal color, but it cannot reach out of the box to change the hand that opened the lid. This maintains **Leakage Encapsulation** even across the load-boundary.

---

## The Postulate of Observability (The Demand Rule)

Acknowledging that the total universe of a composition may be too large to resolve at once, we must introduce an observer that "collapses" the graph into a concrete total order.

**Postulate**: 
The resolved state $\sigma^*$ of a compositional system is a function of the graph $G$ and the Observer's intent $\mathcal{M}$. The "Total Order" is locally complete but globally latent.

---

### Theorem 6.5: The Resolution of Phantom Indices

**Statement**: 
An Infiltration ($\downarrow$) targeting a latent node $v_{latent} \in \mathcal{H}_{unloaded}$ remains a "Phantom Message" with zero effect on the Color-Map until $\mathcal{M}$ is updated to include $\mathcal{H}$.

**Proof**:
1. **Dormancy**: In the **Prim Indexing Algorithm**, if a node is masked ($\mathcal{M}=0$), the recursion terminates before the $id$ is registered in the active Namespace $\mathcal{N}$.
2. **Binding**: The **Superior Process** only applies operators where the target $id \in \mathcal{N}$.
3. **Activation**: Upon toggling $\mathcal{M} \to 1$, the Sequential Channel $\mathcal{C}$ is re-populated. The previously "Phantom" operator now finds its target $id$ and is integrated into the LIVERPS sequence.
4. **Stability**: Because this re-binding follows the **Theorem of Erasure**, the transition from "Unloaded" to "Loaded" is monotonic and deterministic.

---

# Part 7: Latent Hazards of LIVERPS

To reach a state of formal completeness, we must hunt for the edge cases where the LIVERPS priority logic might encounter a tie or a shadow that our current axioms haven't fully illuminated.

#### 1. The "Sublayer Ambiguity" Hazard (The Weak Total Order)

While LIVERPS defines the order of *arc types*, it relies on the Layer Stack for order within a type.

* **The Hazard:** If two sublayers in the same stack provide an opinion, our **Theorem of Erasure** requires a strongest winner.
* **The Formalization:** We must establish **Layer-Stack Monotonicity**. The position of a layer in the array $S = [s_0, s_1, \dots, s_n]$ *is* its strength. There can be no "peer" layers.

#### 2. The "Inherit vs. Specialize" Shadow (The Ancestry Hazard)

**Inherits (I)** and **Specializes (S)** are "Global" arcs—they look for a path elsewhere on the stage.

* **The Hazard:** What happens if an `Inherit` targets a prim that itself has a `Specialize` arc? Does the "Global" jump create a hidden back-edge?
* **The Formalization:** We must define **Ancestral Non-Recursion**. An arc can jump across the namespace, but the *target* of that jump must have a prim-index that is already "resolved" or "lower" in the total ordering.
* **Informally:** You can copy another subgraph, but you cannot copy a subgraph that is currently trying to copy *you*.

#### 3. The "Variant Selection Symmetry" Hazard

* **The Hazard:** If Prim A’s variant selection depends on Prim B’s color, and Prim B’s variant selection depends on Prim A’s color.
* **The Formalization:** This is the **Selection/Evaluation Split**. USD avoids this by making Variant Selection a "Composition-time" event and Color-Map lookup a "Runtime" event. However, in our formal logic, we must state that **Variant Selection $(\sigma_v)$ cannot be a function of a Resolved Color $(\sigma^*)$** within the same traversal.
* **Informally:** You cannot decide to pick the "medium" variant only after you've finished resolving the "medium" variant.

#### 4. The "Instance Proxy" Hazard (The Context Leak)

* **The Hazard:** If a "Master" Prototype prim is defined once but exists in multiple places (Instances), can an opinion inside the Master reach out to find it's specific parent?
* **The Formalization:** We must establish an **Axiom of Contextural Blindness.** A node within a compressed identity (an instance) must be **Locally Hermetic**. It can only "see" its siblings within the Prototype, and cannot query the "World Space" of its specific instance location without breaking the **Pure Function** status of the prototype.
* **Informally:** A component such as a "wheel" is the same whether it is on one car or another; if the "wheel" needs to refer to its car to change it's color, it's no longer a hermetic instance.

---

### Axiom 7.1: Monotonicity of the LayerStack
The relation $\prec_{layer}$ is a strict total order. For any two layers $s_a, s_b \in S$, if $index(s_a) < index(s_b)$, then $s_a$ possesses terminal authority over $s_b$ for all overlapping $id$ targets.

---

### Axiom 7.2: The Jump-Acyclicity Constraint
An external arc (I, R, S) targeting a path $p_{target}$ is valid if and only if $p_{target}$ is not a genealogical ancestor of the current path $p_{source}$. This ensures that the global jump does not violate Theorem 1.1 (Locality).

---

### Theorem 7.3: Phase-Separation of Selection

**Statement**:
For a composition system $\Sigma$, the resolution of the color map $\sigma^*$ is stable if and only if the set of active composition arcs $\Omega$ is determined in a phase strictly preceding the evaluation of node values.

**Proof**:
Let the resolution process be defined as a sequence of two functions, $f_{index}$ (Construction) and $f_{value}$ (Resolution).

1. **The Construction Phase**:
We define $f_{index}$ as a mapping from the initial graph $G$ and selection state $S$ to a set of resolved dependency arcs:

$$f_{index}: (G, S) \to \Omega$$

where $\Omega$ is the set of all contributing nodes and their total order $<$. Crucially, $S$ is derived from "opinions" found in the layers, not from computed colors.
2. **The Resolution Phase**:
We define $f_{value}$ as a mapping from the resolved arcs $\Omega$ to the final color map $\sigma^*$:

$$f_{value}: \Omega \to \sigma^*$$

3. **The Recursive Hazard**:
Assume the negation: Selection $S$ is a function of the resolved color $\sigma^*$.

$$S = g(\sigma^*)$$

Substituting this into our construction phase yields a recursive definition:

$$\Omega_{n+1} = f_{index}(G, g(f_{value}(\Omega_n)))$$

4. **The Fixed-Point Constraint**:
For the system to be stable, the sequence $\Omega_n$ must reach a fixed point where $\Omega_{n+1} = \Omega_n$.
By the **Axiom of Directionality**, USD enforces $n=1$ by forbidding $g(\sigma^*)$ from affecting $\Omega$. The selection state $S$ must be a "Terminal Opinion" in the LayerStack.
5. **Conclusion**:
By enforcing that the set of arcs $\Omega$ is immutable once $f_{value}$ begins, the system eliminates the possibility of a "Self-Invalidating Index." The "Switch" is set, the "Current" flows, and the result is a stable, pure function.

This separation is a hard architectural boundary. Variant selection tasks carry lower priority than all arc-expansion tasks in the composition engine's task queue, so the entire arc graph $\Omega$ is structurally complete before any variant selection is attempted. Furthermore, the selection search consults only *authored opinions* already present in the node graph; it never reads resolved field values. Additionally variants and relocates affect which arcs are active, but they do not dynamically introduce new nodes during the reduction pass. The feedback path $S = g(\sigma^*)$ is therefore not merely forbidden by convention, it is architecturally unreachable.

---

### Proposition 7.4: Invariance of Compressed Identity
For any prototype $\mathcal{P}$ used by instances $\{i_1, i_2, \dots, i_n\}$, the resolved state $\sigma^*(\mathcal{P})$ must be invariant to the parent scope $S(i_k)$. 

---

### Proposition 7.5: The "Over" Binding Priority
An "Over" (Infiltration) originating from a stronger layer in the LayerStack possesses "Universal Priority." It acts as a displacement operator that precedes all internal prototype opinions. This allows for Infiltration without requiring the Prototype to "know" its context.

---

### Proposition 7.6: Relocation Closure
If a node $v$ is relocated via an **E (Relocates)** arc, all operators $\omega$ targeting $v$ must be re-bound to the new path $p'$ before the conclusion of the Index Construction phase. This prevents the "Tombstone Hazard" (targeting a node that no longer exists).

---

# Conclusion

We now have a system where:

* LIVERPS provides Total Order
* Strict Encapsulation provides Linear Complexity
* Phase-Separation provides Stability
* Contextual Blindness provides Instancing Efficiency

And thus we have defined an algebraically complete definition of composition within USD.

This work demonstrates that the stability of complex 3D scene graphs (specifically OpenUSD) is not a byproduct of implementation details, but the result of rigorous embodiment of the laws of Strict Encapsulation and Topological Determinism. By formalizing the LIVERPS mechanism as a Sequential Channel, we prove that even infinitely complex scenes can be resolved in linear time, provided that the axioms of identity and boundary control are maintained.

---

# Appendix: The PCP Algorithm

*A precise description of OpenUSD's Prim Composition Pipeline as implemented
in `pxr/usd/pcp/primIndex.cpp`, cross-referenced against the theorems in the
main article.*

**Authorship**: This appendix was authored through careful prompting of Claude to reverse engineer the implementation of the `pcp` library itself, extract a prose explanation of the algorithm, and then to iteratively map the theorems to the implementation in order to validate that the implementation indeeds embodies the principles derived in the main part of this article. Section A.4 records aspects of the formal derivation that required revision in order to line the theory up with the practice.

---

## A.1 Data Model

### A.1.1 Arc Types and Strength Order

The `PcpArcType` enum (`types.h:27`) lists arc types **in strength order**,
strongest to weakest:

| Enum constant | Arc | LIVERPS letter |
|---|---|---|
| `PcpArcTypeRoot` | (root node sentinel — no parent) | — |
| `PcpArcTypeInherit` | Inherits | **I** |
| `PcpArcTypeVariant` | VariantSets | **V** |
| `PcpArcTypeRelocate` | rElocates | **E** |
| `PcpArcTypeReference` | References | **R** |
| `PcpArcTypePayload` | Payloads | **P** |
| `PcpArcTypeSpecialize` | Specializes | **S** |

**Note on "Local" (L)**: Local opinions are not a composition arc and have no
corresponding `PcpArcType` value. They are the opinions already present in the
root node's own layer stack, implicitly the strongest by virtue of the root
node being initialized before any arc expansion begins
(`PcpPrimIndex_Graph::New(site, ...)`). LIVERPS is a strength mnemonic: "L"
names that implicit root-node priority, while the remaining six letters each
correspond to a `PcpArcType` enum value.

> **Proposition 5.1** — The arc-type enum encodes the total order among
> composition arcs, with local opinions holding implicit precedence as the
> root node. Value resolution traverses finalized nodes in that order
> (see §A.3.2).

### A.1.2 The Prim Index Graph

A `PcpPrimIndex` contains a `PcpPrimIndex_Graph` (`primIndex_Graph.h`): a
node pool stored in a `std::vector<_Node>`. Each node records:

- `layerStack` — the layer stack providing opinions at this node
- `sitePath` — the prim path within that layer stack
- `mapToRoot`, `mapToParent` — `PcpMapExpression` functions translating
  namespace from this node up to the root
- Arc metadata: `arcType`, `siblingNumAtOrigin`, `namespaceDepth`
- Structural flags: `hasSpecs`, `culled`, `inert`, `permissionDenied`

After finalization (`Finalize()`), the pool is reordered so that a linear
traversal visits nodes in **strongest-to-weakest** order. This is the
mechanism behind the O(n) value resolution described in §A.3.2.

> **Axiom 7.1 (Monotonicity of the LayerStack)** — confirmed. Layer position
> within a node's layer stack is the tiebreaker for same-arc-type siblings
> (`strengthOrdering.cpp:91`). Position in the array *is* strength.

---

## A.2 Phase 1 — Index Construction

### A.2.1 Entry Points

```
PcpComputePrimIndex()          // public API  (primIndex.cpp:5333)
  └─ Pcp_BuildPrimIndex()      // core recursive build  (primIndex.cpp:5164)
       └─ Pcp_PrimIndexer      // stateful indexer struct  (primIndex.cpp:1095)
```

`Pcp_PrimIndexer` owns:
- A **max-heap** task queue (`std::vector<Task>`) ordered by
  `Task::PriorityOrder`
- A **deduplication set** (`robin_set<Task>`) for implied-class and
  implied-specialize tasks

### A.2.2 Bootstrap — Ancestral Opinions

For any non-root prim path `/A/B/C`, the algorithm **first** builds the index
for the parent `/A/B` and clones it as the starting graph for `/A/B/C`
(`_BuildInitialPrimIndexFromAncestor`, line 5221). This propagates ancestral
composition arcs (references introduced by a parent that also contribute
opinions to child prims) before any tasks are processed.

> This is the origin of the *implied* arcs — arcs that appear in a prim's
> index because an ancestor introduced a reference or inherit. It corresponds
> to **Theorem 1.1 (Locality / Downward Causality)**: the parent's state is
> fully settled before the child's index is built.

### A.2.3 Salted-Earth Check

After cloning the ancestral graph, `_ElidePrimIndexIfProhibited()` checks
whether the root path is the *source* of a relocation (a "tombstoned"
namespace slot). If so, the index is elided entirely — no tasks are enqueued
and the function returns immediately.

> This enforces the namespace uniqueness required by **Theorem 1.4
> (Uniqueness of Identity)**.

### A.2.4 Task Types and Execution Priority

Tasks are defined in `primIndex.cpp:688` as bit-shifted enum values. Lower
bit value = **higher** priority (popped first from the max-heap that inverts
ordering). Execution order:

| Priority (first→last) | Task | Description |
|---|---|---|
| 1 | `EvalNodeRelocations` | Apply relocate arcs at this node |
| 2 | `EvalImpliedRelocations` | Propagate relocations from references |
| 3 | `EvalNodeReferences` | Expand reference arcs |
| 4 | `EvalNodePayloads` | Expand payload arcs (if loaded) |
| 5 | `EvalNodeInherits` | Expand inherit arcs |
| 6 | `EvalNodeSpecializes` | Record specialize arcs (as inert placeholders) |
| 7 | `EvalImpliedSpecializes` | Propagate specializes to root (see §A.2.9) |
| 8 | `EvalImpliedClasses` | Propagate implied inherits across references |
| 9–12 | `EvalNodeAncestralVariant*` | Ancestral variant set evaluation |
| 13 | `EvalNodeAncestralDynamicPayloads` | Dynamic payload args from ancestors |
| 14–17 | `EvalNodeVariant*` | Direct variant set evaluation |
| 18 | `EvalNodeDynamicPayloads` | Dynamic payload file-format args |
| 19 | `EvalUnresolvedPrimPathError` | Emit error for unresolved paths |

**Important**: task priority order is *not* the same as arc strength order.
Relocations are evaluated first because namespace identity must be established
before any arc expansion can correctly resolve target paths. Variants are
evaluated *last* because their selection may depend on non-local information
(queried across the prim index in strength order), and dynamic payload
arguments likewise.

> This phase separation between arc expansion (tasks 1–8) and variant/payload
> selection (tasks 9–18) is what **Theorem 7.3 (Phase-Separation of
> Selection)** formalizes. The construction phase (`f_index`) completes before
> the value resolution phase (`f_value`) begins, and variant selection
> (`EvalNodeVariant*`) is strictly a composition-time event driven by authored
> opinions, not by resolved colors.

### A.2.5 Relocations (`EvalNodeRelocations`, line 2845)

For the current node:
1. Look up the layer stack's `incrementalRelocatesSourceToTarget` map.
2. For each relocated path, create a `PcpArcTypeRelocate` arc pointing back
   to the relocation source.
3. **Elide** conflicting arcs at the relocation target: opinions from
   References, Inherits, Specializes, and Payloads are suppressed at that
   site (the "salted earth" elision). Variant arcs are *not* elided — they
   can still override a relocated prim.
4. Emit errors for any opinions authored at the relocation source (now an
   invalid location).

> **Theorem 5.2 (The Relocation Mirage)** — confirmed. Relocations are
> resolved before References are bound (task priorities 1–2 precede 3),
> so the correct target namespace is established before any arc sees it.
> **Proposition 7.6 (Relocation Closure)** — confirmed. All operators targeting
> the old path are re-bound during this phase, before Index Construction
> concludes.

### A.2.6 References (`EvalNodeReferences`, line 2460)

1. Call `PcpComposeSiteReferences()` to collect reference arcs from the
   node's layer stack (list-op composed across layers, strongest-first).
2. For each reference:
   - Resolve the asset path relative to its authoring layer.
   - Map the target prim path through the reference's layer offset.
   - Create a child node with `PcpArcTypeReference`.
   - Recursively call `Pcp_BuildPrimIndex()` for the referenced prim in
     the new layer stack (linked via `PcpPrimIndex_StackFrame`).
3. Cycle detection (`_CheckForCycle`, line 1576) maintains a
   `PcpSiteTracker` stack; if the target site is already in any ancestor
   frame the arc is pruned.

> **Proposition 5.1 (LIVERPS as a Sequential Channel)** — the `PcpSiteTracker`
> and `previousFrame` chain implement the Non-Recursion condition of
> **Theorem 3.3**. The process terminates in O(m) steps where m is the
> initial opinion count.

### A.2.7 Payloads (`EvalNodePayloads`, line 2500)

Structurally identical to references with two differences:
- Payloads are only expanded if the payload's path appears in the
  `includedPayloads` mask (`PcpPrimIndexInputs`). Excluded payloads produce
  a node marked `inert` — it occupies a namespace slot but contributes no
  opinions.
- Dynamic payloads (`EvalNodeDynamicPayloads`) are processed *after* all
  other arc types, because their file-format arguments may depend on variant
  selections resolved elsewhere in the graph. They are processed in
  **strength order** (see `Task::PriorityOrder`).

> **Theorem 6.3 (Determinancy of the Latent State)** — the `inert` node is
> the implementation of the "Phantom Index": a namespace entry that
> contributes nothing to the Sequential Channel until the observation mask
> is toggled. **Corollary 6.3.1 (Observation Safety of LIVERPS)** — confirmed:
> since `PcpArcTypePayload` < `PcpArcTypeInherit` (weaker), loading a
> payload cannot change an existing Inherit or Variant selection.

### A.2.8 Inherits (`EvalNodeInherits`, line 3787)

1. Compose inherit paths via `PcpComposeSiteInherits()`.
2. For each class path, add a child node with `PcpArcTypeInherit`.
3. Enqueue `EvalImpliedClasses` to propagate the inherit across any
   references that are siblings or ancestors in the graph
   (`_EvalImpliedClassTree`).

Implied inherits capture the "spooky ancestral opinions" property: if prim
`/B` references `/A` and `/B` inherits from `/_class_B`, then `/A` also
implicitly gets an inherit from `/_class_B` for purposes of its contribution
to `/B`.

> **Axiom 7.2 (The Jump-Acyclicity Constraint)** — the `PcpSiteTracker`
> enforces that an inherit target cannot be a genealogical ancestor of the
> source, preventing the back-edge cycle the theorem prohibits.

### A.2.9 Specializes and Implied Specializes (`EvalNodeSpecializes`, line 3812; `EvalImpliedSpecializes`, line 3935)

Specializes arcs are initially added as **inert placeholder nodes**. In the
`EvalImpliedSpecializes` phase (which runs after all other expressed arcs),
each specialize node is **propagated to be a direct child of the root node**
with its mapping adjusted through `mapToRoot`. This guarantees specialize
opinions appear weaker than all other arc types, including implied inherits
from references — without any special-casing in the strength comparator.

> **Theorem 5.3 (Specializes as the "Backstop" Axiom)** — precisely confirmed.
> S is the identity element of the composition algebra: it provides fallback
> values only when all stronger LIVERPS channels are empty, achieved here by
> the physical placement of propagated specialize nodes at the weakest
> position in the graph.

### A.2.10 Variant Selection (`EvalNodeVariant*`, lines 3300–3786)

Variant evaluation occurs in two sub-phases:

**A. Ancestral variants** (`EvalNodeAncestralVariant*`, priority 9–12):
For each node introduced by an ancestor, compose variant set definitions and
evaluate the selection before any of the node's own direct arcs are expanded.
This ensures ancestral variant choices are settled before the node's reference
or payload arcs consult them.

**B. Direct variants** (`EvalNodeVariant*`, priority 14–17):
For the node's own variant sets:
1. `EvalNodeVariantSets` — discover all variant set names at the node.
2. `EvalNodeVariantAuthored` — search for an authored selection in the prim
   index traversal cache, walking nodes in strength order.
3. `EvalNodeVariantFallback` — if no authored selection exists, consult the
   `PcpVariantFallbackMap` from `PcpPrimIndexInputs`.
4. `EvalNodeVariantNoneFound` — marker task; no selection is applied.

The traversal cache (`_VariantTraversalCache`) walks nodes in strength order
to find the selection, ensuring the strongest opinion wins.

> **Theorem 5.4 (Variant Selection Primacy / Anti-Recursion)** — confirmed.
> Variant selection is a task-queue event: it is enqueued only after the
> node's arcs have been established (`EvalNodeVariantSets` follows
> `EvalNodeReferences`), and the variant's own internal contents are never
> visible to the selection logic. The cycle `/V → c → /V` cannot form.
>
> **Proposition 5.5 (The Infiltration Guard)** — confirmed. External "overs"
> from stronger layers are integrated into the LIVERPS order within each
> variant branch's prim index; they cannot invalidate *which* branch was
> selected, only contribute values within it.
>
> **Theorem 5.6 (Variant Set Leakage Instability)** — confirmed by the
> elision logic in `EvalNodeRelocations`: a variant's effect on its subtree
> is contained by the task queue's monotonic drain; any attempt to add a
> reference arc to a parent node would require restarting the entire indexer,
> which is architecturally impossible once `Pcp_BuildPrimIndex` is in flight.

---

## A.3 Phase 2 — Post-Processing and Value Resolution

### A.3.1 Post-Processing (`PcpComputePrimIndex`, lines 5366–5408)

After the task queue drains, the following passes run in sequence:

1. **Cull** (`_CullSubtreesWithNoOpinions`) — depth-first sweep marking nodes
   with no specs as `culled`; preserve origin chains for non-culled dependents.
2. **Enforce Permissions** (`_EnforcePermissions`) — propagate
   `permissionDenied` flags through descendants (skipped in USD mode).
3. **Mark Instanceable** (`Pcp_PrimIndexIsInstanceable`) — check composed
   metadata to tag prototype candidates.
4. **Finalize** (`graph->Finalize()`) — reorder node pool into
   strongest-to-weak order via depth-first traversal; erase culled nodes.
5. **Rescan for Specs** (`Pcp_RescanForSpecs`) — collect the prim stack.

### A.3.2 Value Resolution

After finalization, the prim stack is a linear array of (node, layer) pairs
already sorted strongest-to-weakest. Value resolution is:

```
σ*(p) = Reduce(D_p, LIVERPS_<)
```

implemented as:

1. Iterate the prim stack from index 0 (strongest) to n (weakest).
2. The **first** node that has an explicit opinion for a field wins
   (Theorem 2.4, Erasure / Displacement).
3. All weaker opinions are masked.

This is O(n) in the number of contributing nodes.

> **Theorem 4.1 (Final State as Pure Function)** — confirmed. Given the same
> prim path, layer stack, and `PcpPrimIndexInputs` (which includes the payload
> inclusion mask and variant fallback map), `PcpComputePrimIndex` is
> deterministic and side-effect free. The consistency checker
> `Pcp_CheckConsistency` (line 5406) enforces this as an optional runtime
> assertion.
>
> **Corollary 4.1.1 (Compositional Identity)** — confirmed by the culling
> pass: a Hermetic Asset that produces the same output messages to the
> Sequential Channel can be replaced by a single equivalent node. The culling
> pass achieves exactly this by collapsing subtrees that contribute no specs.

---

## A.4 Correctness Notes

The following points record places where the formal model in the article
required refinement against the implementation. All four have been resolved.

### A.4.1 "Local" Is Not an Arc Type — ✓ Resolved

The article has been amended to clarify that "L" in LIVERPS denotes the root
node's own layer stack opinions, not a composition arc. There is no
`PcpArcTypeLocal`; the root node is initialized before any task is enqueued,
making local opinions implicitly the strongest by construction. The six
remaining LIVERPS letters each correspond to a `PcpArcType` enum value.
See §A.1.1 for the full treatment.

### A.4.2 Relocates Precede All Arc Expansion in Task Execution — ✓ Resolved

The article has been amended to distinguish the two orderings that apply to
Relocates. In *opinion strength* (value resolution), Relocates rank between
Variants and References ($V > E > R$), correctly placing them in the LIVERPS
sequence. In *execution order* (index construction), `EvalNodeRelocations`
(priority 1) and `EvalImpliedRelocations` (priority 2) run before
`EvalNodeReferences` (priority 3), `EvalNodeInherits` (priority 5), and all
other arc expansion tasks. Relocations are a pre-condition for all arc
expansion: namespace identity must be settled before any arc can correctly
resolve its target path.

The §VIII PCP algorithm description has been reordered to reflect this:
Relocation (Step B) now precedes Arc Expansion (Step C), and Theorem 5.2's
proof explicitly names both orderings. See §A.2.5 for the implementation
detail.

### A.4.3 Specializes Propagation Is Non-Trivial — ✓ Resolved

The article's Theorem 5.3 proof has been expanded to describe the two-step
mechanism. Specialize arcs are first recorded as inert placeholder nodes during
arc expansion (`EvalNodeSpecializes`). After all other expressed arcs are
processed, `EvalImpliedSpecializes` physically relocates each specialize node
to be a direct child of the root node, adjusting `mapToRoot`. Without this
propagation a Specialize arc inside a referenced asset would rank at
Reference-strength rather than Specialize-strength. The backstop guarantee
therefore depends on this non-local graph transformation, not on the arc-type
enum value alone. See §A.2.9 for the implementation detail.

### A.4.4 Variant Selection Phase Separation Is Strictly Enforced — ✓ Resolved

The article's Theorem 7.3 proof has been expanded to reflect that the
phase separation is not merely axiomatic but architecturally unreachable.
Two implementation details were added: (1) variant selection tasks carry
lower priority than all arc-expansion tasks in the task queue, so $\Omega$
is structurally complete before any selection is attempted; (2) the
`_VariantTraversalCache` searches only authored opinions in the node graph
and never consults resolved field values, making the feedback path
$S = g(\sigma^*)$ impossible by construction. See §A.2.10 for the
implementation detail.

### A.4.5 Theorem 3.2 (Embarrassing Parallelism) Holds at the Cache Level

`PcpComputePrimIndex` is called per prim path and the only shared state
between calls is the **read-only** `PcpCache` and `PcpLayerStack`. Writes go
exclusively to the per-call `PcpPrimIndexOutputs`. `PcpCache`
(`cache.cpp:1814`) serializes concurrent index builds internally but the prim
index computation itself is parallel-safe for distinct paths, confirming the
theorem. The article notes that "composition can be computed in parallel; the
only shared state is the read-only layer stack."

---

## A.5 Summary Table: Theorems vs. Implementation

| Theorem | Verdict | Notes |
|---|---|---|
| 1.1 Locality (Downward Causality) | ✓ Confirmed | Ancestral index cloned before tasks enqueued |
| 1.2 Linearity (Global Ordering) | ✓ Confirmed | Topological task order via priority heap |
| 1.3 Stability in Disjoint DAGs | ✓ Confirmed | Flattening via `_BuildInitialPrimIndexFromAncestor` |
| 1.4 Uniqueness of Identity | ✓ Confirmed | Salted-earth check; cycle detection |
| 2.1 Reduction of Conditional Mutation | ✓ Confirmed | Variant selection collapses to single branch per prim |
| 2.2 Inductive Stability of Conditionals | ✓ Confirmed | Task heap processes nodes in topological order |
| 2.3 Deterministic Tie-Breaking | ✓ Confirmed | `PcpCompareSiblingNodeStrength` → sibling number tiebreak |
| 2.4 Erasure (Displacement) | ✓ Confirmed | Prim stack linear traversal; first opinion wins |
| 3.1 Persistence of Identity (Relocation Invariant) | ✓ Confirmed | `mapToRoot` / `mapToParent` preserve id under relocation |
| 3.2 Embarrassing Parallelism | ✓ Confirmed | Distinct paths are independent; shared state is read-only |
| 3.3 Stability of Delegated Hermetic Interaction | ✓ Confirmed | FIFO task queue; Non-Recursion via `PcpSiteTracker` |
| 4.1 Final State as Pure Function | ✓ Confirmed | Deterministic given same inputs; consistency checker verifiable |
| 4.1.1 Compositional Identity (Corollary) | ✓ Confirmed | Culling collapses no-spec subtrees |
| 5.1 LIVERPS as Sequential Channel | ✓ Confirmed | Arc-type enum encodes total order; value resolution is linear traversal |
| 5.2 The Relocation Mirage | ✓ Confirmed | Strength order ($V > E > R$) and execution order (Relocations first) both stated explicitly |
| 5.3 Specializes as "Backstop" Axiom | ✓ Confirmed | Backstop achieved via two-step propagation to root node; both steps described |
| 5.4 Variant Selection Primacy (Anti-Recursion) | ✓ Confirmed | Task priority enforces; variant cannot influence its own selection |
| 5.5 The Infiltration Guard | ✓ Confirmed | External overs integrated per LIVERPS within branch; branch choice protected |
| 5.6 Variant Set Leakage Instability | ✓ Confirmed | No mechanism to add arcs to parent from within variant execution |
| 6.1 Linear Complexity of Hermetic Composition | ✓ Confirmed | Finalized graph traversal is O(n); no search required |
| 6.2 Exponential Explosion (Leakage Penalty) | ✓ Confirmed | Implicit: USD disallows the leakage condition; no validator needed |
| 6.2.1 The Uncountable Forest (Non-Termination) | ✓ Confirmed | `PcpSiteTracker` prunes cycles; queue monotonically drains |
| 6.3 Determinancy of the Latent State | ✓ Confirmed | Unloaded payload → inert node; re-evaluation on load toggle |
| 6.4 Observation Safety of LIVERPS | ✓ Confirmed | Payload arc weaker than I, V; loading cannot change selection |
| 6.5 Resolution of Phantom Indices | ✓ Confirmed | Inert nodes excluded from prim stack until payload mask toggled |
| 7.1 Monotonicity of the LayerStack | ✓ Confirmed | Layer array index *is* strength; no peer layers exist |
| 7.2 Jump-Acyclicity Constraint | ✓ Confirmed | `PcpSiteTracker` enforces; ancestor target → arc pruned |
| 7.3 Phase-Separation of Selection | ✓ Confirmed | Hard architectural boundary: variant tasks lower priority than all arc-expansion tasks; selection searches only authored opinions |
| 7.4 Invariance of Compressed Identity | ✓ Confirmed | `Pcp_PrimIndexIsInstanceable` enforces local hermeticity |
| 7.5 The "Over" Binding Priority | ✓ Confirmed | Stronger-layer opinions win via Erasure in linear prim stack traversal |
| 7.6 Relocation Closure | ✓ Confirmed | `EvalNodeRelocations` (priority 1) completes before any arc is bound |
