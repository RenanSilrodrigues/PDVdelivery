<script setup lang="ts">

import { ref, watch } from 'vue';

import CadastroCliente from './CadastroCliente.vue';
import CadastroProduto from './CadastroProduto.vue';
import PedidosRealizados from './PedidosRealizados.vue';
import CadastroCardapio from './CadastroCardapio.vue';
import CadastroPedido from './CadastroPedido.vue';
import CadastroPagamento from './CadastroPagamento.vue';


const componentMap: { [key: string]: any } = {
    cadastrarcliente: CadastroCliente,
    cadastrarproduto: CadastroProduto,
    pedidos: PedidosRealizados,
    cardapio: CadastroCardapio,
    cadastrarpedido: CadastroPedido,
    cadastrarpagamento: CadastroPagamento
};

const props = defineProps<{ currentComponent: string | null }>();

const currentComponentRef = ref<string | null>(null);

watch(() => props.currentComponent, (newComponent) => {
  currentComponentRef.value = newComponent;
});

</script>

<template>
    <div class="hero">
        <div>
            <component v-if="currentComponentRef" :is="componentMap[currentComponentRef]" key="currentComponentRef"></component>
        </div>
    </div>
</template>

<style scoped> 

.hero {
    display: flex;
    justify-content: center;
    height: 79vh;
    margin: 8px;
    background-color: #dadada;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #a5a5a5;
    padding: 1rem;
}



</style>