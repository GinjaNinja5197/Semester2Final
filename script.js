const ROUND_COUNT = 5;
const ROUND_SECONDS = 180;
const MAX_SCORE = 5000;
const PERFECT_DISTANCE_KM = 0.15;
const RECENT_LOCATION_MEMORY = 12;
const GOOGLE_MAPS_API_KEY = (window.WORLDPINR_GOOGLE_MAPS_API_KEY || "").trim();

const locations = [
  {
    name: "Eiffel Tower, Paris, France",
    lat: 48.85837,
    lng: 2.29448,
    heading: 18,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=3600&q=96",
    clue: "Dense European city, ornate stone buildings, and a very recognizable iron landmark.",
    reveal: "The correct location was beside the Eiffel Tower in Paris.",
  },
  {
    name: "Times Square, New York City, USA",
    lat: 40.7589,
    lng: -73.9851,
    heading: -60,
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=3600&q=96",
    clue: "Huge screens, Broadway energy, yellow taxis, and a grid of wide Manhattan streets.",
    reveal: "The correct location was Times Square in New York City.",
  },
  {
    name: "Shibuya Crossing, Tokyo, Japan",
    lat: 35.6595,
    lng: 139.7005,
    heading: 42,
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=3600&q=96",
    clue: "Neon signs, dense pedestrian crossings, and Japanese urban architecture.",
    reveal: "The correct location was Shibuya Crossing in Tokyo.",
  },
  {
    name: "Sydney Opera House, Sydney, Australia",
    lat: -33.8568,
    lng: 151.2153,
    heading: 112,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=3600&q=96",
    clue: "Harbour water, a famous bridge nearby, and white sail-like architecture.",
    reveal: "The correct location was Sydney Opera House in Australia.",
  },
  {
    name: "Christ the Redeemer, Rio de Janeiro, Brazil",
    lat: -22.9519,
    lng: -43.2105,
    heading: -34,
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=3600&q=96",
    clue: "Tropical coastline, dramatic mountains, and a world-famous statue above the city.",
    reveal: "The correct location was Christ the Redeemer in Rio de Janeiro.",
  },
  {
    name: "Pyramids of Giza, Egypt",
    lat: 29.9792,
    lng: 31.1342,
    heading: 87,
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=3600&q=96",
    clue: "Dry desert light, sandy ground, and ancient triangular silhouettes.",
    reveal: "The correct location was the Pyramids of Giza in Egypt.",
  },
  {
    name: "Blue Lagoon, Iceland",
    lat: 63.8804,
    lng: -22.4495,
    heading: 16,
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=3600&q=96",
    clue: "Nordic volcanic terrain, cool light, and geothermal-looking water.",
    reveal: "The correct location was near Iceland's Blue Lagoon.",
  },
  {
    name: "Table Mountain, Cape Town, South Africa",
    lat: -33.9628,
    lng: 18.4098,
    heading: 160,
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=3600&q=96",
    clue: "A coastal city sits below a massive flat-topped mountain.",
    reveal: "The correct location was Table Mountain in Cape Town.",
  },
  {
    name: "Hagia Sophia, Istanbul, Turkiye",
    lat: 41.0086,
    lng: 28.9802,
    heading: -95,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=3600&q=96",
    clue: "Domes, minarets, ferries, and a city that bridges Europe and Asia.",
    reveal: "The correct location was Hagia Sophia in Istanbul.",
  },
  {
    name: "Jemaa el-Fnaa, Marrakesh, Morocco",
    lat: 31.6258,
    lng: -7.9891,
    heading: 70,
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=3600&q=96",
    clue: "Red walls, market energy, warm light, and North African streetscape details.",
    reveal: "The correct location was Jemaa el-Fnaa in Marrakesh.",
  },
  {
    name: "Marina Bay, Singapore",
    lat: 1.2834,
    lng: 103.8607,
    heading: -20,
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=3600&q=96",
    clue: "Ultra-modern tropical skyline, waterfront promenades, and futuristic towers.",
    reveal: "The correct location was Marina Bay in Singapore.",
  },
  {
    name: "Tower Bridge, London, United Kingdom",
    lat: 51.5055,
    lng: -0.0754,
    heading: 145,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=3600&q=96",
    clue: "A historic bascule bridge, left-side traffic clues, and the River Thames.",
    reveal: "The correct location was Tower Bridge in London.",
  },
  {
    name: "Machu Picchu, Peru",
    lat: -13.1631,
    lng: -72.545,
    heading: 24,
    streetViewRadius: 600,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=3600&q=96",
    clue: "Steep green Andes, ancient stone terraces, and misty mountain ridgelines.",
    reveal: "The correct location was Machu Picchu in Peru.",
  },
  {
    name: "Lake Louise, Banff, Canada",
    lat: 51.4254,
    lng: -116.1773,
    heading: 190,
    streetViewRadius: 400,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=3600&q=96",
    clue: "Turquoise alpine water, tall conifers, and snow-dusted Canadian Rockies.",
    reveal: "The correct location was Lake Louise in Banff, Canada.",
  },
  {
    name: "Monument Valley, Arizona, USA",
    lat: 36.998,
    lng: -110.0985,
    heading: 78,
    streetViewRadius: 900,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=3600&q=96",
    clue: "Red desert road, huge sandstone buttes, and wide open American Southwest sky.",
    reveal: "The correct location was Monument Valley in the American Southwest.",
  },
  {
    name: "Chichen Itza, Yucatan, Mexico",
    lat: 20.6843,
    lng: -88.5678,
    heading: 142,
    streetViewRadius: 500,
    image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=3600&q=96",
    clue: "Limestone plains, Mayan ruins, and a stepped pyramid in tropical Mexico.",
    reveal: "The correct location was Chichen Itza in Mexico.",
  },
  {
    name: "Salar de Uyuni, Bolivia",
    lat: -20.1338,
    lng: -67.4891,
    heading: -15,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1547631950-5f251df1b6bf?auto=format&fit=crop&w=3600&q=96",
    clue: "A blindingly flat salt landscape, distant mountains, and high-altitude emptiness.",
    reveal: "The correct location was Salar de Uyuni in Bolivia.",
  },
  {
    name: "Dubrovnik Old Town, Croatia",
    lat: 42.641,
    lng: 18.109,
    heading: -70,
    image: "https://images.unsplash.com/photo-1555990538-c48dbe126342?auto=format&fit=crop&w=3600&q=96",
    clue: "Stone walls, orange rooftops, limestone streets, and Adriatic coastal light.",
    reveal: "The correct location was Dubrovnik Old Town in Croatia.",
  },
  {
    name: "Oia, Santorini, Greece",
    lat: 36.4618,
    lng: 25.3753,
    heading: 210,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=3600&q=96",
    clue: "Whitewashed cliffside buildings, blue domes, and deep Aegean water.",
    reveal: "The correct location was Oia on Santorini, Greece.",
  },
  {
    name: "Reine, Lofoten, Norway",
    lat: 67.932,
    lng: 13.089,
    heading: 130,
    streetViewRadius: 700,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=3600&q=96",
    clue: "Arctic fishing village scenery, sharp mountains, fjords, and red cabins.",
    reveal: "The correct location was Reine in Norway's Lofoten Islands.",
  },
  {
    name: "Petra, Jordan",
    lat: 30.3285,
    lng: 35.4444,
    heading: 35,
    streetViewRadius: 800,
    image: "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=3600&q=96",
    clue: "Rose-colored rock walls, desert stone paths, and ancient carved facades.",
    reveal: "The correct location was Petra in Jordan.",
  },
  {
    name: "Angkor Wat, Siem Reap, Cambodia",
    lat: 13.4125,
    lng: 103.867,
    heading: 96,
    streetViewRadius: 700,
    image: "https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=3600&q=96",
    clue: "Tropical greenery, temple towers, moats, and ancient Khmer stonework.",
    reveal: "The correct location was Angkor Wat in Cambodia.",
  },
  {
    name: "Victoria Harbour, Hong Kong",
    lat: 22.293,
    lng: 114.169,
    heading: 14,
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=3600&q=96",
    clue: "Dense high-rise skyline, harbor water, ferries, and subtropical urban hills.",
    reveal: "The correct location was Victoria Harbour in Hong Kong.",
  },
  {
    name: "Queenstown, New Zealand",
    lat: -45.0312,
    lng: 168.6626,
    heading: 250,
    streetViewRadius: 500,
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=3600&q=96",
    clue: "A lakeside adventure town surrounded by steep Southern Alps scenery.",
    reveal: "The correct location was Queenstown on New Zealand's South Island.",
  },
  {
    name: "Uluru, Northern Territory, Australia",
    lat: -25.3444,
    lng: 131.0369,
    heading: 108,
    streetViewRadius: 1000,
    image: "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=3600&q=96",
    clue: "Red earth, sparse desert vegetation, and a giant sandstone monolith.",
    reveal: "The correct location was Uluru in Australia's Northern Territory.",
  },
  {
    name: "Avenue of the Baobabs, Madagascar",
    lat: -20.2508,
    lng: 44.4197,
    heading: 5,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=3600&q=96",
    clue: "Dusty road, dry tropical light, and enormous bottle-shaped baobab trees.",
    reveal: "The correct location was the Avenue of the Baobabs in Madagascar.",
  },
  {
    name: "Sossusvlei, Namibia",
    lat: -24.7392,
    lng: 15.2887,
    heading: 64,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=3600&q=96",
    clue: "Huge orange dunes, dry pans, and a stark Namib Desert landscape.",
    reveal: "The correct location was Sossusvlei in Namibia.",
  },
  {
    name: "Maasai Mara, Kenya",
    lat: -1.4061,
    lng: 35.0088,
    heading: 88,
    streetViewRadius: 1500,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=3600&q=96",
    clue: "Open savanna, acacia trees, dirt tracks, and East African grassland.",
    reveal: "The correct location was in Kenya's Maasai Mara region.",
  },
  {
    name: "Chefchaouen, Morocco",
    lat: 35.1714,
    lng: -5.2697,
    heading: 120,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=3600&q=96",
    clue: "Blue-painted alleys, mountain-town streets, and North African architecture.",
    reveal: "The correct location was Chefchaouen in Morocco.",
  },
  {
    name: "Cusco, Peru",
    lat: -13.5319,
    lng: -71.9675,
    heading: -25,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=3600&q=96",
    clue: "High-altitude Andean city, colonial plazas, stonework, and red tile roofs.",
    reveal: "The correct location was Cusco in Peru.",
  },
  {
    name: "Chiang Mai Old City, Thailand",
    lat: 18.7883,
    lng: 98.9853,
    heading: 70,
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=3600&q=96",
    clue: "Tropical streets, temple roofs, scooters, and northern Thai city details.",
    reveal: "The correct location was Chiang Mai in Thailand.",
  },
  {
    name: "Valparaiso, Chile",
    lat: -33.0458,
    lng: -71.6197,
    heading: 170,
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?auto=format&fit=crop&w=3600&q=96",
    clue: "Colorful hillside houses, steep streets, murals, and Pacific port-city clues.",
    reveal: "The correct location was Valparaiso in Chile.",
  },
  {
    name: "Zanzibar Stone Town, Tanzania",
    lat: -6.1622,
    lng: 39.1921,
    heading: 44,
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=3600&q=96",
    clue: "Narrow lanes, coral-stone buildings, carved doors, and Indian Ocean island atmosphere.",
    reveal: "The correct location was Stone Town in Zanzibar, Tanzania.",
  },
];

const state = {
  usingGoogle: false,
  map: null,
  streetView: null,
  streetViewService: null,
  guessMarker: null,
  actualMarker: null,
  distanceLine: null,
  selectedGuess: null,
  rounds: [],
  roundIndex: 0,
  roundResults: [],
  score: 0,
  locked: false,
  timerId: null,
  secondsLeft: ROUND_SECONDS,
  yaw: 0,
  zoom: 1,
  dragging: false,
  dragStartX: 0,
  dragStartYaw: 0,
  sceneMode: "fallback",
  gameStarted: false,
  googleRuntimeLoaded: false,
};

const els = {
  panorama: document.querySelector("#panorama"),
  googleScene: document.querySelector("#googleScene"),
  embedScene: document.querySelector("#embedScene"),
  sceneImage: document.querySelector("#sceneImage"),
  sceneProvider: document.querySelector("#sceneProvider"),
  roundLabel: document.querySelector("#roundLabel"),
  scoreLabel: document.querySelector("#scoreLabel"),
  bestLabel: document.querySelector("#bestLabel"),
  timerLabel: document.querySelector("#timerLabel"),
  clueText: document.querySelector("#clueText"),
  hintButton: document.querySelector("#hintButton"),
  compassNeedle: document.querySelector("#compassNeedle"),
  mapPanel: document.querySelector("#mapPanel"),
  mapStatus: document.querySelector("#mapStatus"),
  expandMap: document.querySelector("#expandMap"),
  resetMap: document.querySelector("#resetMap"),
  clearGuess: document.querySelector("#clearGuess"),
  guessButton: document.querySelector("#guessButton"),
  resultPanel: document.querySelector("#resultPanel"),
  resultTitle: document.querySelector("#resultTitle"),
  resultDetails: document.querySelector("#resultDetails"),
  scoreMeterFill: document.querySelector("#scoreMeterFill"),
  nextButton: document.querySelector("#nextButton"),
  startModal: document.querySelector("#startModal"),
  startButton: document.querySelector("#startButton"),
  finalModal: document.querySelector("#finalModal"),
  finalSummary: document.querySelector("#finalSummary"),
  roundBreakdown: document.querySelector("#roundBreakdown"),
  playAgain: document.querySelector("#playAgain"),
  lookLeft: document.querySelector("#lookLeft"),
  lookRight: document.querySelector("#lookRight"),
  zoomIn: document.querySelector("#zoomIn"),
  zoomOut: document.querySelector("#zoomOut"),
  resetView: document.querySelector("#resetView"),
  map: document.querySelector("#map"),
};

function init() {
  bindControls();
  initGuessMap();
  loadGoogleRuntime();
  resetGame(false);
}

function bindControls() {
  els.startButton.addEventListener("click", startGame);
  els.playAgain.addEventListener("click", () => resetGame(true));
  els.guessButton.addEventListener("click", (event) => {
    event.stopPropagation();
    submitGuess();
  });
  els.clearGuess.addEventListener("click", (event) => {
    event.stopPropagation();
    clearGuess();
  });
  els.nextButton.addEventListener("click", nextRound);
  els.hintButton.addEventListener("click", revealHint);
  els.expandMap.addEventListener("click", toggleMapSize);
  els.resetMap.addEventListener("click", resetGuessingMap);
  els.mapPanel.addEventListener("transitionend", refreshGoogleMap);
  els.lookLeft.addEventListener("click", () => rotate(-28));
  els.lookRight.addEventListener("click", () => rotate(28));
  els.zoomIn.addEventListener("click", () => setZoom(state.zoom + 0.15));
  els.zoomOut.addEventListener("click", () => setZoom(state.zoom - 0.15));
  els.resetView.addEventListener("click", resetView);

  els.panorama.addEventListener("pointerdown", startDrag);
  els.panorama.addEventListener("pointermove", dragView);
  els.panorama.addEventListener("pointerup", stopDrag);
  els.panorama.addEventListener("pointercancel", stopDrag);
  els.panorama.addEventListener("wheel", zoomWithWheel, { passive: false });
  els.panorama.addEventListener("keydown", onViewerKeydown);
  document.addEventListener("keydown", onGlobalKeydown);
  window.addEventListener("resize", refreshGoogleMap);
}

function initGuessMap() {
  if (GOOGLE_MAPS_API_KEY) {
    els.map.innerHTML = '<div class="map-loading">Loading Google Maps...</div>';
    return;
  }

  state.usingGoogle = false;
  els.map.innerHTML = `
    <button class="fallback-map-layer active" type="button" aria-label="Fallback world guessing map">
      <span class="fallback-map-land north-america"></span>
      <span class="fallback-map-land south-america"></span>
      <span class="fallback-map-land europe-africa"></span>
      <span class="fallback-map-land asia"></span>
      <span class="fallback-map-land australia"></span>
      <span class="fallback-map-label label-na">North America</span>
      <span class="fallback-map-label label-eu">Europe</span>
      <span class="fallback-map-label label-as">Asia</span>
      <span id="fallbackGuessPin" class="fallback-pin guess"></span>
      <span id="fallbackActualPin" class="fallback-pin actual"></span>
      <span id="fallbackDistanceLine" class="fallback-line"></span>
    </button>`;
  els.map.querySelector(".fallback-map-layer").addEventListener("click", placeFallbackGuess);
  els.mapStatus.textContent = "Add a Google API key for the real map, or click this fallback map";
}

function loadGoogleRuntime() {
  if (!GOOGLE_MAPS_API_KEY) {
    loadEmbedStreetViewForRound();
    return;
  }

  window.gm_authFailure = () => {
    state.usingGoogle = false;
    initGuessMap();
    loadEmbedStreetViewForRound();
    els.mapStatus.textContent = "Google API key rejected; using fallback map";
  };

  window.initWorldPinrGoogle = () => {
    const wasStarted = state.gameStarted;
    const secondsLeft = state.secondsLeft;
    state.usingGoogle = true;
    state.googleRuntimeLoaded = true;
    initGoogleGuessMap();
    initGoogleStreetView();
    if (state.rounds.length) {
      loadRound();
      if (wasStarted) {
        state.gameStarted = true;
        state.secondsLeft = secondsLeft;
        updateTimer();
      }
    }
  };

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
    GOOGLE_MAPS_API_KEY
  )}&callback=initWorldPinrGoogle&v=weekly`;
  script.async = true;
  script.defer = true;
  script.onerror = () => {
    state.usingGoogle = false;
    initGuessMap();
    loadEmbedStreetViewForRound();
    els.mapStatus.textContent = "Google Maps failed to load; using fallback map";
  };
  document.head.appendChild(script);
}

function initGoogleGuessMap() {
  state.map = new google.maps.Map(els.map, {
    center: { lat: 18, lng: 0 },
    zoom: 2,
    minZoom: 2,
    maxZoom: 18,
    mapTypeId: "roadmap",
    clickableIcons: false,
    fullscreenControl: false,
    gestureHandling: "greedy",
    mapTypeControl: true,
    streetViewControl: false,
    zoomControl: true,
    restriction: {
      latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
      strictBounds: false,
    },
  });
  state.map.addListener("click", (event) => {
    if (state.locked) return;
    setGuess({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  });
  refreshGoogleMap();
}

function initGoogleStreetView() {
  state.streetViewService = new google.maps.StreetViewService();
  state.streetView = new google.maps.StreetViewPanorama(els.googleScene, {
    addressControl: false,
    clickToGo: true,
    disableDefaultUI: false,
    enableCloseButton: false,
    fullscreenControl: false,
    linksControl: true,
    motionTracking: false,
    panControl: true,
    showRoadLabels: false,
    zoomControl: true,
  });
}

function startGame() {
  state.gameStarted = true;
  els.startModal.classList.add("hidden");
  startTimer();
  refreshGoogleMap();
}

function resetGame(shouldStartTimer) {
  stopTimer();
  state.gameStarted = shouldStartTimer;
  state.rounds = chooseDiverseRounds(locations, ROUND_COUNT);
  rememberRecentLocations(state.rounds);
  state.roundIndex = 0;
  state.score = 0;
  state.roundResults = [];
  els.finalModal.classList.add("hidden");
  updateHud();
  loadRound();
  if (shouldStartTimer) startTimer();
}

function loadRound() {
  clearMapRound();
  const location = currentLocation();
  if (!location) return;

  state.selectedGuess = null;
  state.locked = false;
  state.secondsLeft = ROUND_SECONDS;
  state.yaw = location.heading + Math.round(Math.random() * 60 - 30);
  state.zoom = 1;

  els.panorama.classList.add("loading");
  els.sceneImage.src = location.image;
  els.sceneImage.alt = `Fallback scene for round ${state.roundIndex + 1}`;
  els.clueText.textContent = "Explore the scene, then drop a pin on the map.";
  els.hintButton.disabled = false;
  els.guessButton.disabled = true;
  els.guessButton.textContent = "Make guess";
  els.clearGuess.disabled = true;
  els.mapStatus.textContent = state.usingGoogle ? "Click the Google map to drop a pin" : "Click the fallback map to drop a pin";
  els.nextButton.textContent = state.roundIndex === ROUND_COUNT - 1 ? "Final score" : "Next round";
  els.resultPanel.classList.add("hidden");
  els.mapPanel.classList.remove("expanded");
  els.expandMap.setAttribute("aria-expanded", "false");
  els.expandMap.textContent = "Expand";
  resetGuessingMap();
  loadSceneForRound();
  updateSceneTransform();
  updateHud();

  if (els.sceneImage.complete) hideSceneLoader();
  else {
    els.sceneImage.addEventListener("load", hideSceneLoader, { once: true });
    els.sceneImage.addEventListener("error", hideSceneLoader, { once: true });
  }
}

function loadSceneForRound() {
  if (state.usingGoogle && state.streetViewService) {
    loadGoogleStreetViewForRound();
  } else {
    loadEmbedStreetViewForRound();
  }
}

function loadGoogleStreetViewForRound() {
  const location = currentLocation();
  const position = { lat: location.lat, lng: location.lng };
  state.streetViewService.getPanorama(
    {
      location: position,
      radius: location.streetViewRadius || 250,
      preference: google.maps.StreetViewPreference.NEAREST,
      source: google.maps.StreetViewSource.OUTDOOR,
    },
    (data, status) => {
      if (status !== google.maps.StreetViewStatus.OK || !data.location) {
        loadEmbedStreetViewForRound();
        return;
      }

      state.sceneMode = "google";
      els.googleScene.classList.add("active");
      els.googleScene.setAttribute("aria-hidden", "false");
      els.embedScene.classList.remove("active");
      els.embedScene.removeAttribute("src");
      els.sceneImage.classList.add("hidden-scene");
      els.panorama.classList.add("using-google");
      els.sceneProvider.textContent = "Google Street View API";
      hideSceneLoader();
      state.streetView.setPano(data.location.pano);
      state.streetView.setPov({ heading: normalizedHeading(location.heading), pitch: 0 });
      state.streetView.setZoom(1);
      state.streetView.setVisible(true);
      window.setTimeout(refreshGoogleStreetView, 120);
    }
  );
}

function loadEmbedStreetViewForRound() {
  const location = currentLocation();
  if (!location) return;
  const url = new URL("https://www.google.com/maps");
  url.searchParams.set("layer", "c");
  url.searchParams.set("cbll", `${location.lat},${location.lng}`);
  url.searchParams.set("cbp", `12,${normalizedHeading(state.yaw)},0,0,0`);
  url.searchParams.set("output", "svembed");

  state.sceneMode = "embed";
  if (state.streetView) state.streetView.setVisible(false);
  els.googleScene.classList.remove("active");
  els.googleScene.setAttribute("aria-hidden", "true");
  els.embedScene.src = url.toString();
  els.embedScene.classList.add("active");
  els.sceneImage.classList.add("hidden-scene");
  els.panorama.classList.add("using-google");
  els.sceneProvider.textContent = "Google Street View embed";
  window.setTimeout(hideSceneLoader, 900);
}

function placeFallbackGuess(event) {
  if (state.locked || state.usingGoogle) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
  const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
  const lat = 85 - y * 170;
  const lng = x * 360 - 180;
  setGuess({ lat, lng });
}

function setGuess(latlng) {
  if (state.locked) return;
  state.selectedGuess = normalizeLatLng(latlng);
  if (state.usingGoogle) {
    if (!state.guessMarker) {
      state.guessMarker = new google.maps.Marker({
        map: state.map,
        title: "Your guess",
        draggable: true,
      });
      state.guessMarker.addListener("dragend", () => {
        const position = state.guessMarker.getPosition();
        setGuess({ lat: position.lat(), lng: position.lng() });
      });
    }
    state.guessMarker.setPosition(state.selectedGuess);
  } else {
    moveFallbackPin("fallbackGuessPin", state.selectedGuess);
  }
  els.guessButton.disabled = false;
  els.clearGuess.disabled = false;
  els.mapStatus.textContent = `Pin placed: ${formatLatLng(state.selectedGuess)}`;
}

function submitGuess() {
  if (state.locked || els.guessButton.disabled) return;
  els.guessButton.disabled = true;
  els.guessButton.textContent = "Scoring...";
  els.mapStatus.textContent = "Scoring your guess...";
  lockGuess(false);
}

function clearGuess() {
  if (state.locked) return;
  if (state.guessMarker) {
    state.guessMarker.setMap(null);
    state.guessMarker = null;
  }
  hideFallbackResult();
  state.selectedGuess = null;
  els.guessButton.disabled = true;
  els.guessButton.textContent = "Make guess";
  els.clearGuess.disabled = true;
  els.mapStatus.textContent = state.usingGoogle ? "Click the Google map to drop a pin" : "Click the fallback map to drop a pin";
}

function lockGuess(timedOut) {
  if (state.locked) return;
  if (!state.selectedGuess && !timedOut) {
    els.guessButton.disabled = false;
    els.guessButton.textContent = "Make guess";
    els.mapStatus.textContent = "Drop a pin before guessing";
    return;
  }
  if (!state.selectedGuess) state.selectedGuess = { lat: 0, lng: 0 };

  state.locked = true;
  stopTimer();
  const location = currentLocation();
  const actualLatLng = { lat: location.lat, lng: location.lng };
  const distance = haversineKm(state.selectedGuess.lat, state.selectedGuess.lng, location.lat, location.lng);
  const roundScore = timedOut ? 0 : calculateScore(distance);
  state.score += roundScore;

  state.roundResults.push({ name: location.name, distance, score: roundScore, timedOut });
  els.resultTitle.textContent = timedOut ? "Time ran out" : `${roundScore.toLocaleString()} points`;
  els.resultDetails.innerHTML = `${location.reveal}<br>You were <strong>${formatDistance(distance)}</strong> away.`;
  els.scoreMeterFill.style.width = `${Math.round((roundScore / MAX_SCORE) * 100)}%`;
  els.resultPanel.classList.remove("hidden");
  els.guessButton.disabled = true;
  els.guessButton.textContent = "Make guess";
  els.clearGuess.disabled = true;
  updateHud();

  try {
    if (state.usingGoogle && state.map) {
      state.actualMarker = new google.maps.Marker({
        map: state.map,
        position: actualLatLng,
        title: location.name,
        label: "A",
      });
      state.distanceLine = new google.maps.Polyline({
        map: state.map,
        path: [state.selectedGuess, actualLatLng],
        strokeColor: "#8df45e",
        strokeOpacity: 0.9,
        strokeWeight: 4,
      });
    } else {
      moveFallbackPin("fallbackActualPin", actualLatLng);
      drawFallbackLine(state.selectedGuess, actualLatLng);
    }

    state.mapPanel.classList.add("expanded");
    els.expandMap.setAttribute("aria-expanded", "true");
    els.expandMap.textContent = "Shrink";
    window.setTimeout(() => fitResultBounds(actualLatLng), 220);
    els.mapStatus.textContent = "A marker marks the real location";
  } catch (error) {
    els.mapStatus.textContent = "Scored; map reveal failed, but you can continue";
    console.error(error);
  }
}

function nextRound() {
  if (state.roundIndex === ROUND_COUNT - 1) {
    finishGame();
    return;
  }
  state.roundIndex += 1;
  loadRound();
  startTimer();
}

function finishGame() {
  stopTimer();
  const best = Number(localStorage.getItem("worldpinrBest") || 0);
  if (state.score > best) localStorage.setItem("worldpinrBest", String(state.score));
  updateHud();
  els.finalSummary.textContent = `You scored ${state.score.toLocaleString()} / ${(ROUND_COUNT * MAX_SCORE).toLocaleString()} points.`;
  els.roundBreakdown.innerHTML = state.roundResults
    .map(
      (round, index) => `
        <div class="breakdown-row">
          <span>Round ${index + 1}: ${round.name}</span>
          <strong>${round.score.toLocaleString()} pts &middot; ${round.timedOut ? "timed out" : formatDistance(round.distance)}</strong>
        </div>`
    )
    .join("");
  els.finalModal.classList.remove("hidden");
}

function revealHint() {
  els.clueText.textContent = currentLocation().clue;
  els.hintButton.disabled = true;
}

function resetGuessingMap() {
  if (state.usingGoogle && state.map) {
    state.map.setCenter({ lat: 18, lng: 0 });
    state.map.setZoom(2);
    refreshGoogleMap();
  }
}

function clearMapRound() {
  [state.guessMarker, state.actualMarker].forEach((marker) => {
    if (marker) marker.setMap(null);
  });
  if (state.distanceLine) state.distanceLine.setMap(null);
  state.guessMarker = null;
  state.actualMarker = null;
  state.distanceLine = null;
  hideFallbackResult();
}

function fitResultBounds(actualLatLng) {
  if (state.usingGoogle && state.map) {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(state.selectedGuess);
    bounds.extend(actualLatLng);
    state.map.fitBounds(bounds, 64);
    refreshGoogleMap();
  }
}

function toggleMapSize() {
  const expanded = els.mapPanel.classList.toggle("expanded");
  els.expandMap.setAttribute("aria-expanded", String(expanded));
  els.expandMap.textContent = expanded ? "Shrink" : "Expand";
  window.setTimeout(refreshGoogleMap, 180);
}

function refreshGoogleMap() {
  if (state.usingGoogle && state.map) {
    google.maps.event.trigger(state.map, "resize");
  }
}

function refreshGoogleStreetView() {
  if (state.usingGoogle && state.streetView) {
    google.maps.event.trigger(state.streetView, "resize");
  }
}

function hideSceneLoader() {
  els.panorama.classList.remove("loading");
}

function startTimer() {
  stopTimer();
  state.secondsLeft = ROUND_SECONDS;
  updateTimer();
  state.timerId = window.setInterval(() => {
    state.secondsLeft -= 1;
    updateTimer();
    if (state.secondsLeft <= 0) lockGuess(true);
  }, 1000);
}

function stopTimer() {
  if (state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;
}

function updateTimer() {
  const minutes = Math.floor(state.secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (state.secondsLeft % 60).toString().padStart(2, "0");
  els.timerLabel.textContent = `${minutes}:${seconds}`;
  els.timerLabel.closest(".timer").classList.toggle("warning", state.secondsLeft <= 30);
}

function startDrag(event) {
  if (state.sceneMode !== "fallback") return;
  state.dragging = true;
  state.dragStartX = event.clientX;
  state.dragStartYaw = state.yaw;
  els.panorama.setPointerCapture(event.pointerId);
}

function dragView(event) {
  if (!state.dragging || state.sceneMode !== "fallback") return;
  state.yaw = wrapYaw(state.dragStartYaw + (event.clientX - state.dragStartX) * 0.24);
  updateSceneTransform();
}

function stopDrag() {
  state.dragging = false;
}

function zoomWithWheel(event) {
  if (state.sceneMode !== "fallback") return;
  event.preventDefault();
  setZoom(state.zoom + (event.deltaY > 0 ? -0.08 : 0.08));
}

function onViewerKeydown(event) {
  if (event.key === "ArrowLeft") rotate(-24);
  if (event.key === "ArrowRight") rotate(24);
  if (event.key === "ArrowUp" || event.key === "+" || event.key === "=") setZoom(state.zoom + 0.1);
  if (event.key === "ArrowDown" || event.key === "-" || event.key === "_") setZoom(state.zoom - 0.1);
}

function onGlobalKeydown(event) {
  const tagName = document.activeElement?.tagName;
  if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") return;
  if (event.key.toLowerCase() === "m") toggleMapSize();
  if (event.key === "Enter" && !els.guessButton.disabled) submitGuess();
  if (event.key === "Escape" && els.mapPanel.classList.contains("expanded") && !state.locked) toggleMapSize();
}

function rotate(amount) {
  if (state.sceneMode === "google" && state.streetView) {
    const pov = state.streetView.getPov();
    state.streetView.setPov({ ...pov, heading: normalizedHeading(pov.heading + amount) });
    els.compassNeedle.style.transform = `rotate(${normalizedHeading(pov.heading + amount)}deg)`;
    return;
  }
  state.yaw = wrapYaw(state.yaw + amount);
  updateSceneTransform();
}

function setZoom(value) {
  if (state.sceneMode === "google" && state.streetView) {
    state.zoom = clamp(value, 0, 3);
    state.streetView.setZoom(state.zoom);
    return;
  }
  state.zoom = clamp(value, 1, 1.8);
  updateSceneTransform();
}

function resetView() {
  const location = currentLocation();
  if (state.sceneMode === "google" && state.streetView) {
    state.streetView.setPov({ heading: normalizedHeading(location.heading), pitch: 0 });
    state.streetView.setZoom(1);
    els.compassNeedle.style.transform = `rotate(${normalizedHeading(location.heading)}deg)`;
    return;
  }
  state.yaw = location.heading;
  updateSceneTransform();
}

function updateSceneTransform() {
  els.sceneImage.style.transform = `translate3d(calc(-50% + ${state.yaw}px), -50%, 0) scale(${state.zoom})`;
  els.compassNeedle.style.transform = `rotate(${state.yaw / 2}deg)`;
}

function updateHud() {
  els.roundLabel.textContent = `${state.roundIndex + 1} / ${ROUND_COUNT}`;
  els.scoreLabel.textContent = state.score.toLocaleString();
  els.bestLabel.textContent = Number(localStorage.getItem("worldpinrBest") || 0).toLocaleString();
  updateTimer();
}

function currentLocation() {
  return state.rounds[state.roundIndex];
}

function chooseDiverseRounds(allLocations, count) {
  const recentNames = getRecentLocationNames();
  const freshLocations = allLocations.filter((location) => !recentNames.has(location.name));
  const candidatePool = freshLocations.length >= count ? freshLocations : allLocations;
  const shuffledLocations = shuffle(candidatePool);
  const regionBuckets = shuffledLocations.reduce((buckets, location) => {
    const region = getLocationRegion(location);
    if (!buckets.has(region)) buckets.set(region, []);
    buckets.get(region).push(location);
    return buckets;
  }, new Map());

  const selected = [];
  shuffle([...regionBuckets.keys()]).forEach((region) => {
    if (selected.length < count) selected.push(regionBuckets.get(region).shift());
  });

  shuffledLocations.forEach((location) => {
    if (selected.length < count && !selected.includes(location)) selected.push(location);
  });

  return selected.slice(0, count);
}

function getLocationRegion(location) {
  if (location.lat < -10 && location.lng >= 110) return "Oceania";
  if (location.lng >= -170 && location.lng <= -50 && location.lat >= 8) return "North America";
  if (location.lng >= -90 && location.lng <= -30 && location.lat < 15) return "South America";
  if (location.lng >= -25 && location.lng <= 45 && location.lat >= 35) return "Europe";
  if (location.lng >= -20 && location.lng <= 55 && location.lat < 35 && location.lat > -40) return "Africa";
  if (location.lng >= 45 && location.lng <= 180 && location.lat > -10) return "Asia";
  return "Other";
}

function getRecentLocationNames() {
  try {
    return new Set(JSON.parse(localStorage.getItem("worldpinrRecentLocations") || "[]"));
  } catch {
    return new Set();
  }
}

function rememberRecentLocations(rounds) {
  try {
    const recent = [...getRecentLocationNames()];
    const names = [...rounds.map((location) => location.name), ...recent].slice(0, RECENT_LOCATION_MEMORY);
    localStorage.setItem("worldpinrRecentLocations", JSON.stringify([...new Set(names)]));
  } catch {
    // Private browsing or storage restrictions should not stop the game.
  }
}

function moveFallbackPin(id, latlng) {
  const pin = document.querySelector(`#${id}`);
  if (!pin) return;
  const point = latLngToFallbackPoint(latlng);
  pin.style.left = `${point.x}%`;
  pin.style.top = `${point.y}%`;
  pin.classList.add("visible");
}

function drawFallbackLine(start, end) {
  const line = document.querySelector("#fallbackDistanceLine");
  if (!line) return;
  const a = latLngToFallbackPoint(start);
  const b = latLngToFallbackPoint(end);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  line.style.left = `${a.x}%`;
  line.style.top = `${a.y}%`;
  line.style.width = `${length}%`;
  line.style.transform = `rotate(${angle}deg)`;
  line.classList.add("visible");
}

function hideFallbackResult() {
  ["fallbackGuessPin", "fallbackActualPin", "fallbackDistanceLine"].forEach((id) => {
    const el = document.querySelector(`#${id}`);
    if (el) el.classList.remove("visible");
  });
}

function latLngToFallbackPoint(latlng) {
  return {
    x: ((normalizeLng(latlng.lng) + 180) / 360) * 100,
    y: ((85 - clamp(latlng.lat, -85, 85)) / 170) * 100,
  };
}

function normalizeLatLng(latlng) {
  return {
    lat: clamp(Number(latlng.lat), -85, 85),
    lng: normalizeLng(Number(latlng.lng)),
  };
}

function normalizeLng(lng) {
  return ((((lng + 180) % 360) + 360) % 360) - 180;
}

function calculateScore(distanceKm) {
  if (distanceKm <= PERFECT_DISTANCE_KM) return MAX_SCORE;
  return Math.max(0, Math.round(MAX_SCORE * Math.exp(-distanceKm / 1700)));
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const radiusKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return radiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(distanceKm) {
  if (distanceKm < 1) return `${Math.round(distanceKm * 1000).toLocaleString()} m`;
  return `${Math.round(distanceKm).toLocaleString()} km`;
}

function formatLatLng(latlng) {
  const lat = Math.abs(latlng.lat).toFixed(2);
  const lng = Math.abs(latlng.lng).toFixed(2);
  return `${lat}${latlng.lat >= 0 ? "N" : "S"}, ${lng}${latlng.lng >= 0 ? "E" : "W"}`;
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function normalizedHeading(value) {
  return ((value % 360) + 360) % 360;
}

function wrapYaw(value) {
  if (value > 360) return value - 720;
  if (value < -360) return value + 720;
  return value;
}

function shuffle(items) {
  return [...items]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

window.addEventListener("load", init);
