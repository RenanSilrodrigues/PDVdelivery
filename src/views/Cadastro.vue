<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

import BannerHome from '../components/BannerHome.vue';

const router = useRouter();

const nome = ref<string>('');
const username = ref<string>('');
const telefone = ref<string>('');
const password = ref<string>('');

const cadastrar = async () => {
  try {
    const response = await fetch('http://localhost:5000/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome.value,
        username: username.value,
        telefone: telefone.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      toast.success('Cadastro realizado com sucesso! Faça login.', {
        "theme": "dark",
        "type": "success",
        "position": "top-center",
        "dangerouslyHTMLString": true
      });
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } else {
      toast.error('Erro ao cadastrar usuário.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    toast.error('Erro ao cadastrar usuário.');
  }
};
</script>

<template>
  <div class="hero">
    <div>
      <BannerHome />
    </div>
    <div class="register-container">
      <h2>Cadastro</h2>
      <form @submit.prevent="cadastrar">
        <div class="input-group">
          <label for="nome">Nome:</label>
          <input type="text" v-model="nome" required />
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="telefone">Telefone:</label>
          <input type="tel" v-model="telefone" required />
        </div>
        <div class="input-group">
          <label for="password">Senha:</label>
          <input type="password" v-model="password" required />
        </div>
        <div class="register-button">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      <p>Já tem uma conta?<router-link to="/login">Faça login</router-link></p>
    </div>
  </div>
</template>
  
<style scoped>

.hero{
  max-width: 100%;
  height: 95vh;
  margin: 1rem;
  padding: 3rem;
  background-color: #dadada;
  box-shadow: 2px 2px 5px #a5a5a5;
}

.register-container{
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  font-family: "Montserrat", sans-serif;
  margin-top: 3rem;
}

.register-button, h2{
  display: flex;
  justify-content: center;
  grid-column: 1 / 3;
}

form{
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 2rem;
}

form [type=text], [type=password], [type=tel]{
  width: 100%;
  margin-top: 10px;
  padding: 8px 20px;
  border-radius: 4px;
  box-sizing: border-box;
}

label{
  font-size: 0.8rem;
}

p{
  display: flex;
  justify-content: center;
}

h2{
  font-size: 2rem;
}

button[type=submit] {
    background-color: #837AFE;
    color: black;
    font-family: "Montserrat", sans-serif;
    width: 150px;
    border-radius: 10px;
    padding: 8px 0;
    cursor: pointer;
}

</style>
  