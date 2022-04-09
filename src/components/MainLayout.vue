<template>
  <div class="section-contained">
    <TaskList></TaskList>
  </div>
</template>

<script>
import TaskList from './TaskList'

export default {
  components: {
     TaskList
  }
}
</script>

<style scoped>
  .section-contained {
    padding: 50px 0;
    max-width: 800px;
    margin: 0 auto;
  }
</style>