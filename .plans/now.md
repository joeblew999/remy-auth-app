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
3. **Move to @joeblew999/remy-ui 0.15.0** (2026-10-11): mise gone, `package.json` is the entry (the `remy`
   bin's scripts, `remy.config.ts`, the shared workflow at `v0.15.0`); the showcase pages from
   `@joeblew999/remy-showcase` 0.1.0 and the contract 0.4.0; `defineRemyApp` (the showcase's lists, the
   deployments), `remyApp()` in `vite.config.ts`, `{product}` in the messages, three check calls. Then
   0.15.1 the same day through `npm run upgrade -- 0.15.1` (remy-showcase 0.1.1, the contract 0.4.1; the
   platform's `remy.config.ts` now owns the origins, and the showcase declares its dependencies). Closes
   when CI is green on main (the workflow's `npm ci` needs this repository granted access to the
   showcase's package on GitHub Packages, as it has for remy-ui and the contract: the package's "Manage
   Actions access", owner only) and `npm run dev:promote` has put it live.
