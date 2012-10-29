

Api_Url = "http://pupipa.sinaapp.com/api"
Base_Url = "http://pupipa.sinaapp.com"
Login_Url = "http://pupipa.sinaapp.com/login"
Logout_Url = "http://pupipa.sinaapp.com/logout"
out_code = 'out_code'
function redirect(tab, rUrl){
    chrome.tabs.update(tab.id, { url:rUrl });
}

function getParam(b, c) {
    var e = b.indexOf("?" + c + "=");
    if (e == -1) {
        e = b.indexOf("&" + c + "=")
    }
    if (e != -1) {
        var a = b.indexOf("&", e + c.length + 2);
        a = (a != -1 ? a : b.length);
        var d = b.substring(e + c.length + 2, a);
        return d
    }
    return null
}
function isTaobaoLink(a) {
    return(/item\.taobao\.com\/item.htm/.test(a) || /detail\.tmall\.com/.test(a))
}
function getTaobaoId(a) {
    var c = [];
    if (isTaobaoLink(a)) {
        var b = getParam(a, "id");
        if (b == null) {
            b = getParam(a, "mallstItemId")
        }
        if (b != null) {
            c.push(b)
        }
    }
    return c
}
show = function(img, title, msg) {
    var notification = window.webkitNotifications.createNotification(img, title, msg);
    notification.show();
    setTimeout(function () {
        notification.cancel();
    }, 10000)
}
