# Nate's Space - Architecture

## Overview
Nate's Space is a static personal portfolio/social-style website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step - just push to GitHub Pages and it works.

## Project Structure

```
NatesSpace/
├── index.html          # Main HTML file - all markup
├── styles.css          # All styles including themes and responsive
├── script.js           # Interactions (Theming, Layouts, Lightbox, Audio)
├── .nojekyll           # Prevents Jekyll processing on GitHub Pages
├── convert.js          # (Dev) HEIC to JPG conversion script
├── README.md           # Quick start guide
└── DOCS/               # Documentation
    ├── ARCHITECTURE.md # This file
    ├── CHANGELOG.md    # Version history
    ├── SBOM.md         # Assets and Security BOM
    ├── SCRATCHPAD.md   # Active development notes
    ├── SUMMARY.md      # Project status tracking
    └── My_Thoughts.md  # Internal developer log
```

## Design System

### Color Palette
| Variable | Dark Mode | Light Mode |
|----------|-----------|------------|
| `--bg-primary` | `#0a0a0f` | `#f5f7fa` |
| `--bg-glass` | `rgba(15,15,20,0.7)` | `rgba(255,255,255,0.8)` |
| `--accent-color` | `#00d4aa` (teal) | same |
| `--accent-secondary` | `#00a8cc` (cyan) | same |
| `--accent-tertiary` | `#7b61ff` (purple) | same |

### Typography
- **Headings/Body**: Outfit (Google Fonts)
- **Logo/Mono**: Space Mono (Google Fonts)

### Components
1. **Glass Panel** - Frosted glass effect with blur, used for all containers.
2. **Profile Card/Hero** - Desktop uses a sidebar card; Mobile uses a top hero section with background image.
3. **Gallery Grid** - Interactive image grid with lightbox triggers.
4. **Friends Grid (Creative Circle)** - Bubble-style avatars with hover effects.
5. **Post Card** - Multi-type posts (Photo, Video, Update) with glassmorphism styling.
6. **Image Lightbox (Facebook-style)**:
   - Shared modal for all images.
   - Desktop: Two-column split (Image / Social Data).
   - Mobile: Vertical stack (Image / Bottom Sheet metadata).
7. **Music Player**:
   - Desktop: Sidebar mini-player + Apple Music Modal.
   - Mobile: Persistent bottom bar (Spotify-style) with expanded tracklist view.

### Layout & Logic
- **Layout Toggles**: Desktop supports swapping sidebars or entering "Focus" mode (centered feed).
- **Responsive Logic**: Media queries handle the transition from a 2-column desktop layout to a 1-column mobile stack. Mobile hides the layout toggle as it's not applicable.
- **Cache Busting**: Manual version numbers in `index.html` (e.g., `?v=100`) ensure CSS/JS updates propagate immediately.

## Deployment
1. Push to GitHub.
2. Enable GitHub Pages (main branch, root folder).
3. Site live at `https://[username].github.io/NatesSpace/`.

No build required. Just `git push`.
