var MongoClient=require('mongodb').MongoClient;
var address="mongodb://localhost:27017/login";
var companys={
	getAll:function(req,res){
		var qStr="";
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var TT=JSON.parse(qStr);
			var pageConfig=TT.pageConfig;
			var searchItem=TT.searchItem;
			MongoClient.connect(address,function(err,db){
				
				// var collection=db.collection("companys");
				// collection.find({},{_id:0}).sort({[TT.type]:-1}).skip(skipNum).limit(pageConfigs.pageSize)
				// .toArray(function(err,result){
				
				// 	var data=JSON.stringify(result);
				// 	// console.log(data);
				// 	res.write(data);
				// 	db.close();
				// 	res.end()
				// })
				
			// var pageConfig={curIndex:1,pageSize:4,sortItem:"onlineJob"};
			// var searchItem={name:"",type:""};
			db.eval("getAll('companys','"+JSON.stringify(pageConfig)+"','"+
				JSON.stringify(searchItem)+"')",function(err,result){
					if(err) return;
					// var obj=JSON.parse(result);
					// var data=result.data;
					var data=JSON.stringify({
						datas:result.data,
						total:result.counts
					});
					// console.log(data);
					res.write(data);
					// console.log(data);
					db.close();
					res.end()

			});
			})
		})
	}
}
module.exports=companys;



// db.system.js.insert({
// 	_id:getAll,
// 	value:function(name,typee,skipp,limitt){
// 		var typeee=JSON.parse(typee);
// 		var skippp=JSON.parse(skipp)*type;
// 		var limittt=JSON.parse(limitt);
// 		return {
// 			data:db[name].find({},{_id:0}).sort(typeee:1).skip(skippp).limit(limittt).toArray(),
// 			total:db[name].find({},{_id:0}).count()
// 		}
// 	}
// })