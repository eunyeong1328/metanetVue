<template>
  <div class = "name">
    {{greeting()}}
    </div>
</template>

<script>
export default{
  setup(){
    const name = "Metanet!";
    const greeting = () =>{
      return "Hello MetaNet!";
    }

    return{
      name,
      greeting,
    }
  }
}
</script>

<style>
.name{
  color: red;
}
</style>
