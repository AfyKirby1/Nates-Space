# Nate's Space - Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-01-14

### Added
- **Animated Brand Logo**: Added a gradient "shine" animation to the "NATE'S SPACE" logo in the navigation bar.
- **Mobile UI Refinements**:
  - Reduced size of "Creative Circle" bubbles and "Studio Gallery" thumbnails on mobile for better space utilization.
  - Adjusted `object-position` for post preview images to highlight the top-center (artist/focus area) on portrait screens.
  - Implemented automatic layout adjustments for the image lightbox on mobile (stacked view).
- **Content**:
  - Added new EP track: **"Dark Spaces"** (WAV) to all music players.

### Fixed
- **Mobile Video Player**: Centered the video play button overlay across all mobile aspect ratios.
- **Image Lightbox**: Adjusted the details/comments section to be a scrollable "bottom sheet" on mobile, preventing it from pushing the main image off-screen.
- **Asset Caching**: Incremented asset versions to `v100` to force cache refreshes on live deployments.

---

## [1.0.0] - 2026-01-12

### Added
- Initial release of Nate's Space - a pure HTML/CSS/JS personal portfolio site.
- **Profile Card** with avatar image, status indicator, bio, and action buttons.
- **Studio Gallery** with 4 images in a 2x2 grid.
- **Creative Circle** friends section with 6 connections.
- **Post Composer** (UI only) for sharing updates.
- **Feed Posts** (Video, Photo, Update types) with dynamic glassmorphism styling.
- **Theme Toggle** - Dark/Light mode with localStorage persistence.
- **Layout Toggle** - Left sidebar, Right sidebar, Focus mode (desktop only).
- **Image Lightbox (Facebook-style)**:
  - Two-column desktop layout (Image Left / Details Right).
  - Keyboard navigation and dynamic metadata injection.
- **Apple Music Integration**: Embedded tracks via a dedicated modal player.

### Technical
- Pure HTML5, CSS3, JavaScript (no frameworks).
- Google Fonts: Outfit & Space Mono.
- CSS custom properties for theming.
- SVG icons inline.
