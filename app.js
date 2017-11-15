var express = require('express');
var getRequest = require('./lib/sendRequest');
var cheerio = require('cheerio');
var http = require('http');
var app = express();


// const $ = cheerio.load('<h2>HELLO MAN</h2>');
// $('h2').text('hello women');
// console.log($.html())
app.get('/recommend',function(req,res){
	let newHash = [];
	let hash = [];
	getRequest('http://www.dyxia.com/').then(function(data){  //抓取主页推荐
		 	
		 	
		 	let $ = cheerio.load(data, {decodeEntities: false});
		 	//let $ = cheerio.load(data);
			
		 	// $('.commend li').each(function(){
		 	// 	 let moveName = $(this).find('strong a').text();
		 	// 	 let link = $(this).find('a').attr('href'); 
		 	// 	 hash.push({
		 	// 	 	moveName,
		 	// 	 	link
		 	// 	 });
		 	// })
		 	for(let i = 0;i<3;i++){
		 		 let moveName = $('.commend li').eq(i).find('strong a').text();
		 		 let link = $('.commend li').eq(i).find('a').attr('href'); 
		 		 hash.push({
		 		 	moveName,
		 		 	link
		 		 });
		 	}
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

function getXLUrl(XLURL){
	return new Promise(function(resolve,reject){
		//app.get('/downLoadUrl',function(req,res){  // 抓取迅雷链接
			 let hash = [];	
			 getRequest(XLURL).then(function(data){
			 	let $ = cheerio.load(data, {decodeEntities: false});
			 	$(".downurl").eq(0).find('li').each(function(){
			 		let episode = $(this).text(); //剧集
			 		let url = $(this).find("a").attr('href');  // 迅雷链接
			 		hash.push({
			 			episode,
			 			url
			 		})
			 	})
			 	let story = $('#juqing .neirong').text(); // 剧情
			 	console.log(story)
			 	resolve({
			 		hash,
			 		story
			 	});
			 })
		})	
	//})
}



// getRequest('http://www.dyxia.com//index.php',{
// 	wd: '大话西游',
// 	s: 'vod-search'
// }).then(function(data){
// 	console.log(data);
// }).catch(function(err){
// 	console.log(err);
// })


app.get('/searchAll',function(req,res){
	 getRequest('http://www.dyxia.com/').then(function(data){
	 	console.log('loading',typeof data);
	 	
	 	let $ = cheerio.load(data);
	 	// $('.commend li').map(function(val){
	 	// 	console.log(val.find('p'));
	 	// 	let moveName = val.find('p').html();
	 	// 	let link = val.find('a').attr('href');
	 	// 	console.log(moveName,link);
	 	// 	hash.push({
	 	// 		moveName,
	 	// 		link
	 	// 	});
	 	// })
	 	res.send(data);
	 })
})

app.get('/movie',function(req,res){
	getRequest('http://mall.dxy.cn/japi/platform/110720001?id=612').then(function(data){
		console.log(data);
		res.send(data);
	})	
})


app.listen(9528);
