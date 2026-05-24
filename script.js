// Add interactive motion and reveal behavior to the page
const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.site-nav a');
const sections = document.querySelectorAll('section');
const heroImage = document.querySelector('.hero-image');
const headerToggle = document.querySelector('.header-toggle');
const headerShowButton = document.querySelector('.header-show-button');

const toggleHeaderVisibility = (show) => {
    if (!header || !headerShowButton) return;
    header.classList.toggle('hidden', !show);
    headerShowButton.classList.toggle('hidden', show);
};

if (headerToggle) {
    headerToggle.addEventListener('click', () => toggleHeaderVisibility(false));
}

if (headerShowButton) {
    headerShowButton.addEventListener('click', () => toggleHeaderVisibility(true));
}

// Reveal sections when they enter the viewport
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

sections.forEach((section) => {
    section.classList.add('reveal');
    revealObserver.observe(section);
});

// Animate the hero image with a floating motion
window.addEventListener('load', () => {
    if (heroImage) {
        heroImage.classList.add('animate');
    }
});

// Update header style and active nav states on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    header.classList.toggle('header-scrolled', scrollY > 20);

    const offset = scrollY + window.innerHeight / 3;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const targetLink = document.querySelector(`.site-nav a[href="#${section.id}"]`);

        if (targetLink) {
            targetLink.classList.toggle('active', offset >= sectionTop && offset < sectionBottom);
        }
    });
});

// Add gentle hover scaling on navigation links
navLinks.forEach((link, index) => {
    link.style.transitionDelay = `${index * 45}ms`;
    link.addEventListener('mouseenter', () => link.classList.add('nav-hover'));
    link.addEventListener('mouseleave', () => link.classList.remove('nav-hover'));
});

// Hide header when the page is scrolled into the hero section for more visibility
window.addEventListener('keydown', (event) => {
    if (event.key === 'h' || event.key === 'H') {
        toggleHeaderVisibility(false);
    }
});
