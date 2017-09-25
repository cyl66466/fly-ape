var querystring=require('querystring');
var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/messages";
var Positions={
    getAll:function(req,res){
		var qStr='';
		//从请求体中获取请求数据会不断触发data事件
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		//从请求体中获取完请求数据会触发end事件
		req.addListener('end',function(){
			var seporator=querystring.parse(qStr);
			MongoClient.connect(DB_STR,function(err,db){
				if(err){console.log(err);res.end();db.Close();return;}
				var collection=db.collection('positions');
				collection.find({},{_id:0}).toArray(function(err,result){
						res.write(JSON.stringify({
							data:result
						}));
						console.log(result)
						res.end();
						db.close();
					});
				})
		});
	}
}
module.exports=Positions;