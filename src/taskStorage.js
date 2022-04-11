const storageName = 'taskList';

export default {
    setTasks: (tasksJSON) => {
        localStorage.setItem(storageName, tasksJSON);
    },

    getTasks: () => {
        const tasksJSON = localStorage.getItem(storageName)
        return tasksJSON;
    }
}