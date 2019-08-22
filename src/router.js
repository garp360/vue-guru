import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: {
                path: '/dashboard'
            }
        },
        {
            path: '/dashboard',
            component: () => import('./dashboard/Dashboard.vue'),
            children: [{
                    path: '',
                    component: () => import('./matchups/Matchups.vue'),
                },
                {
                    name: 'matchups',
                    path: 'matchups',
                    component: () => import('./matchups/Matchups.vue'),
                },
                {
                    name: 'settings',
                    path: 'settings',
                    component: () => import('./settings/Settings.vue'),
                },
                {
                    name: 'predictions',
                    path: 'predictions',
                    component: () => import('./predictions/Predictions.vue'),
                }
            ]
        }
    ]
})