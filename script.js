function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

function updateParticleColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const particleColor = isDarkMode ? '#FFFFFF' : '#000000';
    const lineColor = isDarkMode ? '#FFFFFF' : '#000000';
    
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        const particles = window.pJSDom[0].pJS.particles;
        particles.color.value = particleColor;
        particles.line_linked.color = lineColor;
        particles.array.forEach(p => {
            p.color = particleColor;
        });
        window.pJSDom[0].pJS.fn.particlesRefresh();
    }
}

function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkmode-input');
    const body = document.body;
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else if (savedDarkMode === 'false') {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }

    darkModeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
        updateParticleColors();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initializeDarkMode();

    const form = document.querySelector("form");
    const fullName = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    function sendMail() {
        const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse) {
            alert("Please complete the reCAPTCHA.");
            return;
        }

        let params = {
            name: fullName.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
            'g-recaptcha-response': captchaResponse
        };

        emailjs.send("service_ldft4ab", "template_nwnm6j7", params)
            .then(function(response) {
                alert("Email Sent!");
                form.reset();
            }, function(error) {
                console.error("Failed to send email. Error:", error);
                alert("Failed to send email. Please try again later.");
            });
    }
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            sendMail();
        });
    }
 
    particlesJS("particles-js", {
        particles: {
            number: { 
                value: 90, 
                density: { 
                    enable: true, 
                    value_area: 700 
                } 
            },
            color: { 
                value: '#888888' 
            },
            shape: {
                type: 'circle',
                stroke: { 
                    width: 0, 
                    color: '#000000' 
                },
                polygon: { 
                    nb_sides: 5 
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: { 
                    enable: true, 
                    speed: 0.2, 
                    opacity_min: 0.1, 
                    sync: false 
                }
            },
            size: {
                value: 2.5,
                random: true,
                anim: { 
                    enable: false, 
                    speed: 40, 
                    size_min: 0.1, 
                    sync: false 
                }
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: '#888888',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: { 
                    enable: false, 
                    rotateX: 600, 
                    rotateY: 1200 
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { 
                    enable: true, 
                    mode: 'repulse' 
                },
                onclick: { 
                    enable: true, 
                    mode: 'push' 
                },
                resize: true
            },
            modes: {
                grab: { 
                    distance: 400, 
                    line_linked: { 
                        opacity: 1 
                    } 
                },
                bubble: { 
                    distance: 400, 
                    size: 40, 
                    duration: 2, 
                    opacity: 8, 
                    speed: 3 
                },
                repulse: { 
                    distance: 200, 
                    duration: 0.4 
                },
                push: { 
                    particles_nb: 4 
                },
                remove: { 
                    particles_nb: 2 
                }
            }
        },
        retina_detect: true
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    let currentSection = 'home';


    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveLink(id);
                currentSection = id;
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    function updateActiveLink(sectionId) {
        navLinks.forEach(link => {
            const linkSection = link.getAttribute('data-section');
            if (linkSection === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }


    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const projectContainer = document.querySelector('.project-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const dotsContainer = document.querySelector('.project-dots');
    
    let currentIndex = 0;


    projectCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => navigateToProject(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function navigateToProject(index) {
        currentIndex = index;
        const scrollPosition = projectCards[index].offsetLeft - 
            (projectContainer.offsetWidth - projectCards[index].offsetWidth) / 2;
        projectContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        updateDots();
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
        navigateToProject(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % projectCards.length;
        navigateToProject(currentIndex);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
    

    let touchStartX = 0;
    let touchEndX = 0;
    
    projectContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    projectContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                prevBtn.click();
            } else {
                nextBtn.click();
            }
        }
    });

    let scrollTimeout;
    projectContainer.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPosition = projectContainer.scrollLeft;
            const containerWidth = projectContainer.offsetWidth;
            currentIndex = Math.round(scrollPosition / containerWidth);
            updateDots();
        }, 150);
    });
});

