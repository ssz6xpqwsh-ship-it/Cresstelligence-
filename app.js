/*
  OSINT GLOBE - PHONE FRIENDLY STARTER
  -----------------------------------
  This file controls almost everything.

  WHAT THIS FILE DOES:
  1. Creates the list of regions
  2. Creates the list of topic categories
  3. Builds the clickable globe
  4. Fetches live headlines from GDELT
  5. Prints headline cards in the right sidebar

  WHAT YOU WILL MOST LIKELY CHANGE FIRST:
  - SITE.title
  - SITE.tagline
  - REGIONS
  - CATEGORIES
  - the first feed at the very bottom
*/

const SITE = {
  title: 'Cresswells Intel Watch',
  tagline: 'Interactive Global OSINT feed.'
};

const REGIONS = [
  {
    id: 'north-america',
    label: 'North America',
    lat: 40,
    lng: -100,
    size: 0.45,
    query: '("United States" OR Canada OR Mexico OR border OR NORAD)'
  },
  {
    id: 'latin-america',
    label: 'Latin America',
    lat: -15,
    lng: -60,
    size: 0.42,
    query: '(Brazil OR Argentina OR Chile OR Colombia OR Peru OR cartel)'
  },
  {
    id: 'europe',
    label: 'Europe',
    lat: 52,
    lng: 15,
    size: 0.42,
    query: '(Europe OR EU OR Germany OR France OR Britain OR NATO)'
  },
  {
    id: 'eastern-europe',
    label: 'Eastern Europe',
    lat: 49,
    lng: 31,
    size: 0.38,
    query: '(Ukraine OR Russia OR Belarus OR Moldova OR Black Sea)'
  },
  {
    id: 'middle-east',
    label: 'Middle East',
    lat: 29,
    lng: 45,
    size: 0.45,
    query: '("Middle East" OR Israel OR Gaza OR Iran OR Syria OR Yemen)'
  },
  {
    id: 'africa',
    label: 'Africa',
    lat: 4,
    lng: 20,
    size: 0.45,
    query: '(Africa OR Sudan OR Sahel OR Congo OR Nigeria OR insurgency)'
  },
  {
    id: 'south-asia',
    label: 'South Asia',
    lat: 22,
    lng: 79,
    size: 0.42,
    query: '(India OR Pakistan OR Bangladesh OR Sri Lanka OR Kashmir)'
  },
  {
    id: 'east-asia',
    label: 'East Asia',
    lat: 36,
    lng: 121,
    size: 0.42,
    query: '(China OR Taiwan OR Japan OR Korea OR East China Sea)'
  },
  {
    id: 'south-china-sea',
    label: 'South China Sea',
    lat: 12,
    lng: 114,
    size: 0.36,
    query: '("South China Sea" OR Philippines OR Taiwan OR Vietnam OR maritime)'
  },
  {
    id: 'arctic',
    label: 'Arctic',
    lat: 78,
    lng: 20,
    size: 0.34,
    query: '(Arctic OR Greenland OR Svalbard OR icebreaker OR northern route)'
  }
];

const CATEGORIES = [
  {
    id: 'conflict',
    label: 'Conflict',
    query: '(conflict OR strike OR missile OR militia OR offensive OR ceasefire)'
  },
  {
    id: 'aviation',
    label: 'Aviation',
    query: '(aviation OR aircraft OR airspace OR airport OR fighter jet OR drone)'
  },
  {
    id: 'cyber',
    label: 'Cyber',
    query: '(cyberattack OR ransomware OR malware OR hacking OR breach)'
  },
  {
    id: 'disasters',
    label: 'Disasters',
    query: '(wildfire OR earthquake OR volcano OR flood OR hurricane OR tsunami)'
  },
  {
    id: 'space',
    label: 'Space',
    query: '(satellite OR launch OR orbit OR ISS OR Starlink OR space debris)'
  },
  {
    id: 'maritime',
    label: 'Maritime',
    query: '(ship OR navy OR tanker OR strait OR maritime OR coast guard)'
  }
];

const siteTitleEl = document.getElementById('siteTitle');
const siteTaglineEl = document.getElementById('siteTagline');
const feedTitleEl = document.getElementById('feedTitle');
const feedSubtitleEl = document.getElementById('feedSubtitle');
const statusEl = document.getElementById('status');
const resultsEl = document.getElementById('results');
const refreshBtn = document.getElementById('refreshBtn');
const topicForm = document.getElementById('topicForm');
const topicInput = document.getElementById('topicInput');
const categoryButtonsEl = document.getElementById('categoryButtons');
const regionButtonsEl = document.getElementById('regionButtons');

let globeInstance = null;
let currentSelection = {
  type: 'starter',
  id: 'global-pulse',
  label: 'Global Intel Feed',
  query: '(drone OR fighter jet OR air defense OR missile OR cyberattack OR satellite)'
};

siteTitleEl.textContent = SITE.title;
siteTaglineEl.textContent = SITE.tagline;

defineButtons();
bootGlobe();
fetchNews(currentSelection.query, currentSelection.label, currentSelection.id);

function defineButtons() {
  CATEGORIES.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'mini-btn';
    btn.textContent = category.label;
    btn.dataset.selectionId = category.id;
    btn.addEventListener('click', () => {
      activateButton(category.id);
      fetchNews(category.query, `Category: ${category.label}`, category.id);
    });
    categoryButtonsEl.appendChild(btn);
  });

  REGIONS.forEach(region => {
    const btn = document.createElement('button');
    btn.className = 'mini-btn';
    btn.textContent = region.label;
    btn.dataset.selectionId = region.id;
    btn.addEventListener('click', () => {
      activateButton(region.id);
      focusRegion(region);
      fetchNews(region.query, region.label, region.id);
    });
    regionButtonsEl.appendChild(btn);
  });
}

function activateButton(selectionId) {
  document.querySelectorAll('.mini-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.selectionId === selectionId);
  });
}

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.classList.toggle('error', isError);
}

function formatSeenDate(raw) {
  if (!raw) return 'Recent';

  const match = String(raw).match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (!match) return raw;

  const [, y, m, d, hh, mm] = match;
  const iso = `${y}-${m}-${d}T${hh}:${mm}:00Z`;
  const date = new Date(iso);

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}

function renderStories(items) {
  resultsEl.innerHTML = '';

  if (!items.length) {
    resultsEl.innerHTML = `
      <div class="story">
        <div class="story-title">No stories found.</div>
        <div class="story-meta">
          <span>Try another region, category, or search phrase.</span>
        </div>
      </div>
    `;
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach(item => {
    const url = item.url || item.url_mobile || '#';
    const card = document.createElement('a');
    card.className = 'story';
    card.href = url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    const title = document.createElement('div');
    title.className = 'story-title';
    title.textContent = item.title || 'Untitled story';

    const meta = document.createElement('div');
    meta.className = 'story-meta';
    const parts = [
      item.domain,
      item.sourcecountry,
      formatSeenDate(item.seendate)
    ].filter(Boolean);
    meta.innerHTML = parts.map(part => `<span>${escapeHtml(part)}</span>`).join('');

    card.appendChild(title);
    card.appendChild(meta);
    fragment.appendChild(card);
  });

  resultsEl.appendChild(fragment);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function fetchNews(query, label, selectionId = '') {
  currentSelection = {
    type: 'query',
    id: selectionId || label.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-'),
    label,
    query
  };

  feedTitleEl.textContent = label;
  feedSubtitleEl.textContent = 'Newest matching headlines from the last 12 hours.';
  setStatus('Loading headlines...');
  resultsEl.innerHTML = '';

  const url = new URL('https://api.gdeltproject.org/api/v2/doc/doc');
  url.searchParams.set('query', query);
  url.searchParams.set('mode', 'artlist');
  url.searchParams.set('maxrecords', '12');
  url.searchParams.set('timespan', '12h');
  url.searchParams.set('sort', 'datedesc');
  url.searchParams.set('format', 'json');

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const items = data.articles || data.article || data.results || [];
    renderStories(items);
    setStatus(`Loaded ${items.length} stories.`);

    if (selectionId) {
      activateButton(selectionId);
    }
  } catch (error) {
    console.error(error);
    setStatus(
      'Could not load live headlines right now. Usually this means the news API rate-limited the request or your signal dropped.',
      true
    );
    renderStories([]);
  }
}

function bootGlobe() {
  const container = document.getElementById('globeViz');
  const width = container.clientWidth;
  const height = container.clientHeight;

  globeInstance = Globe()(container)
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
    .showAtmosphere(true)
    .atmosphereColor('#5ec8ff')
    .atmosphereAltitude(0.17)
    .pointsData(REGIONS)
    .pointAltitude('size')
    .pointRadius(0.55)
    .pointLabel(point => `${point.label}<br/>Tap to load regional headlines`)
    .onPointClick(point => {
      activateButton(point.id);
      focusRegion(point);
      fetchNews(point.query, point.label, point.id);
    })
    .width(width)
    .height(height);

  globeInstance.controls().autoRotate = true;
  globeInstance.controls().autoRotateSpeed = 0.45;

  window.addEventListener('resize', () => {
    globeInstance.width(container.clientWidth);
    globeInstance.height(container.clientHeight);
  });
}

function focusRegion(region) {
  if (!globeInstance) return;
  globeInstance.pointOfView({ lat: region.lat, lng: region.lng, altitude: 1.8 }, 1000);
}

refreshBtn.addEventListener('click', () => {
  if (!currentSelection.query) {
    setStatus('Nothing to refresh yet. Tap a region or a category first.', true);
    return;
  }

  fetchNews(currentSelection.query, currentSelection.label, currentSelection.id);
});

topicForm.addEventListener('submit', event => {
  event.preventDefault();

  const value = topicInput.value.trim();
  if (!value) {
    setStatus('Type a topic first. Example: drone OR cyber OR wildfire', true);
    return;
  }

  fetchNews(value, `Search: ${value}`, '');
});
