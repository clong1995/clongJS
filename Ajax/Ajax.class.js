/**
 *
 */
function Ajax() {
    //公共方法
    this.get = function (opt) {
        send('GET', opt);
    };
    this.post = function (opt) {
        send('POST', opt);
    };

    //私有方法
    function send(method, opt) {
        //去缓存
        var noCache = '?t=' + new Date().getTime();

        //通用的xmlHttp
        var xmlHttp = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

        //组织参数
        var params = [];
        for (var key in opt.data)
            params.push(key + '=' + opt.data[key]);

        var postData = params.join('&');

        //get 或者 post
        if (method === 'GET') {
            xmlHttp.open(method, opt.url + noCache + '&' + postData, opt.async);
            xmlHttp.send(null);
        } else {
            xmlHttp.open(method, opt.url + noCache, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        }

        //状态改变
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                opt.success(xmlHttp.responseText);
            }
        };
    }

}