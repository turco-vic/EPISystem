
<template>
    <div class="container">
    <Header title="Home" />
    <main class="main">
        <section class= "content">
            <h1>Gestão Inteligente de</h1>
        </section>
    </main>
    <Footer />
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "Home",
    components: {
        Header,
        Footer,
    },
}
</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #000000;
    background: linear-gradient(180deg,#000000 10%, #878787 100%);
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    height: 80vh;
}
</style>
