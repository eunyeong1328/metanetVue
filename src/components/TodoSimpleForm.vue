<template>
      <!-- 리로딩되서 기존의 기본이벤트 취소 -->
  <form @submit.prevent="onSubmit">
    <div class="d-flex" >
        <div class = "flex-grow-1 mr-2"> 
            <input class = "form-control" type = "text" v-model="todo" placeholder="Type new to-do">
        </div>
        <div>
            <button class = "btn btn-primary" type="submit"> Add </button>
        </div>
    </div>
    <!-- v-show를 사용할 수도 있다 -->
    <div v-if="hasError" style="color: red">
      This is cannot be empty
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
export default{
    setup(props, context){
        const todo = ref('');
        const hasError = ref(false);

        const onSubmit = () => {
            //입력한 데이터 값
            if(todo.value == ''){
                hasError.value = true;
            }else{
                context.emit('addTodo', {
                    id: Date.now(),
                    subject: todo.value,
                    completed: false,
                });
   
                hasError.value = false;
                todo.value = '';
            }  
        }

        return{
            todo, 
            hasError,
            onSubmit,
        };
    }
}

</script>
<style>
</style>