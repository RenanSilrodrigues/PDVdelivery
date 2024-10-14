<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  interface Produto {
    id: number;
    tipo: string;
    descricao: string;
    valor: number;
  }
  
  export default defineComponent({
    setup() {
      const produtos = ref<Produto[]>([]);
      const produtosPorTipo = ref<{ [key: string]: Produto[] }>({});
      const tipos = ref<string[]>([]);
      const activeTab = ref<string>('');
  
      
      const fetchProdutos = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/produtos');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: Produto[] = await response.json();
          produtos.value = data;
  
          
          data.forEach(produto => {
            if (!produtosPorTipo.value[produto.tipo]) {
              produtosPorTipo.value[produto.tipo] = [];
            }
            produtosPorTipo.value[produto.tipo].push(produto);
          });
  
          
          tipos.value = Object.keys(produtosPorTipo.value);
          activeTab.value = tipos.value[0]; 
        } catch (err) {
          console.error('Erro ao buscar produtos:', err);
        }
      };
  
      
      const excluirProduto = async (id: number) => {
        try {
          const response = await fetch(`http://localhost:5000/api/produtos/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error(`Erro ao excluir produto: ${response.status}`);
          }
  
          
          produtosPorTipo.value[activeTab.value] = produtosPorTipo.value[activeTab.value].filter(
            produto => produto.id !== id
          );
        } catch (err) {
          console.error(`Erro ao excluir produto ${id}:`, err);
        }
      };
  
      
      onMounted(fetchProdutos);
  
      return {
        produtosPorTipo,
        tipos,
        activeTab,
        excluirProduto,
      };
    },
  });
</script>

<template>
    <div class="hero-cardapio">

      <div class="titulo">
        <img src="../../public/images/iconCardapio.png">
        <h1>CARDAPIO</h1>
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
        <div v-if="produtosPorTipo[activeTab]">
          <table id="tabelacardapio">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ações </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="produto in produtosPorTipo[activeTab]" :key="produto.id">
                <td class="tdid">{{ produto.id }}</td>
                <td class="tddescricao">{{ produto.descricao }}</td>
                <td class="tdvalor">{{ produto.valor }}</td>
                <td class="tdacoes">
                  <button @click="excluirProduto(produto.id)"><img src="../../public/images/iconLixeira.png" id="imgiconsacoes"></button>
                  <button><img src="../../public/images/iconEditar.png" id="imgiconsacoes"></button>
                  <button><img src="../../public/images/iconFoto.png" id="imgiconsacoes"></button>
                  <button><img src="../../public/images/iconCompras.png" id="imgiconsacoes"></button>
                  <button><img src="../../public/images/iconVizualizar.png" id="imgiconsacoes"></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>
  
<style scoped>

.hero-cardapio{
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


.barratabela{
    background-color: #C1BCFF;
    max-width: 100%;
    height: 63vh;
    max-height: 63vh;
    margin: 0 8px 8px 8px;
    padding-top: 8px;
    border-radius: 4px;
    overflow: auto;
    box-shadow: 2px 2px 5px #a5a5a5;
}

#tabelacardapio td, 
#tabelacardapio th {
    border: 1px solid;
    padding: 8px;
}

.tdacoes{
  width: 12.4rem;
  height: 100%;
  vertical-align: middle;
}

.tdvalor{
  width: 10rem;
  height: 100%;
  vertical-align: middle;
}

.tdid{
  width: 3rem;
  height: 100%;
  vertical-align: middle;
}

.tddescricao{
  height: 100%;
  vertical-align: middle;
}

#tabelacardapio th {
    text-align: left;
    text-transform: uppercase;
    background-color: lightblue;
}

#tabelacardapio {
    width: 100%;
    border-collapse: collapse;
    font-family: "Montserrat", sans-serif; 
}

.barraform{
    border-radius: 5px;
    background-color: #DADADA;
    padding: 0.5rem 1rem 0 0;
    margin: 0 8px 0 8px;
    font-family: "Montserrat", sans-serif;
}




  .tabs button {
    padding: 1rem;
    cursor: pointer;
    background-color: #909090;
    border-top-right-radius: 30px;
  }
  
  .tabs .active {
    background-color: #C1BCFF;
    color: #000000;
    border-top-right-radius: 0;
  }
  
  button {
    padding: 5px 10px;
    color: #000000;
    border: none;
    cursor: pointer;
  }

  #imgiconsacoes{
    width: 16px;
    height: 16px;
  }

  #imgiconsacoes:hover{
    transform: scale(1.7);
  }

  </style>
  