<script lang="ts">
  import { marked, type Renderer } from 'marked';
  import { base } from '$app/paths';
  import { focus, outline } from './store.svelte';
  import type { OutlineEntry } from './store.svelte';

  // fetch and render the markdown source
  let html = $state('');
  let containerEl: HTMLElement | undefined = $state(undefined);

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')   // strip non-alphanumeric
      .trim()
      .replace(/[\s]+/g, '-');         // spaces → dashes
  }

  // Custom renderer to add id anchors to headings
  const renderer: Partial<Renderer> = {
    heading({ text, depth }: { text: string; depth: number }): string {
      const id = slugify(text);
      const cls = depth <= 3 ? ' class="theorem-heading"' : '';
      return `<h${depth} id="${id}"${cls}>${text}</h${depth}>\n`;
    },
  };

  marked.use({ renderer });

  // Protect math from marked's inline parser by swapping it out before parsing
  // and restoring it after. Without this, `*` inside $...$ gets treated as emphasis.
  function protectMath(md: string): { protected: string; restore: (html: string) => string } {
    const stash: string[] = [];
    const placeholder = (i: number) => `\x02MATH${i}\x03`;
    const out = md
      // display math first ($$...$$), multiline
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, inner) => {
        stash.push(`$$${inner}$$`);
        return placeholder(stash.length - 1);
      })
      // then inline math ($...$), single line
      .replace(/\$([^\n$]+?)\$/g, (_, inner) => {
        stash.push(`$${inner}$`);
        return placeholder(stash.length - 1);
      });
    return {
      protected: out,
      restore: (h: string) => h.replace(/\x02MATH(\d+)\x03/g, (_, i) => stash[+i]),
    };
  }

  async function loadPaper() {
    const res = await fetch(`${base}/encapsulation.md`);
    if (!res.ok) return;
    const md = await res.text();

    // Extract outline from headings before math protection (plain text, no LaTeX needed)
    const entries: OutlineEntry[] = [];
    for (const token of marked.lexer(md)) {
      if (token.type === 'heading') {
        const text = token.text.replace(/\$[^$]*\$/g, '').trim(); // strip inline math from display text
        entries.push({ depth: token.depth, text, id: slugify(token.text) });
      }
    }
    outline.splice(0, outline.length, ...entries);

    const { protected: safeMd, restore } = protectMath(md);
    html = restore(await marked.parse(safeMd));
  }

  $effect(() => {
    loadPaper();
  });

  // After html changes, run MathJax typesetting
  $effect(() => {
    // Depend on html
    const _ = html;
    if (!containerEl) return;
    // MathJax is loaded async; wait a tick for DOM
    Promise.resolve().then(() => {
      (window as Window & { MathJax?: { typesetPromise?: (els: Element[]) => Promise<void> } }).MathJax?.typesetPromise?.([containerEl!]);
    });
  });

  // Clicking any heading in the rendered paper sets focus.paperAnchor
  function handlePaperClick(e: MouseEvent) {
    const el = (e.target as Element).closest('h1,h2,h3,h4,h5,h6');
    if (el?.id) focus.paperAnchor = el.id;
  }

  // Scroll to anchor when store.paperAnchor changes
  $effect(() => {
    const anchor = focus.paperAnchor;
    if (!anchor) return;
    // Small delay to let rendering settle
    setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="paper-panel" bind:this={containerEl} role="document" onclick={handlePaperClick} onkeydown={() => {}}>
  {#if html}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html html}
  {:else}
    <p class="loading">Loading paper…</p>
  {/if}
</div>

<style>
  .paper-panel {
    padding: 24px 32px;
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 14px;
    line-height: 1.7;
    color: #cdd6f4;
    background: #1e1e2e;
    height: 100%;
    box-sizing: border-box;
  }

  .loading {
    color: #7f849c;
    font-style: italic;
  }

  /* Headings */
  .paper-panel :global(h1) {
    font-size: 22px;
    color: #cba6f7;
    border-bottom: 1px solid #313244;
    padding-bottom: 8px;
    margin-top: 32px;
  }

  .paper-panel :global(h2) {
    font-size: 18px;
    color: #89dceb;
    margin-top: 28px;
    border-bottom: 1px solid #313244;
    padding-bottom: 4px;
  }

  .paper-panel :global(h3) {
    font-size: 15px;
    color: #a6e3a1;
    margin-top: 22px;
  }

  .paper-panel :global(h1),
  .paper-panel :global(h2),
  .paper-panel :global(h3) {
    cursor: pointer;
  }

  .paper-panel :global(.theorem-heading) {
    border-left: 3px solid #a6e3a1;
    padding-left: 10px;
  }

  .paper-panel :global(.theorem-heading:hover) {
    color: #cba6f7;
    border-left-color: #cba6f7;
  }

  .paper-panel :global(h1:hover),
  .paper-panel :global(h2:hover) {
    opacity: 0.8;
  }

  .paper-panel :global(p) {
    margin: 0 0 12px;
  }

  .paper-panel :global(ul),
  .paper-panel :global(ol) {
    padding-left: 24px;
    margin: 0 0 12px;
  }

  .paper-panel :global(li) {
    margin-bottom: 6px;
  }

  .paper-panel :global(code) {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 12px;
    background: #181825;
    border: 1px solid #313244;
    border-radius: 3px;
    padding: 1px 4px;
    color: #89b4fa;
  }

  .paper-panel :global(pre) {
    background: #181825;
    border: 1px solid #313244;
    border-radius: 6px;
    padding: 12px 16px;
    overflow-x: auto;
    margin: 0 0 16px;
  }

  .paper-panel :global(pre code) {
    background: none;
    border: none;
    padding: 0;
    font-size: 12px;
  }

  .paper-panel :global(blockquote) {
    border-left: 3px solid #45475a;
    margin: 0 0 12px 0;
    padding: 6px 16px;
    color: #a6adc8;
  }

  .paper-panel :global(strong) {
    color: #f38ba8;
    font-weight: 700;
  }

  .paper-panel :global(em) {
    color: #fab387;
    font-style: italic;
  }

  .paper-panel :global(hr) {
    border: none;
    border-top: 1px solid #313244;
    margin: 24px 0;
  }

  .paper-panel :global(a) {
    color: #89b4fa;
    text-decoration: none;
  }

  .paper-panel :global(a:hover) {
    text-decoration: underline;
  }

  /* MathJax inline/display math */
  .paper-panel :global(.MathJax) {
    color: #cdd6f4;
  }

  /* Numbered definition lists */
  .paper-panel :global(ol > li > strong:first-child) {
    color: #89dceb;
  }
</style>
