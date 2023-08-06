<template>
  <div class="toDoList_body">
      <div class="toDoList_item" v-for="(item, index) in toDoItems" :key="item.id">
        <template v-if="item.state = 'created'">
          <input :value="item.text" type="text" disabled/>
          <div class="item_btns">
            <font-awesome-icon class="btn_item edit" icon="fa-solid fa-pencil" @click="editItem($event)"/>
            <font-awesome-icon class="btn_item complete" icon="fa-solid fa-circle-check" @click="completeItem(index, item.id)" />
            <font-awesome-icon class="btn_item delete" icon="fa-solid fa-circle-xmark" @click="deleteItem(item.id)"/>
          </div>
          <div class="apply">
            <font-awesome-icon class="btn_item complete" icon="fa-solid fa-circle-check" @click="apply($event, item.id)" />
          </div>
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
    completeItem(index, id){
      this.$store.commit('completeItem', {index, id});
    },
    deleteItem(itemId){
      this.$store.dispatch('deleteItem', itemId);
    },
    editItem(event){
      const clickedElement = event.currentTarget;
      const parentElement = clickedElement.parentNode.parentNode;
      
      parentElement.classList.toggle('editing');

      const inputElement = parentElement.querySelector('input');
      inputElement.style.borderColor = 'gray';
      inputElement.removeAttribute('disabled');
    },
    apply(event, id){
      const clickedElement = event.currentTarget;
      const parentElement = clickedElement.parentNode.parentNode;
      const inputElement = parentElement.querySelector('input');
      inputElement.style.borderColor = 'transparent';
      inputElement.setAttribute('disabled', 'disabled');

      this.$store.commit('changeItemValue', {value: inputElement.value, id});

      parentElement.classList.toggle('editing');
    }
  }
}
</script>

<style scoped>
.btn_item{
  cursor: pointer;
  font-size: 18px;
}
.btn_item.edit{
  color: #000000e3;
  transition: .3s ease;
}
.btn_item.edit:hover{
  color: #93005ee3;
}
.btn_item.complete{
  color: #00b13b;
  transition: .3s ease;
}
.btn_item.complete:hover{
  color: #02c242;
}
.btn_item.delete{
  color: #cc0000e3;
  transition: .3s ease;
}
.btn_item.delete:hover{
  color: #e80000e3;
}
.apply{
  display: none;
}
.toDoList_item.editing .item_btns{
  display: none;
}
.toDoList_item.editing .apply{
  display: block;
}
.toDoList_item input{
  background: transparent;
  border-color: transparent;
  border-radius: 10px;
  padding-left: 10px;
}
.item_btns svg{
  margin: 0px 10px;
}
</style>