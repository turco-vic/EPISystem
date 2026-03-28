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
                <form class="login-form">
                    <div class="email-input">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Digite seu email" required>
                    </div>
                    <div class="password-input">
                        <label for="password">Senha</label>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha" required>
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </section>
            <section class="baseboard">
                <Line backgroundColor="#243c75" height="2px" />
                <section class="baseboard-content">
                    <p class="signup-text">Não tem uma conta?</p>
                    <router-link to="/cadastro" class="signup-link">Cadastre-se</router-link>
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

export default {
    name: 'Login',
    components: {
        Header,
        Footer,
        Line
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
;
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

.login-title {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 2rem;
    margin: 0;
}

.login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
}

.email-input, .password-input {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}

.login-form label {
    font-family: 'Anton', sans-serif;
    color: #243c75;
    font-size: 1rem;
}

.login-form input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #d1213f;
    border-radius: 4px;
    height: 3rem;
}

.login-form button {
    height: 3rem;
    padding: 0.75rem;
    font-size: 1.25rem;
    font-weight: bold;
    background-color: #243c75;
    color: #e2f9ff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 3rem;
}

.login-form button:hover {
    background-color: #878787;
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
    color: #243c75;
    font-size: 1rem;
}

.signup-link {
    font-family: 'Red Hat Display', sans-serif;
    color: #243c75;
    font-size: 1rem;
    text-decoration: none;
}

.signup-link:hover {
    color: #243c75;
    text-decoration: underline;
}

/* Responsividade */
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