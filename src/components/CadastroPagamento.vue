<script setup lang="ts">

</script>

<template>
    <div class="hero-pagamentos">
        <div class="titulo">
            <img src="../../public/images/iconPagamentos.png">
            <h1>PAGAMENTOS</h1>
        </div>
    </div>

</template>

<style scoped>

.hero-pagamentos{
    display: flex;
    flex-direction: column;
    width: 100vw;
    max-height: 100%;
    padding-left: 20rem;
    padding-right: 20rem;
}

.titulo{
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    font-size: large;
    background-color: #909090;
    font-family: "Montserrat", sans-serif;
    padding: 1.5vh;
    margin: 8px;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #a5a5a5;
}

</style>