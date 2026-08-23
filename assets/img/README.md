# Photographs

Drop image files here with these exact names and they appear on the site
automatically. Until a file exists, the page shows a designed placeholder frame
instead of a broken image — nothing looks unfinished either way.

| File name | Where it appears | Best shape |
|---|---|---|
| `portrait.jpg` | Home page hero, beside the headline | portrait, 4:5 (e.g. 1200 × 1500) |
| `about-portrait.jpg` | About page, beside the biography | portrait, 3:4 (e.g. 1200 × 1600) |
| `classroom.jpg` | Home page, “How a lesson runs” | landscape, 4:3 |
| `gallery-1.jpg` | About page gallery — eTwinning project work | landscape, 4:3 |
| `gallery-2.jpg` | About page gallery — conference presentation | landscape, 4:3 |
| `gallery-3.jpg` | About page gallery — students at a competition | landscape, 4:3 |
| `gallery-4.jpg` | About page gallery — Erasmus+ partner meeting | landscape, 4:3 |

Notes

- `.jpg` is what the pages look for. To use a different format, change the
  `src` in `_src/pages/index.html` or `_src/pages/about.html` and run `python3 _src/build_site.py`.
- Keep each file under about 400 KB so the pages stay fast. Around 1600 px on
  the long edge is plenty.
- Photographs of identifiable students need consent from the student and, for
  anyone under 18, from a parent — the site is public.
- The caption under each frame is set in the page source; edit it there if the
  photograph shows something different.
