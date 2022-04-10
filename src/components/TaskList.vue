<template>
    <div class="TaskList">
      <div v-for="task in activeTasks" :key="task.id" class="TaskList__singleTask">
        <SingleTask @addSubTask="handleAddSubTask" :task-data="task"></SingleTask>      
      </div>
    </div>
    <div class="AddNewTask">
      <button class="AddNewTask__bt" @click="handleAddTask">Add new task</button>
    </div>
    <div class="DoneTaskList">
      <h2>Done tasks:</h2>
      <div v-for="task in doneTasks" :key="task.id" class="DoneTaskList__singleTask">
        <SingleTask :task-data="task"></SingleTask>      
      </div>
    </div>    
    <AddTaskForm @closed="openForm = false" :is-open="openForm" :sub-task="openFormSubTask"></AddTaskForm>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import SingleTask from './SingleTask';
import AddTaskForm from './AddTaskForm';

export default {
  components: {
    SingleTask,
    AddTaskForm
  },

  setup () {
    const store = useStore();
    const allTasks = computed(() => store.state.taskList);
    const taskList = computed(() => allTasks.value.filter(task => !(task.isSubtask === true)));
    const openForm = ref(false);
    const openFormSubTask = ref(null);

    const activeTasks = computed(() => {
      return taskList.value.filter((task) => task.archived !== true) 
    });

    const doneTasks = computed(() => {
      return taskList.value.filter((task) => task.archived === true);
    });

    function handleAddTask() {
      openFormSubTask.value = null;
      openForm.value = true;      
    }

    function handleAddSubTask(data) {
      openFormSubTask.value = data;
      openForm.value = true;
    }

    return {
      openForm,
      activeTasks,
      doneTasks,
      handleAddTask,
      handleAddSubTask,
      openFormSubTask,
    }
  }
}
</script>

<style>
.TaskList__singleTask:not(:last-child) {
  border-bottom: 1px solid #D3D3D3;
}

.DoneTaskList__singleTask:not(:last-child) {
  border-bottom: 1px solid #D3D3D3;
}

.DoneTaskList {
  margin-top: 50px;
}

.AddNewTask__bt {
  display: block;
  margin-top: 20px;
  padding: 5px 10px;
  cursor: pointer;  
}

.DoneTaskList .SubTasks__addBt {
  display: none;
}
</style>