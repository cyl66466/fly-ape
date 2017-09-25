// var db = connect( 'positions' ); //连接的数据库名字为：school
// db.positions.save({name:"头条",study:'移动互联网 ,游戏 / 上市公司',content:'“海量用户,web系统,php,福利待遇好”'});
// db.positions.save({name:"阿里",study:'移动互联网 / 上市公司',content:'“海量用户,web系统,java,福利待遇好”'});
// db.positions.save({name:"京东",study:'移动互联网 / 上市公司',content:'“海量用户,web系统,福利待遇好”'});
// db.system.js.insert({
//     _id:"positions",
//     value:function(type){
//       return type;
//     }
//  });


 var db=connect('messages');
 db.positions.save({
    title:'前端开发工程师  [深圳-科技园]',
    money:'15k-30k',
    study:'经验不限/本科',
    skills:['游戏','HTML','高级'],
    name:"头条",
    like:'移动互联网 ,游戏 / 上市公司',
    content:'“海量用户,web系统,php,福利待遇好”'
});
db.positions.save({
    title:'javascript开发工程师  [深圳-科技园]',
    money:'20k-30k',
    study:'经验不限/本科',
    skills:['游戏','java','高级'],
    name:"头条",
    like:'移动互联网 ,游戏 / 上市公司',
    content:'“海量用户,web系统,php,福利待遇好”'
});
db.positions.save({
    title:'python开发工程师  [深圳-科技园]',
    money:'10k-30k',
    study:'经验不限/本科',
    skills:['游戏','php','高级'],
    name:"头条",
    like:'移动互联网 ,游戏 / 上市公司',
    content:'“海量用户,web系统,php,福利待遇好”'
});
 db.positions.save({
    title:'.net开发工程师  [深圳-科技园]',
    money:'15k-30k',
    study:'经验不限/本科',
    skills:['游戏','HTML','高级'],
    name:"头条",
    like:'移动互联网 ,游戏 / 上市公司',
    content:'“海量用户,web系统,php,福利待遇好”'
});
db.positions.save({
    title:'jsp开发工程师  [深圳-科技园]',
    money:'20k-30k',
    study:'经验不限/本科',
    skills:['游戏','java','高级'],
    name:"头条",
    like:'移动互联网 ,游戏 / 上市公司',
    content:'“海量用户,web系统,php,福利待遇好”'
});
db.positions.save({
    title:'ui设计师  [深圳-科技园]',
    money:'10k-30k',
    study:'经验不限/本科',
    skills:['游戏','php','高级'],
    name:"头条",
    like:'移动互联网 ,游戏 / 上市公司',
    content:'“海量用户,web系统,php,福利待遇好”'
});
db.system.js.insert({
    _id:"messages",
    value:function(type){
    return type;
    }
});




var MongoClient=require('mongodb').MongoClient;
var DB_CONN_STR='mongodb://localhost:27017/positions';
var selectData=function(db,callback){
    var collention=db.collection('positions');
    collention.find().toArray(function(err,result){
        if(err){
            console.log('Error:'+err);
            return;
        }
        callback(result);
    })
}
MongoClient.connect(DB_CONN_STR,function(err,db){
    console.log("success");
    selectData(db,function(result){
        console.log(result);
        db.close();
    })
})