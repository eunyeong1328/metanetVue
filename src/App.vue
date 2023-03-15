<template>

  <h2>To-Do</h2>
  <form class="d-flex"  @submit.prevent="onSubmit">
    <div>
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
        type="submit"
        >
        Add
      </button>
    </div>
    </div>
    <div v-if="hasError" style="color: red">
      This is cannot be empty
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

    const hasError = ref(false);
    const onSubmit = () => {
        if(todo.value == ''){
          hasError.value = true;
        }else{
          todos.value.push({
          id: Date.now(),
          subject: todo.value
        }); //객체 형태로 생성
        hasError.value = false;
      }  
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
