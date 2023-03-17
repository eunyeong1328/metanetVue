<template>
  <h1>Todo pages</h1>
  <div v-if = "loading">
    Loading...
  </div>
  <form v-else>
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

    <button type = "submit" class = "btn btn-primary"  >Save</button>
  </form>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import {ref} from '@vue/reactivity'

export default {
    setup(){
        const route = useRoute();
        const todo = ref(null);
        const loading = ref(true);
        
        //console.log(route.params.id);

        const getTodo = async () =>{ 
          const res = await axios.get('http://localhost:3000/todos/' + route.params.id);
          //console.log(res);
          todo.value = res.data;
          loading.value = false; //db에서 데이터를 가져와야 만 한다.
        };
        getTodo();

        const toggleTodoStatus = () =>{
          todo.value.completed = !todo.value.completed
        }

        return{
          todo,
          loading,
          toggleTodoStatus,
        };
    }
    
}
</script>

<style>

</style>