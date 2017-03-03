
// 程序入口
$(function(){
	// nav is color
	$('.nav a').click(function(e){
		e.preventDefault();
		$('.nav li').removeClass('active');
		$(this).parent().addClass('active');
	});
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
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var time = 60;
		var me = $(this);
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
	            	console.log(data)
	            	data.state == 200?$('.error').removeClass('show'):$('.error').addClass('show').children('i').html(data.message);
	            	// 倒计时
					var t = setInterval(function(){
						time --;
						$(me).html('倒计时 '+time).addClass('timeactive');
						if(time === 0){
							clearInterval(t)
							$(me).html('重新获取').removeClass('timeactive');
						}
					},1000);
	            },
	            error: function(data){ 
	            	console.log(data)
	            }
	        });
		}
	});
	// 表单提交
	$('#submit').click(function(){
		var inp = $('.form input');
		var reg_phone = /^1\d{10}$/;
		var reg_password = /^[A-Za-z0-9]{6,20}$/;
		var reg_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		for(var i=0; i<inp.length; i++){
			if(inp.eq(i).val() === ''){
				$('.error').addClass('show').children('i').html('请输入'+inp.eq(i).attr('placeholder'));
				return false;
			}
		}
		if(!reg_phone.test($('#phone').val())){
			$('.error').addClass('show').children('i').html($('#phone').attr('placeholder')+'格式有误');
			return false;
		}else if(!reg_password.test($('#password').val())){
			$('.error').addClass('show').children('i').html($('#password').attr('placeholder')+'格式有误');
			return false;
		}else if(!reg_email.test($('#email').val())){
			$('.error').addClass('show').children('i').html($('#email').attr('placeholder')+'格式有误');
			return false;
		}else{
			$('.error').removeClass('show')
			var data = {
				"uname": $("#uname").val(),
				"phone": $("#phone").val(),
				"email": $("#email").val(),
				"vcode": $("#vcode").val(),
				"password": $("#password").val()
			};
			$.ajax({ 
	            url:'/sign_in/new',
	            type:'post',
	            data: data,
	            success: function(data){ 
	            	if(data.state === "404"){
	            		$('.error').addClass('show').children('i').html(data.message);
	            	}else if(data.state === "200"){
	            		window.location.href='/sign_in';
	            	}
	            },
	            error: function(data){ 
	            	console.log(data)
	            }
	        });
		}
	});
});
