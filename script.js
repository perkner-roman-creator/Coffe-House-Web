// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Progressive Image Loading for Mobile Optimization
function initLazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Přidat třídu pro indikaci načítání
                    img.classList.add('loading');
                    
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        img.src = tempImg.src;
                        img.classList.add('loaded');
                        img.classList.remove('loading');
                    };
                    tempImg.src = img.src;
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Close mobile menu when clicking on a link or outside
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy image loading
    initLazyLoadImages();
    
    const navLinks = document.querySelector('.nav-links');
    const navLinksAnchors = document.querySelectorAll('.nav-links a');
    
    navLinksAnchors.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('mobile-active');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks) return;
        
        const navbar = document.querySelector('.navbar');
        if (navbar && !navbar.contains(e.target)) {
            navLinks.classList.remove('mobile-active');
        }
    });
});

// Language translations
const translations = {
    cs: {
        'nav-home': 'Domů',
        'nav-menu': 'Menu',
        'nav-about': 'O nás',
        'nav-gallery': 'Galerie',
        'nav-contact': 'Kontakt',
        'hero-title': 'Vítejte v Coffee House',
        'hero-subtitle': 'Kde každý šálek vypráví příběh',
        'hero-btn': 'Prohlédnout menu'
    },
    en: {
        'nav-home': 'Home',
        'nav-menu': 'Menu',
        'nav-about': 'About Us',
        'nav-gallery': 'Gallery',
        'nav-contact': 'Contact',
        'hero-title': 'Welcome to Coffee House',
        'hero-subtitle': 'Where every cup tells a story',
        'hero-btn': 'View Menu'
    }
};

let currentLang = 'cs';

function toggleLanguage() {
    currentLang = currentLang === 'cs' ? 'en' : 'cs';
    document.getElementById('current-lang').textContent = currentLang.toUpperCase();
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
}

// Parallax effect for hero section (disabled on mobile for performance)
function handleParallax() {
    // Vypnuto na mobilech kvůli výkonu
    if (window.innerWidth <= 768) return;
    
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    if (!hero || !heroBg) return;
    
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// Přidej parallax jen na desktop
if (window.innerWidth > 768) {
    window.addEventListener('scroll', handleParallax);
}

// Fade-in animation on scroll for sections
function fadeInSections() {
    const fadeSections = document.querySelectorAll('.fade-in');
    const triggerBottom = window.innerHeight * 0.92;
    fadeSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.style.animationPlayState = 'running';
        }
    });
}
window.addEventListener('scroll', fadeInSections);
window.addEventListener('DOMContentLoaded', fadeInSections);

// Close banner
function closeBanner() {
    const banner = document.querySelector('.offers-banner');
    banner.classList.add('hidden');
}

// Scrollspy - aktivní navigační odkazy podle aktuální sekce
function initScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset pro navigaci
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Pokud jsme na začátku stránky, aktivuj první odkaz
        if (scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[0]) navLinks[0].classList.add('active');
        }
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Inicializace při načtení
}

// Spusť scrollspy po načtení DOM
document.addEventListener('DOMContentLoaded', initScrollspy);

// Menu Filter
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const buttons = document.querySelectorAll('.category-btn');
    
    if (!buttons.length || !menuItems.length) return;
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Filter items
    menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Reservation Form Submit
function handleReservation(event) {
    event.preventDefault();
    const name = document.getElementById('res-name').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    
    alert(`Děkujeme, ${name}! Vaše rezervace pro ${guests} na ${date} v ${time} byla úspěšně odeslána. Brzy vás budeme kontaktovat.`);
    event.target.reset();
}

// Contact Form Submit
function handleSubmit(event) {
    event.preventDefault();
    showToast('Děkujeme! Vaši zprávu jsme obdrželi. Brzy se vám ozveme.', 'success');
    event.target.reset();
}

// Newsletter Form Submit
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showToast('Jste přihlášeni! Čekejte naši první zprávu.', 'success');
    event.target.reset();
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Přeskočit pro back-to-top a fab-mobile
        if (this.classList.contains('back-to-top') || this.classList.contains('fab-mobile')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button click handler
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
    
    // Show/hide back to top button
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// Toast notification function
function showToast(message, type = 'success') {
    const container = document.querySelector('.toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-warning';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add animation on scroll
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

document.addEventListener('DOMContentLoaded', () => {
    // Hide loading overlay (guard when element missing)
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('loaded');
        }, 1000);
    }
    
    // Set minimum date for reservation
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.menu-item, .gallery-item, .feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize Lightbox
    initLightbox();
});

/* ====== IMAGE LIGHTBOX ====== */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCount = document.getElementById('lightboxCount');
    const lightboxTotal = document.getElementById('lightboxTotal');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(img => img.src);
    
    if (lightboxTotal) {
        lightboxTotal.textContent = images.length;
    }
    
    // Open lightbox on gallery item click
    galleryItems.forEach((img, index) => {
        img.parentElement.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });
    
    function openLightbox() {
        lightboxImage.src = images[currentIndex];
        lightbox.classList.add('active');
        if (lightboxCount) lightboxCount.textContent = currentIndex + 1;
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox();
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox();
    }
    
    // Event listeners
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
    if (lightboxNext) lightboxNext.addEventListener('click', showNext);
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'Escape') closeLightbox();
    });
    
    // Swipe gesture support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left → next image
                showNext();
            } else {
                // Swipe right → previous image
                showPrev();
            }
        }
    }
    
    if (lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
}

// Testimonials Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    if (totalTestimonials === 0) return;
    
    currentTestimonial = (index + totalTestimonials) % totalTestimonials;
    const track = document.querySelector('.carousel-track');
    const offset = -currentTestimonial * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonial);
    });
}

function nextTestimonial() {
    showTestimonial(currentTestimonial + 1);
}

function prevTestimonial() {
    showTestimonial(currentTestimonial - 1);
}

function goToTestimonial(index) {
    showTestimonial(index);
}

// Auto-rotate testimonials every 6 seconds
setInterval(() => {
    nextTestimonial();
}, 6000);

// ============================================
// PROFESSIONAL GRAPHICS UPGRADES
// ============================================

// Coffee Beans Canvas Animation
function setupCoffeeBeansCanvas() {
    const canvas = document.querySelector('.hero-coffee-beans');
    if (!canvas || window.innerWidth <= 768) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = window.devicePixelRatio || 1;
    let width, height;
    let mouseX = 0, mouseY = 0;
    let mouseActive = false;
    
    const resize = () => {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    
    resize();
    window.addEventListener('resize', resize, { passive: true });
    
    // Coffee bean colors
    const beanColors = [
        'rgba(111, 78, 55, 0.4)',
        'rgba(139, 94, 52, 0.35)',
        'rgba(92, 64, 38, 0.3)',
        'rgba(127, 89, 57, 0.35)'
    ];
    
    const beans = Array.from({ length: 40 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        size: 8 + Math.random() * 12,
        color: beanColors[Math.floor(Math.random() * beanColors.length)]
    }));
    
    canvas.addEventListener('pointermove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        mouseActive = true;
    });
    
    canvas.addEventListener('pointerleave', () => {
        mouseActive = false;
    });
    
    function drawCoffeeBean(x, y, size, rotation, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        // Bean body
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size * 1.4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Bean line
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = size * 0.15;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.5, Math.PI * 0.2, Math.PI * 0.8);
        ctx.stroke();
        
        ctx.restore();
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        beans.forEach(bean => {
            // Mouse interaction
            if (mouseActive) {
                const dx = mouseX - bean.x;
                const dy = mouseY - bean.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    const force = (1 - dist / 120) * 0.8;
                    bean.vx -= (dx / dist) * force;
                    bean.vy -= (dy / dist) * force;
                }
            }
            
            // Update position
            bean.x += bean.vx;
            bean.y += bean.vy;
            bean.rotation += bean.rotationSpeed;
            
            // Damping
            bean.vx *= 0.98;
            bean.vy *= 0.98;
            
            // Wrap around
            if (bean.x < -20) bean.x = width + 20;
            if (bean.x > width + 20) bean.x = -20;
            if (bean.y < -20) bean.y = height + 20;
            if (bean.y > height + 20) bean.y = -20;
            
            // Draw
            drawCoffeeBean(bean.x, bean.y, bean.size, bean.rotation, bean.color);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Scroll-triggered Animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    document.querySelectorAll('.menu-item, .feature, .testimonial-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 3D Hover Effects on Menu Items
function setup3DHoverEffects() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Initialize all professional effects
document.addEventListener('DOMContentLoaded', () => {
    setupCoffeeBeansCanvas();
    setupScrollAnimations();
    setup3DHoverEffects();
});