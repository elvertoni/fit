# Repository Guidelines

## Project Structure & Module Organization
- `index.html`, `index.tsx`, and `App.tsx` are the Vite + React entry points.
- UI lives in `components/` (feature-focused React components like `Dashboard.tsx` and `WeightChart.tsx`).
- Data and external integrations live in `services/` (`supabaseClient.ts`, `geminiService.ts`, `dataService.ts`).
- Shared types are in `types.ts`.
- Build tooling is in `vite.config.ts`, with TypeScript settings in `tsconfig.json`.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run dev` starts the Vite dev server.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` serves the production build locally.

## Coding Style & Naming Conventions
- Language: TypeScript + React (TSX).
- Prefer PascalCase for components (`AIAnalysis.tsx`) and camelCase for functions/variables.
- Use path aliases like `@/components/WeightChart` (see `tsconfig.json` paths).
- No formatter/linter is configured; keep formatting consistent with existing files.

## Testing Guidelines
- No test runner is configured in `package.json` and no `tests/` directory exists.
- If adding tests, place them near the source (e.g., `components/WeightChart.test.tsx`) and document the command you add (for example, `npm run test`).

## Commit & Pull Request Guidelines
- This directory does not include a `.git` history, so no commit convention can be inferred.
- Suggested practice: keep commits focused and descriptive (e.g., `Add Supabase auth flow`).
- PRs should include a short description, key screenshots for UI changes, and a note about configuration or env changes.

## Security & Configuration Tips
- Set `GEMINI_API_KEY` in `.env.local` before running locally (see `README.md`).
- Keep secrets out of source control; use `.env.local` for local-only values.
- Supabase configuration lives in `services/supabaseClient.ts`; verify environment variables before deploying.
