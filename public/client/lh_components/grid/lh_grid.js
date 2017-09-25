var grid=Vue.extend({
	template:'#grid',
	components:{
		page:page,		
	},
	props:['gridName'],
	data:function(){
		return {
			items:[],
			rItem1:{},//模板
			rItem2:{},//真正需要发送到服务区端的查找信息
		}
	},
	computed:{
		state:function(){
			return this.$store.state.grid[this.gridName];
		},
		key:function(){//获取主键
			for(var i=0;i<this.state.fields.length;i++){
				if(this.state.fields[i].isKey==true){
					return this.state.fields[i].name;
				}
			}
		},
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
	created:function(){
		this.getData();
	},
	methods:{
		deepCopy:function(obj1,obj2){//obj1:old,obj2:new
			for(var p in obj1){
				if(Array.isArray(obj1[p]))
					obj2[p]=obj1[p].slice(0);
				else if(obj1[p]!=null&&(typeof obj1[p]=='object')){
					obj2[p]={};
					arguments.callee(obj1[p],obj2[p]);
				}else
					obj2[p]=obj1[p];
			}
		},
		getData:function(){//获取数据
			console.log('去获取数据的路上');
			this.$http({
				url:this.$store.state.grid.url+this.gridName+'/getAll',
				method:'POST',
				data:{
					pageInfo:this.state.pageConfig,
					findInfo:this.state.newTemp
				}
			}).then(function(res){
				this.items=res.data.data;
				this.state.pageConfig.total=res.data.total;
			},function(){});
		},
		changePage:function(){
			this.getData();
		},
		serch:function(){
			this.state.pageConfig.curPage=1;
			this.state.pageConfig.pageGroupIndex=1;
//			this.deepCopy(this.rItem1,this.rItem2);
			this.getData();
			var that=this;
			Object.keys(that.state.newTemp).forEach(function(v){
				that.state.newTemp[v]='';
			});
//			this.deepCopy(this.state.temp,this.state.newTemp);//清空输入框里的数据
			
		},
		del:function(key,index){
			if(!confirm('真的要删除吗?')) return;
			console.log('gridName:'+this.gridName);
			this.$http({//发消息删server里的数据
				url:this.$store.state.grid.url+this.gridName+'/del/'+key,
				method:'GET',
			}).then(function(res){
				if('1'==res.data){//返回'1'表示成功
					alert('删除成功');
					for(var i=0;i<this.items.length;i++){
						if(this.items[i][this.key]==key){
							this.items.splice(i,1);
							this.pageConfig.total-=1;
							if(this.pageConfig.total%this.pageConfig.pageSize==0){
								this.pageConfig.curPage=this.pages;
								this.pageConfig.oldPage=this.pageConfig.changePage;
								this.pageConfig.changePage=this.pageConfig.curPage;
							}
							this.pageConfig.pageGroupIndex=Math.floor(((this.pageConfig.curPage)/this.pageGroupNum)+1);
							this.getData();
							break;
						}
					}
				}
			},function(){});
			
		},
		alter:function(e,key,index){
			this.items.forEach(function(v,i,arr){
				arr.type="button";
				arr.btn1="delete";
				arr.btn2="alter";
				
			});
			this.items[index].form="text";
			this.items[index].btn1="保 存";
			this.items[index].btn2="取 消";
			this.deepCopy(this.items[index],this.state.temp);
			this.deepCopy(this.items[index],this.state.oldTemp);
		},
		cancel:function(e,key,index){
			console.log('cancel');
			this.deepCopy(this.state.oldTemp,this.items[index]);
//			alert(this.items[index]);
			this.items[index].form="button";
			this.items[index].btn1="删 除";
			this.items[index].btn2="修 改";
//			console.log(this.items);
//			console.log(this.items[index]);
		},
		save:function(e,key,index){
			if(this.state.temp[this.state.fields[1]]==''||this.state.temp[this.state.fields[2]]==''||this.state.temp[this.state.fields[3]]==''){
				alert('请输入 完整信息');
			}else{
				this.$http({
					url:this.$store.state.grid.url+this.gridName+'/save',
					method:'POST',
					data:this.state.temp
				}).then(function(res){
					if('1'==res.data){
						alert('保存成功');
						var itemObj=this.items[index];
		//				var that=this;//测试代码
						this.deepCopy(this.state.temp,itemObj);
		//				this.deepCopy(this.temp,that.items[index]);
						itemObj.form="button";
						itemObj.btn1="删 除";
						itemObj.btn2="修 改";
//						console.log(this.items);
					}
				},function(){});
			}
		},
		add:function(){
			console.log(this.state.newTemp);
			for(p in this.state.newTemp){
				if('form'==p||'btn1'==p||'btn2'==p){}
				else{
					if(''==this.state.newTemp[p]){
						alert('请输入完整信息');
						return;
					}
				}
			}
			this.$http({
				url:this.$store.state.grid.url+this.gridName+'/add',
				method:'POST',
				data:this.state.newTemp
			}).then(function(res){
				if("1"==res.data){
						this.items.push(this.state.newTemp);
						this.pageConfig.total+=1;
						this.pageConfig.curPage=this.pages;
						this.pageConfig.oldPage=this.pageConfig.changePage;
						this.pageConfig.changePage=this.pageConfig.curPage;
						this.pageConfig.pageGroupIndex=Math.floor(((this.pageConfig.curPage-1)/this.pageGroupNum)+1);
//						this.deepCopy(this.state.temp,this.state.newTemp);//清空输入框里的数据
						var that=this;
						Object.keys(that.state.newTemp).forEach(function(v){
							that.state.newTemp[v]='';
						});
						this.getData();
					}
			},function(){});
			
		},
		fnOne:function(e,key,index){
			switch (this.items[index].btn1){
				case '删 除':
					this.del(key,index);
					break;
				case '保 存':
					this.save(e,key,index);
					break;
				default:
					break;
			}
		},
		fnTwo:function(e,key,index){
			switch (this.items[index].btn2){
				case '修 改':
//					console.log('修改');
					this.alter(e,key,index);
					break;
				case '取 消':
					this.cancel(e,key,index);
					break;
				default:
					break;
			}
		}
	},
});
//全局注册grid
Vue.component('grid',grid);