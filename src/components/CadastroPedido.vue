<script setup lang="ts">

import { ref, computed } from 'vue';
import axios from 'axios';

const searchPhone = ref('');
const results = ref([]);
const errorMessage = ref('');
const copyMessage = ref<string | null>(null);
const searchTerm = ref('');
const product = ref<{ descricao: string; valor: number } | null>(null);
const selectedItems = ref<{ descricao: string; valor: number }[]>([]);
const selectedOption = ref('');
let timeoutId: NodeJS.Timeout | null = null;

const handleInput = () => {
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    if (searchPhone.value.trim()) {
      await fetchResults(searchPhone.value);
      copyToClipboard(searchPhone.value);
    } else {
      results.value = [];
    }
  }, 500);
};

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

const removeItem = (index: number) => {
  selectedItems.value.splice(index, 1);
};

const totalValor = computed(() =>
  selectedItems.value.reduce((total, item) => total + item.valor, 0),
);

const formatValue = (value: number): string =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const submitForm = async () => {
  try {
    const formData = {
      telefone: searchPhone.value,
      pagamento: document.getElementById('pagamento')?.value,
      total: totalValor.value,
      produtos: selectedItems.value.map(item => item.descricao).join(", "),
      data: new Date().toISOString(),
    };

    if (selectedItems.value.length === 0) {
      alert('Adicione ao menos um produto antes de enviar.');
      return;
    }

    const response = await axios.post('http://localhost:5000/api/pedidos', formData);

    alert('Pedido enviado com sucesso!');
    console.log('Resposta do servidor:', response.data);

    searchPhone.value = '';
    selectedItems.value = [];
  } catch (error) {
    console.error('Erro ao enviar o formulário:', error);
    alert('Erro ao enviar o formulário. Tente novamente.');
  }
};


</script>

<template>
  <div class="hero-pedido">
    <div class="titulo">
      <img src="../../public/images/iconPedidos.png" />
      <h1>NOVO PEDIDO</h1>
    </div>
      <div class="barraform">
        <form class="form-pedido" @submit.prevent="submitForm">
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
            <ul v-if="results.length" class="dados-cliente">
              <li v-for="item in results" :key="item.id">
                <p>{{ item.nome }}</p>
                <p>{{ item.endereco }}, {{ item.numero }} - {{ item.complemento }}</p>
              </li>
            </ul>
          </div>
          <div class="cadastro-produto">
            <label for="item">Item:</label><br />
            <input
              type="text"
              id="searchTerm"
              v-model="searchTerm"
              @input="fetchProduct"
            />
            <div v-if="product" class="dados-produto">
              <p>Produto: {{ product.descricao }}</p>
              <p>Valor: {{ formatValue(product.valor) }}</p>
              <button type="button" @click="addItemToList">Adicionar</button>
            </div>
            <ul class="dados-produto-adicionado">
              <li v-for="(item, index) in selectedItems" :key="index">
                {{ item.descricao }} - {{ formatValue(item.valor) }}
                <button type="button" @click="removeItem(index)">Remover</button>
              </li>
            </ul>
          </div>
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
          <div class="pedido-total">
            <h4>Total: {{ formatValue(totalValor) }}</h4>
          </div>
          <div class="pedido-button">
            <button type="submit">Confirmar</button>
            <button type="button" @click="discardForm">Descartar</button>
          </div>
        </form>
      </div>
      <div class="barratabela">
              <table class="recibo">
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
                      <tr>
                        <th v-for="(item, index) in selectedItems" :key="index">
                          {{ item.descricao }} - R$ {{ Number(item.valor).toFixed(2) }}
                        </th>
                        <th>
                          Total: {{ formatValue(totalValor) }}
                        </th>
                        <p v-if="selectedOption">Pagamento: {{ selectedOption }}</p>
                      </tr>
              </table>
          </div>
  </div>
</template>

<style scoped>

.hero-pedido{
  display: grid;
  grid-template-columns: auto auto;
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

.titulo{
    grid-column-start: 1;
    grid-column-end: 3;
}

.barraform{
    border-radius: 5px;
    background-color: #DADADA;
    padding: 1rem;
    margin: 8px;
    font-family: "Montserrat", sans-serif;
    box-shadow: 2px 2px 5px #a5a5a5;
    height: 68vh;
}

.form-pedido{
    display: flex;
    flex-direction: column;
}

.form-pedido, select, [type=text], [type=tel], [type=number]  {
    width: 100%;
    padding: 8px 20px;
    border-radius: 4px;
    box-sizing: border-box; 
}

.form-pedido [type=text], [type=tel]:focus{
    outline-color: red;
}

.cadastro-produto{
  margin-top: 6rem;
}

.cadastro-pagamento{
  margin-top: 10rem;
}

.barratabela{
    background-color: #C1BCFF;
    height: 68vh;
    margin: 8px;
    border-radius: 4px;
    overflow: auto;
    box-shadow: 2px 2px 5px #a5a5a5;
}

.pedido-total{
  display: flex;
  justify-content: center;
  padding: 3rem;
  font-size: 2rem;
}

.dados-cliente{
  padding: 1rem;
  position: absolute;
  background-color: white;
  margin-top: 1rem;
}

.dados-produto-adicionado{
  padding: 1rem;
  position: absolute;
  margin-top: 1rem;
  background-color: white;
}

.dados-produto{
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  margin-top: 1rem;
}

button {
    background-color: #837AFE;
    color: black;
    font-family: "Montserrat", sans-serif;
    width: 150px;
    border-radius: 10px;
    padding: 8px 0;
    cursor: pointer;
}

.pedido-button{
  display: flex;
  justify-content: center;
  gap: 1rem;
}

</style>