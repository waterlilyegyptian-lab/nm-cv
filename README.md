# Nilüfer Mısırlı — Curriculum Vitae

A modern, single-page CV website for **Nilüfer Mısırlı**, English Language Educator
(M.A. TESL) at Ankara High School of Science, Erasmus+ / eTwinning coordinator and
Cambridge ESOL Speaking Examiner.

## Contents

| Path | Purpose |
|---|---|
| `index.html` | The whole site — every section of the CV |
| `assets/style.css` | Design system, light/dark themes, responsive + print styles |
| `assets/main.js` | Theme toggle, scroll-spy nav, reveal animations, counters |
| `assets/Nilufer-Misirli-CV-2026.docx` | The original CV, offered as a download |

## Sections

Objective & profile · Education · Experience (current, previous and additional
international posts) · Erasmus+ and eTwinning projects · Research, publications,
translation & editing · Certifications, academic honours, languages and skills ·
Mentoring, voluntary service and continuing professional development · Contact

## Features

- Fully responsive, mobile-first layout
- Light and dark themes that follow the system setting, with a manual toggle (remembered)
- Sticky navigation with scroll-spy, reading-progress bar and back-to-top control
- Reveal-on-scroll animations that respect `prefers-reduced-motion`
- Print stylesheet — the page prints cleanly as a paper CV
- No build step, no framework, no tracking: plain HTML, CSS and JavaScript

## Running locally

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Deployment

Published with GitHub Pages from the `main` branch, root folder.
