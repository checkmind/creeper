var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/movie', { server: { reconnectTries: 10 } });
var db = mongoose.connection;

var Schema = mongoose.Schema;



let movieType = new Schema({
		category : { type : Number ,required :  true },
		categoryName: String,
		inf: [{
				moveName: String,
				link: String,
				picture: String,
				author: String,
				story: String,
				hash: [{
					episode: String, //剧集
					url: String
				}]
		}]
})
movieType = mongoose.model('movetype',movieType)
let movie_1 = new movieType({
	category: 1,
	categoryName: "动作片",
	inf: [{
		moveName: 'tianxiawushuang',
		link: 'baidu.com',
		picture: 'baidu.com',
		author: 'dhao',
		story: 'sdfsf',
		hash : [{
			episode: '1sdfd',
			url: 'dafsadf'
		}]
	}]
})
movie_1.save(function(err){
	if(err)
		console.log(err)
	console.log('success11')
})
db.on('error',function(err , docs){
	console.log(err);
})

