# Nate's Space - Architecture

## Overview
Nate's Space is a static personal portfolio/social-style website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step - just push to GitHub Pages and it works.

## Project Structure

```
NatesSpace/
├── index.html          # Main HTML file - all markup
├── styles.css          # All styles including themes and responsive
├── script.js           # Theme toggle, layout toggle, interactions
├── .nojekyll           # Prevents Jekyll processing on GitHub Pages
├── README.md           # Quick start guide
├── DOCS/               # Documentation
│   ├── ARCHITECTURE.md # This file
│   ├── CHANGELOG.md    # Version history
│   ├── SBOM.md         # Dependencies (none!)
│   ├── SCRATCHPAD.md   # Active development notes
│   └── SUMMARY.md      # Project overview
└── assets/             # Media files
    ├── IMG_*.jpg       # Studio photos
    └── VID_*.mp4       # Video content
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
1. **Glass Panel** - Frosted glass effect with blur, used for all cards
2. **Profile Card** - Avatar, bio, stats, actions
3. **Gallery Grid** - 2x2 image grid with hover zoom
4. **Friends Grid** - 3x3 avatar grid
5. **Post Card** - Header, content, media, footer actions
6. **Composer** - Textarea with tool buttons
7. **Nav Bar** - Sticky top with logo and toggle buttons

### Layout Modes (Desktop)
1. **Left** - Sidebar left, feed right (default)
2. **Right** - Feed left, sidebar right
3. **Focus** - Feed only, no sidebar

### Breakpoints
- `≤900px` - Single column, hide layout toggle
- `≤600px` - Reduced padding/sizes
- `≤380px` - Stacked buttons for tiny screens

## Deployment
1. Push to GitHub
2. Enable GitHub Pages (main branch, root folder)
3. Site live at `https://username.github.io/NatesSpace/`

No build required. Just `git push`.
