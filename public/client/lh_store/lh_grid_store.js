var jobConfig={
	namespaced:true,
	headline:'职位信息汇总',
	headers:['序号','职位','薪资','基本需求','特点','公司'],
	temp:{id:"",name:"",salary:"",require:"",tips:"",company:"",form:"",btn1:"",btn2:""},
	oldTemp:{id:"",name:"",salary:"",require:"",tips:"",company:"",form:"",btn1:"",btn2:""},
	newTemp:{id:"",name:"",salary:"",require:"",tips:"",company:"",form:"",btn1:"",btn2:""},
	isEdit:true,
	fields:[
		{name:'id',isKey:true},
		{name:'name'},
		{name:'salary'},
		{name:'require'},
		{name:'tips'},
		{name:'company'},
	],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1,pageGroupNum:5,oldPage:1,changePage:1}
};
var companyConfig={
	namespaced:true,
	headline:'公司信息汇总',
	headers:['公司序号','公司名称','基本介绍','在线工作','地址','归属'],
	temp:{id:'',name:'',introduce:'',onlineJob:'',address:'',belong:'',form:"",btn1:"",btn2:""},
	oldTemp:{id:'',name:'',introduce:'',onlineJob:'',address:'',belong:'',form:"",btn1:"",btn2:""},
	newTemp:{id:'',name:'',introduce:'',onlineJob:'',address:'',belong:'',form:"",btn1:"",btn2:""},
	isEdit:true,
	fields:[
		{name:'id',isKey:true},
		{name:'name'},
		{name:'introduce'},
		{name:'onlineJob'},
		{name:'address'},
		{name:'belong'},
	],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1,pageGroupNum:5,oldPage:1,changePage:1}
};
var userConfig={
	namespaced:true,
	headline:'用户信息汇总',
	headers:['用户名','密码'],
	temp:{username:'',password:''},
	oldTemp:{username:'',password:''},
	newTemp:{iusername:'',password:''},
	isEdit:false,
	fields:[
		{name:'username'},
		{name:'password'}
	],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1,pageGroupNum:5,oldPage:1,changePage:1}
};
var administratorConfig={
	namespaced:true,
	headline:'管理员信息汇总',
	headers:['编号','管理员账号','密码','身份证号码'],
	temp:{id:'',name:'',psw:'',idNumber:''},
	isEdit:false,
	fields:[
		{name:'id'},
		{name:'name'},
		{name:'psw'},
		{name:'idNumber'},
	],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1,pageGroupNum:5,oldPage:1,changePage:1}
};
var gridModule={
	namespaced:true,
	state:{
		url:'http://localhost:9090/',
		grids:[]
	},
	getters:{},
	mutations:{
		addGrid:function(state,name){
			console.log('grid.addGrid');
			var i=state.grids.indexOf(name);
			if(i==-1) state.grids.push(name);
		},
		delGrid:function(state,i){
//			console.log(i);
			// state.grids.splice(state.grids.indexOf(name),1);
			state.grids.splice(i,1);
			console.log(state.grids)
		},
	},
	actions:{},
	modules:{
		job:{state:jobConfig},
		company:{state:companyConfig},
		user:{state:userConfig},
		administrator:{state:administratorConfig},
	},
};
