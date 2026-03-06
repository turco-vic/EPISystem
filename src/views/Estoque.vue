<template>
    <Header />
    <main>
        <h1>Estoque</h1>
    </main>
    <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "Estoque",
    components: {
        Header,
        Footer,
    },
}
</script>
