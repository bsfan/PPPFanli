
chrome.extension.onMessage.addListener(function (result, _, sendResponse) {
    if (result != null) {
        console.log(result)
        $( function(){
                $('body').prepend(result)
                wb()
            }
        )
    }
    sendResponse("");
})
//todo weibo分享

wb = function(){
    var _w = 32 , _h = 32;
    var param = {
        url:location.href,
        type:'1',
        count:'',
        appkey:'3096972488',
        title:'',
        pic:'',
        ralateUid:'1970961153',
        language:'zh_cn',
        rnd:new Date().valueOf()
    }
    var temp = [];
    for( var p in param ){
        temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
    }
    $('#share').html('<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>')
}

