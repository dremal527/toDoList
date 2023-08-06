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
      console.log(payload)
      state.toDoItems.unshift(payload);
    },
    setNewList(state, payload){
      state.toDoItems = payload;
    },
    completeItem(state, payload){
      this.commit('addToDoItems', {id: uuid.v1(), text: state.toDoItems[payload.index].text, state: 'completed'})
      // state.toDoItems = state.toDoItems.filter(elem => elem.id !== payload.id)
    },
    changeItemValue(state, payload){
      state.toDoItems.map(item => {
        if(item.id == payload.id)
          item.text = payload.value;

        return item;
      });
    }
  }
});

export default store;
