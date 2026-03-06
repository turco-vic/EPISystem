<template>
    <PageHeader title="Estoque" />
    <main>
        <h1>Bem-vindo ao EPI System</h1>
        <PageNav />
    </main>
    <PageFooter />
</template>

<script>
import PageNav from "../components/PageNav.vue";
import PageHeader from "../components/Header.vue";
import PageFooter from "../components/Footer.vue";

export default {
    name: "Estoque",
    components: {
        PageNav,
        Header,
        Footer,
    },
}
</script>
