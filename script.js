// =========================================================
// 1. MOBILE HEADER SHRINK & SCROLL EFFECTS
// =========================================================
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    // Header Shrink Effect (primarily affects mobile styling via CSS)
    if (window.scrollY > 50) {
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }

    // Scroll To Top Button Visibility
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to Top Action
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =========================================================
// 2. MOBILE MENU TOGGLE
// =========================================================
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    
    // Toggle icon between bars and times (close)
    const icon = hamburger.querySelector('i');
    if(navLinksContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// =========================================================
// 3. SCROLL ANIMATIONS (Fade In Effect)
// =========================================================
const animateElements = document.querySelectorAll('.section-animate');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

animateElements.forEach(el => observer.observe(el));

// =========================================================
// 4. ACTIVE NAVBAR HIGHLIGHT
// =========================================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if scroll position is within the section (offset by header height)
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});
