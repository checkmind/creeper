var request = require('request');

function getRequest(url,form,headers) {
	headers=headers||{};
	return new Promise((resolve, reject) => {
		request({
			method:"get",
			url,
			form: form,
			headers:headers
		}, (e, r, b) => {
			console.log("访问url:",url,'访问附加参数:',headers);
			if(e||!b||(r.statusCode&&r.statusCode==404)){
				//console.log('返回代码:',r.statusCode);
				return reject({error:"不存在网页数据"})
			}
			resolve(b);
		});
	})
}

function postRequest(url,form){
	return new Promise(function(resolve,reject){
		
		request.post({
			url,
			form
		},function(err,req,body){
			resolve(body);
		})
	})
}
module.exports = {getRequest,postRequest};