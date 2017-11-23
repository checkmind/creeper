var express = require('express');
var Request = require('./lib/sendRequest');
var cheerio = require('cheerio');
var http = require('http');
var app = express();
var {getRequest,postRequest} = Request;

app.use(express.static('dist'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "dist" );

})

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// const $ = cheerio.load('<h2>HELLO MAN</h2>');
// $('h2').text('hello women');
// console.log($.html())
let hash = [];  //电影的所有数据都在这里 全局推荐，每天更新一次
let time = null;
app.get('/recommend',function(req,res){
	console.log(time,new Date()-time<=24*60*60*1000)
	if(time&&new Date()-time<=24*60*60*1000){
		res.send(hash);
		return;
	}
	time = new Date()
	getRequest('http://www.dyxia.com/').then(function(data){  //抓取主页推荐
		 	let $ = cheerio.load(data, {decodeEntities: false});
		 	for(let i = 0;i<5;i++){
		 		 let moveName = $('.commend li').eq(i).find('strong a').text();
		 		 let link = $('.commend li').eq(i).find('a').attr('href'); 
		 		 hash.push({
		 		 	moveName,
		 		 	link
		 		 });
		 	}
		 	res.send(hash)
	})
})
/*
app.get('/recommend',function(req,res){
	
	getRequest('http://www.dyxia.com/').then(function(data){  //抓取主页推荐
		 	let $ = cheerio.load(data, {decodeEntities: false});
		 	for(let i = 0;i<5;i++){
		 		 let moveName = $('.commend li').eq(i).find('strong a').text();
		 		 let link = $('.commend li').eq(i).find('a').attr('href'); 
		 		 hash.push({
		 		 	moveName,
		 		 	link
		 		 });
		 	}
		 	//res.send(hash)
		 	return hash;
	}).then(function(hash){
		let promisess = [];
		hash.forEach(function(val,index){
			promisess.push(getXLUrl(val.link).then(function(obj){
				return val['inf'] = obj;
			}));
		})
		return Promise.all(promisess);
	}).then(function(obj){
		res.send(hash);
	}).catch(function(err){
		console.log(err)
	})
})
*/

app.get('/getXLUrl',function(req,res){
	getXLUrl(req.query.link).then(function(obj){
		res.send(obj);
	})
})

function getXLUrl(XLURL){
	return new Promise(function(resolve,reject){
		//app.get('/downLoadUrl',function(req,res){  // 抓取迅雷链接
			 let hash = [];	
			 getRequest(XLURL).then(function(data){
			 	let $ = cheerio.load(data, {decodeEntities: false});
			 	$(".downurl").find('li').each(function(){
			 		let episode = $(this).text(); //剧集
			 		let url = $(this).find("a").attr('href');  // 迅雷链接
			 		
			 		hash.push({
			 			episode,
			 			url
			 		})
			 	})
			 	let story = $('#juqing .neirong').text(); // 剧情
			 	let author = $(".zhuyan ul li").text();
			 	let picture = $(".haibao img").attr('src');
			 	resolve({
			 		hash,
			 		story,
			 		author,
			 		picture
			 	});
			 })
		})	
	//})
}

app.get('/searchAll',function(req,res){

	postRequest('http://www.dyxia.com//index.php?s=vod-search',{
		wd: req.query.moveName
	}).then(function(data){
		let $ = cheerio.load(data,{decodeEntities:false});
		let moveName,link;
		let hash = [];
		$(".solb ol").map(function(){
			moveName = $(this).find('label a').text(); //剧名
			link = $(this).find('label a').attr('href') //链接
			moveType = $(this).find('b').text();  //类型
			moveUpdata = $(this).find('span').text();
			moveTime = $(this).find('strong').text();
			hash.push({
				moveName,
				link,
				moveType,
				moveUpdata,
				moveTime
			})
		})

		res.send(hash);
	}).catch(function(err){
		console.log(err);
	})
})



app.listen(9528);
