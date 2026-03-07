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
                        <p>A segurança dos colaboradores é uma prioridade para qualquer organização. Com o novo <span class="content-highlighted">Módulo
                            Gestão de EPIs do EPISystem</span>, você tem controle total sobre a distribuição, rastreamento e
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
    width: 100%;
    flex: 1;
}

.apresentation-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
    gap: 0;
}

.left-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 50%;
    flex: 1;
    padding: 6rem 3rem 6rem 6rem;
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
    font-weight: 100;
    gap: 1rem;
}

.content-highlighted {
    font-weight: bold;
}

.right-side {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    flex: 1;
    padding: 6rem 6rem 6rem 3rem;
}

.image {
    width: 100%;
    max-width: 560px;
    height: auto;
}

.image img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
}

@media (max-width: 1200px) {
    .left-side {
        padding: 4rem 2rem 4rem 3rem;
    }

    .right-side {
        padding: 4rem 3rem 4rem 2rem;
    }

    .title {
        font-size: 2rem;
    }
}

@media (max-width: 992px) {
    .apresentation-page {
        flex-direction: column;
        gap: 0;
    }

    .left-side {
        width: 100%;
        padding: 3rem 2rem 2rem;
    }

    .right-side {
        flex: none;
        width: 100%;
        padding: 0 2rem 3rem;
    }

    .title {
        font-size: 1.75rem;
    }
}

@media (max-width: 576px) {
    .left-side,
    .right-side {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }

    .title {
        font-size: 1.4rem;
        gap: 0.5rem;
    }

    .topics,
    .content {
        font-size: 0.95rem;
    }
}
</style>
