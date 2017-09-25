// var MongoClient=require('mongodb').MongoClient;
const user=require("./user.js");
const admin=require("./admin.js");
const companys=require("./companys");
const resume=require("./resume");
// const admin=require("/admin.js");
var route=function(req,res,obj){
	switch(obj.isUser){
		case 'user':user[obj.operation](req,res);
			break;
		case 'admin':admin[obj.operation](req,res);
			break;
		case 'companys':companys[obj.operation](req,res);
			break;
		case 'resume':resume[obj.operation](req,res);
		    break;
		default:break;
	}
}
module.exports=route;
