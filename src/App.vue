<template>
<div class ="container">
  <h2>To-Do</h2><!--@add-todo이름 지정 후 "add-todo"로 호출될 함수-->
  <TodoSimpleForm @add-todo="addTodo"/>

  <div v-if = "!todos.length" style = "color: rebeccapurple">
    추가된 todo가 없습니다.
  </div>
  
  <!-- {{todos}} -->
  <!-- v-for를 사용할 때 반드시 :key 사용 -->
  <div v-for="(todo,index) in todos" :key="todo.id" class="card mt-2">
    <div class = "card-body p-2 d-flex align-items-center">
      <div class ="form-check flext-grow-1">
        <input class = "form-check-input" type = "checkbox" v-model="todo.completed"> 
        <label class = "form-check-label" :class = "{todo: todo.completed}"> {{ todo.subject }} </label>
      </div>                        <!-- 스타일 바인딩 : 어떤 변수에 따라 스타일 변경 가능-->
     <div class = "align-rignt">
      <button class ="btn btn-danger btn-sm" @click = "deleteTodo(index)">
        Delete
      </button>
     </div>
    </div>
  </div>
</div> 

</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default{
  components : {
    TodoSimpleForm
  },
  setup(){
    // ref사용 시 .value값 선언 
   
    const todos = ref([]);

    const deleteTodo = (index) => {
      todos.value.splice(index,1);
    }
    
    const addTodo = (todo) =>{
      todos.value.push(todo);
      console.log(todo);
    }


//함수를 사용하려면 반드시 return을 사용
    return{
      todos,
      deleteTodo,
      addTodo,
    }
  }
}
</script>

<style>
.todo{
  color: gray;
  text-decoration: line-through;
}

</style>
