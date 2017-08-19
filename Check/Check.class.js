/**
 * Created by Administrator on 2017/5/14.
 *
 * 使用方法
 * var check = new Check();
 *
 * 在最后要提交的时候
 *
 * check.finalCheck();
 *
 */

function Check() {

    var domAll = document.all,
        body = document.body,  //body
        sheet = gatSheet();  //style对象


    //检查标志
    var necessaryNode = document.createElement('span');
    var necessaryClass = getRandomChar(4);
    necessaryNode.setAttribute('class', necessaryClass);
    necessaryNode.innerHTML = '?';

    //检查提示
    var infoNode = document.createElement('span');
    infoNode.setAttribute('class', necessaryClass);
    infoNode.style.position = 'absolute';
    var newInfoNode = '';

    for (var i = 0; i < domAll.length; i++) {
        var ck = domAll[i].getAttribute('ck');
        if (ck != '' && ck != null) {
            //克隆节点
            var newNecessaryNode = necessaryNode.cloneNode(true);

            newNecessaryNode.onmouseout = function () {
                if (newInfoNode.parentNode != null) {
                    newInfoNode.parentNode.removeChild(newInfoNode);
                }
            }

            newNecessaryNode.onclick = function (e) {
                var info = '';
                var regLen = '';
                var type = this.previousSibling.getAttribute('ck');

                if (type.indexOf('-') > 0) {
                    info = '数字且长度为:' + type;
                }

                if (type.indexOf('~') > 0) {
                    info = '长度为' + type;
                }

                //正整数
                regLen = /^\+?[1-9][0-9]*$/;
                if (regLen.test(type)) {
                    info = '位数必须为' + type;
                }

                if (type.indexOf('+.') == 0) {
                    var n = type.substr(2);
                    info = '正数且最多带' + n + '位小数的数字';
                }

                switch (type) {
                    case 'NOTNULL':
                        info = '不得为空';
                        break;
                    case 'ZH':
                        info = '必须是汉字';
                        break;
                    case 'EN':
                        info = '必须是英文';
                        break;
                    case 'EN09':
                        info = '数字和26个英文字母';
                        break;
                    case 'ZH09':
                        info = '中文和数字';
                        break;
                    case 'EN09ZH':
                        info = '中文英文和数字';
                        break;
                    case 'EMAIL':
                        info = '必须是邮箱';
                        break;
                    case 'URL':
                        info = '必须是URL';
                        break;
                    case 'PHONE':
                        info = '必须是手机或电话';
                        break;
                    case 'CARD':
                        info = '必须是身份证';
                        break;
                    case 'QQ':
                        info = '必须是QQ';
                        break;
                    case 'IP':
                        info = '必须是IP';
                        break;
                }
                showInfo(info, e);
            }
            domAll[i].parentNode.appendChild(newNecessaryNode);
        }
    }

    //手动调用次函数，用于提交前的最终检查
    this.finalCheck = function () {
        //重新获取被检查的元素
        var domAll = document.all;
        var rs = true;
        for (var i = 0; i < domAll.length; i++) {
            if (!check(domAll[i])) {
                rs = false;
                break;
            }
        }
        return rs;
    }

    function showInfo(info, e) {
        var e = window.event || e;
        newInfoNode = infoNode.cloneNode(true);
        newInfoNode.innerHTML = info;
        newInfoNode.style.top = (e.clientY - 10) + 'px';
        newInfoNode.style.left = (e.clientX + 10) + 'px';
        body.appendChild(newInfoNode);
    }

    function checkInfo(obj) {

        obj.nextSibling.click();
        newInfoNode.style.top = obj.nextSibling.getBoundingClientRect().top + 'px';
        newInfoNode.style.left = obj.nextSibling.getBoundingClientRect().left + 'px';
    }

    //绑定检查字段点击事件
    body.onclick = function (e) {
        var e = window.event || e;
        var obj = e.target || e.srcElement;

        //检查对象
        doCheck(obj);

    }


    function doCheck(obj) {
        obj.onblur = function () {

            check(obj);
        }
    }

    function check(obj) {

        if (newInfoNode.parentNode != null) {
            newInfoNode.parentNode.removeChild(newInfoNode);
        }

        var type = obj.getAttribute('ck');

        if (type != '' && type != null) {

            //检查空 ck="NOTNULL"
            if (type == 'NOTNULL') {
                var val = obj.value;
                if (val == '') {
                    checkInfo(obj);
                    return false;
                }
            }


            //检查数字且个数范围 ck="1-8"
            if (type.indexOf('-') > 0) {
                var val = obj.value;
                var arr = type.split('-');
                eval("var reg = /^\\d{" + arr[0] + "," + arr[1] + "}$/;");
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //检查任意个数范围 ck="1~8"
            if (type.indexOf('~') > 0) {
                var val = obj.value;
                var arr = type.split('~');
                eval("var reg = /^.{" + arr[0] + "," + arr[1] + "}$/;");
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }


            //检查确定个数 ck="4"
            var regLen = /^\+?[1-9][0-9]*$/;　　//正整数
            if (regLen.test(type)) {
                var val = obj.value;
                eval("var reg = /^\\d{" + type + "}$/;");
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //非零开头的最多带n位小数的数字 ck="+.2"
            if (type == '+.') {
                var val = obj.value;
                var n = type.substr(2);
                eval("var reg = /^([0-9][0-9]*)+(.[0-9]{1," + n + "})?$/;");
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //汉字 ck="ZH"
            if (type == 'ZH') {
                var val = obj.value;
                var reg = /^[\\u4e00-\\u9fa5]{0,}$/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //所有英文 ck="EN"
            if (type == 'EN') {
                var val = obj.value;
                var reg = /^[A-Za-z]+$/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //数字和26个英文字母组成的字符串
            if (type == 'EN09') {
                var val = obj.value;
                var reg = /^[A-Za-z0-9]+$/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //数字和中文字母组成的字符串
            if (type == 'ZH09') {
                var val = obj.value;
                var reg = /^[\\u4E00-\\u9FA50-9]+$/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //中文英文数字
            if (type == 'EN09ZH') {
                var val = obj.value;
                var reg = /^[\\u4E00-\\u9FA5A-Za-z0-9]+$/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //检查邮箱 ck="EMAIL"
            if (type == 'EMAIL') {
                var val = obj.value;
                var reg = /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //检查邮箱 ck="URL"
            if (type == 'URL') {
                var val = obj.value;
                var reg = /[a-zA-z]+:\/\/[^\\s]*/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //检查电话手机
            if (type == 'PHONE') {
                var val = obj.value;
                var reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //检查身份证
            if (type == 'CARD') {
                var val = obj.value;
                var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //检查QQ
            if (type == 'QQ') {
                var val = obj.value;
                var reg = /^\d{5,10}$/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }

            //检查IP
            if (type == 'IP') {
                var val = obj.value;
                var reg = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;
                if (!reg.test(val)) {
                    checkInfo(obj);
                    return false;
                }
            }
        }

        return true;
    }

    //设布局检查标志
    addCSSRule(
        '.' + necessaryClass,
        'color:#FFFFCC;' +
        'font-size:9px;' +
        'font-weight: bold;' +
        'background:#5DA8CB;' +
        'margin-left:5px;' +
        'border-radius:5px;' +
        'padding:0 5px;' +
        'cursor:pointer;'
    );


    //获取随机字母
    function getRandomChar(len) {
        var rc = '';
        for (var i = 0; i < len; ++i) {
            rc += String.fromCharCode(65 + Math.ceil(Math.random() * 25));
        }
        return rc;
    }

    //创建style
    function gatSheet() {
        var style = document.createElement("style");
        document.getElementsByTagName("head")[0].appendChild(style);
        return document.styleSheets[0];
    }

    //设置style规则
    function addCSSRule(selector, rules) {
        if ("insertRule" in sheet)
            sheet.insertRule(selector + "{" + rules + "}", sheet.cssRules.length);
        else if ("addRule" in sheet)
            sheet.addRule(selector, rules, -1);
    }
}
