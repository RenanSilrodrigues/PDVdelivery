<script setup lang="ts">

import { ref } from 'vue';
import axios from 'axios';
import { errorMessages } from 'vue/compiler-sfc';

const searchPhone = ref(''); // estado do termo de busca
const results = ref([]); // estado para armazenar os resultados
const errorMessage = ref('');
let timeoutId: NodeJS.Timeout | null = null; // para controle do debounce

// Função para buscar dados
const fetchResults = async (query: string) => {
  try {
    // Faz a requisição para o backend
    const response = await axios.get(`http://localhost:5000/api/clientes`, {
      params: { search: query }, // envia o termo de busca como parâmetro
    });
    results.value = response.data;

    if (results.value.length === 0) {
      errorMessage.value = 'Cliente não cadastrado'; // Exibe a mensagem de erro
    } else {
      errorMessage.value = ''; // Limpa a mensagem se houver resultados
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    results.value = [];
  }
};

// Função para gerenciar o debounce e copiar o telefone
const handleInput = () => {
  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(async () => {
    if (searchPhone.value.trim()) {
      await fetchResults(searchPhone.value); // Realiza a busca
      copyToClipboard(searchPhone.value); // Copia o telefone após a busca
    } else {
      results.value = [];
    }
  }, 1000); // Aguarda 500 ms após a última tecla
};

// Função para copiar o telefone para a área de transferência
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      copyMessage.value = 'Telefone copiado para a área de transferência!';
      setTimeout(() => (copyMessage.value = ''), 2000); // Limpa a mensagem após 2s
    })
    .catch((error) => {
      console.error('Erro ao copiar para a área de transferência:', error);
      copyMessage.value = 'Erro ao copiar!';
    });
};

</script>

<template>
    <div class="hero-pedido">
        <div class="titulo">
            <img src="../../public/images/iconPedidos.png">
            <h1>NOVO PEDIDO</h1>
        </div>
        <div class="barraform">
            <form class="form-pedido" action="">
                <div class="cadastro-cliente">
                    <label for="telefone">Telefone:</label><br>
                    <input type="tel" v-model="searchPhone" id="telefone" name="telefone" maxlength="15" required @input="handleInput"/>
                    <p v-if="copyMessage"></p>
                    <p v-if="errorMessage">{{ errorMessage }}</p>
                    <ul v-if="results.length > 0">
                        <li v-for="item in results" :key="item.id">
                        <p>{{ item.nome }}</p>
                        <P>{{ item.endereco }}</p>
                        <p>{{ item.numero }}</p><p>{{ item.complemento }}</p>
                        </li>
                    </ul>
                </div>
                <div class="cadastro-pagamento">
                    <label for="pagamento">Pagamento:</label>
                        <select id="pagamento" required>
                            <option value="selecione">Selecione</option>
                            <option value="Dinheiro">Dinheiro</option>
                            <option value="Debito">Debito</option>
                            <option value="Credito">Credito</option>
                            <option value="Refeição">Refeição</option>
                            <option value="Pix">Pix</option>
                            <option value="Cupom">Cupom</option>
                        </select>
                </div>
                <div class="cadastro-produto">
                    <label for="item">Item:</label><br>
                    <input type="text" name="item" required>
                    <button>Adicionar mais</button>
                </div>
            </form>
        </div>
        <div class="barra-botoes">
            <button>Descartar</button>
            <button>Confirmar</button>
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