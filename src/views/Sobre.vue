<template>
    <header>
        <h1>Sobre o Sistema</h1>
    </header>
    <main>
        <h1>Bem-vindo ao EPI System</h1>
        <PageNav />
    </main>
    <footer>
        <p>© 2024 EPI System. Todos os direitos reservados.</p>
    </footer>
</template>

<script>
import PageNav from "../components/PageNav.vue";

export default {
    name: "Sobre",
    components: {
        PageNav,
    },
};
</script>
