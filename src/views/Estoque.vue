<template>
    <NavBar @toggle="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main">

        <section class="page-header">
            <h3 class="script">Gestão de</h3>
            <h1 class="page-title">ESTOQUE</h1>
        </section>

        <!-- LOADING -->
        <div v-if="loading" class="loading">
            <i class="fa-solid fa-spinner fa-spin"></i> Carregando...
        </div>

        <template v-else>

            <!-- ========== ADMIN ========== -->
            <template v-if="role === 'admin'">

                <!-- Tabs -->
                <div class="tabs">
                    <button :class="['tab', { active: tabAdmin === 'epis' }]" @click="tabAdmin = 'epis'">
                        <i class="fa-solid fa-boxes-stacked"></i> EPIs
                    </button>
                    <button :class="['tab', { active: tabAdmin === 'solicitacoes' }]"
                        @click="tabAdmin = 'solicitacoes'">
                        <i class="fa-solid fa-clock-rotate-left"></i> Solicitações
                    </button>
                </div>

                <!-- Tab EPIs -->
                <div v-if="tabAdmin === 'epis'">
                    <div class="section-header">
                        <h2 class="section-title">EPIs cadastrados</h2>
                        <button class="btn-primary" @click="abrirModalNovoEpi">
                            <i class="fa-solid fa-plus"></i> Novo EPI
                        </button>
                    </div>

                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Quantidade</th>
                                    <th>Disponível</th>
                                    <th>Validade</th>
                                    <th>Patrimônio</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="epi in epis" :key="epi.idepis">
                                    <td>{{ epi.nome }}</td>
                                    <td>{{ epi.tipo }}</td>
                                    <td>{{ epi.quantidade }}</td>
                                    <td>
                                        <span :class="['badge', epi.disponivel ? 'badge-green' : 'badge-red']">
                                            {{ epi.disponivel ? 'Sim' : 'Não' }}
                                        </span>
                                    </td>
                                    <td>{{ formatDate(epi.data_validade) }}</td>
                                    <td>{{ epi.codigo_patrimonio }}</td>
                                    <td class="actions-cell">
                                        <button class="btn-icon" @click="abrirModalEditarEpi(epi)" title="Editar">
                                            <i class="fa-solid fa-pen"></i>
                                        </button>
                                        <button class="btn-icon btn-danger" @click="deletarEpi(epi.idepis)"
                                            title="Deletar">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Tab Solicitações -->
                <div v-if="tabAdmin === 'solicitacoes'">
                    <h2 class="section-title">Todas as solicitações</h2>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Solicitante</th>
                                    <th>Tipo</th>
                                    <th>EPI</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in solicitacoes" :key="s.id">
                                    <td>{{ s.solicitante }}</td>
                                    <td>{{ s.tipo_solicitante }}</td>
                                    <td>{{ s.epi_nome }}</td>
                                    <td>{{ formatDate(s.data) }}</td>
                                    <td>
                                        <span :class="['badge', getBadgeStatus(s.status)]">{{ s.status }}</span>
                                    </td>
                                    <td class="actions-cell">
                                        <button v-if="s.status === 'Pendente'" class="btn-icon btn-green"
                                            @click="aprovarSolicitacao(s)" title="Aprovar">
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                        <button v-if="s.status === 'Pendente'" class="btn-icon btn-danger"
                                            @click="rejeitarSolicitacao(s)" title="Rejeitar">
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="solicitacoes.length === 0">
                                    <td colspan="6" class="empty-row">Nenhuma solicitação encontrada.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>

            <!-- ========== DOCENTE ========== -->
            <template v-else-if="role === 'docente'">
                <div class="tabs">
                    <button :class="['tab', { active: tabDocente === 'epis' }]" @click="tabDocente = 'epis'">
                        <i class="fa-solid fa-boxes-stacked"></i> EPIs disponíveis
                    </button>
                    <button :class="['tab', { active: tabDocente === 'solicitacoes' }]"
                        @click="tabDocente = 'solicitacoes'">
                        <i class="fa-solid fa-clock-rotate-left"></i> Solicitações dos alunos
                    </button>
                    <button :class="['tab', { active: tabDocente === 'minhas' }]" @click="tabDocente = 'minhas'">
                        <i class="fa-solid fa-user"></i> Minhas solicitações
                    </button>
                </div>

                <!-- EPIs disponíveis -->
                <div v-if="tabDocente === 'epis'">
                    <div class="section-header">
                        <h2 class="section-title">EPIs disponíveis</h2>
                        <button class="btn-primary" @click="abrirModalSolicitarLote">
                            <i class="fa-solid fa-layer-group"></i> Solicitar em lote
                        </button>
                    </div>
                    <div class="epis-grid">
                        <div class="epi-card" v-for="epi in episDisponiveis" :key="epi.idepis">
                            <div class="epi-card-icon"><i class="fa-solid fa-helmet-safety"></i></div>
                            <div class="epi-card-info">
                                <h3>{{ epi.nome }}</h3>
                                <p>{{ epi.tipo }}</p>
                                <span class="epi-qtd">{{ epi.quantidade }} unidades</span>
                            </div>
                            <button class="btn-sm" @click="abrirModalSolicitar(epi, 'docente')">Solicitar</button>
                        </div>
                    </div>
                </div>

                <!-- Solicitações dos alunos -->
                <div v-if="tabDocente === 'solicitacoes'">
                    <h2 class="section-title">Solicitações dos alunos</h2>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>EPI</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in solicitacoesAlunos" :key="s.id">
                                    <td>{{ s.solicitante }}</td>
                                    <td>{{ s.epi_nome }}</td>
                                    <td>{{ formatDate(s.data) }}</td>
                                    <td><span :class="['badge', getBadgeStatus(s.status)]">{{ s.status }}</span></td>
                                    <td class="actions-cell">
                                        <button v-if="s.status === 'Pendente'" class="btn-icon btn-green"
                                            @click="aprovarSolicitacao(s)">
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                        <button v-if="s.status === 'Pendente'" class="btn-icon btn-danger"
                                            @click="rejeitarSolicitacao(s)">
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="solicitacoesAlunos.length === 0">
                                    <td colspan="5" class="empty-row">Nenhuma solicitação de aluno.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Minhas solicitações -->
                <div v-if="tabDocente === 'minhas'">
                    <h2 class="section-title">Minhas solicitações</h2>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>EPI</th>
                                    <th>Data entrega</th>
                                    <th>Devolução</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="e in minhasEntregas" :key="e.id">
                                    <td>{{ e.epi_nome }}</td>
                                    <td>{{ formatDate(e.data_entrega) }}</td>
                                    <td>{{ e.data_devolucao ? formatDate(e.data_devolucao) : '—' }}</td>
                                    <td>
                                        <button v-if="!e.data_devolucao" class="btn-sm btn-outline"
                                            @click="devolverEpi(e)">
                                            Devolver
                                        </button>
                                        <span v-else class="badge badge-green">Devolvido</span>
                                    </td>
                                </tr>
                                <tr v-if="minhasEntregas.length === 0">
                                    <td colspan="4" class="empty-row">Nenhuma entrega registrada.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>

            <!-- ========== ALUNO ========== -->
            <template v-else-if="role === 'aluno'">
                <div class="tabs">
                    <button :class="['tab', { active: tabAluno === 'epis' }]" @click="tabAluno = 'epis'">
                        <i class="fa-solid fa-boxes-stacked"></i> EPIs disponíveis
                    </button>
                    <button :class="['tab', { active: tabAluno === 'minhas' }]" @click="tabAluno = 'minhas'">
                        <i class="fa-solid fa-user"></i> Minhas solicitações
                    </button>
                </div>

                <div v-if="tabAluno === 'epis'">
                    <h2 class="section-title">EPIs disponíveis</h2>
                    <div class="epis-grid">
                        <div class="epi-card" v-for="epi in episDisponiveis" :key="epi.idepis">
                            <div class="epi-card-icon"><i class="fa-solid fa-helmet-safety"></i></div>
                            <div class="epi-card-info">
                                <h3>{{ epi.nome }}</h3>
                                <p>{{ epi.tipo }}</p>
                                <span class="epi-qtd">{{ epi.quantidade }} unidades</span>
                            </div>
                            <button class="btn-sm" @click="abrirModalSolicitar(epi, 'aluno')">Solicitar</button>
                        </div>
                    </div>
                </div>

                <div v-if="tabAluno === 'minhas'">
                    <h2 class="section-title">Meus EPIs</h2>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>EPI</th>
                                    <th>Tipo</th>
                                    <th>Data de entrega</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="e in minhasEntregas" :key="e.id">
                                    <td>{{ e.epi_nome }}</td>
                                    <td>{{ e.epi_tipo }}</td>
                                    <td>{{ formatDate(e.data_entrega) }}</td>
                                </tr>
                                <tr v-if="minhasEntregas.length === 0">
                                    <td colspan="3" class="empty-row">Nenhum EPI recebido ainda.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>

        </template>

        <!-- ========== MODAL EPI (admin) ========== -->
        <div class="modal-overlay" v-if="modalEpi" @click.self="modalEpi = false">
            <div class="modal">
                <h2 class="modal-title">{{ editandoEpi ? 'Editar EPI' : 'Novo EPI' }}</h2>
                <div class="modal-form">
                    <div class="field"><label>Nome</label><input v-model="formEpi.nome" type="text"
                            placeholder="Nome do EPI">
                    </div>
                    <div class="field"><label>Tipo</label><input v-model="formEpi.tipo" type="text"
                            placeholder="Ex: Proteção da Cabeça"></div>
                    <div class="field"><label>Quantidade</label><input v-model.number="formEpi.quantidade" type="number"
                            min="0"></div>
                    <div class="field"><label>Código patrimônio</label><input v-model="formEpi.codigo_patrimonio"
                            type="text" placeholder="CAP-001"></div>
                    <div class="field"><label>Validade</label><input v-model="formEpi.data_validade" type="date"></div>
                    <div class="field field-check">
                        <label>Disponível</label>
                        <input v-model="formEpi.disponivel" type="checkbox">
                    </div>
                </div>
                <p v-if="modalError" class="error-msg">{{ modalError }}</p>
                <div class="modal-actions">
                    <button class="btn-outline" @click="modalEpi = false">Cancelar</button>
                    <button class="btn-primary" @click="salvarEpi" :disabled="salvando">
                        {{ salvando ? 'Salvando...' : 'Salvar' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- ========== MODAL SOLICITAR LOTE (docente) ========== -->
        <div class="modal-overlay" v-if="modalLote" @click.self="modalLote = false">
            <div class="modal">
                <h2 class="modal-title">Solicitar EPIs em lote</h2>
                <div class="modal-form">
                    <div class="field">
                        <label>EPI</label>
                        <select v-model="formLote.epi_id">
                            <option value="" disabled>Selecione um EPI</option>
                            <option v-for="epi in episDisponiveis" :key="epi.idepis" :value="epi.idepis">{{ epi.nome }}
                            </option>
                        </select>
                    </div>
                    <div class="field">
                        <label>Quantidade</label>
                        <input v-model.number="formLote.quantidade" type="number" min="1">
                    </div>
                </div>
                <p v-if="modalError" class="error-msg">{{ modalError }}</p>
                <div class="modal-actions">
                    <button class="btn-outline" @click="modalLote = false">Cancelar</button>
                    <button class="btn-primary" @click="confirmarLote" :disabled="salvando">
                        {{ salvando ? 'Enviando...' : 'Solicitar' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- ========== MODAL SOLICITAR EPI ========== -->
        <div class="modal-overlay" v-if="modalSolicitar" @click.self="modalSolicitar = false">
            <div class="modal">
                <div class="modal-epi-header">
                    <div class="modal-epi-icon"><i class="fa-solid fa-helmet-safety"></i></div>
                    <div>
                        <h2 class="modal-title">{{ epiSelecionado?.nome }}</h2>
                        <p class="modal-epi-tipo">{{ epiSelecionado?.tipo }}</p>
                    </div>
                </div>
                <div class="modal-epi-info">
                    <div class="modal-info-row">
                        <span class="modal-info-label">Disponibilidade</span>
                        <span class="badge badge-green">{{ epiSelecionado?.quantidade }} unidades</span>
                    </div>
                    <div class="modal-info-row">
                        <span class="modal-info-label">Validade</span>
                        <span class="modal-info-value">{{ formatDate(epiSelecionado?.data_validade) }}</span>
                    </div>
                    <div class="modal-info-row">
                        <span class="modal-info-label">Código patrimônio</span>
                        <span class="modal-info-value">{{ epiSelecionado?.codigo_patrimonio || '—' }}</span>
                    </div>
                    <div class="modal-info-row">
                        <span class="modal-info-label">Data de solicitação</span>
                        <span class="modal-info-value">{{ dataHoje }}</span>
                    </div>
                </div>
                <p class="modal-confirm-text">Confirmar solicitação deste EPI?</p>
                <p v-if="modalError" class="error-msg">{{ modalError }}</p>
                <div class="modal-actions">
                    <button class="btn-outline" @click="modalSolicitar = false">Cancelar</button>
                    <button class="btn-primary" @click="confirmarSolicitacao" :disabled="salvando">
                        {{ salvando ? 'Solicitando...' : 'Confirmar solicitação' }}
                    </button>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Sidebar from "../components/Sidebar.vue";
import { useSupabase } from "../composables/useSupabase.js";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'Estoque',
    components: { NavBar, Sidebar },
    setup() {
        const { supabase } = useSupabase();
        const router = useRouter();
        const sidebarOpen = ref(false);

        const loading = ref(true);
        const role = ref('');
        const userId = ref('');
        const userEmail = ref('');
        const funcionarioId = ref(null);
        const alunoId = ref(null);

        const tabAdmin = ref('epis');
        const tabDocente = ref('epis');
        const tabAluno = ref('epis');

        const epis = ref([]);
        const episDisponiveis = computed(() => epis.value.filter(e => e.disponivel && e.quantidade > 0));
        const solicitacoes = ref([]);
        const solicitacoesAlunos = ref([]);
        const minhasEntregas = ref([]);

        // Modal EPI
        const modalEpi = ref(false);
        const editandoEpi = ref(false);
        const formEpi = ref({ nome: '', tipo: '', quantidade: 0, disponivel: true, data_validade: '', codigo_patrimonio: '' });
        const modalError = ref('');
        const salvando = ref(false);

        // Modal solicitar individual
        const modalSolicitar = ref(false);
        const epiSelecionado = ref(null);
        const tipoSolicitante = ref('');
        const dataHoje = new Date().toLocaleDateString('pt-BR');

        function abrirModalSolicitar(epi, tipo) {
            epiSelecionado.value = epi;
            tipoSolicitante.value = tipo;
            modalError.value = '';
            modalSolicitar.value = true;
        }

        async function confirmarSolicitacao() {
            salvando.value = true;
            modalError.value = '';
            const hoje = new Date().toISOString().split('T')[0];

            if (tipoSolicitante.value === 'aluno') {
                if (!alunoId.value) { modalError.value = 'Aluno não identificado.'; salvando.value = false; return; }
                const { error } = await supabase.from('aluno_has_epis').insert({
                    aluno_id: alunoId.value,
                    epis_id: epiSelecionado.value.idepis,
                    data_entrega: hoje
                });
                if (error) { modalError.value = 'Erro ao solicitar.'; salvando.value = false; return; }
                await carregarEntregasAluno();
            } else {
                if (!funcionarioId.value) { modalError.value = 'Funcionário não identificado.'; salvando.value = false; return; }
                const { error } = await supabase.from('funcionario_has_epis').insert({
                    funcionario_id: funcionarioId.value,
                    epis_id: epiSelecionado.value.idepis,
                    data_entrega: hoje
                });
                if (error) { modalError.value = 'Erro ao solicitar.'; salvando.value = false; return; }
                await carregarEntregasFuncionario();
            }

            salvando.value = false;
            modalSolicitar.value = false;
        }

        // Modal lote
        const modalLote = ref(false);
        const formLote = ref({ epi_id: '', quantidade: 1 });

        function formatDate(d) {
            if (!d) return '—';
            const [y, m, day] = d.split('-');
            return `${day}/${m}/${y}`;
        }

        function getBadgeStatus(s) {
            if (s === 'Aprovado') return 'badge-green';
            if (s === 'Rejeitado') return 'badge-red';
            return 'badge-yellow';
        }

        async function carregarEpis() {
            const { data } = await supabase.from('epis').select('*').order('nome');
            if (data) epis.value = data;
        }

        async function carregarSolicitacoes() {
            // solicitações = aluno_has_epis + funcionario_has_epis unificados
            const { data: sa } = await supabase
                .from('aluno_has_epis')
                .select('id_entrega_aluno, data_entrega, aluno(nome, sobrenome), epis(nome)');
            const { data: sf } = await supabase
                .from('funcionario_has_epis')
                .select('id_entrega_func, data_entrega, funcionario(nome, sobrenome), epis(nome)');

            const lista = [];
            if (sa) sa.forEach(s => lista.push({
                id: `a-${s.id_entrega_aluno}`,
                solicitante: `${s.aluno?.nome} ${s.aluno?.sobrenome}`,
                tipo_solicitante: 'Aluno',
                epi_nome: s.epis?.nome,
                data: s.data_entrega,
                status: 'Aprovado',
                origem: 'aluno',
                origem_id: s.id_entrega_aluno
            }));
            if (sf) sf.forEach(s => lista.push({
                id: `f-${s.id_entrega_func}`,
                solicitante: `${s.funcionario?.nome} ${s.funcionario?.sobrenome}`,
                tipo_solicitante: 'Funcionário',
                epi_nome: s.epis?.nome,
                data: s.data_entrega,
                status: s.data_devolucao ? 'Devolvido' : 'Aprovado',
                origem: 'funcionario',
                origem_id: s.id_entrega_func
            }));
            solicitacoes.value = lista;
        }

        async function carregarEntregasAluno() {
            if (!alunoId.value) return;
            const { data } = await supabase
                .from('aluno_has_epis')
                .select('id_entrega_aluno, data_entrega, epis(nome, tipo)')
                .eq('aluno_id', alunoId.value);
            if (data) minhasEntregas.value = data.map(e => ({
                id: e.id_entrega_aluno,
                epi_nome: e.epis?.nome,
                epi_tipo: e.epis?.tipo,
                data_entrega: e.data_entrega
            }));
        }

        async function carregarEntregasFuncionario() {
            if (!funcionarioId.value) return;
            const { data } = await supabase
                .from('funcionario_has_epis')
                .select('id_entrega_func, data_entrega, data_devolucao, epis(nome)')
                .eq('funcionario_id', funcionarioId.value);
            if (data) minhasEntregas.value = data.map(e => ({
                id: e.id_entrega_func,
                epi_nome: e.epis?.nome,
                data_entrega: e.data_entrega,
                data_devolucao: e.data_devolucao
            }));
        }

        async function carregarSolicitacoesAlunos() {
            const { data } = await supabase
                .from('aluno_has_epis')
                .select('id_entrega_aluno, data_entrega, aluno(nome, sobrenome), epis(nome)');
            if (data) solicitacoesAlunos.value = data.map(s => ({
                id: `a-${s.id_entrega_aluno}`,
                solicitante: `${s.aluno?.nome} ${s.aluno?.sobrenome}`,
                epi_nome: s.epis?.nome,
                data: s.data_entrega,
                status: 'Aprovado',
                origem_id: s.id_entrega_aluno
            }));
        }

        // ADMIN — CRUD EPI
        function abrirModalNovoEpi() {
            editandoEpi.value = false;
            formEpi.value = { nome: '', tipo: '', quantidade: 0, disponivel: true, data_validade: '', codigo_patrimonio: '' };
            modalError.value = '';
            modalEpi.value = true;
        }

        function abrirModalEditarEpi(epi) {
            editandoEpi.value = true;
            formEpi.value = { ...epi };
            modalError.value = '';
            modalEpi.value = true;
        }

        async function salvarEpi() {
            if (!formEpi.value.nome) { modalError.value = 'Nome obrigatório.'; return; }
            salvando.value = true;
            modalError.value = '';

            if (editandoEpi.value) {
                const { error } = await supabase.from('epis').update({
                    nome: formEpi.value.nome,
                    tipo: formEpi.value.tipo,
                    quantidade: formEpi.value.quantidade,
                    disponivel: formEpi.value.disponivel,
                    data_validade: formEpi.value.data_validade || null,
                    codigo_patrimonio: formEpi.value.codigo_patrimonio || null,
                }).eq('idepis', formEpi.value.idepis);
                if (error) { modalError.value = 'Erro ao salvar.'; salvando.value = false; return; }
            } else {
                const { error } = await supabase.from('epis').insert({
                    nome: formEpi.value.nome,
                    tipo: formEpi.value.tipo,
                    quantidade: formEpi.value.quantidade,
                    disponivel: formEpi.value.disponivel,
                    data_validade: formEpi.value.data_validade || null,
                    codigo_patrimonio: formEpi.value.codigo_patrimonio || null,
                });
                if (error) { modalError.value = 'Erro ao criar EPI.'; salvando.value = false; return; }
            }

            await carregarEpis();
            salvando.value = false;
            modalEpi.value = false;
        }

        async function deletarEpi(id) {
            if (!confirm('Deletar este EPI?')) return;
            await supabase.from('epis').delete().eq('idepis', id);
            await carregarEpis();
        }

        async function aprovarSolicitacao(s) {
            // já aprovado automaticamente no modelo atual — apenas feedback
            alert(`Solicitação de ${s.solicitante} aprovada.`);
        }

        async function rejeitarSolicitacao(s) {
            if (s.origem === 'aluno') {
                await supabase.from('aluno_has_epis').delete().eq('id_entrega_aluno', s.origem_id);
            } else {
                await supabase.from('funcionario_has_epis').delete().eq('id_entrega_func', s.origem_id);
            }
            await carregarSolicitacoes();
        }

        // DOCENTE
        function abrirModalSolicitarLote() {
            formLote.value = { epi_id: '', quantidade: 1 };
            modalError.value = '';
            modalLote.value = true;
        }

        async function confirmarLote() {
            if (!formLote.value.epi_id || formLote.value.quantidade < 1) {
                modalError.value = 'Selecione um EPI e quantidade válida.'; return;
            }
            salvando.value = true;
            const inserts = [];
            for (let i = 0; i < formLote.value.quantidade; i++) {
                inserts.push({ funcionario_id: funcionarioId.value, epis_id: formLote.value.epi_id, data_entrega: new Date().toISOString().split('T')[0] });
            }
            const { error } = await supabase.from('funcionario_has_epis').insert(inserts);
            salvando.value = false;
            if (error) { modalError.value = 'Erro ao solicitar.'; return; }
            await carregarEntregasFuncionario();
            modalLote.value = false;
        }

        async function solicitarEpi(epi) {
            if (!funcionarioId.value) return;
            const { error } = await supabase.from('funcionario_has_epis').insert({
                funcionario_id: funcionarioId.value,
                epis_id: epi.idepis,
                data_entrega: new Date().toISOString().split('T')[0]
            });
            if (!error) { alert(`${epi.nome} solicitado com sucesso!`); await carregarEntregasFuncionario(); }
        }

        async function devolverEpi(entrega) {
            await supabase.from('funcionario_has_epis')
                .update({ data_devolucao: new Date().toISOString().split('T')[0] })
                .eq('id_entrega_func', entrega.id);
            await carregarEntregasFuncionario();
        }

        // ALUNO
        async function solicitarEpiAluno(epi) {
            if (!alunoId.value) return;
            const { error } = await supabase.from('aluno_has_epis').insert({
                aluno_id: alunoId.value,
                epis_id: epi.idepis,
                data_entrega: new Date().toISOString().split('T')[0]
            });
            if (!error) { alert(`${epi.nome} solicitado com sucesso!`); await carregarEntregasAluno(); }
        }

        onMounted(async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) { router.push('/login'); return; }

            userId.value = data.session.user.id;
            userEmail.value = data.session.user.email;

            const { data: profile } = await supabase.from('profiles').select('role').eq('id', userId.value).single();
            if (profile) role.value = profile.role;

            await carregarEpis();

            if (role.value === 'admin') {
                await carregarSolicitacoes();
            }

            if (role.value === 'docente') {
                const { data: func } = await supabase.from('funcionario').select('idfuncionario').eq('email', userEmail.value).single();
                if (func) funcionarioId.value = func.idfuncionario;
                await carregarEntregasFuncionario();
                await carregarSolicitacoesAlunos();
            }

            if (role.value === 'aluno') {
                const { data: aluno } = await supabase.from('aluno').select('idaluno').eq('auth_id', userId.value).single();
                if (aluno) alunoId.value = aluno.idaluno;
                await carregarEntregasAluno();
            }

            loading.value = false;
        });

        return {
            sidebarOpen, loading, role,
            tabAdmin, tabDocente, tabAluno,
            epis, episDisponiveis, solicitacoes, solicitacoesAlunos, minhasEntregas,
            modalEpi, editandoEpi, formEpi, modalError, salvando,
            modalLote, formLote,
            formatDate, getBadgeStatus,
            abrirModalNovoEpi, abrirModalEditarEpi, salvarEpi, deletarEpi,
            aprovarSolicitacao, rejeitarSolicitacao,
            modalSolicitar, epiSelecionado, dataHoje,
            abrirModalSolicitar, confirmarSolicitacao,
            abrirModalSolicitarLote, confirmarLote, solicitarEpi, devolverEpi,
            solicitarEpiAluno
        };
    }
}
</script>

<style scoped>
.main {
    min-height: 100vh;
    background-color: #f0f4ff;
    padding: 12vh 5rem 4rem 5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.page-header {
    display: flex;
    flex-direction: column;
}

.script {
    font-family: 'Pinyon Script', cursive;
    color: #243c75;
    font-size: 2rem;
    margin: 0;
    line-height: 1;
}

.page-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 4rem;
    font-weight: 900;
    margin: 0;
    line-height: 1;
}

.loading {
    font-family: 'Red Hat Display', sans-serif;
    color: #243c75;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Tabs */
.tabs {
    display: flex;
    gap: 0.5rem;
    border-bottom: 2px solid #d0daf0;
    padding-bottom: 0;
}

.tab {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    color: #6b82b0;
    cursor: pointer;
    margin-bottom: -2px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s ease;
}

.tab.active {
    color: #243c75;
    border-bottom-color: #243c75;
}

.tab:hover {
    color: #243c75;
}

/* Section header */
.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.section-title {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 1.3rem;
    margin: 0;
}

/* Botões */
.btn-primary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #243c75;
    color: #e2f9ff;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.btn-primary:hover {
    background-color: #1a2d5a;
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-outline {
    background: transparent;
    border: 2px solid #243c75;
    color: #243c75;
    border-radius: 8px;
    padding: 0.6rem 1.2rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-outline:hover {
    background-color: #243c75;
    color: #e2f9ff;
}

.btn-sm {
    background-color: #243c75;
    color: #e2f9ff;
    border: none;
    border-radius: 6px;
    padding: 0.4rem 0.9rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    white-space: nowrap;
}

.btn-sm:hover {
    background-color: #1a2d5a;
}

.btn-sm.btn-outline {
    background: transparent;
    border: 1.5px solid #243c75;
    color: #243c75;
}

.btn-icon {
    width: 2rem;
    height: 2rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    background-color: #e8eeff;
    color: #243c75;
    transition: background-color 0.2s ease;
}

.btn-icon:hover {
    background-color: #d0daf0;
}

.btn-icon.btn-danger {
    background-color: #fdecea;
    color: #c0392b;
}

.btn-icon.btn-danger:hover {
    background-color: #f5c6c2;
}

.btn-icon.btn-green {
    background-color: #e8f5e9;
    color: #16a34a;
}

.btn-icon.btn-green:hover {
    background-color: #c8e6c9;
}

/* Table */
.table-wrapper {
    background-color: #fff;
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
    letter-spacing: 0.08em;
    color: #9aaac5;
    background-color: #f8f9ff;
    padding: 1rem 1.25rem;
    text-align: left;
    border-bottom: 1px solid #e8edf8;
}

.table td {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    color: #1a2b5e;
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid #edf0f8;
}

.table tr:last-child td {
    border-bottom: none;
}

.table tr:hover td {
    background-color: #f8f9ff;
}

.actions-cell {
    display: flex;
    gap: 0.4rem;
    align-items: center;
}

.empty-row {
    text-align: center;
    color: #9aaac5 !important;
    padding: 2rem !important;
    font-style: italic;
}

/* Badges */
.badge {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2rem 0.7rem;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.badge-green {
    background-color: #e8f5e9;
    color: #16a34a;
}

.badge-red {
    background-color: #fdecea;
    color: #c0392b;
}

.badge-yellow {
    background-color: #fff8e1;
    color: #d97706;
}

/* EPIs grid (aluno/docente) */
.epis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
}

.epi-card {
    background-color: #fff;
    border: 1px solid #d0daf0;
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 2px 12px rgba(36, 60, 117, 0.07);
    transition: box-shadow 0.2s ease;
}

.epi-card:hover {
    box-shadow: 0 4px 20px rgba(36, 60, 117, 0.14);
}

.epi-card-icon {
    width: 3rem;
    height: 3rem;
    background-color: #243c75;
    color: #e2f9ff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
}

.epi-card-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}

.epi-card-info h3 {
    font-family: 'Anton', sans-serif;
    color: #1a2b5e;
    font-size: 1rem;
    margin: 0;
}

.epi-card-info p {
    font-family: 'Red Hat Display', sans-serif;
    color: #6b82b0;
    font-size: 0.82rem;
    margin: 0;
}

.epi-qtd {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.78rem;
    color: #16a34a;
    font-weight: 700;
}

/* Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    background: #fff;
    border-radius: 16px;
    padding: 2rem;
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}

.modal-title {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 1.3rem;
    margin: 0;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.field.field-check {
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

.field label {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.field input,
.field select {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #d0daf0;
    border-radius: 6px;
    height: 2.8rem;
    box-sizing: border-box;
    font-family: 'Red Hat Display', sans-serif;
    color: #1a2b5e;
}

.field input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.error-msg {
    font-family: 'Red Hat Display', sans-serif;
    color: #c0392b;
    font-size: 0.9rem;
    background-color: #fdecea;
    border: 1px solid #c0392b;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    margin: 0;
}

.modal-epi-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e8edf8;
}

.modal-epi-icon {
    width: 3.5rem;
    height: 3.5rem;
    background-color: #243c75;
    color: #e2f9ff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.modal-epi-tipo {
    font-family: 'Red Hat Display', sans-serif;
    color: #6b82b0;
    font-size: 0.9rem;
    margin: 0.2rem 0 0 0;
}

.modal-epi-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background-color: #f8f9ff;
    border-radius: 10px;
    padding: 1rem;
}

.modal-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-info-label {
    font-family: 'Anton', sans-serif;
    color: #9aaac5;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.modal-info-value {
    font-family: 'Red Hat Display', sans-serif;
    color: #1a2b5e;
    font-size: 0.95rem;
    font-weight: 600;
}

.modal-confirm-text {
    font-family: 'Red Hat Display', sans-serif;
    color: #243c75;
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    text-align: center;
}

@media (max-width: 768px) {
    .main {
        padding: 10vh 1.5rem 3rem 1.5rem;
    }

    .page-title {
        font-size: 2.5rem;
    }

    .epis-grid {
        grid-template-columns: 1fr;
    }

    .table th,
    .table td {
        padding: 0.75rem;
        font-size: 0.85rem;
    }
}
</style>
