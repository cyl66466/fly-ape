
var curIndex=0;//记录图片
	var handler=null;
	function changeImage(nextIndex){
		var $imgs=$('#banner img');
		var $lis=$('#banner li');
		$imgs.eq(curIndex).removeClass('show').addClass('hide');
		$imgs.eq(nextIndex).removeClass('hide').addClass('show');
		$lis.eq(curIndex).removeClass('active');
		$lis.eq(nextIndex).addClass('active');
		curIndex=nextIndex;
	}
	function autoChange(){
		var $imgs=$('#banner img');
		var nextIndex=nextIndex||(curIndex+1>=$imgs.length?0:curIndex+1);
		changeImage(nextIndex);
	}
	$(function(){
		handler=setInterval(autoChange,3000);
		$('#banner').on('mouseover',function(){
			clearInterval(handler);
		})
		$('#banner').on('mouseout',function(){
			handler=setInterval(autoChange,3000);
		})
		var $lis=$('#banner li');
		$lis.on('click',function(){
			var index=$(this).index();
			changeImage(index);
		})
	})
