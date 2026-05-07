# WorldPinr

WorldPinr is a static local geography guessing game inspired by the main GeoGuessr loop:

1. Spawn into a street-level scene.
2. Pan, drag, and zoom the viewer to inspect clues.
3. Expand the world map and drop a pin where you think you are.
4. Submit the guess to reveal the real location, distance line, and score.
5. Play five timed rounds and try to beat the saved best score.

The project has no backend, build step, or database. It runs directly from VS Code with a tiny local static server.

## Features

- Google Maps JavaScript API guessing map and Street View when a key is configured.
- Real Google Street View embed plus a simple built-in fallback guessing map when no key is configured.
- Custom pins, stable resizing, smoother zooming, and a world reset control.
- Five-round game loop using randomized locations from a larger pool.
- Haversine distance calculation, 5,000-point round scoring, distance line reveal, timeout handling, final breakdown, and `localStorage` best-score saving.
- Responsive layout for desktop and mobile screens.

## Optional Google Street View API key

The game uses the Google Maps JavaScript API for the real guessing map and best Street View experience. Add a Google Maps JavaScript API key with the Maps JavaScript API enabled:

1. Open `index.html`.
2. Find this block near the bottom:

```html
<script>
  // Optional: paste a browser-restricted Google Maps JavaScript API key here.
  // Example: window.WORLDPINR_GOOGLE_MAPS_API_KEY = "AIza...";
  window.WORLDPINR_GOOGLE_MAPS_API_KEY = "";
</script>
```

3. Put your key inside the quotes:

```html
window.WORLDPINR_GOOGLE_MAPS_API_KEY = "YOUR_KEY_HERE";
```

If the key is blank, the app uses the no-key Street View embed and a simple fallback click map. If a configured key is rejected, blocked, or a panorama is not found for a round, the app automatically falls back for that round.

## Run locally

```bash
python -m http.server 8080
```

Then open <http://127.0.0.1:8080>.

In VS Code you can also use the Run/Debug dropdown and select **Run WorldPinr in Browser**.

## Notes

- Google Maps JavaScript API is loaded dynamically when `WORLDPINR_GOOGLE_MAPS_API_KEY` is set.
- Without a key, the Street View scene uses a Google Maps embed and the guess map uses a local fallback surface.
- Fallback scene images are loaded from Unsplash URLs to keep the repository lightweight.
