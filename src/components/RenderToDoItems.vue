<template>
  <div class="toDoList_body">
    <div class="filterItems">
      <div class="filterItem">
        <span @click="changeSelectState('created')" :class="((selectState == 'created') ? 'active' : '')">В процессе</span>
      </div>
      <div class="filterItem">
        <span @click="changeSelectState('completed')" :class="((selectState == 'completed') ? 'active' : '')">Завершенные</span>
      </div>
    </div>
    <template v-if="countRowsAtActiveState == 0">
      <div class="toDoList_item">
        <span id="zeroRows">Здесь еще нет записей</span>
      </div>
    </template>
    <template v-else v-for="(item, index) in toDoItems">
      <div class="toDoList_item" :key="item.id" v-if="item.state == selectState">
        <input :value="item.text" type="text" disabled/>
        <div class="item_btns">
          <font-awesome-icon v-if="selectState == 'created'" class="btn_item edit" icon="fa-solid fa-pencil" @click="editItem($event)"/>
          <font-awesome-icon v-if="selectState == 'created'" class="btn_item complete" icon="fa-solid fa-circle-check" @click="completeItem(index, item.id)" />
          <font-awesome-icon class="btn_item delete" icon="fa-solid fa-circle-xmark" @click="deleteItem(item.id)"/>
        </div>
        <div class="apply">
          <font-awesome-icon class="btn_item complete" icon="fa-solid fa-circle-check" @click="apply($event, item.id)" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'RenderToDoItems',
  data(){
    return {
      selectState: 'created'
    }
  },
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
    },
    changeSelectState(newState){
      this.selectState = newState;
    }
  },
  computed:{
    countRowsAtActiveState(){
      let filterRows = this.toDoItems.filter(item => item.state == this.selectState);
      return filterRows.length;
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
.toDoList_item{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0px 0px 0px;
  padding: 10px;
  background: white;
  border-radius: 10px;
}
.filterItems{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
  font-size: 18px;
}
.filterItem span{
  padding: 10px;
  transition: all .3s;
  cursor: pointer;
}
.filterItem span.active{
  border-bottom: 1px solid white;
  color: white;
}
#zeroRows{
  width: 100%;
  text-align: center;
  height: 21px;
}

@media (max-width: 500px){
  .filterItems{
    height: auto;
  }
  .filterItem{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .toDoList_body{
    margin-top: 20px;
  }
  .toDoList_item{
    width: 90%;
  }
  .toDoList_item:last-of-type{
    margin-bottom: 20px;
  }
  .filterItems{
    flex-direction: column;
  }
}
</style>