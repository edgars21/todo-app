<template>
  <MainLayout></MainLayout>
</template>

<script>
import addTestTasks from "./addTestTasks";
import { useStore } from 'vuex'
import MainLayout from './components/MainLayout'

export default {
  components: {
     MainLayout
  },
  
  setup() {
    const store = useStore();
    addTestTasks(store);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
