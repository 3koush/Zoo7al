// Modern Portfolio JavaScript - Zo7al Agency Edition

// Global state
let currentLang = localStorage.getItem('language') || 'ar';
let currentTheme = localStorage.getItem('theme') || 'light';

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
    initializeVideoLightbox(); 
    initializeInfiniteClientsScroll(); // الدالة المحدثة لشريط اللوجوهات
});

// ==================== 1. Seamless Clients Loop (تعديل الجوهر) ====================// ==================== 1. Seamless Clients Loop (تعديل لـ 15 شعار) ====================
function initializeInfiniteClientsScroll() {
    const track = document.getElementById('logosTrack');
    if (!track) return;

    // استنساخ الشعارات مرة واحدة فقط خلف الأصل
    // الـ 15 شعار هيصبحوا 30 في السلسلة لضمان عدم وجود فراغ
    const originalContent = track.innerHTML;
    track.innerHTML = originalContent + originalContent;

    let scrollAmount = 0;
    // السرعة: 1 تعتبر جيدة، قللها لـ 0.7 إذا أردت حركة أهدأ مع العدد الكبير
    const speed = 1; 

    function animate() {
        scrollAmount -= speed;

        // الحساب هنا ديناميكي: بمجرد وصولنا لنهاية الـ 15 شعار الأصلية 
        // (التي تمثل نصف عرض التراك الكلي بعد الاستنساخ) نعود للصفر
        if (Math.abs(scrollAmount) >= track.scrollWidth / 2) {
            scrollAmount = 0;
        }

        track.style.transform = `translateX(${scrollAmount}px)`;
        requestAnimationFrame(animate);
    }

    animate();
}
// ==================== 2. Preloader ====================
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 1500);
    });
}

// ==================== 3. Video Lightbox ====================
function initializeVideoLightbox() {
    const videoItems = document.querySelectorAll('.video-item');
    const lightbox = document.getElementById('video-lightbox');
    const iframe = document.getElementById('lightbox-iframe');
    const closeBtn = document.getElementById('close-lightbox');

    if (!lightbox) return;

    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoId = item.getAttribute('data-video-id');
            if (videoId) {
                iframe.src = `https://drive.google.com/file/d/${videoId}/preview`;
                lightbox.classList.add('show');
            }
        });
    });

    const close = () => {
        lightbox.classList.remove('show');
        iframe.src = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
}

// ==================== 4. Custom Cursor ====================
function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower delay
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    const hoverables = document.querySelectorAll('a, button, .service-card, .video-item, .client-logo');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
        });
    });
}

// ==================== 5. Navigation & Scroll ====================
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) header.classList.toggle('scrolled', window.scrollY > 100);
    });
}

// ==================== 6. Language & Theme ====================
function initializeLanguage() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) langToggle.addEventListener('click', toggleLanguage);
    updateLanguage();
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', currentLang);
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        const text = el.getAttribute(`data-${currentLang}`);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });
    
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    const langSpan = document.querySelector('#langToggle span');
    if (langSpan) langSpan.textContent = currentLang === 'ar' ? 'EN' : 'ع';
    
    updateFormLabels();
}

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ==================== 7. Animations & Form ====================
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                if (entry.target.classList.contains('stat-number')) animateCounter(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .video-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

function animateCounter(el) {
    const target = parseInt(el.textContent);
    let count = 0;
    const speed = target / 50;
    const interval = setInterval(() => {
        count += speed;
        if (count >= target) {
            el.textContent = target + '+';
            clearInterval(interval);
        } else {
            el.textContent = Math.floor(count) + '+';
        }
    }, 30);
}

function initializePortfolio() {
    const btns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            items.forEach(item => {
                const show = filter === 'all' || item.dataset.category === filter;
                item.style.display = show ? 'block' : 'none';
            });
        });
    });
}

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = currentLang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Request received successfully!';
            showNotification(msg, 'success');
            form.reset();
        });
    }
}

function showNotification(msg, type) {
    const note = document.createElement('div');
    note.className = `notification notification-${type}`;
    note.textContent = msg;
    note.style.cssText = `position:fixed;top:20px;right:20px;padding:1rem 2rem;border-radius:8px;color:white;z-index:10000;background:#10b981;`;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}

function initializeScrollEffects() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });
}

function updateFormLabels() {
    const labels = {
        name: { ar: 'اسم الشركة', en: 'Company Name' },
        email: { ar: 'البريد الإلكتروني', en: 'Email Address' },
        message: { ar: 'كيف يمكننا مساعدتك؟', en: 'How can we help?' }
    };
    Object.keys(labels).forEach(id => {
        const input = document.getElementById(id);
        if (input) input.placeholder = labels[id][currentLang];
    });
}