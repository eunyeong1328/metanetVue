<template>
<div class ="container">
  <h2>To-Do</h2>
  <form class="d-flex" 
  @submit.prevent="onSubmit">
    <div class = "flex-grow-1 mr-2">
      <input
        class = "form-control"
        type = "text"
        v-model="todo"
        placeholder="Type new to-do"
        >
    </div>
    <div>
      <button
        class = "btn btn-primary"
        type="submit">
        Add
      </button>
    </div>
  </form>
  {{todos}}
</div>
</template>

<script>
import { ref } from 'vue';
export default{
  setup(){
    const todo = ref('');
    const todos = ref([]);

    const onSubmit = (e) => {
      e.preventDefault();
      todos.value.push({
        id: Date.now(),
        subject: todo.value
      }); //객체 형태로 생성
    }

    return{
      todo,
      onSubmit,
      todos,
    }
  }
}
</script>

<style>
.name{
  color: red;
}
</style>
