document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    // Position variables
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Mouse Move Event - Update target position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        // Ensure visibility
        cursorDot.style.display = 'block';
        cursorOutline.style.display = 'block';
    });

    // Smooth Animation Loop for Outline
    const animateOutline = () => {
        // Linear Interpolation (Lerp) for smooth delay
        // Move 10% of the distance each frame
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateOutline);
    };

    // Start Animation Loop
    animateOutline();

    // Hover Effects
    const links = document.querySelectorAll('a, button, .btn-primary, .service-card, .faq-question, .carousel-btn, .strict-card');

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
            cursorDot.classList.add('hovered');
        });

        link.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
            cursorDot.classList.remove('hovered');
        });
    });
});
