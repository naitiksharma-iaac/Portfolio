# Maria Yablonina reference audit

Reference: <https://www.mariayablonina.com/>  
Audit date: 1 September 2026

## Measurement status

The prescribed in-app browser runtime reported that no browser backends were available, including after the documented discovery and retry procedure. Therefore `window.getComputedStyle()`, `getBoundingClientRect()`, viewport screenshots, hover inspection, and image-click inspection could not be performed. No Maria Yablonina media or source code was downloaded.

The implementation uses the brief's locked fallback exactly for every value the fallback defines. Spacing not defined by the fallback is based on the fallback line boxes and restrained normal document flow; those values are recorded in the JSON specification and are not represented as live measurements.

## Locked fallback system

- Font: Arial, Helvetica, sans-serif
- Background: `#ffffff`
- Text and secondary text: `#111111`
- Body: 14px / 1.45
- Site name: 18px / 400
- Navigation: 14px / 400
- Homepage title: 15px / 400
- Homepage metadata: 13px / 400
- Project title: 18px / 400
- Project metadata: 13px / 400
- Project body: 14px / 1.5
- Desktop page padding: 36px 48px 72px
- Mobile page padding: 24px 20px 48px
- Paragraph maximum width: 620px
- Media maximum width: 960px
- Letter spacing: normal
- Text transform: none
- Radius: 0
- Shadow: none
- Animation: none

## Responsive behavior

The desktop fallback padding is used above 600px; the mobile fallback padding is used at and below 600px. The hierarchy, navigation, project order, typography relationships, and native vertical scrolling remain unchanged. Media preserves intrinsic aspect ratio and scales down only when required by the viewport.

## Interaction decisions

Because live image-click behavior could not be verified, V2 does not introduce a lightbox. Links use a simple underline on hover and keyboard focus. Project media disables standard dragging and its image context menu without disabling text selection or keyboard navigation.

## Required viewport matrix

The local implementation is checked at 1440×900, 1280×800, 1024×768, 768×1024, 390×844, and 360×800. Reference-side geometry comparison remains unavailable until a browser backend can render the live reference.

