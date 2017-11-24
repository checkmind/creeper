var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/movie', { server: { reconnectTries: 10 } });
var db = mongoose.connection;

var Schema = mongoose.Schema;

var users = new Schema({
	username :  { type : String ,required :  true, unique:true },
	password :  { type : String ,required :  true,unique:false },
	friend : [{
		username : String 
	}],
	pptIds : []
})
var movie = new Schema({
	pptName : { type : String ,required :  true },
	pptCreateDate : Date,
	pptLastAlterDate : Date,
	public : Boolean,
	psWord : String,
	sectionObj : [Schema.Types.Mixed]

})	

new Schema({
			category : { type : Number ,required :  true },
			categoryName: '最新动作片',
			[{
				moveName,
				link,
				picture,
				author,
				hash: [{
					episode,
					url
				}]
			}]
		})


db.on('error',function(err , docs){
	console.log(err);
})
var obj = movie
module.exports = obj;