<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="text" v-model="username" required/>
        </div>
        <div class="input-group">
          <label for="password">Senha:</label>
          <input type="password" v-model="password" required/>
        </div>
        <div class="login-button">
          <button type="submit">Entrar</button>
        </div>
      </form>
      <p v-if="error">{{ error }}</p>
      <p>Ainda não tem uma conta? <router-link to="/Cadastro">Cadastre-se</router-link></p>
    </div>
</template>
  
<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref<string>('');
const password = ref<string>('');
const error = ref<string | null>(null);

const login = async () => {
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    if (!response.ok) throw new Error('Email ou senha incorretos');

    const data = await response.json();
    localStorage.setItem('token', data.token); // Salvar o token no armazenamento local
    router.push({ name: 'aplicativo' });
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro desconhecido';
  }
};

</script>

<style scoped>

.login-container{
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  font-family: "Montserrat", sans-serif;
}

.login-button, h2{
  display: flex;
  justify-content: center;
  grid-column: 1 / 3;
}

form{
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1rem;
  row-gap: 1rem;
}

form [type=text], [type=password]{
  width: 100%;
  margin-top: 10px;
  padding: 8px 20px;
  border-radius: 4px;
  box-sizing: border-box;
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
  