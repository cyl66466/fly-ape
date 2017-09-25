
var contentdata=Vue.extend({
	template:"#contentdata",
	data:function(){
		return {
			datas:"",
			hasresume:true,
		}
	},
	computed:{
		currentUser:function(){
			return client.fetch().usename;
		}
	},
	created:function(){
		this.getDatas();
	},
	methods:{
		getDatas:function(){
			this.$http({
				url:"http://localhost:8080/resume/getAll/",
				method:"POST",
				data:JSON.stringify(this.currentUser)
			}).then(function(res){
				if(res.data=="0"){
					this.hasresume=false;
				}else{
					this.datas=res.data[0];
				}
				// this.datas=res.data[0];
			},function(){})
		}
	}
});

Vue.component("contentdata",contentdata);

