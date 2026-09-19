---
name: 21st-dev-mcp
description: >-
  Integration and workflow guide for 21st.dev (Magic UI / modern Tailwind UI component registry).
  Use this skill to fetch, inspect, generate, and adapt state-of-the-art UI components,
  animations, bento grids, dock menus, animated tabs, and interactive widgets.
---

# 21st.dev MCP & Component Integration Skill

21st.dev is the open-source registry for top-tier modern React/Tailwind/Framer Motion UI components (Bento Grids, Interactive Cards, Animated Beams, Marquees, Glowing Borders, Shimmer Buttons, etc.).

---

## 1. MCP Configuration

The MCP server connects to 21st.dev to search and generate component code directly.

### Configuration (`mcp_config.json`):
```json
{
  "mcpServers": {
    "21st": {
      "url": "https://21st.dev/api/mcp",
      "headers": {
        "x-api-key": "YOUR_21ST_API_KEY"
      }
    }
  }
}
```

### Automated CLI Setup:
```bash
npx @21st-dev/cli@latest init
```

---

## 2. Key 21st.dev Component Paradigms to Utilize

1. **Bento Grids**: Multi-column dynamic grid layout showcasing features, metrics, and interactive previews.
2. **Animated Glowing Borders**: Subtly moving gradient borders using CSS conic-gradients or Tailwind keyframes.
3. **Interactive Hero Sections**: High-impact headlines with badge pills, radial light beams, and interactive previews.
4. **Dock & Floating Bars**: Smooth floating toolbars for navigation and quick actions with spring scale physics.
5. **Shimmer / Ripple Buttons**: Buttons with smooth animated light sweeps across the surface on idle or hover.
6. **Live Data Sparklines & Vitals**: Minimalist inline SVG charts for real-time analytics, pulse rates, or metrics.

---

## 3. Workflow for Adding 21st.dev Components

1. Identify the UI need (e.g. Hero Section, Feature Bento Grid, Testimonial Carousel, Medical Metric Card).
2. Check or pull the component pattern using 21st.dev styling conventions (Tailwind CSS + `clsx` + `tailwind-merge` + `lucide-react` + `framer-motion`).
3. Adapt the component to use the project's semantic theme tokens (`bg-card`, `text-primary`, `border-border`).
4. Ensure full responsiveness across all screen sizes.
