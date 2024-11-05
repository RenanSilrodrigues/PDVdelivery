<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BannerHome from '@/components/BannerHome.vue';

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

    if (!response.ok) throw new Error('Usuario ou senha incorretos');

    const data = await response.json();
    localStorage.setItem('token', data.token); // Salvar o token no armazenamento local
    router.push({ name: 'aplicativo' });
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro desconhecido';
  }
};

</script>

<template>
  <div class="hero">
    <div>
      <BannerHome />
    </div>
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
        <div class="login-error">
          <p v-if="error">{{ error }}</p>
        </div>
        <div class="login-button">
          <button type="submit">Entrar</button>
        </div>
      </form>
      <p>Ainda não tem uma conta? <router-link to="/Cadastro">Cadastre-se</router-link></p>
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

.login-container{
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  font-family: "Montserrat", sans-serif;
  margin-top: 3rem;
}

.login-button, h2{
  display: flex;
  justify-content: center;
  grid-column: 1 / 3;
}

form{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 1rem;
  padding: 2rem;
}

form [type=text], [type=password]{
  width: 100%;
  margin-top: 10px;
  padding: 8px 20px;
  border-radius: 4px;
  box-sizing: border-box;
}

label{
  display: flex;
  justify-content: center;
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

.login-error{
  color: red;
}
</style>
  