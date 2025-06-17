<template>
  <div>
    <TaskInput @add="addTask" />
    <TaskFilter @change="setFilter" />

    <div v-if="isLoading" class="loader">Загрузка...</div>

    <ul v-else class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggle"
        @remove="remove"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import TaskInput from './TaskInput.vue';
import TaskItem from './TaskItem.vue';
import TaskFilter from './TaskFilter.vue';

const store = useStore();

const tasks = computed(() => store.getters['tasks/filteredTasks']);
const isLoading = computed(() => store.getters['tasks/isLoading']);

const addTask = (title: string) => store.dispatch('tasks/addTask', title);
const remove = (id: number) => store.dispatch('tasks/deleteTask', id);
const toggle = (id: number) => store.dispatch('tasks/toggleTask', id);
const setFilter = (f: 'all' | 'active' | 'completed') => store.commit('tasks/setFilter', f);

onMounted(() => store.dispatch('tasks/fetchTasks'));
</script>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
}
.loader {
  text-align: center;
  font-weight: bold;
  margin-top: 1em;
}
</style>