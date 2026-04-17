<template>
    <footer class="footer-container">
        <section class="footer-top">
            <div class="footer-top-content">
                <h2 class="footer-top-title">
                    <router-link to="/" class="footer-top-link">EPI System</router-link>
                </h2>
                <div class="social-icons">
                    <a href="https://www.linkedin.com/in/enzoturcovic/" target="_blank" rel="noopener noreferrer" class="social-icon"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#" class="social-icon"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#" class="social-icon"><i class="fa-brands fa-x-twitter"></i></a>
                </div>
            </div>
            <Line />
        </section>
        <section class ="footer-columns-topics">
            <div class="footer-column">
                <h3 class="footer-column-title">Recursos</h3>
                <ul class="footer-column-list">
                    <li><a href="/" class="footer-column-link">Suporte</a></li>
                    <li><a href="/" class="footer-column-link">Termos de Serviço</a></li>
                    <li><a href="/" class="footer-column-link">Política de Privacidade</a></li>
                </ul>
                <Line />
            </div>
            <div class="footer-column">
                <h3 class="footer-column-title">Empresa</h3>
                <ul class="footer-column-list">
                    <li><router-link to="/contato" class="footer-column-link">Contato</router-link></li>
                    <li><router-link to="/" class="footer-column-link">Carreiras</router-link></li>
                    <li><router-link to="/sobre" class="footer-column-link">Sobre Nós</router-link></li>
                </ul>
                <Line />
            </div>
            <div class="footer-column">
                <h3 class="footer-column-title">Fale Conosco</h3>
                <ul class="footer-column-list">
                    <li><span class="footer-column-link">Campinas/SP</span></li>
                    <li><span class="footer-column-link">(11) 1234-5678</span></li>
                    <li><span class="footer-column-link">suporte@episystem.com</span></li>
                </ul>
                <Line />
            </div>
            <div class="footer-column">
                <h3 class="footer-column-title">Links Úteis</h3>
                <ul class="footer-column-list">
                    <li><router-link to="/" class="footer-column-link">FAQ</router-link></li>
                    <li><router-link to="/" class="footer-column-link">Central de Ajuda</router-link></li>
                    <li><router-link to="/" class="footer-column-link">Status do Sistema</router-link></li>
                </ul>
                <Line />
            </div>
        </section>
    </footer>
</template>

<script>
import Line from "./Line.vue";
export default {
    name: "Footer",
    components: {
        Line
    }
};
</script>

<style scoped>
.footer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 4rem 20rem 1rem 20rem;
    background-color: #243c75;
    color: #ebfbff;
    height: auto;
    min-height: 40vh;
}

.footer-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.footer-top-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 1rem;
}

.footer-top-title {
    font-family: 'Anton', sans-serif;
    font-size: 2rem;
}

.footer-top-title:hover {
    color: #ebfbff;
    scale: 1.1;
}

.footer-top-link {
    color: #ebfbff;
    text-decoration: none;
}

.social-icons {
    display: flex;
    gap: 1rem;
}

.social-icon {
    font-size: 1.5rem;
    color: #ebfbff;
    text-decoration: none;
}

.social-icon:hover {
    color: #ebfbff;
    scale: 1.1;
}

.footer-columns-topics {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    gap: 5rem;
    margin: 4rem 0 4rem 0;
}

.footer-column {
    display: flex;
    flex-direction: column;
    width: 25%;
    gap: 0.5rem;
}

.footer-column-title {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.footer-column-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-column-link {
    color: #ebfbff;
    text-decoration: none;
    font-family: 'Red Hat Display', sans-serif;
}

.footer-column-link:hover {
    color: #ebfbff;
    text-decoration: underline;
}

@media (max-width: 1200px) {
    .footer-container {
        padding: 2rem 5rem 1rem 5rem;
    }
    .footer-columns-topics {
        gap: 3rem;
        flex-wrap: wrap;
    }
    .footer-column {
        width: calc(50% - 1.5rem);
    }
}

@media (max-width: 768px) {
    .footer-container {
        padding: 2rem 1.5rem 1rem 1.5rem;
    }
    .footer-top-content {
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 1rem;
    }
    .footer-columns-topics {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2.5rem 1rem;
        margin: 2rem 0;
        align-items: flex-start;
        text-align: left;
    }
    .footer-column {
        width: calc(50% - 0.5rem);
        align-items: flex-start;
    }
    .footer-column-title {
        text-align: left;
    }
}
</style>
