<template>
    <header class="header">
        <h1>{{ title }}</h1>
    </header>
</template>

<script>
export default {
    name: "PageHeader",
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    color: #ffffff;
    height: 10vh;
}
</style>
