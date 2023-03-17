<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" :to = "{name:'Home'}">Home</router-link>
  <ul class ="navbar-nav mr-auto">
    <li class = "nav-item active">
      <router-link class="nav-link" :to = "{name:'Todos'}">Todos</router-link>
    </li>
  </ul>
</nav> 
<!-- 리로딩 안되게 하기 = 속도가 빨라짐 -->
  <router-view/>
</template>

<script>
export default {

}
</script>

<style>

</style>