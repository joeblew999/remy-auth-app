# Agent instructions

This file is an index. Read the documents below before changing anything and follow
them over your own defaults.

1. [The plan](.plans/done/app.md) for this repository, done and accepted; new work gets a new plan in `.plans/`.
2. remy-auth's [development principles](https://github.com/joeblew999/remy-auth/blob/main/docs/development.md),
   [tooling](https://github.com/joeblew999/remy-auth/blob/main/docs/tooling.md) and
   [GUI plan](https://github.com/joeblew999/remy-auth/blob/main/.plans/done/gui.md); this app consumes that work.

Run project commands through `mise run <namespace:action>` once the bootstrap exists.
Start by running `mise run project:setup`: it installs dependencies and the pinned skills (not
committed; `skills-lock.json` records them) and registers MCP, then verifies.

Before reporting work as done, run the verification task and report its real result.
Task descriptions (`mise tasks ls`) say how long each task takes and what may run at the same
time: run post-deploy checks in the background and keep working; state the expected duration
before starting anything that takes more than a few seconds.

How people and agents work on every Remy repository, including the UI rules (shadcn and TanStack
all the way), lives in remy-auth's [how we work](https://github.com/joeblew999/remy-auth/blob/main/docs/how-we-work.md).
