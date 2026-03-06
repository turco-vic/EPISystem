<template>
    <Header />
    <main>
        <h1>Dashboard</h1>
    </main>
    <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "Dashboard",
    components: {
        Header,
        Footer,
    },
}
</script>
