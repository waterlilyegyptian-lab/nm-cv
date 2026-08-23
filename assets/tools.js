/* Interactive tools: level check, exam planner, contact form, sheet printing.
   Everything runs in the browser; nothing is sent anywhere. */
(function () {
  'use strict';

  var isTR = function () { return document.documentElement.getAttribute('data-lang') === 'tr'; };
  function t(en, tr) { return isTR() ? tr : en; }

  /* ------------------------------------------------------------------ *
   * Level check
   * ------------------------------------------------------------------ */
  var QUESTIONS = [
    { q: 'She ____ to school every morning.', a: ['go', 'goes', 'going', 'is go'], c: 1 },
    { q: "There aren't ____ eggs left in the fridge.", a: ['some', 'much', 'any', 'a'], c: 2 },
    { q: 'If I ____ more time, I would learn Italian.', a: ['have', 'had', 'would have', 'will have'], c: 1 },
    { q: 'I am looking forward to ____ you next week.', a: ['see', 'seeing', 'saw', 'be seen'], c: 1 },
    { q: 'He has lived in Ankara ____ 2015.', a: ['for', 'from', 'since', 'during'], c: 2 },
    { q: '____ the heavy rain, the match went ahead.', a: ['Despite of', 'Although', 'Despite', 'However'], c: 2 },
    { q: 'By the time we arrived, the film ____.', a: ['started', 'has started', 'had started', 'was starting'], c: 2 },
    { q: 'The report, ____ was published in May, caused an argument.', a: ['that', 'which', 'what', 'who'], c: 1 },
    { q: 'Rarely ____ such a convincing argument.', a: ['I have heard', 'have I heard', 'I heard', 'did I heard'], c: 1 },
    { q: 'The proposal was rejected on the ____ that it was too costly.', a: ['reasons', 'grounds', 'causes', 'basis'], c: 1 },
    { q: 'Her explanation was so ____ that nobody could follow it.', a: ['convoluted', 'convincing', 'concise', 'considerate'], c: 0 },
    { q: 'Had the committee ____ earlier, the outcome might have been different.', a: ['intervene', 'intervened', 'to intervene', 'intervening'], c: 1 }
  ];

  var LEVELS = [
    { max: 3, name: 'A2', en: 'Elementary',
      adviceEn: 'You have the basics and you can handle familiar situations, but exam preparation now would be premature. Six to twelve weeks of general English first will make everything afterwards faster — and cheaper.',
      adviceTr: 'Temeliniz var ve tanıdık durumlarla baş edebiliyorsunuz, ancak şu anda sınav hazırlığı erken olur. Önce altı-on iki haftalık genel İngilizce, sonrasındaki her şeyi daha hızlı — ve daha ucuz — hâle getirir.',
      courseEn: 'General English, B1 route', courseTr: 'Genel İngilizce, B1 rotası' },
    { max: 6, name: 'B1', en: 'Intermediate',
      adviceEn: 'You can hold a conversation and read straightforward text. This is the earliest sensible starting point for IELTS, and a realistic first target is band 6.0 over about sixteen weeks.',
      adviceTr: 'Bir sohbeti sürdürebilir ve düz bir metni okuyabilirsiniz. IELTS için mantıklı en erken başlangıç noktası burasıdır; gerçekçi ilk hedef yaklaşık on altı haftada 6.0 puandır.',
      courseEn: 'IELTS preparation, or school English reinforcement', courseTr: 'IELTS hazırlık ya da okul İngilizcesi takviyesi' },
    { max: 9, name: 'B2', en: 'Upper intermediate',
      adviceEn: 'You are at the level most universities ask for. What separates you from a higher band now is usually accuracy under time pressure and academic register, not vocabulary — which is good news, because both respond quickly to focused work.',
      adviceTr: 'Çoğu üniversitenin istediği seviyedesiniz. Sizi daha yüksek bir puandan ayıran şey artık genellikle kelime değil, süre baskısı altındaki doğruluk ve akademik dildir — bu iyi haber, çünkü ikisi de odaklı çalışmaya hızlı yanıt verir.',
      courseEn: 'IELTS / TOEFL iBT, or university proficiency', courseTr: 'IELTS / TOEFL iBT ya da üniversite yeterlilik' },
    { max: 12, name: 'C1', en: 'Advanced',
      adviceEn: 'Strong. At this level the marks are lost in the exam, not in the language: task response, structure, and the specific thing each rubric rewards. A short, technique-focused course is usually enough.',
      adviceTr: 'Güçlü. Bu seviyede puanlar dilde değil sınavda kaybedilir: göreve verilen cevap, yapı ve her ölçütün ödüllendirdiği belirli şey. Genellikle kısa, teknik odaklı bir ders yeterlidir.',
      courseEn: 'Exam technique, academic writing and applications', courseTr: 'Sınav tekniği, akademik yazı ve başvurular' }
  ];

  function initLevel(root) {
    var idx = 0, answers = [];
    var start = root.querySelector('[data-role="start"]');
    var body = root.querySelector('[data-role="body"]');
    var result = root.querySelector('[data-role="result"]');
    var qEl = root.querySelector('[data-role="question"]');
    var optEl = root.querySelector('[data-role="options"]');
    var nEl = root.querySelector('[data-role="n"]');
    var barEl = root.querySelector('[data-role="bar"]');
    var backBtn = root.querySelector('[data-role="back"]');
    root.querySelector('[data-role="total"]').textContent = QUESTIONS.length;

    function render() {
      var q = QUESTIONS[idx];
      qEl.textContent = q.q;
      nEl.textContent = idx + 1;
      barEl.style.width = (idx / QUESTIONS.length * 100) + '%';
      backBtn.hidden = idx === 0;
      optEl.innerHTML = '';
      q.a.forEach(function (text, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'opt' + (answers[idx] === i ? ' picked' : '');
        b.textContent = text;
        b.addEventListener('click', function () { choose(i); });
        optEl.appendChild(b);
      });
    }

    function choose(i) {
      answers[idx] = i;
      if (idx < QUESTIONS.length - 1) { idx++; render(); }
      else { finish(); }
    }

    function finish() {
      var score = answers.reduce(function (n, a, i) { return n + (a === QUESTIONS[i].c ? 1 : 0); }, 0);
      var lv = LEVELS.filter(function (l) { return score <= l.max; })[0];
      body.hidden = true;
      result.hidden = false;
      root.querySelector('[data-role="level"]').textContent = lv.name + ' — ' + (isTR() ? lv.name : lv.en);
      root.querySelector('[data-role="score"]').textContent = score;
      root.querySelector('[data-role="advice"]').innerHTML =
        '<p>' + t(lv.adviceEn, lv.adviceTr) + '</p>' +
        '<p class="tool-course"><span>' + t('Course this points to', 'İşaret ettiği ders') + ':</span> <strong>' +
        t(lv.courseEn, lv.courseTr) + '</strong></p>';
      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    root.querySelector('[data-role="begin"]').addEventListener('click', function () {
      start.hidden = true; body.hidden = false; idx = 0; answers = []; render();
    });
    backBtn.addEventListener('click', function () { if (idx > 0) { idx--; render(); } });
    root.querySelector('[data-role="again"]').addEventListener('click', function () {
      result.hidden = true; start.hidden = false; idx = 0; answers = [];
    });
  }

  /* ------------------------------------------------------------------ *
   * Exam planner
   * ------------------------------------------------------------------ */
  var EXAMS = {
    ielts: {
      label: 'IELTS',
      steps: ['4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0'],
      hoursPerStep: 90,
      focusEn: ['Writing Task 2 — 35% of your study time; it is the paper that moves slowest.',
                'Speaking, recorded and reviewed weekly — 25%.',
                'Reading under strict time — 25%. Unfinished papers, not wrong answers, cost most candidates the band.',
                'Listening — 15%, with note-taking practised as a skill of its own.'],
      focusTr: ['Writing Task 2 — çalışma sürenizin %35\'i; en yavaş hareket eden bölüm budur.',
                'Speaking — haftalık kayıt ve gözden geçirme, %25.',
                'Reading — kesin süreyle %25. Adayların çoğu yanlış cevap yüzünden değil, bitiremediği sınav yüzünden puan kaybeder.',
                'Listening — %15; not tutma başlı başına bir beceri olarak çalışılır.']
    },
    toefl: {
      label: 'TOEFL iBT',
      steps: ['45', '55', '65', '75', '85', '95', '105'],
      hoursPerStep: 85,
      focusEn: ['Integrated tasks — 40%. This is where the marks leak on TOEFL.',
                'Academic listening with structured note-taking — 25%.',
                'Reading speed and paraphrase recognition — 20%.',
                'Independent writing and timed typing — 15%.'],
      focusTr: ['Bütünleşik görevler — %40. TOEFL\'da puan asıl burada kaçar.',
                'Yapılandırılmış not tutmayla akademik dinleme — %25.',
                'Okuma hızı ve başka sözcüklerle anlatımı tanıma — %20.',
                'Bağımsız yazma ve süreli klavye pratiği — %15.']
    },
    yds: {
      label: 'YDS / YÖKDİL',
      steps: ['30', '40', '50', '60', '70', '80', '90'],
      hoursPerStep: 70,
      focusEn: ['Academic vocabulary in families — 35%. This exam is won on vocabulary.',
                'Advanced grammar and sentence completion — 30%.',
                'Paragraph coherence and the closest-meaning items — 20%.',
                'Timed past papers with an error log by question type — 15%.'],
      focusTr: ['Aileler hâlinde akademik kelime — %35. Bu sınav kelimeyle kazanılır.',
                'İleri dil bilgisi ve cümle tamamlama — %30.',
                'Paragraf bütünlüğü ve en yakın anlam soruları — %20.',
                'Soru tipine göre hata kaydıyla süreli çıkmış sınavlar — %15.']
    },
    prof: {
      label: 'METU / Bilkent proficiency',
      steps: ['well below the pass', 'just below the pass', 'borderline', 'a safe pass', 'a comfortable pass'],
      hoursPerStep: 80,
      focusEn: ['Timed academic reading, long texts — 30%. Reading speed is the usual bottleneck.',
                'Essay writing to the department rubric — 30%.',
                'Summary and paraphrase tasks — 25%.',
                'Listening to lecture-length input — 15%.'],
      focusTr: ['Süreli akademik okuma, uzun metinler — %30. Darboğaz genellikle okuma hızıdır.',
                'Bölüm ölçütüne göre deneme yazma — %30.',
                'Özetleme ve başka sözcüklerle anlatma görevleri — %25.',
                'Ders uzunluğunda dinleme — %15.']
    }
  };

  function initPlanner(root) {
    var examEl = root.querySelector('[data-role="exam"]');
    var fromEl = root.querySelector('[data-role="from"]');
    var toEl = root.querySelector('[data-role="to"]');
    var hoursEl = root.querySelector('[data-role="hours"]');
    var out = root.querySelector('[data-role="out"]');

    function fillSteps() {
      var ex = EXAMS[examEl.value];
      [fromEl, toEl].forEach(function (sel, si) {
        sel.innerHTML = '';
        ex.steps.forEach(function (s, i) {
          var o = document.createElement('option');
          o.value = i; o.textContent = s;
          sel.appendChild(o);
        });
        sel.value = si === 0 ? Math.max(0, Math.floor(ex.steps.length / 3) - 1)
                             : Math.min(ex.steps.length - 1, Math.floor(ex.steps.length / 3) + 2);
      });
    }

    function calc() {
      var ex = EXAMS[examEl.value];
      var from = parseInt(fromEl.value, 10), to = parseInt(toEl.value, 10);
      var hours = Math.max(2, Math.min(30, parseInt(hoursEl.value, 10) || 6));
      var steps = to - from;

      if (steps <= 0) {
        out.innerHTML = '<p class="plan-warn">' +
          t('Your target is at or below where you already are. Pick a higher target — or, if the score is already enough, spend the time on exam technique rather than on language.',
            'Hedefiniz, hâlihazırda bulunduğunuz yerde ya da altında. Daha yüksek bir hedef seçin — puan zaten yetiyorsa süreyi dile değil sınav tekniğine ayırın.') + '</p>';
        return;
      }

      var total = steps * ex.hoursPerStep;
      var effective = hours > 15 ? 15 + (hours - 15) * 0.6 : hours; // diminishing returns
      var weeks = Math.ceil(total / effective);
      var lessons = Math.max(1, Math.round(weeks * (hours >= 8 ? 2 : 1)));

      var notes = [];
      if (weeks > 52) notes.push(t('That is more than a year. Either raise the weekly hours, move the date, or split the target into two exam attempts — all three are normal.',
                                   'Bu bir yıldan uzun. Ya haftalık saati artırın, ya tarihi öteleyin, ya da hedefi iki sınav denemesine bölün — üçü de olağandır.'));
      if (hours > 15) notes.push(t('Above about fifteen hours a week the returns fall off sharply; the estimate above already allows for that.',
                                   'Haftada yaklaşık on beş saatin üzerinde verim belirgin biçimde düşer; yukarıdaki tahmin bunu zaten hesaba katıyor.'));
      if (hours < 4) notes.push(t('Under four hours a week, progress is real but slow, and long gaps between sessions undo part of each one.',
                                  'Haftada dört saatin altında ilerleme gerçektir ama yavaştır; oturumlar arasındaki uzun boşluklar her birinin bir kısmını geri alır.'));

      out.innerHTML =
        '<div class="plan-head">' +
          '<div class="plan-big"><strong>' + weeks + '</strong><span>' + t('weeks', 'hafta') + '</span></div>' +
          '<div class="plan-big"><strong>' + total + '</strong><span>' + t('study hours in total', 'toplam çalışma saati') + '</span></div>' +
          '<div class="plan-big"><strong>~' + lessons + '</strong><span>' + t('lessons with me', 'benimle ders') + '</span></div>' +
        '</div>' +
        '<p class="plan-line">' + (isTR()
            ? ex.label + ' — <strong>' + ex.steps[from] + '</strong> seviyesinden <strong>' + ex.steps[to] +
              '</strong> seviyesine, haftada <strong>' + hours + '</strong> saat çalışarak.'
            : 'Moving from <strong>' + ex.steps[from] + '</strong> to <strong>' + ex.steps[to] +
              '</strong> on ' + ex.label + ', at <strong>' + hours + '</strong> hours a week.') + '</p>' +
        '<p class="plan-sub">' + t('Where those hours should go', 'Bu saatler nereye gitmeli') + '</p>' +
        '<ul class="plan-focus"><li>' + (isTR() ? ex.focusTr : ex.focusEn).join('</li><li>') + '</li></ul>' +
        (notes.length ? '<p class="plan-warn">' + notes.join(' ') + '</p>' : '') +
        '<p class="plan-fine">' + t('An estimate from the same figures I use in a first meeting, not a promise. Starting level, consistency and how much English you meet outside study all move it.',
                                    'İlk görüşmede kullandığım rakamlardan çıkan bir tahmindir, bir vaat değil. Başlangıç seviyesi, düzenlilik ve çalışma dışında ne kadar İngilizceyle karşılaştığınız bunu değiştirir.') + '</p>';
    }

    examEl.addEventListener('change', function () { fillSteps(); calc(); });
    [fromEl, toEl, hoursEl].forEach(function (el) {
      el.addEventListener('change', calc); el.addEventListener('input', calc);
    });
    document.addEventListener('nm:langchange', calc);
    fillSteps(); calc();
  }

  /* ------------------------------------------------------------------ *
   * Contact form → the visitor's own mail application
   * ------------------------------------------------------------------ */
  function initContact(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var name = (d.get('name') || '').toString().trim();
      if (!name) { form.querySelector('[name="name"]').focus(); return; }

      var lines = [
        t('Name', 'Ad') + ': ' + name,
        t('Preparing for', 'Hazırlandığı') + ': ' + d.get('goal'),
        t('Target date', 'Hedef tarih') + ': ' + (d.get('date') || t('not decided', 'belirlenmedi')),
        t('Current level', 'Şu anki seviye') + ': ' + d.get('level'),
        t('Online lessons suit me', 'Çevrimiçi ders uygun') + ': ' + (d.get('online') ? t('yes', 'evet') : t('no', 'hayır')),
        '',
        (d.get('message') || '').toString().trim()
      ];
      var bodyText = lines.join('\n');
      var subject = t('Lesson enquiry', 'Ders talebi') + ' — ' + name + ' — ' + d.get('goal');

      var fb = form.querySelector('[data-role="fallback"]');
      fb.querySelector('[data-role="copy"]').value = bodyText;
      fb.hidden = false;

      window.location.href = 'mailto:waterlily.egyptian@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyText);
    });
  }

  /* ------------------------------------------------------------------ *
   * Print a single resource sheet
   * ------------------------------------------------------------------ */
  function initPrint() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-role="print"]');
      if (!btn) return;
      var sheet = btn.closest('[data-print]');
      if (!sheet) return;
      sheet.classList.add('print-me');
      document.body.classList.add('printing');
      var clean = function () {
        sheet.classList.remove('print-me');
        document.body.classList.remove('printing');
        window.removeEventListener('afterprint', clean);
      };
      window.addEventListener('afterprint', clean);
      window.print();
      setTimeout(clean, 2000);
    });
  }

  /* ------------------------------------------------------------------ */
  document.querySelectorAll('[data-tool="level"]').forEach(initLevel);
  document.querySelectorAll('[data-tool="planner"]').forEach(initPlanner);
  document.querySelectorAll('[data-tool="contact"]').forEach(initContact);
  initPrint();
})();
