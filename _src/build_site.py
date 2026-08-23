#!/usr/bin/env python3
"""Assemble the site from pages/*.html into site/*.html.

Every page shares one shell — head, navigation, footer — so the chrome can be
edited in one place. Page bodies live in pages/ and hold only their own content.
"""
import io, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)          # generated pages sit at the repository root
PAGE_DIR = os.path.join(HERE, 'pages')  # sources live beside this script
PAGES = [
    # file            EN nav label      TR nav label      EN title                                    TR title
    ('index.html',    'Home',           'Ana Sayfa',      'Preparation for thirty-five examinations', 'Otuz beş sınav için hazırlık'),
    ('about.html',    'About',          'Hakkımda',       'About Nilüfer Mısırlı',                    'Hakkımda'),
    ('teaching.html', 'Teaching',       'Dersler',        'Every examination, and how each course runs','Her sınav ve dersin nasıl işlediği'),
    ('results.html',  'Results',        'Başarılar',      'What students have gone on to do',         'Öğrencilerin ulaştığı sonuçlar'),
    ('resources.html','Resources',      'Kaynaklar',      'Free resources and study tools',           'Ücretsiz kaynaklar ve çalışma araçları'),
    ('fees.html',     'Fees & Schedule','Ücret & Program','Fees, schedule and how to start',          'Ücretler, program ve başlangıç'),
    ('faq.html',      'FAQ',            'SSS',            'Frequently asked questions',               'Sıkça sorulan sorular'),
    ('cv.html',       'CV',             'Özgeçmiş',       'Curriculum vitae',                         'Özgeçmiş'),
    ('contact.html',  'Contact',        'İletişim',       'Get in touch',                             'İletişim'),
]
DESCRIPTIONS = {
 'index.html': 'Nilüfer Mısırlı — English teacher (M.A. TESL) in Ankara, Cambridge-certified speaking examiner across 14 levels. TOEFL iBT, GRE, GMAT, SAT, LSAT, MCAT, IELTS, METU and Bilkent proficiency, YDS and school English — online and in person.',
 'about.html': 'Twenty-nine years of English teaching across Türkiye, the United States, the United Kingdom and China — and the teaching philosophy behind it.',
 'teaching.html': 'Thirty-five examinations — GRE, GMAT, LSAT, MCAT, TOEFL iBT, SAT, ACT, AP, PTE, Cambridge, IELTS, YDS, YÖKDİL and more — each with who it is for, how a lesson runs, what you practise weekly and how progress is measured.',
 'results.html': 'Documented student outcomes — TOEFL passes from Galatasaray, Robert College, SEV and Saint Joseph, Oxford and Columbia admissions, a national English olympiad winner and award-winning European school projects.',
 'resources.html': 'Free study material for English learners — IELTS speaking cue cards, academic vocabulary, a corrections sheet for Turkish speakers — plus a level check and a study planner.',
 'fees.html': 'How lessons are priced, what is included, the weekly timetable and how to book a free introductory meeting.',
 'faq.html': 'Answers to the questions students and parents ask most often about lessons, exams, materials, scheduling and payment.',
 'cv.html': 'Full curriculum vitae of Nilüfer Mısırlı — education, teaching record, Erasmus+ and eTwinning projects, research, credentials and honours.',
 'contact.html': 'Email, tutoring platforms and social channels — and a form for requesting a quote or a free introductory meeting.',
}

FAVICON = ("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>"
           "<rect width='100' height='100' rx='22' fill='%230f766e'/><text x='50' y='68' font-size='54' "
           "font-family='Georgia,serif' fill='%23f8f5ef' text-anchor='middle'>N</text></svg>")

SHELL = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title_en} — Nilüfer Mısırlı</title>
<meta name="description" content="{description}">
<meta name="author" content="Nilüfer Mısırlı">
<meta property="og:title" content="{title_en} — Nilüfer Mısırlı">
<meta property="og:description" content="{description}">
<meta property="og:type" content="website">
<meta property="og:image" content="https://waterlilyegyptian-lab.github.io/nm-cv/assets/img/portrait.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://waterlilyegyptian-lab.github.io/nm-cv/{file}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
<link rel="icon" href="{favicon}">
<script>
/* set theme and language before first paint so the page never flashes */
(function(){{try{{var t=localStorage.getItem('nm-theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);
var l=localStorage.getItem('nm-lang');if(l==='tr'){{document.documentElement.setAttribute('data-lang','tr');document.documentElement.lang='tr';}}}}catch(e){{}}}})();
</script>
</head>
<body>

<a class="skip" href="#main"><span lang="en">Skip to content</span><span lang="tr">İçeriğe geç</span></a>
<div class="progress" id="progress"></div>

<header class="nav" id="nav">
  <div class="nav-inner">
    <a class="brand" href="index.html"><span class="brand-mark">NM</span><span class="brand-name">Nilüfer Mısırlı</span></a>
    <nav class="nav-links" aria-label="Main navigation">
{navlinks}
    </nav>
    <div class="nav-actions">
      <button id="lang-toggle" class="lang-btn" aria-label="Switch language / Dili değiştir">
        <span lang="en">TR</span><span lang="tr">EN</span>
      </button>
      <button id="theme-toggle" class="icon-btn" aria-label="Switch colour theme">
        <svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"/></svg>
        <svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>
      </button>
      <button class="icon-btn menu-btn" id="menu-btn" aria-label="Open menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>

<main id="main">
{content}
</main>

<footer class="foot">
  <div class="wrap foot-grid">
    <div>
      <p class="foot-name">Nilüfer Mısırlı</p>
      <p class="tiny"><span lang="en">English Language Educator · M.A. TESL · Ankara, Türkiye</span><span lang="tr">İngilizce Öğretmeni · M.A. TESL · Ankara, Türkiye</span></p>
    </div>
    <div>
      <p class="foot-h"><span lang="en">Site</span><span lang="tr">Site</span></p>
{footlinks}
    </div>
    <div>
      <p class="foot-h"><span lang="en">Contact</span><span lang="tr">İletişim</span></p>
      <a href="mailto:waterlily.egyptian@gmail.com">waterlily.egyptian@gmail.com</a>
      <a href="contact.html"><span lang="en">All channels</span><span lang="tr">Tüm kanallar</span></a>
    </div>
  </div>
  <div class="wrap foot-base">
    <p>© <span id="year">2026</span> Nilüfer Mısırlı</p>
    <p class="tiny"><span lang="en">Built as a static site — no tracking, no cookies.</span><span lang="tr">Statik site — takip yok, çerez yok.</span></p>
  </div>
</footer>

<button id="to-top" class="to-top" aria-label="Back to top">
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
</button>

<script src="assets/main.js"></script>
{extra_scripts}</body>
</html>
'''


def nav_html(current):
    rows = []
    for f, en, tr, _, _ in PAGES:
        if f == 'contact.html':
            continue
        cls = ' class="active"' if f == current else ''
        rows.append('      <a href="%s"%s><span lang="en">%s</span><span lang="tr">%s</span></a>' % (f, cls, en, tr))
    cls = ' cta active' if current == 'contact.html' else ' cta'
    rows.append('      <a href="contact.html" class="nav-cta"><span lang="en">Contact</span><span lang="tr">İletişim</span></a>')
    return '\n'.join(rows)


def foot_html():
    rows = []
    for f, en, tr, _, _ in PAGES:
        rows.append('      <a href="%s"><span lang="en">%s</span><span lang="tr">%s</span></a>' % (f, en, tr))
    return '\n'.join(rows)


def build():
    made = []
    for f, en, tr, title_en, title_tr in PAGES:
        src = os.path.join(PAGE_DIR, f)
        if not os.path.exists(src):
            print('  ! missing', src)
            continue
        content = io.open(src, encoding='utf-8').read()
        extra = ''
        if 'data-tool="library"' in content:
            extra += '<script src="assets/library.js"></script>\n'
        if 'data-tool' in content:
            extra += '<script src="assets/tools.js"></script>\n'
        html = SHELL.format(
            title_en=title_en, description=DESCRIPTIONS.get(f, ''), file=f,
            favicon=FAVICON, navlinks=nav_html(f), footlinks=foot_html(),
            content=content.rstrip() + '\n', extra_scripts=extra)
        out = os.path.join(SITE, f)
        io.open(out, 'w', encoding='utf-8').write(html)
        made.append((f, len(html)))
    for f, n in made:
        print('  %-16s %6d bytes' % (f, n))
    print('%d pages built' % len(made))


if __name__ == '__main__':
    build()
