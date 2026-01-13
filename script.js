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
    'assets/music/Natee 730 PM V1 (M).m4a'
];

const trackNames = ['Awkward Moments', '7:30 PM'];

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
const appleMusicToggle = document.getElementById('appleMusicToggle');

function openAppleModal() {
    appleMusicModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAppleModal() {
    appleMusicModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (appleMusicToggle) {
    appleMusicToggle.addEventListener('click', openAppleModal);
}

if (closeAppleModalBtn) {
    closeAppleModalBtn.addEventListener('click', closeAppleModal);
}

// Close when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === appleMusicModal) {
        closeAppleModal();
    }
});

