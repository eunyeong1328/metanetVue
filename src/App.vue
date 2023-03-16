<template>
<div class ="container">
  <h2>To-Do</h2>
  <!-- 리로딩되서 기존의 기본이벤트 취소 -->
  <form class="d-flex"  @submit.prevent="onSubmit">
    <div>
      <div class = "flex-grow-1 mr-2"> 
        <input class = "form-control" type = "text" v-model="todo" placeholder="Type new to-do">
    </div>
    <div>
      <button class = "btn btn-primary" type="submit" >
        Add
      </button>
    </div>
    </div>
    <!-- v-show를 사용할 수도 있다 -->
    <div v-if="hasError" style="color: red">
      This is cannot be empty
    </div>
  </form>

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
export default{
  setup(){
    // ref사용 시 .value값 선언 
    const todo = ref('');
    const todos = ref([]);
    const hasError = ref(false);
    const onSubmit = () => {
      //입력한 데이터 값
        if(todo.value == ''){
          hasError.value = true;
        }else{
            todos.value.push({
            id: Date.now(),
            subject: todo.value,
            completed: false,
          }); //객체 형태로 생성
          hasError.value = false;
          todo.value = '';
        }  
    }

    const deleteTodo = (index) => {
      todos.value.splice(index,1);
    }
//함수를 사용하려면 반드시 return을 사용
    return{
      todo,
      todos,
      hasError,
      onSubmit,
      deleteTodo,
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
