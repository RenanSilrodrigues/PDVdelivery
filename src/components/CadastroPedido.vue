<script setup lang="ts">

import { ref, computed } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';

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

    toast.success('Pedido realizado com sucesso! Entrega: 45 minutos', {
        "theme": "dark",
        "type": "success",
        "position": "top-center",
        "dangerouslyHTMLString": true
      });

    console.log('Resposta do servidor:', response.data);

    setTimeout(() => {
    searchPhone.value = '';
    selectedItems.value = [];
    selectedOption.value = '';
    results.value = [];
    }, 5000);

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
        <form class="form-pedido" @submit.prevent="submitForm" autocomplete="off">
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
            <p class="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>
          
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
              <p>{{ product.descricao }} - Valor: {{ formatValue(product.valor) }} <button id="button" type="button" @click="addItemToList">Adicionar</button></p>
            </div>
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
          <div class="pedido-button">
            <button id="button" type="submit">Confirmar</button>
            <button id="button" type="button" @click="discardForm">Descartar</button>
          </div>
        </form>
      </div>
      <div class="barratabela">
            <header class="informacoest">
              <h1>PEDIDO ENTREGA</h1>
            </header>

            <div class="informacoes">
              <div v-for="item in results" :key="item.id">
                <p>Cliente: {{ item.nome }}</p>
                <p>Entrega: {{ item.endereco }}, {{ item.numero }} [{{ item.complemento }}]</p>
              </div>
            </div>

            <header class="carrinhot">
              <h1>CARRINHO</h1>
            </header>

            <div class="carrinho">
              <div v-for="(item, index) in selectedItems" :key="index">
                  <li>{{ item.descricao }} - {{ formatValue(item.valor) }} <button type="button" @click="removeItem(index)"><img src="../../public/images/iconLixeira.png" id="imgiconsacoes"></button></li>
              </div>
            </div>

            <div class="pedido-total">
              <h4>Total: {{ formatValue(totalValor) }}</h4>
            </div>

            <div v-if="selectedOption" class="pagamento">
              <p>Forma de Pagamento: {{ selectedOption }}</p>
            </div>
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
  margin-top: 3rem;
}

.cadastro-pagamento{
  margin-top: 5rem;
}

.barratabela{
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #C1BCFF;
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  height: 68vh;
  margin: 8px;
  border-radius: 4px;
  overflow: auto;
  box-shadow: 2px 2px 5px #a5a5a5;
}

.informacoes{
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  margin-top: 3rem;
  position: absolute;
}

.informacoest{
  margin-top: 1rem;
}

.carrinho{
  margin-top: 10.3rem;
  position: absolute;
}

.carrinhot{
  margin-top: 6rem;
} 

#imgiconsacoes{
  width: 16px;
  height: 16px;
}

.pedido-total{
  margin-top: 23rem;
  font-size: 3rem;
}

.pagamento{
  margin-top: 1rem;
}

.pedido-button{
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 7rem;
}

#button {
  background-color: #837AFE;
  color: black;
  font-family: "Montserrat", sans-serif;
  width: 150px;
  border-radius: 10px;
  padding: 8px 0;
  cursor: pointer;
}

.errorMessage{
  margin-top: 1rem;
  position: absolute;
  font-size: 1.1rem
}

.dados-produto{
  margin-top: 1rem;
  position: absolute;
  font-size: 1.1rem;
}

</style>