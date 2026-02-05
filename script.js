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
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.85)';
            nav.style.boxShadow = 'none';
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const speed = 50;
            const increment = target / speed;

            if (entry.isIntersecting) {
                const updateCounter = () => {
                    const c = +counter.innerText.replace(/\D/g, '');
                    if (c < target) {
                        counter.innerText = Math.ceil(c + increment).toLocaleString() + "+";
                        // Store timer ID to clear it later if needed (simple approach: just let it run or rely on reset)
                        // For robustness, we won't overengineer, but resetting to 0 on exit handles the visuals.
                        // However, to prevent "speed up" on rapid toggle, a lock is better. 
                        // But since we are editing a file, let's keep it clean.
                        // The simplest robust way without storing ID:
                        if (counter.getAttribute('data-animating') === 'true') {
                            setTimeout(updateCounter, 20);
                        }
                    } else {
                        counter.innerText = target.toLocaleString() + "+";
                    }
                };

                // Only start if not already animating
                if (counter.getAttribute('data-animating') !== 'true') {
                    counter.setAttribute('data-animating', 'true');
                    updateCounter();
                }
            } else {
                // Reset when out of view
                counter.setAttribute('data-animating', 'false');
                counter.innerText = "0";
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Custom Cursor
    if (window.innerWidth > 1024) {
        const cursorDot = document.createElement('div');
        const cursorOutline = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        cursorOutline.classList.add('cursor-outline');
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // cursorOutline.style.left = `${posX}px`;
            // cursorOutline.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover Effect
        const hoverElements = document.querySelectorAll('a, button, .faq-header, .social-icon, .whatsapp-widget');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
    }

    // Back to Top Button
    const backToTop = document.createElement('div');
    backToTop.classList.add('back-to-top');
    backToTop.innerHTML = '<ion-icon name="arrow-up-outline"></ion-icon>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active')
                ? '<ion-icon name="close-outline"></ion-icon>'
                : '<ion-icon name="menu-outline"></ion-icon>';
        });

        // Close menu when link is clicked
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
            });
        });
    }
});
