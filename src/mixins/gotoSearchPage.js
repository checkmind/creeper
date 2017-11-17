import {searchAll} from '../api/index.js'

export default {
	methods : {
	    download(ev){
	      window.sessionStorage.title = ev.target.getAttribute('linkName');
	      window.sessionStorage.link =  ev.target.getAttribute('link');
	      console.log(window.sessionStorage.link)
	      this.$router.push('download')
	    },
	    searchMovie(){
	    	let that = this;
	    	BUS.$emit('showToast');
	    	searchAll(this.movieNameSearch).then(function(data){
	    		that.searchInf = data.data;
	    		if(!that.searchInf||!that.searchInf.length===0)
	    			alert('没有资源')
	    		BUS.$emit('hideToast');
	    	})
	    }
	}
}