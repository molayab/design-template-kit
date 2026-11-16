# Changelog

## 0.4.0
Visual and markup change for consumers of the nav (minor bump).
- Add a collapsible nav at <= 860px: `.nav-toggle` (icon-only menu button, 36px with a 44px hit area, `.nav-toggle__icon` morphs to an X on `aria-expanded="true"`) and `.nav-menu` (disclosure panel; `.is-open` shows it). Opt-in: the panel and button only apply when `<html>` has the class `nav-enhanced`, set by a script before first paint.
- Markup contract: `nav > .nav-inner > .logo, .nav-actions (.lang-link + .nav-toggle), .nav-menu (.nav-links + .btn)`. Above 860px `.nav-menu` is `display: contents`, so the desktop nav looks unchanged; the CTA moved out of `.nav-actions` into `.nav-menu`.
- Add `.nav-inner--inline` for bars that never collapse (few links, e.g. legal pages).
- No-JS fallback (<= 600px, without `nav-enhanced`): the second row of links aligns to the frame edges (no inset padding) and the extra `border-top` is gone, leaving one hairline.
- Migration: move the CTA `.btn` from `.nav-actions` into `.nav-menu` after `.nav-links`; add `.nav-toggle` to `.nav-actions` and an `id` on `.nav-menu` referenced by the button's `aria-controls`; set `nav-enhanced` on `<html>` from JS.

## 0.3.0
New opt-in component, backward compatible.
- Add `.theme-switch` / `.theme-switch__option`: a segmented, `aria-pressed` control for choosing between themes (e.g. System / Light / Dark). 28px segments, 44px at <= 600px or on coarse pointers; the active segment gets an accent tint, a stronger outline (text at 50%, >= 3:1) and a heavier icon stroke. Options never shrink (`flex: 0 0 auto`).
- Custom properties: `--theme-switch-size`, `--theme-switch-size-touch`, `--theme-switch-active-border`.
- `.theme-toggle` and `.theme-toggle--floating` are unchanged and remain a single 34px button; do not use `.theme-toggle` for a group (it would inherit the 34px box).

## 0.2.0
Visual change for consumers (minor bump): one shared page frame.
- Add `--gutter` (2rem, 1.5rem at <= 600px), `--page-max` (980px) and `--page-max-wide` (1160px) tokens.
- `.nav-inner`, `.footer-inner`, `.section-inner` and `.legal-inner` now take `max-width: calc(<measure> + 2 * var(--gutter))` and `padding-inline: var(--gutter)`, so max-width includes the gutter and content is exactly the measure. `.section` no longer has horizontal padding (the inner owns it). Net effect: nav and footer content widen from 916px to 1160px, section content stays 980px, all bands share the same gutter, and the 600px mismatch (sections 24px vs nav 32px) is gone.
- Add `.section-inner--wide` (content `--page-max-wide`) for sections that should share the nav/footer frame.
- Includes the floating theme toggle from 0.1.2 (`.theme-toggle--floating`, `--theme-toggle-size|offset|radius`), now released with this version.
- Migration: a `.section-inner` that is not inside `.section` now gets the gutter too; sites that override `.x .section-inner { max-width: 1160px }` should switch to `.section-inner--wide`; custom `.hero`-like bands with their own `padding-inline` should use `var(--gutter)` on their inner.

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
