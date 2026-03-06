
<template>
    <div class="container">
    <PageHeader title="Home" />
    <main class="main">
        <h1 class="title">Bem-vindo ao SystemACE</h1>
        <PageNav />
    </main>
    <PageFooter />
    </div>
</template>

<script>
import PageNav from "../components/PageNav.vue";
import PageHeader from "../components/Header.vue";
import PageFooter from "../components/Footer.vue";

export default {
    name: "Home",
    components: {
        PageNav,
        Header,
        Footer,
    },
}
</script>

<style>

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
