const AssessmentRoutes = {
    path: '/assessment',
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Onboarding',
            path: 'onboarding/:stepname', 
            component: () => import('@/views/assessment/Onboarding.vue'), 
            meta: { requiresAuth: false } 
        },
        {
            name: 'Anatomy',
            path: 'anatomy', 
            component: () => import('@/views/assessment/Anatomy.vue'), 
            meta: { requiresAuth: false } 
        },
        {
            name: 'Questionary',
            path: 'questionary/:stepname', 
            component: () => import('@/views/assessment/Questionary.vue'), 
            meta: { requiresAuth: false } 
        },
        {
            name: 'WorkoutListing',
            path: 'workouts', 
            component: () => import('@/views/assessment/WorkoutListing.vue'), 
            meta: { requiresAuth: false } 
        },
        {
            name: 'Report',
            path: 'report', 
            component: () => import('@/views/assessment/Report.vue'), 
            meta: { requiresAuth: false } 
        },
        {
            name: 'Achievement',
            path: 'achievement', 
            component: () => import('@/views/assessment/AchievementUnlock.vue'), 
            meta: { requiresAuth: false } 
        },
        {
            name: 'RecoveryPlan',
            path: 'recoveryplan', 
            component: () => import('@/views/assessment/RecoveryPlan.vue'), 
            meta: { requiresAuth: false } 
        },
        {
            name: 'RecoveryTimeline',
            path: 'timeline', 
            component: () => import('@/views/assessment/RecoveryTimeline.vue'), 
            meta: { requiresAuth: false } 
        },
        {
            name: 'ReminderConfig',
            path: 'reminder', 
            component: () => import('@/views/assessment/ReminderConfiguration.vue'), 
            meta: { requiresAuth: false } 
        },
    ]
};

export default AssessmentRoutes;