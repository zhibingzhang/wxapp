
// 程序入口
$(function(){
	// nav is color
	$('.nav a').click(function(e){
		e.preventDefault();
		$('.nav li').removeClass('active');
		$(this).parent().addClass('active');
	});
	// sign_in && sign_in
	$('.normal-title a').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	// form is user name
	$("#uname").blur(function(){
		var data = {"uname": $(this).val()};
		$.ajax({ 
            url:'/sign_up_uname/new',
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
			$('.error').addClass('show').children('i').html($('#email').attr('placeholder'));
		}else if(!reg.test(email)){
			$('.error').addClass('show').children('i').html($('#email').attr('placeholder')+'格式有误');
		}else{
			$('.error').removeClass('show');
			if(me.data('state') === 'reset'){
				$.ajax({ 
		            url:'/sign_up_email_reset/new',
		            type:'post',
		            data: data,
		            success: function(data){ 
		            	console.log(data)
		            	if(data.state === '200'){
		            		$('.error').removeClass('show')
		            		// 倒计时
							var t = setInterval(function(){
								time --;
								$(me).html('倒计时 '+time+'s').addClass('timeactive');
								if(time === 0){
									clearInterval(t)
									$(me).html('重新获取').removeClass('timeactive');
								}
							},1000);
		            	}else{
		            		$('.error').addClass('show').children('i').html(data.message);
		            	}
		            },
		            error: function(data){ 
		            	console.log(data)
		            }
		        });
			}else{
				console.log('注册')
				$.ajax({ 
		            url:'/sign_up_email/new',
		            type:'post',
		            data: data,
		            success: function(data){ 
		            	console.log(data)
		            	if(data.state === '200'){
		            		$('.error').removeClass('show')
		            		// 倒计时
							var t = setInterval(function(){
								time --;
								$(me).html('倒计时 '+time).addClass('timeactive');
								if(time === 0){
									clearInterval(t)
									$(me).html('重新获取').removeClass('timeactive');
								}
							},1000);
		            	}else{
		            		$('.error').addClass('show').children('i').html(data.message);
		            	}
		            },
		            error: function(data){ 
		            	console.log(data)
		            }
		        });
			}
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
	            url:'/sign_up/new',
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
	//登录
	$('#submit_up').click(function(){
		var en = $('#en').val();
		var pwd = $('#pwd').val();
		var data = {'en': en, 'pwd': pwd}
		if(en === ''){
			$('.error').addClass('show').children('i').html('请输入你的昵称/邮箱');
			return false;
		}else if(pwd ===''){
			$('.error').addClass('show').children('i').html('请输入密码');
			return false;
		}
		$('.error').removeClass('show');
		$.ajax({ 
            url:'/sign_in/new',
            type:'post',
            data: data,
            success: function(data){ 
            	if(data.state === "404"){
            		$('.error').addClass('show').children('i').html(data.message);
            	}else if(data.state === "200"){
            		console.log(data)
            		if($(".password-state input").is(':checked')){
            			setCookie('mytoken',data.token,3600)
            			setCookie('uname',data.doc,3600)
            			 window.location.href='/';
            		}else{
            			setCookie('uname',data.doc.uname,3600)
            			setCookie('email',data.doc.email,3600)
            			window.location.href='/';
            		}
            	}
            },
            error: function(data){ 
            	console.log(data)
            }
        });
	});
	//用邮箱重置密码
	$('#email_reset').click(function(){
		var reg_password = /^[A-Za-z0-9]{6,20}$/;
		var reg_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
		var inp = $('.email_inp input');
		for(var i=0; i<inp.length; i++){
			if(inp.eq(i).val() === ''){
				$('.error').addClass('show').children('i').html(inp.eq(i).attr('placeholder'));
				return false;
			}
		}
		if(!reg_email.test($('#email').val())){
			$('.error').addClass('show').children('i').html($('#email').attr('placeholder')+'格式有误');
			return false;
		}else if(!reg_password.test($('#password').val())){
			$('.error').addClass('show').children('i').html($('#password').attr('placeholder')+'格式有误');
			return false;
		}else if(!reg_password.test($('#password_confirmation').val())){
			$('.error').addClass('show').children('i').html($('#password_confirmation').attr('placeholder')+'格式有误');
			return false;
		}else if($('#password').val() !== $('#password_confirmation').val()){
			$('.error').addClass('show').children('i').html('两次密码不一致');
			return false;
		}else{
			$('.error').removeClass('show')
			var data = {
				'email': $("#email").val(),
				'vcode': $("#vcode").val(),
				'password': $("#password").val(),
				'password_confirmation': $("#password_confirmation").val()
			}
			$.ajax({ 
	            url:'/email_reset/new',
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
	})
	//免登录
	if(getCookie('uname') !='' && getCookie('uname') != null){
		$('.article').hide();
		$('.unames').show();
	}else{
		// $('.article').eq(0).show();
		$('.unames').hide();
	}
	// 退出
	$('.no_uname').click(function(e){
		e.preventDefault();
		setCookie('uname','',0);
		setCookie('email','',0);
		window.location.href='/';
	})
});
// 设置cookie
function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
// 检查cookie
function getCookie(c_name)
{
	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1)
	    { 
	    c_start=c_start + c_name.length+1 
	    c_end=document.cookie.indexOf(";",c_start)
	    if (c_end==-1) c_end=document.cookie.length
	    return unescape(document.cookie.substring(c_start,c_end))
	    } 
	  }
	return ""
}