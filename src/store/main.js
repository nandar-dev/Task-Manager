import { createStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";
import theme from "./modules/theme.js"

export default createStore({
  state: {
    title: "Assignment",
    assignments: [],
  },
  getters: {
    getAssignment(state) {
      return state.assignments;
    },
  },

  mutations: {
    SET_ASSIGN(state, assignments) {
      state.assignments = assignments;
    },

    SET_TITLE(state, title){
      state.title = title;
    }
    
  },
  actions: {
    async fetchAssignment({ commit }) {
      try {
        const item = await axios.get("http://localhost:4000/assignment");
        commit("SET_ASSIGN", item.data);
      } catch (err) {
        ElMessage.error("Something went wrong");
        console.log(err);
      }
    },
    setTitle({commit},val){
      commit("SET_TITLE",val)
    }
  },
  modules: {
    theme
  }
});
