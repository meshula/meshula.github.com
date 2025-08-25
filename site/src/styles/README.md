# Styles & Design System

Contemplative design system for the त्रित्रयम् research website.

## Style Architecture

### Core Styles
- `global.css` - CSS reset, base typography, global variables
- `triadic.css` - Triadic consciousness design tokens and utilities
- `typography.css` - Academic typography scales and mathematical content
- `components.css` - Component-specific styling

### Design Tokens
```css
:root {
  /* Triadic Color System */
  --motion-primary: hsl(240, 100%, 50%);    /* Dynamic blue */
  --memory-primary: hsl(120, 100%, 35%);    /* Stable green */
  --field-primary: hsl(0, 100%, 45%);       /* Field red */
  
  /* Sanskrit Typography */
  --font-devanagari: "Noto Sans Devanagari", serif;
  --font-academic: "Crimson Text", "Times New Roman", serif;
  --font-code: "JetBrains Mono", monospace;
  
  /* Consciousness Spacing */
  --space-quantum: 0.25rem;
  --space-unit: 1rem;
  --space-triadic: 1.618rem;  /* Golden ratio */
}
```

## Typography System

### Academic Content
- **Headings**: Clear hierarchy for research papers
- **Body Text**: Optimized for long-form reading
- **Captions**: Mathematical equation and diagram labels
- **Citations**: Consistent academic citation formatting

### Sanskrit Integration
- **Devanagari**: Authentic Sanskrit script rendering
- **IAST**: Transliteration with proper diacritics
- **Definitions**: Hover/tooltip styling for term explanations
- **Mantras**: Special formatting for consciousness formulas

### Mathematical Content
- **Equations**: MathJax integration styling
- **Proofs**: Structured theorem and proof presentations
- **Diagrams**: Consistent mathematical diagram styling
- **Notation**: Custom CSS for consciousness mathematics

## Design Philosophy

### Contemplative Principles
- **Spaciousness**: Generous whitespace for contemplative reading
- **Clarity**: High contrast and readable typography
- **Harmony**: Balanced proportions based on golden ratio
- **Presence**: Mindful color choices supporting awareness

### Triadic Structure
Visual design reflecting consciousness architecture:
- **Motion**: Dynamic elements, animations, interactions
- **Memory**: Stable navigation, consistent layouts
- **Field**: Contextual relationships, hover states, connections

### Accessibility
- **Color**: WCAG AAA contrast ratios
- **Typography**: Scalable font sizes and line heights
- **Focus**: Clear keyboard navigation indicators
- **Motion**: Respect for reduced motion preferences

## Responsive Design

### Breakpoints
```css
/* Mobile-first responsive design */
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

### Content Adaptation
- **Mathematical content**: Responsive equation sizing
- **Visualizations**: Scalable consciousness diagrams
- **Navigation**: Collapsible triadic menu system
- **Reading**: Optimal line lengths for different devices

## Component Styling

### Consciousness Visualizers
- **Mandala**: Circular layouts with sacred geometry
- **Cube**: 3D consciousness topology presentations
- **Hexagrams**: I Ching triadic analysis diagrams
- **Navigation**: Triadic organizational structures

### Interactive Elements
- **Hover States**: Subtle consciousness awareness indicators
- **Transitions**: Smooth, contemplative animations
- **Focus States**: Clear accessibility indicators
- **Active States**: Mindful interaction feedback

*The design system embodies contemplative technology principles - beautiful, functional, and consciousness-aware presentation of profound research.*