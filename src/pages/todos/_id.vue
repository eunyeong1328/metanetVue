<template>
  <h1>Todo pages</h1>
  <div v-if = "loading">
    Loading...
  </div>
  <form v-else>
    <div class = "form-group">
      <label>Todo Subject</label> 
      <!-- v-model todo를 양방향 바인딩 -->
      <input v-model = "todo.subject" type = "text" class ="form-control">
    </div>
    <button class = "btn btn-primary">Save</button>
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
          loading.value = false; //db에서 데이터를 가져와야 만 
        };
        getTodo();
        return{
          todo,
          loading,
        };
    }
    
}
</script>

<style>

</style>