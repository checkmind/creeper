import promise from 'es6-promise'
promise.polyfill();
import axios from 'axios'
//const url = 'http://localhost:12570'
const url = 'http://localhost:9528'
//const url = '';
export function getRecommend(){
	return axios.get(url+'/recommend');
}
export function getXLUrl(link){
	return axios.get(url+'/getXLUrl?'+link);
}
export function searchAll(moveName){
	console.log(moveName)
	return axios.get(url+'/searchAll?moveName='+moveName);
}
