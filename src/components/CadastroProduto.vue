<script setup lang="ts">

import { ref, onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(input => {
        input.addEventListener('input', function (this: HTMLInputElement) {
            this.value = capitalizeFirstLetter(this.value);
        });
    });

    const valorInput = document.getElementById('valor') as HTMLInputElement;
    if (valorInput) {
        valorInput.addEventListener('input', function (this: HTMLInputElement) {
            let inputValue = this.value.replace(/,/g, '');
            this.value = formatNumberWithCommas(inputValue);
        });
    }

    function capitalizeFirstLetter(str: string): string {
    return str.replace(/(^\w|\s\w)/g, function (char) {
        return char.toUpperCase();
    });
}

    function formatNumberWithCommas(value: string): string {
        return value.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    }
});

onMounted(() => {
    buscarProdutos();
});

const produtos = ref<Array<any>>([]);
const novoProduto = ref({
    tipo: '',
    descricao: '',
    valor: ''
});

const buscarProdutos = async () => {
try {
    const response = await axios.get('http://localhost:5000/api/produtos');
    produtos.value = response.data;
} catch (error) {
    console.error('Erro ao buscar dados:', error);
}
};

const adicionarProduto = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/produtos', novoProduto.value);
        produtos.value.push(response.data.produto);
        novoProduto.value = { tipo: '', descricao: '', valor: '' };
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        alert('Erro ao cadastrar produto. Tente novamente.');
    }
};

</script>

<template>
    <div class="hero-produto">
        <div class="titulo">
            <img src="../../public/images/iconCadastro.png">
            <h1>CADASTRAR PRODUTO</h1>
        </div>
        <div class="barraform">
            <form @submit.prevent="adicionarProduto" id="formproduto" autocomplete="off">
                <div class="tipo">
                    <label for="tipo">TIPO DE PRODUTO</label>
                    <select v-model="novoProduto.tipo" id="tipodeproduto" required>
                        <option value="selecione">Selecione</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Hamburguer">Hambúrguer</option>
                        <option value="Esfiha">Esfiha</option>
                        <option value="Hotdog">HotDog</option>
                        <option value="Pastel">Pastel</option>
                        <option value="Espetinho">Espetinho</option>
                        <option value="Salgados">Salgados</option>
                        <option value="Marmitex">Marmitex</option>
                        <option value="Lanchenatural">Lanche Natural</option>
                        <option value="Tapioca">Tapioca</option>
                        <option value="Japonesa">Japonesa</option>
                        <option value="Acai">Açai</option>
                        <option value="Sobremesas">Sobremesas</option>
                        <option value="Bebidas">Bebidas</option>
                    </select>
                </div>

                <div class="descricao">
                    <label for="descricao">DESCRIÇÃO DO PRODUTO</label>
                    <input type="text" v-model="novoProduto.descricao" required>
                </div>

                <div class="valor">
                    <label for="valor">VALOR R$</label>
                    <input type="tel" v-model="novoProduto.valor" id="valor" required>
                </div>

                <div class="botao-cadastrar">
                    <input type="submit" value="CADASTRAR">
                </div>
            </form>
        </div>

        <div class="barratabela">
            <table id="tabeladecadastro">
                <thead>
                    <tr>
                        <th><strong>Id</strong></th>
                        <th><strong>Tipo</strong></th>
                        <th><strong>Descrição</strong></th>
                        <th><strong>Valor</strong></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="produto in produtos" :key="produto.id">
                        <td>{{ produto.id }}</td>
                        <td>{{ produto.tipo}}</td>
                        <td>{{ produto.descricao}}</td>
                        <td>{{ produto.valor }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>  

.hero-produto{
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

#formproduto, select{
    display: grid;
    grid-template-columns: auto auto 10rem;
    column-gap: 2rem;
    row-gap: 1rem;
}

.tipo{
    grid-column-start: 1;
    grid-column-end: 2;
}

.descricao{
    grid-column-start: 1;
    grid-column-end: 3;
}

.botao-cadastrar{
    grid-column-start: 3;
    grid-column-end: 4;
}

#formproduto [type=text], [type=tel], select{
    width: 100%;
    margin-top: 10px;
    padding: 8px 20px;
    border-radius: 4px;
    box-sizing: border-box;
}

#formproduto [type=text], [type=tel]:focus{
    outline-color: red;
}

select:focus{
    outline-color: red;
}

.barraform{
    border-radius: 5px;
    background-color: #DADADA;
    padding: 1rem;
    margin: 8px;
    font-family: "Montserrat", sans-serif;
    box-shadow: 2px 2px 5px #a5a5a5;
}

#tabeladecadastro td, 
#tabeladecadastro th {
    border: 1px solid;
    padding: 8px;
}

#tabeladecadastro th {
    text-align: left;
    text-transform: uppercase;
    background-color: lightblue;
}

#tabeladecadastro {
    width: 100%;
    border-collapse: collapse;
    font-family: "Montserrat", sans-serif; 
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

input[type=submit] {
    background-color: #837AFE;
    color: black;
    font-family: "Montserrat", sans-serif;
    width: 150px;
    border-radius: 10px;
    padding: 8px 0;
    cursor: pointer;
}

.botao-cadastrar{
    display: flex;
    justify-content: end;
    gap: 30px;
}



</style>