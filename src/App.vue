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
import { ref } from 'vue';
export default{
  setup(){
    let name = ref("Kosa!");
    
    const updateName = () => {
      name = "metanet"
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
