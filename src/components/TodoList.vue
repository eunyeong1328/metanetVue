<template>
      <!-- {{todos}} -->
  <!-- v-for를 사용할 때 반드시 :key 사용 -->
  <div v-for="(todo,index) in todos" :key="todo.id" class="card mt-2">
        <div class = "card-body p-2 d-flex align-items-center" @click="moveToPage(todo.id)">
            <div class ="form-check flex-grow-1">                                              <!--button checkbox 이벤트도 방지-->
                <input class = "form-check-input" type = "checkbox"  :checked="todo.completed" checked: @change="toggleTodo(index,$event)" @click.stop > 
                <label class = "form-check-label" :class = "{todo: todo.completed}" > {{ todo.subject }} </label>
            </div>                        <!-- 스타일 바인딩 : 어떤 변수에 따라 스타일 변경 가능-->
            <div>
                <button class ="btn btn-danger btn-sm" @click.stop = "deleteTodo(index)"> 
                    Delete
                </button>
            </div>
        </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
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
        const router = useRouter();
        const toggleTodo = (index, event) =>{
            emit('toggel-todo', index, event.target.checked);
        }
        const deleteTodo = (index) =>{
            emit('toggel-del', index);
        }
        const moveToPage = (todoId) => {
            console.log(todoId);
            //router.push('/todos/' + router);
            router.push({//경로의 복잡성을 줄일 수 있음
                name:'Todo',
                params:{
                    id:todoId
                }
            })
        }
        return {
            moveToPage,
            toggleTodo,
            deleteTodo,
        }
    }
}
</script>

<style>

</style>