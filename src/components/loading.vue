<template>
  <div>
    <div class="loading" v-if='show'>
      
      <span></span>
      <p>玩命兒加載中...</p>
    </div>
  </div>
</template>

<script>


export default {
  name: 'myLoading',
  created (){
    BUS.$on('showToast',()=>{
      console.log(this.show)
      this.show = true;
    })
    BUS.$on('hideToast',()=>{
      this.show = false;
    })
  },
  data (){
    return {
      show : false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
  font-size: 12px;
  color: white;
}
.loading{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:rgba(0,0,0,.5);
  z-index: 999;
  position: fixed;
  left:0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;
}
.loading span{
  display: block;
  width: 50px;
  height: 50px;
  border:5px solid transparent;
  border-left-color: white;
  border-radius:50%;
  -webkit-animation:circle .5s infinite linear;/*匀速 循环*/
  position: absolute;
}
@-webkit-keyframes circle{
  0%{ transform:rotate(0deg); }
  100%{ transform:rotate(-360deg); }
}
</style>
