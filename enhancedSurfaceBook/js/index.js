$(function(){
	var screenBox = $('.screenBox');
	var keyBox = $('.keyBox ');
	var penBox = $('.penBox');
	var one = $('.one');
	var two = $('.two');
	var three = $('.three');
	$('.screen').click(event=>{
		$('.screen').addClass('hidden').removeClass('show');
		$('.screenFont').addClass('hidden').removeClass('show');
		screenBox.css("display","block");
		screenBox.css("display");
        screenBox.css("opacity","1");
	})
	$('.key').click(event=>{
		$('.key').addClass('hidden').removeClass('show');
		$('.keyFont').addClass('hidden').removeClass('show');
		$('.keyLine').removeClass('hidden').addClass('show');
		
		keyBox.css("display","block");
		keyBox.css("display");
        keyBox.css("opacity","1");
		one.css("display","block");
		one.css("display");
        one.css("opacity","1");
		setTimeout(function(){
			two.css("display","block");
			two.css("display");
	        two.css("opacity","1");
		},500)
		setTimeout(function(){
			three.css("display","block");
			three.css("display");
	        three.css("opacity","1");
		},1000)
        $('.page4').scrollLeft(378)
	})
	$('.penLight').click(event=>{
		$('.penLight').addClass('hidden').removeClass('show');
		$('.penFont').addClass('hidden').removeClass('show');
		penBox.css("display","block");
		penBox.css("display");
        penBox.css("opacity","1");
	})
	$('.screenBox').click(event=>{
		$('.screen').removeClass('hidden').addClass('show');
		$('.screenFont').removeClass('hidden').addClass('show');
		screenBox.css("display","none");
		screenBox.css("display");
        screenBox.css("opacity","0");
	})
	$('.keyBox').click(event=>{
		$('.key').removeClass('hidden').addClass('show');
		$('.keyFont').removeClass('hidden').addClass('show');
		$('.keyLine').addClass('hidden').removeClass('show');
		keyBox.css("display","none");
		keyBox.css("display");
        keyBox.css("opacity","0");
        one.css("display","none");
		one.css("display");
        one.css("opacity","0");
		two.css("display","none");
		two.css("display");
        two.css("opacity","0");
		three.css("display","none");
		three.css("display");
        three.css("opacity","0");
        $('.page4').scrollLeft(0)
        
	})
	$('.keyLine').click(event=>{
		$('.key').removeClass('hidden').addClass('show');
		$('.keyFont').removeClass('hidden').addClass('show');
		$('.keyLine').addClass('hidden').removeClass('show');
		keyBox.css("display","none");
		keyBox.css("display");
        keyBox.css("opacity","0");
        $('.page4').scrollLeft(0)
        
	})
	$('.penBox').click(event=>{
		$('.penLight').removeClass('hidden').addClass('show');
		$('.penFont').removeClass('hidden').addClass('show');
		penBox.css("display","none");
		penBox.css("display");
        penBox.css("opacity","0");
	})
	$('.mask').click(event=>{
		$('.mask').addClass('hidden').removeClass('show');
		$('.maskLight').addClass('hidden').removeClass('show');
	})
	//	音乐效果
    var a2 = document.getElementById('a2');
    $(document).one('touchstart', function () {
		a2.play();
		$('.closeMusic').addClass('active');
    });
	$('.closeMusic').click(function(){
		if($('.closeMusic').hasClass('active')){
			$('.closeMusic').removeClass('active');
			a2.pause();
			sessionStorage.setItem("Music",0);
		}else{
			$('.closeMusic').addClass('active');
			a2.play();
			sessionStorage.setItem("Music",1);
		};
	});
})