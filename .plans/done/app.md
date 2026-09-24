# Remy Auth App: reuse the shared code, bootstrap any project

Status: done; accepted by the owner 2026-09-24 (the recipe test in a third project remains the owner's). Owner: joeblew999. Reviewer defines acceptance; Executor
implements bounded work items and stops at the open decisions. Nothing is built yet.

## Why this repository exists

The owner's assessment after the remy-auth GUI work, recorded here as the goal:

- With the pinned official skills and MCP tooling installed, it was easy to build code
  that keeps Google's checks green (every Lighthouse audit gated, hreflang, language
  chooser instead of redirects) and to avoid badly designed decisions, because the
  guidance was at hand at the moment each decision was made.
- The code is designed to be reused: shared controls, theme, catalogs, locale helpers
  and language behaviour live in a package with public exports, proven in server
  rendering and hydration.
- mise bootstraps the skills and MCP registration for any coding environment (Codex,
  Claude Code, VS Code), and mise can include task files from another repository, so any
  project can adopt the same bootstrap.

This repository is the proof of both: the first cross-repository consumer of the shared
code, rendered in the browser (CSR) where remy-auth renders on the server (SSR), and the
first project bootstrapped by including remy-auth's tasks rather than copying them.

## Evidence from remy-auth on 2026-09-24

- `packages/ui` (`@joeblew999/remy-ui`) exports `button`, `styles.css`, `messages`, `locale` and
  `locale-info`; it is a private npm workspace package, never published.
- `mise run ui:verify` builds the packed tarball in an isolated client-only consumer.
- Its [shared UI plan](https://github.com/joeblew999/remy-auth/blob/main/.plans/shared-ui.md)
  lists what is still app-local (Accept-Language matching, the remembered-choice
  cookie, hreflang builder, language chooser, switcher and hint) and how to extract it.
- Its `mise.toml` holds the bootstrap tasks (`skills:install`, `mcp:register`,
  `browser:*`, `web:guidance`, `project:doctor`) as project tasks, not yet as an
  includable task file.
- mise's `[task_config] includes` accepts `git::<protocol>://<url>//<path>?ref=<ref>`;
  both repositories have been public since 2026-09-24, so an HTTPS include needs no
  credentials.

## Outcome

1. This app renders remy-auth's home, demo and formats pages client-side with the
   same package, catalogs and language behaviour, and passes the same checks: every
   Lighthouse audit, no-JavaScript metadata where CSR allows it, hreflang alternates,
   the language chooser and remembered choice, right-to-left mirroring.
2. Its `mise.toml` includes the bootstrap tasks from remy-auth by git reference pinned
   to a commit, and `mise run project:setup` installs the same skills and registers the
   same MCP server here without copying scripts.
3. A short "use it in any project" recipe in the README: three lines of `mise.toml`,
   one setup command, and the verification that proves the environment is ready.

## Work items, in order

1. **Make the bootstrap includable (in remy-auth).** Done 2026-09-24: remy-auth's `tasks/` directory, one file per
   task namespace (`skills`, `mcp`, `browser`, `web`, `codex`, `claude`, `project`, `cf`; the
   `*_skills_source` pins are the `skills:install` task's vars, since included task files
   cannot carry `[vars]`) and the `tasks/mcp/register` file task; remy-auth's `mise.toml` includes the directory locally, so one copy exists.
2. **Bootstrap here.** Done 2026-09-24: `mise.toml` includes remy-auth's `tasks` by git
   reference pinned to commit `038972a`; `skills:install` put 33 skills in `.agents/skills`
   with `.claude/skills` links and `skills-lock.json`, and `mcp:register` wrote this
   checkout's own `.mcp.json` and `.codex/config.toml`; `project:setup` and `project:verify`
   run them.
3. **Consume the package.** Done 2026-09-24 for the proof: `@joeblew999/remy-ui@0.1.0`
   from GitHub Packages, with `mise run package:verify` building a client bundle and a
   server render from it. The app's own build (item 4) reuses this setup.
4. **Build the app.** Done 2026-09-24 on `@joeblew999/remy-ui@0.2.0`: React Router
   framework mode with `ssr: false` and a prerender list from Paraglide's URL patterns,
   a static-assets Worker (`wrangler.jsonc`, no script), the three pages, the language
   switcher and hint from the package, Paraglide's middleware at prerender time so each
   page carries its locale, and Playwright plus Lighthouse checks that run on Cloudflare's
   local asset host (`wrangler dev`) so `html_handling` and 404 semantics match production.
5. **Verify reuse both ways.** Done 2026-09-24 the stronger way: both repositories run the
   same checks from `@joeblew999/remy-ui/checks` (0.3.0), so the shared controls and language
   behaviour are verified identically in server and client rendering.
6. **Deploy.** Done 2026-09-24 on the owner's request: https://remy-auth-app.gedw99.workers.dev,
   with the same suite passing against it after every deployment.

## Prerendering decision

Decided 2026-09-24 by the owner's instruction to address it; reasoning and sources here.

**Decision.** Every public page is prerendered at build time: `/{locale}`,
`/{locale}/demo` and `/{locale}/formats` for every locale, plus the chooser paths `/`,
`/demo` and `/formats`. Unknown paths return a real 404 from a static `404.html`
(Workers assets `not_found_handling: "404-page"`); the SPA fallback file React Router
also emits is not served, because no valid URL is left un-prerendered.

**Why.** remy-auth's GUI plan accepts a public page only when its meaningful content,
localized title and description, canonical URL and hreflang links are in the initial
HTML response. Lighthouse executes JavaScript, so it passes a client-only page and
proves nothing about that response; the no-JavaScript fetch checks in the suite are
what make Google's guidance verifiable, and they need static HTML. Prerendering keeps
those checks meaningful in a client-rendered app, and removes the dependency on
Google's deferred JavaScript rendering.

**Rules from the pinned React Router docs** (`node_modules/react-router/docs/how-to/pre-rendering.md`):
loaders on prerendered routes run at build time against a synthetic `Request`, so they
see no `Accept-Language`, cookies or Cloudflare geolocation; `headers` and `action`
exports are prohibited with `ssr: false`; routes not prerendered may only use
`clientLoader`.

**Consequences for the shared behaviour.**

- The entry URLs (`/`, `/demo`, `/formats`) prerender as plain lists of every language
  version and are the `x-default` targets. In the browser, Paraglide's own
  `shouldRedirect` (strategies `url`, `cookie`, `preferredLanguage`, `baseLocale`) moves
  the visitor to their language, the same decision remy-auth's server middleware makes.
  Owner rule 2026-09-24: no hand-written language detection; Paraglide's runtime does it.
- The language hint on localized pages is client-side only (Paraglide's cookie and
  navigator languages after hydration) and reserves no space.
- The canonical origin is a build-time value (`PUBLIC_ORIGIN`), since no request
  exists at build time. The owner sets it per deployment.
- The formats page omits the Cloudflare location section: per-request geolocation is
  a server-rendering feature and the omission is the honest difference between the
  two modes. The device time zone row stays client-side, as in remy-auth.
- The reservation form is already client-only, so nothing changes there.

**Verification.** The same no-JavaScript checks as remy-auth run against the static
files the Worker serves; Lighthouse runs as before; a check confirms every URL in the
sitemap is a prerendered file and that an unknown path returns 404, not the fallback.

## Acceptance

- `mise run project:setup` in a fresh clone installs the pinned skills and registers
  MCP using only the included tasks (true since 2026-09-24); `mise run project:verify` is
  green (18 checks plus the MCP check).
- Every Lighthouse audit passes on the deployed and local builds; the language
  chooser, hint and remembered choice behave as in remy-auth.
- No file in this repository is copied from remy-auth's `app/` or `packages/ui/src`;
  the boundary check fails otherwise.
- The README recipe works in a third, unrelated project (tested once by the owner).

## Open decisions for the owner

1. **Package distribution.** Decided 2026-09-24: GitHub Packages. The package is now
   `@joeblew999/remy-ui` (GitHub requires the scope to equal the owner) and remy-auth's
   tag-triggered workflow publishes it with its own `GITHUB_TOKEN`. This repository
   installs it with an `.npmrc` of `@joeblew999:registry=https://npm.pkg.github.com`
   and `//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}`, where the token has
   `read:packages`; in Actions that is the workflow token, locally `gh auth token`.
   Verified 2026-09-24: version 0.1.0 is published, installs here, and
   `mise run package:verify` builds a client bundle and a server render from it.
2. **Metadata in a client-rendered app.** Decided 2026-09-24: prerender every public
   page. See "Prerendering decision" below.
3. **Where the includable tasks live.** Decided 2026-09-24: inside remy-auth (`tasks/`),
   one owner and one copy. The include is pinned to a commit and reviewed on update,
   never tracked at `main`, honouring remy-auth's principle against the retired shared
   task library.
4. **Visibility.** Decided 2026-09-24: both repositories are public, and the package
   is public on GitHub Packages. Confirmed the same day: its npm registry still returns
   401 without a token, so installs need `read:packages` regardless.
