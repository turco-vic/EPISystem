<template>
    <Header />
    <main>
        <h1>Sobre o Sistema</h1>
    </main>
    <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "Sobre",
    components: {
        Header,
        Footer,
    },
};
</script>
