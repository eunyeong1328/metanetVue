<template>
<div>
    <input :type="text" 
      :value="name"
      @input="updateName">

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

    const updateName = (e) => {
      console.log(e.target.value);
      name.value = e.target.value;
    }

    return{
      name,
      onSubmit,
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
