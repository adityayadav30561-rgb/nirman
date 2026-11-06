---
name: nirman-start
description: Resume work on the Nirman website after a cleared session or in a new account. Use at the start of a session or when the user says "continue", "resume", "start", "what's next" for the Nirman project.
---

# Resume the Nirman website work

The docs and GitHub are the only memory. Load the minimum, then continue.

1. `git pull` in `E:\nirman2` (another session or account may have pushed).
2. Read `docs/STATUS.md` in full (it is short).
3. Read the next task in `docs/BUILD-PLAN.md` and its record in
   `docs/sections/` if one exists.
4. If the task designs a section or page, read `docs/DESIGN-PROTOCOL.md` and
   follow it (3 to 4 variants on `/lab/`, screenshots, scores, choice,
   record). For tokens and components read `docs/DESIGN.md`.
5. Read other docs (`ARCHITECTURE.md`, `REFERENCE-VIDEO.md`, `PAGE-PLAN.md`,
   `handoff.md`) only for the part the task needs: grep the heading, then
   read that line range.
6. If STATUS lists half-finished work, resume that first.
7. Reply to the user in at most four short lines: where things stand, what
   was done last, the next task, and any question that blocks it. Then start
   the next task unless it needs the user's decision.

Do not redo or re-verify work that STATUS and BUILD-PLAN mark as done.
