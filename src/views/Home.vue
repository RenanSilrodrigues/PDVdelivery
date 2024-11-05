<template>
  <div class="hero">
    <div class="hero-text">
      <h1>PDVdelivery<img src="/public/images/PDVdelivery.png" alt=""></h1>
      <p>Sistema de gerenciamento de vendas para restaurantes delivery!</p>
    </div>
    <div class="hero-buttons">
      <button><router-link to="/Login">Fazer Login</router-link></button>
      <button><router-link to="/Cadastro">Cadastre-se</router-link></button>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>

.hero{
  max-width: 100%;
  height: 95vh;
  margin: 1rem;
  padding: 3rem;
  background-color: #dadada;
  box-shadow: 2px 2px 5px #a5a5a5;
}

.hero-text{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  row-gap: 1rem;
}

h1{
  font-size: 6rem;
}

img{
  width: 90px;
  position: relative;
  animation-name: example;
  animation-duration: 4s;
}

@keyframes example {
  0%   {left:-900px; top:0px;}
  100% {left:0px; top:0px;}

}

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