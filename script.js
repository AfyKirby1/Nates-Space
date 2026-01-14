// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const layoutToggle = document.getElementById('layoutToggle');
const html = document.documentElement;
const mainGrid = document.querySelector('.main-grid');

// ===== RENDER CONTENT FROM DATA =====
const contentArea = document.querySelector('.content-area');

function renderPosts() {
    // Keep the focus music player and composer
    const focusPlayerContext = document.getElementById('focusMusicPlayer');
    const composerContext = document.querySelector('.composer');

    // Clear everything else (existing static posts)
    // We need to be careful not to remove the top elements if we just append
    // Strategy: Remove all article.post elements first
    document.querySelectorAll('article.post').forEach(el => el.remove());

    const posts = NatesData.posts;

    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'glass-panel post scroll-reveal'; // Add scroll-reveal class immediately

        let mediaHtml = '';
        if (post.media) {
            if (post.media.type === 'video') {
                mediaHtml = `
                    <div class="media-container video-container">
                        <video poster="${post.media.poster}">
                            <source src="${post.media.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>`;
            } else if (post.media.type === 'image') {
                mediaHtml = `
                    <div class="media-container">
                        <img src="${post.media.src}" alt="${post.media.alt}">
                        <div class="image-overlay">
                            <span>👁️ ${Math.floor(Math.random() * 2000) + 500} views</span>
                        </div>
                    </div>`;
            }
        }

        let tagClass = post.type === 'video' ? 'video' : (post.type === 'photo' ? 'photo' : 'update');
        let tagLabel = post.type.charAt(0).toUpperCase() + post.type.slice(1);

        article.innerHTML = `
            <header class="post-header">
                <div class="post-meta">
                    <h2>${post.title}</h2>
                    <span class="timestamp">${post.timestamp}</span>
                </div>
                <span class="tag ${tagClass}">${tagLabel}</span>
            </header>
            <div class="post-content">
                <p>${post.content}</p>
                ${mediaHtml}
            </div>
            <footer class="post-footer">
                <button class="action-btn">❤️ ${post.stats.likes}</button>
                <button class="action-btn">💬 ${post.stats.comments}</button>
                <button class="action-btn">🔖 Save</button>
                <button class="action-btn">↗️ Share</button>
            </footer>
        `;

        contentArea.appendChild(article);

        // If it's a video, re-initialize the play button
        if (post.media && post.media.type === 'video') {
            initVideoPost(article);
        }
    });

    // Re-observe for scroll reveal
    const newPosts = document.querySelectorAll('.post');
    if (typeof revealObserver !== 'undefined') {
        newPosts.forEach(el => revealObserver.observe(el));
    }
}

function initVideoPost(article) {
    const video = article.querySelector('video');
    if (!video) return;

    video.removeAttribute('controls');
    const playOverlay = document.createElement('div');
    playOverlay.className = 'video-play-overlay';
    video.parentElement.appendChild(playOverlay);

    video.parentElement.addEventListener('click', () => {
        openVideoModal(video);
    });
}

// Render immediately
// Initial Render moved to end of file to ensure observers are ready

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
const heroSection = document.querySelector('.hero-section');

layoutToggle.addEventListener('click', () => {
    const layouts = ['left', 'right', 'focus'];
    const currentLayout = mainGrid.getAttribute('data-layout') || 'left';
    const currentIndex = layouts.indexOf(currentLayout);
    const nextLayout = layouts[(currentIndex + 1) % layouts.length];

    mainGrid.setAttribute('data-layout', nextLayout);
    localStorage.setItem('nateLayout', nextLayout);
    updateLayoutIcon(nextLayout);
    updateHeroVisibility(nextLayout);
});

function updateLayoutIcon(layout) {
    if (!layoutToggle) return;
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

function updateHeroVisibility(layout) {
    if (heroSection) {
        heroSection.style.display = layout === 'focus' ? 'block' : 'none';
    }
    // Also toggle focus music player visibility
    const focusMusicPlayer = document.getElementById('focusMusicPlayer');
    if (focusMusicPlayer) {
        focusMusicPlayer.classList.toggle('visible', layout === 'focus');
    }
}

// Set initial hero visibility
// Set initial hero visibility
updateHeroVisibility(savedLayout);

// Simple like button interaction
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// ===== MUSIC PLAYER =====
const audioPlayer = document.getElementById('audioPlayer');
const tracks = document.querySelectorAll('.track');
const progressBar = document.querySelector('.progress-bar');
const progressFill = document.querySelector('.progress-fill');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const volumeSlider = document.querySelector('.volume-slider');
const volumeIcon = document.querySelector('.volume-icon');

let currentTrack = null;
let isPlaying = false;

// Set initial volume
audioPlayer.volume = 0.8;

// Format time in M:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update progress bar
function updateProgress() {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

// Play a track
function playTrack(trackElement) {
    const src = trackElement.dataset.src;

    // If clicking the same track that's playing, toggle pause
    if (currentTrack === trackElement && isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        trackElement.classList.remove('playing');
        trackElement.querySelector('.track-play-btn').textContent = '▶';
        return;
    }

    // Remove playing state from all tracks
    tracks.forEach(t => {
        t.classList.remove('playing', 'active');
        t.querySelector('.track-play-btn').textContent = '▶';
    });

    // Set new track
    trackElement.classList.add('active', 'playing');
    trackElement.querySelector('.track-play-btn').textContent = '⏸';
    currentTrack = trackElement;

    // Load and play
    audioPlayer.src = src;
    audioPlayer.play();
    isPlaying = true;
}

// Track click handlers
tracks.forEach(track => {
    track.addEventListener('click', () => playTrack(track));
});

// Audio events
audioPlayer.addEventListener('timeupdate', updateProgress);

audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('ended', () => {
    // Play next track or stop
    const trackArray = Array.from(tracks);
    const currentIndex = trackArray.indexOf(currentTrack);
    const nextIndex = (currentIndex + 1) % trackArray.length;

    if (nextIndex !== 0) {
        playTrack(trackArray[nextIndex]);
    } else {
        // Ended, reset
        isPlaying = false;
        currentTrack.classList.remove('playing');
        currentTrack.querySelector('.track-play-btn').textContent = '▶';
        progressFill.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    }
});

// Click on progress bar to seek
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    audioPlayer.volume = volume;
    updateVolumeIcon(volume);
});

function updateVolumeIcon(volume) {
    if (volume === 0) {
        volumeIcon.textContent = '🔇';
    } else if (volume < 0.5) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }
}

// Mute toggle
volumeIcon.addEventListener('click', () => {
    if (audioPlayer.volume > 0) {
        audioPlayer.dataset.prevVolume = audioPlayer.volume;
        audioPlayer.volume = 0;
        volumeSlider.value = 0;
        updateVolumeIcon(0);
    } else {
        const prevVol = parseFloat(audioPlayer.dataset.prevVolume) || 0.8;
        audioPlayer.volume = prevVol;
        volumeSlider.value = prevVol * 100;
        updateVolumeIcon(prevVol);
    }
});

// ===== MOBILE PLAYER =====
const mobilePlayer = document.getElementById('mobilePlayer');
const mobilePlayerBar = document.getElementById('mobilePlayerBar');
const mobilePlayerExpanded = document.getElementById('mobilePlayerExpanded');
const mobilePlayBtn = document.getElementById('mobilePlayBtn');
const expandedPlayBtn = document.getElementById('expandedPlayBtn');
const collapseBtn = document.getElementById('collapseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const mobileProgressBar = document.getElementById('mobileProgressBar');
const mobileProgressFill = document.getElementById('mobileProgressFill');
const mobileTrackItems = document.querySelectorAll('.mobile-track-item');

const trackSources = [
    'assets/music/Akward Moments Natee V2 (M).mp3',
    'assets/music/Natee 730 PM V1 (M).m4a',
    'assets/music/Dark Spaces Natee  V2.m4a'
];

const trackNames = ['Awkward Moments', '7:30 PM', 'Dark Spaces'];

// Expand player when tapping the bar (not the play button)
mobilePlayerBar.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-play-btn')) {
        mobilePlayerExpanded.classList.add('active');
    }
});

// Collapse player
collapseBtn.addEventListener('click', () => {
    mobilePlayerExpanded.classList.remove('active');
});

// Mobile play button
mobilePlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobilePlay();
});

expandedPlayBtn.addEventListener('click', () => {
    toggleMobilePlay();
});

function toggleMobilePlay() {
    if (!currentTrack && tracks.length > 0) {
        // Play first track if none selected
        playTrack(tracks[0]);
    } else if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        updateMobilePlayButtons('▶');
        if (currentTrack) {
            currentTrack.classList.remove('playing');
            currentTrack.querySelector('.track-play-btn').textContent = '▶';
        }
    } else {
        audioPlayer.play();
        isPlaying = true;
        updateMobilePlayButtons('⏸');
        if (currentTrack) {
            currentTrack.classList.add('playing');
            currentTrack.querySelector('.track-play-btn').textContent = '⏸';
        }
    }
}

function updateMobilePlayButtons(symbol) {
    mobilePlayBtn.textContent = symbol;
    expandedPlayBtn.textContent = symbol;
}

// Update mobile player UI when track changes
function updateMobilePlayerUI(trackName) {
    document.querySelector('.mobile-track-name').textContent = trackName;
    document.querySelector('.expanded-track-name').textContent = trackName;

    // Update mobile tracklist active state
    const trackIndex = trackNames.indexOf(trackName);
    mobileTrackItems.forEach((item, i) => {
        item.classList.toggle('active', i === trackIndex);
    });
}

// Sync progress with mobile player
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        mobileProgressFill.style.width = percent + '%';
        document.querySelector('.mobile-current-time').textContent = formatTime(audioPlayer.currentTime);
    }
});

audioPlayer.addEventListener('loadedmetadata', () => {
    document.querySelector('.mobile-duration').textContent = formatTime(audioPlayer.duration);
});

// Mobile progress bar seek
mobileProgressBar.addEventListener('click', (e) => {
    const rect = mobileProgressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Prev/Next buttons
prevBtn.addEventListener('click', () => {
    const trackArray = Array.from(tracks);
    const currentIndex = trackArray.indexOf(currentTrack);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : trackArray.length - 1;
    playTrack(trackArray[prevIndex]);
});

nextBtn.addEventListener('click', () => {
    const trackArray = Array.from(tracks);
    const currentIndex = trackArray.indexOf(currentTrack);
    const nextIndex = (currentIndex + 1) % trackArray.length;
    playTrack(trackArray[nextIndex]);
});

// Mobile track list click
mobileTrackItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (tracks[index]) {
            playTrack(tracks[index]);
        }
    });
});

// Override playTrack to also update mobile UI
const originalPlayTrack = playTrack;
playTrack = function (trackElement) {
    originalPlayTrack(trackElement);
    const trackIndex = Array.from(tracks).indexOf(trackElement);
    if (trackIndex >= 0) {
        updateMobilePlayerUI(trackNames[trackIndex]);
        updateMobilePlayButtons('⏸');
    }
};

// Sync play state when audio ends
audioPlayer.addEventListener('play', () => {
    updateMobilePlayButtons('⏸');
});

audioPlayer.addEventListener('pause', () => {
    updateMobilePlayButtons('▶');
});

console.log("🎤 Nate's Space loaded successfully!");

// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray;
let animationId;

// Resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#00d4aa'; // Accent color

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initParticles();
});

initParticles();
animateParticles();


// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.post, .gallery-panel, .friends-panel');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // Reveal only once
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

// Add class and observe existing elements
revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
});


// ===== FOCUS MODE MUSIC PLAYER =====
const focusTracks = document.querySelectorAll('.focus-track');
const focusProgressBar = document.querySelector('.focus-progress-bar');
const focusProgressFill = document.querySelector('.focus-progress-fill');
const focusCurrentTimeEl = document.querySelector('.focus-current-time');
const focusDurationEl = document.querySelector('.focus-duration');

// Focus track click handlers
focusTracks.forEach((focusTrack, index) => {
    focusTrack.addEventListener('click', () => {
        // Get the corresponding sidebar track and play it
        const sidebarTracks = document.querySelectorAll('.track');
        if (sidebarTracks[index]) {
            playTrack(sidebarTracks[index]);
            // Update focus track UI
            updateFocusPlayerUI(index);
        }
    });
});

function updateFocusPlayerUI(activeIndex) {
    focusTracks.forEach((track, i) => {
        track.classList.toggle('active', i === activeIndex);
        track.classList.toggle('playing', i === activeIndex && isPlaying);
        const btn = track.querySelector('.focus-track-btn');
        if (btn) btn.textContent = (i === activeIndex && isPlaying) ? '⏸' : '▶';
    });
}

// Sync focus player progress by hooking into the existing timeupdate event
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration && focusProgressFill && focusCurrentTimeEl) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        focusProgressFill.style.width = percent + '%';
        focusCurrentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
});

// Update focus player duration
audioPlayer.addEventListener('loadedmetadata', () => {
    if (focusDurationEl) {
        focusDurationEl.textContent = formatTime(audioPlayer.duration);
    }
});

// Focus progress bar seek
if (focusProgressBar) {
    focusProgressBar.addEventListener('click', (e) => {
        const rect = focusProgressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.currentTime = percent * audioPlayer.duration;
    });
}

// Update focus player when track changes
audioPlayer.addEventListener('play', () => {
    const trackIndex = Array.from(document.querySelectorAll('.track')).indexOf(currentTrack);
    if (trackIndex >= 0) updateFocusPlayerUI(trackIndex);
});

audioPlayer.addEventListener('pause', () => {
    focusTracks.forEach(track => {
        track.classList.remove('playing');
        const btn = track.querySelector('.focus-track-btn');
        if (btn) btn.textContent = '▶';
    });
    updateHeroPlayButton(false);
});

audioPlayer.addEventListener('play', () => {
    updateHeroPlayButton(true);
});

// ===== HERO PLAY ALL BUTTON =====
const heroPlayAllBtn = document.getElementById('heroPlayAllBtn');

if (heroPlayAllBtn) {
    heroPlayAllBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
        } else {
            if (currentTrack) {
                audioPlayer.play();
            } else if (tracks.length > 0) {
                playTrack(tracks[0]);
            }
        }
    });
}

function updateHeroPlayButton(isPlaying) {
    if (heroPlayAllBtn) {
        heroPlayAllBtn.textContent = isPlaying ? '⏸ Pause All' : '▶ Play All';
    }
}

// ===== SOCIAL MODAL =====
const socialModal = document.getElementById('socialModal');
const closeModalBtn = document.getElementById('closeModal');
const followBtns = document.querySelectorAll('.follow-btn');

function openModal() {
    socialModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    socialModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Add click event to all follow buttons
followBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default button behavior
        openModal();
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === socialModal) {
        closeModal();
    }
});

// ===== APPLE MUSIC MODAL =====
const appleMusicModal = document.getElementById('appleMusicModal');
const closeAppleModalBtn = document.getElementById('closeAppleModal');
const appleMusicToggles = document.querySelectorAll('.apple-toggle');

function openAppleModal() {
    appleMusicModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAppleModal() {
    appleMusicModal.classList.remove('active');
    document.body.style.overflow = '';
}

appleMusicToggles.forEach(btn => {
    btn.addEventListener('click', openAppleModal);
});

if (closeAppleModalBtn) {
    closeAppleModalBtn.addEventListener('click', closeAppleModal);
}

// Close when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === appleMusicModal) {
        closeAppleModal();
    }
});

// ===== IMAGE LIGHTBOX MODAL (Facebook-style) =====
const imageModal = document.getElementById('imageModal');
const closeImageModalBtn = document.getElementById('closeImageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalQuote = document.getElementById('modalQuote');
const modalTimestamp = document.getElementById('modalTimestamp');
const modalTag = document.getElementById('modalTag');
const modalViews = document.getElementById('modalViews');
const modalLikeCount = document.getElementById('modalLikeCount');
const modalCommentCount = document.getElementById('modalCommentCount');
const modalDownloadBtn = document.getElementById('modalDownloadBtn');
const prevImageBtn = document.getElementById('prevImage');
const nextImageBtn = document.getElementById('nextImage');

// Collect all clickable images (posts + gallery)
let allImages = [];
let currentImageIndex = 0;

function collectImages() {
    allImages = [];

    // Get images from posts
    document.querySelectorAll('.post .media-container img').forEach(img => {
        const post = img.closest('.post');
        if (post) {
            const titleEl = post.querySelector('.post-meta h2');
            const quoteEl = post.querySelector('.post-content > p');
            const timestampEl = post.querySelector('.timestamp');
            const tagEl = post.querySelector('.tag');
            const viewsEl = post.querySelector('.image-overlay span');
            const likeBtn = post.querySelector('.action-btn:first-child');
            const commentBtn = post.querySelector('.action-btn:nth-child(2)');

            allImages.push({
                src: img.src,
                alt: img.alt,
                title: titleEl ? titleEl.textContent : 'Photo',
                quote: quoteEl ? quoteEl.textContent : '',
                timestamp: timestampEl ? timestampEl.textContent : 'Just now',
                tag: tagEl ? tagEl.textContent : 'Photo',
                views: viewsEl ? viewsEl.textContent : '',
                likes: likeBtn ? likeBtn.textContent.replace('❤️', '').trim() : '0',
                comments: commentBtn ? commentBtn.textContent.replace('💬', '').trim() : '0'
            });
        }
    });

    // Get images from gallery
    document.querySelectorAll('.gallery-panel .gallery-item img').forEach((img, index) => {
        allImages.push({
            src: img.src,
            alt: img.alt,
            title: 'Studio Gallery',
            quote: 'Behind the scenes from the studio sessions. The creative space where the magic happens. 🎤✨',
            timestamp: 'Gallery',
            tag: 'Gallery',
            views: '👁️ ' + (Math.floor(Math.random() * 1000) + 500) + ' views',
            likes: String(Math.floor(Math.random() * 200) + 100),
            comments: String(Math.floor(Math.random() * 50) + 10)
        });
    });
}

function openImageModal(index) {
    if (index < 0 || index >= allImages.length) return;

    currentImageIndex = index;
    const imageData = allImages[index];

    // Set image
    modalImage.src = imageData.src;
    modalImage.alt = imageData.alt;

    // Set details
    modalTitle.textContent = imageData.title;
    modalQuote.textContent = imageData.quote;
    modalTimestamp.textContent = imageData.timestamp;
    modalTag.textContent = imageData.tag;
    modalViews.innerHTML = `<span>${imageData.views || '👁️ View'}</span>`;
    modalLikeCount.textContent = imageData.likes;
    modalCommentCount.textContent = imageData.comments;

    // Show/hide views if empty
    modalViews.style.display = imageData.views ? 'block' : 'none';

    // Update navigation buttons
    updateNavButtons();

    // Show modal
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateNavButtons() {
    prevImageBtn.disabled = currentImageIndex <= 0;
    nextImageBtn.disabled = currentImageIndex >= allImages.length - 1;
}

function showPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        openImageModal(currentImageIndex);
    }
}

function showNextImage() {
    if (currentImageIndex < allImages.length - 1) {
        currentImageIndex++;
        openImageModal(currentImageIndex);
    }
}

// Event Listeners for Image Modal
if (closeImageModalBtn) {
    closeImageModalBtn.addEventListener('click', closeImageModal);
}

if (prevImageBtn) {
    prevImageBtn.addEventListener('click', showPrevImage);
}

if (nextImageBtn) {
    nextImageBtn.addEventListener('click', showNextImage);
}

// Download Button
if (modalDownloadBtn) {
    modalDownloadBtn.addEventListener('click', (e) => {
        // Create temporary link
        const link = document.createElement('a');
        link.href = modalImage.src;

        // Extract filename from path or generate one
        const filename = modalImage.src.split('/').pop() || `nate-space-image-${Date.now()}.jpg`;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Visual feedback
        showToast('Image downloaded successfully!', '⬇️');
    });
}

// Close when clicking the overlay background
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal || e.target.classList.contains('image-modal-image-section')) {
        closeImageModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (imageModal.classList.contains('active')) {
        if (e.key === 'Escape') closeImageModal();
        else if (e.key === 'ArrowLeft') showPrevImage();
        else if (e.key === 'ArrowRight') showNextImage();
    }

    // Video Modal keys
    if (videoModal && videoModal.classList.contains('active')) {
        if (e.key === 'Escape') closeVideoModal();
    }
});

// Add click handlers to post images
document.querySelectorAll('.post .media-container img').forEach(img => {
    img.addEventListener('click', () => {
        collectImages();
        const index = allImages.findIndex(item => item.src === img.src);
        if (index !== -1) {
            openImageModal(index);
        }
    });
});

// Add click handlers to gallery images
document.querySelectorAll('.gallery-panel .gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        collectImages();
        const index = allImages.findIndex(item => item.src === img.src);
        if (index !== -1) {
            openImageModal(index);
        }
    });
});

// ===== VIDEO MODAL LOGIC =====
const videoModal = document.getElementById('videoModal');
const closeVideoModalBtn = document.getElementById('closeVideoModal');
const modalVideo = document.getElementById('modalVideo');
const videoModalTitle = document.getElementById('videoModalTitle');
const videoModalQuote = document.getElementById('videoModalQuote');
const videoModalTimestamp = document.getElementById('videoModalTimestamp');
const videoModalLikeCount = document.getElementById('videoModalLikeCount');
const videoModalCommentCount = document.getElementById('videoModalCommentCount');

// Video Init is now handled by renderPosts()
// But we might need re-init if static HTML exists (for fallback)
// Leaving fallback logic if strictly needed, but better to rely on renderPosts for consistency.

function openVideoModal(sourceVideo) {
    const post = sourceVideo.closest('.post');
    if (!post) return;

    // Get Metadata
    const titleEl = post.querySelector('.post-meta h2');
    const quoteEl = post.querySelector('.post-content > p');
    const timestampEl = post.querySelector('.timestamp');
    const likeBtn = post.querySelector('.action-btn:first-child');
    const commentBtn = post.querySelector('.action-btn:nth-child(2)');
    const sourceSrc = sourceVideo.querySelector('source').src;

    // Set Modal Content
    modalVideo.src = sourceSrc;
    videoModalTitle.textContent = titleEl ? titleEl.textContent : 'Video';
    videoModalQuote.textContent = quoteEl ? quoteEl.textContent : '';
    videoModalTimestamp.textContent = timestampEl ? timestampEl.textContent : 'Just now';
    videoModalLikeCount.textContent = likeBtn ? likeBtn.textContent.replace('❤️', '').trim() : '0';
    videoModalCommentCount.textContent = commentBtn ? commentBtn.textContent.replace('💬', '').trim() : '0';

    // Show Modal
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Play Video
    modalVideo.play().catch(e => console.log("Auto-play prevented:", e));
}

function closeVideoModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = ""; // Clear src to stop buffering
}

if (closeVideoModalBtn) {
    closeVideoModalBtn.addEventListener('click', closeVideoModal);
}

// Close when clicking outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal || e.target.classList.contains('image-modal-image-section')) {
            closeVideoModal();
        }
    });
}

// ===== SWIPE GESTURES FOR LIGHTBOX =====
let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50;

if (imageModal) {
    imageModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    imageModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
            // Right Swipe -> Previous
            showPrevImage();
        } else {
            // Left Swipe -> Next
            showNextImage();
        }
    }
}

console.log("📸 Image & 🎥 Video lightboxes initialized!");

// ===== TOAST NOTIFICATION LOGIC =====
const toastContainer = document.getElementById('toastContainer');

function showToast(message, icon = '✨', duration = 3000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <div class="toast-progress" style="animation-duration: ${duration}ms"></div>
    `;

    toastContainer.appendChild(toast);

    // Remove after duration
    setTimeout(() => {
        toast.classList.add('hiding');
        toast.addEventListener('animationend', () => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        });
    }, duration);
}

// Hook up Share Buttons (globally)
document.addEventListener('click', (e) => {
    // Handle Save Button (Generic)
    if (e.target.closest('.action-btn') && e.target.closest('.action-btn').textContent.includes('Save')) {
        const btn = e.target.closest('.action-btn');
        // Simple visual feedback + Toast
        showToast('Saved to your collection!', '🔖');
    }

    // Handle Share Button (Generic)
    if (e.target.closest('.action-btn') && e.target.closest('.action-btn').textContent.includes('Share')) {
        const btn = e.target.closest('.action-btn');
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link copied to clipboard!', '🔗');
        });
    }
});

// ===== INITIALIZE CONTENT =====
if (typeof NatesData !== 'undefined') {
    renderPosts();
} else {
    console.warn("NatesData not found. Using static HTML fallback.");
}
