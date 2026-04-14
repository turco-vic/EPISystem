<template>
    <NavBar @toggle="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main">
        <section class="page-header">
            <h3 class="script">Meu</h3>
            <h1 class="page-title">PERFIL</h1>
        </section>

        <section class="profile-grid">
            <div class="profile-card">
                <div class="avatar">
                    <i class="fa-solid fa-user"></i>
                </div>
                <h2 class="profile-name">{{ fullName || 'Usuário' }}</h2>
                <span class="role-tag" :class="roleClass">{{ roleLabel }}</span>
                <p class="profile-email">{{ userEmail }}</p>
                <div class="profile-divider"></div>
                <div class="profile-meta">
                    <span><i class="fa-solid fa-calendar"></i> {{ createdAt }}</span>
                </div>
            </div>

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
                                <span class="info-label">Data de nascimento</span>
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
                                <span class="info-label">Data de nascimento</span>
                                <span class="info-value">{{ formatDate(funcionarioData.data_nascimento) }}</span>
                            </div>
                        </template>
                        <div class="info-row">
                            <span class="info-label">Conta criada em</span>
                            <span class="info-value">{{ createdAt }}</span>
                        </div>
                    </div>
                </div>

                <div class="epis-card" v-if="episEntregues.length > 0">
                    <h2 class="card-title"><i class="fa-solid fa-helmet-safety"></i> EPIs recebidos</h2>
                    <div class="epis-list">
                        <div class="epi-row" v-for="epi in episEntregues" :key="epi.nome">
                            <div class="epi-icon"><i class="fa-solid fa-shield-halved"></i></div>
                            <div class="epi-info">
                                <span class="epi-nome">{{ epi.nome }}</span>
                                <span class="epi-tipo">{{ epi.tipo }}</span>
                            </div>
                            <span class="epi-data">{{ formatDate(epi.data_entrega) }}</span>
                        </div>
                    </div>
                </div>

                <div class="epis-card" v-else-if="role === 'aluno' || role === 'docente'">
                    <h2 class="card-title"><i class="fa-solid fa-helmet-safety"></i> EPIs recebidos</h2>
                    <p class="empty-text">Nenhum EPI recebido ainda.</p>
                </div>
            </div>
        </section>
    </main>
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

        const roleLabel = computed(() => {
            const map = { aluno: 'Aluno', docente: 'Docente', admin: 'Administrador' };
            return map[role.value] || role.value;
        });

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

        onMounted(async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) { router.push('/login'); return; }

            const user = data.session.user;
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
                            nome: e.epis?.nome,
                            tipo: e.epis?.tipo,
                            data_entrega: e.data_entrega
                        }));
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
                        .select('data_entrega, epis(nome, tipo)')
                        .eq('funcionario_id', func.idfuncionario);

                    if (entregas) {
                        episEntregues.value = entregas.map(e => ({
                            nome: e.epis?.nome,
                            tipo: e.epis?.tipo,
                            data_entrega: e.data_entrega
                        }));
                    }
                }
            }
        });

        return {
            sidebarOpen, fullName, nome, sobrenome, userEmail, role,
            roleLabel, roleClass, createdAt, alunoData, funcionarioData,
            episEntregues, formatDate
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
    gap: 3rem;
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

/* Layout */
.profile-grid {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 2rem;
    align-items: start;
}

/* Card lateral */
.profile-card {
    background-color: #243c75;
    border-radius: 16px;
    padding: 2.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    color: #e2f9ff;
    position: sticky;
    top: 12vh;
    box-shadow: 0 8px 32px rgba(36, 60, 117, 0.35);
}

.avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background-color: rgba(226, 249, 255, 0.15);
    border: 3px solid rgba(226, 249, 255, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    margin-bottom: 0.5rem;
}

.profile-name {
    font-family: 'Anton', sans-serif;
    font-size: 1.25rem;
    margin: 0;
    text-align: center;
    letter-spacing: 0.02em;
}

.profile-email {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.8rem;
    color: rgba(226, 249, 255, 0.6);
    margin: 0;
    text-align: center;
    word-break: break-all;
}

.profile-divider {
    width: 100%;
    height: 1px;
    background-color: rgba(226, 249, 255, 0.15);
    margin: 0.25rem 0;
}

.profile-meta {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.82rem;
    color: rgba(226, 249, 255, 0.5);
    text-align: center;
}

.profile-meta i {
    margin-right: 0.4rem;
}

.role-tag {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.3rem 1rem;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.tag-aluno {
    background-color: #16a34a;
    color: #fff;
}

.tag-docente {
    background-color: #d97706;
    color: #fff;
}

.tag-admin {
    background-color: #dc2626;
    color: #fff;
}

/* Coluna direita */
.right-col {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.info-card,
.epis-card {
    background-color: #fff;
    border-radius: 16px;
    padding: 2rem 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border: 1px solid #d0daf0;
    box-shadow: 0 4px 24px rgba(36, 60, 117, 0.08);
}

.card-title {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 1rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e8edf8;
}

.card-title i {
    color: #6b82b0;
}

/* Grid de info 2 colunas */
.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 3rem;
}

.info-row {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.9rem 0;
    border-bottom: 1px solid #edf0f8;
}

.info-row:last-child {
    border-bottom: none;
}

.info-label {
    font-family: 'Anton', sans-serif;
    color: #9aaac5;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.info-value {
    font-family: 'Red Hat Display', sans-serif;
    color: #1a2b5e;
    font-size: 1rem;
    font-weight: 600;
}

/* EPIs */
.epis-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.epi-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background-color: #f4f7ff;
    border: 1px solid #d0daf0;
    border-radius: 10px;
    transition: background-color 0.2s ease;
}

.epi-row:hover {
    background-color: #e8eeff;
}

.epi-icon {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #243c75;
    color: #e2f9ff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1rem;
}

.epi-info {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.epi-nome {
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 700;
    color: #1a2b5e;
    font-size: 0.95rem;
}

.epi-tipo {
    font-family: 'Red Hat Display', sans-serif;
    color: #6b82b0;
    font-size: 0.8rem;
}

.epi-data {
    font-family: 'Anton', sans-serif;
    color: #9aaac5;
    font-size: 0.82rem;
    background: #e8eeff;
    padding: 0.2rem 0.7rem;
    border-radius: 6px;
    flex-shrink: 0;
}

.empty-text {
    font-family: 'Red Hat Display', sans-serif;
    color: #9aaac5;
    font-size: 0.95rem;
    margin: 0;
}

@media (max-width: 1024px) {
    .profile-grid {
        grid-template-columns: 1fr;
    }

    .profile-card {
        position: static;
        flex-direction: row;
        justify-content: flex-start;
        gap: 1.5rem;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .main {
        padding: 10vh 1.5rem 3rem 1.5rem;
    }

    .page-title {
        font-size: 2.5rem;
    }

    .profile-card {
        flex-direction: column;
        align-items: center;
    }

    .info-card,
    .epis-card {
        padding: 1.5rem;
    }
}
</style>
