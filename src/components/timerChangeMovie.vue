<template>
  <div class="timerChange">
    <h5>每隔五秒钟为您换一波儿推荐哦~睁大眼睛瞅，不要让好片子错过了...”</h5>
    <div class="lookName">
      <transition name="fade">
        <ul @mouseover="stopChange" @mouseout="changeLabel">
            <li v-for='item in display'>
                <a href="javascript:;" 
                  :link="item.link" 
                  :linkName="item.moveName"
                  @mouseover="check"
                  @mouseout="unCheck"
                  @click="download"
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
import gotoSearchPage from '../mixins/gotoSearchPage'
export default {
  name: 'HelloMovie',
  created (){
    let that = this;
    getRecommend().then(function(data){
        that.recommend = data.data;
        that.changeLabel();
    })
  },
  data () {
    return {
      recommend : [],
      display : [],
      index : 0,
      timer : null,
      stop : true,
      unSearch: true
    }
  },
  mixins : [
    gotoSearchPage
  ],
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
.searchBody{
  margin-top: 60px;
}
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
h5{
  line-height: .2rem;
  width: 90%;
  margin:0 auto;
  font-size: 12px;
  font-weight: bold;
}
.search{
  width: 80%;
  max-width: 500px;
  margin:10% auto 5%;

}
.dxy-input-group .dxy-input-group-addon, .dxy-input-group .dxy-input-group-btn{
  position: relative;
  width: 20px;
}
ul li a{
  font-size: 20px;
  transition: .5s;
  
}
.lookName{
  width: 100%;
  height: 200px;
  padding-top:20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.slide-fade-enter-active {
  transition:1s;
}
.slide-fade-leave-active {
  transition:1s;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(1000px);
  opacity: 0;
}
</style>
