document.addEventListener("DOMContentLoaded", () => {
    // Initialize Particles.js for dreamy glowing particles
    particlesJS("particles-js", {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: ["#ffffff", "#ffd1dc", "#e6e6fa", "#d4af37"] },
            shape: {
                type: ["circle", "star"],
                stroke: { width: 0, color: "#000000" },
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 4,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: { enable: false },
            move: {
                enable: true,
                speed: 1,
                direction: "top",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "bubble" },
                onclick: { enable: true, mode: "repulse" },
                resize: true
            },
            modes: {
                bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8, speed: 3 },
                repulse: { distance: 200, duration: 0.4 }
            }
        },
        retina_detect: true
    });

    // Initialize VanillaTilt for 3D card effects
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // Inject cute stickers randomly
    const stickers = [
        "💖", "💕", "❤️", "💗", "🎀", "✨", "🌟", "⭐", "💌", "👑", "🐾", "🐕", "🥥", "🥛", "🍫", "🌸", "🌷", "🦋", "🌙"
    ];
    const container = document.getElementById("stickers");
    const numStickers = 55; // Slightly decreased for balance

    for (let i = 0; i < numStickers; i++) {
        const span = document.createElement("span");
        span.classList.add("floating-sticker");
        span.innerText = stickers[Math.floor(Math.random() * stickers.length)];

        // Random positioning
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        span.style.left = `${x}vw`;
        span.style.top = `${y}vh`;

        // Random sizes and animation delays (Slightly smaller, slower floating)
        const size = Math.random() * 2 + 1.2; // 1.2rem to 3.2rem
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10; // 10s to 20s for elegant drifting

        span.style.fontSize = `${size}rem`;
        span.style.animationDuration = `${duration}s`;
        span.style.animationDelay = `${delay}s`;

        container.appendChild(span);
    }

    // Music Player Logic
    const playBtn = document.querySelector(".btn-play");
    const prevBtn = document.querySelector(".btn-prev");
    const nextBtn = document.querySelector(".btn-next");
    const record = document.querySelector(".vinyl-record");
    const audio = document.getElementById('bg-audio');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const songLyrics = document.getElementById('song-lyrics');
    
    let isPlaying = false;
    let currentSongIndex = 0;

    const playlist = [
        {
            title: "Saradaga Kasepaina",
            artist: "From Paagal",
            src: "music/Saradaga Kasepaina.mp3",
            startTime: 213, // 3:33
            endTime: 275,   // 4:35
            lyricsHTML: `
                <p class="lyric-line">"Saradaga kaasepina</p>
                <p class="lyric-line">Sarijodai neetho unna</p>
                <p class="lyric-line highlight-lyric">Saripodhaa nakee janmaki"</p>
            `
        },
        {
            title: "Tum Ho",
            artist: "Rockstar",
            src: "music/tum ho.mp3",
            startTime: 0,
            endTime: null,
            lyricsHTML: `
                <p class="lyric-line">"Tum ho paas mere</p>
                <p class="lyric-line">Saath mere ho tum yoon</p>
                <p class="lyric-line">Jitna mehsoos karoon tumko</p>
                <p class="lyric-line highlight-lyric">Utna hi paa bhi loon"</p>
            `
        }
    ];

    function loadSong(index) {
        const song = playlist[index];
        songTitle.innerText = song.title;
        songArtist.innerText = song.artist;
        songLyrics.innerHTML = song.lyricsHTML;
        audio.src = song.src;
        audio.load();
    }

    playBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        updatePlayState();
    });

    function updatePlayState() {
        if (isPlaying) {
            playBtn.innerText = "⏸ Pause";
            record.classList.add("playing");
            const song = playlist[currentSongIndex];
            if (audio.currentTime < song.startTime || (song.endTime && audio.currentTime >= song.endTime)) {
                audio.currentTime = song.startTime;
            }
            audio.play().catch(e => console.log("Audio play failed:", e));
        } else {
            playBtn.innerText = "▶ Play";
            record.classList.remove("playing");
            audio.pause();
        }
    }

    prevBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        if (isPlaying) updatePlayState();
    });

    nextBtn.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        if (isPlaying) updatePlayState();
    });

    const formatTime = (time) => {
        if (isNaN(time) || !isFinite(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    audio.addEventListener('loadedmetadata', () => {
        const song = playlist[currentSongIndex];
        const endTime = song.endTime || audio.duration;
        seekBar.min = song.startTime;
        seekBar.max = endTime;
        durationDisplay.innerText = formatTime(endTime - song.startTime);
        if (isPlaying) {
            audio.currentTime = song.startTime;
            audio.play().catch(e => console.log(e));
        }
    });

    audio.addEventListener('timeupdate', () => {
        const song = playlist[currentSongIndex];
        const endTime = song.endTime || audio.duration;

        if (endTime && audio.currentTime >= endTime) {
            audio.currentTime = song.startTime;
            if (!isPlaying) {
                audio.pause();
            }
        } else if (audio.currentTime < song.startTime && audio.currentTime > 0) {
            audio.currentTime = song.startTime;
        }

        seekBar.value = audio.currentTime;
        let displayTime = audio.currentTime - song.startTime;
        if (displayTime < 0) displayTime = 0;
        currentTimeDisplay.innerText = formatTime(displayTime);

        // Dynamic background fill for seek bar
        const duration = endTime - song.startTime;
        const value = duration > 0 ? ((audio.currentTime - song.startTime) / duration) * 100 : 0;
        seekBar.style.background = `linear-gradient(to right, #d1495b ${Math.max(0, Math.min(100, value))}%, rgba(0,0,0,0.15) ${Math.max(0, Math.min(100, value))}%)`;
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = seekBar.value;
    });

    // Initialize first song metadata without playing
    loadSong(currentSongIndex);

    // Parallax effect on scroll for stickers
    const wrapper = document.querySelector('.parallax-wrapper');
    wrapper.addEventListener('scroll', () => {
        const scrolled = wrapper.scrollTop;
        const floatingStickers = document.querySelectorAll('.floating-sticker');

        floatingStickers.forEach((sticker, index) => {
            const speed = (index % 5) + 1;
            sticker.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });

    // Elegant reveal transitions on scroll
    const observerOptions = {
        root: wrapper,
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });

    // Add glowing heart particles to celestial glow in tribute section
    const celestialGlow = document.querySelector('.celestial-glow');
    if (celestialGlow) {
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('span');
            heart.innerText = '💖';
            heart.style.position = 'absolute';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`;
            heart.style.opacity = '0';
            heart.style.animation = `floatAnimation ${Math.random() * 3 + 3}s ease-in-out infinite alternate`;
            heart.style.animationDelay = `${Math.random() * 2}s`;

            // Add a simple fade-in/out to these specific hearts
            setInterval(() => {
                heart.style.opacity = Math.random() > 0.5 ? '0.6' : '0.1';
            }, 2000 + Math.random() * 2000);

            celestialGlow.appendChild(heart);
        }
    }
});
