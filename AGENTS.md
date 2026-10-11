# Agent instructions

`remy rules` writes the platform's rules block here (npm run setup runs it).

<!-- BEGIN:remy-rules (written by remy rules; edit around it, not in it) -->
This repo is built on the Remy platform: @joeblew999/remy-ui 0.15.0, whose `remy` bin is its tooling.
Its rules are the `remy` skill; read `.agents/skills/remy/SKILL.md` (Claude:
`.claude/skills/remy/SKILL.md`) before changing anything. It lists the references: how we work, the
development principles, tooling, the UI package and writing docs.
The flow is code, and the only way to work here, as package.json's scripts: `npm run dev:status` first
(what is going on: main, GitHub's verdicts, the deployments, who is working on what);
`npm run dev:start -- <name>` for a worktree of your own; `npm run dev:change` after every change
(seconds); `npm run dev:land -- "<what changed>"` to land (main, GitHub's checks, staging);
`npm run dev:done` when landed. The tooling refuses the heavy checks outside those steps. Long steps
run in the background; never wait on them.
Seen something wrong, slow, missing or left over? Fix it in the same landing when small, or write it
into `.plans/now.md` in that landing; `dev:status` shows that list to everyone. "Done" is the end
of a sweep (branches, pull requests, deployments, plans, retired words, touched docs), not of a list.
<!-- END:remy-rules -->
