<template>
  <div id="toDoList">
      <div class="toDoList_header">
        <input v-model="toDoText" type="text">
        <button @click="addToDoItem"><font-awesome-icon icon="fa-solid fa-pencil" /></button>
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

<style>
  @import url('https://fonts.googleapis.com/css2?family=Caprasimo&family=Ubuntu:wght@300;400&display=swap');

  body{
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    background: linear-gradient(45deg, #de008de3, #790ca7);
    font-family: 'Ubuntu', sans-serif;
  }

  #toDoList{
    width: 100%;
    max-width: 1200px;
    height: 100vh;

    display: flex;
    justify-content: flex-start;
    margin: 50px auto 0px auto;
    align-items: center;
    flex-direction: column;
  }
  .toDoList_body{
    width: 100%;
    max-width: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .toDoList_header{
    width: 100%;
    max-width: 500px;
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toDoList_header input{
    border: none;
    outline: none;

    padding-left: 20px;
    border-radius: 10px;

    font-size: 18px;

    width: 100%;
    max-width: 400px;
    height: 40px;
  }

  .toDoList_header button{
    height: 40px;
    width: 40px;

    border-radius: 50%;
    margin-left: 20px;

    border: none;
    cursor: pointer;

    color: #93005ee3;
    font-size: 14px;
    background:  white;

    transition: all 1s ease;
  }

  .toDoList_header button:hover{
    color: white;
    background: #e4029161;
  }

  @media (max-width: 500px){
    .toDoList_header{
      flex-wrap: wrap;
      height: auto;
    }
    .toDoList_header input{
      width: 90%;
    }
    .toDoList_header button{
      margin-top: 10px;
      margin-left: 0px;
    }
  }
</style>