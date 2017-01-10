// 动态添加meta标签及去掉微信刷新栏
(function() {
    if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
        var version = parseFloat(RegExp.$1);
        if (version > 2.3) {
            var phoneScale = parseInt(window.screen.width) / 640;
            document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
        } else {
            document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
        }
    } else {
        document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
    }
    //微信去掉下方刷新栏
    if (navigator.userAgent.indexOf('MicroMessenger') >= 0) {
        document.addEventListener('WeixinJSBridgeReady', function() {
            //WeixinJSBridge.call('hideToolbar');
        });
    }
}());
// 微信配置文件信息
$.ajax({
    url: "http://event.anruichina.com/wechat/token",
    dataType: 'jsonp',
    data: {
        url: window.location.href
    },
    jsonp: 'jsonpcallback',
    success: function(data) {
        try {
            var wxConfig = eval(data);
            wx.config(wxConfig);
        } catch (e) {
            alert(e.message);
        }
    }
});
// 微信提供接口调用
wx.ready(function() {
    //wx.checkJsApi({
    //    jsApiList: [
    //      'onMenuShareTimeline',
    //      'onMenuShareAppMessage'
    //    ],
    //    success: function (res) {
    //         //alert(JSON.stringify(res));
    //    }
    //});
    function getShareData(shareType) {
        return shareData = {
            title: 'Mac4Me 教育优惠红包摇一摇',
            desc: '秋高气爽却心气不畅？莫慌，Mac4Me 用上万红包治愈你！',
            link: 'http://event.anruichina.com/zzbh5/test/',
            //link: 'http://wechat.anruichina.com/AppleWatch/',
            imgUrl: 'http://wechat.anruichina.com/apple-watch/images/weixin.jpg',
            complete: function(res) {
                //alert(JSON.stringify(res));
            },
            success: function(res) {
                shareConfirm(shareType);
            },
            cancel: function(res) {
                shareCancel(shareType);
            },
            fail: function(res) {
                shareFail(shareType);
            }
        };
    }
    function shareCancel(type) {

    }
    function shareFail(type) {

    }
    function shareConfirm(type) {
        $.ajax({
            url: "home/share",
            type: 'post',
            datatype: 'json',
            data: {
                type: type
            },
            success: function(data) {

                config.leftCount = data.Status;
                if (data.Status > 0) {
                    location.reload();
                }
            }
        });
    }
    wx.onMenuShareAppMessage(getShareData(1));
    wx.onMenuShareTimeline(getShareData(2));
    wx.onMenuShareQQ(getShareData(3));
});
// 微信接口请求失败
wx.error(function(res) {
     console.log(res.errMsg);
});