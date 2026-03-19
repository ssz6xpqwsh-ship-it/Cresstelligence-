const GlobeFactory = window.Globe;

const SITE = {
  title: 'Cresstelligence',
  tagline: 'A cleaner global picture for aviation, defense, conflict, and space.'
};

const PLANE_SVGS = {
  fighter: `<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><path d="M32 4 39 20l17 8-12 4 4 18-10-6-6 16-6-16-10 6 4-18-12-4 17-8z"/></svg>`,
  awacs: `<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><path d="M31 4c3 0 5 2 5 5v9l8 5h8l4 5-12 2-8-1v12l8 12v5l-12-4-4 6-4-6-12 4v-5l8-12V29l-8 1-12-2 4-5h8l8-5V9c0-3 2-5 5-5z"/></svg>`,
  tanker: `<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><path d="M31 4c3 0 5 2 5 5v11l10 5 9 1 4 5-13 2-10-1v13l7 10v5l-11-4-4 6-4-6-11 4v-5l7-10V32l-10 1-13-2 4-5 9-1 10-5V9c0-3 2-5 5-5z"/></svg>`,
  airliner: `<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><path d="M31 3c3 0 5 2 5 5v13l12 6 10 1 3 5-13 2-12-1v13l6 10v4l-10-4-6 7-6-7-10 4v-4l6-10V34l-12 1-13-2 3-5 10-1 12-6V8c0-3 2-5 5-5z"/></svg>`
};

const SAT_SVG = `<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M26 30h12v4H26z" fill="currentColor"/><path d="m18 22 8 8-8 8-8-8zm28 0 8 8-8 8-8-8z"/><path d="M32 12v18m0 4v18M22 32H8m48 0H42"/></g></svg>`;

const REGIONS = [
  {
    id: 'global',
    name: 'Global',
    lat: 20,
    lng: 10,
    altitude: 2.05,
    severity: 'Sev 2',
    summary: 'The current picture is defined by overlapping air-defense modernization, drone-heavy warfare, maritime chokepoint pressure, and persistent navigation risk near active theaters.',
    aviation: 'Commercial traffic remains dense across core corridors, while military support missions cluster near high-friction belts and key logistics bridges.',
    defense: 'The loudest patterns are layered air defense, long-range strike adaptation, ISR demand, and force posture signaling around maritime and border flashpoints.',
    watch: ['Airspace restrictions near active fronts', 'Missile and drone warning cycles', 'Civil-military deconfliction in busy corridors'],
    pressure: ['Eastern Europe / Black Sea', 'Levant / Gulf / Red Sea', 'South China Sea and alliance patrol lanes']
  },
  {
    id: 'eurasia',
    name: 'Eastern Europe / Black Sea',
    lat: 47,
    lng: 33,
    altitude: 1.45,
    severity: 'Sev 4',
    summary: 'This region stays elevated because strike depth, maritime access, and air-defense adaptation all feed each other in a tight operating space.',
    aviation: 'Expect reroutes, higher military air-support density, and more surveillance / tanker patterns around the Black Sea shoulders.',
    defense: 'The defense story is layered: long-range drones, missile defense stress, coastal access concerns, and heavy ISR demand.',
    watch: ['Changes in air-defense posture', 'Black Sea shipping and aerial corridor shifts', 'Strike tempo against logistics and infrastructure'],
    pressure: ['Crimea / Black Sea', 'Odesa approaches', 'Border-adjacent support corridors']
  },
  {
    id: 'middle-east',
    name: 'Levant / Gulf / Red Sea',
    lat: 27,
    lng: 44,
    altitude: 1.5,
    severity: 'Sev 5',
    summary: 'Regional overlap between maritime risk, missile defense, and expeditionary air operations keeps this one of the most sensitive sectors on the board.',
    aviation: 'Commercial operators watch reroutes and insurance exposure while military air movements emphasize ISR, tanker support, and quick-reaction coverage.',
    defense: 'This region is all about escalation management: proxy pressure, integrated air defense, maritime interdiction, and strategic infrastructure protection.',
    watch: ['Red Sea transit security', 'Missile / drone launch windows', 'Air-defense saturation risk around key facilities'],
    pressure: ['Bab el-Mandeb', 'Eastern Mediterranean', 'Gulf energy and logistics nodes']
  },
  {
    id: 'indopacific',
    name: 'South China Sea / Indo-Pacific',
    lat: 15,
    lng: 120,
    altitude: 1.55,
    severity: 'Sev 3',
    summary: 'The picture here is less about one active war and more about patrol tempo, signaling, contested maritime space, and escalation management.',
    aviation: 'Air activity tends to revolve around patrol, surveillance, aerial refueling, and busy civil corridors that share space with state signaling.',
    defense: 'The central issue is coercion without uncontrolled escalation: sovereignty friction, gray-zone activity, and alliance assurance.',
    watch: ['Patrol tempo around disputed features', 'ADIZ / intercept signaling', 'Civil corridor disruption from military posturing'],
    pressure: ['Luzon approaches', 'Central South China Sea', 'Alliance exercise areas']
  },
  {
    id: 'north-atlantic',
    name: 'North Atlantic / Arctic approach',
    lat: 58,
    lng: -22,
    altitude: 1.58,
    severity: 'Sev 2',
    summary: 'This sector matters because it links reinforcement routes, air-defense warning networks, and undersea / maritime posture near the high north.',
    aviation: 'Heavy civil flows meet strategic mobility, patrol aviation, and the long-haul corridors that matter in any reinforcement scenario.',
    defense: 'The key defense theme is early warning, route assurance, and maintaining secure movement across a very large operating space.',
    watch: ['Long-range patrol activity', 'Weather-driven route compression', 'Air and maritime warning posture'],
    pressure: ['GIUK-related transit space', 'Northern reinforcement routes', 'Arctic surveillance lanes']
  },
  {
    id: 'east-africa',
    name: 'Horn / East Africa',
    lat: 9,
    lng: 40,
    altitude: 1.62,
    severity: 'Sev 3',
    summary: 'This sector combines fragile state security, maritime route importance, and spillover from nearby conflict zones.',
    aviation: 'Expect uneven civil recoverability, patchy airspace confidence, and military logistics / ISR importance near littoral choke points.',
    defense: 'Defense attention here centers on corridor stability, insurgent or militia pressure, and the strategic consequences of maritime disruption.',
    watch: ['Port and corridor resilience', 'Red Sea spillover', 'Humanitarian / security air bridge demand'],
    pressure: ['Horn littorals', 'Aden approaches', 'Interior instability corridors']
  }
];

const CONFLICTS = [
  { id: 'conf-1', name: 'Black Sea strike belt', type: 'Conflict', regionId: 'eurasia', lat: 45.6, lng: 34.8, severity: 'High', summary: 'Persistent strike, ISR, and maritime-access pressure.' },
  { id: 'conf-2', name: 'Levant war arc', type: 'Conflict', regionId: 'middle-east', lat: 32.2, lng: 37.5, severity: 'Critical', summary: 'Dense overlap of air defense, proxy pressure, and force posture.' },
  { id: 'conf-3', name: 'Red Sea chokepoint', type: 'Conflict', regionId: 'middle-east', lat: 16.8, lng: 42.1, severity: 'High', summary: 'Shipping risk and corridor security remain tightly linked.' },
  { id: 'conf-4', name: 'South China Sea friction', type: 'Conflict', regionId: 'indopacific', lat: 14.4, lng: 116.8, severity: 'Elevated', summary: 'Patrol tempo and contested sovereignty keep the zone tense.' },
  { id: 'conf-5', name: 'Horn corridor instability', type: 'Conflict', regionId: 'east-africa', lat: 13.5, lng: 43.4, severity: 'Elevated', summary: 'Fragility plus maritime proximity amplifies regional risk.' }
];

const EW_ZONES = [
  { id: 'ew-1', name: 'Eastern Med GNSS interference', type: 'GNSS / EW', regionId: 'middle-east', lat: 34.0, lng: 30.8, severity: 'Degraded', summary: 'Reported navigation reliability issues can complicate civil and military planning.' },
  { id: 'ew-2', name: 'Baltic / northeast EW pressure', type: 'GNSS / EW', regionId: 'north-atlantic', lat: 58.4, lng: 25.0, severity: 'Intermittent', summary: 'Navigation confidence can degrade during heightened regional activity.' },
  { id: 'ew-3', name: 'Black Sea navigation stress', type: 'GNSS / EW', regionId: 'eurasia', lat: 44.7, lng: 37.6, severity: 'Degraded', summary: 'Aviation and maritime users should expect contested PNT conditions.' },
  { id: 'ew-4', name: 'Gulf corridor interference watch', type: 'GNSS / EW', regionId: 'middle-east', lat: 26.4, lng: 52.9, severity: 'Watch', summary: 'Sensitive infrastructure and dense traffic make PNT degradation significant.' }
];

const AIRCRAFT = [
  {
    id: 'air-1',
    callsign: 'RAPTOR 11',
    type: 'F-35A',
    role: 'CAP',
    affiliation: 'Coalition',
    regionId: 'middle-east',
    symbol: 'fighter',
    altitudeFt: 32000,
    speedKt: 465,
    route: [[26, 46], [29, 50], [31, 46], [28, 43]]
  },
  {
    id: 'air-2',
    callsign: 'SENTRY 61',
    type: 'E-3',
    role: 'AEW&C',
    affiliation: 'NATO',
    regionId: 'north-atlantic',
    symbol: 'awacs',
    altitudeFt: 29000,
    speedKt: 360,
    route: [[59, -15], [58, -5], [61, -12], [58, -20]]
  },
  {
    id: 'air-3',
    callsign: 'SHELL 42',
    type: 'KC-46',
    role: 'Tanker',
    affiliation: 'USAF',
    regionId: 'eurasia',
    symbol: 'tanker',
    altitudeFt: 27000,
    speedKt: 340,
    route: [[48, 24], [49, 31], [47, 36], [46, 29]]
  },
  {
    id: 'air-4',
    callsign: 'ATLAS 205',
    type: 'A400M',
    role: 'Logistics',
    affiliation: 'NATO',
    regionId: 'eurasia',
    symbol: 'airliner',
    altitudeFt: 25000,
    speedKt: 300,
    route: [[51, 17], [49, 24], [47, 28], [45, 20]]
  },
  {
    id: 'air-5',
    callsign: 'CIVIL 908',
    type: 'A350',
    role: 'Commercial',
    affiliation: 'Civil',
    regionId: 'indopacific',
    symbol: 'airliner',
    altitudeFt: 37000,
    speedKt: 485,
    route: [[22, 113], [19, 118], [14, 122], [9, 127]]
  },
  {
    id: 'air-6',
    callsign: 'VIGIL 33',
    type: 'P-8A',
    role: 'Maritime ISR',
    affiliation: 'Coalition',
    regionId: 'indopacific',
    symbol: 'awacs',
    altitudeFt: 21000,
    speedKt: 330,
    route: [[16, 119], [15, 124], [12, 121], [13, 116]]
  },
  {
    id: 'air-7',
    callsign: 'LANCER 72',
    type: 'Typhoon',
    role: 'QRA',
    affiliation: 'NATO',
    regionId: 'north-atlantic',
    symbol: 'fighter',
    altitudeFt: 34000,
    speedKt: 510,
    route: [[61, -7], [63, 2], [58, 4], [56, -4]]
  },
  {
    id: 'air-8',
    callsign: 'TRIDENT 54',
    type: 'F/A-18',
    role: 'Carrier air patrol',
    affiliation: 'Naval',
    regionId: 'middle-east',
    symbol: 'fighter',
    altitudeFt: 30000,
    speedKt: 440,
    route: [[18, 57], [22, 61], [20, 65], [16, 60]]
  },
  {
    id: 'air-9',
    callsign: 'MERCY 10',
    type: 'C-130J',
    role: 'Relief / logistics',
    affiliation: 'Humanitarian',
    regionId: 'east-africa',
    symbol: 'airliner',
    altitudeFt: 19000,
    speedKt: 260,
    route: [[7, 39], [11, 42], [13, 46], [8, 44]]
  },
  {
    id: 'air-10',
    callsign: 'RAVEN 21',
    type: 'MQ-9 tasking',
    role: 'ISR',
    affiliation: 'Coalition',
    regionId: 'east-africa',
    symbol: 'awacs',
    altitudeFt: 24000,
    speedKt: 180,
    route: [[8, 40], [9, 44], [12, 43], [11, 39]]
  }
].map((aircraft, index) => ({
  ...aircraft,
  t: (index + 1) * 0.11,
  lat: aircraft.route[0][0],
  lng: aircraft.route[0][1],
  heading: 0,
  altitude: 0.018
}));

const SATELLITES = [
  { id: 'sat-1', name: 'ISR LEO-01', type: 'Imaging', mission: 'Electro-optical ISR', family: 'LEO', altitudeKm: 540, inclination: 51, periodMs: 16000, phase: 0.1, lngBias: -20, color: 'amber' },
  { id: 'sat-2', name: 'SAR LEO-04', type: 'Radar', mission: 'Synthetic aperture revisit', family: 'LEO', altitudeKm: 620, inclination: 97, periodMs: 18000, phase: 1.1, lngBias: 48, color: 'amber' },
  { id: 'sat-3', name: 'NAV MEO-12', type: 'Navigation', mission: 'Regional PNT support', family: 'MEO', altitudeKm: 20200, inclination: 55, periodMs: 32000, phase: 2.4, lngBias: 12, color: 'amber' },
  { id: 'sat-4', name: 'COMMS GEO-07', type: 'Comms relay', mission: 'Persistent relay', family: 'GEO visualized', altitudeKm: 35786, inclination: 4, periodMs: 42000, phase: 0.5, lngBias: 72, color: 'amber' },
  { id: 'sat-5', name: 'SIGINT LEO-09', type: 'Signals', mission: 'Emitter mapping', family: 'LEO', altitudeKm: 560, inclination: 63, periodMs: 17500, phase: 3.1, lngBias: -90, color: 'amber' },
  { id: 'sat-6', name: 'Weather MEO-02', type: 'Weather', mission: 'Broad-area forecasting', family: 'MEO', altitudeKm: 12000, inclination: 45, periodMs: 26000, phase: 4.0, lngBias: 110, color: 'amber' }
].map((sat, index) => ({
  ...sat,
  altitude: sat.family === 'GEO visualized' ? 0.11 : sat.family === 'MEO' ? 0.08 : 0.045,
  lat: 0,
  lng: 0,
  heading: 0,
  t: index / 6
}));

const layerState = {
  regions: true,
  aircraft: true,
  satellites: true,
  conflicts: true,
  ew: true
};

let activeRegionId = 'global';
let activeTab = 'air';
let selectedItem = null;
let globe;

const globeEl = document.getElementById('globeViz');
const mapPopupEl = document.getElementById('mapPopup');
const utcClockEl = document.getElementById('utcClock');
const focusPillEl = document.getElementById('focusPill');
const regionChipsEl = document.getElementById('regionChips');
const briefTitleEl = document.getElementById('briefTitle');
const severityChipEl = document.getElementById('severityChip');
const briefSummaryEl = document.getElementById('briefSummary');
const aviationTextEl = document.getElementById('aviationText');
const defenseTextEl = document.getElementById('defenseText');
const watchListEl = document.getElementById('watchList');
const pressureListEl = document.getElementById('pressureList');
const selectedTitleEl = document.getElementById('selectedTitle');
const selectedKindEl = document.getElementById('selectedKind');
const selectedBodyEl = document.getElementById('selectedBody');
const aircraftListEl = document.getElementById('aircraftList');
const satelliteListEl = document.getElementById('satelliteList');
const conflictListEl = document.getElementById('conflictList');
const ewListEl = document.getElementById('ewList');
const aircraftCountEl = document.getElementById('aircraftCount');
const satelliteCountEl = document.getElementById('satelliteCount');
const conflictCountEl = document.getElementById('conflictCount');
const ewCountEl = document.getElementById('ewCount');
const trackStatusEl = document.getElementById('trackStatus');

function init() {
  document.title = SITE.title;
  document.querySelector('.brand-block h1').textContent = SITE.title;
  document.querySelector('.brand-block p').textContent = SITE.tagline;

  buildGlobe();
  buildRegionChips();
  buildTabs();
  buildLayerToggles();
  renderBrief(getActiveRegion());
  renderSideLists();
  renderSelected(null);
  startClocks();
  startAircraftAnimation();
  startSatelliteAnimation();
  renderGlobeObjects();

  document.getElementById('resetViewBtn').addEventListener('click', () => {
    hidePopup();
    const region = getActiveRegion();
    focusRegion(region);
  });

  window.addEventListener('resize', () => {
    hidePopup();
    if (globe && globe.renderer) {
      try {
        globe.width(globeEl.clientWidth);
        globe.height(globeEl.clientHeight);
      } catch (err) {
        // ignore resize issues on mobile browsers
      }
    }
  });
}

function buildGlobe() {
  globe = GlobeFactory()(globeEl)
    .globeImageUrl('earth-hires.jpg')
    .bumpImageUrl('earth-bump.png')
    .backgroundImageUrl('stars-bg.png')
    .showAtmosphere(true)
    .atmosphereColor('#5eb4ff')
    .atmosphereAltitude(0.16)
    .showGraticules(false)
    .htmlTransitionDuration(0)
    .pointOfView({ lat: 20, lng: 10, altitude: 2.05 }, 0)
    .onGlobeClick(() => hidePopup());

  try {
    globe.renderer().setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  } catch (err) {
    // ignore
  }

  try {
    const controls = globe.controls();
    controls.autoRotate = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.55;
    controls.zoomSpeed = 0.9;
    controls.minDistance = 140;
    controls.maxDistance = 360;
  } catch (err) {
    // ignore controls setup if unavailable
  }
}

function buildRegionChips() {
  regionChipsEl.innerHTML = '';
  REGIONS.forEach(region => {
    const btn = document.createElement('button');
    btn.className = `region-chip ${region.id === activeRegionId ? 'active' : ''}`;
    btn.textContent = region.name;
    btn.addEventListener('click', () => {
      activeRegionId = region.id;
      syncRegionChipState();
      renderBrief(region);
      renderSideLists();
      focusRegion(region);
      renderGlobeObjects();
      renderSelected({ kind: 'Region', ...region });
    });
    regionChipsEl.appendChild(btn);
  });
}

function syncRegionChipState() {
  [...regionChipsEl.children].forEach((chip, index) => {
    chip.classList.toggle('active', REGIONS[index].id === activeRegionId);
  });
  focusPillEl.textContent = getActiveRegion().name;
}

function buildTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(other => other.classList.toggle('active', other === btn));
      document.querySelectorAll('[data-tab-panel]').forEach(panel => {
        panel.classList.toggle('active', panel.dataset.tabPanel === activeTab);
      });
    });
  });
}

function buildLayerToggles() {
  document.querySelectorAll('.toolbar-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.layer;
      layerState[key] = !layerState[key];
      btn.classList.toggle('active', layerState[key]);
      renderGlobeObjects();
    });
  });
}

function getActiveRegion() {
  return REGIONS.find(r => r.id === activeRegionId) || REGIONS[0];
}

function renderBrief(region) {
  briefTitleEl.textContent = region.name;
  severityChipEl.textContent = region.severity;
  briefSummaryEl.textContent = region.summary;
  aviationTextEl.textContent = region.aviation;
  defenseTextEl.textContent = region.defense;
  watchListEl.innerHTML = region.watch.map(item => `<li>${item}</li>`).join('');
  pressureListEl.innerHTML = region.pressure.map(item => `<li>${item}</li>`).join('');
  focusPillEl.textContent = region.name;
}

function getVisibleAircraft() {
  if (activeRegionId === 'global') return AIRCRAFT;
  return AIRCRAFT.filter(a => a.regionId === activeRegionId);
}

function getVisibleConflicts() {
  if (activeRegionId === 'global') return CONFLICTS;
  return CONFLICTS.filter(item => item.regionId === activeRegionId);
}

function getVisibleEW() {
  if (activeRegionId === 'global') return EW_ZONES;
  return EW_ZONES.filter(item => item.regionId === activeRegionId);
}

function getVisibleSatellites() {
  return SATELLITES;
}

function renderSideLists() {
  const aircraft = getVisibleAircraft();
  const satellites = getVisibleSatellites();
  const conflicts = getVisibleConflicts();
  const ew = getVisibleEW();

  aircraftCountEl.textContent = aircraft.length;
  satelliteCountEl.textContent = satellites.length;
  conflictCountEl.textContent = conflicts.length;
  ewCountEl.textContent = ew.length;
  trackStatusEl.textContent = 'Live sim';

  aircraftListEl.innerHTML = aircraft.map(item => objectRowTemplate(item, 'aircraft')).join('');
  satelliteListEl.innerHTML = satellites.map(item => objectRowTemplate(item, 'satellite')).join('');
  conflictListEl.innerHTML = conflicts.map(item => objectRowTemplate(item, 'conflict')).join('');
  ewListEl.innerHTML = ew.map(item => objectRowTemplate(item, 'ew')).join('');

  wireObjectRows(aircraftListEl, aircraft, 'aircraft');
  wireObjectRows(satelliteListEl, satellites, 'satellite');
  wireObjectRows(conflictListEl, conflicts, 'conflict');
  wireObjectRows(ewListEl, ew, 'ew');
}

function objectRowTemplate(item, type) {
  const name = item.callsign || item.name;
  let meta = '';
  if (type === 'aircraft') {
    meta = `${item.type} • ${item.role} • FL${Math.round(item.altitudeFt / 100)}`;
  } else if (type === 'satellite') {
    meta = `${item.type} • ${item.family} • ${item.altitudeKm.toLocaleString()} km`;
  } else {
    meta = `${item.severity} • ${getRegionName(item.regionId)}`;
  }

  return `
    <button class="object-row ${isSelected(item) ? 'active' : ''}" data-id="${item.id}" data-type="${type}">
      <div class="object-topline">
        <div class="object-name">${name}</div>
        <div class="object-type">${type === 'aircraft' ? item.affiliation || '' : type === 'satellite' ? item.mission || '' : item.type}</div>
      </div>
      <div class="object-meta">${meta}</div>
    </button>
  `;
}

function wireObjectRows(container, items, type) {
  [...container.querySelectorAll('.object-row')].forEach(btn => {
    btn.addEventListener('click', () => {
      const item = items.find(entry => entry.id === btn.dataset.id);
      if (!item) return;
      selectItem(type, item);
    });
  });
}

function selectItem(type, item, targetEl) {
  if (type === 'aircraft') {
    renderSelected({ kind: 'Aircraft', ...item });
    focusTrack(item.lat, item.lng, 0.78);
    openPopup(type, item, targetEl);
  } else if (type === 'satellite') {
    renderSelected({ kind: 'Satellite', ...item });
    focusTrack(item.lat, item.lng, 0.94);
    openPopup(type, item, targetEl);
  } else if (type === 'conflict') {
    renderSelected({ kind: 'Conflict', ...item });
    focusTrack(item.lat, item.lng, 1.0);
    openPopup(type, item, targetEl);
  } else if (type === 'ew') {
    renderSelected({ kind: 'GNSS / EW', ...item });
    focusTrack(item.lat, item.lng, 1.0);
    openPopup(type, item, targetEl);
  } else if (type === 'region') {
    activeRegionId = item.id;
    syncRegionChipState();
    renderBrief(item);
    renderSelected({ kind: 'Region', ...item });
    focusRegion(item);
    renderGlobeObjects();
    openPopup(type, item, targetEl);
  }
  renderSideLists();
}

function renderSelected(item) {
  selectedItem = item;
  if (!item) {
    selectedTitleEl.textContent = 'Nothing selected';
    selectedKindEl.textContent = 'Ready';
    selectedBodyEl.textContent = 'Tap a region, aircraft, satellite, conflict marker, or GNSS / EW zone.';
    return;
  }

  selectedTitleEl.textContent = item.callsign || item.name;
  selectedKindEl.textContent = item.kind;

  if (item.kind === 'Region') {
    selectedBodyEl.innerHTML = `
      <div class="selected-grid">
        <div>${item.summary}</div>
        <div class="data-grid">
          <div class="data-cell"><span>Severity</span>${item.severity}</div>
          <div class="data-cell"><span>Focus area</span>${item.name}</div>
        </div>
      </div>
    `;
    return;
  }

  if (item.kind === 'Aircraft') {
    selectedBodyEl.innerHTML = `
      <div class="selected-grid">
        <div><strong>${item.type}</strong> • ${item.role} • ${item.affiliation}</div>
        <div class="data-grid">
          <div class="data-cell"><span>Altitude</span>${item.altitudeFt.toLocaleString()} ft</div>
          <div class="data-cell"><span>Speed</span>${item.speedKt} kt</div>
          <div class="data-cell"><span>Heading</span>${Math.round(item.heading)}°</div>
          <div class="data-cell"><span>Region</span>${getRegionName(item.regionId)}</div>
        </div>
        <div>${item.callsign} is part of the active regional air picture. Use it as a proxy for how patrol, ISR, logistics, or alert posture is layered into the theater.</div>
      </div>
    `;
    return;
  }

  if (item.kind === 'Satellite') {
    selectedBodyEl.innerHTML = `
      <div class="selected-grid">
        <div><strong>${item.type}</strong> • ${item.mission}</div>
        <div class="data-grid">
          <div class="data-cell"><span>Orbit family</span>${item.family}</div>
          <div class="data-cell"><span>Altitude</span>${item.altitudeKm.toLocaleString()} km</div>
          <div class="data-cell"><span>Latitude</span>${item.lat.toFixed(1)}°</div>
          <div class="data-cell"><span>Longitude</span>${item.lng.toFixed(1)}°</div>
        </div>
        <div>This orbital track is visualized as part of the watch-floor layer so users can understand what overhead support or visibility might matter to the region.</div>
      </div>
    `;
    return;
  }

  selectedBodyEl.innerHTML = `
    <div class="selected-grid">
      <div>${item.summary}</div>
      <div class="data-grid">
        <div class="data-cell"><span>Status</span>${item.severity}</div>
        <div class="data-cell"><span>Region</span>${getRegionName(item.regionId)}</div>
      </div>
    </div>
  `;
}

function isSelected(item) {
  if (!selectedItem) return false;
  return selectedItem.id === item.id;
}

function getRegionName(id) {
  return REGIONS.find(r => r.id === id)?.name || 'Global';
}

function focusRegion(region) {
  focusPillEl.textContent = region.name;
  if (globe) {
    globe.pointOfView({ lat: region.lat, lng: region.lng, altitude: region.altitude }, 900);
  }
}

function focusTrack(lat, lng, altitude) {
  if (globe) {
    globe.pointOfView({ lat, lng, altitude }, 900);
  }
}

function renderGlobeObjects() {
  const htmlObjects = [];

  if (layerState.regions) {
    const regionObjects = REGIONS.filter(region => region.id !== 'global').map(region => ({ ...region, markerType: 'region' }));
    htmlObjects.push(...regionObjects);
  }

  if (layerState.aircraft) {
    htmlObjects.push(...getVisibleAircraft().map(item => ({ ...item, markerType: 'aircraft' })));
  }

  if (layerState.satellites) {
    htmlObjects.push(...getVisibleSatellites().map(item => ({ ...item, markerType: 'satellite' })));
  }

  if (layerState.conflicts) {
    htmlObjects.push(...getVisibleConflicts().map(item => ({ ...item, markerType: 'conflict', altitude: 0.015 })));
  }

  if (layerState.ew) {
    htmlObjects.push(...getVisibleEW().map(item => ({ ...item, markerType: 'ew', altitude: 0.015 })));
  }

  globe
    .htmlElementsData(htmlObjects)
    .htmlLat(d => d.lat)
    .htmlLng(d => d.lng)
    .htmlAltitude(d => d.altitude || 0.02)
    .htmlElement(d => createMarker(d));

  const rings = [
    ...(layerState.conflicts ? getVisibleConflicts().map(item => ({ ...item, ringColor: () => ['rgba(255,143,112,0.26)', 'rgba(255,143,112,0)'], maxR: 3.4 })) : []),
    ...(layerState.ew ? getVisibleEW().map(item => ({ ...item, ringColor: () => ['rgba(255,107,107,0.24)', 'rgba(255,107,107,0)'], maxR: 2.8 })) : [])
  ];

  globe
    .ringsData(rings)
    .ringLat(d => d.lat)
    .ringLng(d => d.lng)
    .ringColor(d => d.ringColor())
    .ringMaxRadius(d => d.maxR)
    .ringPropagationSpeed(0.95)
    .ringRepeatPeriod(1300);
}

function createMarker(data) {
  const el = document.createElement('div');
  el.className = markerClassName(data);
  el.innerHTML = markerInnerHtml(data);
  el.addEventListener('click', event => {
    event.stopPropagation();
    if (data.markerType === 'region') selectItem('region', data, el);
    if (data.markerType === 'aircraft') selectItem('aircraft', data, el);
    if (data.markerType === 'satellite') selectItem('satellite', data, el);
    if (data.markerType === 'conflict') selectItem('conflict', data, el);
    if (data.markerType === 'ew') selectItem('ew', data, el);
  });
  return el;
}

function markerClassName(data) {
  if (data.markerType === 'region') return 'marker marker-region';
  if (data.markerType === 'aircraft') return 'marker marker-air';
  if (data.markerType === 'satellite') return 'marker marker-space';
  if (data.markerType === 'conflict') return 'marker marker-conflict';
  return 'marker marker-ew';
}

function markerInnerHtml(data) {
  if (data.markerType === 'aircraft') return PLANE_SVGS[data.symbol] || PLANE_SVGS.airliner;
  if (data.markerType === 'satellite') return SAT_SVG;
  return '';
}

function openPopup(type, item, anchorEl) {
  if (!anchorEl) {
    hidePopup();
    return;
  }

  const containerRect = globeEl.getBoundingClientRect();
  const anchorRect = anchorEl.getBoundingClientRect();
  let left = anchorRect.left - containerRect.left + anchorRect.width + 10;
  let top = anchorRect.top - containerRect.top - 12;

  if (left + 260 > containerRect.width) {
    left = anchorRect.left - containerRect.left - 260;
  }
  if (top < 16) top = 16;
  if (top + 120 > containerRect.height) top = containerRect.height - 132;

  const title = item.callsign || item.name;
  let copy = '';
  let kicker = type.toUpperCase();

  if (type === 'aircraft') copy = `${item.type} • ${item.role} • ${item.speedKt} kt • ${item.altitudeFt.toLocaleString()} ft`;
  if (type === 'satellite') copy = `${item.type} • ${item.family} • ${item.altitudeKm.toLocaleString()} km`;
  if (type === 'region') copy = item.summary;
  if (type === 'conflict' || type === 'ew') copy = item.summary;

  mapPopupEl.innerHTML = `
    <div class="popup-kicker">${kicker}</div>
    <div class="popup-title">${title}</div>
    <div class="popup-copy">${copy}</div>
  `;
  mapPopupEl.style.left = `${left}px`;
  mapPopupEl.style.top = `${top}px`;
  mapPopupEl.classList.remove('hidden');
}

function hidePopup() {
  mapPopupEl.classList.add('hidden');
}

function startClocks() {
  const tick = () => {
    utcClockEl.textContent = new Date().toISOString().slice(11, 19);
  };
  tick();
  setInterval(tick, 1000);
}

function startAircraftAnimation() {
  const tick = () => {
    AIRCRAFT.forEach(item => {
      item.t = (item.t + (item.speedKt / 180000)) % item.route.length;
      const segmentIndex = Math.floor(item.t);
      const nextIndex = (segmentIndex + 1) % item.route.length;
      const ratio = item.t - segmentIndex;
      const [lat1, lng1] = item.route[segmentIndex];
      const [lat2, lng2] = item.route[nextIndex];
      item.lat = lerp(lat1, lat2, ratio);
      item.lng = lerpLng(lng1, lng2, ratio);
      item.heading = computeHeading(lat1, lng1, lat2, lng2);
    });

    if (layerState.aircraft) renderGlobeObjects();
    if (selectedItem && selectedItem.kind === 'Aircraft') {
      const updated = AIRCRAFT.find(a => a.id === selectedItem.id);
      if (updated) renderSelected({ kind: 'Aircraft', ...updated });
    }
  };

  tick();
  setInterval(tick, 550);
}

function startSatelliteAnimation() {
  const tick = () => {
    const now = Date.now();
    SATELLITES.forEach(item => {
      const angle = ((now % item.periodMs) / item.periodMs) * Math.PI * 2 + item.phase;
      item.lat = item.inclination * Math.sin(angle);
      item.lng = wrapLng((angle * 180 / Math.PI) * 1.8 + item.lngBias - (now / item.periodMs) * 30);
      item.heading = wrapDegrees((Math.cos(angle) * 180) + 180);
    });

    if (layerState.satellites) renderGlobeObjects();
    if (selectedItem && selectedItem.kind === 'Satellite') {
      const updated = SATELLITES.find(s => s.id === selectedItem.id);
      if (updated) renderSelected({ kind: 'Satellite', ...updated });
    }
  };
  tick();
  setInterval(tick, 1500);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpLng(a, b, t) {
  let delta = b - a;
  if (Math.abs(delta) > 180) delta -= Math.sign(delta) * 360;
  return wrapLng(a + delta * t);
}

function wrapLng(lng) {
  let value = lng;
  while (value > 180) value -= 360;
  while (value < -180) value += 360;
  return value;
}

function wrapDegrees(deg) {
  let value = deg;
  while (value > 360) value -= 360;
  while (value < 0) value += 360;
  return value;
}

function computeHeading(lat1, lng1, lat2, lng2) {
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const lam1 = lng1 * Math.PI / 180;
  const lam2 = lng2 * Math.PI / 180;
  const y = Math.sin(lam2 - lam1) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2 - lam1);
  return wrapDegrees(Math.atan2(y, x) * 180 / Math.PI);
}

init();
