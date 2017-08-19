/**
 * Created by Administrator on 2017/5/10.
 */
function Tab(appList, imgPath) {
    var doc = document.documentElement, //DOM基对象
        body = document.body,  //body
        nav = document.createElement('div'),   //程序托盘
        sheet = gatSheet(),  //style对象
        app = Object; //app对象

    var ww = doc.offsetWidth,  //窗口宽度
        wh = doc.clientHeight || doc.offsetHeight; //窗口高度 //ie

    body.style.overflow = 'hidden';
    doc.style.overflow = 'hidden';

    //托盘id
    var navId = getRandomChar(4);
    nav.setAttribute('id', navId);
    body.appendChild(nav);

    //添加logo
    var logo = document.createElement('a');
    var logoId = getRandomChar(4);
    logo.setAttribute('id', logoId);
    logo.setAttribute('href', '');
    nav.appendChild(logo);

    //添加用户信息
    var userInfo = document.createElement('div');
    var userInfoId = getRandomChar(4);
    userInfo.setAttribute('id', userInfoId);
    userInfo.innerHTML = '圣科网络技术有限公司<br/>于成龙<br/><span>账户信息</span>-<span>退出</span>';
    nav.appendChild(userInfo);

    //添加应用列表
    var appUl = document.createElement('ul');   //程序托盘
    var appUlId = getRandomChar(4);
    appUl.setAttribute('id', appUlId);
    nav.appendChild(appUl);


    //添加app
    for (var j in appList) {
        app = document.createElement('li');
        var icon =appList[j].replace(/(.*\/)*([^.]+).*/ig,"$2");
        app.innerHTML = '<img src="' + imgPath + '/' + icon + '.png"/>' + j;
        appUl.appendChild(app);
    }

    //添加主体
    var main = document.createElement('iframe');   //主体
    var mainId = getRandomChar(4);
    main.setAttribute('id', mainId);
    main.setAttribute('frameBorder', 0);
    body.appendChild(main);

    //默认选中第一个
    appUl.firstElementChild.style.background = '#f5f5f5';
    main.setAttribute('src',appList[appUl.firstElementChild.innerText]);
    //绑定点击事件
    appUl.onmousedown = function (e) {
        var e = window.event || e;
        var t = e.target || e.srcElement;
        if (t.nodeName.toLowerCase() === 'img') {
            var liArr = this.childNodes;
            for (var i = 0, iLen = liArr.length; i < iLen; i++) {
                liArr[i].style.background = '';
            }
            t.parentNode.style.background = '#f5f5f5';
            main.setAttribute('src',appList[t.parentNode.innerText]);
        }
    }




    //设布局body
    addCSSRule(
        'body',
        'background:#f5f5f5;' +
        'margin:0;'
    );

    //设置顶部导航
    addCSSRule(
        '#' + navId,
        'width:100%;' +
        'height:90px;' +
        'background:url("'+imgPath+'/bg.png");' +
        'overflow:hidden;'
    );
    //设置logo
    addCSSRule(
        '#' + logoId,
        'padding:53px 164px 0 0;' +
        'margin:18px 76px 18px 20px;' +
        'float:left;' +
        'background:url("'+imgPath+'/logo.png");'
    );
    //设置用户信息
    addCSSRule(
        '#' + userInfoId,
        'width:250px;' +
        'height:80px;' +
        //'text-align:right;' +
        'padding-top:10px;' +
        'float:right;' +
        'color:#fff'
    );
    //设置应用
    addCSSRule(
        '#' + appUlId,
        'width:' + (ww - 260 - 300) + 'px;' +
        'height:90px;' +
        'float:left;' +
        'padding:0;' +
        'margin:0;'
    );
    //设置应用
    addCSSRule(
        '#' + appUlId + ' li',
        'padding:5px 0 0 0;' +
        'height:75px;' +
        'width:90px;' +
        'font-size:12px;' +
        'text-align:center;' +
        'margin:10px 10px 0 0;' +
        'color:#fff;' +
        'text-shadow: 0 0 2px #000 ;' +
        'float:left;' +
        'border-radius: 8px 8px 0 0;' +
        'list-style:none;'
    );
    addCSSRule(
        '#' + appUlId + ' li img',
        'cursor:pointer;' +
        'width:50px;' +
        'margin:0 20px 2px 20px;' +
        'height:50px;'
    );

    //主体
    addCSSRule(
        '#' + mainId,
        'border:1px solid #ccc;' +
        'border-radius: 5px;' +
        'background:#fff;' +
        'padding:10px;'+
        'width:' + (ww - 40 - 10*2) + 'px;' +
        'height:' + (wh - 120 - 10*2) + 'px;' +
        'display: block;'+
        'margin:15px auto 0 auto;'
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
