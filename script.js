document.addEventListener('DOMContentLoaded', () => {

    // Elements to reveal on scroll
    const reveals = document.querySelectorAll('.reveal, .scroll-reveal');
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

    // --- Timeline Scroll Animation ---
    const timeline = document.querySelector('.timeline');
    const timelineFill = document.querySelector('.timeline-fill');

    if (timeline && timelineFill) {
        window.addEventListener('scroll', () => {
            const timelineRect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const startOffset = windowHeight * 0.8; // Start filling when top reaches 80% viewport

            // Calculate how much of the timeline has been scrolled past
            let scrollDistance = windowHeight - timelineRect.top - (windowHeight - startOffset);
            let timelineHeight = timeline.offsetHeight;

            // Clamp values between 0 and total height
            let fillHeight = Math.max(0, Math.min(scrollDistance, timelineHeight));

            // Convert to percentage for smoother response
            let fillPercentage = (fillHeight / timelineHeight) * 100;

            timelineFill.style.height = `${fillPercentage}%`;
        });
    }

    // --- Life at Click & Connect Carousel (Infinite Loop) ---
    const lifeCarousel = document.querySelector('.life-carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev-btn');
    const nextBtn = document.querySelector('.carousel-btn.next-btn');

    if (lifeCarousel && prevBtn && nextBtn) {
        // Clone for infinite illusion
        const items = Array.from(lifeCarousel.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            lifeCarousel.appendChild(clone);
        });

        const scrollAmount = 350; // Card width + gap

        nextBtn.addEventListener('click', () => {
            // Infinite Scroll Logic: If near end, jump to middle
            if (lifeCarousel.scrollLeft + lifeCarousel.clientWidth >= lifeCarousel.scrollWidth - 10) {
                lifeCarousel.style.scrollBehavior = 'auto'; // Disable smooth
                lifeCarousel.scrollLeft = 0; // Jump to start
                lifeCarousel.style.scrollBehavior = 'smooth'; // Re-enable
            }
            lifeCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            // Infinite Scroll Logic: If at start, jump to middle/end
            if (lifeCarousel.scrollLeft <= 0) {
                lifeCarousel.style.scrollBehavior = 'auto';
                lifeCarousel.scrollLeft = lifeCarousel.scrollWidth / 2; // Jump to middle
                lifeCarousel.style.scrollBehavior = 'smooth';
            }
            lifeCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // --- FAQ Accordion (New) ---
    const accordionItems = document.querySelectorAll('.faq-accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.faq-accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                // Close other open items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
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





    // --- Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.btn-primary, .carousel-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Hero Text Reveal Animation Removed for Clarity ---
    // The previous character-by-character split was causing persistent blur issues on some renderers.
    // Reverting to CSS-only fade-in for reliability.

});
