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
| `cv.html` | Holding page — “Will be added soon”. See *Restoring the CV page* below |
| `contact.html` | Email, tutoring platforms, social channels and an enquiry form |

## The CV page is currently held back

`cv.html` shows a “Will be added soon” holding page. The full curriculum vitae
and the downloadable `.docx` were removed from this repository on 24 August 2026
and moved to `_held/` **one level above the repository**, which is not published:

    nilufer-site/
      _held/cv-full.html                  ← the CV page body
      _held/Nilufer-Misirli-CV-2026.docx  ← the document the page offered
      site/                               ← this repository

To put it back:

```bash
mv ../_held/cv-full.html _src/pages/cv.html
mv ../_held/Nilufer-Misirli-CV-2026.docx assets/
python3 _src/build_site.py
```

Then restore the page title and description for `cv.html` in `_src/build_site.py`.

Note that earlier commits still contain both files, so the content is reachable
by anyone who reads this repository's history — it is hidden from the website,
not erased. Rewriting history would be needed to remove it completely.

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

`assets/tools.js` holds four things, all running entirely in the visitor's
browser with no network requests:

- **Level check** — twelve graded questions placing the visitor between A2 and C1
- **Study planner** — weeks and hours needed to move between scores, across 28 examinations
- **Resource library** — a filterable index built from `assets/library.js`
- **Contact form** — composes a message and opens the visitor's own mail application

### Adding an examination to the planner

Every exam is one line in the `EXAMS` table in `assets/tools.js`:

```js
gre: ex('GRE Verbal Reasoning', 'grad',
        ['145','150','155','160','165','170'],   // the score scale, low to high
        100,                                      // study hours to move one step
        'gradVerbal',                             // which FOCUS profile to show
        'scaled score', 'ölçekli puan',           // the unit, English then Turkish
        'GRE Sözel Muhakeme'),                    // optional Turkish name
```

`group` is one of `grad`, `ug`, `prof`, `camb`, `tr`, `spec`, `school` — it decides
which heading the exam appears under in the dropdown. The `FOCUS` object above the
table holds the study-split advice, shared across exams of the same family; add a
new profile there only when an exam genuinely needs different advice.

### The resource library

`assets/library.js` is the whole library — one array, one object per resource, with
a worked example and the field list in a comment at the top of the file. The filter
chips are generated from the data, so a new format, skill or level starts appearing
as a filter as soon as one resource uses it.

Each entry carries three labels, and this is the part worth getting right:

| Label | What it answers | Values |
|---|---|---|
| `format` | What is it physically? | `sheet` `pdf` `podcast` `video` `film` `site` `test` `book` |
| `skills` | What does it actually train? | `listening` `speaking` `reading` `writing` `vocabulary` `grammar` `technique` |
| `levels` | Who is it genuinely right for? | `A2` `B1` `B2` `C1` `C2` |
| `exams` | Optional — is it for one paper? | free text: `TOEFL`, `GRE`, `YDS`, … |

Rules that keep the library usable as it grows:

1. **File by use, not by source.** Where a resource came from does not help a
   student choose; what they can do with it does.
2. **Two skills, rarely three.** A resource tagged with all seven trains none of
   them well, and it defeats the filter.
3. **Be honest about level.** Material two levels above a student is not ambitious,
   it is wasted time — and mis-levelled entries are what make a library stop
   being trusted.
4. **One sentence per note.** Say what it is and who it helps. If it needs a
   paragraph, it probably needs to be a printable sheet instead.
5. **`href` can be an anchor.** `'#r-cue'` points at a printable sheet further down
   the same page; anything starting `http` opens in a new tab and gets an ↗ marker.

To turn a PDF into a library entry, put the file in `assets/files/`, set
`format: 'pdf'` and `href: 'assets/files/name.pdf'`.

### Competitions and calls for entry

The “Opportunities” section on the resources page (`_src/pages/resources.html`,
`id="competitions"`) is the standing list. Each competition is one `<article class="story">`
block; copy an existing one when a new call arrives.

## Local preview

```bash
python3 -m http.server 8080
```

## Deployment

GitHub Pages, `main` branch, root folder. Pushing to `main` publishes.
