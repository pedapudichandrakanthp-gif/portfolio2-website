// =========================================================
// 1. SMART HEADER (Shrink & Glassmorphism)
// =========================================================
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    // Add background and shrink effect on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled', 'shrink');
    } else {
        header.classList.remove('scrolled', 'shrink');
    }

    // Scroll To Top Button Logic
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to Top click event
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================================
// 2. MOBILE MENU (Smooth Dropdown)
// =========================================================
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    
    const icon = hamburger.querySelector('i');
    if(navLinksContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on click (Responsive Fix)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// =========================================================
// 3. SCROLL REVEAL & PROGRESS BAR ANIMATION
// =========================================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger section reveal
            entry.target.classList.add('in-view');
            
            // If the section contains progress bars, trigger their animation
            const progressBars = entry.target.querySelectorAll('.progress');
            if (progressBars.length > 0) {
                progressBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                });
            }
            
            observer.unobserve(entry.target); // Run once for performance
        }
    });
}, observerOptions);

document.querySelectorAll('.section-animate').forEach(el => observer.observe(el));

// =========================================================
// 4. ACTIVE NAVBAR HIGHLIGHTING
// =========================================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Offset mathematical adjustment for fixed header
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
