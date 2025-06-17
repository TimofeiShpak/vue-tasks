<template>
  <div class="app">
    <h1>Список задач</h1>
    <TaskContainer />
  </div>
</template>

<script lang="ts" setup>
import TaskContainer from './components/TaskContainer.vue';
</script>

<style scoped>
.app {
  max-width: 500px;
  margin: auto;
  font-family: Arial;
}
</style>