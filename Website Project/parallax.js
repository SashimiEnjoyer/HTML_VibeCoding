/* ===== SMOOTH SCROLLING FOR NAVIGATION ===== */
// Add click event listeners to all anchor links that start with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Smoothly scroll to target section
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ===== ENHANCED PARALLAX SCROLLING EFFECTS ===== */
// Main scroll event listener that handles all parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset; // Current scroll position
    const viewportHeight = window.innerHeight; // Browser window height
    
    /* Header background opacity change on scroll */
    const header = document.querySelector('header');
    if (scrolled > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)'; // More opaque when scrolled
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.8)'; // Semi-transparent at top
    }
    
    /* Hero section parallax effects */
    // Move hero background slower than scroll (parallax effect)
    const heroParallaxBg = document.querySelector('.parallax-bg');
    if (heroParallaxBg) {
        const speed = scrolled * 0.5; // Moves at half scroll speed
        heroParallaxBg.style.transform = `translate3d(0, ${speed}px, 0)`;
    }
    
    // Hero content moves slightly and fades out as user scrolls
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < viewportHeight) {
        const heroSpeed = scrolled * 0.3; // Slower movement
        heroContent.style.transform = `translate3d(0, ${heroSpeed}px, 0)`;
        // Fade out calculation: opacity decreases as scroll increases
        heroContent.style.opacity = 1 - (scrolled / viewportHeight) * 1.2;
    }
    
    /* Features section parallax background */
    const featuresSection = document.querySelector('.features');
    const featuresBg = document.querySelector('.features-bg');
    if (featuresSection && featuresBg) {
        const rect = featuresSection.getBoundingClientRect();
        // Only animate when section is visible
        if (rect.top < viewportHeight && rect.bottom > 0) {
            // Calculate how much of section is visible
            const sectionScrolled = (viewportHeight - rect.top) / (viewportHeight + rect.height);
            const bgSpeed = sectionScrolled * 100;
            // Move background and scale it slightly for depth
            featuresBg.style.transform = `translate3d(0, ${bgSpeed}px, 0) scale(1.1)`;
        }
    }
    
    /* Stats section parallax background */
    const statsSection = document.querySelector('.stats');
    const statsBg = document.querySelector('.stats-bg');
    if (statsSection && statsBg) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
            const sectionScrolled = (viewportHeight - rect.top) / (viewportHeight + rect.height);
            const bgSpeed = sectionScrolled * -50; // Negative for opposite direction
            statsBg.style.transform = `translate3d(0, ${bgSpeed}px, 0) scale(1.2)`;
        }
    }
    
    /* Enhanced floating elements parallax */
    const parallax = document.querySelectorAll('.floating-element');
    parallax.forEach((element, index) => {
        const speed = (index + 1) * 0.7; // Each element moves at different speed
        const yPos = scrolled * speed;
        const rotation = scrolled * 0.2 + (index * 30); // Rotation based on scroll
        element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
        // Fade out floating elements as they scroll up
        element.style.opacity = Math.max(0.3, 1 - (scrolled / viewportHeight) * 0.8);
    });

    /* Section titles parallax effect */
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const rect = title.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
            // Move titles slightly based on scroll position within viewport
            const elementScrolled = (viewportHeight - rect.top) / viewportHeight;
            const titleSpeed = elementScrolled * 30;
            title.style.transform = `translate3d(0, ${titleSpeed}px, 0)`;
        }
    });

    /* Feature cards staggered parallax effect */
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
            // Each card moves at slightly different speed for staggered effect
            const elementScrolled = (viewportHeight - rect.top) / viewportHeight;
            const cardSpeed = elementScrolled * (20 + index * 5); // Increasing speed per card
            card.style.transform = `translate3d(0, ${cardSpeed}px, 0)`;
        }
    });
});