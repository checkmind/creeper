<template>
  <div>
    <h2 class="dxy-h-bold">HELLO MOVIE</h2>
    <h3>这儿有你想要的迅雷电影资源...</h3>
    <div class="dxy-input-group search">
        <input type="text" class="dxy-input justify" placeholder="您得需要迅雷软件哦~~" />
        <span class="dxy-input-group-btn">
            <button class="dxy-btn dxy-btn-primary" type="button">搜索</button>
        </span>
    </div>
    <h4>每隔五秒钟为您换一波儿推荐哦~睁大眼睛瞅，不要让好片子错过了...”</h4>
    <div class="lookName">
      <transition name="fade">
        <ul @mouseover="stopChange" @mouseout="changeLabel" v-if='showMovie'>
            <li v-for='item in display'>
                <a href="javascript:;" 
                  :link="item.link" 
                  @mouseover="check"
                  @mouseout="unCheck"
                  :style="{color:getRandomColor()}"
                  >{{item.moveName}}</a>
            </li>
        </ul>
      </transition>
  </div>
  </div>
</template>

<script>
import {getRecommend} from '../api/index.js'

export default {
  name: 'HelloMovie',
  created (){
    let that = this;
    getRecommend().then(function(data){
        that.recommend = data.data;
        that.changeLabel();
        setTimeout(function(){
          that.showMovie = true;
        },500)
        
    })
  },
  data () {
    return {
      recommend : [],
      display : [],
      index : 0,
      timer : null,
      stop : true,
      showMovie : false
    }
  },
  computed: {
    
  },
  methods: {
    changeLabel (){
      let that = this;
      clearInterval(this.timer);
      this.recommend.sort(function(){
        return Math.floor(Math.random()-0.5)===0
      })
      if(this.timer)
        return;
      for(let i = 0;i < 8; i++){    
        if(that.display.length==8)
          break;     
            that.display.push(that.recommend.shift())
           
      }
     this.timer = setInterval( () => {
          for(let i = 0;i < 8; i++){         
            that.display.push(that.recommend.shift())
            that.recommend.push(that.display.shift());
          }
      },5000)
    },
    stopChange (){

      if(this.timer){
        clearInterval(this.timer)
        this.timer = null;
      }
    },
    getRandomColor() { 
      var c = '#'; 
      var cArray = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']; 
      for(var i = 0; i < 6;i++) 
      { 
      var cIndex = Math.round(Math.random()*15); 
      c += cArray[cIndex]; 
      } 
      return c; 
    },
    check(ev){
        ev.target.style.textShadow = '0 0 10px black'
        ev.target.style.fontSize = '30px'
    },
    unCheck(ev){
        ev.target.style.textShadow = '';
        ev.target.style.fontSize = '20px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
h2,h3 {
  color: #42b983;
  line-height: 0.5rem;
}
h4{
  line-height: .5rem;
}
.search{
  width: 80%;
  margin:10% auto 5%;

}
.dxy-input-group .dxy-input-group-addon, .dxy-input-group .dxy-input-group-btn{
  position: relative;
  width: 20px;
}
ul li a{
  font-size: 20px;
  
}
.lookName{
  width: 100%;
  height: 80px;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>
