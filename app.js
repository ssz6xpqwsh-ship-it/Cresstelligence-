import * as satellite from 'https://esm.sh/satellite.js@6.0.2';

const GlobeFactory = window.Globe;
const SAT_CACHE_KEY = 'cresswell-intel-sat-cache-v4';
const SAT_CACHE_MAX_AGE_MS = 2 * 60 * 60 * 1000;
const SAT_UPDATE_INTERVAL_MS = 2500;
const AIR_UPDATE_INTERVAL_MS = 1400;
const AIR_LIMIT = 14;
const SAT_LIMIT_PER_GROUP = 6;

const SITE = {
  title: 'CRESSWELL INTEL',
  tagline: 'Executive briefs, flightline picture, orbital watch, and electronic warfare hotspots.'
};

const ICONS = {
  aircraft: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 16.5 13.6 13l-.8-5.6 2-1.4V4.5l-3 1-3-1V6l2 1.4-.8 5.6L2 16.5V18l8-1.1V21l1.9-1.3L13.8 21v-4.1L22 18z"/></svg>',
  satellite: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 3 3 7l3 3-1.5 1.5L3 10 1 12l2 2 1.5-1.5L6 15l4-4-3-3zm10 6-4 4 3 3 4-4-3-3zm-1-6-1.5 1.5L17 7l1.5-1.5zM8 17l-1.5 1.5L8 20l1.5-1.5zM13 8l3 3m-8 2 3 3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  conflict: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3h9l-2 4 5 2-2 5H9l2-4-6-2zM5 14h2v7H5z"/></svg>',
  ew: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4a8 8 0 0 1 8 8h-2a6 6 0 0 0-6-6zm0 4a4 4 0 0 1 4 4h-2a2 2 0 0 0-2-2zm0 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-8-1a8 8 0 0 1 8-8v2a6 6 0 0 0-6 6zm2 0a4 4 0 0 1 4-4v2a2 2 0 0 0-2 2z"/></svg>',
  region: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="6"/></svg>'
};

const AIRCRAFT_VISUALS = {
  fighter: {
    label: 'Fighter',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M338 82 240 72 188 28h-28l20 40-42 11-36-10-12-20H72l10 28-60 13v12l60 13-10 28h18l12-20 36-10 42 11-20 40h28l52-44 98-10v-16Z" fill="#90F5FF" fill-opacity="0.9"/><path d="M166 68h28M166 92h28" stroke="#DDFBFF" stroke-width="8" stroke-linecap="round"/></svg>`
  },
  airliner: {
    label: 'Airliner',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M332 74 184 66 110 30H80l22 36-64 8v12l64 8-22 36h30l74-36 148-8v-12Z" fill="#8BE7FF" fill-opacity="0.92"/><path d="M132 60 92 34m40 66-40 26m52-28h52" stroke="#E7FDFF" stroke-width="8" stroke-linecap="round"/></svg>`
  },
  cargo: {
    label: 'Cargo',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M334 70H220l-52-30h-46l14 30H64l-36 16 36 16h72l-14 30h46l52-30h114V70Z" fill="#A7F7CF" fill-opacity="0.9"/><path d="M126 70v32m24-32v32" stroke="#F0FFF8" stroke-width="8" stroke-linecap="round"/></svg>`
  },
  rotary: {
    label: 'Rotary',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M72 84h112l18-16h42l20 16h34v14h-34l-20 16h-42l-18-16H72V84Z" fill="#FFD889" fill-opacity="0.92"/><path d="M184 68V36m-98 48h196" stroke="#FFF2CC" stroke-width="8" stroke-linecap="round"/></svg>`
  },
  uav: {
    label: 'UAV',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M326 82 230 72 180 50 130 72 34 82v8l96 10 50 22 50-22 96-10v-8Z" fill="#FFC3C3" fill-opacity="0.9"/><path d="M180 50V34m-26 38h52" stroke="#FFF1F1" stroke-width="8" stroke-linecap="round"/></svg>`
  },
  awacs: {
    label: 'AEW&C',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M328 74 188 68 114 34H84l18 34-62 10v8l62 10-18 34h30l74-34 140-6v-16Z" fill="#CABEFF" fill-opacity="0.9"/><ellipse cx="190" cy="42" rx="56" ry="12" fill="#F5F1FF" fill-opacity="0.95"/></svg>`
  },
  tanker: {
    label: 'Tanker',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M332 72 186 64 108 34H78l22 30-62 10v12l62 10-22 30h30l78-30 146-8v-16Z" fill="#8EE6D3" fill-opacity="0.92"/><path d="M196 86c14 0 28 10 28 24" stroke="#E8FFF8" stroke-width="8" stroke-linecap="round"/></svg>`
  },
  isr: {
    label: 'ISR',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M332 78 204 70l-50-22-50 22L28 78v8l76 8 50 22 50-22 128-8v-8Z" fill="#8FD8FF" fill-opacity="0.9"/><circle cx="154" cy="70" r="8" fill="#F2FDFF"/></svg>`
  },
  satellite: {
    label: 'Satellite',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="134" y="54" width="92" height="52" rx="10" fill="#FFE299" fill-opacity="0.95"/><rect x="34" y="44" width="80" height="72" rx="8" fill="#8CC8FF" fill-opacity="0.9"/><rect x="246" y="44" width="80" height="72" rx="8" fill="#8CC8FF" fill-opacity="0.9"/><path d="M114 80h20m92 0h20" stroke="#FFF7E2" stroke-width="8" stroke-linecap="round"/></svg>`
  },
  conflict: {
    label: 'Conflict zone',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="180" cy="80" r="56" fill="#FF9E58" fill-opacity="0.18"/><circle cx="180" cy="80" r="36" fill="#FF6B6B" fill-opacity="0.32"/><path d="M180 34v92m-46-46h92" stroke="#FFD9C0" stroke-width="10" stroke-linecap="round"/></svg>`
  },
  ew: {
    label: 'GNSS / EW',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="180" cy="80" r="18" fill="#FFB0B0"/><circle cx="180" cy="80" r="42" stroke="#FF6B6B" stroke-width="10" stroke-dasharray="18 10"/><circle cx="180" cy="80" r="66" stroke="#FFC2C2" stroke-width="8" stroke-dasharray="8 12"/></svg>`
  },
  region: {
    label: 'Region',
    svg: `<svg viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M56 90c20-42 74-60 122-42 36-24 88-18 122 16 14 14 24 32 28 52H56v-26Z" fill="#8FE1FF" fill-opacity="0.3"/><path d="M84 70h192M68 102h224" stroke="#DFF8FF" stroke-width="8" stroke-linecap="round"/></svg>`
  }
};

const REGIONS = [
  {
    id: 'middle-east',
    label: 'Middle East',
    lat: 29,
    lng: 45,
    altitude: 0.018,
    query: '(Israel OR Lebanon OR Iran OR Syria OR Yemen OR Red Sea OR Gulf)',
    bbox: { lamin: 12, lamax: 38, lomin: 28, lomax: 58 },
    theme: 'Theater remains compressed, missile-sensitive, and prone to navigation disruption along Gulf and Levant corridors.'
  },
  {
    id: 'eastern-europe',
    label: 'Eastern Europe',
    lat: 49,
    lng: 31,
    altitude: 0.018,
    query: '(Ukraine OR Russia OR Black Sea OR drone OR missile)',
    bbox: { lamin: 42, lamax: 58, lomin: 22, lomax: 42 },
    theme: 'Drone-heavy attrition and strike activity continue to set the regional tempo.'
  },
  {
    id: 'sudan-red-sea',
    label: 'Sudan / Red Sea',
    lat: 16,
    lng: 34,
    altitude: 0.017,
    query: '(Sudan OR Darfur OR Kordofan OR Red Sea OR Bab el-Mandeb)',
    bbox: { lamin: 5, lamax: 24, lomin: 25, lomax: 46 },
    theme: 'Civil war, aid pressure, and shipping-route exposure overlap here.'
  },
  {
    id: 'south-china-sea',
    label: 'South China Sea',
    lat: 13,
    lng: 114,
    altitude: 0.017,
    query: '("South China Sea" OR Philippines OR China OR Spratly OR Scarborough)',
    bbox: { lamin: 0, lamax: 24, lomin: 103, lomax: 123 },
    theme: 'Maritime coercion, patrols, and alliance signaling drive the picture.'
  },
  {
    id: 'baltic-black-sea',
    label: 'Baltic / Black Sea',
    lat: 55,
    lng: 25,
    altitude: 0.017,
    query: '(Baltic OR Black Sea OR GPS OR spoofing OR navigation OR NATO)',
    bbox: { lamin: 44, lamax: 61, lomin: 15, lomax: 40 },
    theme: 'Navigation interference and military pressure overlap across European approaches.'
  },
  {
    id: 'east-africa-congo',
    label: 'East Africa / Congo',
    lat: -2,
    lng: 29,
    altitude: 0.017,
    query: '(Congo OR M23 OR Goma OR Rwanda OR East Africa)',
    bbox: { lamin: -12, lamax: 8, lomin: 20, lomax: 38 },
    theme: 'Fragile ceasefires and drone-enabled fighting keep the zone unstable.'
  },
  {
    id: 'north-america',
    label: 'North America',
    lat: 39,
    lng: -98,
    altitude: 0.017,
    query: '(United States OR Canada OR NORAD OR airspace OR wildfire OR cyber)',
    bbox: { lamin: 24, lamax: 52, lomin: -127, lomax: -66 },
    theme: 'This sector acts as your baseline comparison picture for homeland and continental activity.'
  }
];

const CATEGORIES = [
  { id: 'conflict', label: 'Conflict', query: '(conflict OR strike OR drone OR missile OR offensive OR ceasefire)' },
  { id: 'air', label: 'Air & AD', query: '(fighter OR bomber OR air defense OR sortie OR interceptor OR drone)' },
  { id: 'space', label: 'Space', query: '(satellite OR launch OR orbit OR debris OR GPS OR Starlink)' },
  { id: 'maritime', label: 'Maritime', query: '(shipping OR tanker OR navy OR strait OR coast guard OR maritime)' },
  { id: 'cyber', label: 'Cyber', query: '(cyberattack OR malware OR ransomware OR intrusion OR breach)' },
  { id: 'disaster', label: 'Disaster', query: '(wildfire OR flood OR quake OR volcano OR storm OR drought)' }
];

const LAYERS = [
  { id: 'regions', label: 'Regions', defaultOn: true },
  { id: 'aircraft', label: 'Aircraft', defaultOn: true },
  { id: 'satellites', label: 'Satellites', defaultOn: true },
  { id: 'conflicts', label: 'Conflicts', defaultOn: true },
  { id: 'ew', label: 'GNSS/EW', defaultOn: true }
];

const HOTSPOTS = [
  {
    id: 'conf-middle-east',
    kind: 'conflict',
    label: 'Levant / Gulf war zone',
    lat: 31,
    lng: 40,
    severity: 5,
    regionIds: ['middle-east'],
    summary: 'Regional war pressure spans Iran, Israel, Lebanon, Gulf infrastructure, and maritime approaches.',
    actors: 'Israel, Iran, Hezbollah, U.S. forces, Gulf states',
    watch: 'Watch missile volume, maritime spillover, and air defense saturation.',
    source: 'Reuters and regional conflict reporting'
  },
  {
    id: 'conf-ukraine',
    kind: 'conflict',
    label: 'Ukraine strike belt',
    lat: 48.7,
    lng: 32.2,
    severity: 4,
    regionIds: ['eastern-europe', 'baltic-black-sea'],
    summary: 'Deep-strike drone warfare and battlefield data modernization keep the theater highly dynamic.',
    actors: 'Ukraine, Russia',
    watch: 'Watch Odesa, Black Sea access, and AI-enabled drone adaptation.',
    source: 'Reuters battlefield and strike coverage'
  },
  {
    id: 'conf-sudan',
    kind: 'conflict',
    label: 'Sudan civil war front',
    lat: 13.5,
    lng: 30,
    severity: 4,
    regionIds: ['sudan-red-sea'],
    summary: 'Army-RSF fighting, civilian strikes, and aid strain keep Sudan one of the hardest-hit humanitarian zones.',
    actors: 'Sudanese Armed Forces, RSF',
    watch: 'Watch Darfur, Kordofan, and cross-border shock into Chad.',
    source: 'AP and Reuters humanitarian/conflict reporting'
  },
  {
    id: 'conf-red-sea',
    kind: 'conflict',
    label: 'Red Sea choke point',
    lat: 16,
    lng: 42,
    severity: 4,
    regionIds: ['middle-east', 'sudan-red-sea'],
    summary: 'Commercial rerouting, Gulf export pressure, and the Bab el-Mandeb transit risk remain operationally important.',
    actors: 'Shipping firms, regional militaries, Houthi-linked threat environment',
    watch: 'Watch diversions, insurance shocks, and corridor security.',
    source: 'Reuters shipping coverage'
  },
  {
    id: 'conf-scs',
    kind: 'conflict',
    label: 'Scarborough / SCS friction',
    lat: 15,
    lng: 117,
    severity: 3,
    regionIds: ['south-china-sea'],
    summary: 'Sovereignty disputes, patrols, and alliance signaling keep the sea lane tense.',
    actors: 'China, Philippines, U.S., regional navies',
    watch: 'Watch patrol tempo and rules-of-engagement risk around disputed features.',
    source: 'Reuters South China Sea coverage'
  },
  {
    id: 'conf-congo',
    kind: 'conflict',
    label: 'Eastern Congo',
    lat: -1.7,
    lng: 29.2,
    severity: 3,
    regionIds: ['east-africa-congo'],
    summary: 'Drone strikes and ceasefire failures continue to undercut stabilization efforts in and around Goma.',
    actors: 'DRC forces, M23, regional actors',
    watch: 'Watch Goma, cross-border implications, and civilian protection issues.',
    source: 'AP eastern Congo reporting'
  },
  {
    id: 'ew-baltic',
    kind: 'ew',
    label: 'Baltic GNSS disruption',
    lat: 57.5,
    lng: 22.5,
    severity: 4,
    regionIds: ['baltic-black-sea', 'eastern-europe'],
    summary: 'Persistent jamming/spoofing risk affects shipping and aviation in the Baltic approaches.',
    actors: 'Civil aviation and maritime users in a contested EW environment',
    watch: 'Watch safety, route changes, and signal integrity complaints.',
    source: 'GPSJAM, EASA, Reuters GNSS coverage'
  },
  {
    id: 'ew-eastern-med',
    kind: 'ew',
    label: 'Eastern Med / Levant GNSS',
    lat: 33,
    lng: 35,
    severity: 4,
    regionIds: ['middle-east'],
    summary: 'Conflict-zone GNSS degradation remains a recurring aviation and maritime hazard.',
    actors: 'Air and maritime operators',
    watch: 'Watch route restrictions and spoofed position reports.',
    source: 'GPSJAM and EASA interference region references'
  },
  {
    id: 'ew-gulf',
    kind: 'ew',
    label: 'Persian Gulf / Hormuz GNSS',
    lat: 26.5,
    lng: 53,
    severity: 5,
    regionIds: ['middle-east'],
    summary: 'The Gulf approaches face high navigation-integrity risk amid regional conflict and shipping disruption.',
    actors: 'Commercial shipping, regional militaries, civil aviation',
    watch: 'Watch spoofed tracks, congestion, and maritime collision risk.',
    source: 'GPSJAM and maritime GNSS reporting'
  },
  {
    id: 'ew-black-sea',
    kind: 'ew',
    label: 'Black Sea GNSS pressure',
    lat: 44.4,
    lng: 34.5,
    severity: 3,
    regionIds: ['eastern-europe', 'baltic-black-sea'],
    summary: 'The Black Sea remains part of the broader interference belt surrounding active conflict and military presence.',
    actors: 'Shipping, coastal states, military aviation',
    watch: 'Watch degraded navigation and route workarounds.',
    source: 'EASA regional warning patterns and GPSJAM map context'
  }
];

const SATELLITE_GROUPS = [
  { id: 'stations', label: 'Stations', url: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=STATIONS&FORMAT=TLE' },
  { id: 'gps', label: 'GPS Ops', url: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=GPS-OPS&FORMAT=TLE' },
  { id: 'weather', label: 'Weather', url: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=WEATHER&FORMAT=TLE' }
];

const FALLBACK_TLES = [
  { name: 'ISS (ZARYA)', groupLabel: 'Stations', line1: '1 25544U 98067A   26078.51803009  .00008648  00000+0  15866-3 0  9995', line2: '2 25544  51.6394 183.6170 0005998 249.6994 172.8730 15.50100586500314' },
  { name: 'CSS (TIANHE)', groupLabel: 'Stations', line1: '1 48274U 21035A   26078.35245370  .00015516  00000+0  19184-3 0  9999', line2: '2 48274  41.4721  22.9042 0008029 110.0788 278.8329 15.58101411273689' },
  { name: 'GPS BIIR-2  (PRN 13)', groupLabel: 'GPS Ops', line1: '1 24876U 97035A   26078.10497552 -.00000057  00000+0  00000+0 0  9991', line2: '2 24876  54.2241 115.7402 0108103  51.2851 309.7827  2.00564016210650' },
  { name: 'GPS BIIF-4 (PRN 27)', groupLabel: 'GPS Ops', line1: '1 39533U 14008A   26078.45424657 -.00000031  00000+0  00000+0 0  9990', line2: '2 39533  55.0684 238.6493 0047121 178.8650 181.1632  2.00568556 87950' },
  { name: 'NOAA 19', groupLabel: 'Weather', line1: '1 33591U 09005A   26078.36083259  .00000066  00000+0  64463-4 0  9998', line2: '2 33591  99.1887 145.1946 0014143 332.7048  27.3140 14.12342333882870' },
  { name: 'METEOR-M 2-3', groupLabel: 'Weather', line1: '1 57166U 23091A   26078.44660727  .00000170  00000+0  98564-4 0  9990', line2: '2 57166  98.5876 129.5904 0004725  74.3114 285.8578 14.21136363 14234' }
];

const state = {
  globe: null,
  selectedRegion: REGIONS[0],
  currentSelection: {
    id: REGIONS[0].id,
    label: REGIONS[0].label,
    query: REGIONS[0].query,
    type: 'region'
  },
  selectedObject: REGIONS[0],
  showRegions: true,
  showAircraft: true,
  showSatellites: true,
  showConflicts: true,
  showEw: true,
  stories: [],
  aircraft: [],
  aircraftArcs: [],
  aircraftMode: 'boot',
  aircraftTimer: null,
  satCatalog: [],
  satPoints: [],
  satTimer: null,
  selectedSatellitePath: [],
  ambienceOn: false,
  ambienceHandle: null
};

const dom = {
  siteTitle: document.getElementById('siteTitle'),
  siteTagline: document.getElementById('siteTagline'),
  utcClock: document.getElementById('utcClock'),
  regionPill: document.getElementById('regionPill'),
  aircraftCount: document.getElementById('aircraftCount'),
  satelliteCount: document.getElementById('satelliteCount'),
  conflictCount: document.getElementById('conflictCount'),
  ewCount: document.getElementById('ewCount'),
  opsStatusText: document.getElementById('opsStatusText'),
  threatScore: document.getElementById('threatScore'),
  threatSummary: document.getElementById('threatSummary'),
  refreshIntelBtn: document.getElementById('refreshIntelBtn'),
  refreshTracksBtn: document.getElementById('refreshTracksBtn'),
  ambienceBtn: document.getElementById('ambienceBtn'),
  regionButtons: document.getElementById('regionButtons'),
  layerButtons: document.getElementById('layerButtons'),
  categoryButtons: document.getElementById('categoryButtons'),
  topicForm: document.getElementById('topicForm'),
  topicInput: document.getElementById('topicInput'),
  briefTitle: document.getElementById('briefTitle'),
  briefBadge: document.getElementById('briefBadge'),
  briefTimestamp: document.getElementById('briefTimestamp'),
  briefPanel: document.getElementById('briefPanel'),
  telemetryPanel: document.getElementById('telemetryPanel'),
  selectedKindBadge: document.getElementById('selectedKindBadge'),
  aircraftRoster: document.getElementById('aircraftRoster'),
  satelliteRoster: document.getElementById('satelliteRoster'),
  conflictList: document.getElementById('conflictList'),
  ewList: document.getElementById('ewList'),
  feedTitle: document.getElementById('feedTitle'),
  feedSubtitle: document.getElementById('feedSubtitle'),
  status: document.getElementById('status'),
  results: document.getElementById('results'),
  airModeBadge: document.getElementById('airModeBadge'),
  airRosterMode: document.getElementById('airRosterMode')
};

boot();

function boot() {
  dom.siteTitle.textContent = SITE.title;
  dom.siteTagline.textContent = SITE.tagline;

  buildRegionButtons();
  buildLayerButtons();
  buildCategoryButtons();
  renderHotspotLists();
  startClock();
  bootGlobe();
  attachEvents();

  selectRegion(REGIONS[0]);
  loadSatelliteCatalog(false);
  startSatelliteLoop();
}

function attachEvents() {
  dom.refreshIntelBtn.addEventListener('click', () => {
    fetchIntel(state.currentSelection.query, state.currentSelection.label, state.currentSelection.id);
  });

  dom.refreshTracksBtn.addEventListener('click', () => {
    refreshAirPicture(true);
    loadSatelliteCatalog(true);
  });

  dom.ambienceBtn.addEventListener('click', toggleAmbience);

  dom.topicForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = dom.topicInput.value.trim();
    if (!value) {
      setFeedStatus('Type a tasking query first.', true);
      return;
    }
    activateCategoryButton('');
    state.currentSelection = { id: slugify(value), label: `Tasking: ${value}`, query: value, type: 'custom' };
    fetchIntel(value, `Tasking: ${value}`, slugify(value));
  });
}

function buildRegionButtons() {
  dom.regionButtons.innerHTML = '';
  REGIONS.forEach(region => {
    const btn = document.createElement('button');
    btn.className = 'mini-btn';
    btn.dataset.selectionId = region.id;
    btn.textContent = region.label;
    btn.addEventListener('click', () => selectRegion(region));
    dom.regionButtons.appendChild(btn);
  });
}

function buildLayerButtons() {
  dom.layerButtons.innerHTML = '';
  LAYERS.forEach(layer => {
    const btn = document.createElement('button');
    btn.className = 'toggle-btn active';
    btn.dataset.layerId = layer.id;
    btn.textContent = layer.label;
    btn.addEventListener('click', () => toggleLayer(layer.id));
    dom.layerButtons.appendChild(btn);
  });
}

function buildCategoryButtons() {
  dom.categoryButtons.innerHTML = '';
  CATEGORIES.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'mini-btn';
    btn.dataset.selectionId = category.id;
    btn.textContent = category.label;
    btn.addEventListener('click', () => {
      activateCategoryButton(category.id);
      state.currentSelection = { id: category.id, label: `Filter: ${category.label}`, query: category.query, type: 'filter' };
      fetchIntel(category.query, `Filter: ${category.label}`, category.id);
    });
    dom.categoryButtons.appendChild(btn);
  });
}

function renderHotspotLists() {
  renderConflictList();
  renderEwList();
}

function renderConflictList() {
  const items = HOTSPOTS.filter(item => item.kind === 'conflict');
  dom.conflictList.innerHTML = '';
  items.forEach(item => {
    const card = hotspotCard(item, 'conflict');
    dom.conflictList.appendChild(card);
  });
}

function renderEwList() {
  const items = HOTSPOTS.filter(item => item.kind === 'ew');
  dom.ewList.innerHTML = '';
  items.forEach(item => {
    const card = hotspotCard(item, 'ew');
    dom.ewList.appendChild(card);
  });
}

function hotspotCard(item, tone) {
  const card = document.createElement('div');
  card.className = 'hotspot-item';
  card.innerHTML = `
    <div class="hotspot-top">
      <div class="roster-left">
        <div class="icon-chip ${tone}">${ICONS[tone]}</div>
        <div>
          <div class="item-title">${escapeHtml(item.label)}</div>
          <div class="item-sub">${escapeHtml(item.actors)}</div>
        </div>
      </div>
      <div class="item-badge ${tone === 'ew' ? 'danger' : 'warn'}">SEV-${item.severity}</div>
    </div>
    <div class="hotspot-copy">${escapeHtml(item.summary)} ${escapeHtml(item.watch)}</div>
  `;
  card.addEventListener('click', () => selectObject(item));
  return card;
}

function startClock() {
  const tick = () => {
    dom.utcClock.textContent = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    }).format(new Date());
  };

  tick();
  window.setInterval(tick, 1000);
}

function bootGlobe() {
  const container = document.getElementById('globeViz');
  state.globe = GlobeFactory()(container)
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
    .showAtmosphere(true)
    .atmosphereColor('#7bdfff')
    .atmosphereAltitude(0.16)
    .pointLabel(buildPointLabel)
    .pointColor(point => point.color)
    .pointAltitude(point => point.altitude ?? 0.02)
    .pointRadius(point => point.radius ?? 0.18)
    .onPointClick(point => {
      if (point.kind === 'region') {
        const region = REGIONS.find(regionItem => regionItem.id === point.id);
        if (region) selectRegion(region);
        return;
      }
      selectObject(point);
    })
    .htmlElementsData([])
    .htmlLat(item => item.lat)
    .htmlLng(item => item.lng)
    .htmlAltitude(item => item.visualAltitude ?? 0.01)
    .htmlElement(buildHtmlMarker)
    .arcsData([])
    .arcColor(arc => arc.color || '#74d3ff')
    .arcStroke(() => 0.4)
    .arcAltitude(arc => arc.altitude ?? 0.08)
    .arcDashLength(0.45)
    .arcDashGap(1)
    .arcDashAnimateTime(2400)
    .pathsData([])
    .pathColor(path => path.color || '#ffcd63')
    .pathStroke(0.5)
    .pathDashLength(0.2)
    .pathDashGap(0.05)
    .pathDashAnimateTime(2800)
    .ringsData([])
    .ringMaxRadius(ring => ring.maxR)
    .ringPropagationSpeed(ring => ring.propagationSpeed)
    .ringRepeatPeriod(ring => ring.repeatPeriod)
    .ringColor(ring => ring.color)
    .width(container.clientWidth)
    .height(container.clientHeight);

  state.globe.controls().autoRotate = true;
  state.globe.controls().autoRotateSpeed = 0.22;

  window.addEventListener('resize', () => {
    state.globe.width(container.clientWidth);
    state.globe.height(container.clientHeight);
  });
}

function buildPointLabel(point) {
  const title = escapeHtml(point.label || point.name || point.callsign || 'Object');
  if (point.kind === 'region') return `${title}<br/>Tap for regional brief`;
  if (point.kind === 'conflict') return `${title}<br/>Conflict zone`;
  if (point.kind === 'ew') return `${title}<br/>GNSS / EW interference`;
  return title;
}

function buildHtmlMarker(item) {
  const marker = document.createElement('div');
  marker.className = `marker ${item.kind}`;
  marker.innerHTML = ICONS[item.kind === 'aircraft' ? 'aircraft' : item.kind === 'satellite' ? 'satellite' : item.kind];
  marker.title = item.label || item.name || item.callsign || '';

  if (item.labelText) {
    const label = document.createElement('div');
    label.className = 'marker-label';
    label.textContent = item.labelText;
    marker.appendChild(label);
  }

  marker.addEventListener('click', event => {
    event.stopPropagation();
    if (item.kind === 'region') {
      const region = REGIONS.find(regionItem => regionItem.id === item.id);
      if (region) selectRegion(region);
      return;
    }
    selectObject(item);
  });

  return marker;
}

function toggleLayer(layerId) {
  if (layerId === 'regions') state.showRegions = !state.showRegions;
  if (layerId === 'aircraft') state.showAircraft = !state.showAircraft;
  if (layerId === 'satellites') state.showSatellites = !state.showSatellites;
  if (layerId === 'conflicts') state.showConflicts = !state.showConflicts;
  if (layerId === 'ew') state.showEw = !state.showEw;

  const btn = dom.layerButtons.querySelector(`[data-layer-id="${layerId}"]`);
  if (btn) btn.classList.toggle('active', isLayerOn(layerId));

  updateGlobe();
}

function isLayerOn(layerId) {
  return {
    regions: state.showRegions,
    aircraft: state.showAircraft,
    satellites: state.showSatellites,
    conflicts: state.showConflicts,
    ew: state.showEw
  }[layerId];
}

function activateRegionButton(selectionId) {
  document.querySelectorAll('#regionButtons .mini-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.selectionId === selectionId);
  });
}

function activateCategoryButton(selectionId) {
  document.querySelectorAll('#categoryButtons .mini-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.selectionId === selectionId);
  });
}

function selectRegion(region) {
  state.selectedRegion = region;
  state.currentSelection = {
    id: region.id,
    label: region.label,
    query: region.query,
    type: 'region'
  };

  activateRegionButton(region.id);
  activateCategoryButton('');
  dom.regionPill.textContent = region.label.toUpperCase();
  focusRegion(region);
  refreshAirPicture(true);
  fetchIntel(region.query, region.label, region.id);
  selectObject(region);
  updateGlobe();
}

function focusRegion(region) {
  state.globe?.pointOfView({ lat: region.lat, lng: region.lng, altitude: 1.55 }, 1200);
}

function selectObject(item) {
  state.selectedObject = item;
  renderTelemetry(item);
  if (item.kind === 'satellite') {
    state.selectedSatellitePath = buildSatellitePath(item);
  } else {
    state.selectedSatellitePath = [];
  }
  updateBrief();
  updateGlobe();
}

async function fetchIntel(query, label, selectionId) {
  dom.feedTitle.textContent = `${label} evidence feed`;
  dom.feedSubtitle.textContent = 'Raw source titles and metadata used to shape the executive brief.';
  setFeedStatus('Pulling source feed...');
  dom.results.innerHTML = '';

  const url = new URL('https://api.gdeltproject.org/api/v2/doc/doc');
  url.searchParams.set('query', query);
  url.searchParams.set('mode', 'artlist');
  url.searchParams.set('format', 'json');
  url.searchParams.set('sort', 'datedesc');
  url.searchParams.set('timespan', '18h');
  url.searchParams.set('maxrecords', '10');

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    state.stories = data.articles || data.article || data.results || [];
    renderStories(state.stories);
    setFeedStatus(`Loaded ${state.stories.length} source items.`);
  } catch (error) {
    console.error(error);
    state.stories = [];
    renderStories([]);
    setFeedStatus('Source feed failed. Brief will lean harder on built-in conflict and EW watch data.', true);
  }

  updateBrief();
  if (selectionId && CATEGORIES.some(category => category.id === selectionId)) {
    activateCategoryButton(selectionId);
  } else if (selectionId && REGIONS.some(region => region.id === selectionId)) {
    activateRegionButton(selectionId);
  }
}

function renderStories(items) {
  dom.results.innerHTML = '';
  if (!items.length) {
    dom.results.innerHTML = `
      <div class="story">
        <div class="story-title">No fresh feed items returned.</div>
        <div class="story-copy">The brief is still built from your current region, conflict watch list, and EW layer.</div>
      </div>
    `;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('a');
    card.className = 'story';
    card.href = item.url || item.domain || '#';
    card.target = '_blank';
    card.rel = 'noreferrer noopener';

    const domain = safeUrlDomain(item.url || item.domain || 'Unknown source');
    const timeLabel = item.seendate || item.date || 'Recent';

    card.innerHTML = `
      <div class="story-title">${escapeHtml(item.title || 'Untitled source')}</div>
      <div class="story-copy">${escapeHtml(trimText(item.socialimage ? 'Image-linked source item in feed.' : 'Open source reporting item feeding the brief.', 160))}</div>
      <div class="story-meta">
        <span>${escapeHtml(domain)}</span>
        <span>${escapeHtml(timeLabel)}</span>
      </div>
    `;

    dom.results.appendChild(card);
  });
}

function updateBrief() {
  const region = state.selectedRegion;
  const regionalHotspots = getRegionalHotspots(region);
  const riskScore = computeThreatScore(region, regionalHotspots, state.stories, state.aircraft, state.satPoints);
  const keywordSummary = summarizeKeywords(state.stories);
  const theme = region.theme;
  const watchBullets = buildWatchBullets(region, regionalHotspots, keywordSummary, state.aircraft, state.satPoints);
  const posture = buildPostureText(region, regionalHotspots, keywordSummary);
  const sourceNote = state.stories.length
    ? `Feed draw: ${state.stories.length} source items in the last 18 hours.`
    : 'Feed draw: fallback mode using built-in conflict and EW watchlists.';

  dom.briefTitle.textContent = `Presidential brief // ${region.label}`;
  dom.briefBadge.textContent = `SEV-${severityFromScore(riskScore)}`;
  dom.briefTimestamp.textContent = `Updated ${new Date().toUTCString()} // ${sourceNote}`;
  dom.threatScore.textContent = String(riskScore);
  dom.threatSummary.textContent = theme;

  dom.briefPanel.innerHTML = `
    <div class="brief-lead">
      ${escapeHtml(region.label)} remains a ${riskLabel(riskScore).toLowerCase()} watch sector. ${escapeHtml(theme)} ${escapeHtml(posture)}
    </div>
    <div class="brief-grid">
      <div class="brief-block">
        <div class="brief-block-title">Assessment</div>
        <div class="small muted">${escapeHtml(buildAssessmentSentence(region, regionalHotspots, keywordSummary))}</div>
      </div>
      <div class="brief-block">
        <div class="brief-block-title">Air / orbit picture</div>
        <div class="small muted">${escapeHtml(buildAirOrbitSentence(state.aircraft, state.satPoints, state.aircraftMode))}</div>
      </div>
    </div>
    <div class="brief-block">
      <div class="brief-block-title">Watch items</div>
      <ul class="brief-bullets">
        ${watchBullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join('')}
      </ul>
    </div>
  `;
}

function buildAssessmentSentence(region, hotspots, keywordSummary) {
  const severe = hotspots.filter(item => item.severity >= 4);
  const hotText = severe.length
    ? `${severe.length} severe hotspot${severe.length > 1 ? 's are' : ' is'} active in this picture, led by ${severe.map(item => item.label).slice(0, 2).join(' and ')}.`
    : 'No single hotspot dominates the board, but the region still carries elevated operational friction.';

  const wordText = keywordSummary.length
    ? ` Feed weighting leans toward ${keywordSummary.slice(0, 3).join(', ')}.`
    : ' Feed weighting is thin, so this brief leans on the built-in watch deck.';

  return `${hotText}${wordText}`;
}

function buildAirOrbitSentence(aircraft, satellites, mode) {
  const airModeText = mode === 'live'
    ? 'Regional air picture is pulling live-compatible state vectors.'
    : mode === 'sim'
      ? 'Regional air picture is in simulated fallback mode with animated track cards.'
      : 'Regional air picture is still warming up.';
  return `${airModeText} Current board shows ${aircraft.length} aircraft icons and ${satellites.length} satellites in the tracked watchlist.`;
}

function buildWatchBullets(region, hotspots, keywordSummary, aircraft, satellites) {
  const bullets = [];

  if (hotspots[0]) bullets.push(`${hotspots[0].label}: ${hotspots[0].watch}`);
  if (hotspots[1]) bullets.push(`${hotspots[1].label}: ${hotspots[1].summary}`);

  const busiestAircraft = aircraft.slice(0, 2).map(item => `${item.callsign} (${item.aircraftTypeLabel})`).join(' and ');
  if (busiestAircraft) bullets.push(`Visible air picture includes ${busiestAircraft}; use the flightline for altitude, heading, and source mode.`);

  const satText = satellites.slice(0, 2).map(item => item.name).join(' and ');
  if (satText) bullets.push(`Orbital watch currently highlights ${satText}; tap either for altitude and future track.`);

  if (keywordSummary[0]) bullets.push(`Source feed emphasis is currently ${keywordSummary.slice(0, 3).join(', ')}.`);

  return bullets.slice(0, 5);
}

function buildPostureText(region, hotspots, keywordSummary) {
  const ewCount = hotspots.filter(item => item.kind === 'ew').length;
  const conflictCount = hotspots.filter(item => item.kind === 'conflict').length;
  const words = keywordSummary.slice(0, 2).join(' / ');
  return `Board count for this sector is ${conflictCount} conflict hotspot${conflictCount !== 1 ? 's' : ''} and ${ewCount} GNSS/EW concern${ewCount !== 1 ? 's' : ''}${words ? `, with feed themes clustering around ${words}` : ''}.`;
}

function computeThreatScore(region, hotspots, stories, aircraft, satellites) {
  let score = 40;
  score += hotspots.reduce((sum, item) => sum + item.severity * 4, 0);
  score += Math.min(stories.length, 10);
  if (hotspots.some(item => item.kind === 'ew')) score += 6;
  if (hotspots.some(item => item.kind === 'conflict' && item.severity >= 4)) score += 8;
  if (aircraft.length >= 10) score += 5;
  if (satellites.length >= 8) score += 3;
  if (region.id === 'middle-east') score += 6;
  return Math.max(25, Math.min(96, score));
}

function severityFromScore(score) {
  if (score >= 85) return 5;
  if (score >= 72) return 4;
  if (score >= 58) return 3;
  if (score >= 44) return 2;
  return 1;
}

function riskLabel(score) {
  if (score >= 85) return 'Critical';
  if (score >= 72) return 'High';
  if (score >= 58) return 'Elevated';
  if (score >= 44) return 'Guarded';
  return 'Baseline';
}

function summarizeKeywords(items) {
  if (!items.length) return [];
  const stop = new Set(['the', 'and', 'with', 'from', 'over', 'into', 'amid', 'after', 'says', 'say', 'its', 'for', 'that', 'this', 'their', 'have', 'has', 'will', 'more', 'than', 'about', 'under', 'around', 'while', 'what', 'where', 'when', 'which', 'into', 'near', 'amid', 'latest', 'live']);
  const bucket = {};

  items.forEach(item => {
    const text = `${item.title || ''} ${item.domain || ''}`.toLowerCase();
    text.replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).forEach(word => {
      if (!word || stop.has(word) || word.length < 4) return;
      bucket[word] = (bucket[word] || 0) + 1;
    });
  });

  const priority = ['drone', 'missile', 'shipping', 'ceasefire', 'airstrike', 'gaza', 'iran', 'ukraine', 'russia', 'satellite', 'cyberattack', 'airspace', 'military', 'navy', 'gps', 'jamming', 'spoofing', 'tanker'];
  const manual = priority.filter(word => bucket[word]).sort((a, b) => bucket[b] - bucket[a]);
  const top = Object.entries(bucket).sort((a, b) => b[1] - a[1]).map(([word]) => word);
  return [...new Set([...manual, ...top])].slice(0, 6).map(word => prettyWord(word));
}

function refreshAirPicture(force = false) {
  if (state.aircraftTimer) {
    window.clearInterval(state.aircraftTimer);
    state.aircraftTimer = null;
  }
  fetchAircraftForRegion(state.selectedRegion, force);
}

async function fetchAircraftForRegion(region, force = false) {
  const bbox = region.bbox;
  const url = new URL('https://opensky-network.org/api/states/all');
  url.searchParams.set('lamin', String(bbox.lamin));
  url.searchParams.set('lamax', String(bbox.lamax));
  url.searchParams.set('lomin', String(bbox.lomin));
  url.searchParams.set('lomax', String(bbox.lomax));

  try {
    if (!force && state.aircraft.length) {
      startAirLoop();
      return;
    }

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const rows = Array.isArray(payload.states) ? payload.states : [];
    const parsed = rows
      .map(parseOpenSkyRow)
      .filter(Boolean)
      .slice(0, AIR_LIMIT);

    if (!parsed.length) throw new Error('No aircraft rows');

    state.aircraft = parsed;
    state.aircraftArcs = state.aircraft.map(buildArcFromAircraft).filter(Boolean);
    state.aircraftMode = 'live';
    dom.airModeBadge.textContent = 'TRACKS: LIVE';
    dom.airRosterMode.textContent = 'LIVE';
    setOpsStatus(`Live-compatible aircraft picture loaded for ${region.label}.`);
  } catch (error) {
    console.warn('Aircraft fetch fallback:', error);
    state.aircraft = buildSimulatedAircraft(region);
    state.aircraftArcs = state.aircraft.map(buildArcFromAircraft).filter(Boolean);
    state.aircraftMode = 'sim';
    dom.airModeBadge.textContent = 'TRACKS: SIM';
    dom.airRosterMode.textContent = 'SIM FALLBACK';
    setOpsStatus(`Aircraft feed fell back to simulation for ${region.label}. Globe and roster stay usable on static hosting.`);
  }

  renderAircraftRoster();
  updateBrief();
  updateGlobe();
  startAirLoop();
}

function startAirLoop() {
  if (state.aircraftTimer) window.clearInterval(state.aircraftTimer);
  state.aircraftTimer = window.setInterval(() => {
    if (state.aircraftMode === 'live') {
      advanceLiveAircraft();
    } else if (state.aircraftMode === 'sim') {
      advanceSimAircraft();
    }
    renderAircraftRoster();
    updateGlobe();
  }, AIR_UPDATE_INTERVAL_MS);
}

function parseOpenSkyRow(row) {
  if (!Array.isArray(row)) return null;
  const [icao24, callsign, country, timePosition, lastContact, lon, lat, baroAltitude, onGround, velocity, trueTrack, verticalRate, sensors, geoAltitude, squawk, spi, positionSource, category] = row;
  if (typeof lat !== 'number' || typeof lon !== 'number') return null;

  const visual = categorizeAircraft(category, velocity);
  return {
    kind: 'aircraft',
    id: `air-${icao24}`,
    icao24,
    callsign: (callsign || icao24).trim(),
    country: country || 'Unknown',
    lat,
    lng: lon,
    heading: trueTrack ?? 0,
    speedKts: velocity ? Math.round(velocity * 1.94384) : 0,
    altFeet: Math.round((geoAltitude ?? baroAltitude ?? 0) * 3.28084),
    verticalRateFpm: verticalRate ? Math.round(verticalRate * 196.85) : 0,
    positionSource,
    category,
    aircraftVisual: visual.key,
    aircraftTypeLabel: visual.label,
    visualAltitude: visualAltitudeFromFeet(Math.round((geoAltitude ?? baroAltitude ?? 0) * 3.28084)),
    color: '#74d3ff',
    radius: 0.13,
    route: projectRoute(lat, lon, trueTrack ?? 0, velocity ?? 0)
  };
}

function categorizeAircraft(category, velocity) {
  if (category === 8) return { key: 'rotary', label: 'Rotorcraft' };
  if (category === 14) return { key: 'uav', label: 'UAV' };
  if (category === 6) return { key: 'cargo', label: 'Heavy' };
  if (category === 7) return { key: 'fighter', label: 'High performance' };
  if (category === 4 || category === 5) return { key: 'tanker', label: 'Large aircraft' };
  if ((velocity ?? 0) > 220) return { key: 'airliner', label: 'Fast mover' };
  return { key: 'isr', label: 'Regional aircraft' };
}

function buildSimulatedAircraft(region) {
  const templates = simTemplatesForRegion(region.id);
  return templates.slice(0, AIR_LIMIT).map((tpl, index) => {
    const progress = seededNumber(`${region.id}-${tpl.callsign}-${index}`);
    const current = interpolateGeo(tpl.route[0], tpl.route[1], progress);
    return {
      kind: 'aircraft',
      id: `sim-${region.id}-${index}`,
      icao24: `sim${index}`,
      callsign: tpl.callsign,
      country: tpl.country,
      lat: current.lat,
      lng: current.lng,
      route: tpl.route,
      progress,
      speedKts: tpl.speedKts,
      altFeet: tpl.altFeet,
      heading: bearingBetween(tpl.route[0], tpl.route[1]),
      verticalRateFpm: tpl.verticalRateFpm,
      aircraftVisual: tpl.aircraftVisual,
      aircraftTypeLabel: tpl.typeLabel,
      labelText: '',
      visualAltitude: visualAltitudeFromFeet(tpl.altFeet),
      color: '#74d3ff',
      radius: 0.13,
      sourceMode: 'sim'
    };
  });
}

function simTemplatesForRegion(regionId) {
  const table = {
    'middle-east': [
      makeTemplate('VIPER-11', 'U.S.', 'fighter', 'F-15E strike', [25.25, 55.36], [31.77, 35.21], 420, 28000),
      makeTemplate('RAVEN-04', 'U.K.', 'isr', 'ISR orbit', [35.1, 33.9], [28.4, 47.9], 290, 24000),
      makeTemplate('MANTA-61', 'Qatar', 'airliner', 'Regional jet', [25.27, 51.61], [29.98, 31.13], 450, 36000),
      makeTemplate('SENTRY-22', 'Coalition', 'awacs', 'AEW&C', [24.5, 54.4], [27.6, 45.0], 350, 32000),
      makeTemplate('TEXACO-90', 'Coalition', 'tanker', 'Aerial tanker', [26.3, 50.1], [31.4, 46.0], 310, 27000),
      makeTemplate('SCOUT-77', 'Unknown', 'uav', 'Long-endurance UAV', [15.6, 44.2], [21.0, 39.2], 190, 18000),
      makeTemplate('CARGO-31', 'UAE', 'cargo', 'Heavy lifter', [24.43, 54.65], [33.3, 44.4], 340, 26000),
      makeTemplate('HAWK-18', 'Israel', 'fighter', 'Air superiority', [31.0, 34.9], [33.0, 36.1], 460, 30000),
      makeTemplate('HELIX-6', 'Jordan', 'rotary', 'Rotary wing', [31.72, 35.99], [29.53, 35.0], 140, 5000),
      makeTemplate('GULF-82', 'Saudi', 'airliner', 'Commercial corridor', [21.49, 39.18], [26.22, 50.19], 430, 34000),
      makeTemplate('SPECTER-2', 'Unknown', 'uav', 'Recon UAV', [34.0, 36.0], [29.5, 34.9], 160, 19000),
      makeTemplate('JAGUAR-5', 'Coalition', 'fighter', 'Strike package', [28.0, 48.0], [24.5, 54.5], 410, 29000)
    ],
    'eastern-europe': [
      makeTemplate('TRIDENT-1', 'NATO', 'isr', 'Border ISR', [54.7, 25.3], [50.4, 30.5], 300, 25000),
      makeTemplate('BUZZARD-9', 'Ukraine', 'uav', 'Recon drone', [47.8, 35.1], [46.5, 30.7], 150, 12000),
      makeTemplate('FALCON-2', 'Ukraine', 'fighter', 'Fast jet', [49.5, 24.0], [47.0, 37.5], 440, 29000),
      makeTemplate('BULWARK-7', 'NATO', 'awacs', 'AEW&C', [52.2, 21.0], [49.0, 30.0], 340, 32000),
      makeTemplate('CARGO-44', 'Poland', 'cargo', 'Logistics lift', [52.2, 20.9], [48.3, 31.1], 320, 23000),
      makeTemplate('ORBIT-15', 'Romania', 'rotary', 'Rotary patrol', [45.7, 28.7], [44.5, 29.6], 130, 4000),
      makeTemplate('SPEAR-19', 'Russia', 'uav', 'Strike UAV', [47.2, 38.9], [46.2, 35.1], 170, 14000),
      makeTemplate('VECTOR-3', 'Ukraine', 'fighter', 'Interceptor', [49.0, 32.0], [46.6, 33.0], 430, 30000),
      makeTemplate('RANGER-8', 'NATO', 'tanker', 'Refuel support', [50.1, 19.9], [48.8, 28.0], 310, 26000),
      makeTemplate('MERLIN-5', 'Civil', 'airliner', 'Civil corridor', [52.3, 13.4], [50.0, 30.5], 450, 36000)
    ],
    'sudan-red-sea': [
      makeTemplate('DAGGER-4', 'Unknown', 'uav', 'Recon UAV', [15.5, 32.5], [12.0, 27.5], 160, 16000),
      makeTemplate('LIFTER-2', 'Aid flight', 'cargo', 'Aid lifter', [15.6, 32.5], [19.6, 37.2], 290, 21000),
      makeTemplate('WATCH-9', 'Coalition', 'isr', 'Maritime ISR', [20.0, 38.0], [14.0, 42.0], 280, 22000),
      makeTemplate('HELIX-4', 'Regional', 'rotary', 'Rotary support', [12.1, 24.9], [14.8, 32.1], 110, 3500),
      makeTemplate('GUARD-6', 'Regional', 'fighter', 'Air policing', [18.0, 31.0], [22.3, 39.0], 380, 25000),
      makeTemplate('SEAFOX-5', 'Regional', 'airliner', 'Red Sea corridor', [21.7, 39.1], [15.3, 38.9], 420, 33000),
      makeTemplate('YANBU-8', 'Saudi', 'tanker', 'Tanker escort', [23.9, 38.0], [19.3, 40.6], 300, 24000),
      makeTemplate('SUDAN-7', 'Regional', 'uav', 'Border watch', [14.3, 33.5], [11.8, 29.8], 150, 10000)
    ],
    'south-china-sea': [
      makeTemplate('MARLIN-3', 'Philippines', 'isr', 'Maritime ISR', [14.6, 120.9], [15.1, 117.7], 260, 19000),
      makeTemplate('DRAGON-5', 'China', 'fighter', 'Patrol fighter', [20.0, 110.3], [16.0, 114.0], 430, 29000),
      makeTemplate('COAST-4', 'Vietnam', 'rotary', 'Coast watch', [10.8, 106.7], [11.1, 114.2], 120, 3500),
      makeTemplate('ANCHOR-9', 'Civil', 'airliner', 'Sea lane transit', [22.3, 114.2], [1.35, 103.99], 440, 36000),
      makeTemplate('SENTRY-12', 'U.S.', 'awacs', 'AEW&C', [18.0, 122.0], [13.0, 117.5], 350, 31000),
      makeTemplate('LANCER-7', 'Unknown', 'uav', 'Long-range UAV', [18.0, 114.0], [10.5, 114.0], 170, 15000),
      makeTemplate('BLUE-2', 'Malaysia', 'cargo', 'Resupply flight', [2.74, 101.7], [7.2, 115.4], 310, 24000),
      makeTemplate('SHIELD-4', 'Japan', 'fighter', 'Partner patrol', [25.0, 121.0], [18.0, 120.0], 420, 28000)
    ],
    'baltic-black-sea': [
      makeTemplate('NORDIC-1', 'NATO', 'isr', 'Signals watch', [59.4, 24.8], [57.0, 22.0], 270, 21000),
      makeTemplate('TRAWLER-8', 'Civil', 'airliner', 'Euro corridor', [60.3, 24.9], [52.5, 13.4], 430, 35000),
      makeTemplate('WARDEN-2', 'NATO', 'awacs', 'Air picture', [54.7, 20.5], [57.2, 18.0], 340, 32000),
      makeTemplate('BLADE-5', 'Unknown', 'uav', 'Recon orbit', [45.0, 33.0], [44.5, 37.0], 150, 12000),
      makeTemplate('FJORD-7', 'Civil', 'rotary', 'SAR rotary', [58.9, 5.7], [60.4, 22.3], 110, 4000),
      makeTemplate('BALTIC-9', 'NATO', 'tanker', 'Support tanker', [54.6, 25.3], [57.5, 18.5], 300, 26000),
      makeTemplate('EMBER-6', 'Regional', 'fighter', 'Quick reaction', [54.9, 23.9], [56.8, 24.3], 430, 29000),
      makeTemplate('BLACK-3', 'Regional', 'cargo', 'South route', [46.4, 30.7], [42.6, 27.7], 300, 21000)
    ],
    'east-africa-congo': [
      makeTemplate('KIVU-1', 'Regional', 'rotary', 'Rotary evac', [-1.7, 29.2], [-2.5, 28.8], 100, 3500),
      makeTemplate('GORA-3', 'Regional', 'uav', 'Recon UAV', [-1.4, 29.5], [-2.0, 28.9], 140, 9000),
      makeTemplate('LIFT-4', 'Aid flight', 'cargo', 'Aid resupply', [-1.3, 36.9], [-1.7, 29.2], 300, 23000),
      makeTemplate('EAGLE-9', 'Regional', 'fighter', 'Fast patrol', [-3.4, 29.3], [-1.7, 29.2], 400, 26000),
      makeTemplate('VIEW-6', 'UN charter', 'airliner', 'Charter route', [-1.96, 30.1], [-4.3, 15.3], 420, 32000),
      makeTemplate('WATCH-7', 'Regional', 'isr', 'Border ISR', [0.3, 32.5], [-1.7, 29.2], 250, 19000),
      makeTemplate('CARGO-2', 'Regional', 'cargo', 'Lift tasking', [-6.8, 39.2], [-1.7, 29.2], 320, 25000)
    ],
    'north-america': [
      makeTemplate('EAGLE-01', 'U.S.', 'fighter', 'Air defense', [32.9, -97.0], [39.0, -104.8], 430, 29000),
      makeTemplate('SKY-22', 'Civil', 'airliner', 'Domestic corridor', [33.6, -84.4], [41.9, -87.9], 450, 36000),
      makeTemplate('RANGER-13', 'U.S.', 'awacs', 'Air picture', [36.2, -95.9], [38.8, -98.0], 330, 30000),
      makeTemplate('COAST-7', 'U.S.', 'rotary', 'Coast watch', [29.9, -90.1], [27.8, -97.4], 120, 4000),
      makeTemplate('ORBIT-5', 'U.S.', 'isr', 'Homeland ISR', [34.7, -86.7], [37.6, -122.4], 290, 21000),
      makeTemplate('LIFTER-8', 'U.S.', 'cargo', 'Heavy airlift', [39.9, -75.2], [34.7, -92.3], 330, 25000),
      makeTemplate('SCOUT-4', 'U.S.', 'uav', 'Border watch', [31.8, -106.4], [32.3, -117.0], 170, 14000),
      makeTemplate('TEXACO-2', 'U.S.', 'tanker', 'Refuel lane', [40.0, -95.0], [34.9, -106.0], 300, 26000)
    ]
  };
  return table[regionId] || table['north-america'];
}

function makeTemplate(callsign, country, aircraftVisual, typeLabel, start, end, speedKts, altFeet) {
  return {
    callsign,
    country,
    aircraftVisual,
    typeLabel,
    route: [geo(start[0], start[1]), geo(end[0], end[1])],
    speedKts,
    altFeet,
    verticalRateFpm: Math.round((seededNumber(callsign) - 0.5) * 1200)
  };
}

function geo(lat, lng) {
  return { lat, lng };
}

function advanceSimAircraft() {
  state.aircraft = state.aircraft.map(item => {
    const delta = item.speedKts / 800000;
    let progress = item.progress + delta;
    let route = item.route;
    if (progress > 1) {
      progress = 0;
      route = [route[1], route[0]];
    }
    const current = interpolateGeo(route[0], route[1], progress);
    return {
      ...item,
      route,
      progress,
      lat: current.lat,
      lng: current.lng,
      heading: bearingBetween(route[0], route[1])
    };
  });
  syncSelectedAircraft();
  state.aircraftArcs = state.aircraft.map(buildArcFromAircraft).filter(Boolean);
}

function advanceLiveAircraft() {
  state.aircraft = state.aircraft.map(item => {
    const distanceKm = (item.speedKts || 0) * 1.852 * (AIR_UPDATE_INTERVAL_MS / 3600000);
    const next = moveAlongBearing(item.lat, item.lng, item.heading || 0, distanceKm);
    return {
      ...item,
      lat: next.lat,
      lng: next.lng,
      route: projectRoute(next.lat, next.lng, item.heading || 0, (item.speedKts || 0) / 1.94384)
    };
  });
  syncSelectedAircraft();
  state.aircraftArcs = state.aircraft.map(buildArcFromAircraft).filter(Boolean);
}


function syncSelectedAircraft() {
  if (state.selectedObject?.kind !== 'aircraft') return;
  const match = state.aircraft.find(item => item.id === state.selectedObject.id);
  if (match) {
    state.selectedObject = match;
    renderTelemetry(match);
  }
}

function renderAircraftRoster() {
  dom.aircraftRoster.innerHTML = '';
  if (!state.aircraft.length) {
    dom.aircraftRoster.innerHTML = '<div class="roster-card-item"><div class="item-title">No aircraft loaded.</div><div class="story-copy">Try another region or refresh tracks.</div></div>';
    return;
  }
  state.aircraft.forEach(item => {
    const card = document.createElement('div');
    card.className = 'roster-card-item';
    card.innerHTML = `
      <div class="roster-top">
        <div class="roster-left">
          <div class="icon-chip aircraft">${ICONS.aircraft}</div>
          <div>
            <div class="item-title">${escapeHtml(item.callsign)}</div>
            <div class="item-sub">${escapeHtml(item.aircraftTypeLabel)} // ${escapeHtml(item.country)}</div>
          </div>
        </div>
        <div class="item-badge">${item.sourceMode === 'sim' || state.aircraftMode === 'sim' ? 'SIM' : 'LIVE'}</div>
      </div>
      <div class="item-meta">
        <div>ALT ${escapeHtml(formatFeet(item.altFeet))}</div>
        <div>SPD ${escapeHtml(formatKts(item.speedKts))}</div>
        <div>HDG ${escapeHtml(String(Math.round(item.heading || 0)).padStart(3, '0'))}°</div>
        <div>VR ${escapeHtml(formatFpm(item.verticalRateFpm))}</div>
      </div>
    `;
    card.addEventListener('click', () => selectObject(item));
    dom.aircraftRoster.appendChild(card);
  });

  dom.aircraftCount.textContent = String(state.aircraft.length);
}

async function loadSatelliteCatalog(force = false) {
  const cached = readSatCache();
  if (!force && cached) {
    state.satCatalog = cached;
    updateSatellitePositions();
    renderSatelliteRoster();
    setOpsStatus('Satellite catalog loaded from cache.');
    return;
  }

  try {
    const all = [];
    for (const group of SATELLITE_GROUPS) {
      const response = await fetch(group.url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      const parsed = parseTleText(text, group.label).slice(0, SAT_LIMIT_PER_GROUP);
      all.push(...parsed);
    }
    if (!all.length) throw new Error('No TLE records parsed');
    state.satCatalog = all;
    writeSatCache(all);
    setOpsStatus('Fresh satellite catalog loaded.');
  } catch (error) {
    console.warn('Satellite catalog fallback:', error);
    state.satCatalog = FALLBACK_TLES.map(item => ({ ...item, satrec: satellite.twoline2satrec(item.line1, item.line2) }));
    setOpsStatus('Satellite catalog fell back to bundled TLE set.');
  }

  updateSatellitePositions();
  renderSatelliteRoster();
  updateBrief();
  updateGlobe();
}

function startSatelliteLoop() {
  if (state.satTimer) window.clearInterval(state.satTimer);
  state.satTimer = window.setInterval(() => {
    updateSatellitePositions();
    renderSatelliteRoster();
    updateGlobe();
  }, SAT_UPDATE_INTERVAL_MS);
}

function parseTleText(text, groupLabel) {
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const records = [];
  for (let index = 0; index < lines.length; index += 3) {
    const name = lines[index];
    const line1 = lines[index + 1];
    const line2 = lines[index + 2];
    if (!name || !line1?.startsWith('1 ') || !line2?.startsWith('2 ')) continue;
    records.push({ name, groupLabel, line1, line2, satrec: satellite.twoline2satrec(line1, line2) });
  }
  return records;
}

function updateSatellitePositions() {
  const now = new Date();
  state.satPoints = state.satCatalog
    .map(entry => propagateSat(entry, now))
    .filter(Boolean);

  if (state.selectedObject?.kind === 'satellite') {
    const match = state.satPoints.find(item => item.id === state.selectedObject.id);
    if (match) {
      state.selectedObject = match;
      renderTelemetry(match);
      state.selectedSatellitePath = buildSatellitePath(match);
    } else {
      state.selectedSatellitePath = buildSatellitePath(state.selectedObject);
    }
  }

  dom.satelliteCount.textContent = String(state.satPoints.length);
}

function propagateSat(entry, when) {
  try {
    const propagated = satellite.propagate(entry.satrec, when);
    if (!propagated.position) return null;
    const gmst = satellite.gstime(when);
    const geoPos = satellite.eciToGeodetic(propagated.position, gmst);
    const lat = satellite.degreesLat(geoPos.latitude);
    const lng = satellite.degreesLong(geoPos.longitude);
    const altKm = geoPos.height;
    return {
      kind: 'satellite',
      id: `sat-${slugify(entry.name)}-${entry.groupLabel}`,
      name: entry.name,
      groupLabel: entry.groupLabel,
      lat,
      lng,
      altKm,
      visualAltitude: visualAltitudeFromKm(altKm),
      color: '#ffcd63',
      radius: 0.12,
      satrec: entry.satrec,
      line1: entry.line1,
      line2: entry.line2,
      aircraftVisual: 'satellite'
    };
  } catch (error) {
    console.warn('propagate sat failed', error);
    return null;
  }
}

function buildSatellitePath(item) {
  if (!item?.satrec) return [];
  const path = [];
  const now = Date.now();
  for (let minutes = -24; minutes <= 24; minutes += 3) {
    const sampleTime = new Date(now + minutes * 60 * 1000);
    const propagated = satellite.propagate(item.satrec, sampleTime);
    if (!propagated.position) continue;
    const gmst = satellite.gstime(sampleTime);
    const geoPos = satellite.eciToGeodetic(propagated.position, gmst);
    path.push([
      satellite.degreesLat(geoPos.latitude),
      satellite.degreesLong(geoPos.longitude),
      visualAltitudeFromKm(geoPos.height)
    ]);
  }
  return [{ kind: 'path', color: '#ffcd63', coords: path }];
}

function renderSatelliteRoster() {
  dom.satelliteRoster.innerHTML = '';
  if (!state.satPoints.length) {
    dom.satelliteRoster.innerHTML = '<div class="roster-card-item"><div class="item-title">No satellites tracked yet.</div><div class="story-copy">Refresh tracks or wait for the catalog to load.</div></div>';
    return;
  }
  state.satPoints.forEach(item => {
    const card = document.createElement('div');
    card.className = 'roster-card-item';
    card.innerHTML = `
      <div class="roster-top">
        <div class="roster-left">
          <div class="icon-chip satellite">${ICONS.satellite}</div>
          <div>
            <div class="item-title">${escapeHtml(trimText(item.name, 34))}</div>
            <div class="item-sub">${escapeHtml(item.groupLabel)}</div>
          </div>
        </div>
        <div class="item-badge warn">ORB</div>
      </div>
      <div class="item-meta">
        <div>ALT ${escapeHtml(formatKm(item.altKm))}</div>
        <div>LAT ${escapeHtml(item.lat.toFixed(1))}°</div>
        <div>LON ${escapeHtml(item.lng.toFixed(1))}°</div>
        <div>VIS ${escapeHtml(item.visualAltitude.toFixed(3))}</div>
      </div>
    `;
    card.addEventListener('click', () => selectObject(item));
    dom.satelliteRoster.appendChild(card);
  });
}

function updateGlobe() {
  if (!state.globe) return;

  const points = [];
  const htmlItems = [];
  const rings = [];
  const arcs = [];
  const paths = [];

  if (state.showRegions) {
    REGIONS.forEach(region => {
      points.push({
        ...region,
        kind: 'region',
        color: region.id === state.selectedRegion.id ? '#7bf0ba' : '#6bc9ff',
        radius: region.id === state.selectedRegion.id ? 0.22 : 0.16,
        altitude: region.id === state.selectedRegion.id ? 0.02 : 0.014
      });
      htmlItems.push({
        ...region,
        kind: 'region',
        visualAltitude: 0.001,
        labelText: region.id === state.selectedRegion.id ? region.label : ''
      });
    });
  }

  if (state.showConflicts || state.showEw) {
    HOTSPOTS.forEach(item => {
      const isConflict = item.kind === 'conflict';
      if ((isConflict && !state.showConflicts) || (!isConflict && !state.showEw)) return;
      points.push({
        ...item,
        color: isConflict ? '#ff9e58' : '#ff6b6b',
        radius: item.severity >= 4 ? 0.21 : 0.16,
        altitude: isConflict ? 0.018 : 0.015
      });
      htmlItems.push({
        ...item,
        visualAltitude: isConflict ? 0.012 : 0.01,
        labelText: item.label
      });
      rings.push({
        lat: item.lat,
        lng: item.lng,
        maxR: isConflict ? 3.4 : 4.2,
        propagationSpeed: isConflict ? 1.1 : 1.5,
        repeatPeriod: isConflict ? 2600 : 2200,
        color: () => isConflict ? 'rgba(255,158,88,0.38)' : 'rgba(255,107,107,0.38)'
      });
    });
  }

  if (state.showAircraft) {
    state.aircraft.forEach(item => {
      htmlItems.push({ ...item, kind: 'aircraft', labelText: '' });
    });
    arcs.push(...state.aircraftArcs);
  }

  if (state.showSatellites) {
    state.satPoints.forEach(item => {
      htmlItems.push({ ...item, kind: 'satellite', labelText: '' });
    });
    if (state.selectedSatellitePath?.length) {
      paths.push(...state.selectedSatellitePath);
    }
  }

  if (state.selectedObject?.lat != null && state.selectedObject?.lng != null) {
    rings.push({
      lat: state.selectedObject.lat,
      lng: state.selectedObject.lng,
      maxR: 2.4,
      propagationSpeed: 1.8,
      repeatPeriod: 1500,
      color: () => 'rgba(116,211,255,0.45)'
    });
  }

  state.globe.pointsData(points);
  state.globe.htmlElementsData(htmlItems);
  state.globe.ringsData(rings);
  state.globe.arcsData(arcs);
  state.globe.pathsData(paths);

  dom.conflictCount.textContent = String(HOTSPOTS.filter(item => item.kind === 'conflict' && item.regionIds.includes(state.selectedRegion.id)).length);
  dom.ewCount.textContent = String(HOTSPOTS.filter(item => item.kind === 'ew' && item.regionIds.includes(state.selectedRegion.id)).length);
}

function buildArcFromAircraft(item) {
  if (!item.route?.[0] || !item.route?.[1]) return null;
  return {
    startLat: item.route[0].lat,
    startLng: item.route[0].lng,
    endLat: item.route[1].lat,
    endLng: item.route[1].lng,
    altitude: 0.1,
    color: item.sourceMode === 'sim' || state.aircraftMode === 'sim' ? '#74d3ff' : '#7bf0ba'
  };
}

function getRegionalHotspots(region) {
  return HOTSPOTS.filter(item => item.regionIds.includes(region.id));
}

function renderTelemetry(item) {
  if (!item) return;
  let visualKey = 'region';
  let badge = 'READY';
  let title = item.label || item.name || item.callsign || 'Object';
  let copy = '';
  let stats = [];
  let notes = [];

  if (item.kind === 'aircraft') {
    visualKey = item.aircraftVisual || 'airliner';
    badge = state.aircraftMode === 'live' ? 'AIRCRAFT' : 'AIRCRAFT / SIM';
    copy = `${item.aircraftTypeLabel} track visible over ${item.country}. Tap the flightline card or globe icon to keep this object pinned while the rest of the picture updates.`;
    stats = [
      ['Callsign', item.callsign],
      ['Type', item.aircraftTypeLabel],
      ['Altitude', formatFeet(item.altFeet)],
      ['Speed', formatKts(item.speedKts)],
      ['Heading', `${Math.round(item.heading || 0).toString().padStart(3, '0')}°`],
      ['Vertical rate', formatFpm(item.verticalRateFpm)],
      ['Country', item.country],
      ['Source', state.aircraftMode === 'live' ? 'Live-compatible' : 'Simulated fallback']
    ];
    notes = [
      'Aircraft visuals are compressed so tracks stay readable on a phone-sized globe.',
      state.aircraftMode === 'live'
        ? 'Type labels come from category/behavior mapping, not full tail-specific identification.'
        : 'Simulation fallback preserves the experience when static-hosted direct feeds do not answer cleanly.'
    ];
  } else if (item.kind === 'satellite') {
    visualKey = 'satellite';
    badge = 'SATELLITE';
    copy = `${item.groupLabel} object propagated locally in your browser from TLE data. The gold dashed trail shows the short-term ground track for the selected satellite.`;
    stats = [
      ['Name', trimText(item.name, 30)],
      ['Group', item.groupLabel],
      ['Altitude', formatKm(item.altKm)],
      ['Latitude', `${item.lat.toFixed(2)}°`],
      ['Longitude', `${item.lng.toFixed(2)}°`],
      ['Visual alt', item.visualAltitude.toFixed(3)],
      ['Catalog mode', 'TLE / propagated'],
      ['Track', 'Short-term projected']
    ];
    notes = [
      'Orbital track is a visual planning aid, not a precision conjunction tool.',
      'Catalog refresh is intentionally throttled to avoid hammering public TLE sources.'
    ];
  } else if (item.kind === 'conflict') {
    visualKey = 'conflict';
    badge = 'CONFLICT';
    copy = item.summary;
    stats = [
      ['Zone', item.label],
      ['Severity', `SEV-${item.severity}`],
      ['Actors', item.actors],
      ['Watch', item.watch],
      ['Region link', item.regionIds.join(', ')],
      ['Layer', 'Conflict watch']
    ];
    notes = [item.source, 'This hotspot is manually curated so the globe stays readable and the brief stays useful.'];
  } else if (item.kind === 'ew') {
    visualKey = 'ew';
    badge = 'GNSS / EW';
    copy = item.summary;
    stats = [
      ['Zone', item.label],
      ['Severity', `SEV-${item.severity}`],
      ['Risk', 'Navigation integrity degraded'],
      ['Watch', item.watch],
      ['Region link', item.regionIds.join(', ')],
      ['Layer', 'EW / GNSS watch']
    ];
    notes = [item.source, 'This layer is designed to show where signal disruption matters operationally, not just where it exists abstractly.'];
  } else {
    visualKey = 'region';
    badge = 'REGION';
    copy = `${item.label} is the current focus sector. Use the brief, flightline, and hotspot cards together instead of treating the globe like a single-source map.`;
    stats = [
      ['Region', item.label],
      ['Latitude', `${item.lat.toFixed(1)}°`],
      ['Longitude', `${item.lng.toFixed(1)}°`],
      ['Theme', item.theme],
      ['Query', item.query],
      ['BBox', `${item.bbox.lamin}/${item.bbox.lamax} // ${item.bbox.lomin}/${item.bbox.lomax}`]
    ];
    notes = ['The current region drives the brief, local aircraft picture, and hotspot focus.', 'Use filter buttons to re-task the evidence feed without changing the geographic focus.'];
  }

  dom.selectedKindBadge.textContent = badge;
  dom.telemetryPanel.innerHTML = `
    <div class="telemetry-hero">
      <div class="telemetry-overlay">
        <div class="telemetry-eyebrow">${escapeHtml(AIRCRAFT_VISUALS[visualKey].label)}</div>
        <h3 class="telemetry-title">${escapeHtml(title)}</h3>
        <div class="telemetry-copy">${escapeHtml(copy)}</div>
      </div>
      <div class="telemetry-silhouette">${AIRCRAFT_VISUALS[visualKey].svg}</div>
    </div>
    <div class="telemetry-grid">
      ${stats.map(([label, value]) => `
        <div class="telemetry-stat">
          <span class="label">${escapeHtml(label)}</span>
          <strong>${escapeHtml(trimText(String(value), 120))}</strong>
        </div>
      `).join('')}
    </div>
    <div class="telemetry-notes">
      ${notes.map(note => `<div>${escapeHtml(note)}</div>`).join('<br/>')}
    </div>
  `;
}

function toggleAmbience() {
  if (state.ambienceOn) {
    stopAmbience();
    return;
  }
  startAmbience();
}

function startAmbience() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    setOpsStatus('This browser does not expose Web Audio, so ambience stays off.');
    return;
  }

  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0.015;
  master.connect(ctx.destination);

  const drone = ctx.createOscillator();
  drone.type = 'sine';
  drone.frequency.value = 48;
  drone.connect(master);
  drone.start();

  const pulseLoop = window.setInterval(() => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.018, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.24);
    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  }, 2500);

  state.ambienceHandle = { ctx, master, drone, pulseLoop };
  state.ambienceOn = true;
  dom.ambienceBtn.textContent = 'Ambience on';
  setOpsStatus('Ambient watch-floor audio enabled.');
}

function stopAmbience() {
  const handle = state.ambienceHandle;
  if (!handle) return;
  window.clearInterval(handle.pulseLoop);
  handle.drone.stop();
  handle.master.disconnect();
  handle.ctx.close();
  state.ambienceHandle = null;
  state.ambienceOn = false;
  dom.ambienceBtn.textContent = 'Ambience off';
  setOpsStatus('Ambient watch-floor audio disabled.');
}

function setFeedStatus(message, isError = false) {
  dom.status.textContent = message;
  dom.status.classList.toggle('error', isError);
}

function setOpsStatus(message) {
  dom.opsStatusText.textContent = message;
}

function readSatCache() {
  try {
    const raw = localStorage.getItem(SAT_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.timestamp || Date.now() - parsed.timestamp > SAT_CACHE_MAX_AGE_MS) return null;
    return parsed.items.map(item => ({ ...item, satrec: satellite.twoline2satrec(item.line1, item.line2) }));
  } catch {
    return null;
  }
}

function writeSatCache(items) {
  try {
    localStorage.setItem(SAT_CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      items: items.map(item => ({ name: item.name, groupLabel: item.groupLabel, line1: item.line1, line2: item.line2 }))
    }));
  } catch {
    // ignore
  }
}

function projectRoute(lat, lng, headingDeg, velocityMs) {
  const distanceKm = Math.max(120, Math.min(900, (velocityMs || 160) * 3.6 * 0.9));
  const start = moveAlongBearing(lat, lng, headingDeg + 180, distanceKm * 0.35);
  const end = moveAlongBearing(lat, lng, headingDeg, distanceKm * 0.65);
  return [start, end];
}

function moveAlongBearing(latDeg, lngDeg, bearingDeg, distanceKm) {
  const radius = 6371;
  const lat1 = degToRad(latDeg);
  const lng1 = degToRad(lngDeg);
  const brng = degToRad(bearingDeg);
  const d = distanceKm / radius;

  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng));
  const lng2 = lng1 + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));

  return { lat: radToDeg(lat2), lng: normalizeLng(radToDeg(lng2)) };
}

function interpolateGeo(start, end, t) {
  return {
    lat: start.lat + (end.lat - start.lat) * t,
    lng: normalizeLng(start.lng + shortestLngDelta(start.lng, end.lng) * t)
  };
}

function shortestLngDelta(from, to) {
  let delta = to - from;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return delta;
}

function bearingBetween(start, end) {
  const lat1 = degToRad(start.lat);
  const lat2 = degToRad(end.lat);
  const diffLong = degToRad(end.lng - start.lng);
  const y = Math.sin(diffLong) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(diffLong);
  return (radToDeg(Math.atan2(y, x)) + 360) % 360;
}

function visualAltitudeFromFeet(feet) {
  return Math.max(0.01, Math.min(0.09, feet / 500000));
}

function visualAltitudeFromKm(km) {
  return Math.max(0.06, Math.min(0.25, km / 45000));
}

function formatFeet(value) {
  return `${Math.round(value).toLocaleString()} ft`;
}

function formatKts(value) {
  return `${Math.round(value).toLocaleString()} kts`;
}

function formatKm(value) {
  return `${Math.round(value).toLocaleString()} km`;
}

function formatFpm(value) {
  const rounded = Math.round(value || 0);
  return `${rounded >= 0 ? '+' : ''}${rounded.toLocaleString()} fpm`;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function trimText(text, maxLength) {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;
}

function safeUrlDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function seededNumber(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return ((hash >>> 0) % 1000) / 1000;
}

function prettyWord(word) {
  const replacements = {
    gps: 'GPS',
    ew: 'EW',
    airspace: 'airspace',
    cyberattack: 'cyberattack',
    missile: 'missile',
    drone: 'drone',
    shipping: 'shipping',
    spoofing: 'spoofing',
    jamming: 'jamming'
  };
  return replacements[word] || word;
}

function degToRad(deg) {
  return deg * Math.PI / 180;
}

function radToDeg(rad) {
  return rad * 180 / Math.PI;
}

function normalizeLng(lng) {
  let value = lng;
  while (value > 180) value -= 360;
  while (value < -180) value += 360;
  return value;
}
