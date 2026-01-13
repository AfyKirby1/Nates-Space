# 🎤 Nate's Space

A modern personal portfolio & social-style website. Pure HTML/CSS/JS - no frameworks, no build step!

![Version](https://img.shields.io/badge/version-1.0.0-00d4aa)
![No Dependencies](https://img.shields.io/badge/dependencies-0-success)

## ✨ Features

- 🎨 **Glassmorphism Design** - Frosted glass panels with animated gradient background
- 🌓 **Dark/Light Theme** - Toggle between modes, saved to localStorage
- 📱 **Mobile Responsive** - Looks great on any device
- �️ **Photo Gallery** - Showcase your studio shots
- 🎥 **Video Support** - Share recording sessions
- 👥 **Creative Circle** - Show off your connections
- 📝 **Feed Posts** - Social-style updates with likes, comments, shares

## 🚀 Quick Start

### Local Development
Just open `index.html` in your browser. That's it!

Or use a local server:
```bash
npx serve .
```

### Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/NatesSpace.git
git push -u origin main
```

Then go to **Settings → Pages → Source: main branch** and your site will be live!

## 📁 Structure

```
NatesSpace/
├── index.html          # Main page
├── styles.css          # All styles
├── script.js           # Theme & layout toggle
├── .nojekyll           # For GitHub Pages
├── assets/             # Images & videos
└── DOCS/               # Documentation
    ├── SUMMARY.md      # Project overview
    ├── CHANGELOG.md    # Version history
    ├── ARCHITECTURE.md # Technical docs
    ├── SBOM.md         # Dependencies
    └── SCRATCHPAD.md   # Dev notes
```

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --accent-color: #00d4aa;      /* Main accent */
  --accent-secondary: #00a8cc;  /* Secondary */
  --accent-tertiary: #7b61ff;   /* Tertiary */
}
```

### Content
Edit `index.html` to update:
- Profile info & bio
- Gallery images
- Feed posts
- Creative Circle friends

---

Made with 💜 in the studio
