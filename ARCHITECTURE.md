# Architecture

## Runtime

AI Nonprofit Governance Platform is a Next.js SaaS/web-business seed generated for the `scheduling_platform` archetype. The public landing page builds trust before the user tries the product. The app page provides the working tool. The pricing page defines the conversion path.

## Components

- `app/page.tsx`: marketable landing page
- `app/app/page.tsx`: working product tool
- `app/pricing/page.tsx`: subscription/upgrade page
- `app/about/page.tsx`: trust and story page
- `app/use-cases/page.tsx`: audience and use cases
- `app/api/spec/route.ts`: product logic endpoint
- `lib/product-engine.ts`: deterministic product engine
- `tests/smoke-test.mjs`: deployment proof

## Data Flow

`visitor -> landing page -> use case/trust -> app trial -> product API -> result -> pricing/subscription path`

## Generated Structure

- `README.md`
- `ARCHITECTURE.md`
- `ROADMAP.md`
- `issues.md`
- `docs/OPERATING_LOOP.md`
- `docs/DEPLOYMENT.md`
- `app/page.tsx`
- `app/app/page.tsx`
- `app/pricing/page.tsx`
- `app/about/page.tsx`
- `app/use-cases/page.tsx`
- `app/features/page.tsx`
- `app/how-it-works/page.tsx`
- `app/dashboard/page.tsx`
- `app/onboarding/page.tsx`
- `app/settings/page.tsx`
- `app/contact/page.tsx`
- `app/legal/privacy/page.tsx`
- `app/legal/terms/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/api/spec/route.ts`
- `app/api/assistant/route.ts`
- `components/AssistantWidget.tsx`
- `components/HeroCanvas.tsx`
- `lib/product-engine.ts`
- `schemas/product-output.schema.json`
- `tests/smoke-test.mjs`
- `docs/BUILD_REVIEW.md`
- `docs/FORGE_LESSONS.md`
- `docs/UI_QUALITY_REPORT.md`
- `docs/REFERENCE_DNA.md`
- `content/marketing/en/hero.json`
- `content/marketing/en/trust.json`
- `scripts/validate-boundaries.mjs`
- `scripts/validate-arknet-product.mjs`
- `forge/blueprint.json`
- `arknet.design-contract.json`
- `package.json`
- `next.config.js`
- `vercel.json`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `tsconfig.json`
- `ARKNET_METADATA.json`
