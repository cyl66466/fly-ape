var places=["全国","北京","上海","深圳","广州","杭州","成都","南京","武汉","西安","厦门","长沙","苏州","天津","重庆"
,"郑州","青岛","合肥","福州","济南","大连","珠海","无锡","佛山","东莞","宁波","常州","沈阳","石家庄","昆明","南昌","南宁","哈尔滨","海口"
,"中山","惠州","贵阳","长春","太原","嘉兴","泰安","昆山","烟台","兰州","泉州","全部城市>"];
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
/*banner左右点击事件及蒙版事件*/
function banner(){
	$(".shade").on("mouseover",function(){
		$(this).css("opacity","0.94")
	}).on("mouseout",function(){
		$(this).css("opacity","0")
	});
	$("#banner-left").on("click",function(){
		$(".it-list").css("left","-1088px");
	});
	$("#banner-right").on("click",function(){
		if($(".it-list").css("left")<"0px"){
			$(".it-list").css("left","0");
		}
	});
}
/*创建公司地点*/
function createPlace(){
	var html="";
	for(var i=0;i<14;i++){
		html+="<li><a href='#'>"+places[i]+"</a></li>";
	}
	$("#screenUl1").html(html);
	html="";
	for(var j=14;j<places.length;j++){
		html+="<li><a href='#'>"+places[j]+"</a></li>";
	}
	$("#screenUl2").html(html);
}
/*筛选栏的更多*/
function screen(){
	$("#place-more").on("click",function(){
		if($(this).text()=="更多"){
			$("#screen-phase").css("display","none");
			$("#screen-place").css({"height":"80px","background-color":"white"});
			$(this).text("收起");
		}else{
			$("#screen-phase").css("display","inline-block");
			$("#screen-place").css({"height":"30px","background-color":""});
			$(this).text("更多");
		}
	})
	$("#domain-more").on("click",function(){
		if($(this).text()=="更多"){
			$("#screen-domain").css({"height":"60px","background-color":"white"});
			$(this).text("收起");
		}else{
			$("#screen-domain").css({"height":"30px","background-color":""});
			$(this).text("更多");
		}
	})
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
$(function(){
	createPlace();
	screen();
	banner();	
	logo();
	airport();
});