# Nate's Space - Security Bill of Materials (SBOM)

## Overview
This project is built using a **zero npm dependency** philosophy for the production site. It is a static pure HTML/CSS/JS application.

## External Resources (Trusted CDNs)

| Resource | Type | Provider | Domain | Last Verified |
|----------|------|----------|--------|---------------|
| Outfit Font | Typography | Google Fonts | fonts.googleapis.com | 2026-01-14 |
| Space Mono Font | Typography | Google Fonts | fonts.googleapis.com | 2026-01-14 |

## Local Media Assets

### Images
| File | Type | Purpose |
|------|------|---------|
| `assets/IMG_20260112_193737.jpg` | JPG | Primary Avatar / Profile Image |
| `assets/IMG_20260112_194122.jpg` | JPG | Gallery Image #1 / Video Poster |
| `assets/IMG_20260112_194124.jpg` | JPG | Gallery Image #2 / Hero Background |
| `assets/IMG_20260112_194126.jpg` | JPG | Gallery Image #3 |

### Video
| File | Type | Purpose |
|------|------|---------|
| `assets/VID_20260112_193751.mp4` | MP4 | Studio Recording Feed Post |

### Audio (The EP)
| File | Type | Track Name |
|------|------|------------|
| `assets/music/Akward Moments Natee V2 (M).mp3` | MP3 | Awkward Moments |
| `assets/music/Natee 730 PM V1 (M).m4a` | M4A | 7:30 PM |
| `assets/music/Dark Spaces Natee  V2.m4a` | M4A | Dark Spaces |

## Development Tools
- `convert.js`: Uses `heic-convert` (dev-only) to transcode HEIC images to JPG for browser compatibility. Not deployed to production.

## Security Audit
- **Attack Surface**: Extremely minimal. No server-side processing, no database, no active sessions.
- **Privacy**: No external trackers (Google Analytics, etc.) are implemented.
- **Data Persistence**: `localStorage` is used exclusively for theme and layout preferences.
- **Dependencies**: 0 production dependencies.

## Audit Status
✅ **Clean** - No vulnerabilities found (2026-01-14)
