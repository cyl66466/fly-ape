var key="userKey";
var client={
	save:function(item){
		window.localStorage.setItem(key,JSON.stringify(item));
	},
	fetch:function(){
		return JSON.parse(window.localStorage.getItem(key)||'[]')
	},
	clear:function(){
		window.localStorage.clear();
	}
}