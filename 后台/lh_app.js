var http=require('http');
var router=require('./lh_router.js');
var server=http.createServer(function(req,res){
	if(/favicon.ico/.test(req.url)){res.end(); return;}//由于没有favicon,所以需要过滤掉这个请求
	//设置跨域问题
	res.writeHeader(200,{
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Allow-Headers':'Content-Type',
		'Access-Control-Allow-Methods':'GET,POST,OPTIONS,DELETE,PUT'
	});
	if('OPTIONS'==req.method) res.end();//过滤发送过来的测试请求OPTIONS
	else router(req,res);
});
server.listen(9090);
console.log('server is running at 9090 port');
