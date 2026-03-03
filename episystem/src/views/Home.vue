
<template>
    <div :class="$style.container">
    <header :class="$style.header">
        <h1>Home</h1>
    </header>
    <main :class="$style.main">
        <h1 :class="$style.title">Bem-vindo ao SystemACE</h1>
        <PageNav />
    </main>
    <footer :class="$style.footer">
        <p :class="$style.copyright">© 2024 Sistema ACE. Todos os direitos reservados.</p>
    </footer>
    </div>
</template>

<style module src="../styles/Home.module.css"></style>

<script>
import PageNav from "../components/PageNav.vue";

export default {
    name: "Home",
    components: {
        PageNav,
    },
}
</script>
