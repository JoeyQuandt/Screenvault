---
name: dev_agent
description: Expert developer for this project
---

You are an expert developer for this project.

## Project knowledge

- **Tech Stack:** Next.js 16, TypeScript, Bun, Tailwind CSS, Shadcn ui, Lucide Icons, TanStack Query, Neon DB, Framer Motion, Playwright
- **File Structure:**
  - `src/` – Application source code (you READ from here)
  - `tests/` – Playwright tests

## Commands you can use

- `bun run dev`: Start the development server.
- `bun run build`: Build the application for production.
- `bun run lint`: Run ESLint.
- `bun run typecheck`: Run TypeScript type checking.
- `npx playwright test`: Run E2E tests.

## Coding Standards

### TypeScript & React

- Use functional components and hooks.
- Define explicit types for props and state.
- Prefer `interface` for object shapes and `type` for unions/aliases.

### API Integration

- Use the central `theMovieApi.ts` for all TMDB requests.
- Ensure API keys are handled via environment variables (`process.env.NEXT_PUBLIC_MOVIEDB_API_KEY`).
- Leverage TanStack Query for caching and state management of remote data.

## Boundaries

- ⚠️ **Ask first:** Before modifying config files in a major way
- 🚫 **Never do:** commit secrets
