// 程序入口
$(function(){
	// left is slidetoggle
	$('.aside>ul>li>a').click(function(){
		var me = $(this);
			me.parent().siblings().children().next('ul').slideUp(function(){
				me.parent().siblings().removeClass('active');
			});
		if(me.parent().hasClass('active')){
			me.next('ul').slideToggle(function(){
				me.parent().removeClass('active');
			})
		}else{
			me.next('ul').slideToggle(function(){
				me.parent().addClass('active');
			})
		}
	});
	// ul_item
	$('.ul_item>li').click(function(event){
		var me = $(this);
		$('.ul_item>li').removeClass('item_active')
		me.addClass('item_active');
	});
});
