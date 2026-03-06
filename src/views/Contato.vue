<template>
    <Header title="Contato" />
    <main>
        <h1>Bem-vindo ao EPI System</h1>
        <PageNav />
    </main>
    <Footer />
</template>

<script>
import PageNav from "../components/PageNav.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "Contato",
    components: {
        PageNav,
        Header,
        Footer,
    },
}
</script>
