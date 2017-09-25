//airport回到顶部
function airport(){
    var $body=$('body');
    var $airport=$('#airport');
    setInterval(function(){
        if($body.scrollTop()>100){
            $airport.show();
        }else{
            $airport.hide();
        }
    },3000)
    $airport.click(function () {
        var speed=1000;//滑动的速度
        $body.animate({ scrollTop: 0 },speed);
        return false;
    });
}

//footer
function logo(){
    var num=0;
    var $a=$('#footer>#content-footer>.footer-link');
    var $img=$('#footer>#content-footer>.img');
    $a.on('mouseover',function(){
        num=$(this).index();
        // console.log(num-4)
        $img.eq(num-4).show();
    });
    $a.on('mouseout',function(){
        num=$(this).index();
        // console.log(num-4)
        $img.eq(num-4).hide();
    });
}

function toggleli(){
	var curIndex=0;
	$('.nextLi').on('click',function(){
		if(curIndex>3||curIndex<0){
			return;
		}
		else curIndex++;
		$('#resumeUl li').eq(curIndex).addClass('active').siblings().removeClass('active');
		// console.log($(this));

	})
	$('.lastLi').on('click',function(){
		if(curIndex>3||curIndex<0){
			return;
		}
		else curIndex--;
		$('#resumeUl li').eq(curIndex).addClass('active').siblings().removeClass('active');
	})
}
$(function(){
	logo();
	airport();
	toggleli();
});



// 图片
var imgup=Vue.extend({
    template:"#imgup",
    props:["imgUrl"],
    data:function(){
        return {
            file:"",
        }
    },
    methods:{
        uploading:function(){
            if(this.$refs.inputer.files.length==0) return;
            var inputDom=this.$refs.inputer; // 通过dom获取文件数据
            var file=inputDom.files[0];
            var size=Math.floor(inputDom.files[0].size/1024);
            if(size>120){alert("上传图片不大于120k哦！"); return false};
            this.imgPreview(file);                                                          
        },
        imgPreview:function(file){
            var that=this;
            if(!file||!window.FileReader) return;
            if(/^image/.test(file.type)){
                var reader=new FileReader();
                reader.readAsDataURL(file);  // 将图片将转成 base64 格式
                reader.onloadend=function(){   // 读取成功后的回调
                    imgUrl=this.result;             
                    // console.log(this.result);
                    that.$emit('img-preview',imgUrl);

                }
            }
        }
    }

})


// 简历
var resume=Vue.extend({
	template:"#resume",
	components:{imgup:imgup},
	data:function(){
		return {
			isExp:false, //是否触发正则判断
			newResume:[],	 //格式化后的数据
			hasresume:true, //判断用户是否有填写简历			
			resume:{
					userId:"",
					addDate:"",
					imgUrl:"",	
					Aname:'',
					Aphone:"",
					Aemail:"",
					Asex:"",
					Bschool:"",
					Bobject:"",
					Bcurtrul:"",
					Bgraduate:"",
					Bexperience:"",
					Cwant:"",
					Csalary:"",
					Cend:"",
				}	
			}					
	},
	created:function(){
		if(typeof(this.currentUser)=='undefined'){
			this.hasresume=false;
		}else{
			this.hasresume=true;
		}

		var that=this;
		Object.keys(this.resume).forEach(function(v){
			var temp={};
			// temp[v]=1;
			// console.log(temp);
			temp[v]=that.resume[v];
			temp.showExp=false;
			that.newResume.push(temp);   //将数据库传来的简历数据转化格式
		})
		// console.log(this.currentUser)
		this.getData();
		// console.log(this.getTime());
	},
	computed:{
		currentUser:function(){
			return client.fetch().usename;
		}
	},
	methods:{
		submit:function(){
			this.resume.addDate=this.getTime();
			this.resume.userId=client.fetch().usename;
			this.$http({
				url:"http://localhost:8080/resume/add/",
				method:"POST",
				data:JSON.stringify(this.resume)			
			}).then(function(res){
				if(res.data=="1"){
					alert('添加成功');
					window.location.href="showResume.html"
				}
			},function(){})
		},
		cancel:function(){
			if(!confirm("放弃保存？")) return;
			else{

			}
		},
		getData:function(){
			this.$http({
				url:"http://localhost:8080/resume/getAll/",
				method:"POST",
				data:JSON.stringify(this.currentUser)
			}).then(function(res){
				if(res.data=="0"){
					this.hasresume=false;
				}else{
					this.resume=res.data[0];
				}
				
			},function(){})
		},
		upImg:function(target){
			this.resume.imgUrl=target;
			console.log(this.resume.imgUrl);
		},
		getTime:function(){  //获取当前时间
			var date=new Date();
			var year=date.getFullYear();
			var month=date.getMonth()+1;
			var day=date.getDate();
			var hour=date.getHours();
			var minute=date.getMinutes();
			var second=date.getSeconds();
			return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
		

		}
	}
})
