<template>
    <header class="header-container">
        <h1 class="header-title">
            <router-link :to="session ? '/dashboard' : '/'" class="header-link">EPI System</router-link>
        </h1>
        <nav class="nav-container">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/sobre" class="nav-link">Sobre</router-link>
            <router-link to="/contato" class="nav-link">Contato</router-link>
        </nav>
        <router-link to="/login" class="user-icon">
            <i class="fa-solid fa-user"></i>
        </router-link>
    </header>
</template>

<script>
import { useSupabase } from "../composables/useSupabase.js";

export default {
    name: "Header",
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    setup() {
        const { session } = useSupabase();
        return { session };
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
    transition: transform 0.3s ease, color 0.3s ease;
}

.header-title:hover {
    color: #243c75;
    transform: scale(1.05);
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
    color: #e2f9ff;
    transform: translateY(-2px);
}

.nav-link:hover::after {
    width: 100%;
}

.user-icon {
    color: #e2f9ff;
    font-size: 1.5rem;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
}

.user-icon:hover {
    color: #d3d3d3;
    transform: scale(1.1);
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

    .user-icon {
        order: 2;
        margin-left: auto;
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
