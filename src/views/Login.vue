<template>
    <Header title="Login" />
    <main class="main" ref="mainRef">
        <aside class="left-side">
            <h3 class="login">Log in</h3>
            <h1 class="welcome-title">BEM</h1>
            <h1 class="welcome-title">VINDO</h1>
            <p class="welcome-description">Entre para gerenciar seus equipamentos de proteção individual e garantir a
                conformidade no ambiente de trabalho.</p>
        </aside>
        <aside class="right-side">
            <section class="top-content">
                <h1 class="login-title">Sua conta.</h1>
                <div class="msg-area">
                    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
                </div>
                <div class="login-form">
                    <div class="email-input">
                        <label for="email">Email</label>
                        <input v-model="email" type="email" id="email" name="email" placeholder="Digite seu email"
                            required>
                    </div>
                    <div class="password-input">
                        <label for="password">Senha</label>
                        <div class="input-wrapper">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password"
                                name="password" placeholder="Digite sua senha" required>
                            <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="eye-icon"
                                @click="showPassword = !showPassword"></i>
                        </div>
                    </div>
                    <button @click="handleLogin" :disabled="loading">
                        {{ loading ? 'Entrando...' : 'Entrar' }}
                    </button>
                </div>
            </section>
            <section class="baseboard">
                <Line backgroundColor="#ebfbff" height="2px" />
                <section class="baseboard-content">
                    <p class="signup-text">Não tem uma conta?</p>
                    <router-link to="/cadastro" class="signup-link">Cadastre-se</router-link>
                </section>
            </section>
        </aside>
    </main>
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
    name: 'Login',
    components: { Header, Footer, Line },
    setup() {
        const { supabase } = useSupabase();
        const router = useRouter();

        const email = ref('');
        const password = ref('');
        const loading = ref(false);
        const errorMsg = ref('');
        const showPassword = ref(false);

        async function handleLogin() {
            loading.value = true;
            errorMsg.value = '';

            const { error } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value,
            });

            loading.value = false;

            if (error) {
                errorMsg.value = 'Email ou senha inválidos.';
            } else {
                router.push('/dashboard');
            }
        }

        return { email, password, loading, errorMsg, handleLogin, showPassword };
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ebfbff;
    background-size: cover;
    background-position: center;
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

.login {
    font-family: 'Pinyon Script', cursive;
    color: #243c75;
    font-size: 2rem;
    margin: 0;
    line-height: 1;
}

.welcome-title {
    font-family: 'Archivo Black', sans-serif;
    color: #243c75;
    font-size: 7rem;
    font-weight: 900;
    margin: -0.35rem 0 0 0;
    line-height: 0.95;
}

.welcome-description {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 1.2rem;
    color: #243c75;
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
    background-color: #243c75;
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

.login-title {
    font-family: 'Anton', sans-serif;
    color: #ebfbff;
    font-size: 2rem;
    margin: 0;
}

.msg-area {
    min-height: 2.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

.login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
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
    color: #ebfbff;
    font-size: 1rem;
}

.eye-icon:hover {
    color: #d3d3d3;
}

.email-input,
.password-input {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}

.login-form label {
    font-family: 'Anton', sans-serif;
    color: #ebfbff;
    font-size: 1rem;
}

.login-form input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ebfbff;
    border-radius: 4px;
    height: 3rem;
    background-color: #243c75;
    color: #ebfbff;
}

.login-form input::placeholder {
    color: rgba(226, 249, 255, 0.7);
}

.login-form button {
    height: 3rem;
    padding: 0.75rem;
    font-size: 1.25rem;
    font-weight: bold;
    background-color: #ebfbff;
    color: #243c75;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 3rem;
}

.login-form button:hover {
    background-color: #d3d3d3;
}

.login-form button:disabled {
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
    gap: 0.5rem;
}

.signup-text {
    font-family: 'Red Hat Display', sans-serif;
    color: #ebfbff;
    font-size: 1rem;
}

.signup-link {
    font-family: 'Red Hat Display', sans-serif;
    color: #ebfbff;
    font-size: 1rem;
    text-decoration: none;
}

.signup-link:hover {
    color: #d3d3d3;
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
        margin-top: 1.5rem;
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

    .login-title {
        font-size: 1.5rem;
    }
}
</style>
