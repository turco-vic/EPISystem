<template>
    <PageHeader title="Dashboard" />
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
    name: "Dashboard",
    components: {
        PageNav,
        Header,
        Footer,
    },
}
</script>
