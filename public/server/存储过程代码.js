

var pageConfig={curIndex:1,pageSize:4,sortItem:"onlineJob"};
var searchItem={name:"",type:"C轮"};
db.eval("getAll('companys','"+JSON.stringify(pageConfig)+"','"+JSON.stringify(searchItem)+"')");

db.system.js.insert({
	_id:"getAll",
	value:function(name,pageConfig,searchItem){
		var pageConfig=JSON.parse(pageConfig);
		var searchItem=JSON.parse(searchItem);
		var sortItem=pageConfig.sortItem;
		var skipNums=parseInt(pageConfig.curIndex-1)*parseInt(pageConfig.pageSize);
		// var condition={type:new RegExp(searchItem)};
		var condition={};

		//得到搜索配置
		Object.keys(searchItem).forEach(function(v){
			if(searchItem[v]!=''){
				condition[v]=new RegExp(searchItem[v]);
			}
		})

		return{
			counts:db[name].count(condition),
			data:db[name].find(condition,{_id:0}).sort({[sortItem]:-1}).skip(skipNums).limit(pageConfig.pageSize).toArray()
		}
	}	
})
// sortmenu:['address','type','belong'], \
var places=["全国","北京","上海","深圳","广州","杭州","成都","南京","武汉","西安","厦门","长沙","苏州","天津","重庆"
,"郑州","青岛","合肥","福州","济南","大连","珠海","无锡","佛山","东莞","宁波","常州","沈阳","石家庄","昆明","南昌","南宁","哈尔滨","海口"
,"中山","惠州","贵阳","长春","太原","嘉兴","泰安","昆山","烟台","兰州","泉州","全部城市>"];
function random(places){
	return Math.floor(Math.random()*places)
}
for(var i=0;i<30;i++){
	db.companys.save({id:random(30)},{$set:{address:places[random(places.length)]}},false,true);
}

