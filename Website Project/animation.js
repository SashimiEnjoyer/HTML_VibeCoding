/* ===== ANIMATED STATISTICS ON SCROLL (Updated for API data) ===== */

// Intersection Observer to detect when stats section comes into view
const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // When stats section is visible
            // Find all statistic numbers and animate them (only if not loading)
            const statNumbers = entry.target.querySelectorAll('.stat-item h3:not(.loading):not(.error)');
            statNumbers.forEach(stat => {
                // Only animate if the stat has already been loaded from API
                if (stat.textContent && stat.textContent !== 'Loading...' && stat.textContent !== 'Unable to load') {
                    const finalValue = stat.textContent; // Get final text (e.g., "10M+")
                    const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, '')); // Extract number
                    if (numericValue) {
                        animateNumber(stat, 0, numericValue, finalValue);
                    }
                }
            });
        }
    });
});

/* Number animation function (enhanced for API data) */
function animateNumber(element, start, end, suffix) {
    const duration = 2000; // Animation duration in milliseconds
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Progress from 0 to 1
        const current = start + (end - start) * easeOutQuart(progress); // Current number with easing
        
        let displayValue;
        // Format the number based on the original suffix
        if (suffix.includes('M+')) {
            displayValue = (current / 1000000).toFixed(1) + 'M+'; // Millions
        } else if (suffix.includes('K+')) {
            displayValue = (current / 1000).toFixed(0) + 'K+'; // Thousands
        } else if (suffix.includes('%')) {
            displayValue = current.toFixed(1) + '%'; // Percentage
        } else if (suffix.includes('+')) {
            displayValue = Math.floor(current) + '+'; // Whole number with plus
        } else if (suffix.includes('/7')) {
            displayValue = Math.floor(current) + '/7'; // Support format
        } else {
            displayValue = suffix; // Keep original if no number
        }
        
        element.textContent = displayValue;
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/* Easing function for smooth animation end */
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4); // Starts fast, slows down at end
}

/* Initialize animations when DOM is loaded */
document.addEventListener('DOMContentLoaded', () => {
    // Start observing the stats section for scroll animations
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observeStats.observe(statsSection);
    }
    
    // Add any other initialization code here
    initializeOtherAnimations();
});

/* Initialize other animations and interactions */
function initializeOtherAnimations() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle scale effect on hover
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset transform on mouse leave
            card.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            createRippleEffect(e, button);
        });
    });
}

/* Create ripple effect on button clicks */
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/* Add CSS for ripple animation dynamically */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* Utility function to trigger stats animation manually (if needed) */
function triggerStatsAnimation() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        // Manually trigger the intersection observer
        observeStats.unobserve(statsSection);
        observeStats.observe(statsSection);
    }
}

/* Export functions for use in other scripts (if using modules) */
// export { animateNumber, triggerStatsAnimation, easeOutQuart };