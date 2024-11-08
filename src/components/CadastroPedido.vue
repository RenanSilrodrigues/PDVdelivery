<script setup lang="ts">

</script>

<template>
    <div class="hero-pedido">
        <div class="titulo">
            <img src="../../public/images/iconPedidos.png">
            <h1>NOVO PEDIDO</h1>
        </div>
        <div class="barraform">
            <div class="tabs">
                <button id="tabbutton"
                    v-for="(tipo, index) in tipos"
                    :key="index"
                    @click="activeTab = tipo"
                    :class="{ active: activeTab === tipo }"
                    >
                    {{ tipo }}
                </button>
            </div>
        </div>
        <div class="barratabela">

        </div>
    </div>

</template>

<style scoped>

.hero-pedido{
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

.barraform{
    border-radius: 5px;
    background-color: #DADADA;
    padding: 1rem;
    margin: 8px;
    font-family: "Montserrat", sans-serif;
    box-shadow: 2px 2px 5px #a5a5a5;
}

.barratabela{
    background-color: #C1BCFF;
    max-width: 100%;
    height: 45vh;
    max-height: 45vh;
    margin: 8px;
    border-radius: 4px;
    overflow: auto;
    box-shadow: 2px 2px 5px #a5a5a5;
}

</style>