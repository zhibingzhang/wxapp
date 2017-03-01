// 程序入口
$(function(){
	// form
	$("#uname").blur(function(){
		var data = $(this).val();
		var bool = form_style(data);
		if(bool){
            $.ajax({ 
                url:'/sign_in_uname/new',
                type:'post',
                data: {"uname": data},
                success: function(data){ 
                	console.log(data)
                	if(data.state !== 200){
                		$('.error').removeClass('show');
                	}else{
                		$('.error').addClass('show').children('i').html(data.message)
                	}

                },
                error: function(data){ 
                	console.log(data)
                }
            });
		}
	});	
	// nav is color
	$('.nav a').click(function(e){
		e.preventDefault();
		$('.nav li').removeClass('active');
		$(this).parent().addClass('active');
	});

	//判断表单格式
	function form_style(value){
		if(value == ""){
			$('.error').addClass('show').children('i').html('请输入昵称')
		}else{
			$('.error').removeClass('show');
			 return true;
		} 
	}
})