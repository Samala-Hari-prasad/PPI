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
    const record = document.querySelector(".vinyl-record");
    const audio = document.getElementById('bg-audio');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    let isPlaying = false;

    playBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playBtn.innerText = "⏸ Pause our song";
            record.classList.add("playing");
            audio.play();
        } else {
            playBtn.innerText = "▶ Play our song";
            record.classList.remove("playing");
            audio.pause();
        }
    });

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    audio.addEventListener('loadedmetadata', () => {
        seekBar.max = audio.duration;
        durationDisplay.innerText = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
        seekBar.value = audio.currentTime;
        currentTimeDisplay.innerText = formatTime(audio.currentTime);
        
        // Dynamic background fill for seek bar
        const value = (seekBar.value / seekBar.max) * 100;
        seekBar.style.background = `linear-gradient(to right, #d1495b ${value}%, rgba(0,0,0,0.15) ${value}%)`;
    });

    seekBar.addEventListener('input', () => {
        audio.currentTime = seekBar.value;
    });

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
        for(let i=0; i<10; i++) {
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
