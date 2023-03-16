<template>
<div class ="container">
  <h2>To-Do</h2><!--@add-todo이름 지정 후 "add-todo"로 호출될 함수-->
  <input class="form-control" type="text" v-model="searchText" placeholder="Search"/>
<hr>
  <div v-if = "!todos.length" style = "color: rebeccapurple">
    추가된 todo가 없습니다.
  </div>
  <div v-if="!filterdTods.length">
    There is nothing to display
  </div>
  <TodoSimpleForm @add-todo="addTodo"/>
  <!--   자식이 데이터 보내기         부모가 받을 데이터(데이터를 받을 함수)  -->
  <TodoList :todos="filterdTods" @toggel-todo = "toggleTodo" @toggel-del = "deleteTodo"/>
</div> 
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
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
    const searchText = ref(''); //검색기능
    const filterdTods = computed(() => {
      if(searchText.value){
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

    const addTodo = (todo) => {
      //데이터를 객체 상태로 DB에 전달
      axios.post('http://localhost:3000/todos', {
        subject: todo.subject,
        completed: todo.completed
      })//<- 이 객체가 성공하면 
      todos.value.push(todo);//<-여기에 데이터가 들어감
    }

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    }

    const deleteTodo = (index) => {
      todos.value.splice(index,1);
    }


//함수를 사용하려면 반드시 return을 사용
    return{
      todos,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      filterdTods,
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
