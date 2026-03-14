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
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000000;
    color: #dedede;
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

.header-title:hover {
    color: #ffffff;
    scale: 1.1;
}

.header-link {
    color: #dedede;
    text-decoration: none;
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
}

.user-icon {
    color: #dedede;
    font-size: 1.5rem;
    text-decoration: none;
}

.user-icon:hover {
    color: #ffffff;
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
