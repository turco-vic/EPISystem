<template>
    <header class="header-container">
        <h1 class="header-title">
            <router-link to="/dashboard" class="header-link">EPI System</router-link>
        </h1>
        <nav class="nav-container">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            <router-link to="/estoque" class="nav-link">Estoque</router-link>
        </nav>
        <button class="logout-btn" @click="handleLogout">
            <i class="fa-solid fa-right-from-bracket"></i>
            Sair
        </button>
    </header>
</template>

<script>
import { useSupabase } from "../composables/useSupabase.js";
import { useRouter } from "vue-router";

export default {
    name: "HeaderDashboard",
    setup() {
        const { supabase } = useSupabase();
        const router = useRouter();

        async function handleLogout() {
            await supabase.auth.signOut();
            router.push('/login');
        }

        return { handleLogout };
    }
};
</script>

<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #243c75;
    color: #e2f9ff;
    height: 10vh;
    padding: 0 2rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    box-sizing: border-box;
}

.header-title {
    font-family: 'Anton', sans-serif;
}

.header-link {
    color: #e2f9ff;
    text-decoration: none;
    transition: color 0.3s ease;
}

.header-link:hover {
    color: #d3d3d3;
}

.nav-container {
    display: flex;
    gap: 1.5rem;
}

.nav-link {
    color: #e2f9ff;
    font-family: 'Red Hat Display', sans-serif;
    text-decoration: none;
    font-size: 1.2rem;
    position: relative;
    padding-bottom: 5px;
    transition: color 0.3s ease, transform 0.3s ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: #e2f9ff;
    transition: width 0.3s ease-in-out;
    border-radius: 2px;
}

.nav-link:hover {
    transform: translateY(-2px);
}

.nav-link:hover::after {
    width: 100%;
}

.logout-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: 2px solid #e2f9ff;
    color: #e2f9ff;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.4rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.logout-btn:hover {
    background-color: #e2f9ff;
    color: #243c75;
}

@media (max-width: 768px) {
    .header-container {
        height: auto;
        padding: 0.75rem 1rem;
        flex-wrap: wrap;
        row-gap: 0.75rem;
    }

    .header-title {
        order: 1;
        margin: 0;
    }

    .logout-btn {
        order: 2;
    }

    .nav-container {
        order: 3;
        width: 100%;
        justify-content: center;
        gap: 1rem;
    }

    .nav-link {
        font-size: 1rem;
    }
}
</style>