# Workspace UI & Design System Guidelines

This workspace is configured with elite design standards and modern UI engineering skills. Whenever designing, building, or modifying user interfaces:

## 1. Active Skills & Integrations
- **Taste Skill** (`.agents/skills/taste-skill/`): Enforces high-taste visual aesthetics, micro-interactions, typography, avoiding generic AI look.
- **Web Design Guidelines Skill** (`.agents/skills/web-design-guidelines/`): Ensures responsive mobile-first ergonomics, WCAG 2.1 AA accessibility, fluid layouts.
- **Full Design System Skill** (`.agents/skills/full-design-system/`): Standardizes design tokens (colors, radius, shadows, spacing) and CVA component patterns.
- **21st.dev MCP Integration** (`.agents/skills/21st-dev-mcp/` & `mcp_config.json`): Delivers top-tier modern components (Bento grids, shimmer effects, glowing borders, animated widgets).
- **Playwright CLI Skill** (`.agents/skills/playwright-cli/`): Visual regression and automated multi-viewport testing.

---

## 2. Design Standards for this Project (Medical Portfolio / Healthcare Suite)
- **Visual Aesthetic**: Futuristic yet trustworthy medical tech (Clinical Azure `#0EA5E9`, Teal `#0D9488`, Emerald `#10B981` accents, Deep Slate `#020617` dark mode, Crisp White light mode).
- **Surfaces**: Glassmorphism with subtle 1px border glows (`border-white/10` or `border-slate-200/80`), soft background ambient radial glows, and high-contrast typography.
- **Component Styling**: Clean rounded corners (`rounded-2xl`), tactile micro-animations (`hover:scale-[1.01]`, `active:scale-[0.98]`), and tabular figures for clinical metrics and stats.
- **Micro-Interactions**: Smooth spring easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`), staggered fade-in animations, and skeleton loading states.
