<script setup lang="ts">

import { ref, computed } from 'vue';
import axios from 'axios';

// Estados reativos
const searchPhone = ref('');
const results = ref([]);
const errorMessage = ref('');
const copyMessage = ref<string | null>(null);
const searchTerm = ref('');
const product = ref<{ descricao: string; valor: number } | null>(null);
const selectedItems = ref<{ descricao: string; valor: number }[]>([]);
const selectedOption = ref('');
let timeoutId: NodeJS.Timeout | null = null;

// Função de debounce
const handleInput = () => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    if (searchPhone.value.trim()) {
      await fetchResults(searchPhone.value);
      copyToClipboard(searchPhone.value);
    } else {
      results.value = [];
    }
  }, 500); // 500ms para debounce
};

// Busca clientes
const fetchResults = async (query: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/clientes`, {
      params: { search: query },
    });
    results.value = response.data;
    errorMessage.value = results.value.length ? '' : 'Cliente não encontrado.';
  } catch {
    errorMessage.value = 'Erro ao buscar clientes.';
  }
};

// Copia texto para área de transferência
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      copyMessage.value = 'Telefone copiado!';
      setTimeout(() => (copyMessage.value = null), 2000);
    })
    .catch(() => {
      copyMessage.value = 'Erro ao copiar telefone.';
    });
};

// Busca produtos
const fetchProduct = async () => {
  if (searchTerm.value.trim()) {
    try {
      const response = await axios.get('http://localhost:5000/api/itens', {
        params: { descricao: searchTerm.value },
      });
      product.value = response.data[0] || null;
    } catch {
      console.error('Erro ao buscar produto.');
    }
  } else {
    product.value = null;
  }
};

// Adiciona item
const addItemToList = () => {
  if (product.value) {
    selectedItems.value.push({
      descricao: product.value.descricao,
      valor: Number(product.value.valor),
    });
    product.value = null;
    searchTerm.value = '';
  }
};

// Remove item
const removeItem = (index: number) => {
  selectedItems.value.splice(index, 1);
};

// Total dos itens
const totalValor = computed(() =>
  selectedItems.value.reduce((total, item) => total + item.valor, 0),
);

// Formata valores para exibição
const formatValue = (value: number): string =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Função para enviar os dados preenchidos no formulário
const submitForm = async () => {
  try {
    // Dados para envio
    const formData = {
      telefone: searchPhone.value, // Telefone preenchido no formulário
      pagamento: document.getElementById('pagamento')?.value, // Método de pagamento selecionado
      total: totalValor.value,
      produtos: selectedItems.value.map(item => item.descricao).join(", "),
      data: new Date().toISOString(),
    };

    // Verifica se há produtos na lista antes de enviar
    if (selectedItems.value.length === 0) {
      alert('Adicione ao menos um produto antes de enviar.');
      return;
    }

    // Envio para o backend
    const response = await axios.post('http://localhost:5000/api/pedidos', formData);

    // Confirmação de sucesso
    alert('Pedido enviado com sucesso!');
    console.log('Resposta do servidor:', response.data);

    // Reseta os campos do formulário
    searchPhone.value = '';
    selectedItems.value = [];
  } catch (error) {
    // Tratamento de erro
    console.error('Erro ao enviar o formulário:', error);
    alert('Erro ao enviar o formulário. Tente novamente.');
  }
};


</script>

<template>
  <div class="hero-pedido">
    <!-- Título -->
    <div class="titulo">
      <img src="../../public/images/iconPedidos.png" />
      <h1>NOVO PEDIDO</h1>
    </div>

    <!-- Formulário -->
    <div class="barraform">
      <form class="form-pedido" @submit.prevent="submitForm">
        <!-- Cadastro do cliente -->
        <div class="cadastro-cliente">
          <label for="telefone">Telefone:</label><br />
          <input
            type="tel"
            id="telefone"
            v-model="searchPhone"
            maxlength="15"
            required
            @input="handleInput"
          />
          <!--<p v-if="copyMessage">{{ copyMessage }}</p>-->
          <p v-if="errorMessage">{{ errorMessage }}</p>
          <ul v-if="results.length">
            <li v-for="item in results" :key="item.id">
              <p>{{ item.nome }}</p>
              <p>{{ item.endereco }}, {{ item.numero }} - {{ item.complemento }}</p>
            </li>
          </ul>
        </div>

        <!-- Pagamento -->
        <div class="cadastro-pagamento">
          <label for="pagamento">Pagamento:</label>
          <select id="pagamento" v-model="selectedOption" required>
            <option value="" disabled selected>Selecione</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Pix">Pix</option>
            <option value="Refeição">Refeição</option>
          </select>
        </div>

        <!-- Cadastro de produtos -->
        <div class="cadastro-produto">
          <label for="item">Item:</label><br />
          <input
            type="text"
            id="searchTerm"
            v-model="searchTerm"
            @input="fetchProduct"
          />
          <div v-if="product">
            <p>Produto: {{ product.descricao }}</p>
            <p>Valor: {{ formatValue(product.valor) }}</p>
            <button type="button" @click="addItemToList">Adicionar Produto</button>
          </div>
          <ul>
            <li v-for="(item, index) in selectedItems" :key="index">
              {{ item.descricao }} - {{ formatValue(item.valor) }}
              <button type="button" @click="removeItem(index)">Remover</button>
            </li>
          </ul>
        </div>

        <!-- Total -->
        <div>
          <h4>Total: {{ formatValue(totalValor) }}</h4>
        </div>

        <button type="submit">Confirmar</button>
        <button type="button" @click="discardForm">Descartar</button>
      </form>
    </div>
    <div class="barratabela">
            <table>
                <thead>
                    <tr><th>NOVO PEDIDO</th></tr>
                    <tr><th>ENTREGA</th></tr>
                </thead>
                <tbody>
                    <tr v-for="item in results" :key="item.id">
                        <tr>CLIENTE:{{ item.nome }}</tr>
                        <tr>ENDEREÇO DE ENTREGA:{{ item.endereco }}, {{ item.numero }} [{{ item.complemento }}]</tr>
                    </tr>
                </tbody>
                <thead>
                  <tr><th>ITENS DO PEDIDO</th></tr>
                </thead>
                    <ul>
                      <li v-for="(item, index) in selectedItems" :key="index">
                        {{ item.descricao }} - R$ {{ Number(item.valor).toFixed(2) }}
                      </li>
                      <li>
                        Total: {{ formatValue(totalValor) }}
                      </li>
                      <p v-if="selectedOption">Pagamento: {{ selectedOption }}</p>
                    </ul>
            </table>
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
    height: 45vh;
}

.form-pedido{
    display: grid;
    grid-template-columns: auto auto;
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