(function() {
    document.onreadystatechange = loading;

    function loading() {
        if (document.readyState == "complete") {
            $(".load").remove();
            $(".container").show();
            var mySwiper = new Swiper('.swiper-container', {
                speed: 1000,
                direction: 'vertical',
                loop: false,
                noSwiping : true
            });
            // 开始游戏
            $(".start_btn").click(function() {
                mySwiper.slideNext();
            });
        }
    }
}());

$(function() {

});