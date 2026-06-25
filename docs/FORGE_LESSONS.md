# Forge Lessons

Reusable rules for future builds.

- DESIGN.md is the design system bible. Parse it before selecting colors, layout rhythm, type scale, component styling, motion, or page architecture.
- strategy.md is the product/copy bible. Hero, CTA, sections, dashboard states, and pricing must derive from strategy.md instead of generic SaaS copy.
- Stitch prompts must use Zoom-Out -> Zoom-In, one-change iteration, realistic data, accessibility, and critique loops.
- Always include /dashboard, /onboarding, /settings, /legal/privacy, /legal/terms, /features, /how-it-works, /contact in addition to /, /app, /pricing, /about, /use-cases.
- Nav theme (renderNav) and page body must use the same design_style spec â€” never mix a light nav with a dark body or vice versa.
- The AI assistant widget should match the active design_style and degrade gracefully (return a friendly message) when GROQ_API_KEY is missing.
- Product name must be derived cleanly from the idea/repo name â€” avoid garbled multi-word titles with stray words like "Problem" or trailing letters.
- For governance_platform: use precise compliance/policy terminology in hero copy, not generic dashboard language.
