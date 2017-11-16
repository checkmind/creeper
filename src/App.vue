<template>
  <div id="app">
    <router-view/>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myFooter from './components/footer'
export default {
  name: 'app',
  components :{
    myFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
