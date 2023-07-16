import Vue from 'vue';
import Vuex from 'vuex';
import { uuid } from 'vue-uuid';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    toDoItems: []
  },
  getters: {
    toDoItems: state => state.toDoItems
  },
  actions: {
    addToDoItems({commit}, payload){
      commit('addToDoItems', {id: uuid.v1(), text: payload, state: 'created'})
    },
    deleteItem({commit, state}, payload){
      const clearedList = state.toDoItems.filter(elem => elem.id !== payload)
      commit('setNewList', clearedList);
    }
  },
  mutations: {
    addToDoItems(state, payload){
      state.toDoItems.unshift(payload);
    },
    setNewList(state, payload){
      state.toDoItems = payload;
    }
  }
});

export default store;
