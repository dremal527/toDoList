<template>
  <div class="toDoList_body">
      <div class="toDoList_item" v-for="item in toDoItems" :key="item.id">
        <template v-if="item.state = 'created'">
          <span>{{ item.text }}{{ item.state }}</span>
          <button @click="completeItem(item.id)">Завершить</button>
          <button @click="deleteItem(item.id)">Удалить</button>
        </template>
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
    completeItem(itemId){
      this.$store.dispatch('completeItem', itemId);
    },
    deleteItem(itemId){
      this.$store.dispatch('deleteItem', itemId);
    }
  }
}
</script>
