# Help-Study-Abroad

This repository contains a scaffolded Next.js 13+ project using the App Router and TypeScript.

## What I set up ✅

- Next.js App Router + TypeScript project structure
- Material UI (MUI) installed and a basic `ThemeProvider` wired into `app/layout.tsx`
- `zustand` store placeholder in `store/`
- `axios` instance in `services/`
- `next-auth` installed (no configuration yet)

## Key files and where they belong 🔧

- `app/layout.tsx` — Root layout (Server component) that includes the MUI `ThemeProvider` wrapper.
- `app/providers/ThemeProvider.tsx` — Client component that configures MUI's `ThemeProvider` and `CssBaseline`.
- `app/login/page.tsx` — Placeholder login page.
- `app/dashboard/page.tsx` — Placeholder dashboard page.
- `store/` — Zustand stores and state management utilities (e.g. `store/index.ts`).
- `services/` — API utilities (e.g. `services/api.ts` with an Axios instance).

## Next steps (not implemented yet)

- Configure `next-auth` providers and callbacks
- Add API routes and database integration
- Implement actual UIs for Login and Dashboard

---

## End-to-end (E2E) tests with Playwright ⚙️

I added Playwright test scaffolding to verify authentication flows. Tests are at `tests/e2e/login.spec.ts` and the Playwright config is at `playwright.config.ts`.

How to run locally:

1. Make sure the app is running on port 3000 (`npm run dev`) or just run the test script and Playwright will start the dev server: `npm run test:e2e`.

2. Provide credentials via environment variables (or rely on defaults for DummyJSON example):
   - `E2E_USER` (default: `kminchelle`)
   - `E2E_PASS` (default: `0lelplR`)

3. If your login UI uses different selectors, set these environment variables to the appropriate CSS selectors:
   - `E2E_USERNAME_SELECTOR`
   - `E2E_PASSWORD_SELECTOR`
   - `E2E_SUBMIT_SELECTOR`

Notes:
- The test suite expects a login route at `/login` and a dashboard route at `/dashboard` after successful login. If your routes differ, update `tests/e2e/login.spec.ts`.
- I also added a simple debug endpoint at `/debug/session` that returns cookies and server session information (if `next-auth` is configured).
