
// 程序入口
$(function(){
	// form is user name
	$("#uname").blur(function(){
		var data = {"uname": $(this).val()};
		$.ajax({ 
            url:'/sign_in_uname/new',
            type:'post',
            data: data,
            success: function(data){ 
            	data.state !== 200?$('.error').removeClass('show'):$('.error').addClass('show').children('i').html(data.message);
            },
            error: function(data){ 
            	console.log(data)
            }
        });
	});
	//form is email posh resend
	$('.btn-up-resend').click(function(){
		var email = $('#email').val();
		var data = {"email": email};
		console.log(email)
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		if(email === ""){
			$('.error').addClass('show').children('i').html('请输入邮箱');
		}else if(!reg.test(email)){
			$('.error').addClass('show').children('i').html('邮箱格式错误');
		}else{
			$('.error').removeClass('show');
			$.ajax({ 
	            url:'/sign_in_email/new',
	            type:'post',
	            data: data,
	            success: function(data){ 
	            	data.state !== 200?$('.error').removeClass('show'):$('.error').addClass('show').children('i').html(data.message);
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
});

