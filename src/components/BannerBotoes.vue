<script setup lang="ts">

import { defineEmits } from 'vue';

const emit = defineEmits<{
  (event: 'updateComponent', component: string): void;
}>();

function changeComponent(component: string) {
  emit('updateComponent', component);
}

</script>

<template>
    <div class="barra_botoes">
        <div class="botaopedido">
            <button class="botao" @click="changeComponent('pedidos')">PEDIDOS</button>
        </div>
        <div class="botoes">
            <button class="botao" @click="changeComponent('cadastrarpedido')">NOVO PEDIDO</button>
            <button class='botao' @click="changeComponent('sangria')">SANGRIA</button>
            <button class="botao" @click="changeComponent('cadastrarproduto')">CADASTRAR PRODUTO</button>
            <button class="botao" @click="changeComponent('cadastrarcliente')">CADASTRAR CLIENTE</button>
            <button class="botao" @click="changeComponent('cadastrarpagamento')">PAGAMENTOS</button>
            <button class="botao" @click="changeComponent('cardapio')">CARDAPIO</button>
            <button class="botao" @click="changeComponent('cadastrarrelatorios')">RELATÓRIOS</button>
            <button class="botao" @click="changeComponent('gerenciar')">GERENCIAR</button>
        </div>
    </div>
</template>

<style scoped>  

.barra_botoes{
    display: flex;
    max-width: 100%;
    border-radius: 4px;
    margin: 8px;
    background-color: #dadada;
    box-shadow: 2px 2px 5px #a5a5a5;
    padding: 1.5vh;
    align-items: center;

}

.botoes{
    display: flex;
    width: 100%;
    height: 100%;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.botao{
    background-color: #837AFE;
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
    text-decoration: none;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
}

.botao:hover{
    background-color: #BFBAFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}

@media (max-width: 1366px){
    .botoes{
        scale: 0.9;
    }

    .botaopedido{
        scale: 0.9;
    }
}
</style>