import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/book'
    }, //重定向到某一页
    {
        path: '/book',
        name: 'Book',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/book'),
        children: [{
            name: 'bookReader',
            path: ':FileName',
            component: () =>
                import ('../components/ebook/BookReader.vue')
        }]
    }
]

const router = new VueRouter({
    routes
})

export default router