<template>
    <div class="line" :style="{ width: width, height: height, backgroundColor: backgroundColor }"></div>
</template>

<script>
export default {
    name: "Line",
    props: {
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "2px"
        },
        backgroundColor: {
            type: String,
            default: "#ebfbff"
        }

    }
};
</script>

<style scoped>
.line {
    background-color: #ebfbff;
}
</style>