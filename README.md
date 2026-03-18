# Access Manager

A static web app for managing door access groups. Users log in with a password and can view which doors belong to which access groups — either as a categorized list or a swimlane board.

The site is published via [GitHub Pages](https://shakypizza.github.io/AccessManager/src/login.html). If you receive a 404 error, ensure the URL uses the exact repository name with correct capitalization.

## Features

- **Password-protected login** — SHA-256 hashed password checked client-side via the Web Crypto API.
- **Group selector** — assign up to three door groups and see color-coded indicators on each door.
- **List view** — doors categorized into tiers (A only, A+B, A+B+C) with group color indicators.
- **Swimlane view** — card-based board organized by access tier with toggleable group filter chips.
- **Design system** — shared design tokens (`tokens.css`, `tokens.json`) for consistent colors and spacing.

## Project Structure

```
docs/
  index.html          # Redirect to login
  design-system/
    index.html        # Design token reference page
    tokens.css        # CSS custom properties
    tokens.json       # Token values as JSON
  src/
    login.html        # Login page
    login.js          # Password hashing and auth
    index.html        # Main app (list + swimlane views)
    app.js            # Tab switching, list view, swimlane view
    styles.css        # App styles
    updateColor.js    # Utility: set background color with fallback
    data/
      groups.js       # Group definitions (label, value, color)
      Doorlist.js     # Door definitions (label, groups)
tests/
  app.test.js         # Jest unit tests
```

## Running Tests

```bash
npm install
npm test
```

Tests use [Jest](https://jestjs.io/) with ES module support (`--experimental-vm-modules`).

## Local Development

No build step required. Open `docs/src/login.html` directly in a browser, or serve the `docs/` directory with any static file server:

```bash
npx serve docs
```
