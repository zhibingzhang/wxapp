// 程序入口
$(function(){
    // 开启弹框信息
    $('.item_footer a').click(function(e){
        e.preventDefault();
        var me = $(this);
        var tit = me.parent().parent().prev().prev().prev().text();
        var src = me.parent().parent().prev().prev().children('img').attr('src');
        var txt_info = me.parent().parent().prev().text();
        $('.mak .body img').attr('src',src);
        $('.mak .body>p').eq(0).html(tit);
        $('.mak .footer>p').html(txt_info);
        $(".mak").show();
    })
    // 开启活动规则
    $('#rule').click(function(e){
        e.preventDefault();
        $('.rule_mak').show();
    })
    // 关闭活动规则
    $('#rule_close').click(function(){
        $('.rule_mak').hide();
    })
    // 关闭弹框
    $('.close').click(function(){
         $(".mak").hide();
    })
    // 分享作品
    $(".submit").click(function(){
        $(".share_mak").show();
    })
    //关闭分享
    $(".share_mak").click(function(){
        $(this).hide();
        $(".mak").hide();
    })
    // 放大图作品
    $('.item_body img').click(function(){
        if($(this).attr('src') == 'images/wrks9.png'){
            $('.img_mak img').attr('src','images/wrks9_l.png');
        }else if($(this).attr('src') == 'images/wrks8.png'){   
            $('.img_mak img').attr('src','images/wrks8_l.png');
        }else{
            $('.img_mak img').attr('src',$(this).attr('src'));
        }
        $('.img_mak').show();
    })
    // 关闭放大图
    $('.img_mak').click(function(){
        $(this).hide();
    })
});