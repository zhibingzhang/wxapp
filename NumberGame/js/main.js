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
            });
        }
    }
}());

$(function() {

});