//http://localhost:8080/musics/getAll
var Positions=require('./positionsRoute.js');
function route(req,res){
	var reg=/^\/(\w+)\/(\w+)/;
	var result=req.url.match(reg);
	switch(result[1]){
		case 'positions':
			Positions[result[2]](req,res);
			break;
		default:break;
	}
}
module.exports=route;