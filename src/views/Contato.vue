<template>
    <div class="container">
        <Header title="Contato" />
        <main class="main">
            <section class="panel">
                <aside class="left">
                    <span class="eyebrow">Fale conosco</span>
                    <h1 class="title">
                        Sua dúvida merece uma <span class="highlighted">resposta direta</span>
                    </h1>
                    <p class="lead">
                        Envie uma mensagem ou utilize um dos canais abaixo. Retornamos em até 48h úteis.
                    </p>

                    <div class="channels">
                        <a href="mailto:contato@episystem.com.br" class="channel">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <span class="ch-label">Email</span>
                                <span class="ch-value">contato@episystem.com.br</span>
                            </div>
                        </a>
                        <a href="tel:+551933333333" class="channel">
                            <i class="fas fa-phone"></i>
                            <div>
                                <span class="ch-label">Telefone</span>
                                <span class="ch-value">(19) 3333-3333</span>
                            </div>
                        </a>
                        <div class="channel">
                            <i class="fas fa-location-dot"></i>
                            <div>
                                <span class="ch-label">Endereço</span>
                                <span class="ch-value">SENAI Roberto Mange · Campinas/SP</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <aside class="right">
                    <div class="form-wrap" v-if="!enviado">
                        <div class="field-row">
                            <div class="field">
                                <label>Nome</label>
                                <input v-model="form.nome" type="text" placeholder="Seu nome">
                            </div>
                            <div class="field">
                                <label>Email</label>
                                <input v-model="form.email" type="email" placeholder="voce@gmail.com">
                            </div>
                        </div>
                        <div class="field">
                            <label>Assunto</label>
                            <select v-model="form.assunto">
                                <option value="" disabled>Selecione</option>
                                <option value="duvida">Dúvida sobre o sistema</option>
                                <option value="sugestao">Sugestão</option>
                                <option value="bug">Relatar problema</option>
                                <option value="parceria">Parceria institucional</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                        <div class="field">
                            <label>Mensagem</label>
                            <textarea v-model="form.mensagem" rows="5" placeholder="Descreva aqui..."></textarea>
                        </div>
                        <p v-if="erro" class="error">{{ erro }}</p>
                        <button class="btn" @click="enviar" :disabled="enviando">
                            <i class="fas fa-paper-plane"></i>
                            {{ enviando ? 'Enviando...' : 'Enviar mensagem' }}
                        </button>
                    </div>

                    <div class="success" v-else>
                        <i class="fas fa-circle-check"></i>
                        <h3>Mensagem enviada</h3>
                        <p>Obrigado, {{ form.nome || 'visitante' }}. Retornaremos em breve.</p>
                        <button class="btn-outline" @click="resetar">Enviar outra</button>
                    </div>
                </aside>
            </section>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { ref, reactive } from "vue";

export default {
    name: "Contato",
    components: { Header, Footer },
    setup() {
        const form = reactive({ nome: '', email: '', assunto: '', mensagem: '' });
        const enviando = ref(false);
        const enviado = ref(false);
        const erro = ref('');

        async function enviar() {
            erro.value = '';
            if (!form.nome || !form.email || !form.assunto || !form.mensagem) {
                erro.value = 'Preencha todos os campos.';
                return;
            }
            if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) {
                erro.value = 'Email inválido.';
                return;
            }
            enviando.value = true;
            await new Promise(r => setTimeout(r, 800));
            enviando.value = false;
            enviado.value = true;
        }

        function resetar() {
            form.nome = '';
            form.email = '';
            form.assunto = '';
            form.mensagem = '';
            enviado.value = false;
            erro.value = '';
        }

        return { form, enviando, enviado, erro, enviar, resetar };
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #ebfbff;
}

.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.panel {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 5rem;
    padding: calc(10vh + 3rem) 7rem 4rem 7rem;
    box-sizing: border-box;
    min-height: 100vh;
    align-items: center;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.eyebrow {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    color: #243c75;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    border-left: 4px solid #243c75;
    padding-left: 0.75rem;
}

.title {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 900;
    font-size: 3.4rem;
    color: #243c75;
    line-height: 1.1;
    margin: 0;
}

.highlighted {
    background: #243c75;
    color: #ebfbff;
    padding: 0 0.5rem;
}

.lead {
    font-family: "Red Hat Display", sans-serif;
    font-size: 1.15rem;
    line-height: 1.8rem;
    color: #243c75;
    margin: 0;
}

.channels {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
}

.channel {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border: 2px solid #243c75;
    border-radius: 6px;
    color: #243c75;
    font-family: "Red Hat Display", sans-serif;
    text-decoration: none;
    transition: background 0.2s ease, color 0.2s ease;
}

a.channel:hover {
    background: #243c75;
    color: #ebfbff;
}

.channel i {
    font-size: 1.5rem;
    flex-shrink: 0;
}

.ch-label {
    display: block;
    font-weight: 400;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.7;
}

.ch-value {
    display: block;
    font-weight: 700;
    font-size: 1rem;
    margin-top: 0.1rem;
}

.form-wrap {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 2.5rem;
    border: 2px solid #243c75;
    border-radius: 6px;
    background: #243c75;
}

.field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.field label {
    font-family: "Red Hat Display", sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    color: #ebfbff;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.field input,
.field select,
.field textarea {
    padding: 0.8rem 1rem;
    font-size: 1rem;
    border: 2px solid #ebfbff;
    border-radius: 4px;
    font-family: "Red Hat Display", sans-serif;
    color: #243c75;
    background: #ebfbff;
    resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
    outline: none;
}

.error {
    font-family: "Red Hat Display", sans-serif;
    font-size: 0.95rem;
    color: #243c75;
    background: #ebfbff;
    border: 2px solid #ebfbff;
    border-radius: 4px;
    padding: 0.6rem 1rem;
    margin: 0;
    font-weight: 700;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background: #ebfbff;
    color: #243c75;
    border: 2px solid #ebfbff;
    border-radius: 4px;
    padding: 1rem 1.5rem;
    font-family: "Red Hat Display", sans-serif;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
}

.btn:hover:not(:disabled) {
    background: transparent;
    color: #ebfbff;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-outline {
    background: transparent;
    border: 2px solid #243c75;
    color: #243c75;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
}

.btn-outline:hover {
    background: #243c75;
    color: #ebfbff;
}

.success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    padding: 3rem 2rem;
    border: 2px solid #243c75;
    border-radius: 6px;
    color: #243c75;
    font-family: "Red Hat Display", sans-serif;
}

.success i {
    font-size: 3.5rem;
}

.success h3 {
    font-weight: 900;
    font-size: 1.5rem;
    margin: 0;
}

.success p {
    margin: 0;
}

@media (max-width: 1200px) {
    .panel {
        padding: calc(10vh + 2rem) 3rem 3rem 3rem;
        gap: 3rem;
    }

    .title {
        font-size: 2.6rem;
    }
}

@media (max-width: 992px) {
    .panel {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        padding: calc(10vh + 2rem) 2rem 3rem 2rem;
    }

    .title {
        font-size: 2.2rem;
    }
}

@media (max-width: 576px) {
    .panel {
        padding: calc(10vh + 1.5rem) 1.25rem 2rem 1.25rem;
    }

    .title {
        font-size: 1.75rem;
    }

    .lead {
        font-size: 1rem;
        line-height: 1.6rem;
    }

    .field-row {
        grid-template-columns: 1fr;
    }

    .form-wrap {
        padding: 1.5rem;
    }
}
</style>
