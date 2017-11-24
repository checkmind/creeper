var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


function creeperFn(arr,start,num,timer){

	let taskPromise = []
	for(let i = start;i<start+num;i++){
		taskPromise.push(callRequest(arr[i]))
	}
	Promise.all(taskPromise).then(function(words){
		console.log(words)
		setTimeout(function(){
			creeperFn(arr,start+num,num,timer)	
		},timer)
	}).catch(function(res){
		console.log(res+'eerr')
	})
}

function callRequest(inf){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve(inf);
		
		},300)
	}).then(function(data){
		return saveMongo(data);
	})
}
function saveMongo(data){
	return new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve(data +' save ok');
		},100);
	})
}