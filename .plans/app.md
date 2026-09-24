# Remy Auth App: reuse the shared code, bootstrap any project

Status: proposed 2026-09-24. Owner: joeblew999. Reviewer defines acceptance; Executor
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

- `packages/ui` (`@remy/ui`) exports `button`, `styles.css`, `messages`, `locale` and
  `locale-info`; it is a private npm workspace package, never published.
- `mise run ui:verify` builds the packed tarball in an isolated client-only consumer.
- Its [shared UI plan](https://github.com/joeblew999/remy-auth/blob/main/.plans/shared-ui.md)
  lists what is still app-local (Accept-Language matching, the remembered-choice
  cookie, hreflang builder, language chooser, switcher and hint) and how to extract it.
- Its `mise.toml` holds the bootstrap tasks (`skills:install`, `mcp:register`,
  `browser:*`, `web:guidance`, `project:doctor`) as project tasks, not yet as an
  includable task file.
- mise's `[task_config] includes` accepts `git::<protocol>://<url>//<path>?ref=<ref>`;
  the repository is private, so the include needs an SSH URL or credentials.

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

1. **Make the bootstrap includable (in remy-auth).** Move the skill, MCP, browser and
   guidance tasks and their scripts into a `tasks/` directory that a remote include can
   load; keep remy-auth's own `mise.toml` including it locally so one copy exists.
   Keep the `*_skills_source` pins as variables the include reads. Verify with
   `mise run project:verify` there.
2. **Bootstrap here.** `mise.toml` with the Node pin and
   `[task_config] includes = ["git::ssh://git@github.com/joeblew999/remy-auth.git//tasks?ref=<commit>"]`;
   run `mise run project:setup`, then `mise run skills:list` and `mise run mcp:verify`
   to prove the skills and MCP registration exist in this checkout.
3. **Distribute the package.** Consume `@remy/ui` as a versioned artifact, per the
   remy-auth rule that cross-repository consumers do not use sibling paths. Blocked on
   owner decision 1 below.
4. **Build the app.** React Router framework mode with `ssr: false` and a `prerender`
   list, the Cloudflare Vite plugin for a static-assets Worker, the three pages, the
   language chooser, hint and switcher from the package, and Playwright plus Lighthouse
   checks adapted to client rendering, following the prerendering decision below.
5. **Verify reuse both ways.** remy-auth's shared UI plan item 5: one check compares
   the accessibility tree and computed styles of the shared controls in both apps.
6. **Deploy** to its own Worker only on the owner's explicit request, then run the same
   suite against the deployed URL.

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

- The chooser pages prerender as neutral lists of every language, which is exactly
  what Google wants from an `x-default` page. In the browser they enhance with
  `navigator.languages` to mark the suggested language, and a remembered choice
  (`document.cookie`) triggers a client-side `location.replace`. That is the visitor's
  own earlier choice, not a guess, so it stays within Google's guidance.
- The language hint on localized pages is client-side only and reserves no space; it
  appears after hydration.
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
  MCP using only the included tasks; `mise run project:verify` is green.
- Every Lighthouse audit passes on the deployed and local builds; the language
  chooser, hint and remembered choice behave as in remy-auth.
- No file in this repository is copied from remy-auth's `app/` or `packages/ui/src`;
  the boundary check fails otherwise.
- The README recipe works in a third, unrelated project (tested once by the owner).

## Open decisions for the owner

1. **Package distribution.** Publish `@remy/ui` to GitHub Packages or an npm scope, or
   attach the packed tarball to a remy-auth release. npm cannot install one workspace
   package from a git URL, so "install from the repo" is not an option.
2. **Metadata in a client-rendered app.** Decided 2026-09-24: prerender every public
   page. See "Prerendering decision" below.
3. **Where the includable tasks live.** Inside remy-auth (`tasks/`) or a separate
   tooling repository. Inside remy-auth is simplest and keeps one owner; a separate
   repository decouples releases. remy-auth's principle against the retired shared
   task library still applies: the include must be pinned to a commit and reviewed on
   update, not tracked at `main`.
4. **Visibility.** This repository was created private to match remy-auth. Making it
   public changes what the README may say about the private package.
