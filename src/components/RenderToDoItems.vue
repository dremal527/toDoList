<template>
  <div class="toDoList_body">
      <div class="toDoList_item" v-for="item in toDoItems" :key="item.id">
        <span>{{ item.text }}</span>
        <button @click="deleteItem(item.id)">Удалить</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'RenderToDoItems',
  props: {
    toDoItems: {
      type: Array,
      required: true
    }
  },
  methods:{
    deleteItem(itemId){
      this.$store.dispatch('deleteItem', itemId);
    }
  }
}
</script>
