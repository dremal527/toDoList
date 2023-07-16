<template>
  <div id="toDoList">
      <div class="toDoList_header">
        <input v-model="toDoText" type="text">
        <button @click="addToDoItem">Добавить</button>
      </div>
      <RenderToDoItems :toDoItems="toDoItems"/>
  </div>
</template>

<script>
/* eslint-disable */
import RenderToDoItems from './components/RenderToDoItems.vue'

export default {
  name: 'App',
  data(){
    return{
      toDoText: ''
    }
  },
  components: {
    RenderToDoItems
  },
  methods:{
    addToDoItem(){
      if(this.toDoText == ''){
        alert('Введи сообщение');
        return false;
      }

      this.$store.dispatch('addToDoItems', this.toDoText);
      this.toDoText = '';
    }
  },
  computed: {
    toDoItems(){
      return this.$store.getters.toDoItems;
    }
  }
}
</script>