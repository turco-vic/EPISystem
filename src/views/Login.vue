<template>
    <Header title="Login" />
    <main>
        <h1>Login</h1>
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
