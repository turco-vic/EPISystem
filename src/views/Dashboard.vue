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
            <template v-if="role === 'admin'">
                <div class="stat-card">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-blue"><i class="fa-solid fa-helmet-safety"></i></div>
                        <span class="stat-trend">total</span>
                    </div>
                    <h2 class="stat-number">{{ stats.totalEpis }}</h2>
                    <p class="stat-label">Total de EPIs registrados</p>
                </div>
                <div class="stat-card">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-green"><i class="fa-solid fa-circle-check"></i></div>
                        <span class="stat-trend trend-green">disponível</span>
                    </div>
                    <h2 class="stat-number">{{ stats.episDisponiveis }}</h2>
                    <p class="stat-label">{{ stats.disponibilidadePct }}% do total</p>
                </div>
                <div class="stat-card">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-amber"><i class="fa-solid fa-clock-rotate-left"></i></div>
                        <span class="stat-trend trend-amber">em uso</span>
                    </div>
                    <h2 class="stat-number">{{ stats.emprestimosAtivos }}</h2>
                    <p class="stat-label">Entregas ativas</p>
                </div>
                <div class="stat-card stat-alert">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-red"><i class="fa-solid fa-triangle-exclamation"></i></div>
                        <span class="stat-trend trend-red">atenção</span>
                    </div>
                    <h2 class="stat-number">{{ stats.estoqueCritico }}</h2>
                    <p class="stat-label">Estoque crítico</p>
                </div>
            </template>

            <template v-else-if="role === 'docente'">
                <div class="stat-card">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-blue"><i class="fa-solid fa-helmet-safety"></i></div>
                        <span class="stat-trend">comigo</span>
                    </div>
                    <h2 class="stat-number">{{ stats.episComigo }}</h2>
                    <p class="stat-label">EPIs com você</p>
                </div>
                <div class="stat-card">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-amber"><i class="fa-solid fa-clock-rotate-left"></i></div>
                        <span class="stat-trend trend-amber">pendentes</span>
                    </div>
                    <h2 class="stat-number">{{ stats.solicitacoesPendentes }}</h2>
                    <p class="stat-label">Solicitações dos alunos</p>
                </div>
                <div class="stat-card">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-green"><i class="fa-solid fa-circle-check"></i></div>
                        <span class="stat-trend trend-green">aprovadas</span>
                    </div>
                    <h2 class="stat-number">{{ stats.totalEntregas }}</h2>
                    <p class="stat-label">Entregas aprovadas</p>
                </div>
                <div class="stat-card stat-alert">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-red"><i class="fa-solid fa-triangle-exclamation"></i></div>
                        <span class="stat-trend trend-red">atenção</span>
                    </div>
                    <h2 class="stat-number">{{ stats.estoqueCritico }}</h2>
                    <p class="stat-label">Estoque crítico</p>
                </div>
            </template>

            <template v-else-if="role === 'aluno'">
                <div class="stat-card">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-blue"><i class="fa-solid fa-helmet-safety"></i></div>
                        <span class="stat-trend">comigo</span>
                    </div>
                    <h2 class="stat-number">{{ stats.episComigo }}</h2>
                    <p class="stat-label">EPIs com você</p>
                </div>
                <div class="stat-card">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-amber"><i class="fa-solid fa-clock-rotate-left"></i></div>
                        <span class="stat-trend trend-amber">pendentes</span>
                    </div>
                    <h2 class="stat-number">{{ stats.solicitacoesPendentes }}</h2>
                    <p class="stat-label">Solicitações pendentes</p>
                </div>
                <div class="stat-card stat-alert">
                    <div class="stat-head">
                        <div class="stat-icon stat-icon-red"><i class="fa-solid fa-triangle-exclamation"></i></div>
                        <span class="stat-trend trend-red">atenção</span>
                    </div>
                    <h2 class="stat-number">{{ stats.avisosValidade }}</h2>
                    <p class="stat-label">Avisos de validade</p>
                </div>
            </template>
        </section>

        <template v-if="role === 'admin' || role === 'docente'">
            <section class="charts-row">
                <div class="chart-card chart-barras">
                    <div class="chart-card-head">
                        <h2 class="chart-title">Estoque por tipo</h2>
                    </div>
                    <div class="barras-lista">
                        <div v-if="estoquePorTipo.length === 0" class="chart-empty">Sem dados.</div>
                        <div v-for="item in estoquePorTipo" :key="item.tipo" class="barra-row">
                            <span class="barra-label">{{ item.tipo }}</span>
                            <div class="barra-track">
                                <div class="barra-fill" :style="{ width: item.pct + '%' }"></div>
                            </div>
                            <span class="barra-valor">{{ item.total }}</span>
                        </div>
                    </div>
                </div>

                <div class="chart-card chart-donut">
                    <div class="chart-card-head">
                        <h2 class="chart-title">Disponibilidade</h2>
                    </div>
                    <div class="donut-wrapper">
                        <svg viewBox="0 0 120 120" class="donut-svg">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#e8eeff" stroke-width="14" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#243c75" stroke-width="14"
                                stroke-linecap="round" :stroke-dasharray="`${donutPct * 3.1416} ${314.16}`"
                                stroke-dashoffset="78.54" transform="rotate(-90 60 60)"
                                style="transition: stroke-dasharray 0.8s ease;" />
                        </svg>
                        <div class="donut-center">
                            <span class="donut-pct">{{ stats.disponibilidadePct }}%</span>
                            <span class="donut-sub">Disponíveis</span>
                        </div>
                    </div>
                    <p class="donut-msg">{{ donutMsg }}</p>
                </div>
            </section>

            <section class="table-section">
                <div class="section-head">
                    <h2 class="section-title">Entregas recentes</h2>
                    <span class="section-sub">Últimas solicitações aprovadas</span>
                </div>
                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>EPI</th>
                                <th>Data</th>
                                <th>Tipo</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="e in entregasRecentes" :key="e.id">
                                <td>{{ e.nome }}</td>
                                <td>{{ e.epi }}</td>
                                <td>{{ formatDate(e.data) }}</td>
                                <td>{{ e.tipo }}</td>
                                <td><span :class="['badge', getBadge(e.status)]">{{ formatStatus(e.status) }}</span>
                                </td>
                            </tr>
                            <tr v-if="entregasRecentes.length === 0">
                                <td colspan="5" class="empty-row">Nenhuma entrega registrada.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="table-section" v-if="devolucoesPendentes.length > 0 || role === 'admin'">
                <div class="section-head">
                    <h2 class="section-title">Devoluções pendentes</h2>
                    <span class="section-sub">EPIs aprovados ainda não devolvidos</span>
                </div>
                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th v-if="role === 'admin'">Email</th>
                                <th>EPI</th>
                                <th>Patrimônio</th>
                                <th>Data entrega</th>
                                <th>Tipo</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="d in devolucoesPendentes" :key="d.id">
                                <td>{{ d.nome }}</td>
                                <td v-if="role === 'admin'">{{ d.email }}</td>
                                <td>{{ d.epi }}</td>
                                <td>{{ d.patrimonio || '—' }}</td>
                                <td>{{ formatDate(d.data) }}</td>
                                <td>{{ d.tipo }}</td>
                                <td>
                                    <span :class="['badge', d.urgente ? 'badge-red' : 'badge-yellow']">
                                        {{ d.urgente ? 'Urgente' : 'Pendente' }}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="devolucoesPendentes.length === 0">
                                <td :colspan="role === 'admin' ? 7 : 6" class="empty-row">Nenhuma devolução pendente.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </template>

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
                        <span class="action-desc">{{ role === 'admin' ? 'CRUD de equipamentos' : 'Catálogo disponível'
                            }}</span>
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
                <router-link v-if="role === 'admin'" to="/cadastro-funcionario" class="action-card">
                    <div class="action-icon"><i class="fa-solid fa-user-plus"></i></div>
                    <div class="action-text">
                        <span class="action-title">Cadastrar funcionário</span>
                        <span class="action-desc">Adicionar docente ou funcionário</span>
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

        <section v-if="role === 'aluno'" class="atividade-section">
            <div class="section-head">
                <h2 class="section-title">Atividade recente</h2>
                <span class="section-sub">Suas últimas solicitações</span>
            </div>
            <div class="atividade-lista">
                <div v-if="atividadeRecente.length === 0" class="atividade-empty">Nenhuma atividade recente.</div>
                <div v-for="a in atividadeRecente" :key="a.id" class="atividade-item">
                    <div class="atividade-icon"><i class="fa-solid fa-helmet-safety"></i></div>
                    <div class="atividade-info">
                        <span class="atividade-nome">{{ a.epi_nome }}</span>
                        <span class="atividade-data">{{ formatDate(a.data) }}</span>
                    </div>
                    <span :class="['badge', getBadge(a.status)]">{{ formatStatus(a.status) }}</span>
                </div>
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

        const stats = ref({
            totalEpis: 0,
            episDisponiveis: 0,
            disponibilidadePct: 0,
            emprestimosAtivos: 0,
            totalEntregas: 0,
            estoqueCritico: 0,
            episComigo: 0,
            solicitacoesPendentes: 0,
            avisosValidade: 0
        });

        const estoquePorTipo = ref([]);
        const entregasRecentes = ref([]);
        const devolucoesPendentes = ref([]);
        const atividadeRecente = ref([]);

        const donutPct = computed(() => (stats.value.disponibilidadePct / 100) * 314.16);
        const donutMsg = computed(() => {
            const p = stats.value.disponibilidadePct;
            if (p >= 70) return 'Estoque suficiente. Reavaliar em breve.';
            if (p >= 40) return 'Estoque moderado. Acompanhe as solicitações.';
            return 'Estoque baixo. Reposição recomendada.';
        });

        function formatDate(d) {
            if (!d) return '—';
            const [y, m, day] = d.split('-');
            return `${day}/${m}/${y}`;
        }

        function getBadge(s) {
            if (s === 'aprovado' || s === 'entregue' || s === 'devolvido') return 'badge-green';
            if (s === 'rejeitado') return 'badge-red';
            return 'badge-yellow';
        }

        function formatStatus(s) {
            if (!s) return 'Pendente';
            return s.charAt(0).toUpperCase() + s.slice(1);
        }

        async function carregarDadosAdmin(userEm) {
            const { data: epis } = await supabase.from('epis').select('quantidade, disponivel, tipo');
            if (epis) {
                const total = epis.reduce((acc, e) => acc + (e.quantidade || 0), 0);
                const disponiveis = epis.filter(e => e.disponivel && (e.quantidade || 0) > 0).reduce((acc, e) => acc + (e.quantidade || 0), 0);
                stats.value.totalEpis = total;
                stats.value.episDisponiveis = disponiveis;
                stats.value.disponibilidadePct = total > 0 ? Math.round((disponiveis / total) * 100) : 0;
                stats.value.estoqueCritico = epis.filter(e => (e.quantidade || 0) <= 5).length;

                const tiposMap = {};
                epis.forEach(e => {
                    const t = e.tipo || 'Sem tipo';
                    tiposMap[t] = (tiposMap[t] || 0) + (e.quantidade || 0);
                });
                const maxVal = Math.max(...Object.values(tiposMap), 1);
                estoquePorTipo.value = Object.entries(tiposMap)
                    .sort((a, b) => b[1] - a[1])
                    .map(([tipo, total]) => ({ tipo, total, pct: Math.round((total / maxVal) * 100) }));
            }

            const { data: funcEntregas } = await supabase
                .from('funcionario_has_epis')
                .select('id_entrega_func, data_entrega, data_devolucao, status, funcionario(nome, sobrenome, email), epis(nome, codigo_patrimonio, tipo)')
                .order('data_entrega', { ascending: false })
                .limit(20);

            const { data: alunoEntregas } = await supabase
                .from('aluno_has_epis')
                .select('id_entrega_aluno, data_entrega, status, aluno(nome, sobrenome), epis(nome, codigo_patrimonio, tipo)')
                .order('data_entrega', { ascending: false })
                .limit(20);

            const recentes = [];
            const devPendentes = [];
            const hoje = new Date();

            if (funcEntregas) {
                stats.value.emprestimosAtivos = funcEntregas.filter(e => e.status === 'aprovado' && !e.data_devolucao).length;
                funcEntregas.forEach(e => {
                    recentes.push({
                        id: `f-${e.id_entrega_func}`,
                        nome: `${e.funcionario?.nome || ''} ${e.funcionario?.sobrenome || ''}`.trim(),
                        epi: e.epis?.nome,
                        data: e.data_entrega,
                        tipo: 'Funcionário',
                        status: e.status
                    });
                    if (e.status === 'aprovado' && !e.data_devolucao) {
                        const diasAtivo = e.data_entrega ? Math.floor((hoje - new Date(e.data_entrega)) / (1000 * 60 * 60 * 24)) : 0;
                        devPendentes.push({
                            id: `f-${e.id_entrega_func}`,
                            nome: `${e.funcionario?.nome || ''} ${e.funcionario?.sobrenome || ''}`.trim(),
                            email: e.funcionario?.email || '—',
                            epi: e.epis?.nome,
                            patrimonio: e.epis?.codigo_patrimonio,
                            data: e.data_entrega,
                            tipo: 'Funcionário',
                            urgente: diasAtivo > 30
                        });
                    }
                });
            }

            if (alunoEntregas) {
                alunoEntregas.forEach(e => {
                    recentes.push({
                        id: `a-${e.id_entrega_aluno}`,
                        nome: `${e.aluno?.nome || ''} ${e.aluno?.sobrenome || ''}`.trim(),
                        epi: e.epis?.nome,
                        data: e.data_entrega,
                        tipo: 'Aluno',
                        status: e.status
                    });
                });
            }

            entregasRecentes.value = recentes
                .sort((a, b) => (b.data || '').localeCompare(a.data || ''))
                .slice(0, 8);

            devolucoesPendentes.value = devPendentes
                .sort((a, b) => (b.urgente ? 1 : 0) - (a.urgente ? 1 : 0));
        }

        async function carregarDadosDocente(userEm) {
            const { data: func } = await supabase.from('funcionario').select('idfuncionario').eq('email', userEm).single();
            if (!func) return;

            const { data: minhas } = await supabase
                .from('funcionario_has_epis')
                .select('id_entrega_func, status, data_entrega, data_devolucao, epis(nome, codigo_patrimonio, tipo)')
                .eq('funcionario_id', func.idfuncionario)
                .order('data_entrega', { ascending: false });

            if (minhas) {
                stats.value.episComigo = minhas.filter(e => e.status === 'aprovado' && !e.data_devolucao).length;
                stats.value.totalEntregas = minhas.filter(e => e.status === 'aprovado').length;

                const hoje = new Date();
                entregasRecentes.value = minhas
                    .filter(e => e.status === 'aprovado')
                    .slice(0, 8)
                    .map(e => ({
                        id: e.id_entrega_func,
                        nome: 'Você',
                        epi: e.epis?.nome,
                        data: e.data_entrega,
                        tipo: 'Docente',
                        status: e.status
                    }));

                devolucoesPendentes.value = minhas
                    .filter(e => e.status === 'aprovado' && !e.data_devolucao)
                    .map(e => {
                        const diasAtivo = e.data_entrega ? Math.floor((hoje - new Date(e.data_entrega)) / (1000 * 60 * 60 * 24)) : 0;
                        return {
                            id: e.id_entrega_func,
                            nome: 'Você',
                            epi: e.epis?.nome,
                            patrimonio: e.epis?.codigo_patrimonio,
                            data: e.data_entrega,
                            tipo: 'Docente',
                            urgente: diasAtivo > 30
                        };
                    });
            }

            const { data: solPendentes } = await supabase
                .from('aluno_has_epis')
                .select('id_entrega_aluno')
                .eq('status', 'pendente');
            if (solPendentes) stats.value.solicitacoesPendentes = solPendentes.length;

            const { data: epis } = await supabase.from('epis').select('quantidade, disponivel, tipo');
            if (epis) {
                const total = epis.reduce((acc, e) => acc + (e.quantidade || 0), 0);
                const disponiveis = epis.filter(e => e.disponivel && (e.quantidade || 0) > 0).reduce((acc, e) => acc + (e.quantidade || 0), 0);
                stats.value.disponibilidadePct = total > 0 ? Math.round((disponiveis / total) * 100) : 0;
                stats.value.estoqueCritico = epis.filter(e => (e.quantidade || 0) <= 5).length;

                const tiposMap = {};
                epis.forEach(e => {
                    const t = e.tipo || 'Sem tipo';
                    tiposMap[t] = (tiposMap[t] || 0) + (e.quantidade || 0);
                });
                const maxVal = Math.max(...Object.values(tiposMap), 1);
                estoquePorTipo.value = Object.entries(tiposMap)
                    .sort((a, b) => b[1] - a[1])
                    .map(([tipo, total]) => ({ tipo, total, pct: Math.round((total / maxVal) * 100) }));
            }
        }

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

            if (role.value === 'admin') await carregarDadosAdmin(user.email);
            if (role.value === 'docente') await carregarDadosDocente(user.email);

            if (role.value === 'aluno') {
                const { data: aluno } = await supabase.from('aluno').select('idaluno').eq('auth_id', user.id).single();
                if (aluno) {
                    const { data: minhas } = await supabase
                        .from('aluno_has_epis')
                        .select('id_entrega_aluno, status, epis(nome, data_validade), data_entrega')
                        .eq('aluno_id', aluno.idaluno)
                        .order('data_entrega', { ascending: false })
                        .limit(5);
                    if (minhas) {
                        stats.value.episComigo = minhas.filter(e => e.status === 'aprovado').length;
                        stats.value.solicitacoesPendentes = minhas.filter(e => e.status === 'pendente').length;
                        const hoje = new Date();
                        stats.value.avisosValidade = minhas.filter(e => {
                            if (!e.epis?.data_validade) return false;
                            const validade = new Date(e.epis.data_validade);
                            const diff = (validade - hoje) / (1000 * 60 * 60 * 24);
                            return diff >= 0 && diff <= 30;
                        }).length;
                        atividadeRecente.value = minhas.map(e => ({
                            id: e.id_entrega_aluno,
                            epi_nome: e.epis?.nome,
                            data: e.data_entrega,
                            status: e.status
                        }));
                    }
                }
            }
        });

        return {
            userName, firstName, userEmail, role, roleLabel,
            sidebarOpen, stats, today,
            estoquePorTipo, entregasRecentes, devolucoesPendentes,
            atividadeRecente, donutPct, donutMsg,
            formatDate, getBadge, formatStatus
        };
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

.pill-aluno {
    background: #dcfce7;
    color: #15803d;
}

.pill-docente {
    background: #fef3c7;
    color: #b45309;
}

.pill-admin {
    background: #fee2e2;
    color: #b91c1c;
}

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

.stat-icon-blue {
    background: #e8eeff;
    color: #243c75;
}

.stat-icon-amber {
    background: #fef3c7;
    color: #b45309;
}

.stat-icon-green {
    background: #dcfce7;
    color: #15803d;
}

.stat-icon-red {
    background: #fee2e2;
    color: #b91c1c;
}

.stat-trend {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    color: #6b82b0;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.trend-amber {
    color: #b45309;
}

.trend-green {
    color: #15803d;
}

.trend-red {
    color: #b91c1c;
}

.stat-number {
    font-family: 'Archivo Black', sans-serif;
    font-size: 2.75rem;
    color: #243c75;
    margin: 0.25rem 0 0 0;
    line-height: 1;
}

.stat-alert .stat-number {
    color: #b91c1c;
}

.stat-label {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.88rem;
    color: #6b82b0;
    margin: 0;
    font-weight: 500;
}

.charts-row {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 1.25rem;
}

.chart-card {
    background: #fff;
    border: 1px solid #d0daf0;
    border-radius: 16px;
    padding: 1.75rem;
    box-shadow: 0 4px 24px rgba(36, 60, 117, 0.06);
}

.chart-card-head {
    margin-bottom: 1.5rem;
}

.chart-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 1.1rem;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.barras-lista {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.chart-empty {
    font-family: 'Red Hat Display', sans-serif;
    color: #9aaac5;
    font-size: 0.9rem;
    font-style: italic;
    padding: 1rem 0;
}

.barra-row {
    display: grid;
    grid-template-columns: 160px 1fr 40px;
    align-items: center;
    gap: 0.75rem;
}

.barra-label {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.88rem;
    color: #1a2b5e;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.barra-track {
    height: 10px;
    background: #e8eeff;
    border-radius: 99px;
    overflow: hidden;
}

.barra-fill {
    height: 100%;
    background: linear-gradient(90deg, #243c75 0%, #3a5ba8 100%);
    border-radius: 99px;
    transition: width 0.6s ease;
}

.barra-valor {
    font-family: 'Archivo Black', sans-serif;
    font-size: 0.88rem;
    color: #243c75;
    text-align: right;
}

.chart-donut {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.donut-wrapper {
    position: relative;
    width: 160px;
    height: 160px;
    margin: 0 auto 1rem auto;
}

.donut-svg {
    width: 100%;
    height: 100%;
}

.donut-center {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.donut-pct {
    font-family: 'Archivo Black', sans-serif;
    font-size: 1.9rem;
    color: #243c75;
    line-height: 1;
}

.donut-sub {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.72rem;
    color: #9aaac5;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 0.15rem;
}

.donut-msg {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.82rem;
    color: #6b82b0;
    text-align: center;
    margin: 0;
    line-height: 1.4;
}

.table-section {
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

.table-wrapper {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #d0daf0;
    box-shadow: 0 4px 24px rgba(36, 60, 117, 0.08);
    overflow: hidden;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th {
    font-family: 'Anton', sans-serif;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #9aaac5;
    background: #f8f9ff;
    padding: 1rem 1.25rem;
    text-align: left;
    border-bottom: 1px solid #e8edf8;
}

.table td {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    color: #1a2b5e;
    padding: 0.95rem 1.25rem;
    border-bottom: 1px solid #edf0f8;
}

.table tr:last-child td {
    border-bottom: none;
}

.table tr:hover td {
    background: #f8f9ff;
}

.empty-row {
    text-align: center;
    color: #9aaac5 !important;
    padding: 2.5rem !important;
    font-style: italic;
}

.badge {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.25rem 0.7rem;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    display: inline-block;
    white-space: nowrap;
}

.badge-green {
    background: #dcfce7;
    color: #15803d;
}

.badge-red {
    background: #fee2e2;
    color: #b91c1c;
}

.badge-yellow {
    background: #fef3c7;
    color: #b45309;
}

.actions-section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
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
    color: #ebfbff;
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

.atividade-section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.atividade-lista {
    background: #fff;
    border: 1px solid #d0daf0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(36, 60, 117, 0.06);
}

.atividade-empty {
    font-family: 'Red Hat Display', sans-serif;
    color: #9aaac5;
    font-size: 0.95rem;
    text-align: center;
    padding: 2.5rem;
    font-style: italic;
}

.atividade-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #edf0f8;
    transition: background 0.2s ease;
}

.atividade-item:last-child {
    border-bottom: none;
}

.atividade-item:hover {
    background: #f8f9ff;
}

.atividade-icon {
    width: 2.2rem;
    height: 2.2rem;
    background: #e8eeff;
    color: #243c75;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
}

.atividade-info {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    flex: 1;
}

.atividade-nome {
    font-family: 'Red Hat Display', sans-serif;
    color: #1a2b5e;
    font-weight: 600;
    font-size: 0.95rem;
}

.atividade-data {
    font-family: 'Red Hat Display', sans-serif;
    color: #9aaac5;
    font-size: 0.8rem;
}

@media (max-width: 1100px) {
    .charts-row {
        grid-template-columns: 1fr;
    }

    .chart-donut {
        max-width: 400px;
        margin: 0 auto;
        width: 100%;
    }
}

@media (max-width: 1024px) {
    .cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .hero {
        flex-direction: column;
        align-items: flex-start;
    }

    .hero-date {
        align-self: stretch;
        align-items: flex-start;
    }
}

@media (max-width: 768px) {
    .main {
        padding: 10vh 1.25rem 3rem 1.25rem;
        gap: 2rem;
    }

    .hero {
        padding: 1.5rem;
    }

    .username {
        font-size: 2.5rem;
    }

    .cards-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
    }

    .stat-card {
        padding: 1.25rem;
    }

    .stat-number {
        font-size: 2.25rem;
    }

    .actions-grid {
        grid-template-columns: 1fr;
    }

    .barra-row {
        grid-template-columns: 120px 1fr 36px;
    }
}

@media (max-width: 480px) {
    .cards-grid {
        grid-template-columns: 1fr;
    }
}
</style>
