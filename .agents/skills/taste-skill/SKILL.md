---
name: taste-skill
description: >-
  Expert guidelines for high-taste, modern, polished, and trendy UI/UX design.
  Use this skill whenever designing or modifying UI components, layouts, visual hierarchy,
  typography, color palettes, animations, and micro-interactions to achieve world-class aesthetics.
---

# High-Taste Modern UI Design Skill

This skill enforces elite visual aesthetics, micro-interactions, layout balance, and typography to ensure apps feel premium, modern, intuitive, and trend-setting (Apple, Linear, Vercel, Stripe, Raycast tier).

---

## 1. Core Principles of High Taste

### A. Avoid "Generic AI" Clichés
- ❌ **Avoid**: Harsh saturated neon gradients on pure black (`#000000`) with no depth.
- ❌ **Avoid**: Generic bloated cards with oversized drop shadows (`box-shadow: 0 20px 50px rgba(0,0,0,0.5)`).
- ❌ **Avoid**: Unstyled default browser borders, generic blue buttons, centered walls of unstructured text.
- ❌ **Avoid**: Overly busy particle canvases that distract from core content.
- ✅ **Embrace**: Refined zinc/slate tonal scales, subtle 1px border glows (`border-white/10` with subtle inner highlights), micro-textures, purposeful whitespace, and precise typographic hierarchy.

### B. Visual Depth & Glassmorphism
- **Layering**: Layer backgrounds using subtle elevation shifts:
  - Base: `bg-slate-950` / `bg-zinc-950` or crisp light `bg-slate-50`
  - Surface Card: `bg-slate-900/60 backdrop-blur-xl border border-white/[0.08]`
  - Elevated Popover/Dropdown: `bg-slate-900/90 backdrop-blur-2xl border border-white/[0.12] shadow-2xl`
- **Subtle Radial Glows**: Soft, low-opacity ambient gradients (`bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]`) to anchor focus areas without overpowering content.

### C. Motion & Micro-Interactions
- **Curves**: Always use refined easing curves (e.g. `cubic-bezier(0.16, 1, 0.3, 1)` - spring-like deceleration) rather than linear or abrupt transitions.
- **Micro-interactions**:
  - Hover states should slightly scale (`scale-[1.02]`), brighten borders (`border-primary/40`), or activate soft glow effects.
  - Active/click states should provide tactile compression (`active:scale-[0.98]`).
  - Skeleton screens and smooth staggered fade-in animations for async data.

---

## 2. Typography & Spatial Rhythm

### A. Font Pairing & Hierarchy
- **Primary / UI Font**: Clean, modern grotesk or geometric sans (e.g., *Inter*, *Geist Sans*, *Plus Jakarta Sans*, *Cabinet Grotesk*).
- **Accents / Medical / Numbers**: Clean tabular figures (`font-mono font-medium tracking-tight`) for metrics, vitals, timestamps, and stats.
- **Weights & Tracking**:
  - Hero Titles: `font-bold tracking-tight text-4xl sm:text-6xl text-balance`
  - Subheaders: `font-medium text-muted-foreground tracking-normal text-lg`
  - Badges & Eyebrows: `uppercase tracking-widest text-xs font-semibold`

### B. Spacing Rhythm (8pt Grid System)
- Rely strictly on consistent 4px / 8px / 16px / 24px / 32px / 48px / 64px spacing increments.
- Generous padding inside cards (`p-6` to `p-8`) with tight gap between related title/subtitle (`gap-1.5` to `gap-2`).

---

## 3. Color Palette Architecture (Medical & Modern SaaS)

- **Primary**: Deep Teal / Electric Azure (`#0EA5E9` / `#0D9488` / `#2563EB`) - instills trust, cleanliness, and clinical precision.
- **Secondary / Accent**: Soft Emerald (`#10B981`) for positive statuses, Amethyst / Indigo (`#6366F1`) for smart AI features.
- **Neutrals**:
  - Dark Mode: `slate-950` (background), `slate-900` (surface), `slate-800` (border), `slate-100` (text-primary), `slate-400` (text-muted).
  - Light Mode: `slate-50` (background), `white` (surface), `slate-200` (border), `slate-900` (text-primary), `slate-500` (text-muted).

---

## 4. Quality Checklist Before Finalizing Any UI

1. **Hierarchy**: Is there a clear focal point when scanning within 3 seconds?
2. **Contrast**: Do text and UI controls comfortably pass WCAG AAA/AA readability?
3. **States**: Are all interactive elements styled for `hover`, `active`, `focus-visible`, and `disabled`?
4. **Responsive**: Does it degrade gracefully to mobile screens without awkward horizontal scrolling?
5. **Aesthetic Delight**: Does the layout have a signature "wow" detail (e.g., interactive badge, smooth glass card, subtle chart glow)?
