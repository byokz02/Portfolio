# Kervie Roca — Portfolio

Plain HTML / CSS / JavaScript. No build step: open `index.html` in a browser, or upload the folder anywhere that hosts static files.

## Structure
```
index.html          page markup (hero, about, projects, skills, contact)
css/style.css       all styling; colours live in :root at the top
js/projects.js      PROJECTS array: edit this to add or change projects
js/main.js          interactions (reveal on scroll, parallax, cursor spotlight, menu, video)
assets/             photos (b&w hero, colour spotlight, mono about) + self-hosted IBM Plex fonts
```

## Editing projects
Open `js/projects.js` and add an object to `window.PROJECTS`:
```js
{ title: "New Project", desc: "One or two sentences.", tech: ["HTML","CSS"],
  repo: "https://github.com/byokz02/...", demo: "https://... or null",
  role: "Web app", art: "search" }   // art: energy | search | race | sheet | click
```
Rule Card is the featured project and lives directly in `index.html` (section `#projects`).

## Publish on GitHub Pages
1. Create a repo named `byokz02.github.io` (or any name).
2. Upload everything in this folder to the repo root.
3. Settings → Pages → Deploy from branch → `main` / root.
The site goes live at `https://byokz02.github.io/`.

## Notes
- The Rule Card video uses the Google Drive link; the file must stay shared as "Anyone with the link".
- Phone number and home address from the resume are intentionally left off the public site.
- Hero word: the big letters are in `index.html` inside the two `.hero__word` blocks (filled + outline copy). Change both to the same word.
