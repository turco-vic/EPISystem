
<template>
    <div class="container">
    <Header title="Home" />
    <main class="main">
        <h1 class="title">Bem-vindo ao SystemACE</h1>
        <PageNav />
    </main>
    <Footer />
    </div>
</template>

<script>
import PageNav from "../components/PageNav.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "Home",
    components: {
        PageNav,
        Header,
        Footer,
    },
}
</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    height: 80vh;
}
</style>
