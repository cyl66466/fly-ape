
var MongoClient=require('mongodb').MongoClient;
var DB_STR='mongodb://localhost:27017/login';
var Users={
	getAll:function(req,res){
		console.log('user getAll');
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var temp=JSON.parse(qStr);
			var pageInfo=temp.pageInfo;
			var skip=parseInt((pageInfo.curPage-1)*pageInfo.pageSize);
			var pageSize=parseInt(pageInfo.pageSize);
			var total=0;
			MongoClient.connect(DB_STR,function(err,db){
				if(err){console.log(err); res.end(); db.close(); return;}
				var collection=db.collection('user');
				collection.count({},function(err,num){
					var total=num;
					console.log('count_total:'+total);
					collection.find({},{_id:0}).skip(skip).limit(pageSize).toArray(function(err,result){
						res.write(JSON.stringify({
							data:result,
							total:num
						}));
						res.end();
						db.close();
					});
				});
				
			});
		});
	},
};
module.exports=Users;
