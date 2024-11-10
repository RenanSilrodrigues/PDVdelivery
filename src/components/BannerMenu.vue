<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push({ name: 'home' });
};

</script>

<template>
    <div class="barra_menu">
        <div class="nomerestaurante">
            <p>{NOME DO RESTAURANTE}</p>
        </div>
        <nav class="botoesnav">
            <ul class="listamenu">
                <li>Menu</li>
                <li>Sobre</li>
                <li @click="logout">Sair</li>
            </ul>
            <label class="toggle">Abrir Restaurante:
                <input class="toggle-checkbox" type="checkbox">
                <div class="toggle-switch"></div>
            </label>
        </nav>
    </div>  
</template>

<style scoped>  

.barra_menu{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    padding: 20px;
    font-family: "Montserrat", sans-serif;
    background-color: #000000;
    color: #ffffff;
}

.nomerestaurante{
    display: flex;
    position: relative;
    margin-right: auto;
}

.botoesnav{
    display: flex;
    align-items: center;
    gap: 130px;
}

.listamenu{
    display: flex;
    color: #ffffff;
    gap: 30px;
    text-decoration: underline;
    cursor: pointer;
}


/* Toggle Switch */
.toggle {
    cursor: pointer;
    display: inline-block;
}

.toggle-switch {
    display: inline-block;
    background: #DADADA;
    border-radius: 1.6rem;
    width: 4.8rem;
    height: 2.2rem;
    position: relative;
    vertical-align: middle;
    transition: background 0.25s;
}

.toggle-switch:before, .toggle-switch:after {
    content: "";
}

.toggle-switch:before {
    display: block;
    background: linear-gradient(to bottom, #fff 0%, #eee 100%);
    border-radius: 50%;
    width: 2.0rem;
    height: 2.0rem;
    position: absolute;
    top: 0.1rem;
    left: 0.3rem;
    transition: left 0.25s;
}

.toggle:hover .toggle-switch:before {
    background: linear-gradient(to bottom, #fff 0%, #fff 100%);
}

.toggle-checkbox:checked + .toggle-switch {
    background: #837AFE;
}

.toggle-checkbox:checked + .toggle-switch:before {
    left: 2.5rem;
}

.toggle-checkbox {
    position: absolute;
    visibility: hidden;
}


</style>