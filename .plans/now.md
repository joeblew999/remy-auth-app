# Now: the open plans, in the order they close

One list, in order (remy-auth's how-we-work: "Plans: few, short, closed"). Close an item when it is on
main and live; then move its plan to [done/](done/).

## In order

1. ~~**Move to @joeblew999/remy-ui 0.12.0**~~ (2026-09-26): the phone's bottom bar and the Clock, Settings
   and Account pages; the theme toggle works (the root had no ThemeProvider); the header's GitHub link is
   this repository.
2. ~~**Move to @joeblew999/remy-ui 0.13.0 the right way**~~ (2026-09-26): `mise run project:upgrade-ui 0.13.0`
   (no hand-edited pins); the root renders its pages in the package's `AppProviders` (direction, theme,
   source link) instead of hand-wired providers; the Clock route spreads `clockRouteOptions`.
