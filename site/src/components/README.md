# Astro Components

Reusable components for the त्रित्रयम् research website.

## Planned Components

### Mathematics & Research
- `MathRenderer.astro` - LaTeX/MathJax rendering component
- `ResearchCard.astro` - Paper/guide preview cards
- `CitationBlock.astro` - Academic citation formatting
- `EquationDisplay.astro` - Standalone equation presentations

### Navigation & Structure
- `TriadicNav.astro` - Main navigation reflecting Motion/Memory/Field
- `Breadcrumb.astro` - Hierarchical navigation
- `TableOfContents.astro` - Dynamic TOC generation
- `TagCloud.astro` - Research topic tags

### Interactive Visualizations
- `ConsciousnessCube.astro` - 27-position topology explorer
- `VedicMandala.astro` - Interactive ninefold mandala
- `TarotTriad.astro` - Triadic tarot visualization
- `IChingHexagram.astro` - I Ching triadic analysis

### Content & Typography
- `SanskritTerm.astro` - Sanskrit terms with Devanagari + transliteration
- `ConceptDefinition.astro` - Hoverable consciousness term definitions
- `TheoremBlock.astro` - Mathematical theorem presentations
- `ContemplativeQuote.astro` - Wisdom tradition quotes

## Component Guidelines

### Props & Typing
- Use TypeScript interfaces for all component props
- Include JSDoc comments for component documentation
- Follow Astro's component prop conventions

### Accessibility
- Ensure all interactive components are keyboard accessible
- Provide proper ARIA labels for consciousness visualizers
- Include alt text for mathematical diagrams

### Performance
- Use Astro's island architecture for interactive components
- Minimize JavaScript for static mathematical content
- Optimize LaTeX rendering performance

*Components should embody contemplative design principles - clear, purposeful, and consciousness-aware.*