import { createStore } from 'vuex';
import tasks from './tasks';

export default createStore({
  modules: {
    tasks,
  },
});