<template>
  <div>
      <h3>{{title}}</h3>
      <p>{{this.data.author}}</p>
      <div class="introduce">
          <div class="picture">
    		    <img :src="data.picture" />
          </div>
          <p><span>{{first}}</span>{{story}}</p>
      </div>
      
      <p class="downloadTitle">点击按钮下载：</p>

      <div class="source">
          <h3 v-if='!data.hash||data.hash.length==0'>暂无资源，敬请期待...</h3>
          <a v-for="item in data.hash" :href="item.url">{{item.episode}}</a>
      </div>
  </div>
</template>

<script>
import {getXLUrl} from '../api/index.js'

export default {
  name: 'downLoadPage',
  created() {
  	this.link = window.sessionStorage.link||'';
  	this.title = window.sessionStorage.title||'未找到名字';
    BUS.$emit('showToast')
  	getXLUrl('link='+this.link).then((data)=>{
  		this.data = data.data
  		this.wordBigFont(this.data.story);
      BUS.$emit('hideToast')
  	})
  },
  data() {
  	return {
  		data : '',
  		title: '',
      first: '',
      story: '',
  	}
  },
  methods: {
    wordBigFont (words){
      words = words.replace(/^\s+|\s+$/g,"");
      this.first = words.substring(0,1);
      this.story = words.substr(1,words.length);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
h3{
  margin-top: 30px;
  line-height: 40px;
  text-align: center;
}
.introduce{
  box-sizing: border-box;
  padding: 5% ;
  width: 100%;
  float: left;
  text-align: left;
}
.picture{
  width: 140px;
  height: 170px;
  float: left;
}
.picture img{
  
  width: 90%;
}
.introduce p {
  font-size: 14px;
  text-indent: .1rem;
  line-height: 20px;  

}
.introduce p span{
  font-size: 20px;
}
.downloadTitle{
  float: left;
  text-align: left;
  background:#a92c2c;
  padding:0 10px 0 5%;
  color:white;
  width: auto;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
.source{
  float: left;
  padding:0 5% 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}

.source a{
  padding:10px;
  background: black;
  color:white;
  margin:5px;
  border-radius: 5px;
  float: left;
  box-shadow: 0 0 5px black;

}
.source a:hover{
  box-shadow: 0 0 10px red;
}
.footer{
  position: relative;
  top: 100px;
}
</style>
