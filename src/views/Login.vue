<template>
    <Header title="Login" />
    <main class="main" ref="mainRef">
        <aside class="leff-side">
            <h1>Login</h1>
            <p>Faça login para acessar o sistema</p>
        </aside>
    </main>
    <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
    name: 'Login',
    components: {
        Header,
        Footer,
    },
}
</script>

<style scoped>

</style>