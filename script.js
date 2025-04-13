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

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const fullName = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    function sendMail(event) {
        event.preventDefault();
        let params = {
            name: fullName.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
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
        form.addEventListener("submit", sendMail);
    }

    // Theme toggle functionality with localStorage
    const darkModeToggle = document.getElementById('darkmode-input');
    if (darkModeToggle) {
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }

        // Handle theme changes
        darkModeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // Initialize particles
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
});