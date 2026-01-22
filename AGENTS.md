# Project Guidelines

## Stack
- Framework: Astro
- Styling: Tailwind CSS (use `astro add tailwind` for setup)
- UI: Radix components as needed
- Motion: GSAP for animations as needed

## Astro-first rules
- Prefer `.astro` components for UI and structure.
- Keep CSS and JS inside the `.astro` component unless it must be shared globally.
- Use islands (`client:*`) only when interactivity is required.

## Dependencies
- Use `astro add` for official Astro integrations.
- Add other packages via the package manager CLI (do not edit `package.json` manually).

## Code style
- Keep components small and focused.
- Prefer scoped styles and locally-imported scripts.
- Avoid global CSS/JS unless explicitly required.
