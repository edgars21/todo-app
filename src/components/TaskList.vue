<template>
    <div class="TaskList">
      <div v-for="(task, idx) in TaskList" :key="idx" class="TaskList__singleTask">
        <SingleTask :task-data="task"></SingleTask>      
      </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SingleTask from './SingleTask'

export default {
  components: {
    SingleTask
  },

  setup () {
    const store = useStore();
    const TaskList = computed(() => store.state.taskList);
    return {
      TaskList,
    }
  }
}
</script>

<style>
.TaskList__singleTask:not(:first-child) {
  border-bottom: 1px solid #D3D3D3;
}
</style>