<template>
<div class ="container">
  <h2>To-Do</h2><!--@add-todo이름 지정 후 "add-todo"로 호출될 함수-->
  <TodoSimpleForm @add-todo="addTodo"/>

  <div v-if = "!todos.length" style = "color: rebeccapurple">
    추가된 todo가 없습니다.
  </div>
  <!--   자식이 데이터 보내기         부모가 받을 데이터(데이터를 받을 함수)  -->
  <TodoList :todos="todos" @toggel-todo = "toggleTodo"/>
</div> 
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
export default{
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
    
    const addTodo = (todo) => {
      todos.value.push(todo);
      console.log(todo);
    }

    const toggleTodo = (index) => {
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    }


//함수를 사용하려면 반드시 return을 사용
    return{
      todos,
      deleteTodo,
      addTodo,
      toggleTodo,
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
