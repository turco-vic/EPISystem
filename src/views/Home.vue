<template>
    <div class="container">
        <Header title="Home" />
        <main class="main" ref="mainRef">
            <section class="apresentation-page" ref="section0">
                <aside class="left-side">
                    <section class="apresentation-page-title">
                        <h1 class="apresentation-page-title-text">Gestão Inteligente de <span class="highlighted">EPIs para mais</span> controle e segurança</h1>
                    </section>
                    <section class="apresentation-page-topics">
                        <p class="apresentation-page-check"><i class="fas fa-check-circle"></i>Reduza riscos</p>
                        <p class="apresentation-page-check"><i class="fas fa-check-circle"></i>Garanta conformidade</p>
                        <p class="apresentation-page-check"><i class="fas fa-check-circle"></i> Otimize a gestão dos
                            seus EPIs</p>
                    </section>
                    <article class="content">
                        <p class="apresentation-page-content-text">A segurança dos colaboradores é uma prioridade para qualquer organização. Com o novo <span
                                class="content-highlighted">Módulo
                                Gestão de EPIs do EPI System</span>, você tem controle total sobre a distribuição,
                            rastreamento e
                            gestão
                            dos Equipamentos de Proteção Individual (EPIs), garantindo conformidade com as normas de
                            segurança e prevenindo riscos trabalhistas.</p>
                    </article>
                </aside>
                <aside class="right-side">
                    <div class="image">
                        <img src="../assets/image_landing_page1.png" alt="Imagem ilustrativa de segurança no trabalho">
                    </div>
                </aside>
            </section>

            <section class="check-page" ref="section1">
                <h1 class="check-title">O que você pode fazer com o <span class="title-highlighted">EPI System</span>?
                </h1>
                <section class="accordion">
                    <div v-for="(item, index) in accordionItems" :key="index" class="accordion-item"
                        @click="toggleAccordion(index)">
                        <div class="accordion-header">
                            <i :class="activeAccordion === index ? 'fas fa-minus-square' : 'fas fa-plus-square'"></i>
                            <span>{{ item.title }}</span>
                        </div>
                        <div v-if="activeAccordion === index" class="accordion-content">
                            <p>{{ item.description }}</p>
                        </div>
                    </div>
                </section>
            </section>

            <section class="implementation-page" ref="section2">
                <aside class="left-side2">
                    <section class="implementation-title">
                        <h1>Facilidade na Implementação</h1>
                    </section>
                    <article class="card-content">
                        <p class="text_implementation-page">O <span class="content-highlighted">EPI System</span> foi
                            desenvolvido com a facilidade na
                            implementação em mente, permitindo que sua empresa adote a gestão eficiente dos EPIs sem
                            complicações.</p>
                    </article>
                </aside>
                <aside class="right-side2">
                    <aside class="image">
                        <img src="../assets/image_landing_page2.png" alt="Imagem ilustrativa de implementação fácil">
                    </aside>
                </aside>
            </section>

            <section class="dashboard-page" ref="section3">
                <section class="titles">
                    <h1 class="title">Dashboard Inteligente</h1>
                    <h3 class="subtitle">Acesse uma visão geral completa dos EPIs na sua empresa, incluindo:</h3>
                </section>
                <section class="dashboard-topics">
                    <p class="dashboard-page_check"><i class="fas fa-check-square"></i>Total de EPIs cadastrados</p>
                    <p class="dashboard-page_check"><i class="fas fa-check-square"></i>EPIs em uso, vencidos, entregues
                        e não entregues
                    </p>
                    <p class="dashboard-page_check"><i class="fas fa-check-square"></i>Relatórios sintéticos e
                        analíticos de EPIs e estoques</p>
                </section>
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
    data() {
        return {
            activeAccordion: 0,
            accordionItems: [
                { title: "Cadastro e gerenciamento de EPIs", description: "Registre informações detalhadas como validade, lote, fornecedor." },
                { title: "Associação de EPIs aos colaboradores", description: "Vincule cada EPI ao colaborador responsável, com histórico completo de entregas." },
                { title: "Gestão de estoques", description: "Acompanhe a quantidade disponível de cada EPI em tempo real." },
                { title: "Movimentação de EPIs", description: "Registre entradas, saídas e devoluções de equipamentos de forma prática." },
                { title: "Relatórios e indicadores", description: "Gere relatórios detalhados para tomada de decisão e auditorias." },
            ],
        };
    },
    methods: {
        toggleAccordion(index) {
            this.activeAccordion = this.activeAccordion === index ? null : index;
        },
    },
    mounted() {
    },
    beforeUnmount() {
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(180deg, #243c75 10%, #464646 45%, #878787 100%);
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
}

/* Estlos para a seção de apresentação */

.apresentation-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    flex: 1;
    gap: 0;
    padding-top: 10vh;
    box-sizing: border-box;
}

.left-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 50%;
    flex: 1;
    padding: 6rem 3rem 6rem 7rem;
    gap: 1.5rem;
}

.apresentation-page-title {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: #e2f9ff;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 900;
    font-size: 1.3rem;
    align-items: justify;
}

.highlighted {
    color: #243c75;
    background-color: #e2f9ff;
}

.apresentation-page-topics {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #e2f9ff;
    width: 100%;
    height: 8rem;
    padding: 1.5rem;
    background-color: #243c75;
    color: #e2f9ff;
    font-family: "Red Hat Display", sans-serif;
    gap: 0.5rem;
}

.apresentation-page-check {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

.content {
    display: flex;
    flex-direction: column;
    color: #e2f9ff;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 100;
    gap: 1rem;
}

.apresentation-page-content-text {
    font-size: 1.1rem;
    text-align: justify;
    line-height: 2rem;
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
    padding: 6rem 7rem 6rem 3rem;
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

/* Estilos para a seção de check-box */

.check-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #e2f9ff;
    padding: calc(10vh + 2rem) 2rem 4rem;
    gap: 2rem;
    box-sizing: border-box;
}

.check-title {
    text-align: left;
    width: 100%;
    max-width: 44rem;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 900;
    font-size: 3rem;
    color: #243c75;
    margin-bottom: 2rem;
    line-height: 1.5;
}

.title-highlighted {
    color: #e2f9ff;
    background-color: #243c75;
    padding: 0.25rem 0.5rem;
}

.accordion {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 44rem;
    gap: 0.75rem;
}

.accordion-item {
    border: 2px solid #243c75;
    border-radius: 4px;
    padding: 1rem 1.25rem;
    cursor: pointer;
    background-color: transparent;
}

.accordion-item:hover {
    background-color: #243c7508;
}

.accordion-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: #243c75;
}

.accordion-content {
    margin-top: 0.5rem;
    padding-left: 1.75rem;
    font-family: "Red Hat Display", sans-serif;
    font-size: 0.95rem;
    color: #333333;
}

/* Estilos para a seção de implementação */

.implementation-page {
    display: flex;
    flex-direction: row;
    background-color: #243c75;
    width: 100%;
    min-height: 100vh;
}

.left-side2 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 50%;
    flex: 1;
    padding: 6rem 3rem 6rem 10rem;
    gap: 1.5rem;
}

.implementation-title {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: #e2f9ff;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 900;
    font-size: 1.5rem;
    gap: 1rem;
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid #e2f9ff;
    height: 8rem;
    padding: 1.5rem;
    background-color: #243c75;
    color: #e2f9ff;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 100;
    gap: 1rem;
}

.text_implementation-page {
    font-size: 1.1rem;
}

.content-highlighted {
    color: #243c75;
    background-color: #e2f9ff;
    font-weight: bold;
}

.right-side2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    flex: 1;
    padding: 6rem 10rem 6rem 3rem;
}

/* Estilos para a seção de dashboard */

.dashboard-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #e2f9ff;
    min-height: 100vh;
    padding: calc(10vh + 2rem) 2rem 4rem;
    gap: 2rem;
    box-sizing: border-box;
}

.titles {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 44rem;
}

.title {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 1000;
    font-size: 4rem;
    color: #243c75;
}

.subtitle {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 400;
    font-size: 1.25rem;
    color: #1d1d1d;
}

.dashboard-topics {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    gap: 1rem;
    margin-top: 3rem;
}

.dashboard-page_check {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 4rem;
    gap: 0.5rem;
    font-family: "Red Hat Display", sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    border: solid 2px #243c75;
    border-radius: 5px;
    color: #243c75;
}

.dashboard-topics .fas.fa-check-square {
    color: #243c75;
    font-size: 2rem;
    margin: 1rem;
}

/* Estilos para a responsividade do site */

@media (max-width: 1200px) {

    .left-side,
    .left-side2 {
        padding: 4rem 2rem 4rem 3rem;
    }

    .right-side,
    .right-side2 {
        padding: 4rem 3rem 4rem 2rem;
    }

    .title {
        font-size: clamp(1.4rem, 2.2vw, 2rem);
    }

    .check-title {
        font-size: 2.75rem;
    }

    .dashboard-page .title {
        font-size: 3rem;
    }

    .dashboard-topics {
        width: 70%;
    }
}

@media (max-width: 992px) {

    .apresentation-page,
    .implementation-page {
        flex-direction: column;
        gap: 0;
    }

    .left-side,
    .left-side2 {
        width: 100%;
        padding: 3rem 2rem 2rem;
    }

    .right-side,
    .right-side2 {
        flex: none;
        width: 100%;
        padding: 0 2rem 3rem;
    }

    .title {
        font-size: clamp(1.3rem, 3vw, 1.75rem);
    }

    .check-page,
    .dashboard-page {
        padding: 3rem 1.5rem;
    }

    .check-title {
        font-size: 2.25rem;
    }

    .accordion {
        max-width: 100%;
    }

    .dashboard-page .title {
        font-size: 2.5rem;
        text-align: center;
    }

    .dashboard-page .subtitle {
        text-align: center;
    }

    .dashboard-topics {
        width: 100%;
    }
}

@media (max-width: 576px) {

    .left-side,
    .left-side2,
    .right-side,
    .right-side2 {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }

    .title,
    .implementation-title {
        font-size: clamp(1.2rem, 4.5vw, 1.5rem);
        gap: 0.5rem;
    }

    .topics,
    .content,
    .card-content {
        font-size: 0.95rem;
    }

    .check-page,
    .dashboard-page {
        padding: 2rem 1rem;
    }

    .check-title {
        font-size: 1.75rem;
        margin-bottom: 1rem;
    }

    .accordion-header {
        font-size: 1rem;
    }

    .accordion-content {
        font-size: 0.85rem;
        padding-left: 1.25rem;
    }

    .accordion-item {
        padding: 0.75rem 1rem;
    }

    .dashboard-page .title {
        font-size: 2rem;
    }

    .dashboard-page .subtitle {
        font-size: 1.1rem;
    }

    .check,
    .dashboard-page_check {
        height: auto;
        padding: 1rem;
        font-size: 1rem;
        align-items: center;
        justify-content: flex-start;
        text-align: left;
    }

    .dashboard-topics .fas.fa-check-square {
        font-size: 1.5rem;
        margin: 0 1rem 0 0;
    }
}
</style>
