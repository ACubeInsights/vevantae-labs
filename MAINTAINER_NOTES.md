# Maintainer Notes

## Summary

- Replaced ad-hoc hex colors with Tailwind theme tokens across app pages and shared components to ensure consistent branding and easier theming.
- Centralised additional design tokens (`accent-soft`, `accent-strong`, `success`, `neutral-strong`) in `src/styles/globals.css` and wired them through `tailwind.config.ts` so utility classes can reference them.
- Modernised utility components (`WhatsAppButton`, `BlogCard`, footer form, etc.) with improved accessibility, focus management, and `next/image` usage.
- Added a minimal Vitest + Testing Library setup (`vitest.config.ts`, `vitest.setup.ts`) and created targeted unit tests for `BlogCard` and `WhatsAppButton` to guard recent fixes.

## Validation

Run the full validation pipeline from the repo root:

```
npm install
npm run lint
npm run format:check
npx tsc --noEmit
npm run build
npm test
```

Dev server for manual QA:

```
npm run dev
```

## Notes

- Vitest uses `@vitejs/plugin-react` and mocks `next/link`/`next/image` in `vitest.setup.ts`. Extend the setup file when adding tests that rely on other Next-specific modules.
- New Tailwind color keys (`accent.soft`, `accent.soft-alt`, `accent.strong`, `success.*`, `neutral.strong`) are available as utility classes (e.g., `bg-accent-soft`, `text-success`, `border-neutral-strong`). Prefer these over raw hex values.
- `WhatsAppButton` now opens chat windows via `window.open`; keep unit tests updated if the pre-filled message ever changes.
