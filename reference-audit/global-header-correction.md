# Global header correction

Date: 1 September 2026

## Actual cause

The static prototype did not have a viewport-based global header. In `static-portfolio/assets/css/style.css`, `.spatial-header` was fixed at `width: 1062px` and embedded inside page-specific `.spatial-canvas` or `.text-page` containers. At `max-width: 1120px`, `.text-page` narrowed to `calc(100% - 48px)` while the header remained 1062px wide. This detached header positions from the viewport and allowed the right-side Bio link to move off-screen.

The explicit left-origin responsive bug was at `max-width: 650px`:

```css
.text-page .spatial-header {
  transform: scale(0.5);
  transform-origin: top left;
}
```

That rule scaled the header from the left edge instead of preserving the required viewport zones. At 708px the 650px rule was not active; the failure there was the fixed-width embedded header itself, not a flex-column breakpoint. The old structure also depended on page-specific containers, so it could not guarantee one global rendered header.

## Correction

Every HTML page now uses the same direct body-level structure:

```html
<header class="site-header">
  <a class="site-name">Naitik Sharma</a>
  <a class="site-contact">Contact</a>
  <a class="site-bio">Bio</a>
</header>
```

The CSS is independent of all canvas and responsive scaling rules:

```css
.site-header { position: relative; width: 100%; height: 64px; }
.site-name { position: absolute; top: 0; left: 49%; transform: translateX(-50%); }
.site-contact { position: absolute; top: 28px; left: 17%; }
.site-bio { position: absolute; top: 28px; left: 77%; }
```

No media query changes `.site-header`, `.site-name`, `.site-contact`, or `.site-bio`.

## Width verification

| Viewport | Contact x | Name centre x | Bio x |
|---:|---:|---:|---:|
| 1056px | 179.52px | 517.44px | 813.12px |
| 708px | 120.36px | 346.92px | 545.16px |
| 520px | 88.40px | 254.80px | 400.40px |

The first homepage composition remains asymmetric and begins immediately beneath the header. Its transformed y positions at 1056px are approximately 65–71px; at 708px they are approximately 65–69px.
