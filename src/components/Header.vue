<template>
    <header class="header-container">
        <h1 class="header-title">
            <router-link to="/" class="header-link">EPI System</router-link>
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
export default {
    name: "Header",
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.header-title {
    font-family: 'Anton', sans-serif;
}

.header-link {
    color: #dedede;
    text-decoration: none;
    transition: color 0.3s;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000000;
    color: #dedede;
    height: 10vh;
    padding: 0 2rem;
}

.nav-container {
    display: flex;
    gap: 1.5rem;
}

.nav-link {
    color: #dedede;
    font-family: 'Red Hat Display', sans-serif;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s;
}

.user-icon {
    color: #dedede;
    font-size: 1.5rem;
    text-decoration: none;
    transition: color 0.3s;
}

.user-icon:hover {
    color: #ffffff;
}
</style>
