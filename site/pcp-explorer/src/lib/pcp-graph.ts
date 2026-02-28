/**
 * PCP Algorithm Flow Graph Data
 *
 * Nodes represent major pipeline stages; edges represent data/control flow.
 * Each node carries source-code references into OpenUSD's primIndex.cpp.
 *
 * Source base: pxr/usd/pcp/primIndex.cpp (OpenUSD)
 */

export interface CodeRef {
  file: string;
  line: number;
  label: string;
}

export interface PcpNodeData extends Record<string, unknown> {
  label: string;
  sublabel?: string;
  phase: 'entry' | 'bootstrap' | 'relocation' | 'arc' | 'variant' | 'resolution' | 'output';
  refs: CodeRef[];
  theory?: string;        // theorem / proposition cross-reference
  paperAnchor?: string;   // heading id to scroll to in the paper panel
  description: string;
}

export type PcpNode = {
  id: string;
  type: 'pcpNode';
  position: { x: number; y: number };
  data: PcpNodeData;
};

export type PcpEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  style?: string;
};

const BASE = 'https://github.com/PixarAnimationStudios/OpenUSD/blob/release/pxr/usd/pcp/';

export function codeUrl(ref: CodeRef): string {
  return `${BASE}${ref.file}#L${ref.line}`;
}

// ── Node definitions ────────────────────────────────────────────────────────

export const nodes: PcpNode[] = [
  // ── Entry ────────────────────────────────────────────────────────────────
  {
    id: 'entry',
    type: 'pcpNode',
    position: { x: 500, y: 0 },
    data: {
      label: 'PcpComputePrimIndex',
      sublabel: 'Public API',
      phase: 'entry',
      refs: [{ file: 'primIndex.cpp', line: 5333, label: 'PcpComputePrimIndex()' }],
      description:
        'Public entry point. Validates inputs, checks the cache, then delegates to Pcp_BuildPrimIndex.',
    },
  },

  // ── Bootstrap ────────────────────────────────────────────────────────────
  {
    id: 'bootstrap',
    type: 'pcpNode',
    position: { x: 500, y: 180 },
    data: {
      label: 'Pcp_BuildPrimIndex',
      sublabel: 'Core recursive build',
      phase: 'bootstrap',
      refs: [
        { file: 'primIndex.cpp', line: 5164, label: 'Pcp_BuildPrimIndex()' },
        { file: 'primIndex.cpp', line: 1095, label: 'Pcp_PrimIndexer struct' },
      ],
      theory: 'Theorem 1.1 (Locality)',
      paperAnchor: 'theorem-11-locality-the-principle-of-downward-causality',
      description:
        'For non-root paths, clones the parent\'s index first (_BuildInitialPrimIndexFromAncestor). ' +
        'Propagates ancestral composition arcs before any task is processed. ' +
        'Initialises the max-heap task queue and runs the main dispatch loop.',
    },
  },

  {
    id: 'salted_earth',
    type: 'pcpNode',
    position: { x: 920, y: 180 },
    data: {
      label: 'Salted-Earth Check',
      sublabel: '_ElidePrimIndexIfProhibited',
      phase: 'bootstrap',
      refs: [{ file: 'primIndex.cpp', line: 5221, label: '_ElidePrimIndexIfProhibited' }],
      theory: 'Theorem 1.4 (Uniqueness of Identity)',
      paperAnchor: 'theorem-14-uniqueness-of-identity-the-alphabet-constraint',
      description:
        'If this prim path is the *source* of a relocation (a tombstoned namespace slot), ' +
        'the entire index is elided — no tasks are enqueued, function returns immediately.',
    },
  },

  // ── Relocations (priority 1–2) ────────────────────────────────────────────
  {
    id: 'relocations',
    type: 'pcpNode',
    position: { x: 160, y: 380 },
    data: {
      label: 'EvalNodeRelocations',
      sublabel: 'Task priority 1',
      phase: 'relocation',
      refs: [{ file: 'primIndex.cpp', line: 2845, label: 'EvalNodeRelocations' }],
      theory: 'Theorem 5.2 (Relocation Mirage) · Prop 7.6 (Relocation Closure)',
      paperAnchor: 'theorem-52-the-relocation-mirage-namespace-stability',
      description:
        'Processes relocation arcs first — before any arc expansion. ' +
        'Reads incrementalRelocatesSourceToTarget, creates PcpArcTypeRelocate arcs, ' +
        'and elides conflicting References/Inherits/Specializes/Payloads at the target. ' +
        'Namespace identity is fully settled before any arc sees it.',
    },
  },

  {
    id: 'implied_relocations',
    type: 'pcpNode',
    position: { x: 160, y: 560 },
    data: {
      label: 'EvalImpliedRelocations',
      sublabel: 'Task priority 2',
      phase: 'relocation',
      refs: [{ file: 'primIndex.cpp', line: 2845, label: 'EvalImpliedRelocations' }],
      theory: 'Prop 7.6 (Relocation Closure)',
      paperAnchor: 'proposition-76-relocation-closure',
      description: 'Propagates relocations introduced by referenced layer stacks so that all ' +
        'relocation operators are re-bound to the correct post-relocation namespace before ' +
        'arc expansion begins.',
    },
  },

  // ── Arc Expansion (priority 3–8) ─────────────────────────────────────────
  {
    id: 'references',
    type: 'pcpNode',
    position: { x: 500, y: 380 },
    data: {
      label: 'EvalNodeReferences',
      sublabel: 'Task priority 3',
      phase: 'arc',
      refs: [{ file: 'primIndex.cpp', line: 2460, label: 'EvalNodeReferences' }],
      theory: 'Theorem 3.3 (Convergence)',
      paperAnchor: 'theorem-33-stability-of-delegated-hermetic-interaction',
      description:
        'Composes reference arcs via PcpComposeSiteReferences. For each reference: resolves ' +
        'asset path, maps target prim path through layer offset, creates a PcpArcTypeReference ' +
        'child node, recursively calls Pcp_BuildPrimIndex. Cycle detection via PcpSiteTracker.',
    },
  },

  {
    id: 'payloads',
    type: 'pcpNode',
    position: { x: 500, y: 560 },
    data: {
      label: 'EvalNodePayloads',
      sublabel: 'Task priority 4',
      phase: 'arc',
      refs: [{ file: 'primIndex.cpp', line: 2500, label: 'EvalNodePayloads' }],
      theory: 'Theorem 6.3 (Determinancy of Latent State) · Cor 6.3.1 (Observation Safety)',
      paperAnchor: 'theorem-63-determinancy-of-the-latent-state',
      description:
        'Structurally identical to references but only expanded when the payload path appears ' +
        'in PcpPrimIndexInputs.includedPayloads. Excluded payloads produce an inert node — ' +
        'a namespace slot that contributes no opinions (the Phantom Index).',
    },
  },

  {
    id: 'inherits',
    type: 'pcpNode',
    position: { x: 500, y: 740 },
    data: {
      label: 'EvalNodeInherits',
      sublabel: 'Task priority 5',
      phase: 'arc',
      refs: [{ file: 'primIndex.cpp', line: 3787, label: 'EvalNodeInherits' }],
      theory: 'Axiom 7.2 (Jump-Acyclicity)',
      paperAnchor: 'axiom-72-the-jump-acyclicity-constraint',
      description:
        'Composes inherit paths via PcpComposeSiteInherits. Adds PcpArcTypeInherit child nodes. ' +
        'Enqueues EvalImpliedClasses to propagate across sibling references. ' +
        'PcpSiteTracker prevents back-edge cycles (inherit target cannot be a genealogical ancestor).',
    },
  },

  {
    id: 'specializes',
    type: 'pcpNode',
    position: { x: 500, y: 920 },
    data: {
      label: 'EvalNodeSpecializes',
      sublabel: 'Task priority 6 → inert placeholders',
      phase: 'arc',
      refs: [{ file: 'primIndex.cpp', line: 3812, label: 'EvalNodeSpecializes' }],
      theory: 'Theorem 5.3 (Specializes as Backstop)',
      paperAnchor: 'theorem-53-specializes-as-the-backstop-axiom',
      description:
        'Specialize arcs are added as *inert placeholder nodes* initially. ' +
        'They carry no opinions until EvalImpliedSpecializes (priority 7) physically moves them ' +
        'to be direct children of the root, guaranteeing they are weaker than every other arc type.',
    },
  },

  {
    id: 'implied_specializes',
    type: 'pcpNode',
    position: { x: 500, y: 1100 },
    data: {
      label: 'EvalImpliedSpecializes',
      sublabel: 'Task priority 7 → root children',
      phase: 'arc',
      refs: [{ file: 'primIndex.cpp', line: 3935, label: 'EvalImpliedSpecializes' }],
      theory: 'Theorem 5.3 (Specializes as Backstop)',
      paperAnchor: 'theorem-53-specializes-as-the-backstop-axiom',
      description:
        'After all expressed arcs: propagates each specialize node to be a direct child of ' +
        'the root node, adjusting mapToRoot. This placement (not any special-casing in the ' +
        'strength comparator) guarantees S opinions are weakest.',
    },
  },

  {
    id: 'implied_classes',
    type: 'pcpNode',
    position: { x: 840, y: 920 },
    data: {
      label: 'EvalImpliedClasses',
      sublabel: 'Task priority 8',
      phase: 'arc',
      refs: [{ file: 'primIndex.cpp', line: 3787, label: '_EvalImpliedClassTree' }],
      theory: 'Axiom 7.2 (Jump-Acyclicity)',
      paperAnchor: 'axiom-72-the-jump-acyclicity-constraint',
      description:
        '"Spooky ancestral opinions" propagation. If /B references /A and /B inherits ' +
        'from /_class_B, then /A also implicitly gets an inherit from /_class_B for its ' +
        'contribution to /B. _EvalImpliedClassTree walks the graph to propagate these.',
    },
  },

  // ── Variant Selection (priority 9–18) ────────────────────────────────────
  {
    id: 'ancestral_variants',
    type: 'pcpNode',
    position: { x: 160, y: 920 },
    data: {
      label: 'EvalNodeAncestralVariant*',
      sublabel: 'Task priority 9–12',
      phase: 'variant',
      refs: [{ file: 'primIndex.cpp', line: 3300, label: 'EvalNodeAncestralVariant*' }],
      theory: 'Theorem 5.4 (Variant Selection Primacy)',
      paperAnchor: 'theorem-54-variant-selection-primacy-anti-recursion',
      description:
        'For nodes introduced by an ancestor: compose variant set definitions and evaluate ' +
        'selection before the node\'s own direct arcs are expanded. Ancestral variant choices ' +
        'are settled before the node\'s reference or payload arcs consult them.',
    },
  },

  {
    id: 'direct_variants',
    type: 'pcpNode',
    position: { x: 160, y: 1100 },
    data: {
      label: 'EvalNodeVariant*',
      sublabel: 'Task priority 14–17',
      phase: 'variant',
      refs: [
        { file: 'primIndex.cpp', line: 3300, label: 'EvalNodeVariantSets' },
        { file: 'primIndex.cpp', line: 3300, label: 'EvalNodeVariantAuthored' },
        { file: 'primIndex.cpp', line: 3300, label: 'EvalNodeVariantFallback' },
      ],
      theory: 'Theorem 5.4 · Theorem 7.3 (Phase-Separation)',
      paperAnchor: 'theorem-73-phase-separation-of-selection',
      description:
        '4-step variant evaluation: (1) EvalNodeVariantSets — discover set names; ' +
        '(2) EvalNodeVariantAuthored — walk _VariantTraversalCache in strength order; ' +
        '(3) EvalNodeVariantFallback — consult PcpVariantFallbackMap; ' +
        '(4) EvalNodeVariantNoneFound — marker, no selection applied. ' +
        '_VariantTraversalCache consults only *authored* opinions, never resolved values.',
    },
  },

  {
    id: 'dynamic_payloads',
    type: 'pcpNode',
    position: { x: 160, y: 1280 },
    data: {
      label: 'EvalNodeDynamicPayloads',
      sublabel: 'Task priority 18',
      phase: 'variant',
      refs: [{ file: 'primIndex.cpp', line: 3786, label: 'EvalNodeDynamicPayloads' }],
      description:
        'File-format arguments that may depend on variant selections resolved elsewhere. ' +
        'Processed last, in strength order, after all variant selections are final.',
    },
  },

  // ── Finalization ─────────────────────────────────────────────────────────
  {
    id: 'finalize',
    type: 'pcpNode',
    position: { x: 500, y: 1400 },
    data: {
      label: 'Graph Finalization',
      sublabel: 'PcpPrimIndex_Graph::Finalize()',
      phase: 'resolution',
      refs: [{ file: 'primIndex_Graph.h', line: 1, label: 'Finalize()' }],
      theory: 'Axiom 7.1 (Monotonicity of LayerStack)',
      paperAnchor: 'axiom-71-monotonicity-of-the-layerstack',
      description:
        'Reorders the node pool so a linear traversal visits nodes in strongest-to-weakest ' +
        'order. This reordering — based on arc type and sibling position — is the physical ' +
        'mechanism that makes O(n) value resolution correct.',
    },
  },

  // ── Value Resolution ─────────────────────────────────────────────────────
  {
    id: 'value_resolution',
    type: 'pcpNode',
    position: { x: 500, y: 1580 },
    data: {
      label: 'Phase 2: Value Resolution',
      sublabel: 'Linear traversal, O(n)',
      phase: 'resolution',
      refs: [{ file: 'primIndex.cpp', line: 5333, label: 'PcpComputePrimIndex' }],
      theory: 'Theorem 7.3 (Phase-Separation) · Prop 5.1 (LIVERPS as Sequential Channel)',
      paperAnchor: 'theorem-73-phase-separation-of-selection',
      description:
        'A single linear pass over the finalized node pool in strength order. ' +
        'The first node with a spec for the requested property wins. ' +
        'Index Construction (f_index) is fully complete before this phase starts — ' +
        'this is the architectural enforcement of phase separation.',
    },
  },

  // ── Output ────────────────────────────────────────────────────────────────
  {
    id: 'output',
    type: 'pcpNode',
    position: { x: 500, y: 1760 },
    data: {
      label: 'PcpPrimIndex Result',
      sublabel: 'Cached, queryable',
      phase: 'output',
      refs: [{ file: 'primIndex.h', line: 1, label: 'PcpPrimIndex' }],
      description:
        'The completed prim index: a finalized node pool plus metadata. ' +
        'Stored in the PcpCache. Subsequent queries (attribute value resolution, ' +
        'property composition) traverse the frozen pool — no further arc expansion occurs.',
    },
  },
];

// ── Edge definitions ────────────────────────────────────────────────────────

export const edges: PcpEdge[] = [
  { id: 'e-entry-bootstrap',    source: 'entry',              target: 'bootstrap',           label: 'cache miss' },
  { id: 'e-bootstrap-salted',   source: 'bootstrap',          target: 'salted_earth',        label: 'relocated src?' },
  { id: 'e-bootstrap-reloc',    source: 'bootstrap',          target: 'relocations',         label: 'task 1' },
  { id: 'e-reloc-ireloc',       source: 'relocations',        target: 'implied_relocations', label: 'task 2' },
  { id: 'e-ireloc-refs',        source: 'implied_relocations',target: 'references',          label: 'task 3' },
  { id: 'e-refs-payloads',      source: 'references',         target: 'payloads',            label: 'task 4' },
  { id: 'e-payloads-inherits',  source: 'payloads',           target: 'inherits',            label: 'task 5' },
  { id: 'e-inherits-spec',      source: 'inherits',           target: 'specializes',         label: 'task 6' },
  { id: 'e-spec-ispec',         source: 'specializes',        target: 'implied_specializes', label: 'task 7' },
  { id: 'e-inherits-iclass',    source: 'inherits',           target: 'implied_classes',     label: 'task 8' },
  { id: 'e-bootstrap-avar',     source: 'bootstrap',          target: 'ancestral_variants',  label: 'tasks 9–12' },
  { id: 'e-avar-dvar',          source: 'ancestral_variants', target: 'direct_variants',     label: 'tasks 14–17' },
  { id: 'e-dvar-dynp',          source: 'direct_variants',    target: 'dynamic_payloads',    label: 'task 18' },
  { id: 'e-ispec-finalize',     source: 'implied_specializes',target: 'finalize',            label: 'all arcs done' },
  { id: 'e-dynp-finalize',      source: 'dynamic_payloads',   target: 'finalize',            label: 'variants done' },
  { id: 'e-iclass-finalize',    source: 'implied_classes',    target: 'finalize',            },
  { id: 'e-finalize-resolve',   source: 'finalize',           target: 'value_resolution',    label: 'Phase 2', animated: true },
  { id: 'e-resolve-output',     source: 'value_resolution',   target: 'output',              },
  // Recursive self-reference for references/payloads
  { id: 'e-refs-recurse',       source: 'references',         target: 'bootstrap',           label: 'recursive build' },
];
