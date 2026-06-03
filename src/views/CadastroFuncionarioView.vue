<template>
    <NavBar @toggle="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main">

        <section class="page-header">
            <h3 class="script">Cadastro de</h3>
            <h1 class="page-title">FUNCIONÁRIO</h1>
        </section>

        <div class="form-card">
            <div class="form-grid">
                <div class="field">
                    <label>Nome</label>
                    <input v-model="form.nome" type="text" placeholder="Nome">
                </div>
                <div class="field">
                    <label>Sobrenome</label>
                    <input v-model="form.sobrenome" type="text" placeholder="Sobrenome">
                </div>
                <div class="field">
                    <label>CPF</label>
                    <input v-model="form.cpf" type="text" placeholder="000.000.000-00" maxlength="14"
                        @input="formatCPF">
                </div>
                <div class="field">
                    <label>Email</label>
                    <input v-model="form.email" type="email" placeholder="email@senai.br">
                </div>
                <div class="field">
                    <label>Senha</label>
                    <div class="input-wrapper">
                        <input v-model="form.senha" :type="showSenha ? 'text' : 'password'"
                            placeholder="Mínimo 6 caracteres">
                        <i :class="showSenha ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="eye-icon"
                            @click="showSenha = !showSenha"></i>
                    </div>
                </div>
                <div class="field">
                    <label>Função</label>
                    <input v-model="form.funcao" type="text" placeholder="Ex: Técnico de Segurança">
                </div>
                <div class="field">
                    <label>Data de nascimento</label>
                    <input v-model="form.data_nascimento" type="date">
                </div>
                <div class="field">
                    <label>Telefone</label>
                    <input v-model="form.telefone" type="text" placeholder="(00) 00000-0000" maxlength="15"
                        @input="formatTelefone">
                </div>
                <div class="field field-full">
                    <label>Status</label>
                    <select v-model="form.status">
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>
                </div>
            </div>

            <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
            <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>

            <div class="form-actions">
                <button class="btn-outline" @click="limparForm">Limpar</button>
                <button class="btn-primary" @click="cadastrar" :disabled="salvando">
                    {{ salvando ? 'Cadastrando...' : 'Cadastrar funcionário' }}
                </button>
            </div>
        </div>

        <div class="lista-section">
            <div class="lista-header">
                <h2 class="section-title">Funcionários cadastrados</h2>
                <span class="lista-count">{{ funcionarios.length }} registros</span>
            </div>

            <div v-if="loadingLista" class="loading">
                <i class="fa-solid fa-spinner fa-spin"></i> Carregando...
            </div>

            <template v-else>
                <div class="table-wrapper">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Telefone</th>
                                <th>Status</th>
                                <th>Cadastro</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="f in funcionarios" :key="f.idfuncionario">
                                <td>{{ f.nome }} {{ f.sobrenome }}</td>
                                <td>{{ f.email }}</td>
                                <td>{{ f.funcao || '—' }}</td>
                                <td>{{ f.telefone || '—' }}</td>
                                <td>
                                    <span :class="['badge', f.status === 'Ativo' ? 'badge-green' : 'badge-red']">
                                        {{ f.status || '—' }}
                                    </span>
                                </td>
                                <td>{{ f.role || 'docente' }}</td>
                            </tr>
                            <tr v-if="funcionarios.length === 0">
                                <td colspan="6" class="empty-row">Nenhum funcionário cadastrado.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="cards-mobile">
                    <div v-if="funcionarios.length === 0" class="card-empty">Nenhum funcionário cadastrado.</div>
                    <div v-for="f in funcionarios" :key="f.idfuncionario" class="func-card">
                        <div class="func-card-header">
                            <span class="func-card-nome">{{ f.nome }} {{ f.sobrenome }}</span>
                            <span :class="['badge', f.status === 'Ativo' ? 'badge-green' : 'badge-red']">{{ f.status ||
                                '—' }}</span>
                        </div>
                        <div class="func-card-row"><span class="func-card-label">Email</span><span>{{ f.email }}</span>
                        </div>
                        <div class="func-card-row"><span class="func-card-label">Função</span><span>{{ f.funcao || '—'
                                }}</span></div>
                        <div class="func-card-row"><span class="func-card-label">Telefone</span><span>{{ f.telefone ||
                                '—' }}</span></div>
                        <div class="func-card-row"><span class="func-card-label">Tipo</span><span>{{ f.role || 'docente'
                                }}</span></div>
                    </div>
                </div>
            </template>
        </div>

    </main>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { useSupabase } from "../composables/useSupabase.js";
import { ref, onMounted } from "vue";

export default {
    name: 'CadastroFuncionario',
    components: { NavBar, Sidebar },
    setup() {
        const { supabase } = useSupabase();
        const sidebarOpen = ref(false);
        const salvando = ref(false);
        const errorMsg = ref('');
        const successMsg = ref('');
        const showSenha = ref(false);
        const funcionarios = ref([]);
        const loadingLista = ref(true);

        const form = ref({
            nome: '', sobrenome: '', cpf: '', email: '', senha: '',
            funcao: '', data_nascimento: '', telefone: '', status: 'Ativo'
        });

        function formatCPF(e) {
            let v = e.target.value.replace(/\D/g, '');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            form.value.cpf = v;
        }

        function formatTelefone(e) {
            let v = e.target.value.replace(/\D/g, '');
            v = v.replace(/^(\d{2})(\d)/, '($1) $2');
            v = v.replace(/(\d{5})(\d)/, '$1-$2');
            form.value.telefone = v;
        }

        function limparForm() {
            form.value = { nome: '', sobrenome: '', cpf: '', email: '', senha: '', funcao: '', data_nascimento: '', telefone: '', status: 'Ativo' };
            errorMsg.value = '';
            successMsg.value = '';
        }

        async function carregarFuncionarios() {
            loadingLista.value = true;
            const { data } = await supabase
                .from('funcionario')
                .select('idfuncionario, nome, sobrenome, email, funcao, telefone, status')
                .order('nome');
            if (data) {
                const emails = data.map(f => f.email).filter(Boolean);
                let rolesMap = {};
                if (emails.length > 0) {
                    const { data: profs } = await supabase.from('profiles').select('email, role').in('email', emails);
                    if (profs) profs.forEach(p => { rolesMap[p.email] = p.role; });
                }
                funcionarios.value = data.map(f => ({ ...f, role: rolesMap[f.email] || 'docente' }));
            }
            loadingLista.value = false;
        }

        async function cadastrar() {
            errorMsg.value = '';
            successMsg.value = '';

            if (!form.value.nome || !form.value.sobrenome || !form.value.email || !form.value.senha) {
                errorMsg.value = 'Nome, sobrenome, email e senha são obrigatórios.';
                return;
            }

            if (form.value.senha.length < 6) {
                errorMsg.value = 'A senha deve ter pelo menos 6 caracteres.';
                return;
            }

            salvando.value = true;

            const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

            const res = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': serviceKey,
                    'Authorization': `Bearer ${serviceKey}`
                },
                body: JSON.stringify({
                    email: form.value.email,
                    password: form.value.senha,
                    email_confirm: true,
                    user_metadata: { full_name: `${form.value.nome} ${form.value.sobrenome}` }
                })
            });

            const authData = await res.json();

            if (!res.ok || authData.error) {
                errorMsg.value = authData.msg || authData.error || 'Erro ao criar conta.';
                salvando.value = false;
                return;
            }

            const userId = authData.id;

            const { error: funcError } = await supabase.from('funcionario').insert({
                nome: form.value.nome,
                sobrenome: form.value.sobrenome,
                cpf: form.value.cpf || null,
                email: form.value.email,
                senha: 'inutilizado',
                funcao: form.value.funcao || null,
                data_nascimento: form.value.data_nascimento || null,
                telefone: form.value.telefone || null,
                status: form.value.status,
            });

            if (userId) {
                await supabase.from('profiles').upsert({
                    id: userId,
                    email: form.value.email,
                    full_name: `${form.value.nome} ${form.value.sobrenome}`,
                    role: 'docente'
                });
            }

            salvando.value = false;

            if (funcError) {
                errorMsg.value = funcError.message || 'Erro ao salvar funcionário.';
                return;
            }

            successMsg.value = `Funcionário ${form.value.nome} cadastrado com sucesso!`;
            limparForm();
            await carregarFuncionarios();
        }

        onMounted(async () => {
            await carregarFuncionarios();
        });

        return {
            sidebarOpen, form, salvando, errorMsg, successMsg, showSenha,
            funcionarios, loadingLista,
            formatCPF, formatTelefone, limparForm, cadastrar
        };
    }
}
</script>

<style scoped>
.main {
    min-height: 100vh;
    background: linear-gradient(180deg, #f0f4ff 0%, #e8eeff 100%);
    padding: 2rem 4rem 4rem 4rem;
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

.form-card {
    background: #fff;
    border-radius: 20px;
    border: 1px solid #d0daf0;
    padding: 2rem;
    box-shadow: 0 4px 24px rgba(36, 60, 117, 0.08);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.field-full {
    grid-column: 1 / -1;
    max-width: 320px;
}

.field label {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.field input,
.field select {
    padding: 0.65rem 0.85rem;
    font-size: 0.95rem;
    border: 1.5px solid #d0daf0;
    border-radius: 8px;
    height: 2.8rem;
    box-sizing: border-box;
    font-family: 'Red Hat Display', sans-serif;
    color: #1a2b5e;
    transition: border-color 0.2s ease;
    background: #fff;
}

.field input:focus,
.field select:focus {
    outline: none;
    border-color: #243c75;
}

.input-wrapper {
    position: relative;
}

.input-wrapper input {
    width: 100%;
    padding-right: 2.5rem;
}

.eye-icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6b82b0;
    font-size: 1rem;
}

.eye-icon:hover {
    color: #243c75;
}

.form-actions {
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
    padding: 0.7rem 1.5rem;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(36, 60, 117, 0.2);
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

.success-msg {
    font-family: 'Red Hat Display', sans-serif;
    color: #15803d;
    font-size: 0.9rem;
    background: #dcfce7;
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    padding: 0.6rem 1rem;
    margin: 0;
}

.lista-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.lista-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.section-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 1.4rem;
    margin: 0;
}

.lista-count {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.82rem;
    color: #9aaac5;
    background: #e8eeff;
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-weight: 600;
}

.loading {
    font-family: 'Red Hat Display', sans-serif;
    color: #6b82b0;
    font-size: 1rem;
    text-align: center;
    padding: 2rem;
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
}

.badge-green {
    background: #dcfce7;
    color: #15803d;
}

.badge-red {
    background: #fee2e2;
    color: #b91c1c;
}

.cards-mobile {
    display: none;
}

.func-card {
    background: #fff;
    border: 1px solid #d0daf0;
    border-radius: 14px;
    padding: 1.1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    box-shadow: 0 2px 12px rgba(36, 60, 117, 0.06);
}

.func-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.func-card-nome {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 0.98rem;
}

.func-card-row {
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

.func-card-label {
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

@media (max-width: 768px) {
    .main {
        padding: 1.25rem 1.25rem 3rem 1.25rem;
    }

    .page-title {
        font-size: 2.5rem;
    }

    .field-full {
        max-width: 100%;
    }

    .table-wrapper {
        display: none;
    }

    .cards-mobile {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .form-actions {
        flex-direction: column;
    }

    .btn-primary,
    .btn-outline {
        width: 100%;
        justify-content: center;
    }
}
</style>
