import { createStore } from 'vuex';
import taskStorage from "./taskStorage.js";

function saveTasks(state) {
  taskStorage.setTasks(JSON.stringify(state.taskList));  
}

const store = createStore({
  state () {
    return {
      taskList: []
    }
  },
  mutations: {
    addTask(state, data) {
      const subTask = data.flags?.subtask;
      const task = data.task;

      state.taskList.push(task);

      if (subTask) {
        const parentTask = state.taskList.find(task => task.id === subTask);
        console.log(parentTask)
        if (!parentTask) return;
        if (!parentTask.subtasks) parentTask.subtasks = [];
        parentTask.subtasks.push(task.id);
      }

      saveTasks(state);
    },

    removeTask(state, task) {
      const index = state.taskList.indexOf(task);
      if (index !== -1) {
        state.taskList.splice(index, 1);
      }

      saveTasks(state);
    },
    
    archiveTask(state, task) {
      task.archived = true;

      saveTasks(state);
    },
    
    unArchiveTask(state, task) {
      task.archived = null;

      saveTasks(state);
    },
    
    updateTask(state, data) {
      const task = state.taskList.find(task => task == data.oldData);
      if (task) {
        console.log(data.newData.notes)
        task.title = data.newData.title
        task.subTitle = data.newData.subTitle
        task.notes = data.newData.notes
        task.priority = data.newData.priority      

      }

      saveTasks(state);
    }
  }
})

export default store;