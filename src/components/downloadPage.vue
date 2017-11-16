<template>
  <div>
  		
    	<p>{{data.story}}</p>
  </div>
</template>

<script>
import {getXLUrl} from '../api/index.js'

export default {
  name: 'downLoadPage',
  created() {
  	this.link = window.sessionStorage.link||'';
  	this.title = window.sessionStorage.title;
  	getXLUrl(this.link).then((data)=>{
  		this.data = data.data
  		console.log(this.data)
  	})
  },
  data() {
  	return {
  		data : '',
  		title: ''
  	}
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p {
  font-size: 12px;
  line-height: 40px;
}
.footer{
  position: relative;
  top: 100px;
}
</style>
