<script setup lang="ts">

import { ref } from 'vue'

import BannerMenu from '../components/BannerMenu.vue';
import BannerBotoes from '../components/BannerBotoes.vue';
import BannerPedidos from '../components/BannerPedidos.vue';
import BannerFutter from '../components/BannerFutter.vue';

const currentComponent = ref<string | null>(null);

function handleComponentUpdate(component: string) {
  currentComponent.value = component;
}

</script>

<template>
    <BannerMenu />
    <BannerBotoes @updateComponent="handleComponentUpdate" />
    <BannerPedidos :currentComponent="currentComponent" />
    <BannerFutter />
  
</template>

<style scoped>

</style>
