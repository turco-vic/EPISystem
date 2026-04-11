<template>
    <NavBar @toggle="sidebarOpen = !sidebarOpen" />
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    <main class="main">
        <section class="welcome-section">
            <h3 class="script">Bem-vindo,</h3>
            <h1 class="username">{{ userName }}</h1>
            <p class="role-badge">{{ userEmail }}</p>
        </section>

        <section class="cards-grid">
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-helmet-safety"></i></div>
                <h2 class="card-number">0</h2>
                <p class="card-label">EPIs em estoque</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
                <h2 class="card-number">0</h2>
                <p class="card-label">Solicitações pendentes</p>
            </div>
            <div class="card">
                <div class="card-icon"><i class="fa-solid fa-circle-check"></i></div>
                <h2 class="card-number">0</h2>
                <p class="card-label">Empréstimos ativos</p>
            </div>
            <div class="card card-alert">
                <div class="card-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <h2 class="card-number">0</h2>
                <p class="card-label">Estoque crítico</p>
            </div>
        </section>

        <section class="actions-section">
            <h2 class="section-title">Ações rápidas</h2>
            <div class="actions-grid">
                <router-link to="/estoque" class="action-btn">
                    <i class="fa-solid fa-boxes-stacked"></i>
                    Gerenciar estoque
                </router-link>
                <router-link to="/estoque" class="action-btn">
                    <i class="fa-solid fa-plus"></i>
                    Adicionar EPI
                </router-link>
                <router-link to="/estoque" class="action-btn">
                    <i class="fa-solid fa-file-lines"></i>
                    Ver relatórios
                </router-link>
            </div>
        </section>
    </main>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Sidebar from "../components/Sidebar.vue";
import { useSupabase } from "../composables/useSupabase.js";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'Dashboard',
    components: { NavBar, Sidebar },
    setup() {
        const { session, supabase } = useSupabase();
        const router = useRouter();
        const sidebarOpen = ref(false);

        const userName = computed(() => {
            const meta = session.value?.user?.user_metadata;
            return meta?.full_name || meta?.name || 'Usuário';
        });

        const userEmail = computed(() => session.value?.user?.email || '');

        onMounted(() => {
            if (!session.value) {
                router.push('/login');
            }
        });

        return { userName, userEmail, sidebarOpen };
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

.welcome-section {
    display: flex;
    flex-direction: column;
    gap: 0;
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
    font-size: 4rem;
    font-weight: 900;
    margin: 0;
    line-height: 1;
}

.role-badge {
    font-family: 'Red Hat Display', sans-serif;
    color: #5a6a8a;
    font-size: 1rem;
    margin-top: 0.5rem;
}

.cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

.card {
    background-color: #243c75;
    color: #e2f9ff;
    border-radius: 12px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(78, 78, 78, 0.3);
}

.card-alert {
    background-color: #c0392b;
}

.card-icon {
    font-size: 1.8rem;
    opacity: 0.8;
}

.card-number {
    font-family: 'Anton', sans-serif;
    font-size: 3rem;
    margin: 0;
    line-height: 1;
}

.card-label {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 0.95rem;
    opacity: 0.85;
    margin: 0;
}

.actions-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.section-title {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 1.5rem;
    margin: 0;
}

.actions-grid {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    flex-wrap: wrap;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.5rem;
    background-color: #243c75;
    color: #e2f9ff;
    border-radius: 8px;
    text-decoration: none;
    font-family: 'Red Hat Display', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.action-btn:hover {
    background-color: #1a2d5a;
    transform: translateY(-2px);
}

@media (max-width: 1024px) {
    .cards-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .main {
        padding: 10vh 1.5rem 3rem 1.5rem;
        gap: 2rem;
    }

    .username {
        font-size: 2.5rem;
    }

    .cards-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .card {
        padding: 1.5rem;
    }

    .card-number {
        font-size: 2rem;
    }
}

@media (max-width: 480px) {
    .cards-grid {
        grid-template-columns: 1fr;
    }
}
</style>
