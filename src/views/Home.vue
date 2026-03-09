<template>
    <div class="container">
        <Header title="Home" />
        <main class="main" ref="mainRef">
            <section class="apresentation-page scroll-section" ref="section0">
                <section class="left-side">
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
                            Gestão de EPIs do EPI System</span>, você tem controle total sobre a distribuição, rastreamento e
                            gestão
                            dos Equipamentos de Proteção Individual (EPIs), garantindo conformidade com as normas de
                            segurança e prevenindo riscos trabalhistas.</p>
                    </article>
                </section>
                <section class="right-side">
                    <aside class="image">
                        <img src="../assets/placeholder.webp" alt="Imagem ilustrativa de segurança no trabalho">
                    </aside>
                </section>
            </section>

            <section class="check-page scroll-section" ref="section1">
                <h1 class="check-title">O que você pode fazer com o <span class="title-highlighted">EPI System</span>?</h1>
                <section class="accordion">
                    <div
                        v-for="(item, index) in accordionItems"
                        :key="index"
                        class="accordion-item"
                        @click="toggleAccordion(index)"
                    >
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
        const sections = this.$el.querySelectorAll('.scroll-section');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.15 }
        );
        sections.forEach((section) => observer.observe(section));
        this._observer = observer;
    },
    beforeUnmount() {
        if (this._observer) {
            this._observer.disconnect();
        }
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(180deg,#000000 10%, #464646 45%, #878787 100%);
    overflow-y: auto;
    scroll-snap-type: y mandatory;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
}

.scroll-section {
    scroll-snap-align: start;
    min-height: 100vh;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.scroll-section.visible {
    opacity: 1;
    transform: translateY(0);
}

.apresentation-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
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
    font-weight: 900;
    font-size: 1.5rem;
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

.check-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
    padding: 4rem 2rem;
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
    color: #000000;
    margin-bottom: 2rem;
    line-height: 1.3;
}

.title-highlighted {
    color: #ffffff;
    background-color: #000000;
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
    border: 2px solid #000000;
    border-radius: 4px;
    padding: 1rem 1.25rem;
    cursor: pointer;
    background-color: transparent;
    transition: background-color 0.2s;
}

.accordion-item:hover {
    background-color: rgba(0, 0, 0, 0.03);
}

.accordion-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: #000000;
}

.accordion-content {
    margin-top: 0.5rem;
    padding-left: 1.75rem;
    font-family: "Red Hat Display", sans-serif;
    font-size: 0.95rem;
    color: #333333;
}

@media (max-width: 1200px) {
    .left-side {
        padding: 4rem 2rem 4rem 3rem;
    }

    .right-side {
        padding: 4rem 3rem 4rem 2rem;
    }

    .title {
        font-size: clamp(1.4rem, 2.2vw, 2rem);
    }

    .check-title {
        font-size: 2.75rem;
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
        font-size: clamp(1.3rem, 3vw, 1.75rem);
    }

    .check-page {
        padding: 3rem 1.5rem;
    }

    .check-title {
        font-size: 2.25rem;
    }

    .accordion {
        max-width: 100%;
    }
}

@media (max-width: 576px) {
    .left-side,
    .right-side {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }

    .title {
        font-size: clamp(1.2rem, 4.5vw, 1.5rem);
        gap: 0.5rem;
    }

    .topics,
    .content {
        font-size: 0.95rem;
    }

    .check-page {
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
}
</style>
