// Zohal Portfolio JavaScript

// Language Toggle Functionality
let currentLang = 'ar';

// Custom Cursor
let cursor = null;
let isHovering = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeCustomCursor();
    initializeParticleSystem();
    initializeLanguage();
    initializeNavigation();
    initializePortfolioTabs();
    initializeAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeMagneticEffect();
    initializeParallax();
});

// Custom Cursor Implementation
function initializeCustomCursor() {
    cursor = document.querySelector('.custom-cursor');
    
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .magnetic, .hover-glow, .ripple');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            isHovering = true;
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            isHovering = false;
        });
        
        element.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        element.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
    });
}

// Particle System
function initializeParticleSystem() {
    const particleSystem = document.getElementById('particleSystem');
    if (!particleSystem) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleSystem);
    }
    
    // Create new particles periodically
    setInterval(() => {
        if (particleSystem.children.length < particleCount) {
            createParticle(particleSystem);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = left + '%';
    particle.style.animationDuration = animationDuration + 's';
    particle.style.animationDelay = delay + 's';
    
    // Random colors
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (animationDuration + delay) * 1000);
}

// Magnetic Effect
function initializeMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Parallax Effect
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Enhanced Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                
                // Add stagger animation for multiple elements
                if (entry.target.classList.contains('stagger-animation')) {
                    const siblings = entry.target.parentNode.children;
                    Array.from(siblings).forEach((sibling, index) => {
                        if (sibling.classList.contains('stagger-animation')) {
                            setTimeout(() => {
                                sibling.style.animationDelay = (index * 0.1) + 's';
                                sibling.classList.add('animate');
                            }, index * 100);
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-card, .project-card, .package-card, .certificate-card, .skill-category, .stagger-animation');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
    
    // Counter animation for stats
    animateCounters();
    
    // Text reveal animation
    initializeTextReveal();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace('+', ''));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                    }
                }, 20);
                
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function initializeTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = (index * 0.05) + 's';
            element.appendChild(span);
        });
    });
}

// Enhanced Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (event.clientX - button.offsetLeft - radius) + 'px';
    circle.style.top = (event.clientY - button.offsetTop - radius) + 'px';
    circle.classList.add('ripple-effect');
    
    const ripple = button.getElementsByClassName('ripple-effect')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const rippleButtons = document.querySelectorAll('.ripple');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Glitch Effect for Special Elements
function addGlitchEffect(element, text) {
    element.setAttribute('data-text', text);
    element.classList.add('glitch');
}

// Morphing Shapes Animation
function initializeMorphingShapes() {
    const shapes = document.querySelectorAll('.morphing-shape');
    
    shapes.forEach(shape => {
        setInterval(() => {
            const randomRadius = () => Math.floor(Math.random() * 50) + 25;
            const newBorderRadius = `${randomRadius()}% ${randomRadius()}% ${randomRadius()}% ${randomRadius()}% / ${randomRadius()}% ${randomRadius()}% ${randomRadius()}% ${randomRadius()}%`;
            shape.style.borderRadius = newBorderRadius;
        }, 3000);
    });
}

// Enhanced Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">
                <div class="logo-circle">
                    <div class="logo-inner">ز</div>
                </div>
            </div>
            <div class="loading-text neon-glow">جاري التحميل...</div>
            <div class="loading-progress">
                <div class="progress-bar"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 2000);
}

// Mouse Trail Effect
function initializeMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        updateTrail();
    });
    
    function updateTrail() {
        const existingTrails = document.querySelectorAll('.mouse-trail');
        existingTrails.forEach(t => t.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.left = point.x + 'px';
            trailElement.style.top = point.y + 'px';
            trailElement.style.opacity = index / trailLength;
            trailElement.style.transform = `scale(${index / trailLength})`;
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 500);
        });
    }
}

// Add CSS for mouse trail
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    .mouse-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);

const translations = {
    ar: {
        // Navigation
        'الرئيسية': 'الرئيسية',
        'نبذة عني': 'نبذة عني',
        'أعمالي': 'أعمالي',
        'الباقات': 'الباقات',
        'تواصل معي': 'تواصل معي',
        
        // Hero Section
        'مرحباً بكم في': 'مرحباً بكم في',
        'موقع أعمالي': 'موقع أعمالي',
        'الإبداعية': 'الإبداعية',
        
        // About Section
        'نبذة عني': 'نبذة عني',
        'تحويل الأفكار إلى تجارب بصرية مذهلة': '✨ تحويل الأفكار إلى تجارب بصرية مذهلة ✨',
        'مرحباً، أنا': 'مرحباً، أنا',
        'تحميل السيرة الذاتية': 'تحميل السيرة الذاتية',
        'عرض الأعمال': 'عرض الأعمال',
        'إجمالي المشاريع': 'إجمالي المشاريع',
        'الشهادات': 'الشهادات',
        'سنوات الخبرة': 'سنوات الخبرة',
        
        // Portfolio
        'معرض الأعمال': 'معرض الأعمال',
        'المشاريع': 'المشاريع',
        'المهارات': 'المهارات',
        'عرض المزيد': 'عرض المزيد',
        
        // Packages
        'باقات زحل الإبداعية': 'باقات زحل الإبداعية',
        'اختر الباقة المناسبة لاحتياجاتك التسويقية': 'اختر الباقة المناسبة لاحتياجاتك التسويقية',
        'باقة المدار الأساسي': 'باقة المدار الأساسي',
        'باقة النجم المتقدم': 'باقة النجم المتقدم',
        'باقة المجرة الذهبية': 'باقة المجرة الذهبية',
        'لأول 3 شهور': 'لأول 3 شهور',
        'ستحصل شهرياً على:': 'ستحصل شهرياً على:',
        'اختر هذه الباقة': 'اختر هذه الباقة',
        'الأكثر طلباً': 'الأكثر طلباً',
        
        // Contact
        'تواصل': 'تواصل',
        'هل تريد مناقشة مشروع؟ أرسل لي رسالة ولنبدأ الحديث.': 'هل تريد مناقشة مشروع؟ أرسل لي رسالة ولنبدأ الحديث.',
        'اسمك': 'اسمك',
        'بريدك الإلكتروني': 'بريدك الإلكتروني',
        'رسالتك': 'رسالتك',
        'إرسال الرسالة': 'إرسال الرسالة',
        
        // Footer
        '© 2025 أحمد خالد عكوش - زحل. جميع الحقوق محفوظة.': '© 2025 أحمد خالد عكوش - زحل. جميع الحقوق محفوظة.',
        'مصمم بحب في مصر': 'مصمم بحب في مصر ❤️'
    },
    en: {
        // Navigation
        'الرئيسية': 'Home',
        'نبذة عني': 'About',
        'أعمالي': 'Portfolio',
        'الباقات': 'Packages',
        'تواصل معي': 'Contact',
        
        // Hero Section
        'مرحباً بكم في': 'Welcome To My',
        'موقع أعمالي': 'Portfolio Website',
        'الإبداعية': 'Creative',
        
        // About Section
        'نبذة عني': 'About Me',
        'تحويل الأفكار إلى تجارب بصرية مذهلة': '✨ Transforming ideas into stunning visual experiences ✨',
        'مرحباً، أنا': 'Hello, I\'m',
        'تحميل السيرة الذاتية': 'Download CV',
        'عرض الأعمال': 'View Projects',
        'إجمالي المشاريع': 'Total Projects',
        'الشهادات': 'Certificates',
        'سنوات الخبرة': 'Years of Experience',
        
        // Portfolio
        'معرض الأعمال': 'Portfolio Showcase',
        'المشاريع': 'Projects',
        'المهارات': 'Skills',
        'عرض المزيد': 'See More',
        
        // Packages
        'باقات زحل الإبداعية': 'Zohal Creative Packages',
        'اختر الباقة المناسبة لاحتياجاتك التسويقية': 'Choose the package that suits your marketing needs',
        'باقة المدار الأساسي': 'Basic Orbit Package',
        'باقة النجم المتقدم': 'Advanced Star Package',
        'باقة المجرة الذهبية': 'Golden Galaxy Package',
        'لأول 3 شهور': 'For first 3 months',
        'ستحصل شهرياً على:': 'You\'ll receive monthly:',
        'اختر هذه الباقة': 'Choose This Package',
        'الأكثر طلباً': 'Most Popular',
        
        // Contact
        'تواصل': 'Contact',
        'هل تريد مناقشة مشروع؟ أرسل لي رسالة ولنبدأ الحديث.': 'Want to discuss a project? Send me a message and let\'s start talking.',
        'اسمك': 'Your Name',
        'بريدك الإلكتروني': 'Your Email',
        'رسالتك': 'Your Message',
        'إرسال الرسالة': 'Send Message',
        
        // Footer
        '© 2025 أحمد خالد عكوش - زحل. جميع الحقوق محفوظة.': '© 2025 Ahmed Khaled Akoush - Zohal. All rights reserved.',
        'مصمم بحب في مصر': 'Designed with love in Egypt ❤️'
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeNavigation();
    initializePortfolioTabs();
    initializeAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
});

// Language Toggle
function initializeLanguage() {
    const langToggle = document.getElementById('langToggle');
    const html = document.documentElement;
    
    langToggle.addEventListener('click', function() {
        if (currentLang === 'ar') {
            switchToEnglish();
        } else {
            switchToArabic();
        }
    });
}

function switchToEnglish() {
    currentLang = 'en';
    const html = document.documentElement;
    const langToggle = document.getElementById('langToggle');
    
    // Change HTML attributes
    html.setAttribute('lang', 'en');
    html.setAttribute('dir', 'ltr');
    
    // Update button text
    langToggle.innerHTML = '<i class="fas fa-globe"></i> AR';
    
    // Update all translatable elements
    updateTranslations();
    
    // Update placeholders
    updatePlaceholders();
}

function switchToArabic() {
    currentLang = 'ar';
    const html = document.documentElement;
    const langToggle = document.getElementById('langToggle');
    
    // Change HTML attributes
    html.setAttribute('lang', 'ar');
    html.setAttribute('dir', 'rtl');
    
    // Update button text
    langToggle.innerHTML = '<i class="fas fa-globe"></i> EN';
    
    // Update all translatable elements
    updateTranslations();
    
    // Update placeholders
    updatePlaceholders();
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-ar]');
    
    elements.forEach(element => {
        const arText = element.getAttribute('data-ar');
        const enText = element.getAttribute('data-en');
        
        if (currentLang === 'ar') {
            element.textContent = arText;
        } else {
            element.textContent = enText;
        }
    });
}

function updatePlaceholders() {
    const inputs = document.querySelectorAll('[data-ar-placeholder]');
    
    inputs.forEach(input => {
        const arPlaceholder = input.getAttribute('data-ar-placeholder');
        const enPlaceholder = input.getAttribute('data-en-placeholder');
        
        if (currentLang === 'ar') {
            input.setAttribute('placeholder', arPlaceholder);
        } else {
            input.setAttribute('placeholder', enPlaceholder);
        }
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    });
    
    // Active nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Portfolio Tabs
function initializePortfolioTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-card, .project-card, .package-card, .certificate-card, .skill-category');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
    
    // Counter animation for stats
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
            }
        }, 20);
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('يرجى ملء جميع الحقول', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('تم إرسال رسالتك بنجاح! سأرد عليك قريباً.', 'success');
            this.reset();
        });
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
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

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading states
    document.body.classList.add('loaded');
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

