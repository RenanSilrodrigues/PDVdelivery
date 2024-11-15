<script setup lang="ts">

import { ref, onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
    const cepInput = document.getElementById('cep') as HTMLInputElement;
    const textInputs = document.querySelectorAll('input[type="text"]') as NodeListOf<HTMLInputElement>;

    cepInput.addEventListener('input', (event) => {
        let input = event.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = `${value.slice(0, 5)}-${value.slice(5)}`;
        }
        input.value = value;
    });

    function capitalizeFirstLetter(str: string) {
        return str.replace(/(^\w|\s\w)/g, (char) => {
            return char.toUpperCase();
        });
    }

    textInputs.forEach(input => {
        input.addEventListener('input', function () {
            this.value = capitalizeFirstLetter(this.value);
        });
    });
});

onMounted(() => {
    buscarClientes();
});

const clientes = ref<Array<any>>([]);
const novoCliente = ref({
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    complemento: '',
    nomecliente: ''
});

const buscarClientes = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/clientes');
        clientes.value = response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
};

const adicionarCliente = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/clientes', novoCliente.value);
        clientes.value.push(response.data.cliente);
        novoCliente.value = { telefone: '', cep: '', endereco: '', numero: '', bairro: '', complemento: '', nomecliente: '' };
        alert('Cliente cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente. Tente novamente.');
    }
};

</script>

<template>
    <div class="hero-cliente">
        <div class="titulo">
            <img src="../../public/images/iconClientes.png">
            <h1>CADASTRAR CLIENTE</h1>
        </div>
        <div class="barraform">
            <form @submit.prevent="adicionarCliente" id="formcliente" autocomplete="off">
                <div class="tel">
                    <label for="telefone">Telefone</label><br>
                    <input type="tel" v-model="novoCliente.telefone" id="telefone" name="telefone" maxlength="15" required>
                </div>

                <div class="cep">
                    <label for="cep">Cep</label><br>
                    <input type="tel" v-model="novoCliente.cep" id="cep" name="cep" maxlength="9" required>
                </div>

                <div class="endereco">
                    <label for="">Endereço</label><br>
                    <input type="text" v-model="novoCliente.endereco" name="endereco" required>
                </div>

                <div class="numero">
                    <label for="">Numero</label><br>
                    <input type="number" v-model="novoCliente.numero" name="numero" required>
                </div>

                <div class="bairro">
                    <label for="">Bairro</label><br>
                    <input type="text" v-model="novoCliente.bairro" name="bairro" required>
                </div>

                <div class="complemento">
                    <label for="">Complemento</label><br>
                    <input type="text" v-model="novoCliente.complemento" name="complemento" required>
                </div>

                <div class="nome">
                    <label for="">Nome</label><br>
                    <input type="text" v-model="novoCliente.nomecliente" name="nomecliente" required>
                </div>

                <div class="botao-cadastrar">
                    <input type="submit" value="CADASTRAR">
                </div>

            </form>
        </div>

        <div class="barratabela">
            <table id="tabelacliente">
                <thead>
                    <tr>
                        <th>Telefone</th>
                        <th>Cep</th>
                        <th>Endereço</th>
                        <th>Numero</th>
                        <th>Bairro</th>
                        <th>Complemento</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientes" :key="cliente._id">
                        <td>{{ cliente.telefone }}</td>
                        <td>{{ cliente.cep }}</td>
                        <td>{{ cliente.endereco }}</td>
                        <td>{{ cliente.numero }}</td>
                        <td>{{ cliente.bairro }}</td>
                        <td>{{ cliente.complemento }}</td>
                        <td>{{ cliente.nome }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

.hero-cliente{
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

#formcliente{
    display: grid;
    grid-template-columns: 8rem 1rem auto auto 6rem auto auto;
    column-gap: 2rem;
    row-gap: 1rem;
}

.tel{
    grid-column-start: 1;
    grid-column-end: 3;
}

.cep{
    grid-column-start: 1;
    grid-column-end: 2;
}

.endereco{
    grid-column-start: 2;
    grid-column-end: 5;
}

.bairro{
    grid-column-start: 6;
    grid-column-end: 7;
}

.nome{
    grid-column-start: 1;
    grid-column-end: 5;
}

#formcliente [type=text], [type=tel], [type=number]  {
    width: 100%;
    margin-top: 10px;
    padding: 8px 20px;
    border-radius: 4px;
    box-sizing: border-box; 
}

#formcliente [type=text], [type=tel]:focus{
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

#tabelacliente td,
#tabelacliente th {
    border: 1px solid;
    padding: 8px;
}

#tabelacliente th {
    text-align: left;
    text-transform: uppercase;
    background-color: lightblue;
}

#tabelacliente{
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
    grid-column-start: 7;
    grid-column-end: 8;
    padding: 1rem;
}

</style>