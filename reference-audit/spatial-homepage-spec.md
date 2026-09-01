# Spatial homepage correction specification

The corrected homepage is governed by the user-supplied Maria Yablonina screenshot at approximately 1346×917, not by the earlier vertical-list fallback.

## Browser status

The prescribed browser runtime again reported zero available browser backends after the documented connection and retry procedure. Live computed styles, reference screenshots, and side-by-side browser comparison remain unavailable. The supplied screenshot coordinates are therefore the visual authority for this prototype.

## Canvas derivation

The screenshot's leftmost second-project metadata begins at x=142. Centering a 1062px canvas in a 1346px viewport produces exactly that left edge:

`(1346 - 1062) / 2 = 142`

All screenshot coordinates are converted to canvas-relative positions by subtracting 142px. This reproduces the asymmetric header and the first three composition groups without normalising them into cards or columns.

## Typography

Typography is screenshot-calibrated rather than claimed as computed measurement: Arial/Helvetica fallback, 13px site name, 11px navigation and project body, 10px project titles, 9.5px metadata, regular weight, normal letter spacing, and soft `#3f3f3f` text.

## Prototype scope

The corrected proof homepage uses four existing projects with actual media: Configurable Topologies, The Dunes, Rhizome, and Charge Pavilion. Charge Pavilion is the only migrated project-detail page in this proof stage, as required by the correction brief.
