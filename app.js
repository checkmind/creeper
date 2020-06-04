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
// app.get('/recommend',function(req,res){
// 	if(time&&new Date()-time<=24*60*60*1000){
// 		res.send(hash);
// 		return;
// 	}
// 	time = new Date()
// 	getRequest('http://www.dyxia.com/').then(function(data){  //抓取主页推荐
// 		 	let $ = cheerio.load(data, {decodeEntities: false});
// 		 	for(let i = 0;i<5;i++){
// 		 		 let moveName = $('.commend li').eq(i).find('strong a').text();
// 		 		 let link = $('.commend li').eq(i).find('a').attr('href');
// 		 		 hash.push({
// 		 		 	moveName,
// 		 		 	link
// 		 		 });
// 		 	}
// 		 	res.send(hash)
// 	})
// })

// 爬虫

class CheerioBody {

	constructor (el){
		this.typeLink = {};
		this.$ = el;
		this.firstLink = 'https://www.quanji789.com/'
		this.mongoObj = [];
		/*
		{
			category : 0,
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
		}
		*/
		this.pointer = 1; //当前爬取第一类页面
		this.moveCategory = []; // 储存电影种类链接
	}
	getCategory (){ // 找到分类的链接,这一步可以瞬间完成
		getRequest(this.firstLink).then((data)=>{
		 	let $ = cheerio.load(data, {decodeEntities: false});
		 	let categroy,link

		 	for(let i = 0,len=$(".new_nav li").length;i<2;i++){ //遍历分类列表
		 		link = $(".new_nav li").eq(i).find('a').attr('href');
		 		categroy = $(".new_nav li").eq(i).find('a').text();
		 		console.log(link,categroy)
		 		this.moveCategory.push({
		 			link,
		 			categroy
		 		})
		 	}
		 	console.log('获取链接列表完成');
		 	this.getTypeLink(this.moveCategory[this.pointer].link);
		}).catch(function(err){
      console.log('哈哈哈哈')
			console.log(err);
		})

	}
	getTypeLink (link){ // 某一个分类页面里的所有电影
		if(!link){
			console.log('抓取完毕');
		}
		return getRequest(link).then((data)=>{
			let $ = cheerio.load(data, {decodeEntities: false});
			let movieObj = [];
			let allLi = $(".classpage li");
			let link,moveName;
			for(let i = 0,len=allLi.length;i<len;i++){  //缓存链接和电影名
				link = allLi.eq(i).find('a').attr('href')
				moveName = allLi.eq(i).find('a').text();
				movieObj.push({
					moveName,
					link
				})
			}
			console.log('缓存电影信息完成');
			this.creeperFn(movieObj,0,5,3000);
			//return movieObj;
		})
	}
	creeperFn(arr,start,num,timer){  //事件执行器，每timer秒对arr进行操作num次。
		let taskPromise = []
		if(arr.length<=start) { // 待处理数组处理完毕，处理下一页
			this.pointer++;
			return;
		}
		if(arr.length<= start+num){
			num  -= start + num - arr.length;
		}
		for(let i = start;i<start+num;i++){
			taskPromise.push(this.callRequest(arr[i]))
		}
		Promise.all(taskPromise)
		.then((words)=>{
			console.log(words);
			setTimeout(()=>{
				this.creeperFn(arr,start+num,num,timer)
			},timer)
		})
		.catch((res)=>{  // 如果出错了，可能由于当时的网络缓慢或者坏链，则放慢速度
			console.log("some resource get error!!!"+res)
			setTimeout(()=>{
				this.creeperFn(arr,start+num,num,timer)
			},timer*2)
		})
	}
	callRequest(inf){ // 获取电影迅雷链接
		return this.getXLUrl(inf.link).then((data)=>{
			return this.saveMongo(Object.assign(inf,data));
		})
	}
	saveMongo(data){
		return new Promise(function(resolve, reject){
			resolve(data);
		})
	}
	getXLUrl(XLURL){
		return  getRequest(XLURL)
		.then(function(data){
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
				 	return { hash,story,author,picture}
				})
	}
}

let cheerioEx = new CheerioBody();
cheerioEx.getCategory();

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
// 搜索接口
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
