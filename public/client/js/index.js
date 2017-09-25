    //地点选项卡
    function place(){
        var $lis=$('#content-city>ul>li');
        var $citys=$('.city-Tabs')
        var $li=$('.city-Tabs>ul>li')
        var $divs=$('.active');
        $lis.on('click',function(){
            var index=$(this).index();
            $lis.eq(index).addClass('active').siblings().removeClass('active');
            $citys.eq(index).addClass('active').siblings().removeClass('active');
        });
        $li.on('click',function(){
            var index=$(this).index();
            console.log(index)
            $li.eq(index).addClass('active').siblings().removeClass('active');
            $divs.eq(index).addClass('active').siblings().removeClass('active');
        })
    }
    //lis part
    function move(){
        var index=0;
        var $lis=$('.lis');
        var $part=$('#main #list .part');
        $lis.on('mouseover',function(){
            index=$(this).index();
            $part.eq(index).addClass('part-active')
                            .css({'display': 'block'})
        })
        $lis.on('mouseout',function(){
            index=$(this).index();
            $part.eq(index).removeClass('part-active')
                            .css({'display': 'none'})
        })
        $part.on('mouseover',function(){
            $(this).addClass('part-active').css({'display': 'block'})
            index=$(this).index();
            $lis.eq(index-1).addClass('active')
        })
        $part.on('mouseout',function(){
            $(this).removeClass('part-active').css({'display': 'none'})
            index=$(this).index();
            $lis.eq(index-1).removeClass('active')
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
    // 友情连接
        function open(){
            var $open=$('#open');
            var $close=$('.close')
            var $li=$('#content-connect ul .zhankai');
            $open.on('click',function(){
                $li.css({'display':'inline-block'})
            })
            $close.on('click',function(){
                $li.css({'display':'none'})
            })
        }
$(function(){
    move();//list二级菜单
    logo();//footer二维码
    open();
    airport();//回到顶部
    place();//校园版面轮播
    var $imgs=$('#content-activity img');
    $imgs.on('mouseover',function(){
        var index=$(this).index()
        console.log(index)
        $imgs.eq(index).addClass('active');
    });
     $imgs.on('mouseout',function(){
        $(this).removeClass('active')
    })
})