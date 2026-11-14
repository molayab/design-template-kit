# design-template-kit

Brand-neutral, themeable CSS for static sites: design tokens, base styles and a few
components. Plain CSS (no preprocessor, no framework, no runtime). A project sets **colors,
fonts and shape** by overriding CSS variables in its own theme file — the kit never contains
brand values.

Used by [grove-website](https://github.com/molayab/grove-website). Other sites can adopt it
the same way.

## What's inside

| Entry (`dist/`) | Contains | Use when |
|---|---|---|
| `tokens.css` | the token API only | you just want the variables |
| `foundation.css` | tokens + reset, base, typography, buttons (`.btn*`), layout (`.section`, `.section-inner`) | smallest useful layer |
| `core.css` | foundation + nav, footer, prose pages, cookie banner, lightbox, theme toggle | you use the documented markup below |

`src/` has the same partials unbundled (`src/index.css` is the entry). `dist/` is generated
by `npm run build` and committed so the package can be installed straight from GitHub.

## Use it

**Astro / any bundler**
```sh
npm install https://github.com/molayab/design-template-kit/archive/refs/tags/v0.1.0.tar.gz
```
```css
/* styles/index.css */
@import 'design-template-kit/core.css';
@import './theme.css';          /* your overrides — must come after the kit */
```
Upgrading = change the tag in `package.json` and re-install. Pin tags; never track `main`.

**Static HTML / Jekyll** (no bundler): copy or serve `dist/core.css` from this repo's tag
(e.g. via jsDelivr `…/gh/molayab/design-template-kit@v0.1.0/dist/core.css`) and add your theme
`<link>` after it.

## Theme API

Copy [`themes/example.css`](themes/example.css) and override on `:root`:

| Group | Variables |
|---|---|
| Fonts | `--font`, `--mono` |
| Shape | `--radius`, `--radius-sm`, `--radius-pill` |
| Brand | `--brand` (fills), `--brand-hover`, `--brand-contrast` (text on a fill), `--brand-on-dark` / `--brand-on-light` (brand as small **text**; keep ≥ 4.5:1 on that surface) |
| Dark palette | `--dark-bg`, `--dark-section`, `--dark-raised`, `--dark-text` |
| Light palette | `--light-bg`, `--light-section`, `--light-raised`, `--light-text`, `--light-border` |

Components read only the **semantic** tokens, which `tokens.css` derives from those
primitives for both themes: `--bg`, `--bg-section`, `--bg-raised`, `--text`, `--text-2`,
`--text-3`, `--border`, `--border-strong`, `--accent`, `--accent-hover`, `--accent-contrast`,
`--accent-text`, `--accent-dim`, `--accent-glow`, `--glow-alpha`, `--check`, `--shadow-md`,
`--shadow-frame`, `--media-bg`, `--overlay-bg`, `--overlay-fg`. Accent tints are `color-mix()`
of `--accent`, so a new brand color needs no other edits.

**Theme switching.** `data-theme="dark|light"` on `<html>` wins; without it the OS preference
(`prefers-color-scheme`) decides, dark by default. Set the attribute early to avoid a flash:
```html
<script>
  (function () {
    var root = document.documentElement, mq = matchMedia('(prefers-color-scheme: dark)');
    var saved = localStorage.getItem('theme');
    root.setAttribute('data-theme', (saved || (mq.matches ? 'dark' : 'light')));
    if (!saved) mq.addEventListener('change', function (e) { root.setAttribute('data-theme', e.matches ? 'dark' : 'light'); });
  })();
</script>
```

## Conventions

- No brand colors in the kit — only tokens and `color-mix()` of tokens (black drop-shadows are
  the one literal). Use `--accent-text`, not `--accent`, for text; keep `--text-3` ≥ 4.5:1.
- The kit does not depend on any CSS framework. If your project also loads one (e.g. Pico),
  keep the glue in your project, after the theme.
- New component → new partial in `src/`, imported by `src/index.css` (or `foundation.css` if
  it is part of the minimal layer); then `npm run build` and commit `dist/`.
- Component classes follow the markup of grove-website's `Nav`, `Footer`, `CookieBanner`,
  `Lightbox` and prose pages (`.legal`, `.legal-inner`, `.legal-prose`, `.guide`). Adopting
  them in another site means matching that markup.

## Versioning and releases

Semver. A renamed/removed token or class is a **major** change; a new token/component is
minor; a fix is patch. To release:

1. Edit `src/`, bump `version` in `package.json`, add a `CHANGELOG.md` entry.
2. `npm run build` and commit `dist/` with the source (CI fails if `dist/` is stale).
3. Tag `vX.Y.Z` and push the tag; create a GitHub release.
4. Consumers bump the tag in their `package.json`.
