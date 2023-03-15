<template>
<div>
    <input 
      :type="text" 
      v-model="name"
      @input="update">

    <button  
      class="btn btn-primary"
      @click="onSubmit"
    >
     Click
   </button>
</div>
  
</template>

<script>
import { ref } from 'vue';
export default{
  setup(){
    const name = ref('kosa');
    
    const onSubmit = () => {
      console.log(name);
    }

    return{
      name,
      onSubmit,
    }
  }

}
</script>

<style>
.name{
  color: red;
}
</style>
