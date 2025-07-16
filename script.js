// Global Variables
let currentSlide = 0;
let currentProductSlide = 0;
let isRTL = true;

// DOM Elements
const heroSlides = document.querySelectorAll('.slide');
const productSlides = document.querySelectorAll('.product-slide');
const body = document.body;
const html = document.documentElement;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
function initializeWebsite() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
    
    // Set initial language
    setInitialLanguage();
    
    // Initialize sliders
    initializeHeroSlider();
    initializeProductSlider();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize navbar scroll effect
    initializeNavbarScroll();
    
    // Initialize loading animations
    initializeLoadingAnimations();
    
    // Initialize auto-play for hero slider
    initializeAutoPlay();
    
    // Initialize keyboard navigation
    initializeKeyboardNavigation();
    
    // Initialize touch/swipe support
    initializeTouchSupport();
    
    console.log('Website initialized successfully');
}

// Language Toggle Functionality
function toggleLanguage() {
    const isCurrentlyRTL = html.dir === 'rtl';
    
    if (isCurrentlyRTL) {
        // Switch to English (LTR)
        html.dir = 'ltr';
        html.lang = 'en';
        body.style.direction = 'ltr';
        body.style.textAlign = 'left';
        isRTL = false;
    } else {
        // Switch to Arabic (RTL)
        html.dir = 'rtl';
        html.lang = 'ar';
        body.style.direction = 'rtl';
        body.style.textAlign = 'right';
        isRTL = true;
    }
    
    // Update document title
    updateDocumentTitle();
    
    // Save language preference
    localStorage.setItem('language', isRTL ? 'ar' : 'en');
    
    // Refresh AOS animations
    AOS.refresh();
    
    // Add smooth transition effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// Set Initial Language
function setInitialLanguage() {
    const savedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language || navigator.userLanguage;
    
    if (savedLanguage) {
        if (savedLanguage === 'en') {
            html.dir = 'ltr';
            html.lang = 'en';
            body.style.direction = 'ltr';
            body.style.textAlign = 'left';
            isRTL = false;
        } else {
            html.dir = 'rtl';
            html.lang = 'ar';
            body.style.direction = 'rtl';
            body.style.textAlign = 'right';
            isRTL = true;
        }
    } else if (browserLanguage.startsWith('ar')) {
        html.dir = 'rtl';
        html.lang = 'ar';
        body.style.direction = 'rtl';
        body.style.textAlign = 'right';
        isRTL = true;
    }
    
    updateDocumentTitle();
}

// Update Document Title
function updateDocumentTitle() {
    if (isRTL) {
        document.title = 'شركة ابداع الاسراء لانتاج جبس الذره و البطاطا';
    } else {
        document.title = 'Al-Israa Creativity Co. for Corn and Potato Snacks Production';
    }
}

// Hero Slider Functionality
function initializeHeroSlider() {
    if (heroSlides.length === 0) return;
    
    // Set first slide as active
    heroSlides[0].classList.add('active');
    
    // Create slide indicators
    createSlideIndicators();
}

function changeSlide(direction) {
    if (heroSlides.length === 0) return;
    
    // Remove active class from current slide
    heroSlides[currentSlide].classList.remove('active');
    
    // Calculate next slide
    currentSlide += direction;
    
    if (currentSlide >= heroSlides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = heroSlides.length - 1;
    }
    
    // Add active class to new slide
    heroSlides[currentSlide].classList.add('active');
    
    // Update indicators
    updateSlideIndicators();
    
    // Add slide transition effect
    addSlideTransition();
}

function createSlideIndicators() {
    const heroNav = document.querySelector('.hero-nav');
    if (!heroNav) return;
    
    const indicators = document.createElement('div');
    indicators.className = 'slide-indicators';
    indicators.style.cssText = `
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
    `;
    
    heroSlides.forEach((_, index) => {
        const indicator = document.createElement('button');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });
    
    heroNav.appendChild(indicators);
}

function updateSlideIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.style.background = 'rgba(255, 255, 255, 1)';
            indicator.style.transform = 'scale(1.2)';
        } else {
            indicator.style.background = 'rgba(255, 255, 255, 0.5)';
            indicator.style.transform = 'scale(1)';
        }
    });
}

function goToSlide(index) {
    if (heroSlides.length === 0) return;
    
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = index;
    heroSlides[currentSlide].classList.add('active');
    updateSlideIndicators();
    addSlideTransition();
}

function addSlideTransition() {
    const activeSlide = heroSlides[currentSlide];
    const content = activeSlide.querySelector('.container');
    
    if (content) {
        content.style.transform = 'translateY(20px)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.transition = 'all 0.5s ease';
            content.style.transform = 'translateY(0)';
            content.style.opacity = '1';
        }, 100);
    }
}

// Product Slider Functionality
function initializeProductSlider() {
    if (productSlides.length === 0) return;
    
    // Set first slide as active
    productSlides[0].classList.add('active');
}

function changeProductSlide(direction) {
    if (productSlides.length === 0) return;
    
    // Remove active class from current slide
    productSlides[currentProductSlide].classList.remove('active');
    
    // Calculate next slide
    currentProductSlide += direction;
    
    if (currentProductSlide >= productSlides.length) {
        currentProductSlide = 0;
    } else if (currentProductSlide < 0) {
        currentProductSlide = productSlides.length - 1;
    }
    
    // Add active class to new slide
    productSlides[currentProductSlide].classList.add('active');
    
    // Add transition effect
    addProductSlideTransition();
}

function addProductSlideTransition() {
    const activeSlide = productSlides[currentProductSlide];
    const cards = activeSlide.querySelectorAll('.product-card');
    
    cards.forEach((card, index) => {
        card.style.transform = 'translateY(20px)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, index * 100);
    });
}

// Auto-play Hero Slider
function initializeAutoPlay() {
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(13, 110, 253, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(13, 110, 253, 1)';
            navbar.style.backdropFilter = 'blur(0px)';
        }
    });
}

// Loading Animations
function initializeLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.product-card, .contact-card, .feature-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Keyboard Navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === 'Escape') {
            // Close any open modals or overlays
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) modalInstance.hide();
            });
        }
    });
}

// Touch/Swipe Support
function initializeTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                changeSlide(isRTL ? -1 : 1);
            } else {
                // Swipe right
                changeSlide(isRTL ? 1 : -1);
            }
        }
    }
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
    };
}

// Performance Optimization
function optimizePerformance() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
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
    
    // Preload critical resources
    const criticalImages = [
        'https://via.placeholder.com/500x400?text=جبس+ذرة+عالي+الجودة',
        'https://via.placeholder.com/500x400?text=جبس+بطاطا+مقرمش'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Error Handling
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        // You can add error reporting here
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        // You can add error reporting here
    });
}

// Accessibility Improvements
function improveAccessibility() {
    // Add keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('.hero-nav button, .product-nav button');
    customButtons.forEach(button => {
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    // Add ARIA labels for better screen reader support
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.setAttribute('aria-label', 'Hero image slider');
        heroSlider.setAttribute('role', 'region');
    }
    
    const productSlider = document.querySelector('.product-slider');
    if (productSlider) {
        productSlider.setAttribute('aria-label', 'Product showcase slider');
        productSlider.setAttribute('role', 'region');
    }
}

// Initialize all optimizations
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    handleErrors();
    improveAccessibility();
});

// Export functions for global use
window.toggleLanguage = toggleLanguage;
window.changeSlide = changeSlide;
window.changeProductSlide = changeProductSlide;
window.goToSlide = goToSlide;

// Analytics and Tracking (Optional)
function trackInteraction(action, category, label) {
    // You can integrate with Google Analytics or other tracking services
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    console.log(`Tracked: ${action} - ${category} - ${label}`);
}

// Social Media Integration
function initializeSocialMedia() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href === '#') {
                e.preventDefault();
                
                const platform = link.classList[1]; // facebook, instagram, etc.
                const message = isRTL ? 
                    'تفضل بزيارة صفحتنا على ' + platform :
                    'Please visit our ' + platform + ' page';
                
                alert(message);
            }
            
            trackInteraction('social_click', 'social_media', link.classList[1]);
        });
    });
}

// Contact Form Handling (if needed in future)
function initializeContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to your server
        console.log('Contact form submitted:', data);
        
        // Show success message
        const successMessage = isRTL ? 
            'تم إرسال رسالتك بنجاح!' :
            'Your message has been sent successfully!';
        
        alert(successMessage);
        
        // Reset form
        contactForm.reset();
        
        trackInteraction('form_submit', 'contact', 'contact_form');
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    initializeSocialMedia();
    initializeContactForm();
});

// Print functionality
function initializePrint() {
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
            trackInteraction('print', 'utility', 'print_page');
        });
    }
}

// Service Worker Registration (for PWA support)
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

// Final initialization
document.addEventListener('DOMContentLoaded', () => {
    initializePrint();
    
    // Add loading complete class to body
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

console.log('Script loaded successfully - Al-Israa Creativity Co. Website');