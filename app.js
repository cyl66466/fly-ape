const express = require('express'); 
const route=require('./public/server/route.js')
var app=express();
app.use(express.static(__dirname+'/public'));	

app.all('*',function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Content-Type');
    res.setHeader('Access-Control-Allow-Methods','[GET,POST,DELETE,OPTIONS]');
    next();
})
app.post('/:isUser/:operation',function(req,res,next){
	var obj={}
	obj.isUser=req.params.isUser;
	obj.operation=req.params.operation;
	route(req,res,obj)
})

app.listen(8080);
console.log("8080 is start");