<template>
    <footer class="footer-container">
        <p class="copyright">© 2026 EPI System. Todos os direitos reservados.</p>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
.footer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    color: #dedede;
    height: 10vh;
}

.copyright {
    font-family: 'Red Hat Display', sans-serif;
    font-size: 1rem;
}
</style>
    