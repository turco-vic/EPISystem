<template>
    <NavBar @toggle="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main">
        <section class="hero">
            <div class="hero-accent"></div>
            <div class="hero-content">
                <h3 class="script">Bem-vindo,</h3>
                <h1 class="username">{{ firstName }}</h1>
                <div class="hero-meta">
                    <span class="role-pill" :class="`pill-${role}`">{{ roleLabel }}</span>
                    <span class="hero-email"><i class="fa-solid fa-envelope"></i> {{ userEmail }}</span>
                </div>
            </div>
            <div class="hero-date">
                <span class="date-label">Hoje</span>
                <span class="date-value">{{ today }}</span>
            </div>
        </section>

        <section class="cards-grid">
            <div class="stat-card">
                <div class="stat-head">
                    <div class="stat-icon stat-icon-blue"><i class="fa-solid fa-helmet-safety"></i></div>
                    <span class="stat-trend"><i class="fa-solid fa-arrow-trend-up"></i> estoque</span>
                </div>
                <h2 class="stat-number">{{ stats.episEstoque }}</h2>
                <p class="stat-label">EPIs em estoque</p>
            </div>

            <div class="stat-card">
                <div class="stat-head">
                    <div class="stat-icon stat-icon-amber"><i class="fa-solid fa-clock-rotate-left"></i></div>
                    <span class="stat-trend trend-amber">ativos</span>
                </div>
                <h2 class="stat-number">{{ stats.emprestimosAtivos }}</h2>
                <p class="stat-label">Empréstimos ativos</p>
            </div>

            <div class="stat-card">
                <div class="stat-head">
                    <div class="stat-icon stat-icon-green"><i class="fa-solid fa-circle-check"></i></div>
                    <span class="stat-trend trend-green">total</span>
                </div>
                <h2 class="stat-number">{{ stats.totalEntregas }}</h2>
                <p class="stat-label">Total de entregas</p>
            </div>

            <div class="stat-card stat-alert">
                <div class="stat-head">
                    <div class="stat-icon stat-icon-red"><i class="fa-solid fa-triangle-exclamation"></i></div>
                    <span class="stat-trend trend-red">atenção</span>
                </div>
                <h2 class="stat-number">{{ stats.estoqueCritico }}</h2>
                <p class="stat-label">Estoque crítico</p>
            </div>
        </section>

        <section class="actions-section">
            <div class="section-head">
                <h2 class="section-title">Ações rápidas</h2>
                <span class="section-sub">O que você quer fazer?</span>
            </div>
            <div class="actions-grid">
                <router-link to="/estoque" class="action-card">
                    <div class="action-icon"><i class="fa-solid fa-boxes-stacked"></i></div>
                    <div class="action-text">
                        <span class="action-title">{{ role === 'admin' ? 'Gerenciar estoque' : 'Ver EPIs' }}</span>
                        <span class="action-desc">{{ role === 'admin' ? 'CRUD de equipamentos' : 'Catálogo disponível' }}</span>
                    </div>
                    <i class="fa-solid fa-arrow-right action-arrow"></i>
                </router-link>

                <router-link v-if="role === 'admin'" to="/estoque" class="action-card">
                    <div class="action-icon"><i class="fa-solid fa-clipboard-check"></i></div>
                    <div class="action-text">
                        <span class="action-title">Solicitações</span>
                        <span class="action-desc">Aprovar pendências</span>
                    </div>
                    <i class="fa-solid fa-arrow-right action-arrow"></i>
                </router-link>

                <router-link v-if="role === 'aluno' || role === 'docente'" to="/estoque" class="action-card">
                    <div class="action-icon"><i class="fa-solid fa-hand"></i></div>
                    <div class="action-text">
                        <span class="action-title">Solicitar EPI</span>
                        <span class="action-desc">Novo empréstimo</span>
                    </div>
                    <i class="fa-solid fa-arrow-right action-arrow"></i>
                </router-link>

                <router-link to="/perfil" class="action-card">
                    <div class="action-icon"><i class="fa-solid fa-user"></i></div>
                    <div class="action-text">
                        <span class="action-title">Meu perfil</span>
                        <span class="action-desc">Dados e histórico</span>
                    </div>
                    <i class="fa-solid fa-arrow-right action-arrow"></i>
                </router-link>
            </div>
        </section>
    </main>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { useSupabase } from "../composables/useSupabase.js";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'Dashboard',
    components: { NavBar, Sidebar },
    setup() {
        const { supabase } = useSupabase();
        const router = useRouter();
        const sidebarOpen = ref(false);

        const userName = ref('Usuário');
        const role = ref('');
        const userEmail = ref('');
        const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

        const firstName = computed(() => userName.value.split(' ')[0] || 'Usuário');
        const roleLabel = computed(() => ({ aluno: 'Aluno', docente: 'Docente', admin: 'Administrador' })[role.value] || '—');

        const stats = ref({ episEstoque: 0, emprestimosAtivos: 0, totalEntregas: 0, estoqueCritico: 0 });

        onMounted(async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) { router.push('/login'); return; }

            const user = data.session.user;
            userEmail.value = user.email;

            const { data: profile } = await supabase
                .from('profiles')
                .select('full_name, role')
                .eq('id', user.id)
                .single();
            if (profile?.full_name) userName.value = profile.full_name;
            if (profile?.role) role.value = profile.role;

            const { data: epis } = await supabase.from('epis').select('quantidade, disponivel');
            if (epis) {
                stats.value.episEstoque = epis.reduce((acc, e) => acc + (e.quantidade || 0), 0);
                stats.value.estoqueCritico = epis.filter(e => (e.quantidade || 0) <= 5).length;
            }

            const { data: funcEntregas } = await supabase
                .from('funcionario_has_epis')
                .select('id_entrega_func, data_devolucao');
            const { data: alunoEntregas } = await supabase
                .from('aluno_has_epis')
                .select('id_entrega_aluno');

            if (funcEntregas) {
                stats.value.emprestimosAtivos = funcEntregas.filter(e => !e.data_devolucao).length;
                stats.value.totalEntregas += funcEntregas.length;
            }
            if (alunoEntregas) stats.value.totalEntregas += alunoEntregas.length;
        });

        return { userName, firstName, userEmail, role, roleLabel, sidebarOpen, stats, today };
    }
}
</script>

<style scoped>
.main {
    min-height: 100vh;
    background: linear-gradient(180deg, #f0f4ff 0%, #e8eeff 100%);
    padding: 12vh 4rem 4rem 4rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.hero {
    display: flex;
    align-items: center;
    gap: 2rem;
    background: #fff;
    border-radius: 20px;
    padding: 2rem 2.5rem;
    border: 1px solid #d0daf0;
    box-shadow: 0 8px 32px rgba(36, 60, 117, 0.08);
    position: relative;
    overflow: hidden;
}

.hero-accent {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: linear-gradient(180deg, #243c75 0%, #3a5ba8 100%);
}

.hero-content {
    flex: 1;
    padding-left: 1rem;
}

.script {
    font-family: 'Pinyon Script', cursive;
    color: #243c75;
    font-size: 2rem;
    margin: 0;
    line-height: 1;
}

.username {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 3.5rem;
    font-weight: 900;
    margin: 0.25rem 0 0.75rem 0;
    line-height: 1;
}

.hero-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.role-pill {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.35rem 0.9rem;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.pill-aluno { background: #dcfce7; color: #15803d; }
.pill-docente { background: #fef3c7; color: #b45309; }
.pill-admin { background: #fee2e2; color: #b91c1c; }

.hero-email {
    font-family: 'Red Hat Display', sans-serif;
    color: #6b82b0;
    font-size: 0.9rem;
}

.hero-email i {
    margin-right: 0.4rem;
    color: #9aaac5;
}

.hero-date {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.15rem;
    padding: 1rem 1.25rem;
    background: #f8f9ff;
    border-radius: 12px;
    border: 1px solid #e8edf8;
}

.date-label {
    font-family: 'Anton', sans-serif;
    font-size: 0.7rem;
    color: #9aaac5;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.date-value {
    font-family: 'Red Hat Display', sans-serif;
    color: #243c75;
    font-weight: 700;
    font-size: 0.95rem;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
}

.stat-card {
    background: #fff;
    border: 1px solid #d0daf0;
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    position: relative;
    overflow: hidden;
}

.stat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(36, 60, 117, 0.03) 0%, transparent 50%);
    pointer-events: none;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(36, 60, 117, 0.12);
    border-color: #243c75;
}

.stat-alert {
    background: linear-gradient(135deg, #fff 0%, #fef5f4 100%);
    border-color: #fecaca;
}

.stat-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.stat-icon {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
}

.stat-icon-blue { background: #e8eeff; color: #243c75; }
.stat-icon-amber { background: #fef3c7; color: #b45309; }
.stat-icon-green { background: #dcfce7; color: #15803d; }
.stat-icon-red { background: #fee2e2; color: #b91c1c; }

.stat-trend {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    color: #6b82b0;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.trend-amber { color: #b45309; }
.trend-green { color: #15803d; }
.trend-red { color: #b91c1c; }

.stat-number {
    font-family: 'Archivo Black', sans-serif;
    font-size: 2.75rem;
    color: #243c75;
    margin: 0.25rem 0 0 0;
    line-height: 1;
}

.stat-alert .stat-number { color: #b91c1c; }

.stat-label {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.88rem;
    color: #6b82b0;
    margin: 0;
    font-weight: 500;
}

.actions-section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.section-head {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
}

.section-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 1.4rem;
    margin: 0;
}

.section-sub {
    font-family: 'Red Hat Display', sans-serif;
    color: #9aaac5;
    font-size: 0.9rem;
}

.actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
}

.action-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: #fff;
    border: 1px solid #d0daf0;
    border-radius: 14px;
    text-decoration: none;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
}

.action-card:hover {
    border-color: #243c75;
    transform: translateX(4px);
    box-shadow: 0 8px 24px rgba(36, 60, 117, 0.1);
}

.action-icon {
    width: 2.5rem;
    height: 2.5rem;
    background: #243c75;
    color: #e2f9ff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
}

.action-text {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    flex: 1;
    min-width: 0;
}

.action-title {
    font-family: 'Red Hat Display', sans-serif;
    color: #243c75;
    font-weight: 700;
    font-size: 0.98rem;
}

.action-desc {
    font-family: 'Red Hat Display', sans-serif;
    color: #9aaac5;
    font-size: 0.8rem;
}

.action-arrow {
    color: #d0daf0;
    transition: color 0.25s ease, transform 0.25s ease;
}

.action-card:hover .action-arrow {
    color: #243c75;
    transform: translateX(4px);
}

@media (max-width: 1024px) {
    .cards-grid { grid-template-columns: repeat(2, 1fr); }
    .hero { flex-direction: column; align-items: flex-start; }
    .hero-date { align-self: stretch; align-items: flex-start; }
}

@media (max-width: 768px) {
    .main { padding: 10vh 1.25rem 3rem 1.25rem; gap: 2rem; }
    .hero { padding: 1.5rem; }
    .username { font-size: 2.5rem; }
    .cards-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .stat-card { padding: 1.25rem; }
    .stat-number { font-size: 2.25rem; }
    .actions-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
    .cards-grid { grid-template-columns: 1fr; }
}
</style>
