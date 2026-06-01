<template>
    <NavBar @toggle="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main">

        <section class="page-header">
            <h3 class="script">Gestão de</h3>
            <h1 class="page-title">USUÁRIOS</h1>
        </section>

        <div v-if="loading" class="loading">
            <i class="fa-solid fa-spinner fa-spin"></i> Carregando...
        </div>

        <template v-else>
            <div class="tabs">
                <button :class="['tab', { active: tab === 'pendentes' }]" @click="tab = 'pendentes'">
                    <i class="fa-solid fa-clock"></i> Pendentes
                    <span v-if="pendentes.length > 0" class="tab-badge">{{ pendentes.length }}</span>
                </button>
                <button :class="['tab', { active: tab === 'alunos' }]" @click="tab = 'alunos'">
                    <i class="fa-solid fa-user-graduate"></i> Alunos
                </button>
                <button :class="['tab', { active: tab === 'funcionarios' }]" @click="tab = 'funcionarios'">
                    <i class="fa-solid fa-briefcase"></i> Funcionários
                </button>
            </div>

            <div v-if="tab === 'pendentes'">
                <h2 class="section-title">Cadastros pendentes de aprovação</h2>

                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>CPF</th>
                                <th>Nascimento</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="a in pendentes" :key="a.idaluno">
                                <td>{{ a.nome }} {{ a.sobrenome }}</td>
                                <td>{{ a.email }}</td>
                                <td>{{ a.cpf }}</td>
                                <td>{{ formatDate(a.data_nascimento) }}</td>
                                <td>{{ a.telefone || '—' }}</td>
                                <td class="actions-cell">
                                    <button class="btn-icon btn-green" @click="aprovarAluno(a)" title="Aprovar">
                                        <i class="fa-solid fa-check"></i>
                                    </button>
                                    <button class="btn-icon btn-danger" @click="rejeitarAluno(a)" title="Rejeitar">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="pendentes.length === 0">
                                <td colspan="6" class="empty-row">Nenhum cadastro pendente.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="cards-mobile">
                    <div v-if="pendentes.length === 0" class="card-empty">Nenhum cadastro pendente.</div>
                    <div v-for="a in pendentes" :key="a.idaluno" class="user-card">
                        <div class="user-card-header">
                            <span class="user-card-nome">{{ a.nome }} {{ a.sobrenome }}</span>
                            <div class="actions-cell">
                                <button class="btn-icon btn-green" @click="aprovarAluno(a)" title="Aprovar">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                                <button class="btn-icon btn-danger" @click="rejeitarAluno(a)" title="Rejeitar">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                        <div class="user-card-row"><span class="user-card-label">Email</span><span>{{ a.email }}</span>
                        </div>
                        <div class="user-card-row"><span class="user-card-label">CPF</span><span>{{ a.cpf }}</span>
                        </div>
                        <div class="user-card-row"><span class="user-card-label">Nascimento</span><span>{{
                                formatDate(a.data_nascimento) }}</span></div>
                        <div class="user-card-row"><span class="user-card-label">Telefone</span><span>{{ a.telefone ||
                                '—' }}</span></div>
                    </div>
                </div>
            </div>

            <div v-if="tab === 'alunos'">
                <div class="section-header">
                    <h2 class="section-title">Alunos</h2>
                    <div class="filtro-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input v-model="filtroAluno" type="text" placeholder="Buscar por nome ou email...">
                    </div>
                </div>

                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="a in alunosFiltrados" :key="a.idaluno">
                                <td>{{ a.nome }} {{ a.sobrenome }}</td>
                                <td>{{ a.email }}</td>
                                <td>{{ a.cpf }}</td>
                                <td>{{ a.telefone || '—' }}</td>
                                <td><span :class="['badge', getBadgeStatus(a.status)]">{{ formatStatus(a.status)
                                        }}</span></td>
                                <td class="actions-cell">
                                    <button class="btn-icon" @click="abrirModalEditar(a, 'aluno')" title="Editar">
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
                                    <button v-if="a.status === 'ativo'" class="btn-icon btn-danger"
                                        @click="inativarAluno(a)" title="Inativar">
                                        <i class="fa-solid fa-ban"></i>
                                    </button>
                                    <button v-if="a.status === 'inativo'" class="btn-icon btn-green"
                                        @click="reativarAluno(a)" title="Reativar">
                                        <i class="fa-solid fa-rotate-left"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="alunosFiltrados.length === 0">
                                <td colspan="6" class="empty-row">Nenhum aluno encontrado.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="cards-mobile">
                    <div v-if="alunosFiltrados.length === 0" class="card-empty">Nenhum aluno encontrado.</div>
                    <div v-for="a in alunosFiltrados" :key="a.idaluno" class="user-card">
                        <div class="user-card-header">
                            <span class="user-card-nome">{{ a.nome }} {{ a.sobrenome }}</span>
                            <div class="actions-cell">
                                <button class="btn-icon" @click="abrirModalEditar(a, 'aluno')" title="Editar">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button v-if="a.status === 'ativo'" class="btn-icon btn-danger"
                                    @click="inativarAluno(a)">
                                    <i class="fa-solid fa-ban"></i>
                                </button>
                                <button v-if="a.status === 'inativo'" class="btn-icon btn-green"
                                    @click="reativarAluno(a)">
                                    <i class="fa-solid fa-rotate-left"></i>
                                </button>
                            </div>
                        </div>
                        <div class="user-card-row"><span class="user-card-label">Email</span><span>{{ a.email }}</span>
                        </div>
                        <div class="user-card-row"><span class="user-card-label">CPF</span><span>{{ a.cpf }}</span>
                        </div>
                        <div class="user-card-row"><span class="user-card-label">Telefone</span><span>{{ a.telefone ||
                                '—' }}</span></div>
                        <div class="user-card-row">
                            <span class="user-card-label">Status</span>
                            <span :class="['badge', getBadgeStatus(a.status)]">{{ formatStatus(a.status) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="tab === 'funcionarios'">
                <div class="section-header">
                    <h2 class="section-title">Funcionários</h2>
                    <div class="filtro-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input v-model="filtroFunc" type="text" placeholder="Buscar por nome ou email...">
                    </div>
                </div>

                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="f in funcionariosFiltrados" :key="f.idfuncionario">
                                <td>{{ f.nome }} {{ f.sobrenome }}</td>
                                <td>{{ f.email }}</td>
                                <td>{{ f.funcao || '—' }}</td>
                                <td><span :class="['badge', f.status === 'Ativo' ? 'badge-green' : 'badge-red']">{{
                                        f.status }}</span></td>
                                <td class="actions-cell">
                                    <button class="btn-icon" @click="abrirModalEditar(f, 'funcionario')" title="Editar">
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
                                    <button v-if="f.status === 'Ativo'" class="btn-icon btn-danger"
                                        @click="toggleFuncionario(f, 'Inativo')" title="Inativar">
                                        <i class="fa-solid fa-ban"></i>
                                    </button>
                                    <button v-if="f.status === 'Inativo'" class="btn-icon btn-green"
                                        @click="toggleFuncionario(f, 'Ativo')" title="Reativar">
                                        <i class="fa-solid fa-rotate-left"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="funcionariosFiltrados.length === 0">
                                <td colspan="5" class="empty-row">Nenhum funcionário encontrado.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="cards-mobile">
                    <div v-if="funcionariosFiltrados.length === 0" class="card-empty">Nenhum funcionário encontrado.
                    </div>
                    <div v-for="f in funcionariosFiltrados" :key="f.idfuncionario" class="user-card">
                        <div class="user-card-header">
                            <span class="user-card-nome">{{ f.nome }} {{ f.sobrenome }}</span>
                            <div class="actions-cell">
                                <button class="btn-icon" @click="abrirModalEditar(f, 'funcionario')" title="Editar">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button v-if="f.status === 'Ativo'" class="btn-icon btn-danger"
                                    @click="toggleFuncionario(f, 'Inativo')">
                                    <i class="fa-solid fa-ban"></i>
                                </button>
                                <button v-if="f.status === 'Inativo'" class="btn-icon btn-green"
                                    @click="toggleFuncionario(f, 'Ativo')">
                                    <i class="fa-solid fa-rotate-left"></i>
                                </button>
                            </div>
                        </div>
                        <div class="user-card-row"><span class="user-card-label">Email</span><span>{{ f.email }}</span>
                        </div>
                        <div class="user-card-row"><span class="user-card-label">Função</span><span>{{ f.funcao || '—'
                                }}</span></div>
                        <div class="user-card-row">
                            <span class="user-card-label">Status</span>
                            <span :class="['badge', f.status === 'Ativo' ? 'badge-green' : 'badge-red']">{{ f.status
                                }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="modal-overlay" v-if="modalEditar" @click.self="modalEditar = false">
            <div class="modal">
                <h2 class="modal-title">Editar {{ editandoTipo === 'aluno' ? 'Aluno' : 'Funcionário' }}</h2>
                <div class="modal-form">
                    <div class="form-row">
                        <div class="field">
                            <label>Nome</label>
                            <input v-model="formEditar.nome" type="text">
                        </div>
                        <div class="field">
                            <label>Sobrenome</label>
                            <input v-model="formEditar.sobrenome" type="text">
                        </div>
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input v-model="formEditar.email" type="email">
                    </div>
                    <div class="field" v-if="editandoTipo === 'aluno'">
                        <label>CPF</label>
                        <input v-model="formEditar.cpf" type="text">
                    </div>
                    <div class="field">
                        <label>Telefone</label>
                        <input v-model="formEditar.telefone" type="text">
                    </div>
                    <div class="field" v-if="editandoTipo === 'funcionario'">
                        <label>Função</label>
                        <input v-model="formEditar.funcao" type="text">
                    </div>
                </div>
                <p v-if="modalError" class="error-msg">{{ modalError }}</p>
                <div class="modal-actions">
                    <button class="btn-outline" @click="modalEditar = false">Cancelar</button>
                    <button class="btn-primary" @click="salvarEdicao" :disabled="salvando">
                        {{ salvando ? 'Salvando...' : 'Salvar' }}
                    </button>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { useSupabase } from "../composables/useSupabase.js";
import { ref, computed, onMounted, inject } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'GerenciamentoUsuarios',
    components: { NavBar, Sidebar },
    setup() {
        const { supabase } = useSupabase();
        const router = useRouter();
        const showToast = inject("showToast");
        const sidebarOpen = ref(false);
        const loading = ref(true);
        const tab = ref('pendentes');

        const alunos = ref([]);
        const funcionarios = ref([]);
        const filtroAluno = ref('');
        const filtroFunc = ref('');

        const pendentes = computed(() => alunos.value.filter(a => a.status === 'pendente'));

        const alunosFiltrados = computed(() => {
            const ativos = alunos.value.filter(a => a.status !== 'pendente');
            if (!filtroAluno.value) return ativos;
            const q = filtroAluno.value.toLowerCase();
            return ativos.filter(a =>
                `${a.nome} ${a.sobrenome}`.toLowerCase().includes(q) ||
                (a.email || '').toLowerCase().includes(q)
            );
        });

        const funcionariosFiltrados = computed(() => {
            if (!filtroFunc.value) return funcionarios.value;
            const q = filtroFunc.value.toLowerCase();
            return funcionarios.value.filter(f =>
                `${f.nome} ${f.sobrenome}`.toLowerCase().includes(q) ||
                (f.email || '').toLowerCase().includes(q)
            );
        });

        const modalEditar = ref(false);
        const editandoTipo = ref('');
        const editandoId = ref(null);
        const formEditar = ref({});
        const modalError = ref('');
        const salvando = ref(false);

        function formatDate(d) {
            if (!d) return '—';
            const [y, m, day] = d.split('-');
            return `${day}/${m}/${y}`;
        }

        function getBadgeStatus(s) {
            if (s === 'ativo') return 'badge-green';
            if (s === 'inativo') return 'badge-red';
            return 'badge-yellow';
        }

        function formatStatus(s) {
            if (!s) return '—';
            return s.charAt(0).toUpperCase() + s.slice(1);
        }

        async function carregarAlunos() {
            const { data } = await supabase.from('aluno').select('*').order('nome');
            if (data) alunos.value = data;
        }

        async function carregarFuncionarios() {
            const { data } = await supabase.from('funcionario').select('*').order('nome');
            if (data) funcionarios.value = data;
        }

        async function aprovarAluno(a) {
            const { error } = await supabase.from('aluno').update({ status: 'ativo' }).eq('idaluno', a.idaluno);
            if (error) { showToast('Erro ao aprovar cadastro.', 'error'); return; }
            showToast(`${a.nome} aprovado com sucesso.`, 'success');
            await carregarAlunos();
        }

        async function rejeitarAluno(a) {
            const { error } = await supabase.from('aluno').update({ status: 'inativo' }).eq('idaluno', a.idaluno);
            if (error) { showToast('Erro ao rejeitar cadastro.', 'error'); return; }
            showToast(`Cadastro de ${a.nome} rejeitado.`, 'warning');
            await carregarAlunos();
        }

        async function inativarAluno(a) {
            const { error } = await supabase.from('aluno').update({ status: 'inativo' }).eq('idaluno', a.idaluno);
            if (error) { showToast('Erro ao inativar aluno.', 'error'); return; }
            showToast(`${a.nome} inativado.`, 'warning');
            await carregarAlunos();
        }

        async function reativarAluno(a) {
            const { error } = await supabase.from('aluno').update({ status: 'ativo' }).eq('idaluno', a.idaluno);
            if (error) { showToast('Erro ao reativar aluno.', 'error'); return; }
            showToast(`${a.nome} reativado.`, 'success');
            await carregarAlunos();
        }

        async function toggleFuncionario(f, novoStatus) {
            const { error } = await supabase.from('funcionario').update({ status: novoStatus }).eq('idfuncionario', f.idfuncionario);
            if (error) { showToast('Erro ao atualizar funcionário.', 'error'); return; }
            showToast(`${f.nome} ${novoStatus === 'Ativo' ? 'reativado' : 'inativado'}.`, novoStatus === 'Ativo' ? 'success' : 'warning');
            await carregarFuncionarios();
        }

        function abrirModalEditar(item, tipo) {
            editandoTipo.value = tipo;
            editandoId.value = tipo === 'aluno' ? item.idaluno : item.idfuncionario;
            formEditar.value = {
                nome: item.nome,
                sobrenome: item.sobrenome,
                email: item.email,
                telefone: item.telefone || '',
                cpf: item.cpf || '',
                funcao: item.funcao || ''
            };
            modalError.value = '';
            modalEditar.value = true;
        }

        async function salvarEdicao() {
            if (!formEditar.value.nome || !formEditar.value.sobrenome) {
                modalError.value = 'Nome e sobrenome obrigatórios.';
                return;
            }
            salvando.value = true;
            modalError.value = '';

            if (editandoTipo.value === 'aluno') {
                const { error } = await supabase.from('aluno').update({
                    nome: formEditar.value.nome,
                    sobrenome: formEditar.value.sobrenome,
                    email: formEditar.value.email,
                    telefone: formEditar.value.telefone || null,
                    cpf: formEditar.value.cpf || null
                }).eq('idaluno', editandoId.value);
                if (error) { modalError.value = 'Erro ao salvar.'; salvando.value = false; return; }
                await carregarAlunos();
            } else {
                const { error } = await supabase.from('funcionario').update({
                    nome: formEditar.value.nome,
                    sobrenome: formEditar.value.sobrenome,
                    email: formEditar.value.email,
                    telefone: formEditar.value.telefone || null,
                    funcao: formEditar.value.funcao || null
                }).eq('idfuncionario', editandoId.value);
                if (error) { modalError.value = 'Erro ao salvar.'; salvando.value = false; return; }
                await carregarFuncionarios();
            }

            salvando.value = false;
            modalEditar.value = false;
            showToast('Dados atualizados com sucesso.', 'success');
        }

        onMounted(async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) { router.push('/login'); return; }
            await Promise.all([carregarAlunos(), carregarFuncionarios()]);
            loading.value = false;
        });

        return {
            sidebarOpen, loading, tab,
            alunos, funcionarios, pendentes,
            filtroAluno, filtroFunc,
            alunosFiltrados, funcionariosFiltrados,
            modalEditar, editandoTipo, formEditar, modalError, salvando,
            formatDate, getBadgeStatus, formatStatus,
            aprovarAluno, rejeitarAluno, inativarAluno, reativarAluno, toggleFuncionario,
            abrirModalEditar, salvarEdicao
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
    gap: 2rem;
}

.page-header {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #d0daf0;
    border-left: 6px solid #243c75;
    box-shadow: 0 8px 32px rgba(36, 60, 117, 0.08);
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
    font-size: 3.5rem;
    font-weight: 900;
    margin: 0;
    line-height: 1;
}

.loading {
    font-family: 'Red Hat Display', sans-serif;
    color: #6b82b0;
    font-size: 1rem;
    text-align: center;
    padding: 3rem;
}

.tabs {
    display: flex;
    gap: 0.25rem;
    background: #fff;
    padding: 0.4rem;
    border-radius: 12px;
    border: 1px solid #d0daf0;
    width: fit-content;
    box-shadow: 0 4px 16px rgba(36, 60, 117, 0.05);
}

.tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    padding: 0.7rem 1.25rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    color: #6b82b0;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.tab:hover {
    color: #243c75;
    background: #f0f4ff;
}

.tab.active {
    background: #243c75;
    color: #ebfbff;
}

.tab-badge {
    background: #ef4444;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.1rem 0.45rem;
    border-radius: 99px;
    line-height: 1.4;
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
}

.section-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 1.4rem;
    margin: 0 0 1rem 0;
}

.section-header .section-title {
    margin: 0;
}

.filtro-search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #fff;
    border: 1.5px solid #d0daf0;
    border-radius: 10px;
    padding: 0 1rem;
    height: 2.8rem;
    min-width: 260px;
    transition: border-color 0.2s ease;
}

.filtro-search:focus-within {
    border-color: #243c75;
}

.filtro-search i {
    color: #9aaac5;
    font-size: 0.85rem;
}

.filtro-search input {
    border: none;
    outline: none;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.92rem;
    color: #1a2b5e;
    background: transparent;
    width: 100%;
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

.actions-cell {
    display: flex;
    gap: 0.4rem;
    align-items: center;
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

.btn-icon {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    background: #e8eeff;
    color: #243c75;
    transition: all 0.2s ease;
}

.btn-icon:hover {
    background: #243c75;
    color: #ebfbff;
}

.btn-icon.btn-danger {
    background: #fee2e2;
    color: #b91c1c;
}

.btn-icon.btn-danger:hover {
    background: #b91c1c;
    color: #fff;
}

.btn-icon.btn-green {
    background: #dcfce7;
    color: #15803d;
}

.btn-icon.btn-green:hover {
    background: #15803d;
    color: #fff;
}

.cards-mobile {
    display: none;
}

.user-card {
    background: #fff;
    border: 1px solid #d0daf0;
    border-radius: 14px;
    padding: 1.1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    box-shadow: 0 2px 12px rgba(36, 60, 117, 0.06);
}

.user-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.user-card-nome {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 0.98rem;
}

.user-card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.88rem;
    color: #1a2b5e;
    border-top: 1px solid #f0f4ff;
    padding-top: 0.5rem;
}

.user-card-label {
    font-family: 'Anton', sans-serif;
    font-size: 0.7rem;
    color: #9aaac5;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    flex-shrink: 0;
}

.card-empty {
    font-family: 'Red Hat Display', sans-serif;
    color: #9aaac5;
    font-size: 0.95rem;
    text-align: center;
    padding: 2.5rem;
    font-style: italic;
    background: #fff;
    border-radius: 14px;
    border: 1px solid #d0daf0;
}

.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 20, 50, 0.55);
    backdrop-filter: blur(4px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.modal {
    background: #fff;
    border-radius: 18px;
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
}

.modal-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 1.3rem;
    margin: 0;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-row {
    display: flex;
    gap: 1rem;
}

.form-row .field {
    flex: 1;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.field label {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.field input {
    padding: 0.65rem 0.85rem;
    font-size: 0.95rem;
    border: 1.5px solid #d0daf0;
    border-radius: 8px;
    height: 2.8rem;
    box-sizing: border-box;
    font-family: 'Red Hat Display', sans-serif;
    color: #1a2b5e;
    transition: border-color 0.2s ease;
}

.field input:focus {
    outline: none;
    border-color: #243c75;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #243c75;
    color: #ebfbff;
    border: none;
    border-radius: 10px;
    padding: 0.7rem 1.3rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary:hover {
    background: #1a2d5a;
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-outline {
    background: transparent;
    border: 2px solid #243c75;
    color: #243c75;
    border-radius: 10px;
    padding: 0.6rem 1.2rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-outline:hover {
    background: #243c75;
    color: #ebfbff;
}

.error-msg {
    font-family: 'Red Hat Display', sans-serif;
    color: #b91c1c;
    font-size: 0.9rem;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 0.6rem 1rem;
    margin: 0;
}

@media (max-width: 768px) {
    .main {
        padding: 80px 1.25rem 3rem 1.25rem;
    }

    .page-title {
        font-size: 2.5rem;
    }

    .tabs {
        width: 100%;
        overflow-x: auto;
    }

    .filtro-search {
        min-width: 100%;
    }

    .table-wrapper {
        display: none;
    }

    .cards-mobile {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .form-row {
        flex-direction: column;
    }

    .modal {
        padding: 1.5rem;
        max-height: 85vh;
    }
}
</style>
