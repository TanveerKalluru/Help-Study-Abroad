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
