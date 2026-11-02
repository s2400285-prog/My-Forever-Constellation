# Validation evidence

Validated in Chromium on November 2, 2026. All application assets are local; the site needs only a static HTTP server. No production deployment was performed.

## Functional browser checks

**21 end-to-end checks passed.** The full six-destination journey ran in a real browser, including all five unskipped transitions. Checks also covered:

- Initial chapter locks, first entrance, personal letters, and opt-in audio.
- All five memory planets/cards and exactly five successfully decoded JPEG slots.
- All twenty reason stars producing unique text, a stable 20/20 counter, and discoveries retained on revisit.
- Moon single click, keyboard activation, double-click secret, envelope opening, typewriter completion/skip, sincere apology, and optional forgiveness response.
- All six constellation messages and the hidden romantic confession.
- Final envelope, complete closing letter, softer music, all-five-universes secret, and final invitation.
- Random notes, the asteroid heart, planet secret, shooting star, hidden heart constellation, and Julie's name interaction.
- Music play/pause, synchronized controls, volume, seeking, duration, and a deliberate missing-MP3 fallback.
- Revisit navigation, single-arrival guards, Skip, Escape, focus on the travel skip button, and an inert background during travel.
- Every destination at widths **320, 390, 768, 1024, and 1440 pixels**, without horizontal overflow.
- Reduced motion showing full letters immediately while keeping a skippable ten-second journey.

There were **zero uncaught JavaScript errors** and **zero unexpected failed asset responses** across the functional suite. The missing-MP3 check deliberately returned a 404 and verified that the story still worked.

## Real-time transition measurements

| Journey               | Measured completion |
| --------------------- | ------------------: |
| Violet wormhole       |         10,015.1 ms |
| Pink nebula tunnel    |         10,006.0 ms |
| Shooting-star journey |         10,010.5 ms |
| Moonlight portal      |         10,015.6 ms |
| Golden galaxy portal  |         10,007.0 ms |

Each journey displayed its three distinct phrases individually. Repeated triggers did not add timers or produce extra arrivals. The wormhole's opening, orbit, and zoom phases were checked separately.

An additional controlled-browser-clock check passed for **all five** journeys: the current universe remained visible at **9,999 ms**, and **exactly one** next universe arrived at **10,000 ms**. The small real-time differences above are browser scheduling, not extra programmed delay. An explicit skip intentionally finishes earlier.

## Static servers and source checks

- Python 3.12's static HTTP server: the complete functional suite passed. A Blob URL fallback supports music seeking when HTTP byte ranges are unavailable.
- Live Server **1.2.2**: all six chapters, the final letter, playback/seeking, successful assets, and absence of JavaScript errors verified. VS Code's extension UI itself was not automated; the same static files require no integration or build step.
- `node --check` passed for all six JavaScript modules.
- `git diff --check` passed.
- HTML, CSS, JavaScript, and Markdown formatted with Prettier **3.6.2** without adding application dependencies.

## Accessibility scope

axe-core **4.10.3** reported **zero automated WCAG 2 A/AA and 2.1 A/AA violations** on all six destinations and an open secret dialog at 390 px. Gradient/canvas color contrast yielded items requiring manual review, so this is not a claim of comprehensive WCAG certification. Text and focus states were also visually inspected. Keyboard-based secret opening, native dialog Escape behavior, transition focus containment, reduced motion, and typewriter skipping were functionally exercised.

Mobile checks used Chromium viewport/touch emulation. Native Safari on an iPhone and native Android browsers were not available for device testing. They should receive a final check on real devices before sharing widely.

## Personalization remaining

The site is complete and usable with the included original illustrations and ambient music. James can replace the five JPEGs and edit the real dates/descriptions in `js/universe.js`; the current text does not invent shared dates or photographs. See `README.md` for exact paths and instructions.
