import * as VueRouter from 'vue-router'

import Home from '../pages/Home.vue'
import Country from '../pages/Country.vue'
import Region from '../pages/Region.vue'
import NotFound from '../pages/NotFound.vue'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/country/:countryCode',
            name: 'Country',
            component: Country,
            props: true
        },
        {
            path: '/region/:regionCode',
            name: 'Region',
            component: Region,
            props: true
        },
        {
            path: '/:path(.*)*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})

export default router