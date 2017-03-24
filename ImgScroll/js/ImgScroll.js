$(function(){
	var _index;
	var mySwiper;

	$('.thumbnails>li').click(function(e){
		e.preventDefault() 
		_index = $(this).index()
		$('.fs_gallery').show()
		mySwiper = new Swiper ('.swiper-container', {
			initialSlide : _index,
		}) 
	})
	$('.close').click(function(){
		$('.fs_gallery').hide()
	})
})