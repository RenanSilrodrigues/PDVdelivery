<template>
    <div class="hero-buttons">
      <button><router-link to="/Login">Fazer Login</router-link></button>
      <button><router-link to="/Cadastro">Cadastre-se</router-link></button>
    </div>
</template>

<script>

</script>

<style scoped>

.hero-buttons{
  display: flex;
  gap: 5rem;
  padding: 5rem;
}

button{
    background-color: #837AFE;
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
    text-decoration: none;
    font-family: "Montserrat", sans-serif;
    cursor: pointer;
}

button:hover{
    background-color: #BFBAFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}

</style>