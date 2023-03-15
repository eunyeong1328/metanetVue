<template>
  <div class = "name">
    {{name}}
    </div>
    <input type = "text" v-bind:value="name">
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
    const name = ref('kosa');
    
    const updateName = () => {
      name.value = 'Metanet';
      console.log(name.value);
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
