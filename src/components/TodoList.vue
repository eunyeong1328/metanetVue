<template>
      <!-- {{todos}} -->
  <!-- v-for를 사용할 때 반드시 :key 사용 -->
  <div v-for="(todo,index) in todos" :key="todo.id" class="card mt-2">
        <div class = "card-body p-2 d-flex align-items-center">
            <div class ="form-check flext-grow-1">
                <input class = "form-check-input" type = "checkbox" @change="toggleTodo(index)" > 
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
    emits: ['toggel-todo','toggel-del'],
    setup(props, context){
        const toggleTodo = (index) =>{
            context.emit('toggel-todo', index);
        }
        const deleteTodo = (index) =>{
            context.emit('toggel-del',index);
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