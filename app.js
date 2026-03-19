
const LOCATIONS = [
  {
    "id": "loc-1",
    "city": "Washington",
    "country": "United States",
    "lat": 38.9072,
    "lng": -77.0369,
    "region": "North America",
    "focus": [
      "politics",
      "defense",
      "aviation"
    ],
    "priority": 3,
    "rationale": "US decision-making hub and airpower signal node.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-2",
    "city": "New York City",
    "country": "United States",
    "lat": 40.7128,
    "lng": -74.006,
    "region": "North America",
    "focus": [
      "finance",
      "maritime",
      "politics"
    ],
    "priority": 2,
    "rationale": "Global finance, shipping, diplomacy, and media pulse.",
    "color": "#57e3d8"
  },
  {
    "id": "loc-3",
    "city": "Miami",
    "country": "United States",
    "lat": 25.7617,
    "lng": -80.1918,
    "region": "North America",
    "focus": [
      "maritime",
      "aviation",
      "diaspora"
    ],
    "priority": 2,
    "rationale": "Gateway for Caribbean, Latin America, and maritime traffic.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-4",
    "city": "Houston",
    "country": "United States",
    "lat": 29.7604,
    "lng": -95.3698,
    "region": "North America",
    "focus": [
      "energy",
      "aviation",
      "space"
    ],
    "priority": 2,
    "rationale": "Energy logistics, aerospace activity, and Gulf Coast exposure.",
    "color": "#f89f5b"
  },
  {
    "id": "loc-5",
    "city": "Los Angeles",
    "country": "United States",
    "lat": 34.0522,
    "lng": -118.2437,
    "region": "North America",
    "focus": [
      "maritime",
      "trade",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Pacific trade, ports, and transnational logistics.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-6",
    "city": "Seattle",
    "country": "United States",
    "lat": 47.6062,
    "lng": -122.3321,
    "region": "North America",
    "focus": [
      "maritime",
      "aviation",
      "technology"
    ],
    "priority": 1,
    "rationale": "Pacific air and sea gateway with major industrial footprint.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-7",
    "city": "Anchorage",
    "country": "United States",
    "lat": 61.2181,
    "lng": -149.9003,
    "region": "North America",
    "focus": [
      "aviation",
      "arctic",
      "logistics"
    ],
    "priority": 1,
    "rationale": "Arctic routing, long-haul aviation, and strategic access.",
    "color": "#4fc3ff"
  },
  {
    "id": "loc-8",
    "city": "Mexico City",
    "country": "Mexico",
    "lat": 19.4326,
    "lng": -99.1332,
    "region": "North America",
    "focus": [
      "politics",
      "security",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Political center with major aviation and security relevance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-9",
    "city": "Tijuana",
    "country": "Mexico",
    "lat": 32.5149,
    "lng": -117.0382,
    "region": "North America",
    "focus": [
      "border",
      "security",
      "migration"
    ],
    "priority": 1,
    "rationale": "Border security, migration, and cartel pressure line.",
    "color": "#4fc3ff"
  },
  {
    "id": "loc-10",
    "city": "Panama City",
    "country": "Panama",
    "lat": 8.9824,
    "lng": -79.5199,
    "region": "North America",
    "focus": [
      "maritime",
      "trade",
      "politics"
    ],
    "priority": 2,
    "rationale": "Canal-linked maritime chokepoint and commercial nerve center.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-11",
    "city": "Havana",
    "country": "Cuba",
    "lat": 23.1136,
    "lng": -82.3666,
    "region": "North America",
    "focus": [
      "politics",
      "security",
      "maritime"
    ],
    "priority": 1,
    "rationale": "Caribbean political signaling and maritime monitoring.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-12",
    "city": "Toronto",
    "country": "Canada",
    "lat": 43.6532,
    "lng": -79.3832,
    "region": "North America",
    "focus": [
      "finance",
      "aviation",
      "politics"
    ],
    "priority": 1,
    "rationale": "North American finance and long-haul air connectivity.",
    "color": "#57e3d8"
  },
  {
    "id": "loc-13",
    "city": "Vancouver",
    "country": "Canada",
    "lat": 49.2827,
    "lng": -123.1207,
    "region": "North America",
    "focus": [
      "maritime",
      "trade",
      "pacific"
    ],
    "priority": 1,
    "rationale": "Pacific port access and Asia-facing logistics.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-14",
    "city": "Bogota",
    "country": "Colombia",
    "lat": 4.711,
    "lng": -74.0721,
    "region": "South America",
    "focus": [
      "politics",
      "security",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Political decision hub with insurgency and aviation relevance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-15",
    "city": "Caracas",
    "country": "Venezuela",
    "lat": 10.4806,
    "lng": -66.9036,
    "region": "South America",
    "focus": [
      "politics",
      "energy",
      "security"
    ],
    "priority": 2,
    "rationale": "Political instability, sanctions exposure, and energy signal.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-16",
    "city": "Georgetown",
    "country": "Guyana",
    "lat": 6.8013,
    "lng": -58.1551,
    "region": "South America",
    "focus": [
      "energy",
      "maritime",
      "politics"
    ],
    "priority": 1,
    "rationale": "Offshore energy growth and border dispute relevance.",
    "color": "#f89f5b"
  },
  {
    "id": "loc-17",
    "city": "Manaus",
    "country": "Brazil",
    "lat": -3.119,
    "lng": -60.0217,
    "region": "South America",
    "focus": [
      "environment",
      "logistics",
      "river"
    ],
    "priority": 1,
    "rationale": "Amazon logistics and environmental monitoring node.",
    "color": "#4fc3ff"
  },
  {
    "id": "loc-18",
    "city": "Rio de Janeiro",
    "country": "Brazil",
    "lat": -22.9068,
    "lng": -43.1729,
    "region": "South America",
    "focus": [
      "maritime",
      "security",
      "economy"
    ],
    "priority": 1,
    "rationale": "Major port city with security and event exposure.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-19",
    "city": "Sao Paulo",
    "country": "Brazil",
    "lat": -23.5505,
    "lng": -46.6333,
    "region": "South America",
    "focus": [
      "finance",
      "aviation",
      "politics"
    ],
    "priority": 2,
    "rationale": "Brazilian economic center with air and market signal value.",
    "color": "#57e3d8"
  },
  {
    "id": "loc-20",
    "city": "Buenos Aires",
    "country": "Argentina",
    "lat": -34.6037,
    "lng": -58.3816,
    "region": "South America",
    "focus": [
      "politics",
      "economy",
      "maritime"
    ],
    "priority": 2,
    "rationale": "Political and economic pulse with port relevance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-21",
    "city": "Santiago",
    "country": "Chile",
    "lat": -33.4489,
    "lng": -70.6693,
    "region": "South America",
    "focus": [
      "politics",
      "aviation",
      "disaster"
    ],
    "priority": 1,
    "rationale": "Regional diplomacy, logistics, and disaster readiness.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-22",
    "city": "Lima",
    "country": "Peru",
    "lat": -12.0464,
    "lng": -77.0428,
    "region": "South America",
    "focus": [
      "politics",
      "security",
      "maritime"
    ],
    "priority": 1,
    "rationale": "Pacific gateway with political and social volatility relevance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-23",
    "city": "La Paz",
    "country": "Bolivia",
    "lat": -16.4897,
    "lng": -68.1193,
    "region": "South America",
    "focus": [
      "politics",
      "protest",
      "resource"
    ],
    "priority": 1,
    "rationale": "Political demonstrations and resource politics monitor.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-24",
    "city": "London",
    "country": "United Kingdom",
    "lat": 51.5072,
    "lng": -0.1276,
    "region": "Europe",
    "focus": [
      "politics",
      "finance",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Diplomacy, finance, and allied security coordination.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-25",
    "city": "Brussels",
    "country": "Belgium",
    "lat": 50.8503,
    "lng": 4.3517,
    "region": "Europe",
    "focus": [
      "politics",
      "defense",
      "diplomacy"
    ],
    "priority": 2,
    "rationale": "NATO/EU policy gravity and alliance messaging.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-26",
    "city": "Paris",
    "country": "France",
    "lat": 48.8566,
    "lng": 2.3522,
    "region": "Europe",
    "focus": [
      "politics",
      "defense",
      "aviation"
    ],
    "priority": 2,
    "rationale": "European defense industry, diplomacy, and internal security.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-27",
    "city": "Berlin",
    "country": "Germany",
    "lat": 52.52,
    "lng": 13.405,
    "region": "Europe",
    "focus": [
      "politics",
      "economy",
      "defense"
    ],
    "priority": 2,
    "rationale": "Industrial and political center shaping continental posture.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-28",
    "city": "Warsaw",
    "country": "Poland",
    "lat": 52.2297,
    "lng": 21.0122,
    "region": "Europe",
    "focus": [
      "defense",
      "logistics",
      "politics"
    ],
    "priority": 2,
    "rationale": "Eastern flank logistics and force posture relevance.",
    "color": "#ff8a5b"
  },
  {
    "id": "loc-29",
    "city": "Kyiv",
    "country": "Ukraine",
    "lat": 50.4501,
    "lng": 30.5234,
    "region": "Europe",
    "focus": [
      "conflict",
      "defense",
      "politics"
    ],
    "priority": 3,
    "rationale": "National command center under active war-related pressure.",
    "color": "#ff6b6b"
  },
  {
    "id": "loc-30",
    "city": "Odesa",
    "country": "Ukraine",
    "lat": 46.4825,
    "lng": 30.7233,
    "region": "Europe",
    "focus": [
      "maritime",
      "conflict",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Black Sea port and strike-warning environment.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-31",
    "city": "Bucharest",
    "country": "Romania",
    "lat": 44.4268,
    "lng": 26.1025,
    "region": "Europe",
    "focus": [
      "defense",
      "politics",
      "energy"
    ],
    "priority": 1,
    "rationale": "Black Sea rear area and NATO posture signal.",
    "color": "#ff8a5b"
  },
  {
    "id": "loc-32",
    "city": "Chisinau",
    "country": "Moldova",
    "lat": 47.0105,
    "lng": 28.8638,
    "region": "Europe",
    "focus": [
      "politics",
      "security",
      "energy"
    ],
    "priority": 1,
    "rationale": "Political vulnerability and regional pressure point.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-33",
    "city": "Belgrade",
    "country": "Serbia",
    "lat": 44.7866,
    "lng": 20.4489,
    "region": "Europe",
    "focus": [
      "politics",
      "security",
      "protest"
    ],
    "priority": 1,
    "rationale": "Balkan political balancing and civic unrest watch.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-34",
    "city": "Athens",
    "country": "Greece",
    "lat": 37.9838,
    "lng": 23.7275,
    "region": "Europe",
    "focus": [
      "maritime",
      "politics",
      "defense"
    ],
    "priority": 1,
    "rationale": "Eastern Med maritime and alliance posture node.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-35",
    "city": "Istanbul",
    "country": "Turkey",
    "lat": 41.0082,
    "lng": 28.9784,
    "region": "Europe",
    "focus": [
      "maritime",
      "aviation",
      "politics"
    ],
    "priority": 2,
    "rationale": "Bosporus chokepoint and transcontinental air/sea traffic.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-36",
    "city": "Tallinn",
    "country": "Estonia",
    "lat": 59.437,
    "lng": 24.7536,
    "region": "Europe",
    "focus": [
      "cyber",
      "defense",
      "politics"
    ],
    "priority": 1,
    "rationale": "Baltic cyber and eastern flank signal point.",
    "color": "#b388ff"
  },
  {
    "id": "loc-37",
    "city": "Helsinki",
    "country": "Finland",
    "lat": 60.1699,
    "lng": 24.9384,
    "region": "Europe",
    "focus": [
      "defense",
      "arctic",
      "politics"
    ],
    "priority": 1,
    "rationale": "Northern flank defense and Arctic monitoring.",
    "color": "#ff8a5b"
  },
  {
    "id": "loc-38",
    "city": "Tbilisi",
    "country": "Georgia",
    "lat": 41.7151,
    "lng": 44.8271,
    "region": "Europe",
    "focus": [
      "politics",
      "security",
      "energy"
    ],
    "priority": 1,
    "rationale": "Transit corridor and regional coercion watch point.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-39",
    "city": "Jerusalem",
    "country": "Israel",
    "lat": 31.7683,
    "lng": 35.2137,
    "region": "Middle East",
    "focus": [
      "politics",
      "conflict",
      "religion"
    ],
    "priority": 3,
    "rationale": "Political and religious flashpoint with global diplomatic attention.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-40",
    "city": "Tel Aviv",
    "country": "Israel",
    "lat": 32.0853,
    "lng": 34.7818,
    "region": "Middle East",
    "focus": [
      "aviation",
      "security",
      "technology"
    ],
    "priority": 2,
    "rationale": "Air defense, commercial aviation, and tech-security hub.",
    "color": "#4fc3ff"
  },
  {
    "id": "loc-41",
    "city": "Gaza City",
    "country": "Palestinian Territories",
    "lat": 31.5018,
    "lng": 34.4668,
    "region": "Middle East",
    "focus": [
      "conflict",
      "humanitarian",
      "politics"
    ],
    "priority": 3,
    "rationale": "High-intensity humanitarian and military reporting focus.",
    "color": "#ff6b6b"
  },
  {
    "id": "loc-42",
    "city": "Beirut",
    "country": "Lebanon",
    "lat": 33.8938,
    "lng": 35.5018,
    "region": "Middle East",
    "focus": [
      "politics",
      "maritime",
      "conflict"
    ],
    "priority": 2,
    "rationale": "Political fragility, port risk, and militia-related pressure.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-43",
    "city": "Damascus",
    "country": "Syria",
    "lat": 33.5138,
    "lng": 36.2765,
    "region": "Middle East",
    "focus": [
      "conflict",
      "politics",
      "airstrike"
    ],
    "priority": 2,
    "rationale": "Conflict monitoring and air-defense related reporting focus.",
    "color": "#ff6b6b"
  },
  {
    "id": "loc-44",
    "city": "Amman",
    "country": "Jordan",
    "lat": 31.9454,
    "lng": 35.9284,
    "region": "Middle East",
    "focus": [
      "politics",
      "security",
      "humanitarian"
    ],
    "priority": 1,
    "rationale": "Regional diplomatic balancing and border security node.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-45",
    "city": "Baghdad",
    "country": "Iraq",
    "lat": 33.3152,
    "lng": 44.3661,
    "region": "Middle East",
    "focus": [
      "politics",
      "militia",
      "security"
    ],
    "priority": 2,
    "rationale": "Political center with militia, force-protection, and protest risk.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-46",
    "city": "Erbil",
    "country": "Iraq",
    "lat": 36.1911,
    "lng": 44.0092,
    "region": "Middle East",
    "focus": [
      "security",
      "aviation",
      "energy"
    ],
    "priority": 1,
    "rationale": "Northern Iraq aviation, energy, and force posture relevance.",
    "color": "#ff7c94"
  },
  {
    "id": "loc-47",
    "city": "Riyadh",
    "country": "Saudi Arabia",
    "lat": 24.7136,
    "lng": 46.6753,
    "region": "Middle East",
    "focus": [
      "politics",
      "defense",
      "energy"
    ],
    "priority": 2,
    "rationale": "Regional policy, energy markets, and air defense signaling.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-48",
    "city": "Jeddah",
    "country": "Saudi Arabia",
    "lat": 21.4858,
    "lng": 39.1925,
    "region": "Middle East",
    "focus": [
      "maritime",
      "aviation",
      "politics"
    ],
    "priority": 1,
    "rationale": "Red Sea gateway and diplomatic transit node.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-49",
    "city": "Sanaa",
    "country": "Yemen",
    "lat": 15.3694,
    "lng": 44.191,
    "region": "Middle East",
    "focus": [
      "conflict",
      "missile",
      "humanitarian"
    ],
    "priority": 2,
    "rationale": "Conflict, strike-warning, and humanitarian reporting center.",
    "color": "#ff6b6b"
  },
  {
    "id": "loc-50",
    "city": "Aden",
    "country": "Yemen",
    "lat": 12.7855,
    "lng": 45.0187,
    "region": "Middle East",
    "focus": [
      "maritime",
      "conflict",
      "port"
    ],
    "priority": 1,
    "rationale": "Port access and southern Yemen conflict watch.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-51",
    "city": "Dubai",
    "country": "UAE",
    "lat": 25.2048,
    "lng": 55.2708,
    "region": "Middle East",
    "focus": [
      "aviation",
      "finance",
      "maritime"
    ],
    "priority": 2,
    "rationale": "High-volume aviation and maritime logistics hub.",
    "color": "#4fc3ff"
  },
  {
    "id": "loc-52",
    "city": "Abu Dhabi",
    "country": "UAE",
    "lat": 24.4539,
    "lng": 54.3773,
    "region": "Middle East",
    "focus": [
      "politics",
      "defense",
      "energy"
    ],
    "priority": 1,
    "rationale": "State decision hub with defense and energy significance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-53",
    "city": "Doha",
    "country": "Qatar",
    "lat": 25.2854,
    "lng": 51.531,
    "region": "Middle East",
    "focus": [
      "aviation",
      "diplomacy",
      "energy"
    ],
    "priority": 1,
    "rationale": "Diplomatic mediation and international aviation node.",
    "color": "#4fc3ff"
  },
  {
    "id": "loc-54",
    "city": "Kuwait City",
    "country": "Kuwait",
    "lat": 29.3759,
    "lng": 47.9774,
    "region": "Middle East",
    "focus": [
      "security",
      "energy",
      "aviation"
    ],
    "priority": 1,
    "rationale": "Force-flow, logistics, and Gulf monitoring point.",
    "color": "#ff7c94"
  },
  {
    "id": "loc-55",
    "city": "Cairo",
    "country": "Egypt",
    "lat": 30.0444,
    "lng": 31.2357,
    "region": "Middle East",
    "focus": [
      "politics",
      "security",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Population center with regional diplomatic and security weight.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-56",
    "city": "Alexandria",
    "country": "Egypt",
    "lat": 31.2001,
    "lng": 29.9187,
    "region": "Middle East",
    "focus": [
      "maritime",
      "energy",
      "trade"
    ],
    "priority": 1,
    "rationale": "Mediterranean port and maritime traffic watch.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-57",
    "city": "Tripoli",
    "country": "Libya",
    "lat": 32.8872,
    "lng": 13.1913,
    "region": "Middle East",
    "focus": [
      "politics",
      "militia",
      "energy"
    ],
    "priority": 1,
    "rationale": "Factional pressure, energy security, and coastal access.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-58",
    "city": "Tunis",
    "country": "Tunisia",
    "lat": 36.8065,
    "lng": 10.1815,
    "region": "Middle East",
    "focus": [
      "politics",
      "migration",
      "maritime"
    ],
    "priority": 1,
    "rationale": "Political stability and migration route relevance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-59",
    "city": "Algiers",
    "country": "Algeria",
    "lat": 36.7538,
    "lng": 3.0588,
    "region": "Middle East",
    "focus": [
      "energy",
      "politics",
      "security"
    ],
    "priority": 1,
    "rationale": "Energy exports and Maghreb political posture.",
    "color": "#f89f5b"
  },
  {
    "id": "loc-60",
    "city": "Rabat",
    "country": "Morocco",
    "lat": 34.0209,
    "lng": -6.8416,
    "region": "Middle East",
    "focus": [
      "politics",
      "maritime",
      "diplomacy"
    ],
    "priority": 1,
    "rationale": "Atlantic gateway and diplomatic balancing node.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-61",
    "city": "Khartoum",
    "country": "Sudan",
    "lat": 15.5007,
    "lng": 32.5599,
    "region": "Africa",
    "focus": [
      "conflict",
      "humanitarian",
      "politics"
    ],
    "priority": 3,
    "rationale": "Urban war, ceasefire pressure, and humanitarian access focus.",
    "color": "#ff6b6b"
  },
  {
    "id": "loc-62",
    "city": "Port Sudan",
    "country": "Sudan",
    "lat": 19.6158,
    "lng": 37.2164,
    "region": "Africa",
    "focus": [
      "maritime",
      "humanitarian",
      "logistics"
    ],
    "priority": 2,
    "rationale": "Aid corridor and Red Sea logistics relevance.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-63",
    "city": "Addis Ababa",
    "country": "Ethiopia",
    "lat": 8.9806,
    "lng": 38.7578,
    "region": "Africa",
    "focus": [
      "politics",
      "security",
      "aviation"
    ],
    "priority": 1,
    "rationale": "AU diplomacy and Horn security dynamics.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-64",
    "city": "Mogadishu",
    "country": "Somalia",
    "lat": 2.0469,
    "lng": 45.3182,
    "region": "Africa",
    "focus": [
      "security",
      "maritime",
      "terrorism"
    ],
    "priority": 2,
    "rationale": "Counterterror, port, and coastal monitoring focus.",
    "color": "#ff7c94"
  },
  {
    "id": "loc-65",
    "city": "Nairobi",
    "country": "Kenya",
    "lat": -1.2864,
    "lng": 36.8172,
    "region": "Africa",
    "focus": [
      "politics",
      "aviation",
      "economy"
    ],
    "priority": 1,
    "rationale": "Regional hub with strong aviation and diplomatic relevance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-66",
    "city": "Kampala",
    "country": "Uganda",
    "lat": 0.3476,
    "lng": 32.5825,
    "region": "Africa",
    "focus": [
      "politics",
      "security",
      "refugees"
    ],
    "priority": 1,
    "rationale": "Regional security and displacement monitoring point.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-67",
    "city": "Kigali",
    "country": "Rwanda",
    "lat": -1.9706,
    "lng": 30.1044,
    "region": "Africa",
    "focus": [
      "politics",
      "security",
      "diplomacy"
    ],
    "priority": 1,
    "rationale": "Regional diplomacy and Great Lakes influence node.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-68",
    "city": "Goma",
    "country": "DR Congo",
    "lat": -1.6792,
    "lng": 29.2228,
    "region": "Africa",
    "focus": [
      "conflict",
      "humanitarian",
      "displacement"
    ],
    "priority": 3,
    "rationale": "Armed group pressure and humanitarian access hotspot.",
    "color": "#ff6b6b"
  },
  {
    "id": "loc-69",
    "city": "Kinshasa",
    "country": "DR Congo",
    "lat": -4.4419,
    "lng": 15.2663,
    "region": "Africa",
    "focus": [
      "politics",
      "security",
      "resource"
    ],
    "priority": 1,
    "rationale": "National political center with resource and conflict relevance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-70",
    "city": "Lagos",
    "country": "Nigeria",
    "lat": 6.5244,
    "lng": 3.3792,
    "region": "Africa",
    "focus": [
      "maritime",
      "economy",
      "security"
    ],
    "priority": 2,
    "rationale": "Commercial hub with port and coastal security relevance.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-71",
    "city": "Abuja",
    "country": "Nigeria",
    "lat": 9.0765,
    "lng": 7.3986,
    "region": "Africa",
    "focus": [
      "politics",
      "security",
      "aviation"
    ],
    "priority": 1,
    "rationale": "National security and political command center.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-72",
    "city": "Niamey",
    "country": "Niger",
    "lat": 13.5116,
    "lng": 2.1254,
    "region": "Africa",
    "focus": [
      "security",
      "politics",
      "sahel"
    ],
    "priority": 2,
    "rationale": "Sahel force posture, coup risk, and external influence watch.",
    "color": "#ff7c94"
  },
  {
    "id": "loc-73",
    "city": "Bamako",
    "country": "Mali",
    "lat": 12.6392,
    "lng": -8.0029,
    "region": "Africa",
    "focus": [
      "security",
      "politics",
      "sahel"
    ],
    "priority": 2,
    "rationale": "Militant activity and political control monitor.",
    "color": "#ff7c94"
  },
  {
    "id": "loc-74",
    "city": "Dakar",
    "country": "Senegal",
    "lat": 14.7167,
    "lng": -17.4677,
    "region": "Africa",
    "focus": [
      "maritime",
      "politics",
      "aviation"
    ],
    "priority": 1,
    "rationale": "West African maritime and political stability node.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-75",
    "city": "Johannesburg",
    "country": "South Africa",
    "lat": -26.2041,
    "lng": 28.0473,
    "region": "Africa",
    "focus": [
      "economy",
      "politics",
      "security"
    ],
    "priority": 1,
    "rationale": "Financial center with infrastructure and social stability watch.",
    "color": "#4fc3ff"
  },
  {
    "id": "loc-76",
    "city": "Cape Town",
    "country": "South Africa",
    "lat": -33.9249,
    "lng": 18.4241,
    "region": "Africa",
    "focus": [
      "maritime",
      "politics",
      "climate"
    ],
    "priority": 1,
    "rationale": "Southern maritime gateway and climate impact monitor.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-77",
    "city": "Moscow",
    "country": "Russia",
    "lat": 55.7558,
    "lng": 37.6173,
    "region": "Eurasia",
    "focus": [
      "politics",
      "defense",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Strategic command center shaping regional military tempo.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-78",
    "city": "St. Petersburg",
    "country": "Russia",
    "lat": 59.9311,
    "lng": 30.3609,
    "region": "Eurasia",
    "focus": [
      "maritime",
      "politics",
      "defense"
    ],
    "priority": 1,
    "rationale": "Baltic maritime access and political signal point.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-79",
    "city": "Almaty",
    "country": "Kazakhstan",
    "lat": 43.222,
    "lng": 76.8512,
    "region": "Eurasia",
    "focus": [
      "politics",
      "energy",
      "transport"
    ],
    "priority": 1,
    "rationale": "Transit, energy, and regional balancing node.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-80",
    "city": "Tashkent",
    "country": "Uzbekistan",
    "lat": 41.2995,
    "lng": 69.2401,
    "region": "Eurasia",
    "focus": [
      "politics",
      "security",
      "transport"
    ],
    "priority": 1,
    "rationale": "Central Asian connectivity and security monitoring point.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-81",
    "city": "Kabul",
    "country": "Afghanistan",
    "lat": 34.5553,
    "lng": 69.2075,
    "region": "Eurasia",
    "focus": [
      "security",
      "humanitarian",
      "politics"
    ],
    "priority": 2,
    "rationale": "Security, humanitarian, and governance reporting center.",
    "color": "#ff7c94"
  },
  {
    "id": "loc-82",
    "city": "Islamabad",
    "country": "Pakistan",
    "lat": 33.6844,
    "lng": 73.0479,
    "region": "Eurasia",
    "focus": [
      "politics",
      "defense",
      "security"
    ],
    "priority": 2,
    "rationale": "Strategic policy and security decision hub.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-83",
    "city": "Karachi",
    "country": "Pakistan",
    "lat": 24.8607,
    "lng": 67.0011,
    "region": "Eurasia",
    "focus": [
      "maritime",
      "aviation",
      "security"
    ],
    "priority": 2,
    "rationale": "Pakistan's maritime and commercial gateway.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-84",
    "city": "Lahore",
    "country": "Pakistan",
    "lat": 31.5204,
    "lng": 74.3587,
    "region": "Eurasia",
    "focus": [
      "politics",
      "protest",
      "aviation"
    ],
    "priority": 1,
    "rationale": "Population and political mobilization center.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-85",
    "city": "Delhi",
    "country": "India",
    "lat": 28.6139,
    "lng": 77.209,
    "region": "South Asia",
    "focus": [
      "politics",
      "defense",
      "aviation"
    ],
    "priority": 2,
    "rationale": "National policy, military signaling, and diplomatic activity.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-86",
    "city": "Mumbai",
    "country": "India",
    "lat": 19.076,
    "lng": 72.8777,
    "region": "South Asia",
    "focus": [
      "finance",
      "maritime",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Financial center with port and aviation relevance.",
    "color": "#57e3d8"
  },
  {
    "id": "loc-87",
    "city": "Bengaluru",
    "country": "India",
    "lat": 12.9716,
    "lng": 77.5946,
    "region": "South Asia",
    "focus": [
      "technology",
      "aviation",
      "space"
    ],
    "priority": 1,
    "rationale": "Tech, aerospace, and innovation signal point.",
    "color": "#71a7ff"
  },
  {
    "id": "loc-88",
    "city": "Colombo",
    "country": "Sri Lanka",
    "lat": 6.9271,
    "lng": 79.8612,
    "region": "South Asia",
    "focus": [
      "maritime",
      "politics",
      "trade"
    ],
    "priority": 1,
    "rationale": "Indian Ocean port and debt-politics watch.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-89",
    "city": "Dhaka",
    "country": "Bangladesh",
    "lat": 23.8103,
    "lng": 90.4125,
    "region": "South Asia",
    "focus": [
      "politics",
      "aviation",
      "climate"
    ],
    "priority": 1,
    "rationale": "Population, industrial, and climate-risk center.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-90",
    "city": "Kathmandu",
    "country": "Nepal",
    "lat": 27.7172,
    "lng": 85.324,
    "region": "South Asia",
    "focus": [
      "politics",
      "aviation",
      "disaster"
    ],
    "priority": 1,
    "rationale": "Mountain aviation and political stability watch.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-91",
    "city": "Yangon",
    "country": "Myanmar",
    "lat": 16.8409,
    "lng": 96.1735,
    "region": "Southeast Asia",
    "focus": [
      "conflict",
      "politics",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Conflict, sanctions, and air logistics monitoring point.",
    "color": "#ff6b6b"
  },
  {
    "id": "loc-92",
    "city": "Bangkok",
    "country": "Thailand",
    "lat": 13.7563,
    "lng": 100.5018,
    "region": "Southeast Asia",
    "focus": [
      "politics",
      "aviation",
      "tourism"
    ],
    "priority": 1,
    "rationale": "Transport hub with domestic political sensitivity.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-93",
    "city": "Hanoi",
    "country": "Vietnam",
    "lat": 21.0278,
    "lng": 105.8342,
    "region": "Southeast Asia",
    "focus": [
      "politics",
      "maritime",
      "trade"
    ],
    "priority": 1,
    "rationale": "South China Sea policy and manufacturing relevance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-94",
    "city": "Ho Chi Minh City",
    "country": "Vietnam",
    "lat": 10.8231,
    "lng": 106.6297,
    "region": "Southeast Asia",
    "focus": [
      "trade",
      "maritime",
      "aviation"
    ],
    "priority": 1,
    "rationale": "Commercial center linked to port and industrial flows.",
    "color": "#5dd39e"
  },
  {
    "id": "loc-95",
    "city": "Phnom Penh",
    "country": "Cambodia",
    "lat": 11.5564,
    "lng": 104.9282,
    "region": "Southeast Asia",
    "focus": [
      "politics",
      "trade",
      "security"
    ],
    "priority": 1,
    "rationale": "Mekong political and infrastructure monitoring point.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-96",
    "city": "Kuala Lumpur",
    "country": "Malaysia",
    "lat": 3.139,
    "lng": 101.6869,
    "region": "Southeast Asia",
    "focus": [
      "aviation",
      "politics",
      "maritime"
    ],
    "priority": 1,
    "rationale": "Regional aviation and Strait-linked trade node.",
    "color": "#4fc3ff"
  },
  {
    "id": "loc-97",
    "city": "Singapore",
    "country": "Singapore",
    "lat": 1.3521,
    "lng": 103.8198,
    "region": "Southeast Asia",
    "focus": [
      "maritime",
      "aviation",
      "finance"
    ],
    "priority": 2,
    "rationale": "Critical maritime chokepoint and aviation hub.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-98",
    "city": "Jakarta",
    "country": "Indonesia",
    "lat": -6.2088,
    "lng": 106.8456,
    "region": "Southeast Asia",
    "focus": [
      "politics",
      "maritime",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Archipelagic political center with sea lane importance.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-99",
    "city": "Surabaya",
    "country": "Indonesia",
    "lat": -7.2575,
    "lng": 112.7521,
    "region": "Southeast Asia",
    "focus": [
      "maritime",
      "navy",
      "trade"
    ],
    "priority": 1,
    "rationale": "Fleet, port, and logistics relevance in eastern Java.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-100",
    "city": "Manila",
    "country": "Philippines",
    "lat": 14.5995,
    "lng": 120.9842,
    "region": "Southeast Asia",
    "focus": [
      "maritime",
      "politics",
      "defense"
    ],
    "priority": 2,
    "rationale": "South China Sea friction and alliance posture watch.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-101",
    "city": "Davao",
    "country": "Philippines",
    "lat": 7.1907,
    "lng": 125.4553,
    "region": "Southeast Asia",
    "focus": [
      "security",
      "maritime",
      "aviation"
    ],
    "priority": 1,
    "rationale": "Southern sea lanes and internal security monitoring.",
    "color": "#ff7c94"
  },
  {
    "id": "loc-102",
    "city": "Taipei",
    "country": "Taiwan",
    "lat": 25.033,
    "lng": 121.5654,
    "region": "East Asia",
    "focus": [
      "politics",
      "defense",
      "aviation"
    ],
    "priority": 3,
    "rationale": "High-sensitivity defense and political reporting node.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-103",
    "city": "Hong Kong",
    "country": "China",
    "lat": 22.3193,
    "lng": 114.1694,
    "region": "East Asia",
    "focus": [
      "finance",
      "maritime",
      "aviation"
    ],
    "priority": 1,
    "rationale": "Financial, legal, and maritime information node.",
    "color": "#57e3d8"
  },
  {
    "id": "loc-104",
    "city": "Shenzhen",
    "country": "China",
    "lat": 22.5431,
    "lng": 114.0579,
    "region": "East Asia",
    "focus": [
      "technology",
      "trade",
      "aviation"
    ],
    "priority": 1,
    "rationale": "Tech manufacturing and cross-border logistics point.",
    "color": "#71a7ff"
  },
  {
    "id": "loc-105",
    "city": "Guangzhou",
    "country": "China",
    "lat": 23.1291,
    "lng": 113.2644,
    "region": "East Asia",
    "focus": [
      "trade",
      "aviation",
      "maritime"
    ],
    "priority": 1,
    "rationale": "Industrial and transport center in South China.",
    "color": "#5dd39e"
  },
  {
    "id": "loc-106",
    "city": "Beijing",
    "country": "China",
    "lat": 39.9042,
    "lng": 116.4074,
    "region": "East Asia",
    "focus": [
      "politics",
      "defense",
      "aviation"
    ],
    "priority": 2,
    "rationale": "National command, diplomacy, and defense signal point.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-107",
    "city": "Shanghai",
    "country": "China",
    "lat": 31.2304,
    "lng": 121.4737,
    "region": "East Asia",
    "focus": [
      "finance",
      "maritime",
      "trade"
    ],
    "priority": 2,
    "rationale": "Major port and market signal center.",
    "color": "#57e3d8"
  },
  {
    "id": "loc-108",
    "city": "Qingdao",
    "country": "China",
    "lat": 36.0671,
    "lng": 120.3826,
    "region": "East Asia",
    "focus": [
      "maritime",
      "navy",
      "trade"
    ],
    "priority": 1,
    "rationale": "Naval and industrial relevance on China's coast.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-109",
    "city": "Seoul",
    "country": "South Korea",
    "lat": 37.5665,
    "lng": 126.978,
    "region": "East Asia",
    "focus": [
      "politics",
      "defense",
      "technology"
    ],
    "priority": 2,
    "rationale": "Alliance posture and Korean Peninsula signaling center.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-110",
    "city": "Busan",
    "country": "South Korea",
    "lat": 35.1796,
    "lng": 129.0756,
    "region": "East Asia",
    "focus": [
      "maritime",
      "trade",
      "aviation"
    ],
    "priority": 1,
    "rationale": "Port, shipping, and industrial logistics hub.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-111",
    "city": "Tokyo",
    "country": "Japan",
    "lat": 35.6762,
    "lng": 139.6503,
    "region": "East Asia",
    "focus": [
      "politics",
      "defense",
      "finance"
    ],
    "priority": 2,
    "rationale": "Alliance coordination and economic signal center.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-112",
    "city": "Okinawa",
    "country": "Japan",
    "lat": 26.2124,
    "lng": 127.6809,
    "region": "East Asia",
    "focus": [
      "defense",
      "aviation",
      "maritime"
    ],
    "priority": 2,
    "rationale": "Forward military posture and air-sea access node.",
    "color": "#ff8a5b"
  },
  {
    "id": "loc-113",
    "city": "Darwin",
    "country": "Australia",
    "lat": -12.4634,
    "lng": 130.8456,
    "region": "Oceania",
    "focus": [
      "defense",
      "maritime",
      "aviation"
    ],
    "priority": 2,
    "rationale": "Northern Australian force posture and Indo-Pacific logistics.",
    "color": "#ff8a5b"
  },
  {
    "id": "loc-114",
    "city": "Sydney",
    "country": "Australia",
    "lat": -33.8688,
    "lng": 151.2093,
    "region": "Oceania",
    "focus": [
      "finance",
      "maritime",
      "aviation"
    ],
    "priority": 1,
    "rationale": "Major Pacific-facing economic and transport hub.",
    "color": "#57e3d8"
  },
  {
    "id": "loc-115",
    "city": "Brisbane",
    "country": "Australia",
    "lat": -27.4698,
    "lng": 153.0251,
    "region": "Oceania",
    "focus": [
      "aviation",
      "maritime",
      "disaster"
    ],
    "priority": 1,
    "rationale": "Air-sea logistics and disaster response node.",
    "color": "#4fc3ff"
  },
  {
    "id": "loc-116",
    "city": "Auckland",
    "country": "New Zealand",
    "lat": -36.8509,
    "lng": 174.7645,
    "region": "Oceania",
    "focus": [
      "maritime",
      "aviation",
      "politics"
    ],
    "priority": 1,
    "rationale": "South Pacific gateway and maritime monitoring point.",
    "color": "#3ddc97"
  },
  {
    "id": "loc-117",
    "city": "Port Moresby",
    "country": "Papua New Guinea",
    "lat": -9.4438,
    "lng": 147.1803,
    "region": "Oceania",
    "focus": [
      "security",
      "maritime",
      "politics"
    ],
    "priority": 1,
    "rationale": "Pacific security and resource corridor relevance.",
    "color": "#ff7c94"
  },
  {
    "id": "loc-118",
    "city": "Honiara",
    "country": "Solomon Islands",
    "lat": -9.4456,
    "lng": 159.9729,
    "region": "Oceania",
    "focus": [
      "politics",
      "maritime",
      "security"
    ],
    "priority": 1,
    "rationale": "Island-chain influence and Pacific presence watch.",
    "color": "#f7c65c"
  },
  {
    "id": "loc-119",
    "city": "Hagatna",
    "country": "Guam",
    "lat": 13.4757,
    "lng": 144.7489,
    "region": "Oceania",
    "focus": [
      "defense",
      "aviation",
      "maritime"
    ],
    "priority": 2,
    "rationale": "Strategic air and maritime hub in the Western Pacific.",
    "color": "#ff8a5b"
  }
];

const SCOPES = [
  { id: 'all', label: 'All', color: '#4fc3ff', query: '(conflict OR military OR defense OR aviation OR maritime OR politics OR protest OR sanctions OR cyber OR disaster OR election OR shipping OR port OR airspace)' },
  { id: 'conflict', label: 'Conflict', color: '#ff6b6b', query: '(conflict OR strike OR missile OR drone OR ceasefire OR troops OR militia OR offensive OR shelling)' },
  { id: 'aviation', label: 'Aviation', color: '#4fc3ff', query: '(aviation OR airspace OR airline OR airport OR runway OR aircraft OR air defense OR sortie)' },
  { id: 'maritime', label: 'Maritime', color: '#3ddc97', query: '(maritime OR shipping OR port OR tanker OR navy OR vessel OR strait OR red sea)' },
  { id: 'politics', label: 'Politics', color: '#f7c65c', query: '(politics OR election OR sanctions OR diplomacy OR parliament OR minister OR summit)' },
  { id: 'cyber', label: 'Cyber', color: '#b388ff', query: '(cyber OR hacking OR malware OR network OR telecom OR outage OR disinformation)' },
  { id: 'disaster', label: 'Disaster', color: '#f36f9f', query: '(earthquake OR wildfire OR flood OR cyclone OR drought OR evacuation OR outage)' },
];

const FALLBACK_GLOBAL = [
  'The desk is city-first: use the globe or directory to shift from broad regions to specific urban pressure points.',
  'Look for overlaps between politics, aviation, maritime traffic, force posture, and supply lines rather than a single headline.',
  'When live pulls are thin, the baseline brief still tells you why the location matters and what to watch next.'
];

const dom = {
  citySearch: document.getElementById('citySearch'),
  scopeChips: document.getElementById('scopeChips'),
  coverageCount: document.getElementById('coverageCount'),
  selectedLabel: document.getElementById('selectedLabel'),
  selectedTitle: document.getElementById('selectedTitle'),
  selectedRegion: document.getElementById('selectedRegion'),
  selectedPriority: document.getElementById('selectedPriority'),
  selectedFocus: document.getElementById('selectedFocus'),
  selectedRationale: document.getElementById('selectedRationale'),
  selectedPills: document.getElementById('selectedPills'),
  briefList: document.getElementById('briefList'),
  watchNext: document.getElementById('watchNext'),
  headlinesStatus: document.getElementById('headlinesStatus'),
  headlinesList: document.getElementById('headlinesList'),
  directoryList: document.getElementById('directoryList'),
  globalPulse: document.getElementById('globalPulse'),
  refreshGlobal: document.getElementById('refreshGlobal'),
  selectionOverlay: document.getElementById('selectionOverlay'),
  selectionOverlayTitle: document.getElementById('selectionOverlayTitle'),
  selectionOverlayText: document.getElementById('selectionOverlayText'),
  legendGrid: document.getElementById('legendGrid'),
};

let currentScope = 'all';
let currentLocation = null;
let globalArticles = [];
let globe;

const THEME_WORDS = {
  conflict: ['conflict','strike','missile','drone','troop','ceasefire','assault','military','defense','shelling','raid','attack'],
  aviation: ['aviation','airspace','airline','airport','runway','flight','aircraft','sortie','helicopter','jet'],
  maritime: ['port','shipping','maritime','navy','vessel','tanker','strait','harbor','fleet','sea'],
  politics: ['president','minister','parliament','summit','election','sanctions','diplomat','cabinet','vote'],
  cyber: ['cyber','network','hacker','malware','telecom','internet','satellite','outage','disinformation'],
  disaster: ['earthquake','wildfire','flood','storm','cyclone','drought','evacuation','outage'],
  economy: ['market','trade','oil','gas','inflation','factory','supply','finance','currency'],
  protest: ['protest','demonstration','riot','strike action','march'],
};

function init() {
  dom.coverageCount.textContent = `${LOCATIONS.length} monitored locations`;
  buildScopeChips();
  buildLegend();
  buildDirectory();
  buildGlobe();
  bindUI();
  selectLocation(findLocation('Washington') || LOCATIONS[0], true);
  loadGlobalPulse();
}

function buildScopeChips() {
  dom.scopeChips.innerHTML = '';
  SCOPES.forEach(scope => {
    const btn = document.createElement('button');
    btn.className = `scope-chip${scope.id === currentScope ? ' active' : ''}`;
    btn.textContent = scope.label;
    btn.dataset.scope = scope.id;
    btn.addEventListener('click', () => {
      currentScope = scope.id;
      document.querySelectorAll('.scope-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.scope === currentScope));
      updateSelectedContent();
      loadGlobalPulse();
    });
    dom.scopeChips.appendChild(btn);
  });
}

function buildLegend() {
  dom.legendGrid.innerHTML = '';
  SCOPES.filter(scope => scope.id !== 'all').forEach(scope => {
    const row = document.createElement('div');
    row.className = 'legend-item';
    row.innerHTML = `<span class="legend-swatch" style="background:${scope.color}"></span><span>${scope.label}</span>`;
    dom.legendGrid.appendChild(row);
  });
}

function buildDirectory(filterText = '') {
  const query = filterText.trim().toLowerCase();
  const groups = groupByRegion(LOCATIONS.filter(loc => !query || `${loc.city} ${loc.country} ${loc.region}`.toLowerCase().includes(query)));

  dom.directoryList.innerHTML = '';
  Object.entries(groups).forEach(([region, items]) => {
    const group = document.createElement('div');
    group.className = 'directory-group';

    const title = document.createElement('div');
    title.className = 'directory-group-title';
    title.textContent = `${region} · ${items.length}`;

    const grid = document.createElement('div');
    grid.className = 'directory-grid';

    items.sort((a, b) => b.priority - a.priority || a.city.localeCompare(b.city)).forEach(item => {
      const btn = document.createElement('button');
      btn.className = `directory-btn${currentLocation && currentLocation.id === item.id ? ' active' : ''}`;
      btn.style.borderColor = `${hexToRgba(item.color, 0.2)}`;
      btn.style.background = currentLocation && currentLocation.id === item.id ? item.color : 'rgba(18,27,41,0.76)';
      btn.innerHTML = `${item.city} <span class="country">${item.country}</span>`;
      btn.addEventListener('click', () => selectLocation(item, true));
      grid.appendChild(btn);
    });

    group.appendChild(title);
    group.appendChild(grid);
    dom.directoryList.appendChild(group);
  });
}

function groupByRegion(items) {
  return items.reduce((acc, item) => {
    (acc[item.region] ||= []).push(item);
    return acc;
  }, {});
}

function buildGlobe() {
  globe = Globe()(document.getElementById('globeViz'))
    .backgroundColor('rgba(0,0,0,0)')
    .globeMaterial(makeMaterial())
    .showAtmosphere(true)
    .atmosphereColor('#4fc3ff')
    .atmosphereAltitude(0.14)
    .pointLat('lat')
    .pointLng('lng')
    .pointRadius(d => d.priority === 3 ? 0.24 : d.priority === 2 ? 0.19 : 0.15)
    .pointAltitude(d => currentLocation && currentLocation.id === d.id ? 0.12 : d.priority === 3 ? 0.065 : 0.04)
    .pointColor(d => currentLocation && currentLocation.id === d.id ? '#ffffff' : d.color)
    .pointResolution(10)
    .pointsMerge(false)
    .pointsData(LOCATIONS)
    .pointLabel(d => `<div style="padding:8px 10px;border-radius:12px;background:rgba(11,17,26,0.92);border:1px solid rgba(255,255,255,0.08);color:#e9f1fb;max-width:220px">
      <div style="font-size:11px;color:#91a4bf;letter-spacing:.12em;text-transform:uppercase;font-weight:700">${d.region}</div>
      <div style="font-weight:700;margin-top:4px">${d.city}, ${d.country}</div>
      <div style="font-size:12px;color:#91a4bf;margin-top:6px">${d.rationale}</div>
    </div>`)
    .onPointClick((point) => selectLocation(point, true));

  globe.controls().autoRotate = false;
  globe.controls().enablePan = false;
  globe.controls().minDistance = 170;
  globe.controls().maxDistance = 380;
  globe.controls().rotateSpeed = 0.55;
  globe.controls().zoomSpeed = 0.7;
  globe.controls().enableDamping = true;
  globe.controls().dampingFactor = 0.08;
  globe.pointOfView({ lat: 18, lng: 8, altitude: 2.1 }, 0);

  renderRings();
}

function makeMaterial() {
  const material = new THREE.MeshPhongMaterial({
    color: 0x16304d,
    emissive: 0x0b1d33,
    shininess: 14,
    transparent: true,
    opacity: 0.98,
  });
  return material;
}

function renderRings() {
  const ringData = currentLocation ? [{
    lat: currentLocation.lat,
    lng: currentLocation.lng,
    color: currentLocation.color,
    maxR: 4.2,
    propagationSpeed: 2.5,
    repeatPeriod: 1100,
  }] : [];
  globe
    .ringsData(ringData)
    .ringLat('lat')
    .ringLng('lng')
    .ringColor(r => () => r.color)
    .ringMaxRadius('maxR')
    .ringPropagationSpeed('propagationSpeed')
    .ringRepeatPeriod('repeatPeriod');
}

function bindUI() {
  dom.citySearch.addEventListener('input', (event) => {
    const value = event.target.value;
    buildDirectory(value);
  });

  dom.citySearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const match = LOCATIONS.find(loc => `${loc.city} ${loc.country}`.toLowerCase().includes(event.target.value.trim().toLowerCase()));
      if (match) {
        selectLocation(match, true);
      }
    }
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(el => el.classList.toggle('active', el === btn));
      document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.toggle('active', panel.id === `tab-${btn.dataset.tab}`));
    });
  });

  dom.refreshGlobal.addEventListener('click', loadGlobalPulse);
}

function selectLocation(location, moveCamera = false) {
  currentLocation = location;
  dom.selectedLabel.textContent = `${location.city}, ${location.country}`;
  if (moveCamera) {
    globe.pointOfView({ lat: location.lat, lng: location.lng, altitude: 1.55 }, 900);
  }
  renderRings();
  globe.pointsData([...LOCATIONS]);
  buildDirectory(dom.citySearch.value);
  updateSelectedContent();
}

function updateSelectedContent() {
  if (!currentLocation) return;
  const scope = SCOPES.find(item => item.id === currentScope) || SCOPES[0];
  const focusLabel = currentLocation.focus.join(' · ');
  const priorityLabel = currentLocation.priority === 3 ? 'High-interest' : currentLocation.priority === 2 ? 'Elevated' : 'Monitoring';

  dom.selectedTitle.textContent = `${currentLocation.city}, ${currentLocation.country}`;
  dom.selectedRegion.textContent = currentLocation.region;
  dom.selectedPriority.textContent = priorityLabel;
  dom.selectedFocus.textContent = focusLabel;
  dom.selectedRationale.textContent = currentLocation.rationale;
  dom.selectionOverlayTitle.textContent = `${currentLocation.city}, ${currentLocation.country}`;
  dom.selectionOverlayText.textContent = `${currentLocation.rationale} Scope: ${scope.label}.`;

  dom.selectedPills.innerHTML = currentLocation.focus.slice(0, 3).map(tag => `<span class="pill">${capitalize(tag)}</span>`).join('');
  renderImmediateBrief(currentLocation, scope, []);
  loadCityArticles(currentLocation, scope);
}

async function loadCityArticles(location, scope) {
  dom.headlinesStatus.textContent = `Pulling live reporting for ${location.city}…`;
  dom.headlinesList.innerHTML = '';

  const endpoint = buildGdeltEndpoint(location, scope);
  try {
    const response = await fetch(endpoint);
    const payload = await response.json();
    const articles = Array.isArray(payload.articles) ? payload.articles.slice(0, 12) : [];
    renderImmediateBrief(location, scope, articles);
    renderHeadlines(articles);
    dom.headlinesStatus.textContent = articles.length
      ? `${articles.length} recent items matched ${scope.label.toLowerCase()}`
      : `No fresh hits for this exact city and scope. Showing baseline brief.`;
  } catch (error) {
    renderImmediateBrief(location, scope, []);
    dom.headlinesStatus.textContent = 'Live pull was unavailable. Baseline brief is still active.';
    renderHeadlines([]);
  }
}

function buildGdeltEndpoint(location, scope) {
  const city = `\"${location.city}\"`;
  const country = `\"${location.country}\"`;
  const focusTerms = [...new Set(location.focus.map(term => term === 'defense' ? 'military' : term))].join(' OR ');
  const query = `(${city} OR ${country}) AND (${scope.query} OR (${focusTerms}))`;
  const params = new URLSearchParams({
    query,
    mode: 'ArtList',
    maxrecords: '12',
    format: 'json',
    sort: 'datedesc',
    timespan: '7days'
  });
  return `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;
}

async function loadGlobalPulse() {
  dom.globalPulse.innerHTML = `<div class="pulse-line"><span class="pulse-name">Refreshing</span><span class="pulse-value">Scanning current coverage…</span></div>`;
  const scope = SCOPES.find(item => item.id === currentScope) || SCOPES[0];
  const params = new URLSearchParams({
    query: scope.query,
    mode: 'ArtList',
    maxrecords: '16',
    format: 'json',
    sort: 'datedesc',
    timespan: '2days'
  });
  try {
    const response = await fetch(`https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`);
    const payload = await response.json();
    globalArticles = Array.isArray(payload.articles) ? payload.articles.slice(0, 16) : [];
    renderGlobalPulse(globalArticles, scope);
  } catch (error) {
    globalArticles = [];
    renderGlobalPulse([], scope);
  }
}

function renderGlobalPulse(articles, scope) {
  const pulseLines = buildGlobalPulseLines(articles, scope);
  dom.globalPulse.innerHTML = pulseLines.map(line => `
    <div class="pulse-line">
      <span class="pulse-name">${line.label}</span>
      <span class="pulse-value">${line.value}</span>
    </div>
  `).join('');

  if (!currentLocation) {
    dom.briefList.innerHTML = FALLBACK_GLOBAL.map(item => `<li>${item}</li>`).join('');
    dom.watchNext.textContent = 'Use the directory to move from global noise to a city or port that actually matters to you.';
  }
}

function buildGlobalPulseLines(articles, scope) {
  if (!articles.length) {
    return [
      { label: 'Desk posture', value: 'Live pull unavailable' },
      { label: 'Scope', value: scope.label },
      { label: 'Use next', value: 'Search a city or use the directory' },
    ];
  }

  const topThemes = getTopThemes(articles).slice(0, 3);
  const regions = tallyRegionsFromArticles(articles).slice(0, 3);
  return [
    { label: 'Scope', value: `${scope.label} · ${articles.length} items` },
    { label: 'Dominant themes', value: topThemes.length ? topThemes.map(item => capitalize(item.theme)).join(' / ') : 'Mixed coverage' },
    { label: 'Most-referenced zones', value: regions.length ? regions.map(item => item.region).join(' / ') : 'Distributed' },
  ];
}

function tallyRegionsFromArticles(articles) {
  const scores = new Map();
  for (const article of articles) {
    const text = normalize(`${article.title || ''} ${article.seendate || ''} ${article.domain || ''}`);
    LOCATIONS.forEach(loc => {
      if (text.includes(loc.city.toLowerCase()) || text.includes(loc.country.toLowerCase())) {
        scores.set(loc.region, (scores.get(loc.region) || 0) + 1);
      }
    });
  }
  return [...scores.entries()].map(([region, score]) => ({ region, score })).sort((a, b) => b.score - a.score);
}

function renderImmediateBrief(location, scope, articles) {
  const bullets = buildLocationBrief(location, scope, articles);
  dom.briefList.innerHTML = bullets.map(item => `<li>${item}</li>`).join('');
  dom.watchNext.textContent = buildWatchNext(location, scope, articles);
}

function buildLocationBrief(location, scope, articles) {
  const themes = getTopThemes(articles).slice(0, 3);
  const themeNames = themes.map(item => capitalize(item.theme));
  const leadThemes = themeNames.length ? themeNames.join(', ') : readableFocus(location.focus);

  const bullets = [
    `${location.city} matters because ${location.rationale.toLowerCase()}`,
    `Current scan leans ${themeNames.length ? 'toward ' + leadThemes.toLowerCase() : 'toward ' + readableFocus(location.focus).toLowerCase()} inside a ${scope.label.toLowerCase()} frame.`,
    buildPressureSentence(location, themes),
  ];

  if (articles.length) {
    const freshest = articles[0];
    bullets.push(`Freshest visible signal: "${freshest.title || 'Recent reporting'}".`);
  }

  return bullets.slice(0, 4);
}

function buildPressureSentence(location, themes) {
  const hasConflict = location.focus.includes('conflict') || themes.some(t => t.theme === 'conflict');
  const hasAviation = location.focus.includes('aviation') || themes.some(t => t.theme === 'aviation');
  const hasMaritime = location.focus.includes('maritime') || themes.some(t => t.theme === 'maritime');
  const hasPolitics = location.focus.includes('politics') || themes.some(t => t.theme === 'politics');

  if (hasConflict && hasAviation) return 'Watch for shifts in strike tempo, air-defense posture, access restrictions, and movement around airports or air corridors.';
  if (hasMaritime && hasPolitics) return 'Watch for policy moves that could change port throughput, shipping risk, customs enforcement, or naval signaling.';
  if (hasAviation) return 'Watch for runway disruptions, airline changes, temporary airspace measures, and defense-related aviation signaling.';
  if (hasMaritime) return 'Watch for congestion, inspections, route changes, insurance pressure, and coastal security incidents.';
  if (hasPolitics) return 'Watch for cabinet moves, public demonstrations, summit language, and external pressure that could shift the local operating picture.';
  return 'Watch for compounding effects across security, transport, diplomacy, and infrastructure rather than a single headline spike.';
}

function buildWatchNext(location, scope, articles) {
  const themes = getTopThemes(articles).slice(0, 2).map(item => item.theme);
  const concerns = new Set([scope.id !== 'all' ? scope.id : null, ...location.focus.slice(0, 2), ...themes].filter(Boolean));

  if (concerns.has('conflict')) return 'Next 24 hours: monitor strike claims, casualty narratives, access restrictions, and any change in external military signaling.';
  if (concerns.has('aviation')) return 'Next 24 hours: monitor airport operations, NOTAM-style disruptions, flight reroutes, and any shift in air-defense language.';
  if (concerns.has('maritime')) return 'Next 24 hours: monitor port throughput, vessel routing, insurance-risk language, and naval or coast-guard activity.';
  if (concerns.has('cyber')) return 'Next 24 hours: monitor outages, telecom disruption, state-linked intrusion claims, and knock-on effects to transport or utilities.';
  if (concerns.has('politics')) return 'Next 24 hours: monitor official statements, vote counts, summit outcomes, and street mobilization that could alter the operating picture.';
  return 'Next 24 hours: monitor whether scattered reporting hardens into a clear pattern tied to transport, political control, or local security.';
}

function renderHeadlines(articles) {
  if (!articles.length) {
    dom.headlinesList.innerHTML = `<div class="headline-item"><div class="headline-title">No live article pull was available for this exact match.</div><div class="headline-meta">Use the baseline brief, change scope, or search a nearby city.</div></div>`;
    return;
  }

  dom.headlinesList.innerHTML = articles.map(article => {
    const title = escapeHtml(article.title || 'Untitled item');
    const domain = escapeHtml(article.domain || 'Open source');
    const url = article.url || '#';
    const date = article.seendate ? formatSeenDate(article.seendate) : 'Recent';
    return `
      <a class="headline-item" href="${url}" target="_blank" rel="noopener noreferrer">
        <div class="headline-title">${title}</div>
        <div class="headline-meta">${domain} · ${date}</div>
      </a>
    `;
  }).join('');
}

function getTopThemes(articles) {
  const scores = Object.fromEntries(Object.keys(THEME_WORDS).map(key => [key, 0]));
  for (const article of articles) {
    const haystack = normalize(`${article.title || ''} ${article.socialimage || ''}`);
    for (const [theme, words] of Object.entries(THEME_WORDS)) {
      for (const word of words) {
        if (haystack.includes(word)) scores[theme] += 1;
      }
    }
  }
  return Object.entries(scores)
    .filter(([, score]) => score > 0)
    .map(([theme, score]) => ({ theme, score }))
    .sort((a, b) => b.score - a.score);
}

function findLocation(term) {
  const q = term.toLowerCase();
  return LOCATIONS.find(loc => loc.city.toLowerCase() === q || `${loc.city}, ${loc.country}`.toLowerCase() === q);
}

function readableFocus(focus) {
  return focus.map(capitalize).join(', ');
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalize(value) {
  return String(value || '').toLowerCase();
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatSeenDate(raw) {
  if (!raw || raw.length < 8) return 'Recent';
  const y = raw.slice(0, 4);
  const m = raw.slice(4, 6);
  const d = raw.slice(6, 8);
  return `${y}-${m}-${d}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

init();
