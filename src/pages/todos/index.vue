<template>
<div class ="container">
  <div class = "d-flex justify-content-between mb-3"> <!--오른쪽 끝으로 보내기 bootstrap--> 
    <h2>To-Do List</h2><!--@add-todo이름 지정 후 "add-todo"로 호출될 함수-->
    <button class = "btn btn-primary" @click="moveToCreatePage">
      Create Todo
    </button>
  </div>
  <hr>

<div style="color: red">{{ error }}</div>

  <div v-if = "!todos.length">
    추가된 todo가 없습니다.
  </div>
  <div v-if="!todos.length">
    There is nothing to display
  </div>

  <!-- App.vue가 자식에게 데이터 보내기         자식이 보낸 데이터를 부모가 받을 데이터(데이터를 받을 함수)  -->
  <TodoList :todos="todos" @toggel-todo = "toggleTodo" @toggel-del = "deleteTodo"/>
<!-- todos : 전체 데이터값 검색 -->
  <!-- 페이징 처리 -->
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li v-if = "currentPage !== 1" class="page-item">
      <a class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
    </li>
    <li class="page-item" v-for = "page in numberOfPages" :key = "page" :class="currentPage === page ? 'active' : ''">
      <a class="page-link" @click="getTodos(page)"> {{page}} </a></li>
    <li v-if="numberOfPages != currentPage" class="page-item"> <!--마지막 페이지가 현재 페이지가 아니라면?Next출력-->
      <a class="page-link" @click="getTodos(currentPage + 1)">Next</a>
    </li>
  </ul>
</nav>
<!-- {{ numberOfPages }} -->
</div> 

<Toast v-if="showToast" 
  :message="toastMessage" 
  :type = "toastAlertType"/>
</template>

<script>
import { ref, computed, watch } from 'vue';
import axios from 'axios';
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';
//useRoute 데이터 받아오는 것
//useRouter 페이지 이동
export default{
  components: {
    TodoList,
    Toast
  },

  setup(){
    // ref사용 시 .value값 선언 
    const todos = ref([]);
    const searchText = ref(''); //검색기능
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);  
    const timeout = ref(null);//시간저장 변수
    const router = useRouter();

    const{
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast
    } = useToast();//사용 시 데이터값 전달

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(()=>{
        getTodos(1);
      },2000); //2초후의 이 함수 호출
    });
    
    const moveToCreatePage = () =>{
      router.push({
        name: 'TodoCreate'
      });
    }

    const searchTodo = () =>{
      clearTimeout(timeout); //기존 검색 취소
      getTodos(1);//즉각 데이터 호출
    };
    


    const numberOfPages = computed(()=>{
        return Math.ceil(numberOfTodos.value/limit);
    });

    // const filterdTods = computed(() => { //한페이지에서만 검색이 된다.
    //   if(searchText.value){
    //     console.log(todos.value.length);
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });

    const addTodo = async (todo) => {
      error.value = '';
      try{ //await : 이 작업할 동안 기다리기
          await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
        });
        //todos.value.push(res.data);
        getTodos(1);//db에 있는 값 불러오면 된다.
      }catch(err){
          console.log(err);
          triggerToast('something went wrong','danger');
      }
    }
    //전체 검색
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      error.value = '';
      try{
          const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`); 
          numberOfTodos.value = res.headers['x-total-count'];
         //console.log(res.headers['x-total-count']); //해당 글 갯수를 뽑아 낼 수 있다.
          todos.value = res.data;
      }catch(err){
        console.log(err);
        triggerToast('something went wrong','danger');
      }
    }

    getTodos();

    const deleteTodo = async (index) => {
        error.value = ' ';
        const id = todos.value[index].id;
        try{//db에 있는 값을 삭제한다.
          await axios.delete('http://localhost:3000/todos/' + id);
          //todos.value.splice(index,1);
          getTodos(1)
        }catch(err){
          console.log(err);
          triggerToast('something went wrong','danger');
        }
    }

    // const toggleTodo = (index) => {
    //   todos.value[index].completed = !todos.value[index].completed;
    // }

    const toggleTodo = async (index,checked) =>{
      console.log(checked);
       error.value = ' ';
        const id = todos.value[index].id;
        try{//db에 있는 값을 삭제한다.
          await axios.patch('http://localhost:3000/todos/' + id, {
            completed : !todos.value[index].completed
          });
          todos.value[index].completed = checked;
        }catch(err){
          console.log(err);
          triggerToast('something went wrong','danger');
        }
    }
    //put :리소스의 모든 것을 업데이트 한다.
    //patch : 리소스의 일부를 업데이트 한다.

    //함수를 사용하려면 반드시 return을 사용
    return{
      todos,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      error,
      getTodos,
      numberOfTodos,
      limit,
      numberOfPages,
      currentPage,
      searchTodo,
      timeout,
      showToast,
      triggerToast,
      toastMessage,
      toastAlertType,
      moveToCreatePage,
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
