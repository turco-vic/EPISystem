<template>
    <div class="container">
        <Header title="Home" />
        <main class="main">
            <div class="apresentation-page">
                <div class="left-side">
                    <section class="title">
                        <h1>Gestão Inteligente de</h1>
                        <h1 class="highlighted">EPIs para mais</h1>
                        <h1>controle e segurança</h1>
                    </section>
                    <section class="topics">
                        <p class="check"><i class="fas fa-check-circle"></i>Reduza riscos</p>
                        <p class="check"><i class="fas fa-check-circle"></i>Garanta conformidade</p>
                        <p class="check"><i class="fas fa-check-circle"></i> Otimize a gestão dos seus EPIs</p>
                    </section>
                    <article class="content">
                        <p>A segurança dos colaboradores é uma prioridade para qualquer organização. Com o novo Módulo
                            Gestão de EPIs do EPISystem, você tem controle total sobre a distribuição, rastreamento e
                            gestão
                            dos Equipamentos de Proteção Individual (EPIs), garantindo conformidade com as normas de
                            segurança e prevenindo riscos trabalhistas.</p>
                    </article>
                </div>
                <div class="right-side">
                    <aside class="image">
                        <img src="../assets/placeholder.webp" alt="Imagem ilustrativa de segurança no trabalho">
                    </aside>
                </div>
            </div>
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
background: linear-gradient(180deg,#000000 10%, #464646 45%, #878787 100%);
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    height: min-content;
}

.apresentation-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.left-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10rem 5rem 10rem 15rem;
    gap: 2rem;
}

.title {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: #ffffff;
    font-family: "Red Hat Display", sans-serif;
    font-weight: bolder;
    font-size: xx-large;
    gap: 1rem;

}

.highlighted {
    color: #000000;
    background-color: #dedede;
}

.topics {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #ffffff;
    font-family: "Red Hat Display", sans-serif;
    gap: 0.5rem;
}

.check {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

.content {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    font-family: "Red Hat Display", sans-serif;
    gap: 1rem;
}

.right-side {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10rem 10rem 10rem 5rem;
}

.image {
    width: 100%;
    height: auto;
}
</style>
