/**
 * TIKOn Kesäkalenteri 2026 — script.js
 * Haaga-Helia TIKO Students' Summer Calendar
 *
 * Features:
 *  - 13 weekly doors (18.5.2026 – 2.9.2026)
 *  - Date-locked future weeks
 *  - LocalStorage persistence
 *  - Confetti on open
 *  - Animated canvas background
 *  - Random summer quote ticker
 *  - Easter egg (type "TIKO")
 *  - Modal with map link, video, audio
 *  - Progress tracker
 */

'use strict';

/* ─────────────────────────────────────────────
   SUMMER QUOTES
───────────────────────────────────────────── */
const QUOTES = [
  "Tiesitkö? Helsinki on Euroopan kauneimpia kaupunkeja",
  "Kesä ei kestä ikuisesti, toisinkuin Pasila!",
  "Tietojenkäsittely + Kesä. Täydellinen yhdistelmä!",
  "Aurinko voi odottaa. Koodi ei. Opiskele",
  "Opiskelijan paras budjettiloma: Mökki ja Grilli",
  "Helsingissä voi olla kesällä yllättävän sateista",
  "Joka viikko Uusi seikkailu!",
  "Yhteisöllisyys kasvaa ryhmätöissä!",
  "Kesäloma on se aika jolloin opit eniten itsestäsi.",
  "Löydä se oma lempirantasi",
  "Jäätelö Kauppatorilla. Varo Lokkeja!",
  "Pyöräile, Ui, Nauti",
  "Parhaat muistot syntyvät vahingossa",
  "Suomalainen kesä: 24h valoisaa, 2h aurinkoista.",
  "Avaa luukku, löydä seikkailu! - Davan",
];

/* ─────────────────────────────────────────────
   DOOR DATA — 13 weeks of summer
   Each week starts on MONDAY.
   Summer 2026: Week 1 starts Mon 18 May.
   Replace image URLs, descriptions etc. with
   your team's real content!
───────────────────────────────────────────── */
const DOORS = [
  {
    week:        1,
    weekStart:   new Date(2026, 4, 18),
    weekEnd:     new Date(2026, 4, 24),
    title:       "Kauppatorin Auringonnousu",
    emoji:       "🌅",
    category:    "Kokemus",
    description: "Herää ennen auringonnousua, ja kävele keskustaan katsomaan Helsingin aamuista aurinkoa! Ota mukaan termos kahvia, ja mene istumaan laiturille. Ilmainen, ja unohtumaton aloitus kesälle!",
    location:    "Kauppatori, Helsinki",
    mapUrl:      "https://maps.google.com/?q=Kauppatori,Helsinki",
    image:       "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    recommender: "",
    audioIdea:   "Merimaisema – lokkien äänet",
    videoUrl:    "",
    bgColor:     "#FF6B35",
    specialEffect: "Aurinkolasit-emoji räjähtää näytöllä! 😎",
    tags:        ["Ilmainen", "Aamu", "Helsinki"],
  },
  {
    week:        2,
    weekStart:   new Date(2026, 4, 25),
    weekEnd:     new Date(2026, 4, 31),
    title:       "Kallion Kattobaari-Ilta",
    emoji:       "🍹",
    category:    "Yöelämä",
    description: "Kallio on Helsingin coolein kaupunginosa, ja kesällä se herää eloon kattobaareissa. Kokeile Telakka Rooftopia, tai Korjaamon terassia! Ota frendit mukaan, ja viritä todellinen kesätunnelma!",
    location:    "Kallio, Helsinki",
    mapUrl:      "https://maps.google.com/?q=Kallio,Helsinki",
    image:       "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    recommender: "Sofia",
    audioIdea:   "Lofi chill – kattobaari-vibes",
    videoUrl:    "",
    bgColor:     "#A855F7",
    specialEffect: "Konfetti-räjähdys avatessa 🎊",
    tags:        ["Terassi", "Kallio", "Kesäilta"],
  },
  {
    week:        3,
    weekStart:   new Date(2026, 5, 1),
    weekEnd:     new Date(2026, 5, 7),
    title:       "SUP-lautailua Suomenlinnassa",
    emoji:       "🏄",
    category:    "Urheilu",
    description: "Vuokraa Sup-lauta Hakaniemestä, ja ota lautta, tai suppaile Suomenlinnaan. Reitti on helppo, maisema mahtava, ja seikkailu taattu! Vuokra on vain n.20e/tunti.",
    location:    "Hakaniemenranta → Suomenlinna",
    mapUrl:      "https://maps.google.com/?q=Suomenlinna,Helsinki",
    image:       "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80",
    recommender: "",
    audioIdea:   "Aaltojen äänet + reggae-beat",
    videoUrl:    "",
    bgColor:     "#0EA5E9",
    specialEffect: "Sininen vesiefekti avautuu modaalissa 💧",
    tags:        ["Urheilu", "Vesi", "Seikkailu"],
  },
  {
    week:        4,
    weekStart:   new Date(2026, 5, 8),
    weekEnd:     new Date(2026, 5, 14),
    title:       "Juhannusaatto Nuuksion Luonnossa",
    emoji:       "🌲",
    category:    "Luonto",
    description: "Juhannusaatto on Suomen tärkeimpiä päiviä. Opiskelijalle Nuuksio lienee se luonnollisin paikka tänä tärkeänä päivänä. Leiriydy, paista makkaraa, ja lähde soutelemaan. Nuuksioon pääsee HSL lipulla.",
    location:    "Nuuksion kansallispuisto, Espoo",
    mapUrl:      "https://maps.google.com/?q=Nuuksio+National+Park",
    image:       "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    recommender: "Arno",
    audioIdea:   "Nuotio & luontoäänet – rauhoittava",
    videoUrl:    "",
    bgColor:     "#22C55E",
    specialEffect: "Nuotio-animaatio vilkkuu modaalissa 🔥",
    tags:        ["Luonto", "Juhannus", "Retki"],
  },
  {
    week:        5,
    weekStart:   new Date(2026, 5, 15),
    weekEnd:     new Date(2026, 5, 21),
    title:       "Flow Festival Etukäteistunnelma",
    emoji:       "🎶",
    category:    "Musiikki",
    description: "Flow Festival on yksi Pohjoismaiden suurimmista festivaaleista. Jos sinulla ei ole varaa lippuun, voit kuunnella aidan ulkopuolelta! Bongaa artisteja, (tai ainakin muita opiskelijoita), ja nauti tunnelmasta.",
    location:    "Suvilahti, Helsinki",
    mapUrl:      "https://maps.google.com/?q=Suvilahti,Helsinki",
    image:       "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    recommender: "",
    audioIdea:   "Indie pop playlist – festival mood",
    videoUrl:    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    bgColor:     "#EC4899",
    specialEffect: "Musiikkinootit tanssivat näytöllä 🎵",
    tags:        ["Festivaali", "Musiikki", "Suvilahti"],
  },
  {
    week:        6,
    weekStart:   new Date(2026, 5, 22),
    weekEnd:     new Date(2026, 5, 28),
    title:       "Tampereen Pyhäjärvi-Päivä",
    emoji:       "🏊",
    category:    "Kaupunkikokemus",
    description: "Hyppää junaan, ja suuntaa Tampereelle. Pyhäjärvi, ja parhaat munkit Suomessa. Kiipeä Näsinneulaan, ja katsele maisemia.",
    location:    "Tampere – Pyynikki & Pyhäjärvi",
    mapUrl:      "https://maps.google.com/?q=Pyynikki,Tampere",
    image:       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    recommender: "",
    audioIdea:   "Tampere-vibes: aksentin kanssa laulettu playlist",
    videoUrl:    "",
    bgColor:     "#F59E0B",
    specialEffect: "Munkki-emoji pyörähtää 🍩",
    tags:        ["Tampere", "Päiväretki", "Järvi"],
  },
  {
    week:        7,
    weekStart:   new Date(2026, 5, 29),
    weekEnd:     new Date(2026, 6, 5),
    title:       "Hietaniemen Hiekkarantajuhlat",
    emoji:       "🏖️",
    category:    "Ranta",
    description: "Hietaniemi on Helsingin kesäinen sydän. Tuo Firsbee, osta 6e jäätelö, etsi aruinkoinen paikka, ja unohda deadlinet. Illalla voit siirtyä läheisellä terassille tekemään viope tehtäviä!",
    location:    "Hietaniemen uimaranta, Helsinki",
    mapUrl:      "https://maps.google.com/?q=Hietaniemi+beach+Helsinki",
    image:       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    recommender: "",
    audioIdea:   "Beach house lofi – auringonsäteet",
    videoUrl:    "",
    bgColor:     "#F97316",
    specialEffect: "Hiekanjyvä-partikkelit lentävät 🏖️",
    tags:        ["Ranta", "Helsinki", "Yhteisö"],
  },
  {
    week:        8,
    weekStart:   new Date(2026, 6, 6),
    weekEnd:     new Date(2026, 6, 12),
    title:       "Kajakki-Seikkailu Saaristossa",
    emoji:       "🛶",
    category:    "Seikkailu",
    description: "Tiesitkö, että Helsingin eteläpuolella on mittava määrä saaria. Hyödynnä se! Vuokraa kajakki Lauttasaaresta, ja melo kohti aurinkoa. Tyynellä säällä tämä voi olla rentouttava kokemus. Maksaa vain n. 30-50e päivä.",
    location:    "Lauttasaari / Herttoniemi, Helsinki",
    mapUrl:      "https://maps.google.com/?q=Lauttasaari,Helsinki",
    image:       "",
    recommender: "",
    audioIdea:   "Melomisen rytmi + tuulen äänet",
    videoUrl:    "",
    bgColor:     "#06B6D4",
    specialEffect: "Vesipisarat animoituvat modaalissa 💧",
    tags:        ["Kajakki", "Saaristo", "Seikkailu"],
  },
  {
    week:        9,
    weekStart:   new Date(2026, 6, 13),
    weekEnd:     new Date(2026, 6, 19),
    title:       "Lieksa & Kouvola",
    emoji:       "🎷",
    category:    "Festivaali",
    description: "Lieksan Vaskiviikot on ainutlaatuinen, ja suosittu vaskisoitin tapahtuma. Matkaa Lieksaan kuuntelemaan vaskisoittimia, ja pysähdy matkalla Kouvolassa. Ikimuistoinen elämys!",
    location:    "Lieksa & Kouvola",
    mapUrl:      "https://maps.google.com/?q=Lieksa+Finland",
    image:       "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    recommender: "",
    audioIdea:   "Brass symphony – Lieksa vibes",
    videoUrl:    "",
    bgColor:     "#8B5CF6",
    specialEffect: "Musiikkinuotit tanssivat jazzissa 🎵",
    tags:        ["Turku", "Jazz", "Festivaali"],
  },
  {
    week:        10,
    weekStart:   new Date(2026, 6, 20),
    weekEnd:     new Date(2026, 6, 26),
    title:       "TIKO Grilli-ilta",
    emoji:       "🍖",
    category:    "TIKO Tapaaminen",
    description: "Ehdotamme ryhmän tapaamista kesällä 2026. Grillataan Pitkäsillanrannassa, ja vaihdamme kuulumisia. Tuo oma kannettava, ja makkarat!",
    location:    "Pitkäsillanranta, Helsinki",
    mapUrl:      "https://maps.google.com/?q=Pitkäsillanranta,Helsinki",
    image:       "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    recommender: "",
    audioIdea:   "Grilli-äänet + lofi coding beats",
    videoUrl:    "",
    bgColor:     "#EF4444",
    specialEffect: "Grilli-emoji savuaa animaatiossa 🔥",
    tags:        ["TIKO", "Tapaaminen", "Hackathon"],
  },
  {
    week:        11,
    weekStart:   new Date(2026, 6, 27),
    weekEnd:     new Date(2026, 7, 2),
    title:       "Öinen Seikkailu",
    emoji:       "🎡",
    category:    "Huvipuisto",
    description: "Linnanmäki on klassinen, ja kallis huvipuisto. Kesällä, yöllä, siellä on loistava tunnelma! Mene Linnanmäelle klo 10ip jälkeen, ja nauti lyhyistä jonoista, ja kauniista valoista!",
    location:    "Linnanmäki, Helsinki",
    mapUrl:      "https://maps.google.com/?q=Linnanmäki,Helsinki",
    image:       "",
    recommender: "Davan",
    audioIdea:   "Huvipuiston lokaali soundtrack 🎡",
    videoUrl:    "",
    bgColor:     "#F43F5E",
    specialEffect: "Karuselli-animaatio pyörii 🎠",
    tags:        ["Huvipuisto", "Ilta", "Helsinki"],
  },
  {
    week:        12,
    weekStart:   new Date(2026, 7, 3),
    weekEnd:     new Date(2026, 7, 9),
    title:       "Takaisin Pasilaan",
    emoji:       "🎤",
    category:    "Festivaali",
    description: "Teroita kynät, solmi Kengännauhat, ja valmistaudu. Vain viikko tämän viikon jälkeen, pääset taas koodaamaan! (jos  siis valitsit ohjelmistokehitys-suuntauksen).",
    location:    "Suvilahti, Helsinki",
    mapUrl:      "https://maps.google.com/?q=Suvilahti+Helsinki",
    image:       "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    recommender: "",
    audioIdea:   "Festival banger – Flow 2026 preview",
    videoUrl:    "",
    bgColor:     "#7C3AED",
    specialEffect: "MEGA-konfetti kaikille väreille räjähtää! 🎊🎊🎊",
    tags:        ["Flow", "Festivaali", "EPIC"],
    isBig: true,
  },
  {
    week:        13,
    weekStart:   new Date(2026, 7, 24),
    weekEnd:     new Date(2026, 8, 2),
    title:       "Kesän Viimeinen Auringonlasku",
    emoji:       "🌇",
    category:    "Tunteellinen hetki",
    description: "Kesä on todella ohi, mutta muistot ovat ikuisia. Mene tähtitorninmäelle, tai Kauppatorille, katso kesän viimeinen auringonlasku, ja mieti mitä kaikkea kesän aikana tapahtuikaan!",
    location:    "Tähtitorninmäki tai Kauppatori, Helsinki",
    mapUrl:      "https://maps.google.com/?q=Tähtitorninmäki,Helsinki",
    image:       "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    recommender: "Jaakko",
    audioIdea:   "Nostalginen pianomelodia – kesän loppu",
    videoUrl:    "",
    bgColor:     "#FB923C",
    specialEffect: "Hitaasti laskeva aurinko-animaatio 🌅",
    tags:        ["Lopetus", "Muistot", "TIKO"],
  },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

/** Format Date as Finnish string dd.mm. */
function fmtDate(d) {
  return `${d.getDate()}.${d.getMonth() + 1}.`;
}

/** Get today at midnight for comparison */
function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Check if a door week has started (weekStart <= today) */
function isUnlocked(door) {
  if (door.week === 1) return true; // First window can be opened anytime
  return isOpened(door.week - 1); // Subsequent windows require previous to be opened
}

/** LocalStorage helpers */
const LS_KEY = 'tiko-kesakal-2026-opened';

function getOpenedDoors() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch { return []; }
}

function markOpened(weekNum) {
  const opened = getOpenedDoors();
  if (!opened.includes(weekNum)) {
    opened.push(weekNum);
    localStorage.setItem(LS_KEY, JSON.stringify(opened));
  }
}

function isOpened(weekNum) {
  return getOpenedDoors().includes(weekNum);
}

/* ─────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────── */
function updateProgress() {
  const opened = getOpenedDoors().length;
  const fill  = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  if (fill)  fill.style.width = `${(opened / DOORS.length) * 100}%`;
  if (label) label.textContent = `${opened} / ${DOORS.length} avattu`;
  const bar = document.querySelector('.progress-container');
  if (bar) bar.setAttribute('aria-valuenow', opened);
}

/* ─────────────────────────────────────────────
   CONFETTI
───────────────────────────────────────────── */
const CONFETTI_COLORS = ['#F5A623','#FF6B6B','#4ECDC4','#FFD97D','#A855F7','#22C55E','#F43F5E'];

function launchConfetti(amount = 60) {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const size  = 6 + Math.random() * 10;
    const left  = Math.random() * 100;
    const delay = Math.random() * 0.8;
    const duration = 2 + Math.random() * 2;
    const shape = Math.random() > 0.5 ? '50%' : '2px';

    piece.style.cssText = `
      left: ${left}%;
      top: -20px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${shape};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), (duration + delay + 0.5) * 1000);
  }
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function openModal(door) {
  const overlay  = document.getElementById('modal-overlay');
  const title    = document.getElementById('modal-title');
  const desc     = document.getElementById('modal-description');
  const img      = document.getElementById('modal-image');
  const recomm   = document.getElementById('modal-recommender');
  const weekBadge = document.getElementById('modal-week-badge');
  const metaLoc  = document.getElementById('meta-location');
  const actions  = document.getElementById('modal-actions');
  const videoWrap = document.getElementById('modal-video-wrap');
  const videoEl  = document.getElementById('modal-video');

  title.textContent      = `${door.emoji} ${door.title}`;
  desc.textContent       = door.description;
  img.src                = door.image;
  img.alt                = door.title;
  recomm.textContent     = door.recommender || '';
  recomm.hidden          = !door.recommender;
  weekBadge.textContent  = `Viikko ${door.week} · ${fmtDate(door.weekStart)}–${fmtDate(door.weekEnd)}`;
  metaLoc.innerHTML      = `📍 ${door.location}`;

  actions.innerHTML = '';
  if (door.mapUrl) {
    const mapLink = document.createElement('a');
    mapLink.className = 'btn-map';
    mapLink.href = door.mapUrl;
    mapLink.target = '_blank';
    mapLink.rel = 'noopener noreferrer';
    mapLink.innerHTML = '🗺️ Avaa kartalla';
    actions.appendChild(mapLink);
  }
  if (door.audioIdea) {
    const audioBtn = document.createElement('button');
    audioBtn.className = 'btn-play';
    audioBtn.innerHTML = `🎵 ${door.audioIdea}`;
    audioBtn.setAttribute('aria-label', `Toista ääni: ${door.audioIdea}`);
    audioBtn.addEventListener('click', () => {
      audioBtn.textContent = '🎵 Soitetaan...';
      setTimeout(() => { audioBtn.innerHTML = `🎵 ${door.audioIdea}`; }, 2000);
    });
    actions.appendChild(audioBtn);
  }

  if (door.videoUrl) {
    videoEl.src = door.videoUrl;
    videoWrap.hidden = false;
  } else {
    videoWrap.hidden = true;
    videoEl.src = '';
  }

  overlay.hidden = false;
  overlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  const videoEl = document.getElementById('modal-video');
  overlay.hidden = true;
  videoEl.src = '';
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────
   BUILD CALENDAR
───────────────────────────────────────────── */
function buildCalendar() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;

  DOORS.forEach((door) => {
    const unlocked = isUnlocked(door);
    const opened   = isOpened(door.week);

    const card = document.createElement('div');
    card.className = `door-card ${unlocked ? (opened ? 'opened' : 'unlocked') : 'locked'}`;
    card.id = `door-${door.week}`;
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute(
      'aria-label',
      unlocked
        ? `Viikko ${door.week}: ${door.title}${opened ? ' – avattu' : ' – avaa'}`
        : door.week === 1
          ? `Viikko ${door.week} – lukittu, avataan ${fmtDate(door.weekStart)}`
          : !isOpened(door.week - 1)
            ? `Viikko ${door.week} – lukittu, avaa ensin viikko ${door.week - 1}`
            : `Viikko ${door.week} – lukittu, avataan ${fmtDate(door.weekStart)}`
    );
    card.setAttribute('aria-disabled', unlocked ? 'false' : 'true');

    const statusIcon = unlocked
      ? (opened ? '✅' : door.emoji)
      : '🔒';

    card.innerHTML = `
      <div class="door-inner">
        <div class="door-bg" style="background-image: url('${door.image}'); background-color: ${door.bgColor}"></div>
        <div class="door-overlay"></div>
        <div class="door-content">
          <div class="door-top">
            <div class="door-week-number" aria-hidden="true">${door.week}</div>
            <span class="door-status-icon" aria-hidden="true">${statusIcon}</span>
          </div>
          <div class="door-bottom">
            <div class="door-week-label">${door.category}</div>
            <div class="door-title">${unlocked ? door.title : (door.week > 1 && !isOpened(door.week - 1) ? 'Avaa ensin edellinen...' : 'Lukittu...')}</div>
            <div class="door-dates">${fmtDate(door.weekStart)} – ${fmtDate(door.weekEnd)}</div>
          </div>
        </div>
      </div>
    `;

    const handleOpen = () => {
      if (!isOpened(door.week)) {
        markOpened(door.week);
        card.classList.remove('unlocked');
        card.classList.add('opened');
        const iconEl = card.querySelector('.door-status-icon');
        if (iconEl) iconEl.textContent = '✅';
        launchConfetti(door.isBig ? 150 : 70);
        updateProgress();

        // Update next door if it becomes unlocked
        if (door.week < 13) {
          const nextDoor = DOORS.find(d => d.week === door.week + 1);
          if (nextDoor && isUnlocked(nextDoor)) {
            const nextCard = document.getElementById(`door-${nextDoor.week}`);
            if (nextCard) {
              nextCard.setAttribute('aria-label', `Viikko ${nextDoor.week}: ${nextDoor.title} – avaa`);
              nextCard.setAttribute('aria-disabled', 'false');
              const titleEl = nextCard.querySelector('.door-title');
              if (titleEl) titleEl.textContent = nextDoor.title;
              const iconEl = nextCard.querySelector('.door-status-icon');
              if (iconEl) iconEl.textContent = nextDoor.emoji;
              nextCard.classList.remove('locked');
              nextCard.classList.add('unlocked');
            }
          }
        }
      }
      openModal(door);
    };

    card.addEventListener('click', () => {
      if (isUnlocked(door)) {
        handleOpen();
      } else {
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'locked-shake 0.4s ease';
        setTimeout(() => { card.style.animation = ''; }, 400);
      }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isUnlocked(door)) {
          handleOpen();
        } else {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = 'locked-shake 0.4s ease';
          setTimeout(() => { card.style.animation = ''; }, 400);
        }
      }
    });

    grid.appendChild(card);

    // Force animation to trigger after DOM insertion (reflow trick)
    const delay = door.week * 50;
    setTimeout(() => {
      card.classList.add('animate-in');
      card.style.animationDelay = '0ms';
    }, delay);
  });
}

/* Add locked-shake keyframe dynamically */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes locked-shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px) rotate(-1deg); }
  40%       { transform: translateX(6px) rotate(1deg); }
  60%       { transform: translateX(-4px) rotate(-0.5deg); }
  80%       { transform: translateX(4px) rotate(0.5deg); }
}`;
document.head.appendChild(shakeStyle);

/* ─────────────────────────────────────────────
   QUOTE TICKER
───────────────────────────────────────────── */
function startQuoteTicker() {
  const el = document.getElementById('quote-text');
  if (!el) return;
  let idx = Math.floor(Math.random() * QUOTES.length);

  function showNext() {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-8px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setTimeout(() => {
      el.textContent = QUOTES[idx % QUOTES.length];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      idx++;
    }, 400);
  }

  showNext();
  setInterval(showNext, 6000);
}

/* ─────────────────────────────────────────────
   CANVAS BACKGROUND (particles + waves)
───────────────────────────────────────────── */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x    = Math.random() * (W || 1);
      this.y    = Math.random() * (H || 1);
      this.r    = 1 + Math.random() * 2.5;
      this.dx   = (Math.random() - 0.5) * 0.3;
      this.dy   = -0.2 - Math.random() * 0.4;
      this.alpha = 0.05 + Math.random() * 0.2;
      this.color = Math.random() > 0.5 ? '245,166,35' : '255,107,107';
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
    update() {
      this.x += this.dx;
      this.y += this.dy;
      if (this.y < -10) { this.y = H + 10; this.x = Math.random() * W; }
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    const waveGrad = ctx.createLinearGradient(0, H * 0.6, 0, H);
    waveGrad.addColorStop(0, 'rgba(78,205,196,0)');
    waveGrad.addColorStop(1, 'rgba(78,205,196,0.04)');
    ctx.fillStyle = waveGrad;

    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 4) {
      const y = H * 0.85 + Math.sin((x / W) * Math.PI * 4 + t) * 20 + Math.cos((x / W) * Math.PI * 2 + t * 0.7) * 12;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    particles.forEach(p => { p.update(); p.draw(); });

    t += 0.006;
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
}

/* ─────────────────────────────────────────────
   EASTER EGG — type "TIKO"
───────────────────────────────────────────── */
function initEasterEgg() {
  const hint  = document.getElementById('easter-hint');
  const overlay = document.getElementById('easter-overlay');
  const close   = document.getElementById('easter-close');

  let buffer = '';
  const secret = 'tiko';

  setTimeout(() => {
    if (hint) { hint.style.opacity = '0.6'; hint.setAttribute('aria-hidden', 'false'); }
  }, 10000);

  document.addEventListener('keydown', (e) => {
    buffer += e.key.toLowerCase();
    if (buffer.length > secret.length) buffer = buffer.slice(-secret.length);
    if (buffer === secret) {
      buffer = '';
      overlay.hidden = false;
      launchConfetti(120);
      document.body.style.overflow = 'hidden';
    }
  });

  if (close) {
    close.addEventListener('click', () => {
      overlay.hidden = true;
      document.body.style.overflow = '';
    });
  }

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.hidden = true;
      document.body.style.overflow = '';
    }
  });
}

/* ─────────────────────────────────────────────
   SUMMER COUNTDOWN
───────────────────────────────────────────── */
function initCountdown() {
  const summerStart = new Date(2026, 4, 18); // May 18, 2026
  summerStart.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (now < summerStart) {
    const diffMs = summerStart - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const el = document.getElementById('summer-countdown');
    const daysEl = document.getElementById('countdown-days');
    if (el && daysEl) {
      daysEl.textContent = diffDays;
      el.hidden = false;
      el.removeAttribute('hidden');
    }
  }
}


function initModalClose() {
  const closeBtn = document.getElementById('modal-close');
  const overlay  = document.getElementById('modal-overlay');

  closeBtn?.addEventListener('click', closeModal);

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!document.getElementById('modal-overlay').hidden) closeModal();
      if (!document.getElementById('easter-overlay').hidden) {
        document.getElementById('easter-overlay').hidden = true;
        document.body.style.overflow = '';
      }
    }
  });
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  buildCalendar();
  updateProgress();
  startQuoteTicker();
  initModalClose();
  initEasterEgg();
  initCountdown();

  console.log('%c🌞 TIKOn Kesäkalenteri 2026', 'color:#F5A623;font-size:20px;font-weight:bold;');
  console.log('%cTehty rakkaudella Haaga-Helia TIKO tiimin toimesta!', 'color:#4ECDC4;font-size:13px;');
  console.log('%cVinkki: kirjoita "TIKO" löytääksesi salaisen luukun 🦆', 'color:#FF6B6B;font-size:12px;font-style:italic;');
});
