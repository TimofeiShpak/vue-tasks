import type { Module } from 'vuex';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TasksState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  loading: boolean;
}

const delay = (data: any) => new Promise(resolve => setTimeout(() => resolve(data), 500));

let taskId = 1;

let localTasks: Task[] = [{ id: taskId++, title: 'Sample Task', completed: false }];

const api = {
  getTasks: () => delay([...localTasks]),
  addTask: (title: string) => {
    const task = { id: taskId++, title, completed: false };
    localTasks.push(task);
    return delay(task);
  },
  deleteTask: (id: number) => {
    localTasks = localTasks.filter(t => t.id !== id);
    return delay(id);
  },
  updateTask: (task: Task) => {
    const index = localTasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      localTasks.splice(index, 1, task);
    }
    return delay(task);
  },
};

const tasks: Module<TasksState, any> = {
  namespaced: true,
  state: () => ({
    tasks: [],
    filter: 'all',
    loading: false,
  }),
  mutations: {
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
    deleteTask(state, id: number) {
      state.tasks = state.tasks.filter(t => t.id !== id);
    },
    toggleTask(state, updated: Task) {
      const index = state.tasks.findIndex(t => t.id === updated.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updated);
      }
    },
    setFilter(state, filter: TasksState['filter']) {
      state.filter = filter;
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      commit('setLoading', true);
      const tasks = await api.getTasks();
      commit('setTasks', tasks);
      commit('setLoading', false);
    },
    async addTask({ commit }, title: string) {
      commit('setLoading', true);
      const task = await api.addTask(title);
      commit('addTask', task);
      commit('setLoading', false);
    },
    async deleteTask({ commit }, id: number) {
      commit('setLoading', true);
      await api.deleteTask(id);
      commit('deleteTask', id);
      commit('setLoading', false);
    },
    async toggleTask({ commit, state }, id: number) {
      commit('setLoading', true);
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        const updated = await api.updateTask({ ...task, completed: !task.completed });
        commit('toggleTask', updated);
      }
      commit('setLoading', false);
    },
  },
  getters: {
    filteredTasks(state): Task[] {
      if (state.filter === 'completed') return state.tasks.filter(t => t.completed);
      if (state.filter === 'active') return state.tasks.filter(t => !t.completed);
      return state.tasks;
    },
    isLoading(state): boolean {
      return state.loading;
    },
  },
};

export default tasks;