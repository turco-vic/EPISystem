<template>
    <div class="sidebar" :class="{ open: isOpen }">
        <div class="sidebar-top">
            <h2 class="sidebar-title">EPI System</h2>
            <nav class="sidebar-nav">
                <router-link to="/dashboard" class="nav-item" @click="close">
                    <i class="fa-solid fa-gauge"></i>
                    <span>Dashboard</span>
                </router-link>
                <router-link to="/estoque" class="nav-item" @click="close">
                    <i class="fa-solid fa-boxes-stacked"></i>
                    <span>Estoque</span>
                </router-link>
                <router-link to="/perfil" class="nav-item" @click="close">
                    <i class="fa-solid fa-circle-user"></i>
                    <span>Perfil</span>
                </router-link>
            </nav>
        </div>
        <div class="sidebar-bottom">
            <button class="logout-btn" @click="handleLogout">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span>Sair</span>
            </button>
        </div>
    </div>
    <div class="overlay" v-if="isOpen" @click="close"></div>
</template>

<script>
import { useSupabase } from "../composables/useSupabase.js";
import { useRouter } from "vue-router";

export default {
    name: "Sidebar",
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const { supabase } = useSupabase();
        const router = useRouter();

        function close() {
            emit('close');
        }

        async function handleLogout() {
            await supabase.auth.signOut();
            router.push('/login');
        }

        return { close, handleLogout };
    }
};
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 260px;
    background-color: #243c75;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem 1.5rem;
    box-sizing: border-box;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.sidebar.open {
    transform: translateX(0);
}

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
}

.sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.sidebar-title {
    font-family: 'Anton', sans-serif;
    color: #e2f9ff;
    font-size: 1.5rem;
    margin: 0;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: #e2f9ff;
    text-decoration: none;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: background-color 0.2s ease;
}

.nav-item:hover,
.nav-item.router-link-active {
    background-color: rgba(226, 249, 255, 0.15);
}

.nav-item i {
    width: 1.2rem;
    text-align: center;
}

.sidebar-bottom {
    display: flex;
    justify-content: flex-end;
}

.logout-btn {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.6rem;
    background: transparent;
    border: 2px solid #e2f9ff;
    color: #e2f9ff;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.logout-btn:hover {
    background-color: #e2f9ff;
    color: #243c75;
}
</style>