import axios from 'axios'
const url = 'http://localhost:12570'

export function getRecommend(){
	return axios.get(url+'/recommend?ID=12345');
}
export function getXLUrl(link){
	return axios.get(url+'/getXLUrl?'+link);
}
