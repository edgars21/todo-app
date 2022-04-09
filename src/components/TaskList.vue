<template>
    <div v-for="(task, idx) in TaskList" :key="idx">
        {{ task }}
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore();
    const TaskList = computed(() => store.state.taskList);
    return {
        TaskList
    }
  }
}
</script>