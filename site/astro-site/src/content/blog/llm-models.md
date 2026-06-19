---
title: "LLM Usage notes"
description: "Workplace safety posters for LLMS"
pubDate: 2026-06-19
tags: ["AI", "Dunning-Kruger", "LLM", "survey"]
author: "Nick Porcino"
draft: false
---

<style>
/* --- Provenance block: small typewriter --- */
.prose pre:has(code.language-rfc-draft),
.prose pre.language-rfc-draft {
  font-size: 0.62em;
  line-height: 1.25;
}
.prose pre:has(code.language-rfc-draft) code,
.prose pre.language-rfc-draft code {
  font-family: 'Courier New', Courier, 'Courier Prime', monospace;
  font-size: inherit;
}
/* Fallback: this post only contains the one provenance code block */
.prose pre {
  font-size: 0.62em;
  line-height: 1.25;
}
.prose pre code {
  font-family: 'Courier New', Courier, 'Courier Prime', monospace;
}

/* --- Model section headings: smaller Michroma --- */
.prose h3 {
  font-family: 'Michroma', 'Arial Black', Impact, sans-serif;
  font-size: 0.95em;
  letter-spacing: 0.01em;
  margin-top: 1.5em;
}

/* --- Tables: smaller Michroma --- */
.prose table {
  font-family: 'Michroma', 'Arial Black', Impact, sans-serif;
  font-size: 0.6em;
  line-height: 1.3;
}
.prose table th,
.prose table td {
  padding: 0.4em 0.6em;
}

/* --- Tested-models table of contents --- */
.prose .model-toc {
  margin: 0 0 2.5em 0;
  padding: 1em 1.25em;
  border: 1px solid rgb(var(--gray-light));
  border-radius: 8px;
  background-color: var(--color-surface);
}
.prose .model-toc-title {
  font-family: 'Michroma', 'Arial Black', Impact, sans-serif;
  font-size: 0.8em;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgb(var(--gray));
  margin: 0 0 0.75em 0;
}
.prose .model-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.prose .model-toc li {
  margin: 0;
}
.prose .model-toc a {
  display: block;
  padding: 0.3em 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8em;
  line-height: 1.3;
  text-decoration: none;
  color: rgb(var(--gray-dark));
  border-left: 2px solid rgb(var(--gray-light));
  padding-left: 0.75em;
  transition: color 0.2s, border-color 0.2s;
}
.prose .model-toc a:hover {
  color: var(--accent);
  border-left-color: var(--accent);
}
</style>

<nav class="model-toc" aria-label="Tested models">
  <h2 class="model-toc-title">Tested Models</h2>
  <ul id="model-toc-list"></ul>
</nav>

<script is:inline>
(function () {
  function buildModelToc() {
    var list = document.getElementById('model-toc-list');
    if (!list || list.childElementCount) return;
    var prose = list.closest('.prose') || document;
    var heads = prose.querySelectorAll('h3[id]');
    heads.forEach(function (h) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });
  }
  document.addEventListener('DOMContentLoaded', buildModelToc);
  document.addEventListener('astro:page-load', buildModelToc);
  buildModelToc();
})();
</script>

```rfc-draft
   ┌──────────────────────────────────────────────────────────────────────────┐
   │      ▓▓▓▒▒▒ PROVENANCE NODE 001-1 // ZONE: HMN_REMIXABLE ▒▒▒▓▓▓          │
   ├──────────────────────────────────────────────────────────────────────────┤
   │ SRC_AUTH : HMN                    │ SIG_STAT : UNSIGNED                  │
   │ AUTH_ID  : NICK PORCINO           │ TYPE     : SURVEY                    │
   │ DATE     : 20260619               │ TYPE     : SURVEY                    │
   ├──────────────────────────────────────────────────────────────────────────┤
   │ [ RIGHTS & PERMISSIONS MATRIX ]                                          │
   │ INDEX_ALLOW : YES                 │ CORP_TRAIN: NO                       │
   │ DERIV_ALLOW : YES                 │ GOV_SPDX  : ResponsibleSrc           │
   └──────────────────────────────────────────────────────────────────────────┘
  ```

## Introduction

The following is a brief accounting of models found to be useful, and some characterizing notes based on experience using those models. Scripts to download and test most of these models may be found here:

https://codeberg.org/meshula/LabLlama/src/branch/dev/agentic/scripts

Not all models available via those scripts are useful enough to warrant further notes, and won't be found below. If sufficient interest in this list develops, future work will include proper benchmarking via a system such as terminal bench, or the intelligence per watt benchmark listed in the notes.

### unsloth/gemma-4-26B-A4B-it-qat-GGUF:UD-Q4_K_XL

| TAG | VALUE |
| --- | ----- |
| MODEL | unsloth/gemma-4-26B-A4B-it-qat-GGUF:UD-Q4_K_XL |
| DATE | 20260618 |
| PROC | M1 ULTRA 128GB |
| SRV | LLAMA-SERVE —spec-type draft-mtp --spec-draft-n-max 2 |
| PROMPT/GEN | 150/100 |
| THINKING | EXCELLENT |
| COHERENCE | EXCELLENT |
| PLANNING | UNTESTED |
| CODING | UNTESTED |
| SYCOPHANCY | VERY LOW |

### Qwen3.6 27B NVFP4

| TAG | VALUE |
| --- | ----- |
| MODEL | Qwen3.6 27B NVFP4 |
| DATE | 20260618 |
| PROC | DGX SPARK 128GB |
| SRV | UNKNOWN |
| PROMPT/GEN | N/A |
| THINKING | EXCELLENT |
| COHERENCE | EXCELLENT |
| PLANNING | EXCELLENT |
| CODING | UNTESTED |
| SYCOPHANCY | NOT OBNOXIOUS |

### Qwen3.6-27B-AEON-Ultimate-Uncensored-BF16-mlx-fp16

| TAG | VALUE |
| --- | ----- |
| MODEL | Qwen3.6-27B-AEON-Ultimate-Uncensored-BF16-mlx-fp16 |
| DATE | 20260610 |
| PROC | M5 MAX 128GB |
| SRV | OMLX |
| PROMPT/GEN | N/10 |
| THINKING | EXCELLENT |
| COHERENCE | EXCELLENT |
| PLANNING | EXCELLENT |
| CODING | GOOD, SOME HALLUCINATION |
| SYCOPHANCY | VERY LOW |

### gemma-4-26B-A4B-it-unsloth-mlx-oQ4-fp16

| TAG | VALUE |
| --- | ----- |
| MODEL | gemma-4-26B-A4B-it-unsloth-mlx-oQ4-fp16 |
| DATE | 20260610 |
| PROC | M5 MAX 128GB |
| SRV | OMLX |
| PROMPT/GEN | N/30 |
| THINKING | EXCELLENT |
| COHERENCE | EXCELLENT |
| PLANNING | EXCELLENT |
| CODING | GOOD, SOME HALLUCINATION |
| SYCOPHANCY | MODERATE |

### Codestral-22B-v0.1.Q4_K_M

| TAG | VALUE |
| --- | ----- |
| MODEL | Codestral-22B-v0.1.Q4_K_M |
| DATE | 20260524 |
| PROC | M3 MAX 128GB |
| SRV | LLAMA-SERVE |
| PROMPT/GEN | N/30 |
| THINKING | N/A |
| COHERENCE | GOOD |
| PLANNING | MODERATE |
| CODING | MODERATE, HALLUCINATION |
| SYCOPHANCY | LOW |

### Qwen3-Coder-Next-Q6_K

| TAG | VALUE |
| --- | ----- |
| MODEL | Qwen3-Coder-Next-Q6_K |
| DATE | 20260524 |
| PROC | M3 MAX 128GB |
| SRV | LLAMA-SERVE |
| PROMPT/GEN | 30/10 |
| THINKING | N/A |
| COHERENCE | GOOD |
| PLANNING | GOOD |
| CODING | GOOD, HALLUCINATION |
| SYCOPHANCY | LOW |

### Mixtral-8x7B-Instruct-v0.1.Q4_K_M

| TAG | VALUE |
| --- | ----- |
| MODEL | Mixtral-8x7B-Instruct-v0.1.Q4_K_M |
| DATE | 20260524 |
| PROC | M3 MAX 128GB |
| SRV | LLAMA-SERVE |
| PROMPT/GEN | N/30 |
| THINKING | N/A |
| COHERENCE | POOR |
| PLANNING | N/A |
| CODING | HIGH HALLUCINATION |
| SYCOPHANCY | MARCH HARE |

### Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-GGUF

| TAG | VALUE |
| --- | ----- |
| MODEL | Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled-GGUF |
| DATE | 20260524 |
| PROC | M3 MAX 128GB |
| SRV | LLAMA-SERVE |
| PROMPT/GEN | 30/10 |
| THINKING | EXCELLENT |
| COHERENCE | EXCELLENT |
| PLANNING | EXCELLENT |
| CODING | GOOD |
| SYCOPHANCY | LOW |

### gpt-oss-120b-mxfp4

| TAG | VALUE |
| --- | ----- |
| MODEL | gpt-oss-120b-mxfp4 |
| DATE | 20260524 |
| PROC | M3 MAX 128GB |
| SRV | LLAMA-SERVE |
| PROMPT/GEN | 30/10 |
| THINKING | EXCELLENT |
| COHERENCE | EXCELLENT |
| PLANNING | EXCELLENT |
| CODING | GOOD |
| SYCOPHANCY | MODERATE |

## Further Reading

https://scalingintelligence.stanford.edu/pubs/ipw/
