/* Nilüfer Mısırlı — CV site interactions */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- theme ----------
     The stylesheet already resolves light, dark-by-OS and an explicit
     data-theme stamp on its own. Only stamp the root when the reader has
     made a choice here, so a host-supplied theme is never overridden. */
  var stored = null;
  try { stored = localStorage.getItem('nm-theme'); } catch (e) {}
  if (stored === 'dark' || stored === 'light') root.setAttribute('data-theme', stored);

  function currentTheme() {
    var stamped = root.getAttribute('data-theme');
    if (stamped === 'dark' || stamped === 'light') return stamped;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  var toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('nm-theme', next); } catch (e) {}
  });

  /* ---------- language ----------
     The stylesheet shows [lang="en"] or [lang="tr"] blocks from the root
     data-lang attribute, so switching is one attribute write. English is the
     unstamped default, which is also what a search engine and a no-JS
     visitor see. */
  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-lang') === 'tr' ? 'en' : 'tr';
      if (next === 'tr') { root.setAttribute('data-lang', 'tr'); root.lang = 'tr'; }
      else { root.removeAttribute('data-lang'); root.lang = 'en'; }
      try { localStorage.setItem('nm-lang', next); } catch (e) {}
      document.dispatchEvent(new CustomEvent('nm:langchange', { detail: next }));
    });
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var links = document.querySelector('.nav-links');
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- scroll: progress bar, nav state, back-to-top ---------- */
  var bar = document.getElementById('progress');
  var nav = document.getElementById('nav');
  var top = document.getElementById('to-top');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    nav.classList.toggle('scrolled', y > 12);
    top.classList.toggle('show', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  top.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 6, 5) * 45 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- scroll-spy ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll('.count');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(function (el) { el.textContent = '0'; });
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var target = parseInt(el.getAttribute('data-to'), 10) || 0;
        var start = null;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / 1100, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
