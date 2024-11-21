<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Pedido {
  id: number;
  telefone: string;
  produtos: string;
  total: number;
  pagamento: string;
}

const ultimoPedido = ref<Pedido | null>(null);
const errorMessage = ref('');

const fetchUltimoPedido = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/ultimo-pedido');
    ultimoPedido.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar o último pedido:', error);
    errorMessage.value = 'Erro ao carregar o último pedido.';
  }
};

onMounted(() => {
  fetchUltimoPedido();
});

</script>

<template>
    <div class="hero-realizado">
      <div class="ultimo-pedido">
        <div v-if="errorMessage">{{ errorMessage }}</div>
        <div v-else-if="ultimoPedido">
            <h3>Pedido: {{ ultimoPedido.id }}</h3>
          <p><strong>Cliente:</strong> {{ ultimoPedido.telefone }}</p>
          <div class="carrinho">
          <p>Carrinho: <br> {{ ultimoPedido.produtos }}</p>
          </div>
          <div class="total">
          <p><strong>Total:</strong> R$ {{ ultimoPedido.total }}</p>
          </div>
          <p><strong>Pagamento:</strong> R$ {{ ultimoPedido.pagamento }}</p>
          <p>Entrega: 45 minutos</p>
        </div>
        <div v-else>
          <p>Carregando...</p>
        </div>
     </div>
    </div>
</template>

<style scoped>

.hero-realizado{
    display: flex;
    width: 100vw;
    max-height: 100%;
    padding-left: 20rem;
    padding-right: 20rem;
}

.ultimo-pedido {
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    font-size: 1.3rem;
    background-color: #909090;
    font-family: "Montserrat", sans-serif;
    padding: 1.5vh;
    margin: 8px;
    border-radius: 4px;
    box-shadow: 2px 2px 5px #a5a5a5;
    animation-name: novo;
    animation-duration: 4s;
    animation-iteration-count: 30;
}

@keyframes novo {
  from {background-color: rgb(47, 128, 47);}
  to {background-color: rgb(255, 255, 100);}
}

h3{
    font-size: 2rem;
}

.carrinho{
    margin-top: 1.5rem;
}

.total{
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
}

</style>