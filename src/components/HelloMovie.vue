<template>
  <div class="searchBody">
    <h2 class="dxy-h-bold">HELLO MOVIE</h2>
    <h3>这儿有你想要的迅雷电影资源...</h3>
    <div class="dxy-input-group search">
        <input type="text" class="dxy-input justify" placeholder="您得需要迅雷软件哦~~" v-model='movieNameSearch'/>
        <span class="dxy-input-group-btn">
            <button class="dxy-btn dxy-btn-primary" type="button" @click='searchMovie'>搜索</button>
        </span>
    </div>
    <searchPage :searchInf='searchInf' v-if='searchInf&&searchInf.length!==0'></searchPage>
    <div class="lookName" v-if='searchInf.length===0||!movieNameSearch'>
        <timerChangeMovie></timerChangeMovie>
    </div>
    
  </div>
</template>

<script>
import {getRecommend} from '../api/index.js'
import gotoSearchPage from '../mixins/gotoSearchPage'
import timerChangeMovie from './timerChangeMovie'
import searchPage from './searchPage'
export default {
  name: 'HelloMovie',
  created (){
    
  },
  data () {
    return {
      movieNameSearch: '',
      searchInf : []
    }
  },
  components: {
    timerChangeMovie,
    searchPage
  },
  mixins : [
    gotoSearchPage
  ],
  computed: {
    
  },
  methods: {
   
  
   
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
h4{
  line-height: .2rem;
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
</style>
