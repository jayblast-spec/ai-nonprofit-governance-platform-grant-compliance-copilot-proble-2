# Reference DNA: AI Nonprofit Governance Platform

## Design Archetype: Retool

Enterprise/internal tooling â€” security-first, permissions and access-control language.

## What is borrowed

The homepage section rhythm and trust-architecture pattern associated with the Retool archetype:

- capability cards
- security trust
- customer proof
- metrics trust

These sections were inserted into `app/page.tsx` between the existing "Selected proof" and "Pricing" sections. The "What it does" section already on the page covers the "feature modules" part of this rhythm.

## What must NOT be copied

- Retool's exact wordmark, logo, or brand name
- Do not copy Retool's drag-and-drop builder UI or enterprise customer names â€” borrow the security-first rhythm.
- Fabricated credibility claims: no fake certifications (SOC 2, ISO 27001), no fake press mentions ("Featured in ..."), no fake customer/user counts ("10,000+ companies"). All trust content must use honest, capability-framed language (capability-framed, no fabricated certifications/press/customer counts).

## How this applies to AI Nonprofit Governance Platform

AI Nonprofit Governance Platform is a `governance_platform` product. Trust signals are framed around what the product actually does (workflows automated, review queues, saved history) rather than unverifiable social proof.

## Page structure

- `/`
- `/about`
- `/app`
- `/contact`
- `/dashboard`
- `/features`
- `/how-it-works`
- `/legal/privacy`
- `/legal/terms`
- `/onboarding`
- `/pricing`
- `/settings`
- `/use-cases`

## Components required

- AssistantWidget
- HeroCanvas

## Quality bar

This build must pass the Forge V2 UI Quality Judge (see `docs/UI_QUALITY_REPORT.md`).
