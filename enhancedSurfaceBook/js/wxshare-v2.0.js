
wx.ready(function () {

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
            title: '增强版 Surface Book 强势来袭',
            desc: '你对笔记本电脑的想象，其实可以走得更远',
            link: 'http://eventhub04.anruichina.com/enhancedSurfaceBook/index.html',
            imgUrl: 'http://eventhub04.anruichina.com/enhancedSurfaceBook/images/share.jpg',
            complete: function (res) {
                //alert(JSON.stringify(res));
            },
            success: function (res) {
                shareConfirm(shareType);
            },
            cancel: function (res) {
                shareCancel(shareType);
            },
            fail: function (res) {
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
              url: 'http://eventhub04.anruichina.com/Modern-PC/Home/ShareFriend',
              type: 'post',
              datatype: 'json',
              data: {shareType:type,url:window.location.href,record:3},
              success: function (data) {
				console.log(data);
              }
          });
    }


    wx.onMenuShareAppMessage(getShareData(1));
    wx.onMenuShareTimeline(getShareData(2));
    wx.onMenuShareQQ(getShareData(3));
});

wx.error(function (res) {
    // alert(res.errMsg);
});
