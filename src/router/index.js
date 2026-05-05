import { createRouter, createWebHistory } from 'vue-router'
import { useSupabase } from '../composables/useSupabase.js'

import Home from '../views/Home.vue'
import Sobre from '../views/Sobre.vue'
import Contato from '../views/Contato.vue'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Dashboard from '../views/Dashboard.vue'
import Estoque from '../views/Estoque.vue'
import Perfil from '../views/Perfil.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/sobre', component: Sobre },
    { path: '/contato', component: Contato },
    { path: '/login', component: Login },
    { path: '/cadastro', component: Cadastro },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/estoque',
        component: Estoque,
        meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
        path: '/perfil',
        component: Perfil,
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    const { supabase, loadingSession } = useSupabase()

    if (loadingSession.value) {
        await new Promise(resolve => {
            const stop = setInterval(() => {
                if (!loadingSession.value) {
                    clearInterval(stop)
                    resolve()
                }
            }, 50)
        })
    }

    const { data: { session } } = await supabase.auth.getSession()

    if (to.meta.requiresAuth && !session) {
        return '/login'
    }

    if (to.meta.roles && session) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()

        const role = profile?.role

        if (!to.meta.roles.includes(role)) {
            return '/dashboard'
        }
    }

    if ((to.path === '/login' || to.path === '/cadastro') && session) {
        return '/dashboard'
    }
})

export default router
