  var sortitem=Vue.extend({
        template:"#sortitem",
        data:function(){
            return {
                sortItem:{}, //  得到的点击选项
                menus:["公司地点:",'融资阶段:','行业领域:'],
                sortmenu:['address','type','belong'],               
                items:[
                    {
                    'address':["不限","北京","上海","深圳","广州","杭州","成都","南京","武汉","西安","厦门","长沙","苏州","天津","重庆","郑州","青岛","合肥","福州","济南","大连","珠海","无锡","佛山","东莞","宁波","常州","沈阳","石家庄","昆明","南昌","南宁","哈尔滨","海口","中山","惠州",
                    "贵阳","长春","太原","嘉兴","泰安","昆山","烟台","兰州","泉州"],isMore:true,liShow:'8',liActive:'0'
                    },
                    {'type':["不限","A轮","B轮","C轮","D轮及以上"],isMore:true,liShow:'10',liActive:'0'},
                    {'belong':["不限","移动互联网","电子商务","金融","企业服务","教育","文化娱乐","游戏","O2O","硬件","医疗健康","生活服务","广告营销"
                    ,"旅游","数据服务","社交活动","分类信息","信息安全","招聘"],isMore:true,liShow:'8',liActive:'0'}
                ]
            }
        },
        methods:{
            show:function(index,ii,items,item){         
                this.sortItem[item]=ii=="不限"?'':ii;
                items.liActive=index;
                // console.log(this.sortItem);
                this.$emit("show",this.sortItem);
            },
            moreItem:function(index){
                this.items[index].liShow="1111";   //显示多少
                this.items[index].isMore=false;
            },
            lessItem:function(index){
                this.items[index].liShow="8"
                this.items[index].isMore=true;

            }
        }
    })