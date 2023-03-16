<template>
<div class ="container">
  <h2>To-Do</h2><!--@add-todo이름 지정 후 "add-todo"로 호출될 함수-->
  <TodoSimpleForm @add-todo="addTodo"/>

  <div v-if = "!todos.length" style = "color: rebeccapurple">
    추가된 todo가 없습니다.
  </div>

  <TodoLis :todos="todos" />
</div> 
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
export default{
//부모 -> 자식
  props : ['todos'],

  components: {
    TodoSimpleForm,
    TodoList
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
