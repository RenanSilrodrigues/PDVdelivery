<template>
    <div class="register-container">
      <h2>Cadastro</h2>
      <form @submit.prevent="cadastrar">
        <div class="input-group">
          <label for="nome">Nome:</label>
          <input type="text" v-model="nome" required />
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="text" v-model="usuario" required />
        </div>
        <div class="input-group">
          <label for="telefone">Telefone:</label>
          <input type="tel" v-model="telefone" required />
        </div>
        <div class="input-group">
          <label for="senha">Senha:</label>
          <input type="password" v-model="senha" required />
        </div>
        <div class="register-button">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      <p>Já tem uma conta?<router-link to="/login">Faça login</router-link></p>
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
    async cadastrar() {
      const response = await fetch('http://localhost:5000/cadastrar', {
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
        alert('Cadastro realizado com sucesso! Faça login.');
        this.$router.push('/login');
      } else {
        alert('Erro ao cadastrar usuário.');
      }
    },
  },
};
  
</script>
  
<style scoped>

.register-container{
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  font-family: "Montserrat", sans-serif;
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
}

form [type=text], [type=password], [type=tel]{
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
  