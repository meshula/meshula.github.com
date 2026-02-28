<script lang="ts">
  import { SvelteFlow, Controls, Background, MiniMap, type Edge } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';

  import PcpNode from '$lib/PcpNode.svelte';
  import Legend from '$lib/Legend.svelte';
  import PaperPanel from '$lib/PaperPanel.svelte';
  import OutlinePanel from '$lib/OutlinePanel.svelte';
  import CodePanel from '$lib/CodePanel.svelte';
  import { nodes as initialNodes, edges as initialEdges } from '$lib/pcp-graph';
  import type { PcpNode as PcpNodeType, PcpEdge } from '$lib/pcp-graph';
  import { panels } from '$lib/store.svelte';

  const nodeTypes = { pcpNode: PcpNode };

  let nodes = $state(initialNodes);
  let edges = $state(
    initialEdges.map((e: PcpEdge): Edge => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label,
      animated: e.animated ?? false,
      style: e.source === 'references' && e.target === 'bootstrap'
        ? 'stroke: #e74c3c; stroke-dasharray: 5,3;'
        : undefined,
    }))
  );
</script>

<svelte:head>
  <title>PCP Algorithm — Elements of Compositional Stability</title>
</svelte:head>

<div class="workspace">
  <header>
    <h1>PCP Algorithm — Elements of Compositional Stability</h1>
    <p>Click a flow node to navigate the paper and jump to source code.</p>
  </header>

  <div class="panels">
    <!-- Outline panel -->
    <div class="panel panel-outline" class:collapsed={panels.outlineCollapsed}>
      {#if panels.outlineCollapsed}
        <button
          class="collapsed-tab"
          onclick={() => (panels.outlineCollapsed = false)}
          title="Expand Outline"
        ><span>Outline</span></button>
      {:else}
        <button
          class="collapse-btn"
          onclick={() => (panels.outlineCollapsed = true)}
          title="Collapse Outline"
        >‹</button>
        <OutlinePanel />
      {/if}
    </div>

    <!-- Paper panel -->
    <div class="panel panel-paper">
      <PaperPanel />
    </div>

    <!-- Flow chart panel -->
    <div class="panel panel-flow" class:collapsed={panels.flowCollapsed}>
      {#if panels.flowCollapsed}
        <button
          class="collapsed-tab"
          onclick={() => (panels.flowCollapsed = false)}
          title="Expand Flow Chart"
        ><span>Flow Chart</span></button>
      {:else}
        <button
          class="collapse-btn"
          onclick={() => (panels.flowCollapsed = true)}
          title="Collapse Flow Chart"
        >‹</button>
        <SvelteFlow
          {nodes}
          {edges}
          {nodeTypes}
          fitView
          minZoom={0.3}
          maxZoom={2}
          colorMode="dark"
        >
          <Controls />
          <MiniMap
            nodeColor={(n) => {
              const phaseColors: Record<string, string> = {
                entry: '#4a90d9', bootstrap: '#5c6bc0', relocation: '#e67e22',
                arc: '#27ae60', variant: '#8e44ad', resolution: '#16a085', output: '#2c3e50',
              };
              return phaseColors[(n.data as { phase: string }).phase] ?? '#666';
            }}
            style="background: #1e1e2e;"
          />
          <Background gap={20} patternColor="#313244" />
        </SvelteFlow>
        <Legend />
      {/if}
    </div>

    <!-- Code panel -->
    <div class="panel panel-code" class:collapsed={panels.codeCollapsed}>
      {#if panels.codeCollapsed}
        <button
          class="collapsed-tab"
          onclick={() => (panels.codeCollapsed = false)}
          title="Expand Code"
        ><span>Code</span></button>
      {:else}
        <button
          class="collapse-btn"
          onclick={() => (panels.codeCollapsed = true)}
          title="Collapse Code"
        >‹</button>
        <CodePanel />
      {/if}
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #11111b;
    color: #cdd6f4;
    font-family: system-ui, sans-serif;
  }

  .workspace {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  header {
    padding: 8px 20px;
    background: #181825;
    border-bottom: 1px solid #313244;
    flex-shrink: 0;
    display: flex;
    align-items: baseline;
    gap: 16px;
  }

  header h1 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: #89dceb;
    white-space: nowrap;
  }

  header p {
    margin: 0;
    font-size: 11px;
    color: #7f849c;
  }

  .panels {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  .panel {
    overflow-y: auto;
    border-right: 1px solid #313244;
    min-height: 0;
    transition: flex 0.25s ease, width 0.25s ease;
  }

  .panel:last-child {
    border-right: none;
  }

  .panel-outline {
    width: 200px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .panel-outline.collapsed {
    width: 28px;
    flex-shrink: 0;
    overflow: hidden;
  }

  .panel-paper {
    flex: 1.5;
    min-width: 0;
  }

  .panel-flow {
    flex: 2;
    position: relative;
    overflow: hidden;
  }

  .panel-flow.collapsed {
    flex: 0 0 28px;
    overflow: hidden;
  }

  .panel-code {
    flex: 1.5;
    overflow: hidden;
    position: relative;
  }

  .panel-code.collapsed {
    flex: 0 0 28px;
    overflow: hidden;
  }

  /* Collapse button — top-left corner of the open panel */
  .collapse-btn {
    position: absolute;
    top: 6px;
    left: 6px;
    z-index: 20;
    background: #313244;
    border: 1px solid #45475a;
    border-radius: 4px;
    color: #cdd6f4;
    font-size: 14px;
    line-height: 1;
    width: 20px;
    height: 20px;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    transition: opacity 0.15s;
  }

  .collapse-btn:hover {
    opacity: 1;
    background: #45475a;
  }

  /* Rotated tab shown when collapsed */
  .collapsed-tab {
    width: 100%;
    height: 100%;
    background: #181825;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .collapsed-tab:hover {
    background: #1e1e2e;
  }

  .collapsed-tab span {
    display: block;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #7f849c;
    white-space: nowrap;
  }

  .collapsed-tab:hover span {
    color: #cdd6f4;
  }
</style>
