import { createStore } from 'vuex'

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
    },

    removeTask(state, task) {
      const index = state.taskList.indexOf(task);
      if (index !== -1) {
        state.taskList.splice(index, 1);
      }
    },
    
    archiveTask(state, task) {
        task.archived = true;
    },
    
    unArchiveTask(state, task) {
      task.archived = null;
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
    }
  }
})

export default store;