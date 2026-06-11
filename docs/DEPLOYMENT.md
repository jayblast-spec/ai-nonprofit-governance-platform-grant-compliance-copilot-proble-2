# Deployment

## Required Outcome

AI Nonprofit Governance Platform must be deployed to Vercel and verified through a public URL.

## Environment Variables

- `GROQ_API_KEY` (optional) - enables real responses from the AI assistant widget at `/api/assistant`. Without it, the assistant degrades gracefully to a static fallback message.

## Checklist

1. Connect this repository to Vercel.
2. Deploy the `main` branch.
3. Set `GROQ_API_KEY` in the Vercel project environment variables (Production and Preview) if AI assistant responses are wanted.
4. Open the production URL.
5. Verify `/`, `/app`, `/pricing`, `/about`, `/use-cases`, `/features`, `/how-it-works`, `/dashboard`, `/onboarding`, `/settings`, `/contact`, `/legal/privacy`, and `/legal/terms`.
6. Confirm the AI assistant widget appears on the homepage and `/api/assistant` responds.
7. Run the product API smoke test.
8. Store the live URL and verification result in project memory.
