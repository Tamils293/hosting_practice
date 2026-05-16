// Main App Initialization
import { initNavigation } from './navigation.js';
import { initHero } from './hero.js';
import { initServices } from './services.js';

export const initApp = () => {
    console.log('Initializing Creatary app...');

    initNavigation();
    initHero();
    initServices();

    console.log('App initialized successfully');
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
