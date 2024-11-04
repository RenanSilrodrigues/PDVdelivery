<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="usuario">Usuário:</label>
          <input type="text" v-model="usuario" />
        </div>
        <div class="input-group">
          <label for="senha">Senha:</label>
          <input type="password" v-model="senha" />
        </div>
        <div class="login-button">
          <button type="submit">Entrar</button>
        </div>
      </form>
      <p>Ainda não tem uma conta? <router-link to="/Cadastro">Cadastre-se</router-link></p>
    </div>
</template>
  
<script>
  export default {
  data() {
    return {
      usuario: '',
      senha: '',
    };
  },
  methods: {
    async login() {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: this.usuario,
          senha: this.senha,
        }),
      });

      if (response.ok) {
        // Redireciona para a página inicial
        localStorage.setItem('isAuthenticated', true);
        this.$router.push('/aplicativo');
      } else {
        alert('Usuário ou senha incorretos!');
      }
    },
  },
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
  