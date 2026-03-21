<template>
    <Header title="Login" />
    <main class="main" ref="mainRef">
        <aside class="left-side">
            <h3 class="login">Login</h3>
            <h1 class="welcome-title">BEM-VINDO</h1>
            <p class="welcome-description">Entre para gerenciar seus equipamentos de proteção individual e garantir a
                conformidade no ambiente de trabalho.</p>
        </aside>
        <aside class="right-side">
            <section class="top-content">
                <h1 class="login-title">Sua conta.</h1>
                <form class="login-form">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Digite seu email" required>
                    <label for="password">Senha</label>
                    <input type="password" id="password" name="password" placeholder="Digite sua senha" required>
                    <button type="submit">Entrar</button>
                </form>
            </section>
            <section class="baseboard">
                <Line />
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
    background-image: url('../assets/grunge-wall-texture.png');
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
    width: 50%;
    padding: 2rem 5rem 2rem 5rem;
}

.login {
    font-family: 'Pinyon Script', cursive;
    color: #000000;
    font-size: 2rem;
    margin: 0;
    line-height: 1;
}

.welcome-title {
    font-family: 'Archivo Black', sans-serif;
    color: #000000;
    font-size: 7rem;
    font-weight: 900;
    margin: -0.35rem 0 0 0;
    line-height: 0.95;
}

.welcome-description {
    font-family: 'Red Hat Display', sans-serif;
    color: #000000;
    font-size: 1.2rem;
    margin-top: 1rem;
}

.right-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    min-height: 85vh;
    background-color: #ffffff;
    border-radius: 15px;
    gap: 1rem;
    padding: 2rem 5rem 2rem 5rem;
    margin: 0 2rem 0 0;
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
    color: #000000;
    font-size: 2rem;
    margin: 0;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.login-form label {
    font-family: 'Red Hat Display', sans-serif;
    color: #000000;
    font-size: 1rem;
}

.login-form input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.login-form button {
    padding: 0.75rem;
    font-size: 1rem;
    background-color: #000000;
    color: #dedede;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login-form button:hover {
    background-color: #333333;
}

.baseboard {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.baseboard-content {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
}

.signup-text {
    font-family: 'Red Hat Display', sans-serif;
    color: #000000;
    font-size: 1rem;
}

.signup-link {
    font-family: 'Red Hat Display', sans-serif;
    color: #000000;
    font-size: 1rem;
    text-decoration: none;
}

.signup-link:hover {
    color: #000000;
    text-decoration: underline;
}
</style>