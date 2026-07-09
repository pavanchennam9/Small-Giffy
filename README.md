# Happy Birthday Website — Customization Guide

Everything is already wired up and works out of the box. Here's exactly where to personalize it.

## 1. Her name
Search-and-replace the placeholder name **"Bestie"** across:
- `index.html` — page `<title>`, hero name, cake message, celebrate section, finale name
- Nowhere else; it only appears in `index.html`.

## 2. Her photos
Replace the gradient placeholders with real images:
- **Hero background**: in `css/style.css`, find `.hero-bg` and add
  `background-image: url('images/hero/her-photo.jpg');` alongside the existing gradient (put it as the top layer).
- **About section photo**: in `css/style.css`, find `.about-photo` and add a `background-image` the same way, then remove the `::after` placeholder text rule.
- **Gallery photos**: open `js/gallery.js` and replace the `photos` array — swap `emoji` for a real `src` path (e.g. `images/gallery/photo1.jpg`), then update `gallery.js`/`style.css` `.gallery-photo` to render an `<img>` or `background-image` instead of the emoji.
- **Scrapbook polaroids**: in `index.html`, each `.polaroid-photo` div can take a `background-image` inline or via a new CSS class per page.

## 3. Background music & voice memory
Drop your files into the `audio/` folder using these exact names (already linked in the HTML):
- `rendukallu.mp3` — background music
- `audio/voice.mp3` — optional voice memory (wire it into a button in the scrapbook if you'd like)

## 4. The secret letter message
In `index.html`, find the element with `id="letterText"`. Edit the `data-full-text="..."` attribute — that's the whole message, and the typing animation will type out whatever you put there. No JavaScript editing needed.

## 5. Birthday date (for the countdown)
In `js/app.js`, find:
```js
const birthdayDate = new Date(new Date().getFullYear(), 6, 11, 0, 0, 0);
```
The second number is the month **as an index starting at 0** (0 = January, 11 = December) and the third is the day. Update both to her real birthday.

## 6. Timeline & about text
All copy in the "About Her" and "Memory Timeline" sections lives directly in `index.html` — just edit the text inside each `.glass-card` / `.timeline-card`.

## What's included vs. simplified from the original brief
Fully built: loading screen → curtain intro, magical cursor trail, hero with live countdown, glass-card About section with animated counters, memory timeline, masonry gallery with keyboard-navigable lightbox, an opening diary/scrapbook with flipping pages, a fully interactive cake (light candles, mic or button-triggered blow, cut with confetti + camera flash), a 3D-style gift box with random bonus surprises, a locked secret letter with envelope-opening + typing animation, a celebrate button with confetti bursts, and a grand finale with canvas fireworks, stars, and lanterns.

Simplified or left as an easy follow-on for a future pass: the scrapbook ships with 4 richly designed pages rather than 10, and the memory quiz, photo puzzle, treasure hunt, and mood-theme switcher from the original brief weren't included yet — happy to build any of those next if you want them added.
