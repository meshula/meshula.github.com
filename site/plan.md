# त्रित्रयम् Website Development Plan

## Overview

Building a static website using **Astro** to publish selected त्रित्रयम् research with full LaTeX/MathJax support. The site will bridge academic consciousness research with practical contemplative technology applications.

## Technology Stack

- **Framework**: Astro (excellent Markdown + LaTeX support)
- **Content**: Markdown files with embedded LaTeX ($$...$$)
- **Math Rendering**: MathJax integration
- **Deployment**: Static site generation to `site/dist/`
- **Hosting**: Netlify (already configured via `netlify.toml`)

## Directory Structure

```
site/
├── plan.md                 # This planning document
├── src/                    # Astro source files
│   ├── pages/              # Page routes
│   │   ├── index.astro     # Homepage
│   │   ├── research/       # Research section
│   │   ├── papers/         # Academic papers
│   │   └── guides/         # Educational guides
│   ├── components/         # Reusable components
│   │   ├── MathRenderer.astro
│   │   ├── ResearchCard.astro
│   │   └── TriadicNav.astro
│   ├── layouts/           # Page layouts
│   │   ├── BaseLayout.astro
│   │   ├── PaperLayout.astro
│   │   └── GuideLayout.astro
│   └── content/           # Content collections
│       ├── papers/         # Research papers
│       ├── guides/         # Educational content
│       └── insights/       # Key insights
├── dist/                  # Build output (generated)
├── public/                # Static assets
│   ├── images/
│   └── diagrams/
├── astro.config.mjs       # Astro configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript config
```

## Content Strategy

### Selected Publications
**Curated research from the tri-triad organization**:

#### Foundation Papers
- [ ] **Life Theorem** (`campus/life-theorem.md`)
- [ ] **Consciousness Cube Paper** (`traceus/consciousness_cube_paper.md`)
- [ ] **Sanskrit Technology Experiment** (`traceus/sanskrit_consciousness_technology_experiment.md`)

#### Contemplative Guides
- [ ] **Reader's Guide** (`traceus/readers-guide.md`)
- [ ] **Seeker's Guide** (`traceus/seekers-guide.md`)
- [ ] **Terminology Guide** (curated from `traceus/searching-for-terminology.md`)

#### Interactive Elements
- [ ] **Vedic Mandala Visualizer** (adapt `traceus/vedic_ninefold_mandala_visualizer.html`)
- [ ] **Tarot Triad Visualizer** (adapt `traceus/tarot_triad_visualizer.html`)
- [ ] **I Ching Triadic Analysis** (from various traceus files)

## Setup Checklist

### Phase 1: Project Initialization
- [✅] Create `site/` directory structure
- [✅] Initialize Astro project: `npm create astro@latest .`
- [✅] Configure TypeScript support
- [✅] Set up Astro configuration with Markdown + LaTeX
- [✅] Install MathJax integration
- [ ] Configure content collections for papers/guides

### Phase 2: LaTeX/Math Support
- [✅] Install and configure MathJax or KaTeX
- [✅] Test LaTeX rendering with sample equations
- [✅] Set up rehype/remark plugins for enhanced Markdown
- [ ] Configure syntax highlighting for code blocks
- [ ] Test embedded diagrams and visualizations

### Phase 3: Content Migration
- [ ] Create content collection schemas
- [ ] Migrate consciousness cube paper with math notation
- [✅] Migrate life theorem with thermodynamic equations
- [ ] Adapt interactive visualizers to Astro components
- [ ] Create navigation structure reflecting triadic organization

### Phase 4: Design & UX
- [ ] Design contemplative-first visual identity
- [ ] Implement responsive layouts
- [ ] Create triadic navigation system (Motion/Memory/Field)
- [ ] Design paper/guide reading experience
- [ ] Integrate Sanskrit typography support

### Phase 5: Interactive Features
- [ ] Implement mandala visualizers as Astro components
- [ ] Create interactive consciousness cube explorer
- [ ] Build triadic terminology explorer
- [ ] Add search functionality for research content

### Phase 6: Deployment & Integration
- [✅] Configure Netlify deployment from `site/dist/`
- [✅] Set up build automation
- [✅] Test math rendering in production
- [✅] Configure domain and SSL
- [ ] Set up analytics (privacy-conscious)

### Additional:

Documentation & Planning ✅

✅ Created comprehensive README.md files for all src/ directories
✅ Established development guidance for components, layouts, content, and styles
✅ Copied planning documentation into Astro project (TRITRAYAM_PLAN.md)

Project Structure ✅

✅ Blog template integration - Perfect for research papers and guides
✅ Content collections foundation - Astro blog template provides this structure
✅ Development server working - Site is live and accessible


## Technical Implementation Notes

### Astro Configuration Example
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export default defineConfig({
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex]
    })
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});
```

### Content Collection Schema
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const papers = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.enum(['foundation', 'research', 'application']),
    triadic_domain: z.enum(['motion', 'memory', 'field']),
    mathematical_content: z.boolean(),
    sanskrit_terms: z.array(z.string()).optional(),
    tags: z.array(z.string())
  })
});

export const collections = {
  'papers': papers,
  'guides': papers, // Same schema for now
};
```

### LaTeX Support Strategy
**MathJax Configuration**:
```javascript
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\(', '\)']],
    displayMath: [['$$', '$$'], ['\[', '\]']],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
  }
};
```

## Content Adaptation Strategy

### Equation Examples to Test
From the consciousness research:
```latex
$$\begin{aligned}
S &= k\ln\Omega \\ \text{(Boltzmann entropy)}\\
\Delta S &< 0 \\ \text{(negative entropy/negentropy)}\\
\text{Life} &= \text{Autocatalytic process minimizing local entropy}
\end{aligned}$$
```

### Sanskrit Typography
- Use Devanagari web fonts for authentic Sanskrit rendering
  - BakBak One in retrofuturistic contexts
- Implement transliteration system (IAST → Devanagari)
- Create Sanskrit term glossary with hover definitions

## Publication Timeline

### Phase 1 (Week 1-2): Foundation
- Set up Astro project structure
- Configure LaTeX/MathJax support
- Test with sample content

### Phase 2 (Week 3-4): Content Migration
- Migrate key papers with math notation
- Adapt interactive visualizers
- Create navigation structure

### Phase 3 (Week 5-6): Polish & Deploy
- Design and UX refinement
- Interactive features implementation
- Production deployment and testing

## Success Metrics

### Technical Goals
- [ ] Perfect LaTeX rendering in all browsers
- [ ] Fast static site performance (<2s load time)
- [ ] Mobile-responsive contemplative design
- [ ] Search functionality for research content

### Content Goals
- [ ] Core consciousness papers publicly accessible
- [ ] Interactive visualizers functional and educational
- [ ] Clear navigation reflecting triadic organization
- [ ] Sanskrit terminology properly rendered

### Community Goals
- [ ] Educational resource for contemplative technology
- [ ] Bridge between academic research and practical application
- [ ] Platform for sharing consciousness engineering insights
- [ ] Foundation for broader त्रित्रयम् community

---

*This plan embodies the triadic principle: Motion (fresh website development), Memory (established research content), and Field (public knowledge sharing space). The site will make contemplative technology accessible while preserving the depth and rigor of the original research.*