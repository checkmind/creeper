var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/movie', { server: { reconnectTries: 10 } });
var db = mongoose.connection;

var Schema = mongoose.Schema;



let movieType = new Schema({
		category : { type : Number ,required :  true },
		categoryName: String,
		inf: {
			type: Array
		}
})
let movieArr = new Schema({
				categoryName: String,
				moveName: String,
				link: String,
				picture: String,
				author: String,
				story: String,
				hash: [{
					episode: String, //剧集
					url: String
				}]
		})
movieType = mongoose.model('movetype',movieType)
movieArr = mongoose.model('movieArr',movieArr)
// let movie_1 = new movieType({
// 	category: 1,
// 	categoryName: "动作片",
// 	inf: [{
// 		moveName: 'tianxiawushuang',
// 		link: 'baidu.com',
// 		picture: 'baidu.com',
// 		author: 'dhao',
// 		story: 'sdfsf',
// 		hash : [{
// 			episode: '1sdfd',
// 			url: 'dafsadf'
// 		}]
// 	}]
// })
// movie_1.save(function(err){
// 	if(err)
// 		console.log(err)
// 	console.log('success11')
// })

function createCategory(cNum,cName){
	movieType.findOne({
		categoryName: cName
	},function(err, category){
		console.log(category)
		if(!category){
			let newCategory = new movieType({
				category : cNum,
				categoryName: cName,
				inf: []
			})
			newCategory.save(function(err){
				if(err)
					console.log(err)
				else
					console.log('save success')
			})
			console.log('no'+cName);
		}else{
			console.log('had it');
		}
	})
}
function createMoveArr(movieObj){
	movieArr.findOne({
		moveName: movieObj.moveName,
		author: movieObj.author
	},function(err, movie){
		if(movie){

		}else{
			let newMovie = new movieArr({
				categoryName: movieObj.categoryName,
				moveName: movieObj.moveName,
				link: movieObj.link,
				picture: movieObj.picture,
				author: movieObj.author,
				story: movieObj.story,
				hash: movieObj.hash
			})
			newMovie.save(function(err){
				if(err){
					console.log(err)
				}
				console.log('save ok');
			})
		}
	})
}
createCategory(0,"最新动作片")
db.on('error',function(err , docs){
	console.log(err);
})

