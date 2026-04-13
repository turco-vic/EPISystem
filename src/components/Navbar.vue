<template>
    <nav class="navbar">
        <h1 class="navbar-title">
            <router-link :to="logoDestino" class="header-link">EPI System</router-link>
        </h1>
        <button class="menu-btn" @click="$emit('toggle')">
            <i class="fa-solid fa-bars"></i>
        </button>
    </nav>
</template>

<script>
import { computed } from "vue";
import { useSupabase } from "../composables/useSupabase.js";

export default {
    name: "NavBar",
    emits: ['toggle'],
    setup() {
        const { session } = useSupabase();
        const logoDestino = computed(() => session.value ? '/dashboard' : '/');
        return { logoDestino };
    }
};
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    background-color: #243c75;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    box-sizing: border-box;
    z-index: 998;
}

.navbar-title {
    font-family: 'Anton', sans-serif;
    transition: transform 0.3s ease, color 0.3s ease;
}

.navbar-title:hover {
    transform: scale(1.05);
}

.header-link {
    color: #e2f9ff;
    text-decoration: none;
    transition: color 0.3s ease;
}

.header-link:visited {
    color: #e2f9ff;
}

.header-link:hover {
    color: #d3d3d3;
}

.menu-btn {
    background: none;
    border: none;
    color: #e2f9ff;
    font-size: 2rem;
    cursor: pointer;
    padding: 0.75rem;
    border-radius: 6px;
    transition: transform 0.2s ease;
}

.menu-btn:hover {
    transform: scale(1.12);
}
</style>
