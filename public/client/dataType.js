数据库  管理员/用户账号密码
login   

用户表 user[ 
		{
			username:'XXX'
			password:'mmmm'
		},
		{}
		]

管理员表  admin[
		{
			adminname:'xxx'
			password:'nnnnn'
		},
		{},
		]

公司表
	companys[
				{
					id:"005",
					name:"oTMS",
					img:"images/companyLogo/pic3.jpg",
					type:"移动互联网/成长型(B轮)",
					introduce:"引领互联运输之道",
					faceIns:"26", //面试评价
					onlineJob:"42",	//工作数量
					sucPencent:"100%" //成功率	
				},
			]

jobs:职位表
	jobs[
			{
				job:"高级前端设计师",
				salary:"20k-30k",
				require:"经验5-10年/本科",
				tips:["五险一金","海外","带薪年假"],			
			},
		]

个人简历表
	1，用户基本信息：A
		 姓名 手机号 邮箱  住址
	2，用户学历经历 B
		 文化程度 毕业时间 工作经历 
	3，求职意向表 C
		 求职方向，总结 

resume[
		{
			Aname:'张三',
			Aphone:"123456789",
			Aemail:"1234@qq.com",
			Asex:"男",
			Aaddress:"长江以北",
			Bschool:"江西农大",
			Bobject:"软件工程",
			Bcurtrul:"本科",
			Bgraduate:"2018",
			Bexperience:"这是一些工作经历这是一些工作经历这是一些工作经历这是一些工作经历",
			Cwant:"求得一份前端工程师的职位求得一份前端工程师的职位求得一份前端工程师的职位",
			Csalary:"10000+",
			Cend:"我能干些什么我能干些什么我能干些什么我能干些什么我能干些什么我能干些什么"
		}
]