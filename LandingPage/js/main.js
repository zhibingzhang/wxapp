(function() {
  document.onreadystatechange = loading;
  function loading() {
    if (document.readyState == "complete") {
      $(".load").remove();
      $(".container").show();
    }
  }
}());
// 程序入口
$(function(){
  //提交信息
  $('.submit').click(function(){
    var my_reg = {
      "regEmail":"/^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$/",
      "regPhone":"/^1(3|4|5|7|8)\\d{9}$/"
    }
    var uname = $("#uname").val();
    var company = $("#company").val();
    var position = $("#position").val();
    var phone = $("#phone").val();
    var email = $("#email").val();


    var inps = $('.forms input');
    var error = [];
    for(var i=0; i<inps.length; i++){
      inp_error(inps,i,error,my_reg)
    }

    if(!error.length){
      $(this).css('pointer-events','none');
      var model = {};
        model.Name = uname;
        model.Company = company;
        model.Position = position;
        model.Phone = phone;
        model.Email = email;
        $.ajax({
            url: 'http://event.anruichina.com/LandingPage/LandingPage/SubForm',
            type: 'post',
            datatype: 'json',
            data: { 'model': model },
            success: function (data) {
                if (data.Status>0)
                {
                    alert('注册信息 已经提交！');
                    $("#uname").val('');
                    $("#company").val('');
                    $("#position").val('');
                    $("#phone").val('');
                    $("#email").val('');
                    window.location.href = 'http://event.anruichina.com/LandingPage/result.html';
                }else
                {
                    alert(data.Message);
                }
            }
        });
    }else{
      for(var i=0,str=''; i<error.length; i++){
        str+=error[i];
      }
      alert(str);
    }
  })
   $('.result_btn').click(function(){
      $.ajax({
            url: "http://event.anruichina.com/LandingPage/Code/SaveCode",
            datatype: 'json',
            data: {
                code:1
            },
            success: function(data) {
                
            }
        });
    })
  // $('.forms input').focus(function(){
  //   if($(this).val() === ''){
  //     $(this).next('.error').css('display','none');
  //     $(this).next('.error').css('display');
  //     $(this).next('.error').css('opacity','0');
  //   }
  // });
});
function inp_error(element,i,error,my_reg){
  if(element.eq(i).val() === ""){
    error.push(element.eq(i).prev().text()+'不能为空\n');
    // element.eq(i).next('.error').css('display','block');
    // element.eq(i).next('.error').css('display');
    // element.eq(i).next('.error').css('opacity','1');
    // element.eq(i).next('.error').html(element.eq(i).prev().text()+'不能为空');
  }else if(element.eq(i).attr('id') === 'phone'){
    if(!eval(my_reg.regPhone).test(element.eq(i).val())){
    error.push(element.eq(i).prev().text()+'格式不正确\n');
    // element.eq(i).next('.error').css('display','block');
    // element.eq(i).next('.error').css('display');
    // element.eq(i).next('.error').css('opacity','1');
    // element.eq(i).next('.error').html(element.eq(i).prev().text()+'格式不正确');
    }
  }else if(element.eq(i).attr('id') === 'email'){
    if(!eval(my_reg.regEmail).test(element.eq(i).val())){
    error.push(element.eq(i).prev().text()+'格式不正确\n');
    // element.eq(i).next('.error').css('display','block');
    // element.eq(i).next('.error').css('display');
    // element.eq(i).next('.error').css('opacity','1');
    // element.eq(i).next('.error').html(element.eq(i).prev().text()+'格式不正确');
    }
  }
  // else{
  //   element.eq(i).next('.error').css('display','none');
  //   element.eq(i).next('.error').css('display');
  //   element.eq(i).next('.error').css('opacity','0');
  // }
}
