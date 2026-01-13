# Nate's Space - Security Bill of Materials (SBOM)

## Overview
This project uses **zero npm dependencies**. It's pure HTML/CSS/JS.

## External Resources

| Resource | Type | Source | CDN | Last Verified |
|----------|------|--------|-----|---------------|
| Outfit Font | Font | Google Fonts | fonts.googleapis.com | 2026-01-12 |
| Space Mono Font | Font | Google Fonts | fonts.googleapis.com | 2026-01-12 |

## CDN Integrity
Google Fonts are loaded via their official CDN and are considered trusted.

## Local Assets

| File | Type | Size | Notes |
|------|------|------|-------|
| `assets/IMG_20260112_193737.jpg` | Image | - | Profile/gallery photo |
| `assets/IMG_20260112_194122.jpg` | Image | - | Studio shot 1 |
| `assets/IMG_20260112_194124.jpg` | Image | - | Studio shot 2 |
| `assets/IMG_20260112_194126.jpg` | Image | - | Studio shot 3 |
| `assets/VID_20260112_193751.mp4` | Video | - | Recording session |

## Development Dependencies
None. This is a static site with no build process.

## Security Notes
- No JavaScript frameworks = minimal attack surface
- No npm packages = no supply chain vulnerabilities  
- All scripts are first-party inline
- localStorage used for preferences (non-sensitive)
- No cookies or external tracking
- No user input processed server-side (static site)

## Audit Status
✅ **Clean** - No known vulnerabilities (2026-01-12)
