// DOM elements
const phases = document.querySelectorAll('.phase');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBars = document.querySelectorAll('.progress');
const totalProgressEl = document.getElementById('total-progress');
const completedTasksEl = document.getElementById('completed-tasks');
const totalTasksEl = document.getElementById('total-tasks');
const completedPhasesEl = document.getElementById('completed-phases');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    updateStats();
    setupEventListeners();
    animateOnScroll();
});

// Setup event listeners
function setupEventListeners() {
    // Checkbox change events
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updatePhaseProgress(this);
            updateStats();
            saveProgress();
            animateProgress();
        });
    });

    // Phase click events for better UX
    phases.forEach(phase => {
        phase.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox') {
                const checkboxes = this.querySelectorAll('input[type="checkbox"]');
                const unchecked = Array.from(checkboxes).filter(cb => !cb.checked);
                
                if (unchecked.length > 0) {
                    // Show a subtle animation to guide user
                    this.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                }
            }
        });
    });
}

// Update progress for a specific phase
function updatePhaseProgress(checkbox) {
    const phase = checkbox.closest('.phase');
    const phaseCheckboxes = phase.querySelectorAll('input[type="checkbox"]');
    const checkedCount = Array.from(phaseCheckboxes).filter(cb => cb.checked).length;
    const totalCount = phaseCheckboxes.length;
    const progressPercentage = (checkedCount / totalCount) * 100;
    
    const progressBar = phase.querySelector('.progress');
    progressBar.style.width = progressPercentage + '%';
    
    // Update phase active state
    if (progressPercentage === 100) {
        phase.classList.add('completed');
        phase.classList.remove('active');
        
        // Activate next phase if available
        const nextPhase = phase.nextElementSibling;
        if (nextPhase && nextPhase.classList.contains('phase')) {
            nextPhase.classList.add('active');
        }
    } else if (progressPercentage > 0) {
        phase.classList.add('active');
    } else {
        phase.classList.remove('active', 'completed');
    }
}

// Update overall statistics
function updateStats() {
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedCount = Array.from(allCheckboxes).filter(cb => cb.checked).length;
    const totalCount = allCheckboxes.length;
    const totalProgress = Math.round((checkedCount / totalCount) * 100);
    
    // Count completed phases
    const completedPhases = document.querySelectorAll('.phase.completed').length;
    
    // Update display with animation
    animateNumber(totalProgressEl, totalProgress, '%');
    animateNumber(completedTasksEl, checkedCount, '');
    animateNumber(completedPhasesEl, completedPhases, '');
    
    // Update total tasks (should be static)
    totalTasksEl.textContent = totalCount;
}

// Animate number changes
function animateNumber(element, targetValue, suffix) {
    const currentValue = parseInt(element.textContent.replace(/[^\d]/g, '')) || 0;
    const increment = (targetValue - currentValue) / 20;
    let current = currentValue;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetValue) || (increment < 0 && current <= targetValue)) {
            current = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, 50);
}

// Animate progress bars
function animateProgress() {
    progressBars.forEach(bar => {
        bar.style.transition = 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Save progress to localStorage
function saveProgress() {
    const progress = {};
    checkboxes.forEach(checkbox => {
        progress[checkbox.dataset.task] = checkbox.checked;
    });
    localStorage.setItem('astronautRoadmapProgress', JSON.stringify(progress));
}

// Load progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('astronautRoadmapProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        checkboxes.forEach(checkbox => {
            if (progress[checkbox.dataset.task] !== undefined) {
                checkbox.checked = progress[checkbox.dataset.task];
                updatePhaseProgress(checkbox);
            }
        });
    }
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all phases and cards
    const animatedElements = document.querySelectorAll('.phase, .stat-card, .resource-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add some fun interactive features
function addInteractiveFeatures() {
    // Add confetti effect when completing a phase
    phases.forEach(phase => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (phase.classList.contains('completed')) {
                        createConfetti(phase);
                    }
                }
            });
        });
        
        observer.observe(phase, { attributes: true });
    });
}

// Create confetti effect
function createConfetti(element) {
    const colors = ['#ffffff', '#cccccc', '#999999', '#666666'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = rect.left + Math.random() * rect.width + 'px';
            confetti.style.top = rect.top + Math.random() * rect.height + 'px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = 'confettiFall 2s ease-out forwards';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }, i * 50);
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize interactive features
addInteractiveFeatures();

// Neutron star interaction
function addNeutronStarInteraction() {
    const neutronStar = document.querySelector('.neutron-star');
    
    // Add gravitational effect when mouse is near the neutron star
    document.addEventListener('mousemove', function(e) {
        const rect = neutronStar.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        
        if (distance < 150) {
                    // Create gravitational pull effect
        neutronStar.style.transform = 'scale(1.3)';
        neutronStar.style.filter = 'drop-shadow(0 0 40px rgba(255, 255, 255, 0.8))';
            
            // Add some floating elements that get pulled toward the neutron star
            if (Math.random() < 0.1) {
                createGravitationalEffect(e.clientX, e.clientY);
            }
        } else {
            neutronStar.style.transform = '';
            neutronStar.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))';
        }
    });
}

function createGravitationalEffect(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.backgroundColor = '#da70d6';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.animation = 'gravitational-pull 2s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Add gravitational pull animation to CSS
const gravitationalStyle = document.createElement('style');
gravitationalStyle.textContent = `
    @keyframes gravitational-pull {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0.1) translate(100px, -100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(gravitationalStyle);

// Initialize neutron star interaction
addNeutronStarInteraction();

// Planet and space element interactions
function addSpaceInteractions() {
    const planets = document.querySelectorAll('.planet');
    const spaceDebris = document.querySelectorAll('.space-debris');
    const shootingStars = document.querySelectorAll('.shooting-star');
    
    // Add hover effects for planets
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
            this.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))';
            createPlanetRing(this);
        });
        
        planet.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))';
        });
    });
    
    // Add click effects for space debris
    spaceDebris.forEach(debris => {
        debris.addEventListener('click', function() {
            createExplosion(this);
        });
    });
    
    // Add trail effects for shooting stars
    shootingStars.forEach(star => {
        star.addEventListener('animationiteration', function() {
            createStarTrail(this);
        });
    });
}

function createPlanetRing(planet) {
    const ring = document.createElement('div');
    ring.style.position = 'absolute';
    ring.style.top = '50%';
    ring.style.left = '50%';
    ring.style.width = '80px';
    ring.style.height = '80px';
    ring.style.border = '1px solid rgba(255, 255, 255, 0.4)';
    ring.style.borderRadius = '50%';
    ring.style.transform = 'translate(-50%, -50%)';
    ring.style.animation = 'planet-ring 2s ease-out forwards';
    ring.style.pointerEvents = 'none';
    
    planet.appendChild(ring);
    
    setTimeout(() => {
        ring.remove();
    }, 2000);
}

function createExplosion(debris) {
    const colors = ['#ffffff', '#cccccc', '#999999', '#666666'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = debris.offsetLeft + 'px';
        particle.style.top = debris.offsetTop + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.animation = `explosion-particle 1s ease-out forwards`;
        
        const angle = (i * 45) * (Math.PI / 180);
        const distance = 50 + Math.random() * 30;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        particle.style.setProperty('--end-x', endX + 'px');
        particle.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function createStarTrail(star) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = star.offsetLeft + 'px';
    trail.style.top = star.offsetTop + 'px';
    trail.style.width = '2px';
    trail.style.height = '2px';
    trail.style.backgroundColor = '#ffffff';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '1000';
    trail.style.animation = 'star-trail 1s ease-out forwards';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
}

// Add explosion and trail animations to CSS
const spaceAnimations = document.createElement('style');
spaceAnimations.textContent = `
    @keyframes planet-ring {
        0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
        }
    }
    
    @keyframes explosion-particle {
        0% {
            transform: translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x), var(--end-y));
            opacity: 0;
        }
    }
    
    @keyframes star-trail {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0.1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(spaceAnimations);

// Initialize space interactions
addSpaceInteractions();

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.type === 'checkbox') {
            focusedElement.checked = !focusedElement.checked;
            focusedElement.dispatchEvent(new Event('change'));
        }
    }
});

// Add tooltip functionality
function addTooltips() {
    const tasks = document.querySelectorAll('.task span');
    tasks.forEach(task => {
        task.title = 'Click to mark as complete';
    });
}

// Initialize tooltips
addTooltips();

// Add a motivational message system
function showMotivationalMessage() {
    const messages = [
        "🚀 Every great astronaut started with a dream!",
        "⭐ You're one step closer to the stars!",
        "🌌 The universe is waiting for you!",
        "💫 Keep reaching for the stars!",
        "🌟 Your journey to space begins here!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(135deg, #4ecdc4, #45b7d1)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    notification.style.zIndex = '1001';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    notification.textContent = randomMessage;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Show motivational message when completing tasks
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            setTimeout(() => {
                showMotivationalMessage();
            }, 500);
        }
    });
});

// Add a reset progress function
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        phases.forEach(phase => {
            phase.classList.remove('active', 'completed');
            const progressBar = phase.querySelector('.progress');
            progressBar.style.width = '0%';
        });
        phases[0].classList.add('active');
        updateStats();
        saveProgress();
    }
}

// Add reset button to the page
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Progress';
resetButton.style.position = 'fixed';
resetButton.style.bottom = '20px';
resetButton.style.right = '20px';
resetButton.style.background = 'rgba(255, 255, 255, 0.1)';
resetButton.style.border = '1px solid rgba(255, 255, 255, 0.2)';
resetButton.style.color = '#b8c5d6';
resetButton.style.padding = '10px 15px';
resetButton.style.borderRadius = '8px';
resetButton.style.cursor = 'pointer';
resetButton.style.fontSize = '0.9rem';
resetButton.style.transition = 'all 0.3s ease';
resetButton.style.backdropFilter = 'blur(10px)';

resetButton.addEventListener('mouseenter', function() {
    this.style.background = 'rgba(255, 255, 255, 0.2)';
    this.style.color = '#ffffff';
});

resetButton.addEventListener('mouseleave', function() {
    this.style.background = 'rgba(255, 255, 255, 0.1)';
    this.style.color = '#b8c5d6';
});

resetButton.addEventListener('click', resetProgress);
document.body.appendChild(resetButton); 