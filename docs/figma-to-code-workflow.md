# Figma to Code Workflow

This project is prepared for component-first UI delivery with Storybook and Tailwind.

## Recommended flow

1. Define reusable tokens in Figma (spacing, color, typography).
2. Build/adjust components in `components/`.
3. Add or update component stories in `components/*.stories.tsx`.
4. Validate accessibility in Storybook (A11y addon).
5. Integrate into app pages under `app/`.

## Guidelines

- Prefer Tailwind utility classes over ad-hoc CSS.
- Keep variants in component props (`variant`, `size`, etc.).
- Add visual states in stories (default, hover, disabled, error).
- Ensure mobile-first responsiveness.
