chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "loading") {
        if (tab.url.indexOf('item.taobao.com') > -1 || tab.url.indexOf('detail.tmall.com') > -1) {
            chrome.cookies.get({url:Base_Url, name:out_code}, function (cookie) {
                var sina_uid = 'PPPFanli'
                if (cookie) sina_uid = cookie.value
                var iid = getTaobaoId(tab.url)[0]
                var result = JSON.parse($.cookie(iid+'|'+sina_uid))
                if (result) msg(tab, cookie, result, sina_uid)
                else {
                    $.get(Api_Url, {'iid':iid, out_code:sina_uid}, function (result) {
                        msg(tab, cookie, result, sina_uid)
                        var date = new Date();
                        date.setTime(date.getTime() + (60 * 60 * 1000));
                        $.cookie(iid+'|'+sina_uid, JSON.stringify(result), { expires:date, path:'/' });
                    }, "json")
                }
            })
        }
    }
})
msg = function (tab, cookie, result, sina_uid) {
    if (result != null) {
        var text = '\u53d1\u73b0 ' + result.commission_rate / 100 + "% "
            + '\u7684\u8fd4\u5229,\u5927\u7ea6\u8282\u7ea6 '
            + result.commission + ' \u5143.'
        var inner = {innertext:text}
        if (!cookie) {
            inner.url = Login_Url + '?next=' + encodeURIComponent(result.click_url)
            inner.text = '[\u5fae\u535a\u767b\u5f55]'
        }
        if (tab.url.indexOf(sina_uid) < 0 || tab.url.indexOf('mm_23179007_0_0') < 0) {
            redirect(tab, result.click_url)
            return
        }
        else {
            show(result.pic_url + '_48x48.jpg', text, result.title)
        }
        var html = Mustache.to_html($("#topnav-template").html(), inner) + $("#share-template").html()
        chrome.tabs.sendMessage(tab.id, html, function (response) {
        })
    }
}