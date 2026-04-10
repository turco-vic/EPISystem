<template>
    <Header title="Cadastro" />
    <main class="main">
        <aside class="left-side">
            <h3 class="script-title">Criar conta</h3>
            <h1 class="welcome-title">BEM</h1>
            <h1 class="welcome-title">VINDO</h1>
            <p class="welcome-description">Crie sua conta para começar a gerenciar equipamentos de proteção individual
                com segurança e rastreabilidade.</p>
        </aside>
        <aside class="right-side">
            <section class="top-content">
                <h1 class="form-title">Nova conta.</h1>
                <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
                <p v-if="successMsg" class="success-msg">{{ successMsg }}</p>
                <div class="form">
                    <div class="field">
                        <label for="nome">Nome completo</label>
                        <input v-model="nome" type="text" id="nome" placeholder="Digite seu nome" required>
                    </div>
                    <div class="field">
                        <label for="email">Email</label>
                        <input v-model="email" type="email" id="email" placeholder="Digite seu email" required>
                    </div>
                    <div class="field">
                        <label for="password">Senha</label>
                        <div class="input-wrapper">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password"
                                placeholder="Digite sua senha" required>
                            <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="eye-icon"
                                @click="showPassword = !showPassword"></i>
                        </div>
                    </div>
                    <div class="field">
                        <label for="confirm">Confirmar senha</label>
                        <div class="input-wrapper">
                            <input v-model="confirm" :type="showConfirm ? 'text' : 'password'" id="confirm"
                                placeholder="Confirme sua senha" required>
                            <i :class="showConfirm ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="eye-icon"
                                @click="showConfirm = !showConfirm"></i>
                        </div>
                    </div>
                    <button @click="handleSignup" :disabled="loading">
                        {{ loading ? 'Criando conta...' : 'Criar conta' }}
                    </button>
                </div>
            </section>
            <section class="baseboard">
                <Line backgroundColor="#243c75" height="2px" />
                <section class="baseboard-content">
                    <p class="login-text">Já tem uma conta?</p>
                    <router-link to="/login" class="login-link">Entrar</router-link>
                </section>
            </section>
        </aside>
    </main>
    <Line />
    <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Line from "../components/Line.vue";
import { useSupabase } from "../composables/useSupabase.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'Cadastro',
    components: { Header, Footer, Line },
    setup() {
        const { supabase } = useSupabase();
        const router = useRouter();

        const nome = ref('');
        const email = ref('');
        const password = ref('');
        const confirm = ref('');
        const loading = ref(false);
        const errorMsg = ref('');
        const successMsg = ref('');
        const showPassword = ref(false);
        const showConfirm = ref(false);

        async function handleSignup() {
            errorMsg.value = '';
            successMsg.value = '';

            if (!nome.value || !email.value || !password.value || !confirm.value) {
                errorMsg.value = 'Preencha todos os campos.';
                return;
            }

            if (password.value !== confirm.value) {
                errorMsg.value = 'As senhas não coincidem.';
                return;
            }

            if (password.value.length < 6) {
                errorMsg.value = 'A senha deve ter pelo menos 6 caracteres.';
                return;
            }

            loading.value = true;

            const { error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
                options: {
                    data: { full_name: nome.value }
                }
            });

            loading.value = false;

            if (error) {
                errorMsg.value = error.message || 'Erro ao criar conta.';
            } else {
                successMsg.value = 'Conta criada! Verifique seu email para confirmar.';
                setTimeout(() => router.push('/login'), 3000);
            }
        }

        return { nome, email, password, confirm, loading, errorMsg, successMsg, handleSignup, showPassword, showConfirm };
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #243c75;
    min-height: 100vh;
    padding-top: 10vh;
    box-sizing: border-box;
}

.left-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
    padding: 2rem 5rem 2rem 5rem;
}

.script-title {
    font-family: 'Pinyon Script', cursive;
    color: #e2f9ff;
    font-size: 2rem;
    margin: 0;
    line-height: 1;
}

.welcome-title {
    font-family: 'Archivo Black', sans-serif;
    color: #e2f9ff;
    font-size: 7rem;
    font-weight: 900;
    margin: -0.35rem 0 0 0;
    line-height: 0.95;
}

.welcome-description {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 1.2rem;
    color: #e2f9ff;
    margin-top: 1rem;
    text-align: justify;
}

.right-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 40%;
    min-height: 85vh;
    background-color: #e2f9ff;
    border-radius: 15px;
    gap: 1rem;
    padding: 2rem 6rem 2rem 6rem;
    margin: 0 5rem 0 0;
}

.top-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.form-title {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 2rem;
    margin: 0;
}

.error-msg {
    font-family: 'Red Hat Display', sans-serif;
    color: #c0392b;
    font-size: 0.9rem;
    background-color: #fdecea;
    border: 1px solid #c0392b;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
}

.success-msg {
    font-family: 'Red Hat Display', sans-serif;
    color: #1a7a3e;
    font-size: 0.9rem;
    background-color: #e8f5e9;
    border: 1px solid #1a7a3e;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
}

.form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.2rem;
}

.input-wrapper {
    position: relative;
}

.input-wrapper input {
    width: 100%;
    box-sizing: border-box;
    padding-right: 2.5rem;
}

.eye-icon {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #243c75;
    font-size: 1rem;
}

.eye-icon:hover {
    color: #878787;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}

.field label {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 1rem;
}

.field input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #243c75;
    border-radius: 4px;
    height: 3rem;
}

.form button {
    height: 3rem;
    padding: 0.75rem;
    font-size: 1.25rem;
    font-weight: bold;
    background-color: #243c75;
    color: #e2f9ff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
}

.form button:hover {
    background-color: #878787;
}

.form button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.baseboard {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
}

.baseboard-content {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
}

.login-text {
    font-family: 'Red Hat Display', sans-serif;
    color: #243c75;
    font-size: 1rem;
}

.login-link {
    font-family: 'Red Hat Display', sans-serif;
    color: #243c75;
    font-size: 1rem;
    text-decoration: none;
}

.login-link:hover {
    text-decoration: underline;
}

@media (max-width: 1024px) {
    .left-side {
        width: 40%;
        padding: 2rem;
    }

    .right-side {
        width: 50%;
        margin: 0 2rem 0 0;
        padding: 2rem 3rem;
    }

    .welcome-title {
        font-size: 5rem;
    }
}

@media (max-width: 768px) {
    .main {
        flex-direction: column;
        justify-content: center;
        padding: 5rem 1rem 2rem 1rem;
        gap: 2rem;
    }

    .left-side {
        width: 100%;
        padding: 1rem;
        align-items: center;
        text-align: center;
    }

    .welcome-title {
        font-size: 4rem;
        margin: 0;
    }

    .welcome-description {
        text-align: center;
    }

    .right-side {
        width: 100%;
        margin: 0;
        padding: 2rem 1.5rem;
        min-height: auto;
    }

    .form-title {
        font-size: 1.5rem;
    }
}
</style>
