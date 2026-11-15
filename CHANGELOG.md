# Changelog

## 0.1.2
- Add opt-in `.theme-toggle--floating` modifier (fixed top-right) with `--theme-toggle-size`, `--theme-toggle-offset` and `--theme-toggle-radius`. The base `.theme-toggle` reads its size from `--theme-toggle-size` (default 34px, so unchanged). Backward-compatible.

## 0.1.1 — 2026-11-14
- Add MIT license (`LICENSE`, `license` field in package.json). No CSS changes.

## 0.1.0 — 2026-11-14
First release, extracted from grove-website's `src/styles/core/`.
- Token API (`--brand*`, fonts, radii, dark/light palettes) with derived semantic tokens
- Foundation: reset, base, typography, buttons, layout
- Components: nav, footer, prose pages, cookie banner, lightbox, theme toggle
- Single-file builds in `dist/` (`core.css`, `foundation.css`, `tokens.css`)
