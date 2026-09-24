# Remy Auth App

A client-rendered Remy application built entirely from the shared code in
[remy-auth](https://github.com/joeblew999/remy-auth): the same shadcn/Base UI
controls, theme, Paraglide catalogs, language handling and Google-facing checks,
rendered in the browser instead of on the server.

It exists to prove two claims from the remy-auth work:

1. The code there is designed to be reused, in both server- and client-rendered apps.
2. mise bootstraps the pinned agent skills and MCP tooling for any coding environment,
   so any project can include them and get the same guidance and checks.

## What works today

The published package `@joeblew999/remy-ui` installs from GitHub Packages and runs here
with nothing from the remy-auth checkout:

```sh
mise install
GITHUB_TOKEN=$(gh auth token) mise run package:install   # npm install from GitHub Packages via .npmrc
mise run package:verify    # Vite client build + server render from the package, then checks
```

GitHub Packages' npm registry answers 401 without a token even though the package is
public, so `.npmrc` reads `GITHUB_TOKEN`; any GitHub token with `read:packages` works,
including the workflow token in Actions. The verification builds a client bundle and
renders the same components on the server, proving both modes from the published
package. The app itself is not built yet; see [the plan](.plans/app.md).
