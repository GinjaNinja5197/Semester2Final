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
  {
    name: "Colosseum, Rome, Italy",
    lat: 41.8902,
    lng: 12.4922,
    heading: 115,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=3600&q=96",
    clue: "Ancient stone arches, warm Mediterranean light, and busy streets around a Roman landmark.",
    reveal: "The correct location was the Colosseum in Rome.",
  },
  {
    name: "Sagrada Familia, Barcelona, Spain",
    lat: 41.4036,
    lng: 2.1744,
    heading: -30,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=3600&q=96",
    clue: "Tall ornate basilica towers, Catalan city blocks, and dense urban avenues.",
    reveal: "The correct location was Sagrada Familia in Barcelona.",
  },
  {
    name: "Brandenburg Gate, Berlin, Germany",
    lat: 52.5163,
    lng: 13.3777,
    heading: 86,
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=3600&q=96",
    clue: "Broad plazas, neoclassical columns, and central European capital-city clues.",
    reveal: "The correct location was Brandenburg Gate in Berlin.",
  },
  {
    name: "Grand Place, Brussels, Belgium",
    lat: 50.8467,
    lng: 4.3525,
    heading: 40,
    image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=3600&q=96",
    clue: "Decorated guildhall facades, cobblestones, and a compact European square.",
    reveal: "The correct location was Grand Place in Brussels.",
  },
  {
    name: "Dam Square, Amsterdam, Netherlands",
    lat: 52.3731,
    lng: 4.8922,
    heading: -15,
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=3600&q=96",
    clue: "Canals nearby, bicycles, narrow buildings, and Dutch city-center clues.",
    reveal: "The correct location was Dam Square in Amsterdam.",
  },
  {
    name: "Charles Bridge, Prague, Czechia",
    lat: 50.0865,
    lng: 14.4114,
    heading: 72,
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=3600&q=96",
    clue: "A historic stone bridge, castle views, statues, and old Central European streets.",
    reveal: "The correct location was Charles Bridge in Prague.",
  },
  {
    name: "Fisherman's Bastion, Budapest, Hungary",
    lat: 47.5021,
    lng: 19.0348,
    heading: 150,
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=3600&q=96",
    clue: "White stone terraces, Danube views, and ornate hilltop architecture.",
    reveal: "The correct location was Fisherman's Bastion in Budapest.",
  },
  {
    name: "Schonbrunn Palace, Vienna, Austria",
    lat: 48.1845,
    lng: 16.3122,
    heading: 98,
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=3600&q=96",
    clue: "Grand palace grounds, formal gardens, and imperial Austrian architecture.",
    reveal: "The correct location was Schonbrunn Palace in Vienna.",
  },
  {
    name: "Nyhavn, Copenhagen, Denmark",
    lat: 55.6797,
    lng: 12.5912,
    heading: -70,
    image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=3600&q=96",
    clue: "Colorful harbor houses, boats, cobblestones, and Scandinavian waterfront clues.",
    reveal: "The correct location was Nyhavn in Copenhagen.",
  },
  {
    name: "Gamla Stan, Stockholm, Sweden",
    lat: 59.3251,
    lng: 18.0711,
    heading: 20,
    image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=3600&q=96",
    clue: "Narrow old-town lanes, ochre facades, islands, and Nordic capital scenery.",
    reveal: "The correct location was Gamla Stan in Stockholm.",
  },
  {
    name: "Senate Square, Helsinki, Finland",
    lat: 60.1695,
    lng: 24.9522,
    heading: 135,
    image: "https://images.unsplash.com/photo-1559131397-f94da358f7ca?auto=format&fit=crop&w=3600&q=96",
    clue: "Pale neoclassical buildings, tram-lined streets, and cool northern light.",
    reveal: "The correct location was Senate Square in Helsinki.",
  },
  {
    name: "Trinity College, Dublin, Ireland",
    lat: 53.3438,
    lng: -6.2546,
    heading: 52,
    image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=3600&q=96",
    clue: "Historic campus buildings, Georgian city clues, and left-side traffic nearby.",
    reveal: "The correct location was Trinity College in Dublin.",
  },
  {
    name: "Edinburgh Castle, Edinburgh, Scotland",
    lat: 55.9486,
    lng: -3.1999,
    heading: -105,
    image: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=3600&q=96",
    clue: "Dark stone buildings, steep old streets, and a castle above a northern city.",
    reveal: "The correct location was Edinburgh Castle in Scotland.",
  },
  {
    name: "Golden Gate Bridge, San Francisco, USA",
    lat: 37.8199,
    lng: -122.4783,
    heading: 8,
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=3600&q=96",
    clue: "Red suspension towers, coastal fog, steep hills, and a famous bay.",
    reveal: "The correct location was the Golden Gate Bridge in San Francisco.",
  },
  {
    name: "Hollywood Boulevard, Los Angeles, USA",
    lat: 34.1016,
    lng: -118.3269,
    heading: 85,
    image: "https://images.unsplash.com/photo-1534253893894-10d024888e49?auto=format&fit=crop&w=3600&q=96",
    clue: "Palm trees, entertainment signs, wide streets, and Southern California clues.",
    reveal: "The correct location was Hollywood Boulevard in Los Angeles.",
  },
  {
    name: "The Strip, Las Vegas, USA",
    lat: 36.1147,
    lng: -115.1728,
    heading: 30,
    image: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=3600&q=96",
    clue: "Bright casino towers, desert city roads, and oversized entertainment landmarks.",
    reveal: "The correct location was the Las Vegas Strip.",
  },
  {
    name: "French Quarter, New Orleans, USA",
    lat: 29.9584,
    lng: -90.0644,
    heading: -45,
    image: "https://images.unsplash.com/photo-1571893544028-06b07af6dade?auto=format&fit=crop&w=3600&q=96",
    clue: "Iron balconies, old brick streets, humid light, and Gulf Coast architecture.",
    reveal: "The correct location was the French Quarter in New Orleans.",
  },
  {
    name: "Millennium Park, Chicago, USA",
    lat: 41.8826,
    lng: -87.6226,
    heading: 122,
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=3600&q=96",
    clue: "Tall lakefront skyline, polished public art, and Midwestern city clues.",
    reveal: "The correct location was Millennium Park in Chicago.",
  },
  {
    name: "National Mall, Washington DC, USA",
    lat: 38.8895,
    lng: -77.0353,
    heading: 260,
    image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?auto=format&fit=crop&w=3600&q=96",
    clue: "Broad lawns, white memorials, museums, and planned capital-city avenues.",
    reveal: "The correct location was the National Mall in Washington DC.",
  },
  {
    name: "Old Quebec, Quebec City, Canada",
    lat: 46.812,
    lng: -71.2057,
    heading: 35,
    image: "https://images.unsplash.com/photo-1519832979-6fa011b87667?auto=format&fit=crop&w=3600&q=96",
    clue: "Stone walls, steep streets, French signs, and a fortified North American old town.",
    reveal: "The correct location was Old Quebec in Quebec City.",
  },
  {
    name: "CN Tower, Toronto, Canada",
    lat: 43.6426,
    lng: -79.3871,
    heading: -20,
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=3600&q=96",
    clue: "A tall needle-like tower, glassy skyline, and Lake Ontario nearby.",
    reveal: "The correct location was the CN Tower in Toronto.",
  },
  {
    name: "Stanley Park Seawall, Vancouver, Canada",
    lat: 49.2988,
    lng: -123.1306,
    heading: 180,
    image: "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=3600&q=96",
    clue: "Mountain-backed harbor views, forested park paths, and Pacific Northwest water.",
    reveal: "The correct location was Stanley Park in Vancouver.",
  },
  {
    name: "Plaza de la Constitucion, Mexico City, Mexico",
    lat: 19.4326,
    lng: -99.1332,
    heading: 92,
    image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=3600&q=96",
    clue: "A huge historic plaza, Spanish colonial facades, and central Mexican city life.",
    reveal: "The correct location was the Zocalo in Mexico City.",
  },
  {
    name: "Antigua Guatemala, Guatemala",
    lat: 14.5586,
    lng: -90.7295,
    heading: -12,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=3600&q=96",
    clue: "Colonial streets, volcano views, colorful walls, and Central American highland clues.",
    reveal: "The correct location was Antigua Guatemala.",
  },
  {
    name: "Casco Viejo, Panama City, Panama",
    lat: 8.9519,
    lng: -79.5353,
    heading: 74,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=3600&q=96",
    clue: "Tropical colonial streets, bay views, and a modern skyline not far away.",
    reveal: "The correct location was Casco Viejo in Panama City.",
  },
  {
    name: "Old San Juan, Puerto Rico",
    lat: 18.4655,
    lng: -66.1057,
    heading: 140,
    image: "https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&w=3600&q=96",
    clue: "Colorful Caribbean buildings, blue cobblestones, forts, and ocean air.",
    reveal: "The correct location was Old San Juan in Puerto Rico.",
  },
  {
    name: "Cartagena Walled City, Colombia",
    lat: 10.4236,
    lng: -75.5505,
    heading: -55,
    image: "https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=3600&q=96",
    clue: "Bright colonial balconies, tropical heat, and old stone walls by the Caribbean.",
    reveal: "The correct location was Cartagena's Walled City in Colombia.",
  },
  {
    name: "La Candelaria, Bogota, Colombia",
    lat: 4.5964,
    lng: -74.0731,
    heading: 20,
    image: "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?auto=format&fit=crop&w=3600&q=96",
    clue: "Andean capital streets, colorful colonial buildings, and mountain slopes nearby.",
    reveal: "The correct location was La Candelaria in Bogota.",
  },
  {
    name: "Plaza de Armas, Santiago, Chile",
    lat: -33.4378,
    lng: -70.6505,
    heading: 72,
    image: "https://images.unsplash.com/photo-1548447265-3f66c7a7794c?auto=format&fit=crop&w=3600&q=96",
    clue: "A busy city square, dry Andean light, and mountains beyond the skyline.",
    reveal: "The correct location was Plaza de Armas in Santiago, Chile.",
  },
  {
    name: "La Boca, Buenos Aires, Argentina",
    lat: -34.6345,
    lng: -58.3631,
    heading: 110,
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=3600&q=96",
    clue: "Colorful painted buildings, tango street energy, and a port-neighborhood feel.",
    reveal: "The correct location was La Boca in Buenos Aires.",
  },
  {
    name: "Montevideo Rambla, Uruguay",
    lat: -34.918,
    lng: -56.1619,
    heading: 155,
    image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=3600&q=96",
    clue: "A long waterfront road, broad river views, and low-rise South American city clues.",
    reveal: "The correct location was the Rambla in Montevideo.",
  },
  {
    name: "Iguazu Falls, Argentina",
    lat: -25.6953,
    lng: -54.4367,
    heading: 12,
    streetViewRadius: 900,
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=3600&q=96",
    clue: "Massive waterfalls, subtropical forest, mist, and boardwalk viewpoints.",
    reveal: "The correct location was Iguazu Falls on the Argentina-Brazil border.",
  },
  {
    name: "Copacabana Beach, Rio de Janeiro, Brazil",
    lat: -22.9711,
    lng: -43.1822,
    heading: 80,
    image: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?auto=format&fit=crop&w=3600&q=96",
    clue: "A sweeping urban beach, mosaic promenade, tropical hills, and Atlantic surf.",
    reveal: "The correct location was Copacabana Beach in Rio de Janeiro.",
  },
  {
    name: "Pelourinho, Salvador, Brazil",
    lat: -12.9714,
    lng: -38.5088,
    heading: -25,
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=3600&q=96",
    clue: "Pastel colonial buildings, steep streets, music culture, and northeastern Brazil clues.",
    reveal: "The correct location was Pelourinho in Salvador, Brazil.",
  },
  {
    name: "Lima Miraflores, Peru",
    lat: -12.1211,
    lng: -77.0305,
    heading: 120,
    image: "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=3600&q=96",
    clue: "Pacific cliffs, modern districts, gray coastal skies, and Peruvian city clues.",
    reveal: "The correct location was Miraflores in Lima.",
  },
  {
    name: "Quito Historic Center, Ecuador",
    lat: -0.2202,
    lng: -78.5127,
    heading: 58,
    image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=3600&q=96",
    clue: "High Andean city streets, colonial churches, and steep hills around the center.",
    reveal: "The correct location was Quito's Historic Center in Ecuador.",
  },
  {
    name: "Dubai Marina, United Arab Emirates",
    lat: 25.0806,
    lng: 55.1403,
    heading: 105,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=3600&q=96",
    clue: "Glass towers, desert heat, luxury waterfront roads, and a very modern skyline.",
    reveal: "The correct location was Dubai Marina.",
  },
  {
    name: "Sheikh Zayed Grand Mosque, Abu Dhabi, UAE",
    lat: 24.4128,
    lng: 54.4749,
    heading: -80,
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=3600&q=96",
    clue: "White domes, marble courtyards, palm-lined roads, and Gulf architecture.",
    reveal: "The correct location was Sheikh Zayed Grand Mosque in Abu Dhabi.",
  },
  {
    name: "Doha Corniche, Qatar",
    lat: 25.2916,
    lng: 51.5356,
    heading: 160,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=3600&q=96",
    clue: "Curving waterfront roads, futuristic towers, dry heat, and Gulf skyline clues.",
    reveal: "The correct location was the Doha Corniche in Qatar.",
  },
  {
    name: "Jerusalem Old City, Israel",
    lat: 31.7767,
    lng: 35.2345,
    heading: 45,
    image: "https://images.unsplash.com/photo-1542743408-218cc173cda0?auto=format&fit=crop&w=3600&q=96",
    clue: "Ancient limestone walls, narrow lanes, religious landmarks, and dry hill-country light.",
    reveal: "The correct location was the Old City of Jerusalem.",
  },
  {
    name: "Cappadocia, Goreme, Turkiye",
    lat: 38.6431,
    lng: 34.8289,
    heading: 35,
    streetViewRadius: 1000,
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=3600&q=96",
    clue: "Soft volcanic rock formations, cave dwellings, and central Anatolian valleys.",
    reveal: "The correct location was Goreme in Cappadocia, Turkiye.",
  },
  {
    name: "Red Square, Moscow, Russia",
    lat: 55.7539,
    lng: 37.6208,
    heading: 130,
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=3600&q=96",
    clue: "A vast square, colorful onion domes nearby, and monumental Russian architecture.",
    reveal: "The correct location was Red Square in Moscow.",
  },
  {
    name: "Gyeongbokgung Palace, Seoul, South Korea",
    lat: 37.5796,
    lng: 126.977,
    heading: 20,
    image: "https://images.unsplash.com/photo-1538485399081-7c8ed60c1340?auto=format&fit=crop&w=3600&q=96",
    clue: "Palace gates, mountain backdrop, Korean signs, and a dense modern capital nearby.",
    reveal: "The correct location was Gyeongbokgung Palace in Seoul.",
  },
  {
    name: "Taipei 101, Taipei, Taiwan",
    lat: 25.0339,
    lng: 121.5645,
    heading: -35,
    image: "https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=3600&q=96",
    clue: "A bamboo-like skyscraper, scooters, humid subtropical streets, and Mandarin signage.",
    reveal: "The correct location was Taipei 101 in Taiwan.",
  },
  {
    name: "The Bund, Shanghai, China",
    lat: 31.2405,
    lng: 121.4906,
    heading: 110,
    image: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&w=3600&q=96",
    clue: "Riverfront skyline, colonial-era buildings opposite futuristic towers, and huge city scale.",
    reveal: "The correct location was The Bund in Shanghai.",
  },
  {
    name: "Great Wall at Badaling, China",
    lat: 40.3596,
    lng: 116.0204,
    heading: 70,
    streetViewRadius: 900,
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=3600&q=96",
    clue: "Stone ramparts snaking across steep green-brown mountains.",
    reveal: "The correct location was the Great Wall at Badaling, China.",
  },
  {
    name: "Hawa Mahal, Jaipur, India",
    lat: 26.9239,
    lng: 75.8267,
    heading: 95,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=3600&q=96",
    clue: "Pink sandstone facade, busy streets, scooters, and north Indian city clues.",
    reveal: "The correct location was Hawa Mahal in Jaipur.",
  },
  {
    name: "Gateway of India, Mumbai, India",
    lat: 18.922,
    lng: 72.8347,
    heading: -12,
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=3600&q=96",
    clue: "Harborfront crowds, colonial architecture, and tropical Indian city atmosphere.",
    reveal: "The correct location was the Gateway of India in Mumbai.",
  },
  {
    name: "Kathmandu Durbar Square, Nepal",
    lat: 27.7046,
    lng: 85.3077,
    heading: 48,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=3600&q=96",
    clue: "Layered temple roofs, brick plazas, Himalayan city clues, and dense old streets.",
    reveal: "The correct location was Kathmandu Durbar Square in Nepal.",
  },
  {
    name: "Patong Beach, Phuket, Thailand",
    lat: 7.8967,
    lng: 98.2967,
    heading: 140,
    image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=3600&q=96",
    clue: "Tropical beach roads, scooters, Thai signs, and Andaman Sea resort scenery.",
    reveal: "The correct location was Patong Beach in Phuket.",
  },
  {
    name: "Ha Long Bay, Vietnam",
    lat: 20.9101,
    lng: 107.1839,
    heading: -20,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=3600&q=96",
    clue: "Limestone islands, green water, boats, and humid northern Vietnam scenery.",
    reveal: "The correct location was Ha Long Bay in Vietnam.",
  },
  {
    name: "Hanoi Old Quarter, Vietnam",
    lat: 21.034,
    lng: 105.852,
    heading: 75,
    image: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=3600&q=96",
    clue: "Dense shopfronts, scooters everywhere, narrow streets, and Vietnamese signs.",
    reveal: "The correct location was Hanoi's Old Quarter.",
  },
  {
    name: "Borobudur, Java, Indonesia",
    lat: -7.6079,
    lng: 110.2038,
    heading: 25,
    streetViewRadius: 800,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=3600&q=96",
    clue: "Stone stupas, tropical greenery, volcanic hills, and Javanese temple scenery.",
    reveal: "The correct location was Borobudur in Indonesia.",
  },
  {
    name: "Ubud, Bali, Indonesia",
    lat: -8.5069,
    lng: 115.2625,
    heading: 105,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=3600&q=96",
    clue: "Rice terraces, tropical roads, temple gates, and Balinese village details.",
    reveal: "The correct location was Ubud in Bali.",
  },
  {
    name: "Petronas Towers, Kuala Lumpur, Malaysia",
    lat: 3.1579,
    lng: 101.7116,
    heading: -60,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=3600&q=96",
    clue: "Twin skyscrapers, humid city streets, and Malaysian capital skyline clues.",
    reveal: "The correct location was the Petronas Towers in Kuala Lumpur.",
  },
  {
    name: "Intramuros, Manila, Philippines",
    lat: 14.5896,
    lng: 120.9747,
    heading: 40,
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=3600&q=96",
    clue: "Spanish-era walls, tropical streets, and dense Southeast Asian city surroundings.",
    reveal: "The correct location was Intramuros in Manila.",
  },
  {
    name: "Boudhanath Stupa, Kathmandu, Nepal",
    lat: 27.7215,
    lng: 85.362,
    heading: 90,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=3600&q=96",
    clue: "A huge white stupa, prayer flags, mountain-country atmosphere, and Tibetan Buddhist details.",
    reveal: "The correct location was Boudhanath Stupa in Kathmandu.",
  },
  {
    name: "Mount Fuji, Lake Kawaguchi, Japan",
    lat: 35.5171,
    lng: 138.7518,
    heading: 180,
    streetViewRadius: 700,
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=3600&q=96",
    clue: "A symmetrical volcanic mountain, lake views, and tidy Japanese rural roads.",
    reveal: "The correct location was Lake Kawaguchi near Mount Fuji.",
  },
  {
    name: "Meiji Shrine, Tokyo, Japan",
    lat: 35.6764,
    lng: 139.6993,
    heading: 75,
    image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=3600&q=96",
    clue: "Forest paths, shrine gates, gravel walkways, and central Tokyo nearby.",
    reveal: "The correct location was Meiji Shrine in Tokyo.",
  },
  {
    name: "Djemaa el-Fna Market Edge, Marrakesh, Morocco",
    lat: 31.626,
    lng: -7.9888,
    heading: -15,
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=3600&q=96",
    clue: "Busy market edges, red city walls, scooters, and warm North African street light.",
    reveal: "The correct location was near Djemaa el-Fna in Marrakesh.",
  },
  {
    name: "Karnak Temple, Luxor, Egypt",
    lat: 25.7188,
    lng: 32.6573,
    heading: 82,
    streetViewRadius: 900,
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=3600&q=96",
    clue: "Ancient columns, desert heat, hieroglyphic stonework, and Nile Valley clues.",
    reveal: "The correct location was Karnak Temple in Luxor.",
  },
  {
    name: "Abu Simbel, Egypt",
    lat: 22.3372,
    lng: 31.6258,
    heading: 115,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=3600&q=96",
    clue: "Huge seated statues, desert surroundings, and ancient Egyptian temple fronts.",
    reveal: "The correct location was Abu Simbel in southern Egypt.",
  },
  {
    name: "Medina of Tunis, Tunisia",
    lat: 36.798,
    lng: 10.171,
    heading: 50,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=3600&q=96",
    clue: "Narrow market lanes, whitewashed walls, blue details, and North African city clues.",
    reveal: "The correct location was the Medina of Tunis.",
  },
  {
    name: "Algiers Casbah, Algeria",
    lat: 36.785,
    lng: 3.0605,
    heading: -40,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=3600&q=96",
    clue: "Steep white urban streets, Mediterranean light, and North African hillside architecture.",
    reveal: "The correct location was the Casbah of Algiers.",
  },
  {
    name: "Boulders Beach, Cape Town, South Africa",
    lat: -34.197,
    lng: 18.451,
    heading: 100,
    streetViewRadius: 700,
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=3600&q=96",
    clue: "Granite boulders, clear coastal water, and South African cape scenery.",
    reveal: "The correct location was Boulders Beach near Cape Town.",
  },
  {
    name: "Victoria Falls, Zimbabwe",
    lat: -17.9243,
    lng: 25.8572,
    heading: 30,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=3600&q=96",
    clue: "Huge waterfall mist, tropical gorge scenery, and southern African landscape clues.",
    reveal: "The correct location was Victoria Falls in Zimbabwe.",
  },
  {
    name: "Lalibela Rock Churches, Ethiopia",
    lat: 12.0316,
    lng: 39.0476,
    heading: 65,
    streetViewRadius: 900,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=3600&q=96",
    clue: "Rock-cut churches, highland terrain, and distinctive Ethiopian stone architecture.",
    reveal: "The correct location was Lalibela in Ethiopia.",
  },
  {
    name: "Independence Arch, Accra, Ghana",
    lat: 5.545,
    lng: -0.197,
    heading: 92,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=3600&q=96",
    clue: "West African capital streets, monuments, tropical light, and Atlantic coast nearby.",
    reveal: "The correct location was Independence Arch in Accra.",
  },
  {
    name: "Lekki Conservation Centre, Lagos, Nigeria",
    lat: 6.436,
    lng: 3.535,
    heading: 15,
    streetViewRadius: 900,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=3600&q=96",
    clue: "Tropical wetland greenery, wooden walkways, and dense West African city nearby.",
    reveal: "The correct location was Lekki Conservation Centre in Lagos.",
  },
  {
    name: "Kigali Convention Centre, Rwanda",
    lat: -1.9544,
    lng: 30.0926,
    heading: -20,
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=3600&q=96",
    clue: "Clean hilly city roads, modern architecture, and East African highland scenery.",
    reveal: "The correct location was Kigali Convention Centre in Rwanda.",
  },
  {
    name: "Mount Kilimanjaro, Tanzania",
    lat: -3.0674,
    lng: 37.3556,
    heading: 10,
    streetViewRadius: 1500,
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=3600&q=96",
    clue: "A tall isolated mountain, East African plains, and volcanic highland scenery.",
    reveal: "The correct location was near Mount Kilimanjaro in Tanzania.",
  },
  {
    name: "Auckland Harbour, New Zealand",
    lat: -36.8406,
    lng: 174.7678,
    heading: 35,
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=3600&q=96",
    clue: "Harbor water, volcanic hills, a needle-like tower, and New Zealand city clues.",
    reveal: "The correct location was Auckland Harbour in New Zealand.",
  },
  {
    name: "Wellington Cable Car, New Zealand",
    lat: -41.2841,
    lng: 174.7671,
    heading: 140,
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=3600&q=96",
    clue: "Steep harbor city streets, wind-swept hills, and compact New Zealand capital scenery.",
    reveal: "The correct location was near the Wellington Cable Car.",
  },
  {
    name: "Great Ocean Road, Victoria, Australia",
    lat: -38.6655,
    lng: 143.1042,
    heading: 95,
    streetViewRadius: 1000,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=3600&q=96",
    clue: "Cliffside coastal road, limestone sea stacks, and southern Australian scenery.",
    reveal: "The correct location was along Australia's Great Ocean Road.",
  },
  {
    name: "Melbourne Flinders Street Station, Australia",
    lat: -37.8183,
    lng: 144.9671,
    heading: 110,
    image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=3600&q=96",
    clue: "Historic yellow railway station, trams, and dense Australian city streets.",
    reveal: "The correct location was Flinders Street Station in Melbourne.",
  },
  {
    name: "Brisbane South Bank, Australia",
    lat: -27.4772,
    lng: 153.0219,
    heading: -15,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=3600&q=96",
    clue: "Riverfront paths, subtropical city skyline, and Queensland urban clues.",
    reveal: "The correct location was South Bank in Brisbane.",
  },
  {
    name: "Hobart Waterfront, Tasmania, Australia",
    lat: -42.8854,
    lng: 147.3331,
    heading: 50,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=3600&q=96",
    clue: "Cool southern harbor, low mountains, sandstone warehouses, and island-capital clues.",
    reveal: "The correct location was Hobart Waterfront in Tasmania.",
  },
  {
    name: "Waikiki Beach, Honolulu, USA",
    lat: 21.2766,
    lng: -157.8275,
    heading: 160,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3600&q=96",
    clue: "Tropical urban beach, volcanic ridge views, palms, and Pacific island resort scenery.",
    reveal: "The correct location was Waikiki Beach in Honolulu.",
  },
  {
    name: "Reykjavik Hallgrimskirkja, Iceland",
    lat: 64.1417,
    lng: -21.9266,
    heading: 60,
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=3600&q=96",
    clue: "A tall concrete church, colorful low buildings, and North Atlantic city light.",
    reveal: "The correct location was Hallgrimskirkja in Reykjavik.",
  },
  {
    name: "Tromso Harbor, Norway",
    lat: 69.6496,
    lng: 18.956,
    heading: 115,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=3600&q=96",
    clue: "Arctic harbor streets, snowy mountains, and far northern Norwegian scenery.",
    reveal: "The correct location was Tromso Harbor in Norway.",
  },
  {
    name: "Rovaniemi Arctic Circle, Finland",
    lat: 66.5435,
    lng: 25.8477,
    heading: 35,
    streetViewRadius: 900,
    image: "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?auto=format&fit=crop&w=3600&q=96",
    clue: "Flat boreal forest, Arctic Circle signs, and snowy northern Finnish roads.",
    reveal: "The correct location was near the Arctic Circle in Rovaniemi, Finland.",
  },
  {
    name: "Kirkjufell, Iceland",
    lat: 64.9417,
    lng: -23.3069,
    heading: 100,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=3600&q=96",
    clue: "A sharply shaped mountain, waterfalls nearby, and remote Icelandic coastal scenery.",
    reveal: "The correct location was Kirkjufell in Iceland.",
  },
  {
    name: "Faroe Islands, Torshavn Harbor",
    lat: 62.0107,
    lng: -6.7716,
    heading: -70,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=3600&q=96",
    clue: "Grass-roofed buildings, North Atlantic harbor, steep green islands, and cloudy light.",
    reveal: "The correct location was Torshavn in the Faroe Islands.",
  },
  {
    name: "Grand Canyon South Rim, USA",
    lat: 36.0579,
    lng: -112.1431,
    heading: 45,
    streetViewRadius: 1000,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=3600&q=96",
    clue: "Layered red rock cliffs, dry pine forest, and an enormous canyon viewpoint.",
    reveal: "The correct location was the Grand Canyon South Rim.",
  },
  {
    name: "Yosemite Valley, California, USA",
    lat: 37.7456,
    lng: -119.5936,
    heading: 80,
    streetViewRadius: 1000,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=3600&q=96",
    clue: "Granite cliffs, pine forest, waterfalls, and a famous California national park valley.",
    reveal: "The correct location was Yosemite Valley in California.",
  },
  {
    name: "Yellowstone Old Faithful, USA",
    lat: 44.4605,
    lng: -110.8281,
    heading: 25,
    streetViewRadius: 1000,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=3600&q=96",
    clue: "Boardwalks, geyser basins, steam vents, and high-country wilderness roads.",
    reveal: "The correct location was Old Faithful in Yellowstone National Park.",
  },
  {
    name: "Zion Canyon, Utah, USA",
    lat: 37.201,
    lng: -112.9874,
    heading: 105,
    streetViewRadius: 1000,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=3600&q=96",
    clue: "Towering red canyon walls, desert cottonwoods, and Utah national park roads.",
    reveal: "The correct location was Zion Canyon in Utah.",
  },
  {
    name: "Niagara Falls, Canada",
    lat: 43.0812,
    lng: -79.0742,
    heading: 130,
    streetViewRadius: 800,
    image: "https://images.unsplash.com/photo-1463694775559-eea25626346b?auto=format&fit=crop&w=3600&q=96",
    clue: "Huge waterfall spray, tourist viewpoints, and a border-city river gorge.",
    reveal: "The correct location was Niagara Falls in Canada.",
  },
  {
    name: "Cliffs of Moher, Ireland",
    lat: 52.9715,
    lng: -9.4309,
    heading: 65,
    streetViewRadius: 900,
    image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=3600&q=96",
    clue: "High sea cliffs, green fields, Atlantic wind, and western Irish coastal scenery.",
    reveal: "The correct location was the Cliffs of Moher in Ireland.",
  },
  {
    name: "Plitvice Lakes, Croatia",
    lat: 44.8654,
    lng: 15.582,
    heading: 20,
    streetViewRadius: 1000,
    image: "https://images.unsplash.com/photo-1555990538-c48dbe126342?auto=format&fit=crop&w=3600&q=96",
    clue: "Turquoise lakes, wooden paths, forest waterfalls, and Balkan national park scenery.",
    reveal: "The correct location was Plitvice Lakes National Park in Croatia.",
  },
  {
    name: "Matterhorn, Zermatt, Switzerland",
    lat: 45.9763,
    lng: 7.6586,
    heading: 115,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=3600&q=96",
    clue: "Sharp alpine peak, chalet village clues, and Swiss mountain scenery.",
    reveal: "The correct location was near the Matterhorn in Zermatt.",
  },
  {
    name: "Hallstatt, Austria",
    lat: 47.5622,
    lng: 13.6493,
    heading: -80,
    streetViewRadius: 700,
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=3600&q=96",
    clue: "Alpine lake village, steep mountains, church spire, and Austrian scenery.",
    reveal: "The correct location was Hallstatt in Austria.",
  },
  {
    name: "Mont Saint-Michel, France",
    lat: 48.6361,
    lng: -1.5115,
    heading: 20,
    streetViewRadius: 1000,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=3600&q=96",
    clue: "A medieval abbey rising from tidal flats, stone lanes, and northern French coast.",
    reveal: "The correct location was Mont Saint-Michel in France.",
  },
  {
    name: "Porto Ribeira, Portugal",
    lat: 41.1406,
    lng: -8.611,
    heading: 140,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=3600&q=96",
    clue: "Colorful riverfront houses, steep streets, tiled facades, and Portuguese city clues.",
    reveal: "The correct location was Ribeira in Porto.",
  },
  {
    name: "Belem Tower, Lisbon, Portugal",
    lat: 38.6916,
    lng: -9.216,
    heading: 65,
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=3600&q=96",
    clue: "A stone tower by a wide river, tiled sidewalks, and Atlantic Portuguese light.",
    reveal: "The correct location was Belem Tower in Lisbon.",
  },
  {
    name: "Alhambra, Granada, Spain",
    lat: 37.1761,
    lng: -3.5881,
    heading: 92,
    streetViewRadius: 800,
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=3600&q=96",
    clue: "Moorish palace walls, dry Andalusian hills, and southern Spanish city scenery.",
    reveal: "The correct location was the Alhambra in Granada.",
  },
  {
    name: "Reykjavik Sun Voyager, Iceland",
    lat: 64.1476,
    lng: -21.9222,
    heading: -95,
    image: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=3600&q=96",
    clue: "A metal ship-like sculpture, bay water, mountains, and North Atlantic city clues.",
    reveal: "The correct location was the Sun Voyager in Reykjavik.",
  },
  {
    name: "Ait Benhaddou, Morocco",
    lat: 31.047,
    lng: -7.1297,
    heading: 50,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=3600&q=96",
    clue: "Earthen kasbah walls, desert hills, and Moroccan caravan-route scenery.",
    reveal: "The correct location was Ait Benhaddou in Morocco.",
  },
  {
    name: "Wadi Rum, Jordan",
    lat: 29.532,
    lng: 35.421,
    heading: 20,
    streetViewRadius: 1500,
    image: "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?auto=format&fit=crop&w=3600&q=96",
    clue: "Red desert sand, huge sandstone cliffs, and wide Bedouin desert landscapes.",
    reveal: "The correct location was Wadi Rum in Jordan.",
  },
  {
    name: "Muscat Corniche, Oman",
    lat: 23.6176,
    lng: 58.5657,
    heading: 120,
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=3600&q=96",
    clue: "White low-rise buildings, rugged dry mountains, and Gulf of Oman waterfront roads.",
    reveal: "The correct location was the Mutrah Corniche in Muscat.",
  },
  {
    name: "Persepolis, Iran",
    lat: 29.9354,
    lng: 52.8916,
    heading: 85,
    streetViewRadius: 1200,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=3600&q=96",
    clue: "Ancient stone columns, dry plateau landscape, and Persian historic ruins.",
    reveal: "The correct location was Persepolis in Iran.",
  },
  {
    name: "Samarkand Registan, Uzbekistan",
    lat: 39.6542,
    lng: 66.975,
    heading: 40,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=3600&q=96",
    clue: "Blue tiled madrasas, broad plaza, and Silk Road architecture.",
    reveal: "The correct location was Registan Square in Samarkand.",
  },
  {
    name: "Astana Bayterek Tower, Kazakhstan",
    lat: 51.1282,
    lng: 71.4304,
    heading: -30,
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=3600&q=96",
    clue: "Planned city boulevards, futuristic towers, and Central Asian capital scenery.",
    reveal: "The correct location was Bayterek Tower in Astana.",
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
