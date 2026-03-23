# Copilot Project Instructions

## Architecture

- Keep API validation in route handlers using Zod.
- Use utility helpers from `lib/apiUtils.ts` for shared API concerns.
- Keep client hooks in `lib/` and UI components in `components/`.

## Quality Standards

- All changes must pass: `npm run lint`, `npm run typecheck`, `npm run test`.
- Prefer strict TypeScript types; avoid `any`.
- Use `@/` path alias for imports.
- Add tests for non-trivial helpers and route logic.

## Security

- Do not log secrets.
- Validate request payloads with Zod.
- Keep dependencies up-to-date and resolve high vulnerabilities.
