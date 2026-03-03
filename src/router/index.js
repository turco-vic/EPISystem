import { createRouter, createWebHistory } from 'vue-router'

import Home from "../views/Home.vue"
import Sobre from "../views/Sobre.vue"
import Contato from "../views/Contato.vue"
import Login from "../views/Login.vue"
import Cadastro from "../views/Cadastro.vue"
import Dashboard from "../views/Dashboard.vue"
import Estoque from "../views/Estoque.vue"

const routes = [
    {
        path: "/", 
        component: Home
    },
    {
        path: "/sobre", 
        component: Sobre
    },
    {
        path: "/contato", 
        component: Contato
    },
    {
        path: "/login", 
        component: Login
    },
    {
        path: "/cadastro", 
        component: Cadastro
    },
    {
        path: "/dashboard", 
        component: Dashboard
    },
    {
        path: "/estoque", 
        component: Estoque
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
