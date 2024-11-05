<script setup lang="ts">

</script>

<template>
    <div class="hero-text">
      <h1>PDVdelivery<img src="/public/images/PDVdelivery.png" alt=""></h1>
      <p>Sistema de gerenciamento de vendas para restaurantes delivery!</p>
    </div>
</template>

<style scoped>

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

</style>