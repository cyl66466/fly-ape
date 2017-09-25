var toptitle=Vue.extend({
    template:"#toptitle",
    data:function(){
        return {
            usename:"",
            isLogin:true, //判断用户是否登录
            password:"",
            toggle:true,   //切换登录或者注册
        }
    },
    created:function(){
        if(client.fetch()==""){
            this.isLogin=true;
        }else{
            this.isLogin=false;
            // console.log(client.fetch().usename)
            this.usename=client.fetch().usename;
        }
    },
    methods:{
        quit:function(){ //退出登录
            if(confirm("退出登录嘛？")){
                this.isLogin=true;
                client.clear();
                window.location.href="login.html";
            }else return;
        
        },
    }
})