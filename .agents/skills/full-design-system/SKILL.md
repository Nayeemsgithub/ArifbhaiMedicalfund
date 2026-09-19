---
name: full-design-system
description: >-
  Complete design system architecture, design tokens (colors, typography, spacing, radius, elevations),
  component primitives (buttons, inputs, cards, dialogs, badges, tables, charts), and CVA / Tailwind conventions.
  Use this skill when defining tokens, building modular component libraries, or standardizing UI patterns.
---

# Full Design System Skill

This skill defines a complete, tokenized design system architecture ready for modern React, Vue, Svelte, or HTML/Tailwind projects (fully compatible with shadcn/ui, Radix, and Tailwind CSS v3/v4).

---

## 1. Design Tokens (CSS Variables & Tailwind)

### Semantic Color Variables
```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;

  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;

  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;

  --primary: 199 89% 48%; /* Clean Medical Azure */
  --primary-foreground: 222.2 47.4% 11.2%;

  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;

  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;

  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;

  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 199 89% 48%;

  --radius: 0.75rem; /* 12px for modern rounded cards/inputs */
}
```

---

## 2. Component Primitive Patterns

### A. Buttons (Class Variance Authority - CVA)
- **Primary**: `bg-primary text-primary-foreground shadow hover:bg-primary/90 active:scale-[0.98]`
- **Secondary**: `bg-secondary text-secondary-foreground hover:bg-secondary/80`
- **Outline**: `border border-border bg-transparent hover:bg-accent hover:text-accent-foreground`
- **Ghost**: `hover:bg-accent hover:text-accent-foreground`
- **Glass / Glow**: `relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-lg hover:bg-white/10 hover:border-primary/50 transition-all`

### B. Interactive Cards & Containers
- Standard Card Structure:
```tsx
<div className="group relative rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
  <div className="flex items-center justify-between pb-4">
    <span className="text-sm font-medium text-muted-foreground">{category}</span>
    <Badge variant="outline">{status}</Badge>
  </div>
  <h3 className="text-xl font-bold tracking-tight text-foreground">{title}</h3>
  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
</div>
```

### C. Status Badges & Indicators
- **Active / Success**: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20`
- **Warning / Pending**: `bg-amber-500/10 text-amber-400 border border-amber-500/20`
- **Clinical / Critical**: `bg-rose-500/10 text-rose-400 border border-rose-500/20`
- **AI / Smart Indicator**: `bg-sky-500/10 text-sky-400 border border-sky-500/20 animate-pulse`

---

## 3. Elevation & Radius Hierarchy

- **Small elements** (tags, micro buttons, pills): `rounded-md` (6px) or `rounded-full`
- **Medium elements** (inputs, buttons, dropdown items): `rounded-lg` (8px-10px)
- **Large containers** (cards, dialogs, modals): `rounded-2xl` (16px) or `rounded-3xl` (24px)
- **Elevations**:
  - `shadow-sm` for discrete buttons
  - `shadow-md` for inputs / popovers
  - `shadow-xl shadow-primary/5` for prominent hero cards
