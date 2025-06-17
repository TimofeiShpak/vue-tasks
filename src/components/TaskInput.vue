<template>
  <div class="add-task">
    <input v-model="input" @keyup.enter="submit" placeholder="Новая задача" />
    <button @click="submit">Добавить</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const input = ref('');
const emit = defineEmits(['add']);

const submit = () => {
  if (input.value.trim()) {
    emit('add', input.value);
    input.value = '';
  }
};
</script>

<style scoped>
input {
  width: 70%;
  padding: 0.5em;
}
button {
  padding: 0.5em 1em;
  margin-left: 0.5em;
}
</style>