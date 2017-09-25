$(function(){
	var curIndex=0;
	$('.nextLi').on('click',function(){
		if(curIndex>2||curIndex<0){
			return;
		}
		else curIndex++;
		$('#resumeUl li').eq(curIndex).addClass('active').siblings().removeClass('active');
		// console.log($(this));

	})
	$('.lastLi').on('click',function(){
		if(curIndex>2||curIndex<0){
			return;
		}
		else curIndex--;
		$('#resumeUl li').eq(curIndex).addClass('active').siblings().removeClass('active');
	})
})

