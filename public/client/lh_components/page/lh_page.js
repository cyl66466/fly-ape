var page=Vue.extend({
	template:'#page',
	props:['gridName'],
	data:function(){
		return{
//			pageGroupNum:5,//页码数量
			pageSize:8,
//			changePage:1,
//			oldPage:1,
		};
	},
	watch:{//专门监听内部的数据,可以知道修改前后的值,还可以发消息
		pageSize:function(newValue,oldValue){
			this.pageConfig.pageSize=newValue;
			this.change(1);
		},
	},
	computed:{
		pageConfig:function(){//关于页的配置
			return this.$store.state.grid[this.gridName].pageConfig;
		},
		pages:function(){//总页数
			console.log('total:'+this.pageConfig.total);
			return Math.ceil(this.pageConfig.total*1.0/this.pageConfig.pageSize);
		},
		pageGroupNum:function(){
			return this.pageConfig.pageGroupNum;
		},
		pageGroups:function(){//总共有几串页码
			return Math.ceil(this.pages*1.0/this.pageGroupNum);
		},
	},
	methods:{
		change:function(i){//切换页面
			//排除无效点击
			if(i<1&&1==this.pageConfig.curPage){
				alert('已到达首页');
				return;
			}
			if(i>this.pages&&this.pages==this.pageConfig.curPage){
				alert('已到达尾页');
				return;
			} 
			//切换页码串
			if(i>=1||i<=this.pageGroupNum) this.pageConfig.pageGroupIndex=1;
			console.log('i:'+i);
			this.pageConfig.oldPage=this.pageConfig.changePage;
			this.pageConfig.changePage=i;
			console.log('oldPage:'+this.pageConfig.oldPage);
			console.log('changePage:'+this.pageConfig.changePage);
			if(i>this.pageGroupNum){
				if(i%this.pageGroupNum!=0)
					this.pageConfig.pageGroupIndex=Math.floor(i/this.pageGroupNum)+1;
				else
					this.pageConfig.pageGroupIndex=Math.floor(i/this.pageGroupNum);
			}
			this.pageConfig.curPage=i;
			this.$emit('change');
		}
	},
});
