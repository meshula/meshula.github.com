<script lang="ts">
  import { Handle, Position } from '@xyflow/svelte';
  import { codeUrl } from './pcp-graph';
  import type { PcpNodeData } from './pcp-graph';
  import { focus, panels } from './store.svelte';

  interface Props {
    id: string;
    data: PcpNodeData;
    selected?: boolean;
  }

  let { id, data, selected = false }: Props = $props();

  const phaseColors: Record<string, string> = {
    entry:      '#4a90d9',
    bootstrap:  '#5c6bc0',
    relocation: '#e67e22',
    arc:        '#27ae60',
    variant:    '#8e44ad',
    resolution: '#16a085',
    output:     '#2c3e50',
  };

  let color = $derived(phaseColors[data.phase] ?? '#666');
  let expanded = $state(false);
  let focused = $derived(focus.nodeId === id);

  function handleClick() {
    expanded = !expanded;
    focus.nodeId = id;
    if (data.paperAnchor) {
      focus.paperAnchor = data.paperAnchor as string;
    }
    if (data.refs && data.refs.length > 0) {
      const line = data.refs[0].line;
      focus.codeRange = { start: line, end: line + 20 };
      panels.codeCollapsed = false;   // reveal code panel
    }
  }
</script>

<Handle type="target" position={Position.Top} />

<div
  class="pcp-node"
  class:selected
  class:focused
  style="--phase-color: {color}"
  role="button"
  tabindex="0"
  onclick={handleClick}
  onkeydown={(e) => e.key === 'Enter' && handleClick()}
>
  <div class="header">
    <span class="label">{data.label}</span>
    {#if data.sublabel}
      <span class="sublabel">{data.sublabel}</span>
    {/if}
  </div>

  {#if data.theory}
    <div class="theory">{data.theory}</div>
  {/if}

  {#if expanded}
    <div class="body">
      <p class="description">{data.description}</p>
      {#if data.refs.length > 0}
        <ul class="refs">
          {#each data.refs as ref}
            <li>
              <a href={codeUrl(ref)} target="_blank" rel="noreferrer">
                {ref.file}:{ref.line}
              </a>
              <span class="ref-label"> — {ref.label}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {:else}
    <div class="hint">click to expand</div>
  {/if}
</div>

<Handle type="source" position={Position.Bottom} />

<style>
  .pcp-node {
    background: #1e1e2e;
    border: 2px solid var(--phase-color);
    border-radius: 8px;
    padding: 10px 14px;
    min-width: 220px;
    max-width: 340px;
    cursor: pointer;
    font-family: 'Inter', system-ui, sans-serif;
    color: #cdd6f4;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    transition: box-shadow 0.15s ease;
  }

  .pcp-node.selected,
  .pcp-node:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--phase-color), 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  .pcp-node.focused {
    outline: none;
    box-shadow: 0 0 0 4px var(--phase-color), 0 0 20px var(--phase-color), 0 2px 8px rgba(0, 0, 0, 0.5);
    border-color: var(--phase-color);
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .label {
    font-weight: 700;
    font-size: 13px;
    color: var(--phase-color);
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }

  .sublabel {
    font-size: 10px;
    color: #7f849c;
  }

  .theory {
    margin-top: 5px;
    font-size: 10px;
    font-style: italic;
    color: #a6adc8;
    border-left: 2px solid var(--phase-color);
    padding-left: 6px;
  }

  .hint {
    margin-top: 4px;
    font-size: 9px;
    color: #45475a;
  }

  .body {
    margin-top: 8px;
    border-top: 1px solid #313244;
    padding-top: 8px;
  }

  .description {
    font-size: 11px;
    line-height: 1.5;
    color: #bac2de;
    margin: 0 0 8px;
  }

  .refs {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .refs li {
    font-size: 10px;
    margin-bottom: 3px;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    align-items: baseline;
  }

  .refs a {
    color: #89b4fa;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    text-decoration: none;
  }

  .refs a:hover {
    text-decoration: underline;
    color: #cba6f7;
  }

  .ref-label {
    color: #6c7086;
    font-size: 9px;
  }
</style>
