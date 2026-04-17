<template>
    <div class="container">
        <Header title="Sobre" />
        <main class="main">
            <section class="panel">
                <aside class="left">
                    <span class="eyebrow">Sobre o projeto</span>
                    <h1 class="title">
                        Proteger quem trabalha com <span class="highlighted">controle digital</span> e rastreável
                    </h1>
                    <p class="lead">
                        O <strong>EPI System</strong> nasceu na SENAI Roberto Mange para substituir planilhas e
                        controles manuais por um fluxo seguro, auditável e em conformidade com a NR-6 e a LGPD.
                    </p>

                    <div class="pills">
                        <span class="pill">NR-6</span>
                        <span class="pill">LGPD</span>
                        <span class="pill">Vue 3 + Supabase</span>
                        <span class="pill">Row Level Security</span>
                    </div>
                </aside>

                <aside class="right">
                    <div class="stats">
                        <div class="stat">
                            <span class="stat-num">03</span>
                            <span class="stat-lbl">Perfis de acesso</span>
                        </div>
                        <div class="stat">
                            <span class="stat-num">100%</span>
                            <span class="stat-lbl">Auditável</span>
                        </div>
                        <div class="stat">
                            <span class="stat-num">NR-6</span>
                            <span class="stat-lbl">Conforme</span>
                        </div>
                    </div>

                    <div class="roles">
                        <div class="role">
                            <i class="fas fa-user-gear"></i>
                            <div>
                                <h3>Funcionário</h3>
                                <p>CRUD de EPIs, validação de estoque e relatórios.</p>
                            </div>
                        </div>
                        <div class="role">
                            <i class="fas fa-chalkboard-user"></i>
                            <div>
                                <h3>Docente</h3>
                                <p>Uso de EPIs e aprovação de solicitações dos alunos.</p>
                            </div>
                        </div>
                        <div class="role">
                            <i class="fas fa-user-graduate"></i>
                            <div>
                                <h3>Aluno</h3>
                                <p>Consulta e solicitação de empréstimo de equipamentos.</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
    name: "Sobre",
    components: { Header, Footer }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #ebfbff;
}

.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.panel {
    flex: 1;
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 5rem;
    padding: calc(10vh + 3rem) 7rem 4rem 7rem;
    box-sizing: border-box;
    min-height: 100vh;
    align-items: center;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.eyebrow {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    color: #243c75;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    border-left: 4px solid #243c75;
    padding-left: 0.75rem;
}

.title {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 900;
    font-size: 3.4rem;
    color: #243c75;
    line-height: 1.1;
    margin: 0;
    line-height: 1.3;
}

.highlighted {
    background: #243c75;
    color: #ebfbff;
    padding: 0 0.5rem;
}

.lead {
    font-family: "Red Hat Display", sans-serif;
    font-size: 1.15rem;
    line-height: 1.8rem;
    color: #243c75;
    margin: 0;
}

.lead strong {
    font-weight: 900;
}

.pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.5rem;
}

.pill {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    color: #243c75;
    border: 2px solid #243c75;
    padding: 0.4rem 1rem;
    border-radius: 999px;
}

.right {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.stat {
    border: 2px solid #243c75;
    border-radius: 6px;
    padding: 1.25rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background: #243c75;
    color: #ebfbff;
}

.stat-num {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 1000;
    font-size: 2.25rem;
    line-height: 1;
}

.stat-lbl {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 400;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
}

.roles {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.role {
    display: flex;
    gap: 1rem;
    padding: 1.1rem 1.25rem;
    border: 2px solid #243c75;
    border-radius: 6px;
    color: #243c75;
    font-family: "Red Hat Display", sans-serif;
    transition: background 0.2s ease, color 0.2s ease;
}

.role:hover {
    background: #243c75;
    color: #ebfbff;
}

.role i {
    font-size: 1.6rem;
    margin-top: 0.15rem;
    flex-shrink: 0;
}

.role h3 {
    font-weight: 900;
    font-size: 1.1rem;
    margin: 0 0 0.2rem 0;
}

.role p {
    font-weight: 400;
    font-size: 0.95rem;
    margin: 0;
    line-height: 1.4rem;
}

@media (max-width: 1200px) {
    .panel {
        padding: calc(10vh + 2rem) 3rem 3rem 3rem;
        gap: 3rem;
    }

    .title {
        font-size: 2.6rem;
    }
}

@media (max-width: 992px) {
    .panel {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        padding: calc(10vh + 2rem) 2rem 3rem 2rem;
    }

    .title {
        font-size: 2.2rem;
    }
}

@media (max-width: 576px) {
    .panel {
        padding: calc(10vh + 1.5rem) 1.25rem 2rem 1.25rem;
    }

    .title {
        font-size: 1.75rem;
    }

    .lead {
        font-size: 1rem;
        line-height: 1.6rem;
    }

    .stats {
        grid-template-columns: 1fr 1fr;
    }

    .stat-num {
        font-size: 1.75rem;
    }
}
</style>
