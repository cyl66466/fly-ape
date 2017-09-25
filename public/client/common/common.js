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
$(function(){
	logo();
	airport();
});