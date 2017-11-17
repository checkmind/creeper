<template>
  <div id="app">
    <router-view></router-view>
    <myFooter></myFooter>
    <a class="dxy-go-top dxy-go-top-square-white gotoTop" href="javascript:;" @click='moveTop'>
      <i class="dxy-icon dxy-icon-arrow-up"></i>
    </a>
    <myLoading></myLoading>
  </div>
</template>

<script>
import myFooter from './components/footer'
import myLoading from './components/loading'
export default {
  name: 'app',
  components :{
    myFooter,
    myLoading
  },
  methods: {
    moveScroll (el, distand, timers, ) {
        clearInterval(el.timer)
        var now = nows()
        var begin =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        timers = timers || 600
        el.timer = setInterval(function(){
          var changeTime = nows()
          var t = timers - Math.max(0,now - changeTime + timers)  //这里得到了 0到timers之间的数值
          var value = easeOut(t, begin, distand - begin, timers)
          window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = value;
          if (t===timers)
            clearInterval(el.timer)
        },13)
        function nows () {
          return (new Date()).getTime();
        } 
        function easeOut (t, b, c, d) {  //减速曲线公式
          return -c *(t/=d)*(t-2) + b;
        }
      },
    moveTop (){
      console.log(111)
      this.moveScroll(document.body,0,300)
    }
  }
}
</script>

<style>
body,html{
  max-width: 1000px;
  margin:0 auto;
}
a{
  -webkit-tap-highlight-color: transparent;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.gotoTop{
  position: fixed;
  bottom: 20px;
  right: 10px;
}

.dxy-go-top-square-white:hover, .dxy-go-top-white:hover {
    color: #b5b5b5;
}
.dxy-go-top:hover {
    background: white;
}
</style>
