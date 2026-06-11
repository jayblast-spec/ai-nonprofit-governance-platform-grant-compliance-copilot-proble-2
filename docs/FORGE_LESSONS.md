# Forge Lessons

Reusable rules for future builds.

- Always include /dashboard, /onboarding, /settings, /legal/privacy, /legal/terms, /features, /how-it-works, /contact in addition to /, /app, /pricing, /about, /use-cases.
- Nav theme (renderNav) and page body must use the same design_style spec — never mix a light nav with a dark body or vice versa.
- The AI assistant widget should match the active design_style and degrade gracefully (return a friendly message) when GROQ_API_KEY is missing.
- Product name must be derived cleanly from the idea/repo name — avoid garbled multi-word titles with stray words like "Problem" or trailing letters.
- For scheduling_platform: highlight calendar/availability flows and reduce friction copy.
