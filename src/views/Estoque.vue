<template>
    <HeaderDashboard />
    <main>
        <h1>Estoque</h1>
    </main>
    <Footer />
</template>

<script>
import HeaderDashboard from "../components/HeaderDashboard.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "Estoque",
    components: {
        HeaderDashboard,
        Footer,
    },
}
</script>
