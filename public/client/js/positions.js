
var positions=Vue.extend({
    template:'#positions',
    data:function(){
        return {
            msg:[]
        };        
    },
    created:function(){
        //获取数据
        this.$http({
            url:'http://localhost:8000/'+'positions'+'/getAll',
            method:'GET',
            // data:JSON.stringify({})
        }).then(function(res){
            this.msg=res.data.data;
            console.log(this.msg)
        },function(){})
    }
})

Vue.component('positions',positions);
var vm=new Vue({
    el:'#app'
});