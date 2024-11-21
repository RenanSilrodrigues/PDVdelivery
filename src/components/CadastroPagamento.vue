<script setup lang="ts">

import { ref, onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
    buscarPedidos();
});

const pedidos = ref<Array<any>>([]);


const buscarPedidos = async () => {
try {
    const response = await axios.get('http://localhost:5000/api/pedidos');
    pedidos.value = response.data;
} catch (error) {
    console.error('Erro ao buscar dados:', error);
}
};

</script>

<template>
    <div class="hero-pagamentos">
        <div class="titulo">
            <img src="../../public/images/iconPagamentos.png">
            <h1>PAGAMENTOS</h1>
        </div>
        <div class="barratabela">
            <table id="tabela-pedidos">
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Data</th>
                        <th>Cliente</th>
                        <th>Carrinho</th>
                        <th>Pagamento</th>
                        <th>Valor Pago</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pedidos in pedidos" :key="pedidos.id">
                        <td>{{ pedidos.id }}</td>
                        <td>{{ new Date(pedidos.data).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}</td>
                        <td>{{ pedidos.telefone }}</td>
                        <td>{{ pedidos.produtos}}</td>
                        <td>{{ pedidos.pagamento}}</td>
                        <td>{{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedidos.total) }}</td>
                    </tr>
                </tbody>
            </table>
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

#tabela-pedidos td, 
#tabela-pedidos th {
    border: 1px solid;
    padding: 8px;
}

#tabela-pedidos th {
    text-align: left;
    text-transform: uppercase;
    background-color: lightblue;
}

#tabela-pedidos {
    width: 100%;
    border-collapse: collapse;
    font-family: "Montserrat", sans-serif; 
}

.barratabela{
    background-color: #C1BCFF;
    max-width: 100%;
    height: 68vh;
    margin: 8px;
    border-radius: 4px;
    overflow: auto;
    box-shadow: 2px 2px 5px #a5a5a5;
}

</style>