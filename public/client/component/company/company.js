var company=Vue.extend({
    template:"#company",
    components:{companysort:companysort,page:page},
    props:['searchitem'],
    data:function(){
        return {
            sorttype:'id',
            companys:[],
            pageConfig:{curIndex:1,pageSize:8,total:0},
            searchConfig:{},
        }
    },
    created:function(){
        this.changeP("id");
    }, 
    methods:{
       deepCopy:function(obj1,obj2){
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
        getCompanyData:function(type,pageConfig){
            this.deepCopy(this.searchitem,this.searchConfig);
            // console.log(this.searchConfig);
            pageConfig.sortItem=type;
            this.$http({
                url:"http://localhost:8080/companys/getAll/",
                method:"POST",
                data:JSON.stringify({
                            searchItem:this.searchConfig,
                            pageConfig:pageConfig
                        })//限制条件
            }).then(function(res){
                // var companyData=JSON.parse(res.data);
                // console.log(123);
                // console.log(res.data);
                var obj=res.data;
                // console.log(obj);
                this.companys=obj.datas;
                this.pageConfig.total=obj.total;
                // console.log(res.data);

            },function(){})
        },
        changeP:function(type){   //用changeP去调用getCompanyData
            this.sorttype=type;
            var pageConfig=this.pageConfig;
            pageConfig.curIndex=1;
            this.getCompanyData(type,pageConfig);
        },
        changePage:function(type){   //用changeP去调用getCompanyData
            var pageConfig=this.pageConfig;
            this.getCompanyData( this.sorttype,pageConfig);
        },
    }
})