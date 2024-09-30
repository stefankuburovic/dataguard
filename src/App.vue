<template>
  <div id="app" class="m-auto content-center justify-center flex-col">
    <h1 class="text-2xl mb-14">Dataguard Challenge</h1>
    <MainLayout />
  </div>
</template>

<script>
import MainLayout from './components/MainLayout.vue';

export default {
  components: {
    MainLayout
  }
};
</script>

<style>

#app {
  display: flex;
  width: 1280px;
  height: 100vh;
  margin: 0 auto;
}
</style>
