<template>
  <h1>Todo pages</h1>
  <div v-if = "loading">
    Loading...
  </div> <!--db에 데이터값이 저장되도록 한다.-->
  <form v-else @submit.prevent="onSave">
    <div class="row">
        <div class= "col-6">
            <div class = "form-group">
              <label>Todo Subject</label> 
              <input v-model = "todo.subject" type = "text" class ="form-control">
            </div>
        </div>
        <div class= "col-6">
          <div class = "form-group">
              <label>Status </label> 
              <div>
                <button class = "btn" :class="todo.completed ? 'btn-success' : 'btn-danger'" 
                            type = "button"  @click="toggleTodoStatus"> 
                   {{todo.completed ? 'Completed' : 'Incomplete'}}
                </button>
              </div>
            </div>
        </div>
    </div>

    <button type = "submit" class = "btn btn-primary" :disabled="!todoUpdated">
       Save
    </button>
    <button type = "submit" class = "btn btn-primary ml-2" @click = "moveToListPage">Cancle</button>
    <!-- <button type = "submit" class = "btn btn-primary ml-2"><router-link to="/todos">Cancle</router-link></button> -->
  </form>
  <Toast v-if="showToast"/>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import {ref, computed} from '@vue/reactivity'
import _ from 'loadsh';
import Toast from '@/components/Toast.vue';

export default {
    components:{
      Toast
    },
    setup(){
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const loading = ref(true);
        const todoId = route.params.id;
        const originalTodo = ref(null);
        const showToast = ref(false);

        const triggerToast = () =>{
          showToast.value = true;
        }

        const onSave = async () => {
          const res = await axios.put(`http://localhost:3000/todos/${todoId}`,{
             subject: todo.value.subject,
             completed: todo.value.completed
          });
          originalTodo.value = {...res.data}; //수정후 새값으로 변경(수정 후 비활성화)
          triggerToast();
          console.log(res);
        } //`배키 사용시 변수 넣기 가능 (데이터 여러개 수정)

        const todoUpdated = computed(()=>{ 
            return !_.isEqual(todo.value, originalTodo.value);
        });//서로 같지 않으면 버튼 비활성화

        const getTodo = async () =>{ 
          const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
          todo.value = {...res.data};//객체 복사
          originalTodo.value = {...res.data}; // = 새로운 메모리 주소 복사
          console.log(todo.value);
          loading.value = false; //db에서 데이터를 가져와야 만 한다.
        };
        getTodo();

        const toggleTodoStatus = () =>{
          todo.value.completed = !todo.value.completed
        }

        const moveToListPage = () =>{
            router.push({name:'Todos'});
        }

        return{
          todo,
          loading,
          toggleTodoStatus,
          moveToListPage,
          onSave,
          todoUpdated,
          showToast,
          triggerToast,
        };
    }
    
}
</script>

<style>

</style>