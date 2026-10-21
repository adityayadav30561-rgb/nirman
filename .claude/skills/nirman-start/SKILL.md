---
name: nirman-start
description: Resume work on the Nirman website after a cleared session. Use at the start of a session or when the user says "continue", "resume", "start", "what's next" for the Nirman project.
---

# Resume the Nirman website work

Load the minimum context, then continue the plan.

1. Read `docs/STATUS.md` in full (it is short).
2. Find the current phase in `docs/PLAN.md`: grep for `## Phase <N>` and read
   only from that heading to the next `## Phase` heading.
3. If the next task needs them, read only the relevant section of
   `docs/ARCHITECTURE.md`, `docs/DESIGN.md` or `docs/handoff.md` (grep the
   heading first, then read that line range). Do not read whole files.
4. If a task in STATUS "Half-finished work" exists, resume that first.
5. Reply to the user in at most four short lines: current phase, what was
   done last, the next task, and any question that blocks it. Then start the
   next task unless it needs the user's decision.

Do not re-read files that STATUS says are unchanged, and do not re-verify
work STATUS marks as done.
