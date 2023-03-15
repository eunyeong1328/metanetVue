<template>
<div v-show="toggle">true</div>
<div v-show="!toggle">false </div>
<button @click="onToggle">Toggle</button>

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
  <div
    v-for="todo in todos"
    :key="todo.id"
   class="card mt-2">
    <div class = "card-body p-2">
      {{ todo.subject }}
    </div>
  </div>
 

</template>

<script>
import { ref } from 'vue';
export default{
  setup(){
    const todo = ref('');
    const todos = ref([
      {id:1, subject: 'vue study'},
      {id:2, subject: 'vue work'}
    ]);

    const toggle = ref(false);

    const onSubmit = (e) => {
      e.preventDefault();
      todos.value.push({
        id: Date.now(),
        subject: todo.value
      }); //객체 형태로 생성
    }

    const onToggle = () =>{
      toggle.value = !toggle.value;
    }

    return{
      todo,
      onSubmit,
      todos,
      toggle,
      onToggle
    }
  }
}
</script>

<style>
.name{
  color: red;
}
</style>
