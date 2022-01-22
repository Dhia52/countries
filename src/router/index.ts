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
            component: Home,
            meta: { title: "Home" }
        },
        {
            path: '/country/:countryCode',
            name: 'Country',
            component: Country,
            props: true,
            meta: { title: "Country" }
        },
        {
            path: '/region/:regionName',
            name: 'Region',
            component: Region,
            props: true,
            meta: { title: "Continent" }
        },
        {
            path: '/:path(.*)*',
            name: 'NotFound',
            component: NotFound,
            meta: { title: "Not Found" }
        }
    ]
})

router.afterEach((to, from) => {
    console.log(to)
    if (to.meta.title) {
        document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
    }
})

export default router