import { createRouter, createWebHistory } from 'vue-router';
import AssessmentRoutes from './AssessmentRoutes';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        AssessmentRoutes
    ],
    scrollBehavior(to, from, savedPosition) {
        // scroll to the top smoothly
        return new Promise((resolve) => {
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                resolve();
            }, 0); // Slight delay to ensure smoothness
        });
    }
});

