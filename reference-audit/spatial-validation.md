# Spatial prototype validation

> Historical note: the header coordinates below describe the earlier fixed-canvas prototype. They were superseded by the viewport-based global header correction in `global-header-correction.md`. Project composition measurements remain preserved here.

## Reference viewport: 1346×917

The corrected homepage uses a fixed 1062px centered canvas. At 1346px, its left edge is 142px. Adding the CSS-relative coordinates reproduces every supplied desktop x-coordinate:

| Element | Canvas-relative x | Computed viewport x | Supplied x | y |
|---|---:|---:|---:|---:|
| Naitik Sharma | 428 | 570 | 570 | 0 |
| Contact | 141 | 283 | 283 | 26 |
| Bio | 784 | 926 | 926 | 26 |
| Group A small image | 136 | 278 | 278 | 66 |
| Group A drawing | 258 | 400 | 400 | 72 |
| Group A main image | 497 | 639 | 639 | 65 |
| Group A metadata | 870 | 1012 | 1012 | 67 |
| Group B metadata | 0 | 142 | 142 | 359 |
| Group B main image | 100 | 242 | 242 | 357 |
| Group B secondary image | 548 | 690 | 690 | 362 |
| Group C left image | 247 | 389 | 389 | 658 |
| Group C right image | 565 | 707 | 707 | 648 |
| Group C metadata | 873 | 1015 | 1015 | 649 |

## Centered-canvas positions at comparison widths

| Element | 1440px viewport | 1280px viewport |
|---|---:|---:|
| Canvas left edge | 189 | 109 |
| Naitik Sharma | 617 | 537 |
| Contact | 330 | 250 |
| Bio | 973 | 893 |
| Group A small / drawing / main / metadata | 325 / 447 / 686 / 1059 | 245 / 367 / 606 / 979 |
| Group B metadata / main / secondary | 189 / 289 / 737 | 109 / 209 / 657 |
| Group C left / right / metadata | 436 / 754 / 1062 | 356 / 674 / 982 |

The y-coordinates and explicitly measured image widths remain fixed at these desktop comparison widths.

## Static integrity

- Six independent HTML files resolve all local `href` and `src` paths.
- Thirteen copied project images are deployable entirely inside `static-portfolio/`.
- Active HTML/CSS/JavaScript contains no React, Next.js, JSX, TypeScript, framework, SPA-routing, or repeated-card-grid implementation.
- JavaScript only provides optional media drag/context-menu deterrence; it does not generate content, control layout, or implement routing.

## Unavailable visual check

The required live reference/local screenshot pair could not be captured because the prescribed browser runtime had no available backend. The coordinate contract is exact, but a true image-mass/typography screenshot comparison remains pending browser availability.
