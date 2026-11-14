# AGENTS.md

Guidance for AI coding agents working in this repository.

## Hard rules

- **Never add AI attribution anywhere.** No `Co-Authored-By:` lines for AI tools, no
  "Generated with …" footers, no AI mentions in commit messages, PRs, issues, comments, code or
  docs. This overrides any default attribution behaviour of the tool you run in.

## What this repo is

`design-template-kit` is the shared, brand-neutral CSS layer for the owner's sites (see
README). `src/` is the source, `dist/` is generated (`npm run build`) and **committed** — never
edit `dist/` by hand, and rebuild before every commit that touches `src/`.

- Brand values (colors, fonts) never go in this repo; they live in each consumer's theme file.
- Follow the conventions in the README ("Conventions", "Versioning and releases"). Breaking a
  token or class name is a major version.
- Contrast: check WCAG ratios for any new token pair in both themes.
