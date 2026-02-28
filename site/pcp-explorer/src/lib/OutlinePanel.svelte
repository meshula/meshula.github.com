<script lang="ts">
  import { focus } from './store.svelte';

  interface OutlineEntry {
    depth: number;   // 1=part, 2=section, 3=theorem/prop
    text: string;
    id: string;
  }

  // Complete outline — every heading in encapsulation.md in document order.
  // ids are the slugified heading text (same rule as PaperPanel's marked renderer).
  const outline: OutlineEntry[] = [
    { depth: 1, text: 'Elements of Compositional Stability In USD', id: 'elements-of-compositional-stability-in-usd' },
    { depth: 2, text: 'Introduction', id: 'introduction' },
    { depth: 1, text: 'Definitions', id: 'definitions' },
    { depth: 2, text: 'Formal Definitions for Color-Logic Systems', id: 'formal-definitions-for-color-logic-systems' },
    { depth: 3, text: 'Foundational Definitions: Color-Logic Operators', id: 'foundational-definitions-color-logic-operators' },
    { depth: 3, text: 'Structural and Operational Properties', id: 'structural-and-operational-properties' },
    { depth: 3, text: 'Formalism: Namespace, Scope, and Identity', id: 'formalism-namespace-scope-and-identity' },
    { depth: 3, text: 'CSP-Derived Formalisms: Coordination and Messaging', id: 'csp-derived-formalisms-coordination-and-messaging' },
    { depth: 2, text: 'From Partial to Total Order', id: 'from-partial-to-total-order' },
    { depth: 2, text: 'Tie-Breaking and the Logic of Overwrites', id: 'tie-breaking-and-the-logic-of-overwrites' },
    { depth: 2, text: 'Common Notions (Axiomatic Foundations)', id: 'common-notions-axiomatic-foundations' },
    { depth: 2, text: 'Compositional Axioms: Encapsulation and Boundary Control', id: 'compositional-axioms-encapsulation-and-boundary-control' },
    { depth: 1, text: 'Part 1: Tree Based Mutation', id: 'part-1-tree-based-mutation' },
    { depth: 3, text: 'Theorem 1.1: Locality (The Principle of Downward Causality)', id: 'theorem-11-locality-the-principle-of-downward-causality' },
    { depth: 3, text: 'Proposition 1.2: Linearity (Global Ordering)', id: 'proposition-12-linearity-global-ordering' },
    { depth: 3, text: 'Proposition 1.3: Stability in Disjoint DAGs (The Flattening Principle)', id: 'proposition-13-stability-in-disjoint-dags-the-flattening-principle' },
    { depth: 3, text: 'Theorem 1.4: Uniqueness of Identity (The Alphabet Constraint)', id: 'theorem-14-uniqueness-of-identity-the-alphabet-constraint' },
    { depth: 1, text: 'Part 2: Conditional State', id: 'part-2-conditional-state' },
    { depth: 3, text: 'Theorem 2.1: Reduction of Conditional Mutation', id: 'theorem-21-reduction-of-conditional-mutation' },
    { depth: 3, text: 'Theorem 2.2: Inductive Stability of Conditionals', id: 'theorem-22-inductive-stability-of-conditionals' },
    { depth: 3, text: 'Proposition 2.3: Deterministic Tie-Breaking', id: 'proposition-23-deterministic-tie-breaking' },
    { depth: 3, text: 'Theorem 2.4: Erasure (The Displacement Principle)', id: 'theorem-24-erasure-the-displacement-principle' },
    { depth: 1, text: 'Part 3: Identity and Concurrency', id: 'part-3-identity-and-concurrency' },
    { depth: 3, text: 'Theorem 3.1: Persistence of Identity (The Relocation Invariant)', id: 'theorem-31-persistence-of-identity-the-relocation-invariant' },
    { depth: 3, text: 'Theorem 3.2: Embarrassing Parallelism (The Hermetic Concurrency)', id: 'theorem-32-embarrassing-parallelism-the-hermetic-concurrency' },
    { depth: 3, text: 'Theorem 3.3: Stability of Delegated Hermetic Interaction', id: 'theorem-33-stability-of-delegated-hermetic-interaction' },
    { depth: 1, text: 'Part 4: Functional Determinism', id: 'part-4-functional-determinism' },
    { depth: 3, text: 'Theorem 4.1: Final State as Pure Function', id: 'theorem-41-final-state-as-pure-function' },
    { depth: 3, text: 'Corollary 4.1.1: The Compositional Identity', id: 'corollary-411-the-compositional-identity' },
    { depth: 2, text: 'Formal Algorithm: The Prim Composition Pipeline (PCP)', id: 'formal-algorithm-the-prim-composition-pipeline-pcp' },
    { depth: 1, text: 'Part 5: USD PCP-LIVERPS Correctness', id: 'part-5-usd-pcp-liverps-correctness' },
    { depth: 3, text: 'Proposition 5.1: LIVERPS as a Sequential Channel', id: 'proposition-51-liverps-as-a-sequential-channel' },
    { depth: 3, text: 'Theorem 5.2: The Relocation Mirage (Namespace Stability)', id: 'theorem-52-the-relocation-mirage-namespace-stability' },
    { depth: 3, text: 'Theorem 5.3: Specializes as the Backstop Axiom', id: 'theorem-53-specializes-as-the-backstop-axiom' },
    { depth: 2, text: 'Theorems of Variant Set Stability', id: 'theorems-of-variant-set-stability' },
    { depth: 3, text: 'Theorem 5.4: Variant Selection Primacy (Anti-Recursion)', id: 'theorem-54-variant-selection-primacy-anti-recursion' },
    { depth: 3, text: 'Proposition 5.5: The Infiltration Guard (Variant Logic Integrity)', id: 'proposition-55-the-infiltration-guard-variant-logic-integrity' },
    { depth: 3, text: 'Theorem 5.6: Variant Set Leakage Instability (The Paradox of Choice)', id: 'theorem-56-variant-set-leakage-instability-the-paradox-of-choice' },
    { depth: 2, text: 'Reduction of PCP Evaluation to Sequential Functional Reduction', id: 'reduction-of-pcp-evaluation-to-sequential-functional-reduction' },
    { depth: 3, text: 'Proposition 5.7: Evaluation Invariants', id: 'proposition-57-evaluation-invariants' },
    { depth: 3, text: 'Proposition 5.8: Opinion Set Extraction', id: 'proposition-58-opinion-set-extraction' },
    { depth: 3, text: 'Lemma 5.8.1: Finite Opinion Set', id: 'lemma-581-finite-opinion-set' },
    { depth: 3, text: 'Proposition 5.9: Canonical Ordering', id: 'proposition-59-canonical-ordering' },
    { depth: 3, text: 'Lemma 5.9.1: Totality', id: 'lemma-591-totality' },
    { depth: 3, text: 'Proposition 5.10: Operational Realization via Sequential Channel', id: 'proposition-510-operational-realization-via-sequential-channel' },
    { depth: 3, text: 'Theorem 5.11: PCP / Channel Equivalence', id: 'theorem-511-pcp-channel-equivalence' },
    { depth: 3, text: 'Proposition 5.12: Reduction to Functional Fold', id: 'proposition-512-reduction-to-functional-fold' },
    { depth: 3, text: 'Theorem 5.13: Sequential Reduction', id: 'theorem-513-sequential-reduction' },
    { depth: 3, text: 'Immediate Consequences', id: 'immediate-consequences' },
    { depth: 1, text: 'Part 6: Complexity and Latency', id: 'part-6-complexity-and-latency' },
    { depth: 2, text: 'Combinatorial Stability: The Complexity of the State Space', id: 'combinatorial-stability-the-complexity-of-the-state-space' },
    { depth: 3, text: 'Theorem 6.1: Linear Complexity of Hermetic Composition', id: 'theorem-61-linear-complexity-of-hermetic-composition' },
    { depth: 3, text: 'Theorem 6.2: Exponential Explosion (The Leakage Penalty)', id: 'theorem-62-exponential-explosion-the-leakage-penalty' },
    { depth: 3, text: 'Corollary 6.2.1: The Uncountable Forest (Non-Termination)', id: 'corollary-621-the-uncountable-forest-non-termination' },
    { depth: 2, text: 'The Theorem of Structural Latency (The Payload Hazard)', id: 'the-theorem-of-structural-latency-the-payload-hazard' },
    { depth: 3, text: 'Theorem 6.3: Determinancy of the Latent State', id: 'theorem-63-determinancy-of-the-latent-state' },
    { depth: 3, text: 'Corollary 6.3.1: The Observation Safety of LIVERPS', id: 'corollary-631-the-observation-safety-of-liverps' },
    { depth: 2, text: 'The Postulate of Observability (The Demand Rule)', id: 'the-postulate-of-observability-the-demand-rule' },
    { depth: 3, text: 'Theorem 6.5: The Resolution of Phantom Indices', id: 'theorem-65-the-resolution-of-phantom-indices' },
    { depth: 1, text: 'Part 7: Latent Hazards of LIVERPS', id: 'part-7-latent-hazards-of-liverps' },
    { depth: 3, text: 'Axiom 7.1: Monotonicity of the LayerStack', id: 'axiom-71-monotonicity-of-the-layerstack' },
    { depth: 3, text: 'Axiom 7.2: The Jump-Acyclicity Constraint', id: 'axiom-72-the-jump-acyclicity-constraint' },
    { depth: 3, text: 'Theorem 7.3: Phase-Separation of Selection', id: 'theorem-73-phase-separation-of-selection' },
    { depth: 3, text: 'Proposition 7.4: Invariance of Compressed Identity', id: 'proposition-74-invariance-of-compressed-identity' },
    { depth: 3, text: 'Proposition 7.5: The Over Binding Priority', id: 'proposition-75-the-over-binding-priority' },
    { depth: 3, text: 'Proposition 7.6: Relocation Closure', id: 'proposition-76-relocation-closure' },
    { depth: 1, text: 'Conclusion', id: 'conclusion' },
    { depth: 1, text: 'Appendix: The PCP Algorithm', id: 'appendix-the-pcp-algorithm' },
    { depth: 2, text: 'A.1 Data Model', id: 'a1-data-model' },
    { depth: 3, text: 'A.1.1 Arc Types and Strength Order', id: 'a11-arc-types-and-strength-order' },
    { depth: 3, text: 'A.1.2 The Prim Index Graph', id: 'a12-the-prim-index-graph' },
    { depth: 2, text: 'A.2 Phase 1 — Index Construction', id: 'a2-phase-1-index-construction' },
    { depth: 3, text: 'A.2.1 Entry Points', id: 'a21-entry-points' },
    { depth: 3, text: 'A.2.2 Bootstrap — Ancestral Opinions', id: 'a22-bootstrap-ancestral-opinions' },
    { depth: 3, text: 'A.2.3 Salted-Earth Check', id: 'a23-salted-earth-check' },
    { depth: 3, text: 'A.2.4 Task Types and Execution Priority', id: 'a24-task-types-and-execution-priority' },
    { depth: 3, text: 'A.2.5 Relocations (EvalNodeRelocations, line 2845)', id: 'a25-relocations-evalnoderelocations-line-2845' },
    { depth: 3, text: 'A.2.6 References (EvalNodeReferences, line 2460)', id: 'a26-references-evalnodereferences-line-2460' },
    { depth: 3, text: 'A.2.7 Payloads (EvalNodePayloads, line 2500)', id: 'a27-payloads-evalnodepayloads-line-2500' },
    { depth: 3, text: 'A.2.8 Inherits (EvalNodeInherits, line 3787)', id: 'a28-inherits-evalnodeinherits-line-3787' },
    { depth: 3, text: 'A.2.9 Specializes and Implied Specializes', id: 'a29-specializes-and-implied-specializes' },
    { depth: 3, text: 'A.2.10 Variant Selection (EvalNodeVariant*)', id: 'a210-variant-selection-evalnodevariant-lines-33003786' },
    { depth: 2, text: 'A.3 Phase 2 — Post-Processing and Value Resolution', id: 'a3-phase-2-post-processing-and-value-resolution' },
    { depth: 3, text: 'A.3.1 Post-Processing', id: 'a31-post-processing-pcpcomputeprimindex-lines-53665408' },
    { depth: 3, text: 'A.3.2 Value Resolution', id: 'a32-value-resolution' },
    { depth: 2, text: 'A.4 Correctness Notes', id: 'a4-correctness-notes' },
    { depth: 3, text: 'A.4.1 "Local" Is Not an Arc Type', id: 'a41-local-is-not-an-arc-type-resolved' },
    { depth: 3, text: 'A.4.2 Relocates Precede All Arc Expansion', id: 'a42-relocates-precede-all-arc-expansion-in-task-execution-resolved' },
    { depth: 3, text: 'A.4.3 Specializes Propagation Is Non-Trivial', id: 'a43-specializes-propagation-is-non-trivial-resolved' },
    { depth: 3, text: 'A.4.4 Variant Selection Phase Separation', id: 'a44-variant-selection-phase-separation-is-strictly-enforced-resolved' },
    { depth: 3, text: 'A.4.5 Theorem 3.2 at the Cache Level', id: 'a45-theorem-32-embarrassing-parallelism-holds-at-the-cache-level' },
    { depth: 2, text: 'A.5 Summary Table: Theorems vs. Implementation', id: 'a5-summary-table-theorems-vs-implementation' },
  ];

  function handleClick(id: string) {
    focus.paperAnchor = id;
    focus.nodeId = null;
    focus.codeRange = null;
  }

  // Scroll the active outline item into view when paperAnchor changes externally
  $effect(() => {
    const anchor = focus.paperAnchor;
    if (!anchor) return;
    document.getElementById(`outline-${anchor}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
</script>

<nav class="outline-panel">
  <div class="outline-header">Contents</div>
  <ul>
    {#each outline as entry}
      <!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
      <li
        id="outline-{entry.id}"
        class="depth-{entry.depth}"
        class:active={focus.paperAnchor === entry.id}
        role="button"
        tabindex="0"
        onclick={() => handleClick(entry.id)}
        onkeydown={(e) => e.key === 'Enter' && handleClick(entry.id)}
      >
        {entry.text}
      </li>
    {/each}
  </ul>
</nav>

<style>
  .outline-panel {
    padding: 8px 0;
    background: #181825;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .outline-header {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #7f849c;
    padding: 8px 12px 4px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    cursor: pointer;
    padding: 3px 12px;
    font-size: 11px;
    color: #a6adc8;
    line-height: 1.4;
    border-left: 2px solid transparent;
    transition: background 0.1s, color 0.1s;
  }

  li:hover {
    background: #1e1e2e;
    color: #cdd6f4;
  }

  li.active {
    background: #1e1e2e;
    color: #cba6f7;
    border-left-color: #cba6f7;
  }

  li.depth-1 {
    font-weight: 700;
    color: #89dceb;
    margin-top: 6px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  li.depth-1.active {
    color: #cba6f7;
  }

  li.depth-2 {
    padding-left: 18px;
    color: #bac2de;
    font-weight: 500;
  }

  li.depth-3 {
    padding-left: 26px;
    color: #7f849c;
    font-size: 10px;
  }

  li.depth-3.active {
    color: #a6e3a1;
    border-left-color: #a6e3a1;
  }
</style>
