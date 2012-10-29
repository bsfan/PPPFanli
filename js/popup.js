$().ready(function () {
    chrome.cookies.get({url:Base_Url, name:'auth'}, function (cookie) {
        if (cookie) {
            var result = JSON.parse($.cookie('popup'))
            if( result )add_html(result)
            $.get(Api_Url,{service:"user",cookie:cookie.value},function(result){
                $.cookie('popup', JSON.stringify(result), { expires:1, path:'/' });
                add_html(result)
            },"json")
        }
        else {
            $('#Login').html('<a href="' + Login_Url + '"target="_blank" >微博登录</a>')
        }
    })
})


add_html = function(result){
    console.log(result)
    var val = {list:[{url:Base_Url,text:result.screen_name},{url:Logout_Url,text:'退出登录'}]}
    $('#Logout').html(Mustache.to_html($('#nav-template').html(),val))
}