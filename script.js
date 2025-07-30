/**
 * Fusion Fronts Portfolio Website
 * Main JavaScript file handling all interactive features
 */

// =================================
// Global Variables and Configuration
// =================================
let isLoading = true;
let currentTheme = localStorage.getItem('theme') || 'light';
let isNavOpen = false;
let particles = [];
let mouseX = 0;
let mouseY = 0;
let cursorTrailPositions = [];

// Configuration - Optimized for performance
const CONFIG = {
    particleCount: 0, // Disabled for performance
    animationSpeed: 0.02,
    cursorTrailLength: 10,
    scrollThreshold: 100,
    textRevealOffset: 0.8,
    loadingDuration: 1000 // Reduced for faster UX
};

// =================================
// DOM Content Loaded - Initialize Everything
// =================================
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// =================================
// Main Initialization Function
// =================================
function initializeWebsite() {
    // Set initial theme
    setTheme(currentTheme);
    
    // Initialize all components
    initPreloader();
    initCustomCursor();
    initNavigation();
    initHeroCanvas();
    initScrollAnimations();
    initThemeToggle();
    initPortfolioFilters();
    initContactForm();
    initModalSystem();
    initSmoothScrolling();
    initCounterAnimations();
    initParallaxEffects();
    
    // Initialize intersection observer for text reveals
    initTextRevealAnimations();
    
    console.log('✨ Fusion Fronts website initialized successfully!');
}

// =================================
// Preloader Animation
// =================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!preloader || !loadingProgress) return;
    
    // Animate loading bar
    setTimeout(() => {
        loadingProgress.style.width = '100%';
    }, 500);
    
    // Hide preloader after animation
    setTimeout(() => {
        preloader.classList.add('fade-out');
        isLoading = false;
        
        // Trigger hero animations
        triggerHeroAnimations();
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, CONFIG.loadingDuration);
}

// =================================
// Custom Cursor Implementation - DISABLED FOR PERFORMANCE
// =================================
function initCustomCursor() {
    // Custom cursor disabled for better performance
    return;
}

// =================================
// Navigation System
// =================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;
    
    // Scroll behavior for navbar - throttled for performance
    let ticking = false;
    const updateNavbar = () => {
        if (window.scrollY > CONFIG.scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            isNavOpen = !isNavOpen;
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isNavOpen ? 'hidden' : '';
        });
    }
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isNavOpen) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                isNavOpen = false;
                document.body.style.overflow = '';
            }
        });
    });
}

// =================================
// Hero Canvas Animation - DISABLED FOR PERFORMANCE
// =================================
function initHeroCanvas() {
    // Canvas animation completely disabled for better performance
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        canvas.style.display = 'none';
    }
    return;
}

// =================================
// Scroll-based Animations
// =================================
function initScrollAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// =================================
// Text Reveal Animations
// =================================
function initTextRevealAnimations() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    const observerOptions = {
        threshold: CONFIG.textRevealOffset,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    textElements.forEach(element => {
        textObserver.observe(element);
    });
}

// =================================
// Theme Toggle System
// =================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
}

// =================================
// Portfolio Filtering System
// =================================
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (!filterButtons.length || !portfolioItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items with animation
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// =================================
// Contact Form Handler
// =================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Show loading state
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success state
            submitBtn.querySelector('span').textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.style.background = 'var(--primary-gradient)';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
    
    // Enhanced form input animations
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', (e) => {
            if (!e.target.value) {
                e.target.parentElement.classList.remove('focused');
            }
        });
    });
}

// =================================
// Modal System
// =================================
function initModalSystem() {
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    const modal = document.getElementById('portfolio-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal) return;
    
    // Portfolio case study data
    const caseStudies = {
        techstore: {
            title: 'TechStore Pro - E-Commerce Platform',
            content: `
                <h3>Project Overview</h3>
                <p>A comprehensive e-commerce platform built for modern technology retailers, featuring advanced analytics, inventory management, and seamless user experience.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>Real-time inventory tracking</li>
                    <li>Advanced search and filtering</li>
                    <li>Personalized recommendations</li>
                    <li>Mobile-optimized checkout</li>
                    <li>Admin analytics dashboard</li>
                </ul>
                
                <h3>Technologies Used</h3>
                <p><strong>Frontend:</strong> React, Redux, Styled Components</p>
                <p><strong>Backend:</strong> Node.js, Express, MongoDB</p>
                <p><strong>Payment:</strong> Stripe Integration</p>
                <p><strong>Hosting:</strong> AWS EC2, CloudFront CDN</p>
                
                <h3>Results</h3>
                <p>Increased conversion rates by 35% and reduced cart abandonment by 40%.</p>
            `
        },
        fittrack: {
            title: 'FitTrack - AI-Powered Fitness App',
            content: `
                <h3>Project Overview</h3>
                <p>An intelligent fitness tracking application that uses AI to provide personalized workout recommendations and nutrition guidance.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>AI-powered workout generation</li>
                    <li>Real-time form analysis</li>
                    <li>Nutrition tracking with barcode scanning</li>
                    <li>Social challenges and leaderboards</li>
                    <li>Wearable device integration</li>
                </ul>
                
                <h3>Technologies Used</h3>
                <p><strong>Mobile:</strong> React Native, TensorFlow Lite</p>
                <p><strong>Backend:</strong> Python, FastAPI, PostgreSQL</p>
                <p><strong>AI/ML:</strong> TensorFlow, OpenCV</p>
                <p><strong>Cloud:</strong> Google Cloud Platform</p>
                
                <h3>Results</h3>
                <p>Over 100K downloads in the first 6 months with 4.8-star rating.</p>
            `
        },
        securebank: {
            title: 'SecureBank UI - Banking Dashboard',
            content: `
                <h3>Project Overview</h3>
                <p>A modern banking dashboard interface designed with security and usability at its core, featuring advanced data visualization and intuitive user flows.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>Multi-factor authentication</li>
                    <li>Real-time transaction monitoring</li>
                    <li>Interactive financial charts</li>
                    <li>Mobile-responsive design</li>
                    <li>Accessibility compliance (WCAG 2.1)</li>
                </ul>
                
                <h3>Technologies Used</h3>
                <p><strong>Frontend:</strong> Vue.js, Vuex, D3.js</p>
                <p><strong>Design:</strong> Figma, Adobe Creative Suite</p>
                <p><strong>Security:</strong> OAuth 2.0, JWT</p>
                <p><strong>Testing:</strong> Jest, Cypress</p>
                
                <h3>Results</h3>
                <p>Improved user satisfaction by 50% and reduced support tickets by 30%.</p>
            `
        },
        intellichat: {
            title: 'IntelliChat - AI Customer Service',
            content: `
                <h3>Project Overview</h3>
                <p>An advanced AI chatbot system capable of understanding natural language and providing intelligent customer support across multiple channels.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>Natural language understanding</li>
                    <li>Multi-language support</li>
                    <li>Sentiment analysis</li>
                    <li>Human handoff capabilities</li>
                    <li>Analytics and reporting</li>
                </ul>
                
                <h3>Technologies Used</h3>
                <p><strong>AI/ML:</strong> OpenAI GPT, spaCy, NLTK</p>
                <p><strong>Backend:</strong> Python, FastAPI, Redis</p>
                <p><strong>Frontend:</strong> React, Socket.io</p>
                <p><strong>Deployment:</strong> Docker, Kubernetes</p>
                
                <h3>Results</h3>
                <p>Resolved 80% of customer queries automatically, reducing response time by 90%.</p>
            `
        },
        propertyhub: {
            title: 'PropertyHub - Real Estate Platform',
            content: `
                <h3>Project Overview</h3>
                <p>A comprehensive real estate platform featuring virtual property tours, advanced search capabilities, and seamless agent-client communication.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>360° virtual property tours</li>
                    <li>Advanced search with map integration</li>
                    <li>Real-time chat system</li>
                    <li>Document management</li>
                    <li>CRM integration</li>
                </ul>
                
                <h3>Technologies Used</h3>
                <p><strong>Frontend:</strong> Next.js, Three.js, Mapbox</p>
                <p><strong>Backend:</strong> Node.js, GraphQL, PostgreSQL</p>
                <p><strong>Storage:</strong> AWS S3, CloudFront</p>
                <p><strong>Real-time:</strong> WebSocket, Socket.io</p>
                
                <h3>Results</h3>
                <p>Increased property viewing engagement by 200% and reduced time-to-sale by 25%.</p>
            `
        },
        quickeats: {
            title: 'QuickEats - Food Delivery App',
            content: `
                <h3>Project Overview</h3>
                <p>A fast and reliable food delivery application with real-time tracking, multiple payment options, and seamless restaurant integration.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li>Real-time order tracking</li>
                    <li>Multiple payment gateways</li>
                    <li>Restaurant management dashboard</li>
                    <li>Driver app with route optimization</li>
                    <li>Review and rating system</li>
                </ul>
                
                <h3>Technologies Used</h3>
                <p><strong>Mobile:</strong> Flutter, Dart</p>
                <p><strong>Backend:</strong> Node.js, MongoDB, Redis</p>
                <p><strong>Maps:</strong> Google Maps API</p>
                <p><strong>Payments:</strong> Stripe, PayPal</p>
                
                <h3>Results</h3>
                <p>Achieved 30-minute average delivery time with 95% customer satisfaction rate.</p>
            `
        }
    };
    
    // Open modal
    portfolioButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const project = button.getAttribute('data-project');
            const caseStudy = caseStudies[project];
            
            if (caseStudy) {
                modalTitle.textContent = caseStudy.title;
                modalContent.innerHTML = caseStudy.content;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// =================================
// Smooth Scrolling
// =================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =================================
// Counter Animations
// =================================
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// =================================
// Parallax Effects
// =================================
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// =================================
// Hero Animations Trigger
// =================================
function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .text-reveal');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('revealed');
        }, index * 200);
    });
}

// =================================
// Job Application Handlers
// =================================
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('job-apply-btn')) {
        e.preventDefault();
        
        const jobTitle = e.target.closest('.job-card').querySelector('h4').textContent;
        
        // Create a simple alert for demo purposes
        // In a real application, this would open a job application form
        alert(`Thank you for your interest in the ${jobTitle} position! Please email your resume to careers@fusionfronts.com`);
    }
});

// =================================
// Performance Optimization
// =================================

// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Any additional scroll handling can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// =================================
// Error Handling and Fallbacks
// =================================
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    
    // Graceful fallback for critical errors
    if (e.error && e.error.message.includes('canvas')) {
        console.warn('Canvas animation failed, falling back to CSS animation');
        const canvas = document.getElementById('hero-canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    }
});

// =================================
// Touch Device Optimizations
// =================================
if ('ontouchstart' in window) {
    // Disable hover effects on touch devices
    document.body.classList.add('touch-device');
    
    // Optimize custom cursor for touch
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.custom-cursor-trail');
    
    if (cursor && cursorTrail) {
        cursor.style.display = 'none';
        cursorTrail.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
}

// =================================
// Accessibility Enhancements
// =================================

// Keyboard navigation for portfolio filters
document.addEventListener('keydown', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Skip to content link for screen readers
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--deep-indigo);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10001;
    transition: top 0.3s;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// =================================
// Animation Performance Monitor
// =================================
let frameCount = 0;
let lastTime = performance.now();

function monitorFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // If FPS drops below 30, reduce particle count
        if (fps < 30 && particles.length > 20) {
            particles = particles.slice(0, particles.length - 5);
            console.warn(`FPS low (${fps}), reducing particles to ${particles.length}`);
        }
        
        frameCount = 0;
        lastTime = currentTime;
    }
    
    requestAnimationFrame(monitorFPS);
}

// Start FPS monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    monitorFPS();
}

// =================================
// Service Worker Registration (for PWA capabilities)
// =================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

console.log('🚀 Fusion Fronts - Where Innovation Meets Digital Excellence');
console.log('💫 All systems initialized and ready for an amazing experience!');