# Portfolio V1 archive

Archived on 1 September 2026 before the Maria Yablonina reference rebuild.

- Safety commit: `4058e4acdebc19851fc3a6ca42c74e3e0330cf4e`
- Archive branch: `archive/portfolio-before-yablonina-rebuild`
- Active branch at archive time: `main`

## What is preserved

This folder is a frozen, human-readable copy of the Portfolio V1 implementation: the complete `app/`, `components/`, `content/`, and `worker/` directories together with the package manifests, build configuration, deployment documentation, environment example, and project-authoring documentation.

Portfolio V1 used a more expressive presentation system with a hero, category/filter UI, project cards and grids, custom cursor, chapter navigation, galleries, richer project navigation, and resume/teaching components. Portfolio V2 intentionally does not import or combine those visual components.

## Shared public media

Large public binaries were not duplicated. They remain in the repository's main `public/` directory at their original paths and are fully preserved by the safety commit and archive branch. See `PUBLIC-MEDIA-MANIFEST.md` in this folder for the archive-time inventory.

## Recovery

The exact V1 tree can be recovered from the archive branch or safety commit. This directory is documentation and a convenient source snapshot; it is not imported by Portfolio V2 and must not be modified by the V2 implementation.

