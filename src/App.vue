<template>
  <div class = "name">
    {{name}}
    </div>
    <button  
      class="btn btn-primary"
      v-on:click="updateName"
      >Click
    </button>
</template>

<script>
import { reactive } from 'vue';
export default{
  setup(){
    const name = reactive({
      id:1
    });
    
    const updateName = () => {
      name.id = "metanet"
      console.log(name);
    }

    
    return{
      name,
      updateName,
    }
  }

}
</script>

<style>
.name{
  color: red;
}
</style>
