document.addEventListener('DOMContentLoaded', () => {

    // Elements to reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const heroContent = document.querySelector('.hero-content');

    // Intersection Observer for scroll animations
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Put this to animate only once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% is visible
    });

    reveals.forEach(el => revealObserver.observe(el));

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.padding = '1rem 2rem';
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.85)';
            nav.style.padding = '1.5rem 2rem';
            nav.style.boxShadow = 'none';
        }
    });

});
