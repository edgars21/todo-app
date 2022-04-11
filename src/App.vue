<template>
  <MainLayout></MainLayout>
</template>

<script>
import taskStorage from "./taskStorage.js";
import addTestTasks from "./addTestTasks.js";
import { useStore } from 'vuex';
import MainLayout from './components/MainLayout';


function mountTasksToStore(tasks, store) {
  tasks.forEach(task => {
    const data = {
      task: task
    }
    store.commit('addTask', data);
  })
}

export default {
  components: {
     MainLayout
  },
  
  setup() {
    const store = useStore();
    const storageTasksJSON = taskStorage.getTasks();

    if (storageTasksJSON) {
      mountTasksToStore(JSON.parse(storageTasksJSON), store);
    } else {
      mountTasksToStore(addTestTasks, store);
    }
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
