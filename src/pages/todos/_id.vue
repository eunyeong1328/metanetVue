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
  <Toast v-if="showToast" 
  :message="toastMessage" 
  :type = "toastAlertType"/>
  <!-- 자식에게 message가 보내짐 -->

  <div id = "kosa">KOSA</div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
// import {ref, computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdate, onBeforeUnmounted, onUnmounted } from '@vue/reactivity'
import {ref, computed, onUnmounted } from 'vue'
import _ from 'loadsh';
import Toast from '@/components/Toast.vue';

export default {
    components:{
      Toast
    },
    setup(){
      // onBeforeMount(()=>{
      //   console.log(document.querySelector('#kosa'));
      // });
      // onMounted(()=>{ //html읽었을때 
      //   console.log(document.querySelector('#kosa'));
      // });
      // onBeforeUpdate(()=>{ //데이터값을 변경하기 전
      //   console.log('before update');
      // });
      // onUpdate(()=>{//데이터값을 변경하기 전
      //   console.log('update');
      // });
      // onBeforeUnmounted(()=>{ //다른 페이지로 이동할 때, 페이지 이동 후 실행
      //   console.log('before Unmounted');
      // });
      onUnmounted(() => {//다른 페이지로 이동할 때, 페이지 이동 후 실행
        //사용하는 이유는 <- 메모리 누수를 예방할 수 있다.
        console.log('Unmounted');
        clearTimeout(timeout.value); //timeout clear
      });
      
      console.log('hello');
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const loading = ref(true);
        const todoId = route.params.id;
        const originalTodo = ref(null);

        const showToast = ref(false);
        const toastMessage = ref('');
        const toastAlertType = ref('');
        const timeout = ref(null);//시간저장 변수

        const triggerToast = (message, type = 'success') => { 
          showToast.value = true;
          toastMessage.value = message;
          toastAlertType.value = type;
          timeout.value = setTimeout(() => { 
            console.log('hello');
            toastMessage.value = '';
            showToast.value = false;
            toastAlertType.value = '';//초기화
          },3000);
        }

        const onSave = async () => {
          const res = await axios.put(`http://localhost:3000/todos/${todoId}`,{
             subject: todo.value.subject,
             completed: todo.value.completed
          });
          originalTodo.value = {...res.data}; //수정후 새값으로 변경(수정 후 비활성화)
          triggerToast('Successfully save!!');
          console.log(res);
        } //`배키 사용시 변수 넣기 가능 (데이터 여러개 수정)

        const todoUpdated = computed(()=>{ 
            return !_.isEqual(todo.value, originalTodo.value);
        });//서로 같지 않으면 버튼 비활성화

        const getTodo = async () =>{ 
          try{
            const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
            todo.value = {...res.data};//객체 복사
            originalTodo.value = {...res.data}; // = 새로운 메모리 주소 복사
            console.log(todo.value);
            loading.value = false; //db에서 데이터를 가져와야 만 한다.
          }catch(err){
            console.log(err);
            triggerToast('something went wrong','danger');
          }
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
          toastMessage,
          toastAlertType,
        };
    }
    
}
</script>

<style>

</style>