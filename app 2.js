import * as satellite from 'https://esm.sh/satellite.js@6.0.2';

const GlobeFactory = window.Globe;
const EARTH_RADIUS_KM = 6371;
const SAT_CACHE_KEY = 'cresswell-intel-sat-cache-v1';
const SAT_CACHE_MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours per CelesTrak guidance
const SAT_UPDATE_INTERVAL_MS = 3000;
const POSITION_SOURCE_LABELS = {
  0: 'ADS-B',
  1: 'ASTERIX',
  2: 'MLAT',
  3: 'FLARM'
};
const CATEGORY_LABELS = {
  0: 'Unknown',
  1: 'No ADS-B category',
  2: 'Light',
  3: 'Small',
  4: 'Large',
  5: 'High-vortex large',
  6: 'Heavy',
  7: 'High performance',
  8: 'Rotorcraft',
  9: 'Glider',
  10: 'Lighter-than-air',
  11: 'Parachutist',
  12: 'Ultralight',
  14: 'UAV',
  15: 'Space / transatmospheric'
};

const SITE = {
  title: 'CRESSWELL INTEL',
  tagline: 'Live press, regional air picture, and orbital layer on one globe.'
};

const SATELLITE_GROUPS = [
  {
    id: 'stations',
    label: 'Stations',
    url: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=STATIONS&FORMAT=TLE'
  },
  {
    id: 'gps',
    label: 'GPS Ops',
    url: 'https://celestrak.org/NORAD/elements/gp.php?GROUP=GPS-OPS&FORMAT=TLE'
  }
];

const REGIONS = [
  {
    id: 'north-america',
    label: 'North America',
    lat: 39,
    lng: -98,
    size: 0.14,
    query: '("United States" OR Canada OR Mexico OR NORAD OR airspace)',
    bbox: { lamin: 24, lamax: 50, lomin: -126, lomax: -66 }
  },
  {
    id: 'latin-america',
    label: 'Latin America',
    lat: -14,
    lng: -61,
    size: 0.13,
    query: '(Brazil OR Colombia OR Argentina OR Peru OR cartel OR Venezuela)',
    bbox: { lamin: -36, lamax: 16, lomin: -82, lomax: -34 }
  },
  {
    id: 'europe',
    label: 'Europe',
    lat: 51,
    lng: 12,
    size: 0.13,
    query: '(Europe OR EU OR NATO OR Germany OR France OR Britain)',
    bbox: { lamin: 36, lamax: 60, lomin: -10, lomax: 30 }
  },
  {
    id: 'eastern-europe',
    label: 'Eastern Europe',
    lat: 49,
    lng: 31,
    size: 0.12,
    query: '(Ukraine OR Russia OR Belarus OR Moldova OR Black Sea)',
    bbox: { lamin: 42, lamax: 58, lomin: 22, lomax: 42 }
  },
  {
    id: 'middle-east',
    label: 'Middle East',
    lat: 29,
    lng: 45,
    size: 0.14,
    query: '(Israel OR Gaza OR Iran OR Syria OR Yemen OR Red Sea)',
    bbox: { lamin: 12, lamax: 38, lomin: 28, lomax: 58 }
  },
  {
    id: 'africa',
    label: 'Africa',
    lat: 4,
    lng: 20,
    size: 0.14,
    query: '(Sudan OR Sahel OR Congo OR Nigeria OR insurgency OR Africa)',
    bbox: { lamin: -28, lamax: 30, lomin: -18, lomax: 42 }
  },
  {
    id: 'south-asia',
    label: 'South Asia',
    lat: 22,
    lng: 79,
    size: 0.13,
    query: '(India OR Pakistan OR Kashmir OR Bangladesh OR Sri Lanka)',
    bbox: { lamin: 5, lamax: 33, lomin: 66, lomax: 92 }
  },
  {
    id: 'east-asia',
    label: 'East Asia',
    lat: 35,
    lng: 121,
    size: 0.13,
    query: '(China OR Taiwan OR Japan OR Korea OR East China Sea)',
    bbox: { lamin: 20, lamax: 46, lomin: 110, lomax: 146 }
  },
  {
    id: 'south-china-sea',
    label: 'South China Sea',
    lat: 12,
    lng: 114,
    size: 0.12,
    query: '("South China Sea" OR Philippines OR Taiwan OR Vietnam OR maritime)',
    bbox: { lamin: 0, lamax: 24, lomin: 104, lomax: 122 }
  },
  {
    id: 'arctic',
    label: 'Arctic',
    lat: 77,
    lng: 20,
    size: 0.11,
    query: '(Arctic OR Greenland OR Svalbard OR northern route OR icebreaker)',
    bbox: { lamin: 64, lamax: 86, lomin: -60, lomax: 90 }
  }
];

const CATEGORIES = [
  {
    id: 'conflict',
    label: 'Conflict',
    query: '(conflict OR strike OR missile OR militia OR offensive OR ceasefire)'
  },
  {
    id: 'air-power',
    label: 'Air power',
    query: '(fighter jet OR bomber OR air defense OR sortie OR drone OR airbase)'
  },
  {
    id: 'cyber',
    label: 'Cyber',
    query: '(cyberattack OR ransomware OR breach OR malware OR intrusion)'
  },
  {
    id: 'space',
    label: 'Space',
    query: '(satellite OR launch OR orbit OR space debris OR ISS OR Starlink)'
  },
  {
    id: 'maritime',
    label: 'Maritime',
    query: '(navy OR tanker OR strait OR maritime OR coast guard OR shipping)'
  },
  {
    id: 'disasters',
    label: 'Disasters',
    query: '(wildfire OR earthquake OR flood OR volcano OR hurricane OR tsunami)'
  }
];

const LAYERS = [
  { id: 'regions', label: 'Regions', defaultOn: true },
  { id: 'aircraft', label: 'Aircraft', defaultOn: true },
  { id: 'satellites', label: 'Satellites', defaultOn: true }
];

const state = {
  globe: null,
  selectedRegion: REGIONS[0],
  currentSelection: {
    type: 'starter',
    id: 'global-pressure-picture',
    label: 'Global pressure picture',
    query: '(drone OR missile OR cyberattack OR wildfire OR military exercise)'
  },
  selectedObject: null,
  showRegions: true,
  showAircraft: true,
  showSatellites: true,
  aircraft: [],
  satellitesCatalog: [],
  satellitePoints: [],
  satelliteTimer: null,
  lastAircraftFetchAt: null,
  lastSatelliteCatalogAt: null
};

const dom = {
  siteTitle: document.getElementById('siteTitle'),
  siteTagline: document.getElementById('siteTagline'),
  utcClock: document.getElementById('utcClock'),
  aircraftCount: document.getElementById('aircraftCount'),
  satelliteCount: document.getElementById('satelliteCount'),
  opsStatusText: document.getElementById('opsStatusText'),
  refreshNewsBtn: document.getElementById('refreshNewsBtn'),
  refreshOpsBtn: document.getElementById('refreshOpsBtn'),
  layerButtons: document.getElementById('layerButtons'),
  regionButtons: document.getElementById('regionButtons'),
  categoryButtons: document.getElementById('categoryButtons'),
  topicForm: document.getElementById('topicForm'),
  topicInput: document.getElementById('topicInput'),
  telemetryPanel: document.getElementById('telemetryPanel'),
  feedTitle: document.getElementById('feedTitle'),
  feedSubtitle: document.getElementById('feedSubtitle'),
  status: document.getElementById('status'),
  results: document.getElementById('results')
};

boot();

function boot() {
  dom.siteTitle.textContent = SITE.title;
  dom.siteTagline.textContent = SITE.tagline;

  buildLayerButtons();
  buildRegionButtons();
  buildCategoryButtons();
  startClock();
  bootGlobe();
  renderTelemetry(state.selectedRegion);
  activateButton(state.selectedRegion.id);

  fetchNews(state.currentSelection.query, state.currentSelection.label, state.currentSelection.id);
  fetchAircraftForRegion(state.selectedRegion, true);
  loadSatelliteCatalog(false);

  dom.refreshNewsBtn.addEventListener('click', () => {
    fetchNews(state.currentSelection.query, state.currentSelection.label, state.currentSelection.id);
  });

  dom.refreshOpsBtn.addEventListener('click', () => {
    fetchAircraftForRegion(state.selectedRegion, true);
    loadSatelliteCatalog(false);
  });

  dom.topicForm.addEventListener('submit', event => {
    event.preventDefault();
    const value = dom.topicInput.value.trim();
    if (!value) {
      setFeedStatus('Type a topic first. Example: drone OR missile OR Taiwan', true);
      return;
    }

    fetchNews(value, `Search: ${value}`, slugify(value));
  });
}

function buildLayerButtons() {
  LAYERS.forEach(layer => {
    const btn = document.createElement('button');
    btn.className = 'toggle-btn active';
    btn.textContent = layer.label;
    btn.dataset.layerId = layer.id;
    btn.addEventListener('click', () => toggleLayer(layer.id));
    dom.layerButtons.appendChild(btn);
  });
}

function buildRegionButtons() {
  REGIONS.forEach(region => {
    const btn = document.createElement('button');
    btn.className = 'mini-btn';
    btn.textContent = region.label;
    btn.dataset.selectionId = region.id;
    btn.addEventListener('click', () => handleRegionSelection(region));
    dom.regionButtons.appendChild(btn);
  });
}

function buildCategoryButtons() {
  CATEGORIES.forEach(category => {
    const btn = document.createElement('button');
    btn.className = 'mini-btn';
    btn.textContent = category.label;
    btn.dataset.selectionId = category.id;
    btn.addEventListener('click', () => {
      activateButton(category.id);
      fetchNews(category.query, `Filter: ${category.label}`, category.id);
    });
    dom.categoryButtons.appendChild(btn);
  });
}

function startClock() {
  const updateClock = () => {
    const now = new Date();
    dom.utcClock.textContent = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
      hour12: false
    }).format(now);
  };

  updateClock();
  window.setInterval(updateClock, 1000);
}

function bootGlobe() {
  const container = document.getElementById('globeViz');

  state.globe = GlobeFactory()(container)
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
    .showAtmosphere(true)
    .atmosphereColor('#78d4ff')
    .atmosphereAltitude(0.16)
    .pointAltitude(point => point.altitude ?? 0.02)
    .pointRadius(point => point.radius ?? 0.18)
    .pointColor(point => point.color ?? '#ffffff')
    .pointLabel(point => buildPointLabel(point))
    .onPointClick(point => {
      if (point.kind === 'region') {
        handleRegionSelection(REGIONS.find(region => region.id === point.id));
        return;
      }

      state.selectedObject = point;
      renderTelemetry(point);
    })
    .pointsData([])
    .ringsData([])
    .width(container.clientWidth)
    .height(container.clientHeight);

  state.globe.controls().autoRotate = true;
  state.globe.controls().autoRotateSpeed = 0.22;

  updateAllGlobeData();

  window.addEventListener('resize', () => {
    state.globe.width(container.clientWidth);
    state.globe.height(container.clientHeight);
  });
}

function buildPointLabel(point) {
  if (point.kind === 'region') {
    return `${escapeHtml(point.label)}<br/>Tap for feed + air picture`;
  }

  if (point.kind === 'aircraft') {
    return `${escapeHtml(point.callsign || point.icao24)}<br/>${escapeHtml(point.country || 'Unknown country')}<br/>${escapeHtml(formatFeet(point.altFeet))}`;
  }

  return `${escapeHtml(point.name)}<br/>${escapeHtml(point.groupLabel)}<br/>Alt ${escapeHtml(formatKm(point.altKm))}`;
}

function updateAllGlobeData() {
  if (!state.globe) return;

  const points = [];

  if (state.showRegions) {
    points.push(...REGIONS.map(region => ({
      ...region,
      kind: 'region',
      altitude: region.size,
      radius: 0.28,
      color: region.id === state.selectedRegion?.id ? '#6ff7b7' : '#68cfff'
    })));
  }

  if (state.showAircraft) {
    points.push(...state.aircraft);
  }

  if (state.showSatellites) {
    points.push(...state.satellitePoints);
  }

  state.globe.pointsData(points);
  state.globe.ringsData(buildRings());
  updateCounts();
}

function buildRings() {
  const rings = [];

  if (state.selectedRegion) {
    rings.push({
      lat: state.selectedRegion.lat,
      lng: state.selectedRegion.lng,
      maxR: 4.5,
      propagationSpeed: 2.2,
      repeatPeriod: 900,
      color: () => 'rgba(111,247,183,0.45)'
    });
  }

  const topAircraft = state.aircraft.slice(0, 16);
  topAircraft.forEach(aircraft => {
    rings.push({
      lat: aircraft.lat,
      lng: aircraft.lng,
      maxR: 0.95,
      propagationSpeed: 1.4,
      repeatPeriod: 1800,
      color: () => 'rgba(107,208,255,0.16)'
    });
  });

  return rings;
}

function updateCounts() {
  dom.aircraftCount.textContent = state.showAircraft ? String(state.aircraft.length) : 'OFF';
  dom.satelliteCount.textContent = state.showSatellites ? String(state.satellitePoints.length) : 'OFF';
}

function toggleLayer(layerId) {
  if (layerId === 'regions') state.showRegions = !state.showRegions;
  if (layerId === 'aircraft') state.showAircraft = !state.showAircraft;
  if (layerId === 'satellites') state.showSatellites = !state.showSatellites;

  const isActive = getLayerActive(layerId);
  const btn = dom.layerButtons.querySelector(`[data-layer-id="${layerId}"]`);
  if (btn) btn.classList.toggle('active', isActive);

  setOpsStatus(`${capitalize(layerId)} ${isActive ? 'enabled' : 'disabled'}.`);
  updateAllGlobeData();
}

function getLayerActive(layerId) {
  if (layerId === 'regions') return state.showRegions;
  if (layerId === 'aircraft') return state.showAircraft;
  if (layerId === 'satellites') return state.showSatellites;
  return false;
}

function handleRegionSelection(region) {
  if (!region) return;

  state.selectedRegion = region;
  state.selectedObject = region;
  activateButton(region.id);
  renderTelemetry(region);
  focusRegion(region);
  updateAllGlobeData();
  fetchNews(region.query, region.label, region.id);
  fetchAircraftForRegion(region, true);
}

function focusRegion(region) {
  if (!state.globe) return;
  state.globe.pointOfView({ lat: region.lat, lng: region.lng, altitude: 1.55 }, 1000);
}

function activateButton(selectionId) {
  document.querySelectorAll('.mini-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.selectionId === selectionId);
  });
}

async function fetchNews(query, label, selectionId = '') {
  state.currentSelection = {
    type: 'query',
    id: selectionId || slugify(label),
    label,
    query
  };

  dom.feedTitle.textContent = label;
  dom.feedSubtitle.textContent = 'Fresh headlines from the last 12 hours.';
  setFeedStatus('Loading headlines...');
  dom.results.innerHTML = '';

  const url = new URL('https://api.gdeltproject.org/api/v2/doc/doc');
  url.searchParams.set('query', query);
  url.searchParams.set('mode', 'artlist');
  url.searchParams.set('maxrecords', '12');
  url.searchParams.set('timespan', '12h');
  url.searchParams.set('sort', 'datedesc');
  url.searchParams.set('format', 'json');

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const items = data.articles || data.article || data.results || [];
    renderStories(items);
    setFeedStatus(`Loaded ${items.length} stories.`);

    if (selectionId) {
      activateButton(selectionId);
    }
  } catch (error) {
    console.error(error);
    setFeedStatus('Headline source did not answer cleanly. Usually that means rate limiting or a bad connection.', true);
    renderStories([]);
  }
}

function renderStories(items) {
  dom.results.innerHTML = '';

  if (!items.length) {
    dom.results.innerHTML = `
      <div class="story">
        <div class="story-title">No matching stories right now.</div>
        <div class="story-meta"><span>Try another region, another filter, or a broader query.</span></div>
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

  dom.results.appendChild(fragment);
}

function setFeedStatus(text, isError = false) {
  dom.status.textContent = text;
  dom.status.classList.toggle('error', isError);
}

async function fetchAircraftForRegion(region, force = false) {
  if (!region?.bbox) return;

  if (!state.showAircraft && !force) {
    setOpsStatus('Aircraft layer is disabled.');
    return;
  }

  setOpsStatus(`Loading aircraft for ${region.label}...`);

  const url = new URL('https://opensky-network.org/api/states/all');
  url.searchParams.set('lamin', String(region.bbox.lamin));
  url.searchParams.set('lamax', String(region.bbox.lamax));
  url.searchParams.set('lomin', String(region.bbox.lomin));
  url.searchParams.set('lomax', String(region.bbox.lomax));
  url.searchParams.set('extended', '1');

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const rawStates = Array.isArray(data.states) ? data.states : [];

    state.aircraft = rawStates
      .map(mapOpenSkyState)
      .filter(Boolean)
      .sort((a, b) => (b.altFeet || 0) - (a.altFeet || 0))
      .slice(0, 180);

    state.lastAircraftFetchAt = Date.now();
    setOpsStatus(`Loaded ${state.aircraft.length} aircraft for ${region.label}.`);
    updateAllGlobeData();

    if (state.selectedObject?.kind === 'aircraft') {
      const refreshed = state.aircraft.find(item => item.icao24 === state.selectedObject.icao24);
      if (refreshed) {
        state.selectedObject = refreshed;
        renderTelemetry(refreshed);
      }
    }
  } catch (error) {
    console.error(error);
    state.aircraft = [];
    updateAllGlobeData();
    setOpsStatus('Aircraft source blocked or failed. The anonymous feed can be flaky on some networks.');
  }
}

function mapOpenSkyState(row) {
  if (!Array.isArray(row)) return null;

  const lng = row[5];
  const lat = row[6];
  if (typeof lat !== 'number' || typeof lng !== 'number') return null;

  const geoAltM = typeof row[13] === 'number' ? row[13] : row[7];
  const altFeet = typeof geoAltM === 'number' ? Math.round(geoAltM * 3.28084) : null;
  const speedKts = typeof row[9] === 'number' ? Math.round(row[9] * 1.94384) : null;
  const verticalRateFpm = typeof row[11] === 'number' ? Math.round(row[11] * 196.8504) : null;
  const onGround = Boolean(row[8]);
  const category = row[17];

  return {
    kind: 'aircraft',
    icao24: String(row[0] || '').trim(),
    callsign: String(row[1] || '').trim(),
    country: row[2] || 'Unknown',
    lat,
    lng,
    trueTrack: typeof row[10] === 'number' ? Math.round(row[10]) : null,
    verticalRateFpm,
    altFeet,
    speedKts,
    positionSource: POSITION_SOURCE_LABELS[row[16]] || 'Unknown',
    categoryLabel: CATEGORY_LABELS[category] || 'Aircraft',
    onGround,
    altitude: compressAircraftAltitude(altFeet),
    radius: onGround ? 0.045 : 0.06,
    color: pickAircraftColor(onGround, category, speedKts)
  };
}

function pickAircraftColor(onGround, category, speedKts) {
  if (onGround) return '#8795a3';
  if (category === 14) return '#ffc86f';
  if (category === 6 || category === 7) return '#ff8f8f';
  if ((speedKts || 0) > 420) return '#6ff7b7';
  return '#6bd0ff';
}

function compressAircraftAltitude(altFeet) {
  if (!altFeet || altFeet <= 0) return 0.005;
  return Math.min(0.016 + altFeet / 850000, 0.085);
}

async function loadSatelliteCatalog(force = false) {
  try {
    const cached = readSatelliteCache();
    if (cached && !force && Date.now() - cached.savedAt < SAT_CACHE_MAX_AGE_MS) {
      ingestSatelliteCatalog(cached.payload, true);
      return;
    }

    setOpsStatus('Refreshing satellite catalog...');

    const responses = await Promise.all(
      SATELLITE_GROUPS.map(group => fetch(group.url).then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text().then(text => ({ groupId: group.id, text }));
      }))
    );

    const payload = responses.reduce((acc, item) => {
      acc[item.groupId] = item.text;
      return acc;
    }, {});

    writeSatelliteCache(payload);
    ingestSatelliteCatalog(payload, false);
  } catch (error) {
    console.error(error);
    setOpsStatus('Satellite catalog did not load. This can happen if the remote catalog blocks browser fetches.');
  }
}

function ingestSatelliteCatalog(payload, fromCache) {
  const catalog = [];

  SATELLITE_GROUPS.forEach(group => {
    const raw = payload[group.id];
    if (!raw) return;

    parseTleText(raw).forEach(entry => {
      try {
        catalog.push({
          id: `${group.id}-${entry.name}`,
          name: entry.name,
          groupId: group.id,
          groupLabel: group.label,
          satrec: satellite.twoline2satrec(entry.line1, entry.line2),
          line1: entry.line1,
          line2: entry.line2
        });
      } catch (error) {
        console.warn('Bad TLE skipped', entry.name, error);
      }
    });
  });

  state.satellitesCatalog = catalog;
  state.lastSatelliteCatalogAt = Date.now();
  kickSatelliteLoop();
  setOpsStatus(`Satellite catalog ready (${catalog.length}). ${fromCache ? 'Using cache.' : 'Fresh pull complete.'}`);
}

function parseTleText(raw) {
  const lines = raw
    .replace(/\r/g, '')
    .split('\n')
    .map(line => line.trimEnd())
    .filter(Boolean);

  const entries = [];
  let i = 0;

  while (i < lines.length) {
    if (lines[i].startsWith('1 ') || lines[i].startsWith('2 ')) {
      i += 1;
      continue;
    }

    const name = lines[i];
    const line1 = lines[i + 1];
    const line2 = lines[i + 2];

    if (line1?.startsWith('1 ') && line2?.startsWith('2 ')) {
      entries.push({ name, line1, line2 });
      i += 3;
      continue;
    }

    i += 1;
  }

  return entries;
}

function kickSatelliteLoop() {
  if (state.satelliteTimer) {
    window.clearInterval(state.satelliteTimer);
  }

  updateSatellitePositions();
  state.satelliteTimer = window.setInterval(updateSatellitePositions, SAT_UPDATE_INTERVAL_MS);
}

function updateSatellitePositions() {
  if (!state.satellitesCatalog.length) {
    state.satellitePoints = [];
    updateAllGlobeData();
    return;
  }

  const now = new Date();
  const gmst = satellite.gstime(now);

  state.satellitePoints = state.satellitesCatalog
    .map(entry => {
      try {
        const propagated = satellite.propagate(entry.satrec, now);
        const eciPosition = propagated.position;
        if (!eciPosition) return null;

        const geodetic = satellite.eciToGeodetic(eciPosition, gmst);
        const lat = satellite.radiansToDegrees(geodetic.latitude);
        const lng = satellite.radiansToDegrees(geodetic.longitude);
        const altKm = geodetic.height;

        if (![lat, lng, altKm].every(Number.isFinite)) return null;

        return {
          kind: 'satellite',
          id: entry.id,
          name: entry.name,
          groupId: entry.groupId,
          groupLabel: entry.groupLabel,
          lat,
          lng,
          altKm,
          altitude: compressSatelliteAltitude(altKm),
          radius: entry.groupId === 'stations' ? 0.1 : 0.085,
          color: entry.groupId === 'stations' ? '#ffd36a' : '#6ff7b7'
        };
      } catch (error) {
        return null;
      }
    })
    .filter(Boolean)
    .slice(0, 120);

  updateAllGlobeData();

  if (state.selectedObject?.kind === 'satellite') {
    const refreshed = state.satellitePoints.find(item => item.id === state.selectedObject.id);
    if (refreshed) {
      state.selectedObject = refreshed;
      renderTelemetry(refreshed);
    }
  }
}

function compressSatelliteAltitude(altKm) {
  if (!Number.isFinite(altKm) || altKm < 0) return 0.08;
  if (altKm < 700) return 0.08 + altKm / 18000;
  return Math.min(0.12 + altKm / 32000, 0.95);
}

function readSatelliteCache() {
  try {
    const raw = localStorage.getItem(SAT_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSatelliteCache(payload) {
  try {
    localStorage.setItem(SAT_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), payload }));
  } catch {
    // ignore cache failures on locked-down browsers
  }
}

function renderTelemetry(item) {
  if (!item) {
    dom.telemetryPanel.innerHTML = '<div class="telemetry-empty">Tap a plane, satellite, or region marker to inspect it.</div>';
    return;
  }

  if (item.kind === 'region') {
    dom.telemetryPanel.innerHTML = `
      <div class="telemetry-header">
        <div class="telemetry-title">${escapeHtml(item.label)}</div>
        <div class="telemetry-badge">Region</div>
      </div>
      <div class="telemetry-grid">
        ${telemetryBlock('News query', item.query)}
        ${telemetryBlock('Air box', `${item.bbox.lamin} to ${item.bbox.lamax} / ${item.bbox.lomin} to ${item.bbox.lomax}`)}
        ${telemetryBlock('Aircraft loaded', String(state.aircraft.length))}
        ${telemetryBlock('Last aircraft refresh', formatLocalDateTime(state.lastAircraftFetchAt))}
      </div>
    `;
    return;
  }

  if (item.kind === 'aircraft') {
    dom.telemetryPanel.innerHTML = `
      <div class="telemetry-header">
        <div class="telemetry-title">${escapeHtml(item.callsign || item.icao24 || 'Unknown aircraft')}</div>
        <div class="telemetry-badge">Aircraft</div>
      </div>
      <div class="telemetry-grid">
        ${telemetryBlock('ICAO24', item.icao24 || 'Unknown')}
        ${telemetryBlock('Country', item.country || 'Unknown')}
        ${telemetryBlock('Altitude', formatFeet(item.altFeet))}
        ${telemetryBlock('Speed', item.speedKts ? `${item.speedKts} kts` : 'Unknown')}
        ${telemetryBlock('Heading', item.trueTrack != null ? `${item.trueTrack}°` : 'Unknown')}
        ${telemetryBlock('Vertical rate', item.verticalRateFpm != null ? `${item.verticalRateFpm} fpm` : 'Unknown')}
        ${telemetryBlock('Category', item.categoryLabel || 'Aircraft')}
        ${telemetryBlock('Position source', item.positionSource || 'Unknown')}
      </div>
    `;
    return;
  }

  dom.telemetryPanel.innerHTML = `
    <div class="telemetry-header">
      <div class="telemetry-title">${escapeHtml(item.name)}</div>
      <div class="telemetry-badge">Satellite</div>
    </div>
    <div class="telemetry-grid">
      ${telemetryBlock('Catalog group', item.groupLabel || 'Unknown')}
      ${telemetryBlock('Altitude', formatKm(item.altKm))}
      ${telemetryBlock('Latitude', `${item.lat.toFixed(2)}°`)}
      ${telemetryBlock('Longitude', `${item.lng.toFixed(2)}°`)}
      ${telemetryBlock('Catalog refresh', formatLocalDateTime(state.lastSatelliteCatalogAt))}
      ${telemetryBlock('Render cadence', `${Math.round(SAT_UPDATE_INTERVAL_MS / 1000)} sec`)}
    </div>
  `;
}

function telemetryBlock(label, value) {
  return `
    <div class="telemetry-item">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value || 'Unknown')}</strong>
    </div>
  `;
}

function setOpsStatus(text) {
  dom.opsStatusText.textContent = text;
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

function formatFeet(value) {
  if (!value && value !== 0) return 'Unknown';
  return `${value.toLocaleString()} ft`;
}

function formatKm(value) {
  if (!Number.isFinite(value)) return 'Unknown';
  return `${Math.round(value).toLocaleString()} km`;
}

function formatLocalDateTime(timestamp) {
  if (!timestamp) return 'Not yet';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(timestamp));
}

function slugify(value) {
  return String(value).toLowerCase().trim().replaceAll(/[^a-z0-9]+/g, '-').replaceAll(/^-|-$/g, '');
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
