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

    // --- Stats Counter Animation ---
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.stat-number');

    if (statsSection && counters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const suffix = counter.getAttribute('data-suffix');
                    const duration = 2000; // 2 seconds animation
                    const increment = target / (duration / 20); // 20ms frame

                    let count = 0;
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count) + suffix;
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    updateCount();
                });
            }
        }, { threshold: 0.5 }); // Trigger when 50% visible
        statsObserver.observe(statsSection);
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinkItems = navLinks.querySelectorAll('a:not(.dropdown-toggle)');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Mobile dropdown toggle
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                }
            });
            // Toggle current item
            item.classList.toggle('expanded');
        });
    });

    // --- Progress Bar Animation with Re-trigger ---
    const progressSection = document.querySelector('.section[style*="background: var(--primary-dark)"]'); // Targeting the specific section
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressValues = document.querySelectorAll('.progress-value');

    if (progressBars.length > 0) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate IN
                    progressBars.forEach((bar) => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress + '%';
                    });

                    progressValues.forEach((value) => {
                        const targetValue = parseInt(value.getAttribute('data-value'));
                        let currentValue = 0;
                        // Slower increment: targetValue / (3000ms / 20ms) = targetValue / 150
                        const increment = targetValue / 150;

                        // Clear any existing interval to prevent overlapping
                        if (value.interval) clearInterval(value.interval);

                        value.interval = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= targetValue) {
                                currentValue = targetValue;
                                clearInterval(value.interval);
                            }
                            value.textContent = Math.round(currentValue) + '%';
                        }, 20);
                    });
                } else {
                    // Reset OUT (so it can animate again)
                    progressBars.forEach((bar) => {
                        bar.style.width = '0%';
                    });
                    progressValues.forEach((value) => {
                        value.textContent = '0%';
                        if (value.interval) clearInterval(value.interval);
                    });
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% of section is visible

        if (progressBars[0]) {
            // Observe the parent section of the first bar to trigger all at once
            const section = progressBars[0].closest('section');
            if (section) progressObserver.observe(section);
        }
    }
});
