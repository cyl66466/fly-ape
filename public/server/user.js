// var mongoClient=require('mongodb').client;
var address="mongodb://localhost:27017/login";
var MongoClient=require('mongodb').MongoClient;

var user={
	login:function(req,res){
		var qstr="";
		req.addListener('data',function(dataPart){
			qstr+=dataPart;
		});
		req.addListener('end',function(){
			var obj=JSON.parse(qstr);
			// console.log(obj);
			MongoClient.connect(address,function(err,db){
				if(err) return;
				var collection=db.collection('user');
				collection.find(obj).toArray(function(err,result){
					console.log(result);
					if(result==""){
						res.write('0');
						db.close();
						res.end();
					}else{
						res.write('1');
						db.close();
						res.end();
					}
					
				});
				
				
			})
			// console.log(obj);
		})
	},
	regist:function(req,res){
		var qstr="";
		req.addListener("data",function(dataPart){
			qstr+=dataPart;
		});
		req.addListener("end",function(){
			MongoClient.connect(address,function(err,db){
				if(err) return;
				var collection=db.collection('user');
				var obj=JSON.parse(qstr);
				collection.find({username:obj.username}).toArray(function(err,result){
						console.log(result);
					if(result!=""){
						res.write('0');
						db.close();
						res.end();
					}else{
						collection.insert(obj);
						res.write('1');
						db.close();
						res.end();
					}
				})
				
			})
		})

	}
}
module.exports=user;