<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" :to = "{name:'Home'}">Home</router-link>
  <ul class ="navbar-nav mr-auto justify-content-between mb-3">
    <li class = "nav-item active">
      <router-link class="nav-link" :to = "{name:'Todos'}">Todos</router-link>
    </li>

    <li class = "nav-item active">
      <router-link class="nav-link" :to = "{name:'Todos'}">Todos</router-link>
    </li>
  </ul>
</nav> 
<!-- 리로딩 안되게 하기 = 속도가 빨라짐 -->
<div>
  
</div>
  <router-view/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>

</style>