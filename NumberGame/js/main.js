(function() {
    document.onreadystatechange = loading;

    function loading() {
        if (document.readyState == "complete") {
            $(".load").hide();
            $(".container").show();
            var mySwiper = new Swiper('.swiper-container', {
                speed: 1000,
                direction: 'vertical',
                loop: false,
                onlyExternal: true,
            });
        }
    }
}());

$(function() {
    // 定义一个二维数组
    var data = [
        ['中', '01', '02', '03', '04', '05', '06', '07', '08', '09'],
        ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
        ['20', '21', '22', '23', '24', '25', '26', '27', '28', '239'],
        ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39'],
        ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49'],
        ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
        ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'],
        ['70', '71', '72', '73', '74', '75', '76', '77', '78', '79'],
        ['80', '81', '82', '83', '84', '85', '86', '87', '88', '89'],
        ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99']
    ];
    var col = 10;
    var row = 10;
    var this_col;
    var this_row;


    $(".square").click(function() {
        $('.square').removeClass('active');
        $(this).addClass('active');
        this_col = $(this).position().top / 64;
        this_row = $(this).position().left / 64;
    });

    //信息提交
    $("#submit").click(function() {
        var inp = $("#inp").val();
        $('.active').html(inp);


        for (var i = 0; i < col; i++) {
            for (var j = 0; j < row; j++) {

                if(inp == data[this_col][this_row]){
                    console.log('true');
                }else{
                    console.log('false');
                }
            }
        }
    });
});