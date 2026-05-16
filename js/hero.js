// Hero Module - Handle hero section interactions
export const initHero = () => {
    const ctaButton = document.querySelector('.cta');
    const heroSection = document.querySelector('.hero');

    // CTA Button click handler
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            const href = ctaButton.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        // Add hover effect
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.transform = 'translateY(-3px)';
        });

        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translateY(0)';
        });
    }

    // 3D Cube rotates automatically via CSS animation
    // No additional hover effects needed for the cube

    // Add fade-in animation on page load
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.animation = 'fadeInHero 0.8s ease-out forwards';
    }

    // Add keyframe animation
    if (!document.querySelector('style[data-hero-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-hero-animation', 'true');
        style.textContent = `
            @keyframes fadeInHero {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('Hero module initialized');
};
