<script lang="ts">
  import { focus, outline } from './store.svelte';

  // outline is populated dynamically by PaperPanel via marked.lexer() on encapsulation.md

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
