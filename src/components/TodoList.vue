<template>
      <!-- {{todos}} -->
  <!-- v-for를 사용할 때 반드시 :key 사용 -->
  <div v-for="(todo,index) in todos" :key="todo.id" class="card mt-2">
        <div class = "card-body p-2 d-flex align-items-center">
            <div class ="form-check flex-grow-1">
                <input class = "form-check-input" type = "checkbox" checked: @change="toggleTodo(index)" > 
                <label class = "form-check-label" :class = "{todo: todo.completed}"> {{ todo.subject }} </label>
            </div>                        <!-- 스타일 바인딩 : 어떤 변수에 따라 스타일 변경 가능-->
            <div>
                <button class ="btn btn-danger btn-sm" @click = "deleteTodo(index)"> 
                    Delete
                </button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    props : {       
        todos:{
            type:Array,
            required: true
        }
    },
    //emits: 자식이 부모에게 데이터를 보낼때
    emits: ['toggel-todo','toggel-del'],
    //이벤트를 날린다.
    setup(props, {emit}){
        const toggleTodo = (index) =>{
            emit('toggel-todo', index);
        }
        const deleteTodo = (index) =>{
            emit('toggel-del', index);
        }
        return {
            toggleTodo,
            deleteTodo,
        }
    }
}
</script>

<style>

</style>