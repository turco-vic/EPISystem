<template>
    <NavBar @toggle="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main">
        <section class="page-header">
            <h3 class="script">Meu</h3>
            <h1 class="page-title">PERFIL</h1>
        </section>

        <section class="profile-grid">
            <aside class="profile-card">
                <div class="avatar-wrap">
                    <div class="avatar"><i class="fa-solid fa-user"></i></div>
                    <span class="avatar-dot" :class="`dot-${role}`"></span>
                </div>
                <h2 class="profile-name">{{ fullName || 'Usuário' }}</h2>
                <span class="role-tag" :class="roleClass">{{ roleLabel }}</span>
                <p class="profile-email">{{ userEmail }}</p>
                <div class="profile-stats">
                    <div class="stat-block">
                        <span class="stat-num">{{ episEntregues.length }}</span>
                        <span class="stat-lbl">EPIs recebidos</span>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-block">
                        <span class="stat-num">{{ emprestimosAtivos }}</span>
                        <span class="stat-lbl">Ativos</span>
                    </div>
                </div>
                <div class="profile-meta">
                    <i class="fa-solid fa-calendar"></i>
                    <span>Desde {{ createdAt }}</span>
                </div>
                <div class="profile-actions">
                    <button class="btn-edit" @click="abrirModalEditar">
                        <i class="fa-solid fa-pen"></i> Editar perfil
                    </button>
                    <button class="btn-sair" @click="sair">
                        <i class="fa-solid fa-right-from-bracket"></i> Sair
                    </button>
                </div>
            </aside>

            <div class="right-col">
                <div class="info-card">
                    <h2 class="card-title"><i class="fa-solid fa-id-card"></i> Informações pessoais</h2>
                    <div class="info-grid">
                        <div class="info-row">
                            <span class="info-label">Nome</span>
                            <span class="info-value">{{ nome || '—' }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Sobrenome</span>
                            <span class="info-value">{{ sobrenome || '—' }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Email</span>
                            <span class="info-value">{{ userEmail || '—' }}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Perfil</span>
                            <span class="info-value">{{ roleLabel }}</span>
                        </div>
                        <template v-if="alunoData">
                            <div class="info-row">
                                <span class="info-label">CPF</span>
                                <span class="info-value">{{ alunoData.cpf || '—' }}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Telefone</span>
                                <span class="info-value">{{ alunoData.telefone || '—' }}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Nascimento</span>
                                <span class="info-value">{{ formatDate(alunoData.data_nascimento) }}</span>
                            </div>
                        </template>
                        <template v-if="funcionarioData">
                            <div class="info-row">
                                <span class="info-label">CPF</span>
                                <span class="info-value">{{ funcionarioData.cpf || '—' }}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Telefone</span>
                                <span class="info-value">{{ funcionarioData.telefone || '—' }}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Função</span>
                                <span class="info-value">{{ funcionarioData.funcao || '—' }}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Status</span>
                                <span class="info-value">{{ funcionarioData.status || '—' }}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Nascimento</span>
                                <span class="info-value">{{ formatDate(funcionarioData.data_nascimento) }}</span>
                            </div>
                        </template>
                        <div class="info-row">
                            <span class="info-label">Conta criada</span>
                            <span class="info-value">{{ createdAt }}</span>
                        </div>
                    </div>
                </div>

                <div class="epis-card">
                    <h2 class="card-title"><i class="fa-solid fa-helmet-safety"></i> EPIs recebidos</h2>
                    <div class="epis-list" v-if="episEntregues.length > 0">
                        <div class="epi-row" v-for="(epi, i) in episEntregues" :key="i">
                            <div class="epi-icon"><i class="fa-solid fa-shield-halved"></i></div>
                            <div class="epi-info">
                                <span class="epi-nome">{{ epi.nome }}</span>
                                <span class="epi-tipo">{{ epi.tipo }}</span>
                            </div>
                            <span class="epi-data">{{ formatDate(epi.data_entrega) }}</span>
                        </div>
                    </div>
                    <div class="empty-state" v-else>
                        <i class="fa-solid fa-box-open"></i>
                        <p>Nenhum EPI recebido ainda</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <div class="modal-overlay" v-if="modalEditar" @click.self="modalEditar = false">
        <div class="modal">
            <h2 class="modal-title"><i class="fa-solid fa-pen"></i> Editar perfil</h2>
            <div class="modal-form">
                <div class="field">
                    <label>Nome</label>
                    <input v-model="formEditar.nome" type="text" placeholder="Seu nome">
                </div>
                <div class="field">
                    <label>Sobrenome</label>
                    <input v-model="formEditar.sobrenome" type="text" placeholder="Seu sobrenome">
                </div>
                <div class="field">
                    <label>Telefone</label>
                    <input v-model="formEditar.telefone" type="text" placeholder="(00) 00000-0000">
                </div>
            </div>
            <p v-if="editarError" class="error-msg">{{ editarError }}</p>
            <p v-if="editarSucesso" class="success-msg">Dados atualizados com sucesso!</p>
            <div class="modal-actions">
                <button class="btn-outline" @click="modalEditar = false">Cancelar</button>
                <button class="btn-primary" @click="salvarEdicao" :disabled="salvando">
                    {{ salvando ? 'Salvando...' : 'Salvar' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import { useSupabase } from "../composables/useSupabase.js";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'Perfil',
    components: { NavBar, Sidebar },
    setup() {
        const { supabase } = useSupabase();
        const router = useRouter();
        const sidebarOpen = ref(false);

        const fullName = ref('');
        const nome = ref('');
        const sobrenome = ref('');
        const userEmail = ref('');
        const role = ref('');
        const createdAt = ref('');
        const alunoData = ref(null);
        const funcionarioData = ref(null);
        const episEntregues = ref([]);
        const emprestimosAtivos = ref(0);
        const userId = ref('');

        const modalEditar = ref(false);
        const formEditar = ref({ nome: '', sobrenome: '', telefone: '' });
        const editarError = ref('');
        const editarSucesso = ref(false);
        const salvando = ref(false);

        const roleLabel = computed(() => ({ aluno: 'Aluno', docente: 'Docente', admin: 'Administrador' })[role.value] || role.value);
        const roleClass = computed(() => ({
            'tag-aluno': role.value === 'aluno',
            'tag-docente': role.value === 'docente',
            'tag-admin': role.value === 'admin',
        }));

        function formatDate(d) {
            if (!d) return '—';
            const [y, m, day] = d.split('-');
            return `${day}/${m}/${y}`;
        }

        function abrirModalEditar() {
            formEditar.value = {
                nome: nome.value,
                sobrenome: sobrenome.value,
                telefone: alunoData.value?.telefone || funcionarioData.value?.telefone || ''
            };
            editarError.value = '';
            editarSucesso.value = false;
            modalEditar.value = true;
        }

        async function salvarEdicao() {
            salvando.value = true;
            editarError.value = '';
            editarSucesso.value = false;

            const novoNomeCompleto = `${formEditar.value.nome} ${formEditar.value.sobrenome}`.trim();

            const { error: profileError } = await supabase
                .from('profiles')
                .update({ full_name: novoNomeCompleto })
                .eq('id', userId.value);

            if (profileError) { editarError.value = 'Erro ao salvar.'; salvando.value = false; return; }

            if (role.value === 'aluno' && alunoData.value) {
                await supabase.from('aluno')
                    .update({ nome: formEditar.value.nome, sobrenome: formEditar.value.sobrenome, telefone: formEditar.value.telefone })
                    .eq('idaluno', alunoData.value.idaluno);
            }

            if ((role.value === 'docente' || role.value === 'admin') && funcionarioData.value) {
                await supabase.from('funcionario')
                    .update({ nome: formEditar.value.nome, sobrenome: formEditar.value.sobrenome, telefone: formEditar.value.telefone })
                    .eq('idfuncionario', funcionarioData.value.idfuncionario);
            }

            fullName.value = novoNomeCompleto;
            nome.value = formEditar.value.nome;
            sobrenome.value = formEditar.value.sobrenome;
            if (alunoData.value) alunoData.value = { ...alunoData.value, telefone: formEditar.value.telefone };
            if (funcionarioData.value) funcionarioData.value = { ...funcionarioData.value, telefone: formEditar.value.telefone };

            salvando.value = false;
            editarSucesso.value = true;
            setTimeout(() => { modalEditar.value = false; editarSucesso.value = false; }, 1200);
        }

        async function sair() {
            await supabase.auth.signOut();
            router.push('/login');
        }

        onMounted(async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) { router.push('/login'); return; }

            const user = data.session.user;
            userId.value = user.id;
            userEmail.value = user.email;
            createdAt.value = new Date(user.created_at).toLocaleDateString('pt-BR');

            const { data: profile } = await supabase
                .from('profiles')
                .select('full_name, role')
                .eq('id', user.id)
                .single();

            if (profile) {
                fullName.value = profile.full_name || '';
                role.value = profile.role || '';
                const parts = (profile.full_name || '').split(' ');
                nome.value = parts[0] || '';
                sobrenome.value = parts.slice(1).join(' ') || '';
            }

            if (role.value === 'aluno') {
                const { data: aluno } = await supabase
                    .from('aluno')
                    .select('cpf, telefone, data_nascimento, idaluno')
                    .eq('auth_id', user.id)
                    .single();

                if (aluno) {
                    alunoData.value = aluno;
                    const { data: entregas } = await supabase
                        .from('aluno_has_epis')
                        .select('data_entrega, epis(nome, tipo)')
                        .eq('aluno_id', aluno.idaluno);

                    if (entregas) {
                        episEntregues.value = entregas.map(e => ({
                            nome: e.epis?.nome, tipo: e.epis?.tipo, data_entrega: e.data_entrega
                        }));
                        emprestimosAtivos.value = entregas.length;
                    }
                }
            }

            if (role.value === 'docente' || role.value === 'admin') {
                const { data: func } = await supabase
                    .from('funcionario')
                    .select('cpf, telefone, data_nascimento, funcao, status, idfuncionario')
                    .eq('email', user.email)
                    .single();

                if (func) {
                    funcionarioData.value = func;
                    const { data: entregas } = await supabase
                        .from('funcionario_has_epis')
                        .select('data_entrega, data_devolucao, epis(nome, tipo)')
                        .eq('funcionario_id', func.idfuncionario);

                    if (entregas) {
                        episEntregues.value = entregas.map(e => ({
                            nome: e.epis?.nome, tipo: e.epis?.tipo, data_entrega: e.data_entrega
                        }));
                        emprestimosAtivos.value = entregas.filter(e => !e.data_devolucao).length;
                    }
                }
            }
        });

        return {
            sidebarOpen, fullName, nome, sobrenome, userEmail, role,
            roleLabel, roleClass, createdAt, alunoData, funcionarioData,
            episEntregues, emprestimosAtivos, formatDate,
            modalEditar, formEditar, editarError, editarSucesso, salvando,
            abrirModalEditar, salvarEdicao, sair
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

.script { font-family: 'Pinyon Script', cursive; color: #243c75; font-size: 2rem; margin: 0; line-height: 1; }
.page-title { font-family: 'Archivo Black', sans-serif; color: #243c75; font-size: 3.5rem; font-weight: 900; margin: 0; line-height: 1; }

.profile-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
    align-items: start;
}

.profile-card {
    background: linear-gradient(160deg, #243c75 0%, #1a2d5a 100%);
    border-radius: 20px;
    padding: 2.5rem 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
    color: #ebfbff;
    box-shadow: 0 16px 48px rgba(36, 60, 117, 0.3);
    position: relative;
    overflow: hidden;
}

.profile-card::before {
    content: '';
    position: absolute;
    top: -50%; right: -50%;
    width: 200%; height: 200%;
    background: radial-gradient(circle, rgba(226, 249, 255, 0.08) 0%, transparent 40%);
    pointer-events: none;
}

.avatar-wrap { position: relative; margin-bottom: 0.5rem; }

.avatar {
    width: 110px; height: 110px;
    border-radius: 50%;
    background: rgba(226, 249, 255, 0.15);
    border: 3px solid rgba(226, 249, 255, 0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 3.2rem;
}

.avatar-dot {
    position: absolute; bottom: 6px; right: 6px;
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 3px solid #1a2d5a;
}

.dot-aluno { background: #22c55e; }
.dot-docente { background: #f59e0b; }
.dot-admin { background: #ef4444; }

.profile-name { font-family: 'Archivo Black', sans-serif; font-size: 1.3rem; margin: 0; text-align: center; letter-spacing: 0.02em; }
.profile-email { font-family: 'Red Hat Display', sans-serif; font-size: 0.82rem; color: rgba(226, 249, 255, 0.7); margin: 0; text-align: center; word-break: break-all; }

.role-tag { font-family: 'Red Hat Display', sans-serif; font-size: 0.72rem; font-weight: 700; padding: 0.35rem 1rem; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.1em; }
.tag-aluno { background: #22c55e; color: #fff; }
.tag-docente { background: #f59e0b; color: #fff; }
.tag-admin { background: #ef4444; color: #fff; }

.profile-stats {
    display: flex; align-items: center; justify-content: center; gap: 1rem;
    width: 100%;
    background: rgba(226, 249, 255, 0.08);
    border: 1px solid rgba(226, 249, 255, 0.12);
    border-radius: 12px;
    padding: 1rem 0.5rem;
    margin: 0.5rem 0;
}

.stat-block { display: flex; flex-direction: column; align-items: center; gap: 0.15rem; flex: 1; }
.stat-num { font-family: 'Archivo Black', sans-serif; font-size: 1.6rem; color: #ebfbff; line-height: 1; }
.stat-lbl { font-family: 'Red Hat Display', sans-serif; font-size: 0.7rem; color: rgba(226, 249, 255, 0.65); text-transform: uppercase; letter-spacing: 0.08em; }
.stat-divider { width: 1px; height: 36px; background: rgba(226, 249, 255, 0.2); }

.profile-meta { font-family: 'Red Hat Display', sans-serif; font-size: 0.82rem; color: rgba(226, 249, 255, 0.6); display: flex; align-items: center; gap: 0.5rem; }

.profile-actions { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; margin-top: 0.5rem; }

.btn-edit {
    width: 100%; padding: 0.7rem;
    background: rgba(226, 249, 255, 0.15);
    border: 1.5px solid rgba(226, 249, 255, 0.3);
    color: #ebfbff; border-radius: 10px;
    font-family: 'Red Hat Display', sans-serif; font-size: 0.92rem; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    transition: all 0.2s ease;
}
.btn-edit:hover { background: rgba(226, 249, 255, 0.25); border-color: rgba(226, 249, 255, 0.5); }

.btn-sair {
    width: 100%; padding: 0.7rem;
    background: rgba(239, 68, 68, 0.15);
    border: 1.5px solid rgba(239, 68, 68, 0.4);
    color: #fca5a5; border-radius: 10px;
    font-family: 'Red Hat Display', sans-serif; font-size: 0.92rem; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    transition: all 0.2s ease;
}
.btn-sair:hover { background: rgba(239, 68, 68, 0.3); border-color: rgba(239, 68, 68, 0.6); }

.right-col { display: flex; flex-direction: column; gap: 1.5rem; }

.info-card, .epis-card {
    background: #fff; border-radius: 20px; padding: 2rem 2.25rem;
    display: flex; flex-direction: column; gap: 1.5rem;
    border: 1px solid #d0daf0;
    box-shadow: 0 8px 32px rgba(36, 60, 117, 0.08);
}

.card-title {
    font-family: 'Archivo Black', sans-serif; color: #243c75; font-size: 1.05rem; margin: 0;
    display: flex; align-items: center; gap: 0.6rem;
    text-transform: uppercase; letter-spacing: 0.06em;
    padding-bottom: 1rem; border-bottom: 2px solid #e8edf8;
}
.card-title i { color: #6b82b0; }

.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 3rem; }

.info-row {
    display: flex; flex-direction: column; gap: 0.3rem;
    padding: 0.9rem 0; border-bottom: 1px solid #edf0f8;
}

.info-label { font-family: 'Anton', sans-serif; color: #9aaac5; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; }
.info-value { font-family: 'Red Hat Display', sans-serif; color: #1a2b5e; font-size: 1rem; font-weight: 600; }

.epis-list { display: flex; flex-direction: column; gap: 0.75rem; }

.epi-row {
    display: flex; align-items: center; gap: 1rem;
    padding: 1rem 1.25rem;
    background: #f8f9ff; border: 1px solid #e8edf8; border-radius: 12px;
    transition: all 0.2s ease;
}
.epi-row:hover { background: #e8eeff; border-color: #d0daf0; transform: translateX(4px); }

.epi-icon {
    width: 2.75rem; height: 2.75rem;
    background: linear-gradient(135deg, #243c75 0%, #3a5ba8 100%);
    color: #ebfbff; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 1.1rem;
}

.epi-info { display: flex; flex-direction: column; flex: 1; }
.epi-nome { font-family: 'Red Hat Display', sans-serif; font-weight: 700; color: #1a2b5e; font-size: 0.98rem; }
.epi-tipo { font-family: 'Red Hat Display', sans-serif; color: #6b82b0; font-size: 0.82rem; }

.epi-data {
    font-family: 'Red Hat Display', sans-serif; color: #243c75; font-weight: 700; font-size: 0.82rem;
    background: #e8eeff; padding: 0.35rem 0.8rem; border-radius: 8px; flex-shrink: 0;
}

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 2.5rem 1rem; color: #9aaac5; }
.empty-state i { font-size: 2.5rem; opacity: 0.4; }
.empty-state p { font-family: 'Red Hat Display', sans-serif; margin: 0; font-size: 0.95rem; }

.modal-overlay {
    position: fixed; inset: 0;
    background: rgba(10, 20, 50, 0.55);
    backdrop-filter: blur(4px);
    z-index: 2000;
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
}

.modal {
    background: #fff; border-radius: 18px; padding: 2rem;
    width: 100%; max-width: 440px;
    display: flex; flex-direction: column; gap: 1.5rem;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
}

.modal-title { font-family: 'Archivo Black', sans-serif; color: #243c75; font-size: 1.2rem; margin: 0; display: flex; align-items: center; gap: 0.5rem; }
.modal-form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.35rem; }
.field label { font-family: 'Anton', sans-serif; color: #243c75; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; }
.field input { padding: 0.65rem 0.85rem; font-size: 0.95rem; border: 1.5px solid #d0daf0; border-radius: 8px; height: 2.8rem; box-sizing: border-box; font-family: 'Red Hat Display', sans-serif; color: #1a2b5e; transition: border-color 0.2s ease; }
.field input:focus { outline: none; border-color: #243c75; }
.modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; }

.btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; background: #243c75; color: #ebfbff; border: none; border-radius: 10px; padding: 0.7rem 1.3rem; font-family: 'Red Hat Display', sans-serif; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; }
.btn-primary:hover { background: #1a2d5a; }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-outline { background: transparent; border: 2px solid #243c75; color: #243c75; border-radius: 10px; padding: 0.6rem 1.2rem; font-family: 'Red Hat Display', sans-serif; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease; }
.btn-outline:hover { background: #243c75; color: #ebfbff; }

.error-msg { font-family: 'Red Hat Display', sans-serif; color: #b91c1c; font-size: 0.9rem; background: #fee2e2; border: 1px solid #fecaca; border-radius: 8px; padding: 0.6rem 1rem; margin: 0; }
.success-msg { font-family: 'Red Hat Display', sans-serif; color: #15803d; font-size: 0.9rem; background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.6rem 1rem; margin: 0; }

@media (max-width: 1024px) {
    .profile-grid { grid-template-columns: 1fr; }
    .info-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
    .main { padding: 1.25rem 1.25rem 3rem 1.25rem; }
    .page-title { font-size: 2.5rem; }
    .info-card, .epis-card { padding: 1.25rem; }
    .epi-row { flex-wrap: wrap; }
    .epi-data { width: 100%; text-align: right; }
}
</style>
