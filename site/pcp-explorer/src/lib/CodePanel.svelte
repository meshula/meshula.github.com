<script lang="ts">
  import { base } from '$app/paths';
  import { focus } from './store.svelte';
  import hljs from 'highlight.js/lib/core';
  import cpp from 'highlight.js/lib/languages/cpp';
  import 'highlight.js/styles/tokyo-night-dark.css';

  hljs.registerLanguage('cpp', cpp);

  let lines = $state<string[]>([]);
  let highlightedLines = $state<string[]>([]);
  let loading = $state(true);
  let error = $state('');
  let lineRefs: (HTMLElement | null)[] = [];

  // Window around the focus range for virtual rendering
  const WINDOW = 80;

  let focusStart = $derived(focus.codeRange?.start ?? null);
  let focusEnd = $derived(focus.codeRange?.end ?? null);

  // Compute which slice to render: focus ± WINDOW, or first WINDOW lines if no focus
  let sliceStart = $derived(
    focusStart !== null ? Math.max(0, focusStart - WINDOW - 1) : 0
  );
  let sliceEnd = $derived(
    focusStart !== null ? Math.min(lines.length, (focusEnd ?? focusStart) + WINDOW) : Math.min(lines.length, WINDOW * 2)
  );

  let visibleLines = $derived(highlightedLines.slice(sliceStart, sliceEnd));

  async function loadFile() {
    try {
      const res = await fetch(`${base}/code/primIndex.cpp`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      lines = text.split('\n');
      // Highlight the whole file
      const result = hljs.highlight(text, { language: 'cpp' });
      highlightedLines = result.value.split('\n');
      loading = false;
    } catch (e) {
      error = String(e);
      loading = false;
    }
  }

  $effect(() => {
    loadFile();
  });

  // Scroll focused line into view when codeRange changes
  $effect(() => {
    const start = focus.codeRange?.start;
    if (start == null || loading) return;
    // Small delay for DOM update
    setTimeout(() => {
      const el = document.getElementById(`line-${start}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  });

  function isFocused(lineNum: number): boolean {
    if (focusStart === null) return false;
    return lineNum >= focusStart && lineNum <= (focusEnd ?? focusStart);
  }
</script>

<div class="code-panel">
  <div class="code-header">
    <span class="filename">primIndex.cpp</span>
    {#if focus.codeRange}
      <span class="range">Lines {focus.codeRange.start}–{focus.codeRange.end ?? focus.codeRange.start}</span>
    {:else}
      <span class="range">{lines.length} lines</span>
    {/if}
  </div>

  {#if loading}
    <div class="status">Loading source…</div>
  {:else if error}
    <div class="status error">{error}</div>
  {:else}
    <div class="code-scroll">
      <pre class="code-pre"><code>{#each visibleLines as lineHtml, i}{@const lineNum = sliceStart + i + 1}<span id="line-{lineNum}" class="code-line" class:focused={isFocused(lineNum)}><span class="ln">{lineNum}</span><span class="lc">{@html lineHtml}</span></span>
{/each}</code></pre>
    </div>
  {/if}
</div>

<style>
  .code-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #11111b;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 12px;
  }

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #181825;
    border-bottom: 1px solid #313244;
    flex-shrink: 0;
  }

  .filename {
    color: #89b4fa;
    font-weight: 600;
    font-size: 12px;
  }

  .range {
    color: #7f849c;
    font-size: 11px;
  }

  .status {
    padding: 16px;
    color: #7f849c;
    font-style: italic;
  }

  .status.error {
    color: #f38ba8;
  }

  .code-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
  }

  .code-pre {
    margin: 0;
    padding: 0;
    background: transparent;
    white-space: pre;
    line-height: 1.2;
  }

  .code-pre :global(code) {
    display: block;
    background: transparent;
  }

  .code-line {
    display: flex;
    line-height: 1.2;
  }

  .code-line.focused {
    background: rgba(249, 226, 175, 0.12);
    border-left: 3px solid #f9e2af;
  }

  .code-line:not(.focused) {
    border-left: 3px solid transparent;
  }

  .ln {
    display: inline-block;
    width: 52px;
    min-width: 52px;
    text-align: right;
    padding-right: 16px;
    color: #45475a;
    user-select: none;
    flex-shrink: 0;
  }

  .lc {
    flex: 1;
    white-space: pre;
  }

  /* highlight.js overrides for our dark bg */
  :global(.hljs) {
    background: transparent !important;
    color: #cdd6f4;
  }
</style>
