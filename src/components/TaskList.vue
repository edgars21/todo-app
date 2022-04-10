<template>
    <div class="TaskList">
      <div v-for="(task, idx) in TaskList" :key="idx" class="TaskList__singleTask">
        <SingleTask :task-data="task"></SingleTask>      
      </div>
    </div>
    <div class="AddNewTask">
      <button class="AddNewTask__bt" @click="openForm = true">Add new task</button>
    </div>
    <AddTaskForm @closed="openForm = false" :is-open="openForm"></AddTaskForm>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import SingleTask from './SingleTask'
import AddTaskForm from './AddTaskForm'

export default {
  components: {
    SingleTask,
    AddTaskForm
  },

  setup () {
    const store = useStore();
    const TaskList = computed(() => store.state.taskList);
    const openForm = ref(false);

    return {
      TaskList,
      openForm,
    }
  }
}
</script>

<style>
.TaskList__singleTask:not(:last-child) {
  border-bottom: 1px solid #D3D3D3;
}

.AddNewTask__bt {
  display: block;
  margin-top: 20px;
  padding: 5px 10px;
  cursor: pointer;  
}
</style>