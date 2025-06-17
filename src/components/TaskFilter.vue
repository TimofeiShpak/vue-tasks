<template>
  <div class="filters">
    <button @click="$emit('change', 'all')">Все</button>
    <button @click="$emit('change', 'active')">Активные</button>
    <button @click="$emit('change', 'completed')">Выполненные</button>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['change'])
</script>

<style scoped>
button {
  margin: 0.5em;
}
</style>