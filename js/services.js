// Services Section Interactions
export const initServices = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const viewProjectButtons = document.querySelectorAll('.view-projects');

    // Add smooth reveal animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach((card) => {
        observer.observe(card);
    });

    // Handle view projects button clicks
    viewProjectButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const link = button.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        });

        // Add ripple effect
        button.addEventListener('mousedown', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Parallax effect on card images
    serviceCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const image = card.querySelector('.card-image img');
            if (!image) return;

            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const moveX = (x - 0.5) * 10;
            const moveY = (y - 0.5) * 10;

            image.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });

        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.card-image img');
            if (image) {
                image.style.transform = 'scale(1.1) translate(0, 0)';
            }
        });
    });

    console.log('Services initialized with interactions');
};

const modal = document.querySelector('.video-modal');
const iframe = modal.querySelector('iframe');

function openModal(embedUrl) {
    iframe.src = embedUrl;
    modal.hidden = false;
}

function closeModal() {
    iframe.src = ''; // stops playback
    modal.hidden = true;
}

document.addEventListener('click', (e) => {
    const card = e.target.closest('.short-card');
    if (card) openModal(card.dataset.embed);

    if (e.target.matches('[data-close]')) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (!modal.hidden && e.key === 'Escape') closeModal();
});
