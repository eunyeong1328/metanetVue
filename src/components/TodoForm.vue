<template>
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
          <div v-if = "editing" class= "col-6">
            <div class = "form-group">
                <label>Status</label> 
                <div>
                  <button class = "btn" :class="todo.completed ? 'btn-success' : 'btn-danger'" 
                              type = "button"  @click="toggleTodoStatus"> 
                     {{todo.completed ? 'Completed' : 'Incomplete'}}
                  </button>
                </div>
              </div>
          </div>
      </div> 
      <div class = "col-12">
        <div class = "form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class = "form-control" cols = "30" rows="10">

          </textarea>
        </div>
      </div>
  
      <button type = "submit" class = "btn btn-primary" :disabled="!todoUpdated">
         {{ editing ? 'Update' : 'Create' }}
      </button>
      <button type = "submit" class = "btn btn-primary ml-2" @click = "moveToListPage">Cancle</button>
      <!-- <button type = "submit" class = "btn btn-primary ml-2"><router-link to="/todos">Cancle</router-link></button> -->
    </form>
    <Toast v-if="showToast" 
    :message="toastMessage" 
    :type = "toastAlertType"/>
    <!-- 자식에게 message가 보내짐 -->
  
  </template>
  
  <script>
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import {ref, computed, onUnmounted } from 'vue'
  import _ from 'loadsh';
  import Toast from '@/components/Toast.vue';
  import { useToast } from '@/composables/toast';
  
  export default {
      components:{
        Toast
      },
      props:{
        editing:{
          type: Boolean,
          default: false
        }
      },
      setup(props){
          onUnmounted(() => {
                console.log('unmounted');
                //clearTimeout(timeout.value);
            });
  
          const route = useRoute();
          const router = useRouter();
          const todo = ref({
            subject: ''
          });
          const loading = ref(false);
          const todoId = route.params.id;
          const originalTodo = ref(null);
  
          const{
            showToast,
            toastMessage,
            toastAlertType,
            triggerToast
          } = useToast();
  
          const onSave = async () => {
              try{
                let res;
                const data = {
                  subject: todo.value.subject,
                  completed: todo.value.completed,
                  body: todo.value.body
                };
                //data는 같은 코드 중복 
                if(props.editing){
                  res = await axios.put(`http://localhost:3000/todos/${todoId}`,data);
                }else{
                  res = await axios.post('http://localhost:3000/todos',data);
                  todo.value.subject = '';
                  todo.value.body = '';
                }
                originalTodo.value = {...res.data}; //수정후 새값으로 변경(수정 후 비활성화)
                const message = 'Successfully ' + (props.editing ? 'Update' : 'Creaet!');
                triggerToast(message);//메세지 값을 success로 저장되지 않고 위의 방식으로 사용
              }catch(err){
                console.log(err);
                triggerToast('something went wrong','danger');
              }
          } 
  
          const todoUpdated = computed(()=>{ 
              return !_.isEqual(todo.value, originalTodo.value);
          });//서로 같지 않으면 버튼 비활성화
  
          const getTodo = async () =>{ 
            loading.value = true;
            try{
              const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
              todo.value = {...res.data};//객체 복사
              originalTodo.value = {...res.data}; // = 새로운 메모리 주소 복사
              console.log(todo.value);
              loading.value = false; //db에서 데이터를 가져와야 만 한다.
            }catch(err){
              loading.value = false;
              console.log(err);
              triggerToast('something went wrong','danger');
            }
          };
           if(props.editing){
              getTodo();
           }
          //getTodo(); //글 하나를 읽어들이기 위해 사용 (데이터 읽어들이기)
  
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