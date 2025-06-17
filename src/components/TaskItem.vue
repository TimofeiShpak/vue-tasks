<template>
  <li>
    <label>
      <input type="checkbox" :checked="task.completed" @change="$emit('toggle', task.id)" />
      <span :class="{ done: task.completed }">{{ task.title }}</span>
    </label>
    <button @click="$emit('remove', task.id)">Удалить</button>
  </li>
</template>

<script lang="ts" setup>
import type { Task } from '../store/modules/tasks';

defineProps<{ task: Task }>()
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5em 0;
}
</style>