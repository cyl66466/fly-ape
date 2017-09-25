var http=require('http');
var route=require('./route.js');
http.createServer(function(req,res){
    if(/favicon.ico/.test(req.url)){
        res.end();
        return;
    }
    //跨域
    res.writeHeader(200,{
        'Access-Control-Allow-Origin':'*'
    });
    route(req,res);
}).listen(8000);
console.log('server is running...')