<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
    <div class="flex flex-row" style="width:100%;">
      <NavBar></NavBar>
      <div class="min-w-[75%]">
        <RouterView/>
      </div>
     
    </div> 
</template>

<style scoped>

</style>

