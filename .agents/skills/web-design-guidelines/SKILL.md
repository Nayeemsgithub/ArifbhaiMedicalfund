---
name: web-design-guidelines
description: >-
  Standard web design guidelines covering responsive layouts, WCAG 2.1 accessibility,
  fluid scaling, touch ergonomics, SEO-friendly semantic markup, and performance optimization.
  Use this skill whenever structuring web pages, building responsive grids, or validating accessibility.
---

# Web Design Guidelines Skill

This skill provides mandatory architectural rules and best practices for creating responsive, accessible, high-performance web interfaces.

---

## 1. Responsive Layout & Fluid Scaling

### A. Mobile-First Ergonomics
- Design the mobile viewport (375px - 430px) with touch targets $\ge 44 \times 44\text{ px}$.
- Place primary actions (floating action buttons, bottom navigation, CTA) in the easy thumb reach zone (bottom third of viewport).
- Avoid horizontal overflow: always use `max-w-full`, `overflow-x-hidden` on wrappers, and responsive flex/grid wrappers (`flex-col md:flex-row`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

### B. Breakpoint System
- `sm`: 640px (Small tablets / large phones)
- `md`: 768px (Tablets)
- `lg`: 1024px (Laptops / Desktop)
- `xl`: 1280px (Large screens)
- `2xl`: 1536px (Ultra-wide monitors)

---

## 2. Accessibility (WCAG 2.1 AA Compliance)

### A. Semantic Structure
- Use real semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Maintain strict heading hierarchy: exactly one `<h1>` per page, followed sequentially by `<h2>`, `<h3>` without skipping levels.
- Always add `aria-label` or `aria-labelledby` to icon-only buttons, modal triggers, and disclosure accordions.

### B. Contrast & Readability
- Normal text requires at least **4.5:1** contrast ratio against its background.
- Large text ($\ge 18\text{pt}$ or $\ge 14\text{pt}$ bold) requires at least **3:1** contrast ratio.
- Interactive states must include distinct `:focus-visible` outlines (e.g. `ring-2 ring-primary ring-offset-2 ring-offset-background`).

---

## 3. Layout Systems

### CSS Grid & Flexbox Standard Patterns
```html
<!-- Fluid Responsive Grid with auto-fit -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- Dynamic Cards -->
</div>

<!-- Sticky Header with Blur -->
<header class="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40">
  <div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
    <!-- Navigation Items -->
  </div>
</header>
```

---

## 4. Performance & UX
- **Image Optimization**: Always provide explicit `width`, `height`, and `loading="lazy"` for below-the-fold media.
- **Font Loading**: Use modern `font-display: swap` to prevent FOIT (Flash of Invisible Text).
- **Reduced Motion**: Respect user preferences using `@media (prefers-reduced-motion: reduce)` / `motion-reduce:transition-none`.
