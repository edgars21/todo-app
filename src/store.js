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
    }
  }
})

export default store;