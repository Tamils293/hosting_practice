// Number Scrolling Effect
class ScrollingNumber {
    constructor(element) {
        this.element = element;
        this.target = element.dataset.target;
        this.duration = 2000; // 2 seconds
        this.hasAnimated = false;
        this.startValue = 0;
        this.currentValue = 0;

        // Observe when element comes into view
        this.observeElement();
    }

    observeElement() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animate();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(this.element);
    }

    animate() {
        const startTime = Date.now();
        const endValue = parseInt(this.target);

        const update = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // Easing function for smooth animation
            const easeOutQuad = (t) => t * (2 - t);
            const easedProgress = easeOutQuad(progress);

            this.currentValue = Math.floor(this.startValue + (endValue - this.startValue) * easedProgress);
            this.element.textContent = this.formatNumber(this.currentValue);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                this.element.textContent = this.formatNumber(endValue);
            }
        };

        requestAnimationFrame(update);
    }

    formatNumber(num) {
        return num.toString();
    }
}

// Initialize all scrolling numbers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const scrollingNumbers = document.querySelectorAll('[data-target]');
    scrollingNumbers.forEach((element) => {
        new ScrollingNumber(element);
    });
});
