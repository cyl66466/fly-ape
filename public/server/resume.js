// var MongoClient=require("Mongodb").client;
var MongoClient=require('mongodb').MongoClient;
var address="mongodb://localhost:27017/login";

var resume={
	add:function(req,res){
		var qStr="";
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener("end",function(){
			var obj=JSON.parse(qStr);
			// console.log(obj.userId);
			MongoClient.connect(address,function(err,db){
				if(err) return;
				else{
					var collection=db.collection('resume');
					collection.remove({userId:obj.userId});
					collection.insert(obj);
					res.write('1');
					db.close();
					res.end();
				}
			})
			// console.log(obj);
		})
	},
	getAll:function(req,res){
		var qStr="";
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener("end",function(){

			var obj=JSON.parse(qStr);
			// console.log(obj);
			MongoClient.connect(address,function(err,db){
				if(err) return;
				else{
					var collection=db.collection('resume');
					collection.find({userId:obj}).toArray(function(err,result){
						var data=JSON.stringify(result);
						if(err) return;

						if(data.length>2){
							res.write(data);
							db.close();
							res.end();
						}else{
							console.log(45);
							res.write('0');
							db.close();
							res.end();
						}
					})					
					
					
				}
			})
			// console.log(obj);
		})
	}
}
module.exports=resume;