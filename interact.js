// Navigation state
let currentPage = 'home';
let scrollProgress = 0;
let isMobileMenuOpen = false;

// DOM Elements
const navigation = document.getElementById('navigation');
const logo = document.getElementById('logo');
const ctaButton = document.querySelector('.cta-button');
const navItems = document.querySelectorAll('.nav-item');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const pages = document.querySelectorAll('.page');

// Initialize

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupScrollAnimations();
    setupScrollProgress();
    initializePageAnimations();
});

// Setup Navigation
function setupNavigation() {
    // Logo click
    logo.addEventListener('click', () => navigateToPage('home'));

    // Desktop nav items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            navigateToPage(page);
        });
    });

    // Mobile nav items
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            navigateToPage(page);
            toggleMobileMenu();
        });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// Navigate to page
function navigateToPage(page) {
    currentPage = page;
    
    // Hide all pages
    pages.forEach(p => {
        p.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(`${page}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Trigger page animations
        setTimeout(() => {
            const pageElements = selectedPage.querySelectorAll('.page-fade-in');
            pageElements.forEach((element, index) => {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('visible');
                }, parseInt(delay));
            });
        }, 50);
    }
    
    // Update active nav items
    navItems.forEach(item => {
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    mobileNavItems.forEach(item => {
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle mobile menu
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Setup scroll progress for navigation
function setupScrollProgress() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const maxScroll = 300;
        scrollProgress = Math.min(scrollPosition / maxScroll, 1);
        
        updateNavigationStyle();
    });
}

// Update navigation style based on scroll
function updateNavigationStyle() {
    // Background color
    const bgAlpha = scrollProgress * 0.95;
    navigation.style.backgroundColor = `rgba(88, 28, 135, ${bgAlpha})`;
    
    // Backdrop blur
    const blurAmount = scrollProgress * 12;
    navigation.style.backdropFilter = `blur(${blurAmount}px)`;
    navigation.style.webkitBackdropFilter = `blur(${blurAmount}px)`;
    
    // Shadow
    const shadowOpacity = scrollProgress * 0.3;
    navigation.style.boxShadow = `0 4px 6px rgba(0, 0, 0, ${shadowOpacity})`;
    
    // Padding
    const paddingValue = 1.5 - (scrollProgress * 0.5);
    navigation.style.padding = `${paddingValue}rem 0`;
    
    // Logo size
    const logoSize = 1.5 - (scrollProgress * 0.25);
    logo.style.fontSize = `${logoSize}rem`;
    logo.style.opacity = 0.9 + (scrollProgress * 0.1);
    
    // CTA Button style
    const bgR = 255 - (scrollProgress * 50);
    const bgG = 255 - (scrollProgress * 170);
    const bgB = 255 - (scrollProgress * 50);
    const bgAlphaCTA = 1 - (scrollProgress * 0.3);
    
    const colorR = 88 + (scrollProgress * 150);
    const colorG = 28 + (scrollProgress * 70);
    const colorB = 135 + (scrollProgress * 90);
    
    ctaButton.style.backgroundColor = `rgba(${bgR}, ${bgG}, ${bgB}, ${bgAlphaCTA})`;
    ctaButton.style.color = `rgba(${colorR}, ${colorG}, ${colorB}, 1)`;
    ctaButton.style.border = `2px solid rgba(236, 72, 153, ${scrollProgress})`;
}

// Setup scroll animations
function setupScrollAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on order
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observe all scroll-fade-in elements
    const scrollElements = document.querySelectorAll('.scroll-fade-in');
    scrollElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize page animations
function initializePageAnimations() {
    // Trigger home page animations on load
    const homePageElements = document.querySelectorAll('#home-page .page-fade-in');
    homePageElements.forEach((element, index) => {
        const delay = element.getAttribute('data-delay') || 0;
        setTimeout(() => {
            element.classList.add('visible');
        }, parseInt(delay));
    });
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Hero button click
const heroButton = document.querySelector('.hero-button');
if (heroButton) {
    heroButton.addEventListener('click', () => {
        // Scroll to about section
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Prevent form default behavior on mobile CTA
const mobileCTA = document.querySelector('.mobile-cta-button');
if (mobileCTA) {
    mobileCTA.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Welcome! This is the Get Started action.');
    });
}

// Desktop CTA click
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Welcome! This is the Get Started action.');
    });
}
