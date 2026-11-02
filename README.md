# A Universe Made for Julie 💗

An original, responsive galaxy journey by **James Traigo**, for **my baby Julie**. Five universes and one final destination, six complete personal letters, five distinct ten-second journeys, and little surprises among the stars.

The website is plain HTML, CSS, and modern JavaScript modules. **No npm install, framework, API key, account, or build step is required.** All fonts, images, music, and icons are local. No analytics, tracking, or remote requests are used by the website.

## Complete project structure

```text
julie-universe/
├── index.html
├── css/
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── transitions.js
│   ├── universe.js
│   ├── interactions.js
│   ├── music.js
│   └── letters.js
├── assets/
│   ├── images/
│   │   ├── photo1.jpg
│   │   ├── photo2.jpg
│   │   ├── photo3.jpg
│   │   ├── photo4.jpg
│   │   ├── photo5.jpg
│   │   └── planet-texture.svg
│   ├── fonts/
│   │   ├── cormorant-garamond-latin-400-normal.woff2
│   │   ├── cormorant-garamond-latin-400-italic.woff2
│   │   ├── dm-sans-latin-400-normal.woff2
│   │   ├── cormorant-OFL.txt
│   │   └── dm-sans-OFL.txt
│   ├── icons/
│   │   └── constellation.svg
│   ├── music.mp3
│   └── music-credits.md
├── README.md
└── VALIDATION.md
```

## Open in Visual Studio Code

1. Open the `julie-universe` folder in VS Code.
2. Install the **Live Server** extension by Ritwick Dey if you do not have it.
3. Right-click `index.html` and select **Open with Live Server** (or click **Go Live**).
4. Start with **ENTER MY UNIVERSE**, read the first letter, and choose **Next universe** below it.

Use a local HTTP server, not a direct `file://` double-click: browsers require HTTP for JavaScript modules. Live Server serves this project as-is; no compilation or extension-specific API is used.

Alternatively, from this folder:

```sh
python3 -m http.server 5173 --bind 127.0.0.1
```

Visit port `5173` in your local browser. Press `Ctrl+C` in the terminal to stop the server. From the parent repository you can use `python3 -m http.server 5173 --bind 127.0.0.1 --directory julie-universe` instead.

## Add your five real photographs

Replace **exactly these five files**, retaining their filenames:

| File                       | Memory                |
| -------------------------- | --------------------- |
| `assets/images/photo1.jpg` | Our first moments     |
| `assets/images/photo2.jpg` | Your beautiful smile  |
| `assets/images/photo3.jpg` | Our little adventures |
| `assets/images/photo4.jpg` | Your kindness         |
| `assets/images/photo5.jpg` | Our future dreams     |

The included files are intentional, illustrated placeholders. They are not fake photographs of you. Portrait images around 600 × 750 pixels work well; the gallery uses `object-fit: cover`. Compress very large photos before adding them. Use actual JPEG files, rather than renaming another format to `.jpg`.

Edit the `memories` array near the beginning of `js/universe.js` to add real dates, descriptions, and accessible image descriptions. The initial date prompts deliberately do not invent shared events. The five memory planets and five gallery cards open the same matching memory.

## Personalize the words

All six complete letters are in `js/letters.js`, in journey order. Each paragraph is plain text inside `p(...)`, a quote inside `q(...)`, or a highlighted promise inside `promise(...)`. An apostrophe inside a single-quoted string must be escaped, or use double quotes around that paragraph. Do not paste HTML into letter text.

The chapter titles, descriptions, planet colors, twenty distinct reasons, and six constellation messages are in `js/universe.js`. Secret notes and the final invitation are in `js/interactions.js`. Colors, spacing, and typography are controlled by the CSS custom properties in `css/style.css`; animations and responsive rules are separated into their own files.

## The six destinations

1. **Welcome to My Universe** — ringed planet, hidden asteroid heart, shooting-star note, heart constellation, an entrance particle burst, and the first letter.
2. **The Planet of Our Memories** — five interactive planets, five responsive photo slots, dated memory cards, and the second letter.
3. **A Thousand Reasons** — twenty keyboard-accessible, distinct reason stars, a discovered-star counter, and the third letter.
4. **The Moon of My Heart** — rotating cratered moon, orbiting heart, petals, an envelope, the typed apology, and an optional, pressure-free “Forgive Me?” response. You may continue without opening the letter or pressing forgiveness.
5. **Our Constellation — My Forever** — six connected interactive stars, the fifth letter, and the hidden missing-you confession.
6. **The Universe That Ends With You** — a heart-shaped galaxy, golden envelope particles, the long typed closing letter, an all-five-universes secret, and a final invitation.

Click **Julie** for a heart burst. The logo returns to the current introduction. **The journey** goes to the chapter map. Random notes avoid repeating the immediately previous note. Discovered reasons and visited chapters are retained for the current page session; refreshing starts a fresh journey. Nothing is stored or sent anywhere.

## Ten-second journeys

`js/transitions.js` defines `JOURNEY_DURATION = 10_000` and five visual styles: violet wormhole, pink nebula tunnel, shooting-star journey, moonlight portal, and golden galaxy portal.

Each unskipped journey has one 10,000 ms deadline. `requestAnimationFrame` renders countdown and progress from `performance.now()`; a single guarded completion method handles the deadline and skip. Browser frame scheduling can affect the exact rendered frame, but timing never accumulates from repeated one-second ticks. The wormhole follows five two-second phases, showing its three phrases separately within seconds 8–10. The remaining journeys show their three phrases individually across the ten seconds.

The application shell is `inert` while traveling, future chapters are disabled, and repeated triggers cannot create multiple timers or skip a destination. Previously visited chapters can be revisited through a journey. **Skip journey** or `Escape` ends the current journey early by choice; it never advances twice. Refreshing does not restore a half-finished transition.

Reduced motion keeps the same timer and skip option while replacing movement with a calm, static portal. Hidden tabs stop drawing; the single travel deadline remains authoritative. Arrival may be scheduled later by a backgrounded browser, but cannot repeat or silently advance extra chapters.

## Music and sound

An original 48-second ambient track is included at `assets/music.mp3`. Click **Sound off** or the player’s play button to opt in. Nothing autoplays on page load. Play/pause, seeking, time/duration, volume, and the rotating galaxy disc all reflect the audio state. Soft Web Audio tones are enabled only after opting in.

Music gently changes volume for travel and becomes softer for the typed letters. It pauses in hidden tabs and resumes only if previously playing. Use the clear play/pause control to stop it at any time. Replace the file with a legally usable MP3 to use a personal song. If it is missing or blocked, the player reports that music is unavailable and every story interaction still works. See `assets/music-credits.md`.

## Accessibility and performance

- Semantic regions, a skip link, visible focus indicators, native buttons, named sliders, and accessible dialog descriptions.
- Keyboard-accessible planets, stars, secrets, envelopes, music, and chapter navigation. Dialogs support `Escape`, close, and outside click, with native focus management.
- A focused skip button and an inert background during transitions. Forgiveness is never a navigation gate.
- `prefers-reduced-motion` disables motion, bursts, parallax, and typewriting; complete letters are immediately readable.
- A **Show the full letter** control bypasses typewriting at any time. Letter typing does not flood screen-reader live regions.
- One bounded starfield canvas loop, fewer particles on mobile, capped transient particles, and no cursor trail on touch devices.
- Hidden tabs pause unnecessary effects. Navigation cancels old typing. Page teardown aborts listeners and clears owned timers/animation frames.
- Locally bundled fonts avoid third-party font requests. Cormorant Garamond and DM Sans are from Fontsource 5.3.0, distributed under the included SIL Open Font Licenses.

## Manual checks

- On a fresh load, confirm music is paused and only the first chapter is unlocked.
- Enter the universe, open the secrets, and read the first letter.
- Let each of the five journeys complete without skipping: verify the ten-second countdown, individual phrases, unique visual, and single next destination.
- On another journey, use Skip (or Escape), and confirm exactly one arrival. Rapid clicks must not create duplicate arrivals.
- Open all five memory cards and verify that the gallery has five images.
- Discover all twenty reason stars and check the counter reaches 20 / 20.
- Open the moon envelope, show the full apology, and check the optional forgiveness response. Double-click the moon for its secret.
- Open all six constellation messages, the hidden confession, final envelope, all-five secret, and final surprise.
- Test play/pause, seek, volume, visible time/duration, and disc state. Rename the music file temporarily to check the graceful fallback; restore it afterward.
- Test at 1440 px, 768 px, 390 px, and 320 px widths. Check keyboard focus and the browser’s reduced-motion setting.
- Check the browser console for uncaught JavaScript errors and the network panel for missing assets.

Host the folder on any static HTTPS host when you are ready to share. Deployment is optional and is not performed by this project. If adding personal photographs, choose the visibility you want before sharing the site.
