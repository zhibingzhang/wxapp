// 程序入口
$(function(){
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'vertical',
	    mousewheelControl : true,//开启鼠标滚动事件
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    
	    // 如果需要前进后退按钮
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
	    
	    // 如果需要滚动条
	    scrollbar: '.swiper-scrollbar',
	  })       
});