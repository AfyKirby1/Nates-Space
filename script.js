// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const layoutToggle = document.getElementById('layoutToggle');
const html = document.documentElement;
const mainGrid = document.querySelector('.main-grid');

// Check for saved theme preference
const savedTheme = localStorage.getItem('nateTheme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Check for saved layout preference
const savedLayout = localStorage.getItem('nateLayout') || 'left';
mainGrid.setAttribute('data-layout', savedLayout);
updateLayoutIcon(savedLayout);

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('nateTheme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.icon');
    if (theme === 'light') {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}

// Layout Toggle
layoutToggle.addEventListener('click', () => {
    const layouts = ['left', 'right', 'focus'];
    const currentLayout = mainGrid.getAttribute('data-layout') || 'left';
    const currentIndex = layouts.indexOf(currentLayout);
    const nextLayout = layouts[(currentIndex + 1) % layouts.length];

    mainGrid.setAttribute('data-layout', nextLayout);
    localStorage.setItem('nateLayout', nextLayout);
    updateLayoutIcon(nextLayout);
});

function updateLayoutIcon(layout) {
    const icon = layoutToggle.querySelector('.icon');
    if (layout === 'left') {
        // Left sidebar icon
        icon.innerHTML = '<rect x="3" y="3" width="7" height="18" rx="1"></rect><rect x="14" y="3" width="7" height="18" rx="1"></rect>';
    } else if (layout === 'right') {
        // Right sidebar icon (mirrored)
        icon.innerHTML = '<rect x="3" y="3" width="7" height="18" rx="1"></rect><rect x="14" y="3" width="7" height="18" rx="1" fill="currentColor"></rect>';
    } else {
        // Focus mode (single column)
        icon.innerHTML = '<rect x="6" y="3" width="12" height="18" rx="1"></rect>';
    }
}

// Simple like button interaction
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

console.log("🎤 Nate's Space loaded successfully!");
