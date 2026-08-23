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
  /* Focus profiles are shared by exam family so the advice stays specific
     without repeating itself twenty-five times. */
  var FOCUS = {
    gradVerbal: {
      en: ['Vocabulary in families and in context — 35%. Passive recognition is not enough; these tests punish the almost-right word.',
           'Reading comprehension on dense argumentative passages — 30%. Speed on unfamiliar registers is the usual bottleneck.',
           'Argument structure — premise, assumption, conclusion — taught as analysis rather than as answer-elimination tricks — 25%.',
           'Timed full sections with an error log grouped by question type — 10%.'],
      tr: ['Aileler hâlinde ve bağlam içinde kelime — %35. Pasif tanıma yetmez; bu sınavlar “neredeyse doğru” kelimeyi cezalandırır.',
           'Yoğun tartışma metinlerinde okuduğunu anlama — %30. Alışılmadık dilde hız, olağan darboğazdır.',
           'Argüman yapısı — öncül, varsayım, sonuç — şık eleme taktiği olarak değil çözümleme olarak — %25.',
           'Soru tipine göre gruplanmış hata kaydıyla süreli tam bölümler — %10.']
    },
    sciVerbal: {
      en: ['Reading comprehension on humanities and social science passages — 45%. The science is not the problem; the register is.',
           'Reasoning beyond the text: inference, tone and author position — 30%.',
           'Pacing drills against the real section clock — 15%.',
           'Written argument where the test includes one — 10%.'],
      tr: ['Beşerî ve sosyal bilim metinlerinde okuduğunu anlama — %45. Sorun fen değil, dilin kendisidir.',
           'Metnin ötesinde muhakeme: çıkarım, ton ve yazarın konumu — %30.',
           'Gerçek bölüm süresine karşı tempo çalışması — %15.',
           'Sınavda varsa yazılı argüman — %10.']
    },
    ugAdmissions: {
      en: ['Evidence-based reading with the answer located in the text every time — 35%.',
           'Grammar and rhetoric of the writing module — 30%.',
           'Vocabulary in context, including the historical and founding documents — 20%.',
           'Timed sections from the first week; pacing is the skill being tested — 15%.'],
      tr: ['Cevabın her seferinde metinde bulunduğu kanıta dayalı okuma — %35.',
           'Yazma modülünün dil bilgisi ve retoriği — %30.',
           'Tarihî ve kurucu belgeler dahil, bağlam içinde kelime — %20.',
           'İlk haftadan süreli bölümler; ölçülen beceri tempodur — %15.']
    },
    fourSkill: {
      en: ['Writing — 35%. It is the paper that moves slowest and the one worth the most attention.',
           'Speaking, recorded and reviewed weekly against the official descriptors — 25%.',
           'Reading under strict time — 25%. Unfinished papers, not wrong answers, cost most candidates the score.',
           'Listening — 15%, with note-taking practised as a skill of its own.'],
      tr: ['Yazma — %35. En yavaş hareket eden ve en çok ilgiyi hak eden bölüm budur.',
           'Konuşma; haftalık kayıt ve resmî ölçütlere göre gözden geçirme — %25.',
           'Kesin süreyle okuma — %25. Adayların çoğu yanlış cevaptan değil, bitiremediği sınavdan puan kaybeder.',
           'Dinleme — %15; not tutma başlı başına bir beceri olarak çalışılır.']
    },
    integrated: {
      en: ['Integrated tasks — 40%. Read a passage, hear a lecture that contradicts it, and write or speak the relationship under time.',
           'Academic listening with structured note-taking — 25%.',
           'Reading speed and paraphrase recognition — 20%.',
           'Independent writing and timed typing — 15%.'],
      tr: ['Bütünleşik görevler — %40. Bir metni okuyun, onu çürüten bir dersi dinleyin ve ilişkiyi süre altında yazın ya da söyleyin.',
           'Yapılandırılmış not tutmayla akademik dinleme — %25.',
           'Okuma hızı ve başka sözcüklerle anlatımı tanıma — %20.',
           'Bağımsız yazma ve süreli klavye pratiği — %15.']
    },
    machineScored: {
      en: ['Fluency and pronunciation consistency — 35%. A machine rewards an even delivery in a way no human examiner would.',
           'Keyword coverage in spoken and written answers — 25%.',
           'Read-aloud and repeat-sentence drills, timed — 25%.',
           'Summarise-written-text practice against the word limit — 15%.'],
      tr: ['Akıcılık ve telaffuz tutarlılığı — %35. Makine, hiçbir insan değerlendiricinin ödüllendirmeyeceği biçimde dengeli anlatımı ödüllendirir.',
           'Sözlü ve yazılı cevaplarda anahtar kelime kapsamı — %25.',
           'Sesli okuma ve cümle tekrarı alıştırmaları, süreli — %25.',
           'Kelime sınırına karşı metin özetleme pratiği — %15.']
    },
    trExam: {
      en: ['Academic vocabulary in families — 35%. These exams are won on vocabulary.',
           'Advanced grammar and sentence completion — 30%.',
           'Paragraph coherence and closest-meaning items — 20%.',
           'Timed past papers with an error log by question type — 15%.'],
      tr: ['Aileler hâlinde akademik kelime — %35. Bu sınavlar kelimeyle kazanılır.',
           'İleri dil bilgisi ve cümle tamamlama — %30.',
           'Paragraf bütünlüğü ve en yakın anlam soruları — %20.',
           'Soru tipine göre hata kaydıyla süreli çıkmış sınavlar — %15.']
    },
    universityProf: {
      en: ['Timed academic reading, long texts — 30%. Reading speed is the usual bottleneck.',
           'Essay writing to the department rubric — 30%.',
           'Summary and paraphrase tasks — 25%.',
           'Listening to lecture-length input — 15%.'],
      tr: ['Süreli akademik okuma, uzun metinler — %30. Darboğaz genellikle okuma hızıdır.',
           'Bölüm ölçütüne göre deneme yazma — %30.',
           'Özetleme ve başka sözcüklerle anlatma görevleri — %25.',
           'Ders uzunluğunda dinleme — %15.']
    },
    workplace: {
      en: ['The business registers the test repeats — meetings, correspondence, announcements — 35%.',
           'Listening for detail at natural speed — 30%.',
           'Reading speed on short functional texts — 25%.',
           'Timed full papers — 10%.'],
      tr: ['Sınavın tekrar ettiği iş dilleri — toplantılar, yazışmalar, duyurular — %35.',
           'Doğal hızda ayrıntı için dinleme — %30.',
           'Kısa işlevsel metinlerde okuma hızı — %25.',
           'Süreli tam sınavlar — %10.']
    },
    medical: {
      en: ['Profession-specific writing — the referral letter — 35%. It is where most candidates lose the grade.',
           'Role-played consultations against the clinical communication criteria — 30%.',
           'Listening to consultations and case presentations — 20%.',
           'Reading medical texts at speed — 15%.'],
      tr: ['Mesleğe özgü yazma — sevk mektubu — %35. Çoğu aday notu burada kaybeder.',
           'Klinik iletişim ölçütlerine göre rol yapılan hasta görüşmeleri — %30.',
           'Hasta görüşmelerini ve vaka sunumlarını dinleme — %20.',
           'Tıbbi metinleri hızla okuma — %15.']
    },
    aviation: {
      en: ['Plain English under non-routine conditions — 40%. Standard phraseology is not what is being rated.',
           'Listening to accented radio transmissions with interference — 25%.',
           'The fluency, comprehension and interaction descriptors of the rating scale — 25%.',
           'Incident description and clarification strategies — 10%.'],
      tr: ['Rutin dışı durumlarda sade İngilizce — %40. Değerlendirilen şey standart terminoloji değildir.',
           'Aksanlı ve parazitli telsiz iletişimlerini dinleme — %25.',
           'Derecelendirme ölçeğinin akıcılık, anlama ve etkileşim ölçütleri — %25.',
           'Olay anlatımı ve netleştirme stratejileri — %10.']
    },
    youngLearners: {
      en: ['Speaking practice with the picture and interview task types — 30%.',
           'Vocabulary from the official wordlist for that level — 30%.',
           'Listening with the answer sheet used from the first lesson — 25%.',
           'Short writing tasks to the mark scheme — 15%.'],
      tr: ['Resim ve mülakat görev tipleriyle konuşma pratiği — %30.',
           'O seviyenin resmî kelime listesinden kelime — %30.',
           'İlk dersten itibaren cevap kâğıdı kullanılarak dinleme — %25.',
           'Puanlama ölçütüne göre kısa yazma görevleri — %15.']
    },
    schoolTerm: {
      en: ['The unit the school is on, taught properly rather than revised — 40%.',
           'Exam technique for how that unit will be tested — 30%.',
           'Extended writing or speaking so the grammar has somewhere to go — 20%.',
           'Vocabulary kept in a notebook with the student’s own sentences — 10%.'],
      tr: ['Okulun işlediği ünite — tekrar edilerek değil, düzgünce öğretilerek — %40.',
           'O ünitenin nasıl sınanacağına dair sınav tekniği — %30.',
           'Dil bilgisinin gidecek bir yeri olsun diye uzun yazma ya da konuşma — %20.',
           'Öğrencinin kendi cümleleriyle tuttuğu kelime defteri — %10.']
    }
  };

  function ex(label, group, steps, hoursPerStep, focus, unitEn, unitTr, labelTr) {
    return { label: label, labelTr: labelTr || label, group: group, steps: steps,
             hoursPerStep: hoursPerStep, focusEn: FOCUS[focus].en, focusTr: FOCUS[focus].tr,
             unitEn: unitEn || '', unitTr: unitTr || '' };
  }
  function examLabel(e) { return isTR() ? e.labelTr : e.label; }

  var GROUPS = {
    grad:   { en: 'Graduate & professional admissions', tr: 'Lisansüstü ve mesleki giriş' },
    ug:     { en: 'Undergraduate admissions',           tr: 'Lisans giriş' },
    prof:   { en: 'English proficiency',                tr: 'İngilizce yeterlilik' },
    camb:   { en: 'Cambridge English',                  tr: 'Cambridge English' },
    tr:     { en: 'Türkiye',                            tr: 'Türkiye' },
    spec:   { en: 'Professional & specialist',          tr: 'Mesleki ve uzmanlık' },
    school: { en: 'School',                             tr: 'Okul' }
  };

  var EXAMS = {
    /* graduate & professional admissions */
    gre:      ex('GRE Verbal Reasoning',      'grad', ['145','150','155','160','165','170'], 100, 'gradVerbal', 'scaled score', 'ölçekli puan'),
    grewrite: ex('GRE Analytical Writing',    'grad', ['2.5','3.0','3.5','4.0','4.5','5.0','5.5','6.0'], 55, 'gradVerbal', 'score', 'puan', 'GRE Analitik Yazma'),
    gmat:     ex('GMAT Focus — Verbal',       'grad', ['70','74','78','82','86','90'], 90, 'gradVerbal', 'section score', 'bölüm puanı'),
    lsat:     ex('LSAT',                      'grad', ['140','145','150','155','160','165','170','175'], 85, 'gradVerbal', 'scaled score', 'ölçekli puan'),
    mcat:     ex('MCAT — CARS section',       'grad', ['118','120','122','124','126','128','130','132'], 80, 'sciVerbal', 'section score', 'bölüm puanı', 'MCAT — CARS bölümü'),
    dat:      ex('DAT — Reading Comprehension','grad', ['15','18','21','24','27','30'], 60, 'sciVerbal', 'scaled score', 'ölçekli puan', 'DAT — Okuduğunu Anlama'),
    oat:      ex('OAT — Reading Comprehension','grad', ['300','320','340','360','380','400'], 60, 'sciVerbal', 'scaled score', 'ölçekli puan', 'OAT — Okuduğunu Anlama'),
    usmle:    ex('USMLE — verbal readiness',  'grad', ['well below','just below','borderline','comfortable','strong'], 70, 'sciVerbal', '', '', 'USMLE — sözel hazırlık'),
    cat:      ex('CAT — VARC',                'grad', ['60','70','80','85','90','95','99'], 70, 'gradVerbal', 'percentile', 'yüzdelik'),

    /* undergraduate admissions */
    sat:      ex('SAT — Reading & Writing',   'ug', ['400','440','480','520','560','600','640','680','720','760'], 30, 'ugAdmissions', 'section score', 'bölüm puanı', 'SAT — Okuma ve Yazma'),
    act:      ex('ACT — English & Reading',   'ug', ['16','18','20','22','24','26','28','30','32','34','36'], 35, 'ugAdmissions', 'scaled score', 'ölçekli puan', 'ACT — İngilizce ve Okuma'),
    ap:       ex('AP English Lang. / Lit.',   'ug', ['1','2','3','4','5'], 70, 'ugAdmissions', 'grade', 'not'),

    /* english proficiency */
    toefl:    ex('TOEFL iBT',                 'prof', ['45','55','65','75','85','95','105','115'], 85, 'integrated', 'total score', 'toplam puan'),
    ielts:    ex('IELTS Academic / General',  'prof', ['4.5','5.0','5.5','6.0','6.5','7.0','7.5','8.0','8.5'], 90, 'fourSkill', 'band', 'bant', 'IELTS Academic / General'),
    pte:      ex('PTE Academic',              'prof', ['30','40','50','60','70','80','90'], 80, 'machineScored', 'overall score', 'genel puan'),
    itep:     ex('iTEP',                      'prof', ['2.5','3.0','3.5','4.0','4.5','5.0','5.5','6.0'], 70, 'fourSkill', 'level', 'seviye'),
    linguaskill: ex('Linguaskill / BULATS',   'prof', ['100','110','120','130','140','150','160','170','180'], 70, 'fourSkill', 'Cambridge scale', 'Cambridge ölçeği'),

    /* cambridge english */
    cambridge: ex('Cambridge FCE / CAE / CPE','camb', ['150','160','170','180','190','200','210','220'], 90, 'fourSkill', 'Cambridge scale', 'Cambridge ölçeği'),
    yle:       ex('Cambridge YLE / KET / PET','camb', ['110','120','130','140','150','160','170'], 60, 'youngLearners', 'Cambridge scale', 'Cambridge ölçeği'),
    bec:       ex('Cambridge BEC / ILEC / ICFE','camb', ['150','160','170','180','190','200','210'], 80, 'workplace', 'Cambridge scale', 'Cambridge ölçeği'),

    /* türkiye */
    yds:      ex('YDS / YÖKDİL / ÜDS',        'tr', ['30','40','50','60','70','80','90'], 70, 'trExam', 'score', 'puan'),
    ydt:      ex('YKS — YDT',                 'tr', ['20','30','40','50','60','70','80'], 60, 'trExam', 'net', 'net'),
    profexam: ex('METU / Bilkent proficiency','tr', ['well below the pass','just below the pass','borderline','a safe pass','a comfortable pass'], 80, 'universityProf', '', '', 'ODTÜ / Bilkent yeterlilik'),

    /* professional & specialist */
    toeic:    ex('TOEIC Listening & Reading', 'spec', ['400','500','600','700','800','900','990'], 60, 'workplace', 'total score', 'toplam puan', 'TOEIC Dinleme ve Okuma'),
    oet:      ex('OET',                       'spec', ['200','250','300','350','400','450'], 70, 'medical', 'sub-test score', 'alt test puanı'),
    icao:     ex('ICAO Aviation English',     'spec', ['3','4','5','6'], 110, 'aviation', 'operational level', 'operasyonel seviye', 'ICAO Havacılık İngilizcesi'),
    torfl:    ex('TORFL (Russian)',           'spec', ['A1','A2','B1','B2','C1','C2'], 180, 'fourSkill', 'level', 'seviye', 'TORFL (Rusça)'),

    /* school */
    school:   ex('School English — term grade','school', ['40','50','60','70','80','90','100'], 25, 'schoolTerm', 'out of 100', '100 üzerinden', 'Okul İngilizcesi — dönem notu')
  };

  function initPlanner(root) {
    var examEl = root.querySelector('[data-role="exam"]');
    var fromEl = root.querySelector('[data-role="from"]');
    var toEl = root.querySelector('[data-role="to"]');
    var hoursEl = root.querySelector('[data-role="hours"]');
    var out = root.querySelector('[data-role="out"]');

    function fillExams() {
      var order = ['grad', 'ug', 'prof', 'camb', 'tr', 'spec', 'school'];
      var keep = examEl.value;
      examEl.innerHTML = '';
      order.forEach(function (g) {
        var og = document.createElement('optgroup');
        og.label = isTR() ? GROUPS[g].tr : GROUPS[g].en;
        Object.keys(EXAMS).forEach(function (k) {
          if (EXAMS[k].group !== g) return;
          var o = document.createElement('option');
          o.value = k; o.textContent = examLabel(EXAMS[k]);
          og.appendChild(o);
        });
        if (og.children.length) examEl.appendChild(og);
      });
      examEl.value = (keep && EXAMS[keep]) ? keep : 'toefl';
    }

    function fillSteps() {
      var ex = EXAMS[examEl.value];
      var unit = isTR() ? ex.unitTr : ex.unitEn;
      root.querySelectorAll('[data-role="unit"]').forEach(function (u) {
        u.textContent = unit ? ' (' + unit + ')' : '';
      });
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
            ? examLabel(ex) + ' — <strong>' + ex.steps[from] + '</strong> seviyesinden <strong>' + ex.steps[to] +
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
    document.addEventListener('nm:langchange', function () { fillExams(); fillSteps(); calc(); });
    fillExams(); fillSteps(); calc();
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


  /* ------------------------------------------------------------------ *
   * Resource library — filters build themselves from the data
   * ------------------------------------------------------------------ */
  var FORMAT = {
    sheet:   { en: 'Printable sheet', tr: 'Yazdırılabilir sayfa' },
    pdf:     { en: 'PDF',             tr: 'PDF' },
    podcast: { en: 'Podcast',         tr: 'Podcast' },
    video:   { en: 'Video',           tr: 'Video' },
    film:    { en: 'Film & TV',       tr: 'Film ve dizi' },
    site:    { en: 'Website',         tr: 'Web sitesi' },
    test:    { en: 'Practice test',   tr: 'Deneme sınavı' },
    book:    { en: 'Book',            tr: 'Kitap' }
  };
  var SKILL = {
    listening:  { en: 'Listening',      tr: 'Dinleme' },
    speaking:   { en: 'Speaking',       tr: 'Konuşma' },
    reading:    { en: 'Reading',        tr: 'Okuma' },
    writing:    { en: 'Writing',        tr: 'Yazma' },
    vocabulary: { en: 'Vocabulary',     tr: 'Kelime' },
    grammar:    { en: 'Grammar',        tr: 'Dil bilgisi' },
    technique:  { en: 'Exam technique', tr: 'Sınav tekniği' }
  };

  function initLibrary(root) {
    var data = window.NM_LIBRARY || [];
    var barEl = root.querySelector('[data-role="filters"]');
    var gridEl = root.querySelector('[data-role="grid"]');
    var countEl = root.querySelector('[data-role="count"]');
    var picked = { format: [], skills: [], levels: [] };

    function values(field) {
      var seen = [];
      data.forEach(function (d) {
        var v = d[field];
        (Array.isArray(v) ? v : [v]).forEach(function (x) { if (x && seen.indexOf(x) < 0) seen.push(x); });
      });
      return seen;
    }
    function labelFor(field, key) {
      if (field === 'format') return FORMAT[key] ? (isTR() ? FORMAT[key].tr : FORMAT[key].en) : key;
      if (field === 'skills') return SKILL[key] ? (isTR() ? SKILL[key].tr : SKILL[key].en) : key;
      return key;
    }

    function matches(d) {
      function ok(field, sel) {
        if (!sel.length) return true;
        var v = d[field]; v = Array.isArray(v) ? v : [v];
        return sel.some(function (x) { return v.indexOf(x) >= 0; });
      }
      return ok('format', picked.format) && ok('skills', picked.skills) && ok('levels', picked.levels);
    }

    function renderGrid() {
      var shown = data.filter(matches);
      gridEl.innerHTML = '';
      shown.forEach(function (d) {
        var external = /^https?:/.test(d.href);
        var a = document.createElement('a');
        a.className = 'lib-card';
        a.href = d.href;
        if (external) { a.target = '_blank'; a.rel = 'noopener'; }
        var tags = (d.skills || []).map(function (k) { return labelFor('skills', k); })
          .concat(d.levels || []).concat(d.exams || []);
        a.innerHTML =
          '<span class="lib-format">' + labelFor('format', d.format) + '</span>' +
          '<span class="lib-title">' + (isTR() ? d.title.tr : d.title.en) + '</span>' +
          '<span class="lib-note">' + (isTR() ? d.note.tr : d.note.en) + '</span>' +
          '<span class="lib-tags">' + tags.map(function (t) { return '<em>' + t + '</em>'; }).join('') + '</span>' +
          '<span class="lib-go">' + (external ? '↗' : '↓') + '</span>';
        gridEl.appendChild(a);
      });
      countEl.textContent = shown.length + ' / ' + data.length;
      if (!shown.length) {
        gridEl.innerHTML = '<p class="lib-empty">' +
          t('Nothing matches that combination yet. Clear a filter, or tell me what is missing and I will write it.',
            'Bu birleşimle eşleşen bir şey henüz yok. Bir filtreyi kaldırın ya da eksik olanı söyleyin, yazayım.') + '</p>';
      }
    }

    function renderFilters() {
      barEl.innerHTML = '';
      [['format', t('Format', 'Biçim')],
       ['skills', t('Skill', 'Beceri')],
       ['levels', t('Level', 'Seviye')]].forEach(function (pair) {
        var field = pair[0];
        var row = document.createElement('div');
        row.className = 'lib-facet';
        row.innerHTML = '<span class="lib-facet-name">' + pair[1] + '</span>';
        var wrap = document.createElement('div');
        wrap.className = 'lib-chips';
        values(field).forEach(function (v) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'chip-btn' + (picked[field].indexOf(v) >= 0 ? ' on' : '');
          b.textContent = labelFor(field, v);
          b.addEventListener('click', function () {
            var i = picked[field].indexOf(v);
            if (i >= 0) picked[field].splice(i, 1); else picked[field].push(v);
            renderFilters(); renderGrid();
          });
          wrap.appendChild(b);
        });
        row.appendChild(wrap);
        barEl.appendChild(row);
      });
      var clear = document.createElement('button');
      clear.type = 'button';
      clear.className = 'lib-clear';
      clear.textContent = t('Clear all filters', 'Tüm filtreleri temizle');
      clear.hidden = !(picked.format.length || picked.skills.length || picked.levels.length);
      clear.addEventListener('click', function () {
        picked = { format: [], skills: [], levels: [] }; renderFilters(); renderGrid();
      });
      barEl.appendChild(clear);
    }

    document.addEventListener('nm:langchange', function () { renderFilters(); renderGrid(); });
    renderFilters(); renderGrid();
  }

  /* ------------------------------------------------------------------ */
  document.querySelectorAll('[data-tool="level"]').forEach(initLevel);
  document.querySelectorAll('[data-tool="planner"]').forEach(initPlanner);
  document.querySelectorAll('[data-tool="contact"]').forEach(initContact);
  document.querySelectorAll('[data-tool="library"]').forEach(initLibrary);
  initPrint();
})();
