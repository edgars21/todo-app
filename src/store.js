import { createStore } from 'vuex'


// Create a new store instance.
const store = createStore({
  state () {
    return {
      taskList: []
    }
  },
  mutations: {
    addTask(state, task) {
      state.taskList.push(task);
    },

    removeTask(state, task) {
      const index = state.taskList.indexOf(task);
      if (index !== -1) {
        state.taskList.splice(index, 1);
      }
    }    
  }
})

export default store;