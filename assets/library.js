/* ============================================================
   The resource library.

   ADDING A RESOURCE — copy one entry, change the fields, done.
   The page rebuilds its filters from whatever is in this list,
   so a new format, skill or level appears as a filter chip by itself.

   {
     title:  { en: '…', tr: '…' },        // required
     note:   { en: '…', tr: '…' },        // one sentence: what it is and who it helps
     format: 'sheet' | 'pdf' | 'podcast' | 'video' | 'film' | 'site' | 'test' | 'book',
     skills: ['listening','speaking','reading','writing','vocabulary','grammar','technique'],
     levels: ['A2','B1','B2','C1','C2'],  // the levels it genuinely suits
     exams:  ['TOEFL','IELTS','GRE','SAT','YDS','…'],   // optional, [] if general
     href:   'https://…'  or  '#r-cue'    // an external link, or an anchor on this page
   }

   Keep `note` honest and short. A library of two hundred links nobody can
   choose between is worse than thirty a student can.
   ============================================================ */

window.NM_LIBRARY = [

  /* ---- my own printable sheets (they open further down this page) ---- */
  { title: { en: '30 IELTS Speaking Part 2 cue cards', tr: '30 IELTS Speaking Part 2 konuşma kartı' },
    note:  { en: 'One card, one minute to plan, two minutes to talk. Record yourself.',
             tr: 'Bir kart, planlamak için bir dakika, konuşmak için iki dakika. Kendinizi kaydedin.' },
    format: 'sheet', skills: ['speaking'], levels: ['B1','B2','C1'], exams: ['IELTS'], href: '#r-cue' },

  { title: { en: '40 academic word families', tr: '40 akademik kelime ailesi' },
    note:  { en: 'Verb, noun and adjective side by side — learn the family, not the word.',
             tr: 'Fiil, isim ve sıfat yan yana — kelimeyi değil, aileyi öğrenin.' },
    format: 'sheet', skills: ['vocabulary','writing'], levels: ['B2','C1','C2'], exams: ['TOEFL','IELTS','GRE','YDS'], href: '#r-words' },

  { title: { en: '25 mistakes Turkish speakers make most', tr: 'Türkçe konuşanların en sık yaptığı 25 hata' },
    note:  { en: 'Wrong, right, and why — the errors I mark most often, in that order.',
             tr: 'Yanlış, doğru ve neden — en sık işaretlediğim hatalar, bu sırayla.' },
    format: 'sheet', skills: ['grammar','writing'], levels: ['A2','B1','B2'], exams: [], href: '#r-errors' },

  { title: { en: 'Essay and statement structures', tr: 'Deneme ve niyet metni yapıları' },
    note:  { en: 'IELTS Task 2 in four paragraphs, and a statement of purpose in five.',
             tr: 'Dört paragrafta IELTS Task 2 ve beş paragrafta amaç beyanı.' },
    format: 'sheet', skills: ['writing','technique'], levels: ['B2','C1'], exams: ['IELTS','TOEFL','GRE'], href: '#r-essay' },

  { title: { en: 'Vocabulary notebook & reading log', tr: 'Kelime defteri ve okuma günlüğü' },
    note:  { en: 'A printable template. The column for your own sentence is the one that matters.',
             tr: 'Yazdırılabilir şablon. Önemli olan, kendi cümlenizi yazdığınız sütundur.' },
    format: 'sheet', skills: ['vocabulary','reading'], levels: ['A2','B1','B2','C1'], exams: [], href: '#r-notebook' },

  { title: { en: 'Erasmus+ and eTwinning starter checklist', tr: 'Erasmus+ ve eTwinning başlangıç listesi' },
    note:  { en: 'For teachers running a first international project — eight steps, in order.',
             tr: 'İlk uluslararası projesini yürüten öğretmenler için — sekiz adım, sırayla.' },
    format: 'sheet', skills: ['writing'], levels: ['B2','C1'], exams: [], href: '#r-erasmus' },

  /* ---- free material published by the examination boards ---- */
  { title: { en: 'ETS — official TOEFL iBT preparation', tr: 'ETS — resmî TOEFL iBT hazırlığı' },
    note:  { en: 'Free sample questions and a full practice test from the people who write the exam.',
             tr: 'Sınavı yazanlardan ücretsiz örnek sorular ve tam bir deneme sınavı.' },
    format: 'test', skills: ['reading','listening','writing','speaking'], levels: ['B1','B2','C1'], exams: ['TOEFL'], href: 'https://www.ets.org/toefl' },

  { title: { en: 'IELTS — official free practice materials', tr: 'IELTS — resmî ücretsiz alıştırma materyalleri' },
    note:  { en: 'Sample papers for Academic and General Training, with answer keys and band descriptors.',
             tr: 'Academic ve General Training için örnek sınavlar; cevap anahtarı ve puan ölçütleriyle.' },
    format: 'test', skills: ['reading','listening','writing','speaking'], levels: ['B1','B2','C1'], exams: ['IELTS'], href: 'https://ielts.org/take-a-test/preparation-resources' },

  { title: { en: 'Cambridge English — free preparation materials', tr: 'Cambridge English — ücretsiz hazırlık materyalleri' },
    note:  { en: 'Past papers, wordlists and speaking test videos for KET, PET, FCE, CAE and CPE.',
             tr: 'KET, PET, FCE, CAE ve CPE için çıkmış sınavlar, kelime listeleri ve konuşma sınavı videoları.' },
    format: 'test', skills: ['reading','listening','writing','speaking'], levels: ['A2','B1','B2','C1','C2'], exams: ['Cambridge'], href: 'https://www.cambridgeenglish.org/exams-and-tests/' },

  { title: { en: 'Khan Academy — official SAT practice', tr: 'Khan Academy — resmî SAT alıştırmaları' },
    note:  { en: 'Built with the College Board. Full digital SAT practice tests, free.',
             tr: 'College Board ile birlikte hazırlandı. Tam dijital SAT denemeleri, ücretsiz.' },
    format: 'test', skills: ['reading','grammar','technique'], levels: ['B2','C1'], exams: ['SAT'], href: 'https://www.khanacademy.org/digital-sat' },

  { title: { en: 'ÖSYM — YDS and YÖKDİL past papers', tr: 'ÖSYM — YDS ve YÖKDİL çıkmış sınavlar' },
    note:  { en: 'Every past paper and answer key, published by the examination authority itself.',
             tr: 'Sınavı yapan kurumun kendi yayımladığı bütün çıkmış sınavlar ve cevap anahtarları.' },
    format: 'test', skills: ['reading','grammar','vocabulary'], levels: ['B1','B2','C1'], exams: ['YDS','YÖKDİL'], href: 'https://www.osym.gov.tr/' },

  /* ---- listening ---- */
  { title: { en: 'BBC Learning English', tr: 'BBC Learning English' },
    note:  { en: 'Short daily episodes with transcripts. The transcript is the point — listen twice, then read.',
             tr: 'Metin dökümüyle kısa günlük bölümler. Asıl olan döküm — iki kez dinleyin, sonra okuyun.' },
    format: 'podcast', skills: ['listening','vocabulary'], levels: ['A2','B1','B2'], exams: [], href: 'https://www.bbc.co.uk/learningenglish' },

  { title: { en: 'VOA Learning English', tr: 'VOA Learning English' },
    note:  { en: 'News read at a deliberately slower speed, with the text alongside. Good for the B1 plateau.',
             tr: 'Bilinçli olarak yavaş okunan haberler, metniyle birlikte. B1 platosu için iyi.' },
    format: 'podcast', skills: ['listening','reading'], levels: ['A2','B1'], exams: [], href: 'https://learningenglish.voanews.com/' },

  { title: { en: 'TED Talks', tr: 'TED Talks' },
    note:  { en: 'Lecture-length academic listening with interactive transcripts — the closest free thing to a TOEFL lecture.',
             tr: 'Etkileşimli dökümlü, ders uzunluğunda akademik dinleme — TOEFL dersine en yakın ücretsiz kaynak.' },
    format: 'video', skills: ['listening','vocabulary'], levels: ['B2','C1','C2'], exams: ['TOEFL','IELTS'], href: 'https://www.ted.com/talks' },

  /* ---- reading & reference ---- */
  { title: { en: 'British Council — LearnEnglish', tr: 'British Council — LearnEnglish' },
    note:  { en: 'Graded reading and grammar explanations organised by CEFR level, with exercises.',
             tr: 'Avrupa dil çerçevesine göre düzenlenmiş kademeli okuma ve dil bilgisi açıklamaları, alıştırmalarıyla.' },
    format: 'site', skills: ['reading','grammar'], levels: ['A2','B1','B2','C1'], exams: [], href: 'https://learnenglish.britishcouncil.org/' },

  { title: { en: 'Project Gutenberg', tr: 'Project Gutenberg' },
    note:  { en: 'Seventy thousand out-of-copyright books, free. Read one you already know in Turkish first.',
             tr: 'Telifi düşmüş yetmiş bin kitap, ücretsiz. Önce Türkçesini bildiğiniz bir kitabı okuyun.' },
    format: 'book', skills: ['reading','vocabulary'], levels: ['B2','C1','C2'], exams: [], href: 'https://www.gutenberg.org/' },

  { title: { en: "Oxford Learner's Dictionaries", tr: "Oxford Learner's Dictionaries" },
    note:  { en: 'A learner dictionary, not a translation dictionary — it shows the grammar pattern a word takes.',
             tr: 'Çeviri sözlüğü değil, öğrenen sözlüğü — bir kelimenin aldığı dil bilgisi kalıbını gösterir.' },
    format: 'site', skills: ['vocabulary','writing'], levels: ['A2','B1','B2','C1','C2'], exams: [], href: 'https://www.oxfordlearnersdictionaries.com/' },

  { title: { en: 'Merriam-Webster', tr: 'Merriam-Webster' },
    note:  { en: 'American usage and pronunciation, with the word-history notes that make GRE vocabulary stick.',
             tr: 'Amerikan kullanımı ve telaffuzu; GRE kelimelerini akılda tutan köken notlarıyla.' },
    format: 'site', skills: ['vocabulary'], levels: ['B2','C1','C2'], exams: ['GRE','SAT'], href: 'https://www.merriam-webster.com/' }

];
