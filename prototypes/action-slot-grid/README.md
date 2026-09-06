# Action Slot Grid Prototype

Interactive prototype exploring how resting and hover action slots can be positioned within grid cells. Built with React 18 and Fluent UI v2.

## Features

- **Preset configurations** — Three curated presets (Pure aesthetics, Discovery + some aesthetics, Pure usability) with descriptions explaining the trade-offs
- **Configurable action alignment** — Control hover and resting action positioning (inline, left-edge, right-edge) independently for left-aligned and right-aligned cells
- **Modification tracking** — Visual indicator when a preset has been manually modified, with one-click reset
- **Hide resting actions** — Toggle to show/hide resting-state actions
- **Realistic mock data** — 18 campaign rows with varying content lengths, action counts, and statuses

## Usage

Open `index.html` in a browser. No build step or server required — all dependencies load from CDNs.

## Tech Stack

- React 18 (via esm.sh CDN)
- Fluent UI React Components v9 (via esm.sh CDN)
- Fluent UI React Icons (via esm.sh CDN)
- Babel Standalone (for in-browser JSX compilation)
