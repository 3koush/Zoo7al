// Modern Portfolio JavaScript

// Language system
let currentLang = 'ar';
let currentTheme = 'light';

// DOM elements
let cursor = null;
let cursorFollower = null;
let preloader = null;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePreloader();
    initializeCursor();
    initializeNavigation();
    initializeLanguage();
    initializeTheme();
    initializeAnimations();
    initializePortfolio();
    initializeContactForm();
    initializeScrollEffects();
});

// Preloader
function initializePreloader() {
    preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });
}

// Custom Cursor
function initializeCursor() {
    cursor = document.querySelector('.cursor');
    cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .portfolio-item, .service-card, .package-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
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
    
    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        themeToggle.title = currentTheme === 'light' ? 
            (currentLang === 'ar' ? 'الوضع الداكن' : 'Dark Mode') : 
            (currentLang === 'ar' ? 'الوضع الفاتح' : 'Light Mode');
    }
}

// Enhanced Language Toggle
function initializeLanguage() {
    const langToggle = document.getElementById('langToggle');
    const savedLang = localStorage.getItem('language') || 'ar';
    
    currentLang = savedLang;
    
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Set initial language
    updateLanguage();
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', currentLang);
    updateLanguage();
    updateThemeIcon(); // Update theme icon text based on language
}

function updateLanguage() {
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-ar][data-en]');
    const langToggle = document.getElementById('langToggle');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update language toggle button
    if (langToggle) {
        const span = langToggle.querySelector('span');
        if (span) {
            span.textContent = currentLang === 'ar' ? 'EN' : 'ع';
        }
    }
    
    // Update document direction and language
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    // Update page title
    document.title = currentLang === 'ar' ? 
        'أحمد خالد عكوش - مصمم جرافيك' : 
        'Ahmed Khaled Akoush - Graphic Designer';
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = currentLang === 'ar' ? 
        'مصمم جرافيك محترف متخصص في تصميم الهوية البصرية ومحتوى وسائل التواصل الاجتماعي' :
        'Professional graphic designer specializing in brand identity design and social media content';
    
    // Update form labels and placeholders
    updateFormElements();
    
    // Update dynamic content
    updateDynamicContent();
}

function updateFormElements() {
    const formElements = [
        { id: 'name', ar: 'الاسم', en: 'Name' },
        { id: 'email', ar: 'البريد الإلكتروني', en: 'Email' },
        { id: 'message', ar: 'الرسالة', en: 'Message' }
    ];
    
    formElements.forEach(element => {
        const input = document.getElementById(element.id);
        if (input) {
            input.placeholder = element[currentLang];
            const label = input.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.textContent = element[currentLang];
            }
        }
    });
}

function updateDynamicContent() {
    // Update stats labels
    const statsLabels = document.querySelectorAll('.stat-label');
    const statsData = [
        { ar: 'مشروع مكتمل', en: 'Completed Projects' },
        { ar: 'سنوات خبرة', en: 'Years Experience' },
        { ar: 'شهادة معتمدة', en: 'Certifications' }
    ];
    
    statsLabels.forEach((label, index) => {
        if (statsData[index]) {
            label.textContent = statsData[index][currentLang];
        }
    });
    
    // Update skills
    const skillItems = document.querySelectorAll('.skill-item span');
    const skillsData = [
        { ar: 'الهوية البصرية', en: 'Brand Identity' },
        { ar: 'تصميم واجهات المستخدم', en: 'UI/UX Design' }
    ];
    
    skillItems.forEach((skill, index) => {
        if (skillsData[index] && (skill.textContent.includes('الهوية البصرية') || skill.textContent.includes('Brand Identity'))) {
            skill.textContent = skillsData[0][currentLang];
        } else if (skillsData[index] && skill.textContent.includes('UI/UX')) {
            skill.textContent = skillsData[1][currentLang];
        }
    });
    
    // Update experience items
    const expItems = document.querySelectorAll('.exp-content h6');
    const expData = [
        { ar: 'مدير شركة - Zo7al Agancy', en: 'Graphic Designer - Freelance' },
        { ar: 'مدرب - IT Zone', en: 'Trainer - IT Zone' }
    ];
    
    expItems.forEach((item, index) => {
        if (expData[index]) {
            item.textContent = expData[index][currentLang];
        }
    });
    
    // Update package features
    updatePackageFeatures();
    
    // Update contact details
    updateContactDetails();
}

function updatePackageFeatures() {
    const packageFeatures = document.querySelectorAll('.package-features li');
    const featuresData = {
        ar: [
            '8 تصميمات ثابتة شهرياً',
            'تقرير شهري',
            'دعم فني',
            '20 تصميم احترافي شهرياً',
            '4 فيديوهات Reels',
            'تقرير كل أسبوعين',
            'استشارات مجانية',
            '30 تصميم مميز شهرياً',
            '8 فيديو Reels احترافي',
            'تقرير أسبوعي',
            'جلسات تصوير'
        ],
        en: [
            '8 static designs monthly',
            'Monthly report',
            'Technical support',
            '20 professional designs monthly',
            '4 Reels videos',
            'Bi-weekly report',
            'Free consultations',
            '30 premium designs monthly',
            '8 professional Reels videos',
            'Weekly report',
            'Photo sessions'
        ]
    };
    
    packageFeatures.forEach((feature, index) => {
        const textNode = feature.childNodes[feature.childNodes.length - 1];
        if (featuresData[currentLang][index] && textNode && textNode.nodeType === Node.TEXT_NODE) {
            textNode.textContent = ' ' + featuresData[currentLang][index];
        }
    });
}

function updateContactDetails() {
    const contactTitles = document.querySelectorAll('.contact-details h4');
    const contactData = [
        { ar: 'واتساب', en: 'WhatsApp' },
        { ar: 'بيهانس', en: 'Behance' },
        { ar: 'لينكد إن', en: 'LinkedIn' }
    ];
    
    contactTitles.forEach((title, index) => {
        if (contactData[index]) {
            title.textContent = contactData[index][currentLang];
        }
    });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special handling for stats counter
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                // Stagger animation for grid items
                if (entry.target.parentElement.classList.contains('services-grid') ||
                    entry.target.parentElement.classList.contains('portfolio-grid') ||
                    entry.target.parentElement.classList.contains('packages-grid')) {
                    
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = (index * 0.1) + 's';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .package-card, .stat-item, .experience-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.textContent.replace('+', ''));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 20);
}

// Portfolio Filtering
function initializePortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Floating label effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification(currentLang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification(currentLang === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!', 'success');
    e.target.reset();
    
    // Remove focused class from form groups
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('focused');
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : ''}
        ${type === 'error' ? 'background: #ef4444;' : ''}
        ${type === 'info' ? 'background: #6366f1;' : ''}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero shapes
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.3;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(() => {
    // Add any scroll-based functionality here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Resize handler
const optimizedResizeHandler = debounce(() => {
    // Add any resize-based functionality here
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

