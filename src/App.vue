<template>
  <div class="hero">
   <div class="hero-text">
      <h1>PDVdelivery<img src="../public/images/PDVdelivery.png" alt=""></h1>
      <p>Sistema de gerenciamento de vendas para restaurantes delivery!</p>
    </div>
    <div class="router">
      <router-view/>
    </div>
  </div>
</template>

<script setup>


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

.router{
  display: flex;
  justify-content: center;
  margin-top: 5rem;
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

</style>
