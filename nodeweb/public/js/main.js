// 程序入口
$(function(){
	$('.nav a').click(function(e){
		e.preventDefault();
		$('.nav li').removeClass('active');
		$(this).parent().addClass('active');
	});
})