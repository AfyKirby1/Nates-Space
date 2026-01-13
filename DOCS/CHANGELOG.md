# Nate's Space - Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-12

### Added
- Initial release of Nate's Space - a pure HTML/CSS/JS personal portfolio site
- **Profile Card** with avatar image, status indicator, bio, and action buttons
- **Studio Gallery** with 4 images in a 2x2 grid
- **Creative Circle** friends section with 6 connections (Deez Nuts, Ryan, Nick the Painter, Jay, Sam, Jordan)
- **Post Composer** for sharing updates
- **Feed Posts** including:
  - "Off to the Engineer!" - track sent for mixing/mastering
  - "Recording Session" - video post with studio recording
  - "Studio Vibes Today" - photo post
  - "Late Night Session" - text update
  - "Behind the Scenes" - photo post
- **Theme Toggle** - Dark/Light mode with localStorage persistence
- **Layout Toggle** - Left sidebar, Right sidebar, Focus mode (desktop only)
- **Glassmorphism Design** with animated gradient background
- **Mobile Responsive** design with simplified single-column layout
- Cache-busting version parameters for CSS/JS files

### Technical
- Pure HTML5, CSS3, JavaScript (no frameworks, no build step)
- Google Fonts: Outfit & Space Mono
- CSS custom properties for theming
- SVG icons inline
- localStorage for theme and layout persistence

### Mobile Optimizations
- Layout toggle hidden on mobile (≤900px)
- Single-column forced layout
- Dynamic viewport height (100dvh)
- Overscroll behavior disabled
- Extended background to prevent gap on scroll
