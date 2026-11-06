---
name: nirman-wrap
description: Save progress on the Nirman website before the user clears the session or switches account. Use when the user says "wrap up", "save progress", "I'm clearing", "end session" for the Nirman project.
---

# Save progress before a session ends

The next session (maybe in another Claude account) starts with no memory of
this one. Everything it needs must be in the docs and on GitHub.

1. Stop the dev server, then run in `nirman-site/`: `npx tsc --noEmit`,
   `npm run lint`, `npm run build`. Note any failure.
2. Update `docs/STATUS.md`: where we are, exact next task (BUILD-PLAN ID),
   open questions, half-finished work (file paths and precisely what is
   left, or "None"), and "Last session" in 3 to 6 lines. Keep it under about
   60 lines.
3. Tick finished tasks in `docs/BUILD-PLAN.md`. Make sure each section worked
   on has an up-to-date record in `docs/sections/` (variants, scores, choice,
   screenshots in `docs/sections/shots/`).
4. Add user decisions to `docs/DECISIONS.md`, measured motion to
   `docs/REFERENCE-VIDEO.md`, design-system changes to `docs/DESIGN.md`, new
   gotchas to `docs/ARCHITECTURE.md`.
5. Move any script or note that matters out of the scratchpad into the repo
   (`tools/` or `nirman-site/scripts/`).
6. Commit and push to `origin` main. Never commit the reference video, its
   frames, or `old-site/`. Commit message: `<task ID>: <summary>`.
7. Tell the user in two lines what is saved and what the next session will
   start with; remind them to run `/nirman-start`.
