<template>
    <nav class="actions" aria-label="Navegação entre páginas">
        <RouterLink class="button" to="/">Home</RouterLink>
        <RouterLink class="button" to="/sobre">Sobre</RouterLink>
        <RouterLink class="button" to="/contato">Contato</RouterLink>
        <RouterLink class="button" to="/login">Login</RouterLink>
        <RouterLink class="button" to="/cadastro">Cadastro</RouterLink>
        <RouterLink class="button" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="button" to="/estoque">Estoque</RouterLink>
    </nav>
</template>

<style scoped>
.actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
}

.button {
    background-color: #1e40af;
    color: #ffffff;
    text-decoration: none;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
}

.button:hover {
    background-color: #1d4ed8;
}
</style>
