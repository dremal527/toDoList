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
    },
    completeItem({commit, state}, payload){
      let index = state.toDoItems.findIndex(elem => elem.id == payload);

      if(index !== -1)
        commit('completeItem', {index});
    }
  },
  mutations: {
    addToDoItems(state, payload){
      state.toDoItems.unshift(payload);
    },
    setNewList(state, payload){
      state.toDoItems = payload;
    },
    completeItem(state, payload){
      state.toDoItems.push({...state.toDoItems[payload.index], state: 'completed'});
      delete state.toDoItems[payload.index];
    }
  }
});

export default store;
