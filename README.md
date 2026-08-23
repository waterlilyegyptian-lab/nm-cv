# Nilüfer Mısırlı — teaching portfolio

The website of **Nilüfer Mısırlı**, English language educator (M.A. TESL) at Ankara
High School of Science, Cambridge ESOL speaking examiner and Erasmus+ / eTwinning
coordinator. Static HTML, CSS and JavaScript. No framework, no build tooling,
no tracking, no cookies.

**Live:** <https://waterlilyegyptian-lab.github.io/nm-cv/>

## Pages

| Page | What it holds |
|---|---|
| `index.html` | Home — who she is, the four teaching routes, how a lesson runs, headline results |
| `about.html` | Biography, teaching philosophy, a career timeline and a photo gallery |
| `teaching.html` | Full course descriptions: who each is for, level, length, a typical week, materials, how progress is measured |
| `results.html` | Documented student outcomes, competition results and European project awards |
| `resources.html` | Free printable study material, plus the level check and the exam study planner |
| `fees.html` | What changes the price, what is included, what is never charged, the weekly timetable, how to start |
| `faq.html` | Twenty questions students and parents actually ask |
| `cv.html` | The full curriculum vitae (English only) |
| `contact.html` | Email, tutoring platforms, social channels and an enquiry form |

## Editing

Page content lives in **`_src/pages/*.html`** — body content only, no header or
footer. The shared shell (head, navigation, footer) is in **`_src/build_site.py`**.
After editing either, regenerate the site:

```bash
python3 _src/build_site.py
```

It can be run from anywhere; it resolves its own paths. The `.html` files at the
repository root are generated — editing them directly means the next build
overwrites your change.

### Adding a language

Every visible string appears twice, tagged by language:

```html
<p lang="en">English sentence.</p>
<p lang="tr">Türkçe cümle.</p>
```

English is the unstamped default, so search engines, printouts and visitors
without JavaScript all get English. The TR button sets `data-lang="tr"` on the
root element and the stylesheet swaps which blocks are shown.

### Adding photographs

See `assets/img/README.md`. Drop a correctly named file in and it appears;
until then the page shows a designed placeholder rather than a broken image.

### Adding testimonials

`_src/pages/results.html` has commented-out markup for quotation cards. Use only text
a student or parent has actually written and agreed to publish.

### Adding social links

`_src/pages/contact.html` has a commented example showing how to turn each
“being set up” placeholder into a real link.

## Tools

`assets/tools.js` holds three things, all running entirely in the visitor's
browser with no network requests:

- **Level check** — twelve graded questions placing the visitor between A2 and C1
- **Study planner** — weeks and hours needed to move between exam scores
- **Contact form** — composes a message and opens the visitor's own mail application

## Local preview

```bash
python3 -m http.server 8080
```

## Deployment

GitHub Pages, `main` branch, root folder. Pushing to `main` publishes.
