# PCP Explorer — Elements of Compositional Stability

An interactive four-panel scholarly IDE for exploring the OpenUSD Prim Composition Pipeline (PCP) algorithm alongside its formal theoretical foundations.

## Overview

The app presents four synchronized panels:

```
┌─────────────┬──────────────────┬──────────────────┬──────────────────┐
│   Outline   │      Paper       │   Flow Chart     │      Code        │
│             │                  │                  │                  │
│ Clickable   │ encapsulation.md │  SvelteFlow DAG  │ primIndex.cpp    │
│ section /   │ rendered with    │  of the PCP      │ with syntax      │
│ theorem     │ MathJax for      │  algorithm       │ highlighting     │
│ tree        │ LaTeX math       │  pipeline        │ and line focus   │
└─────────────┴──────────────────┴──────────────────┴──────────────────┘
```

**Navigation is cross-linked:** clicking any flow node scrolls the paper to its associated theorem and jumps the code panel to the relevant source lines. Clicking an outline entry scrolls the paper directly to that section or theorem. The active flow node gains a colored glow ring.

## Source Material

| Asset | Source |
|---|---|
| `static/encapsulation.md` | *Elements of Compositional Stability In USD* — Nick Porcino, Pixar Animation Studios (2026) |
| `static/code/primIndex.cpp` | OpenUSD `pxr/usd/pcp/primIndex.cpp` (5,766 lines) |

## Architecture

### Shared State (`src/lib/store.svelte.ts`)

A single Svelte 5 `$state` object drives all cross-panel navigation:

```ts
interface FocusState {
  nodeId: string | null;        // active flow node id
  paperAnchor: string | null;   // heading id to scroll to in the paper panel
  codeRange: { start: number; end: number } | null;  // line range in primIndex.cpp
}
```

All panels read from and write to this store. No prop-drilling.

### Panel Components

| File | Role |
|---|---|
| `src/lib/OutlinePanel.svelte` | Static heading tree extracted from `encapsulation.md`; clicking sets `focus.paperAnchor` |
| `src/lib/PaperPanel.svelte` | Fetches and renders the markdown paper via `marked`; calls `MathJax.typesetPromise()` after each render; scrolls to `focus.paperAnchor` via `$effect` |
| `src/lib/PcpNode.svelte` | Custom SvelteFlow node; on click sets `focus.nodeId`, `focus.paperAnchor`, and `focus.codeRange`; shows a phase-colored glow when focused |
| `src/lib/CodePanel.svelte` | Fetches `primIndex.cpp`, syntax-highlights with `highlight.js` (C++ only); renders a virtual window of ±80 lines around the focus; scrolls focused lines into view with a yellow highlight bar |
| `src/lib/Legend.svelte` | Phase color legend overlay inside the flow panel |

### Flow Graph (`src/lib/pcp-graph.ts`)

Defines the 17-node, 19-edge DAG of the PCP algorithm pipeline. Each node carries:

- `phase` — one of `entry | bootstrap | relocation | arc | variant | resolution | output`
- `refs` — source code references into `primIndex.cpp` with line numbers
- `theory` — human-readable theorem/proposition label
- `paperAnchor` — slugified heading id linking to the corresponding section in the paper
- `description` — prose explanation of the pipeline stage

The anchor slugification rule strips all non-alphanumeric characters and collapses whitespace to hyphens, e.g.:
- `### Theorem 5.2: The Relocation Mirage (Namespace Stability)` → `theorem-52-the-relocation-mirage-namespace-stability`

### MathJax

Configured in `src/app.html` via CDN (MathJax 3, `tex-chtml`). Inline math uses `$...$` and display math uses `$$...$$`. Typesetting is triggered manually by `PaperPanel` after each markdown render so it doesn't block initial load.

## Dependencies

| Package | Purpose |
|---|---|
| `@xyflow/svelte` | Interactive flow diagram (SvelteFlow) |
| `marked` | Markdown → HTML rendering with custom heading renderer |
| `highlight.js` | C++ syntax highlighting (cpp language pack only) |
| MathJax 3 (CDN) | LaTeX math rendering in the paper panel |

## Development

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```sh
npm run check   # Svelte + TypeScript type checking
npm run build   # Production build
npm run preview # Preview production build
```

## Updating the paper or source

- **Paper**: replace `static/encapsulation.md` — the paper panel fetches it at runtime, MathJax retypesets automatically.
- **Source file**: replace `static/code/primIndex.cpp` — the code panel fetches it at runtime.
- **Flow graph / anchors**: edit `src/lib/pcp-graph.ts` to add nodes, update `paperAnchor` strings, or adjust line references.
- **Outline**: update the static `outline` array in `src/lib/OutlinePanel.svelte` to match any new headings.
