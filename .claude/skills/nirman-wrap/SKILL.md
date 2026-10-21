---
name: nirman-wrap
description: Save progress on the Nirman website before the user clears the session. Use when the user says "wrap up", "save progress", "I'm clearing", "end session" for the Nirman project.
---

# Save progress before a session is cleared

The next session starts with no memory of this one. Everything it needs must
be in the docs.

1. Run in `nirman-site/`: `npx tsc --noEmit`, `npm run lint`, `npm run build`.
   Note any failure.
2. Update `docs/STATUS.md`:
   - tick finished tasks in "Current phase tasks" and the phase checklist;
   - set "Current position" (phase, exact next task with its ID);
   - "Half-finished work": file paths and precisely what is left, or "None";
   - replace "Last session" with 3-6 lines on what changed and why;
   - when a phase is complete, copy the next phase's task IDs from PLAN.md into
     "Current phase tasks".
   Keep STATUS.md under about 80 lines.
3. Add any user decision to `docs/DECISIONS.md` and any new gotcha to
   `docs/ARCHITECTURE.md` "Gotchas". If the design system changed, update
   `docs/DESIGN.md`.
4. If the plan changed (new task, reordered phase), edit `docs/PLAN.md`.
5. Ask the user before committing. Commit message: `P<phase>.<task>: <summary>`.
6. Tell the user in two lines: what is saved and what the next session will
   start with. Remind them to run `/nirman-start` after clearing.
