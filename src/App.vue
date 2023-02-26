<script setup>
import Alert from "./components/Alert.vue";
import Loading from "./components/Loading.vue";
import Model from "./components/Model.vue";
import Nav from "./components/Nav.vue";
</script>

<template>
  <div class="h-screen w-screen overflow-auto">
    <router-view name="Nav"></router-view>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
