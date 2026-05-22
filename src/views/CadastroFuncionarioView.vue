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
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
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

    </main>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { useSupabase } from "../composables/useSupabase.js";
import { ref } from "vue";

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

        const form = ref({
            nome: '',
            sobrenome: '',
            cpf: '',
            email: '',
            senha: '',
            funcao: '',
            data_nascimento: '',
            telefone: '',
            status: 'ativo'
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
            form.value = { nome: '', sobrenome: '', cpf: '', email: '', senha: '', funcao: '', data_nascimento: '', telefone: '', status: 'ativo' };
            errorMsg.value = '';
            successMsg.value = '';
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

            const { data, error: authError } = await supabase.auth.signUp({
                email: form.value.email,
                password: form.value.senha,
                options: {
                    data: { full_name: `${form.value.nome} ${form.value.sobrenome}` }
                }
            });

            if (authError) {
                errorMsg.value = authError.message || 'Erro ao criar conta.';
                salvando.value = false;
                return;
            }

            const userId = data.user?.id;

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
        }

        return {
            sidebarOpen, form, salvando, errorMsg, successMsg, showSenha,
            formatCPF, formatTelefone, limparForm, cadastrar
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

@media (max-width: 768px) {
    .main {
        padding: 10vh 1.25rem 3rem 1.25rem;
    }

    .page-title {
        font-size: 2.5rem;
    }

    .field-full {
        max-width: 100%;
    }
}
</style>
