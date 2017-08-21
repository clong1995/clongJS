/**
 * 桌面组件
 */
function Desktop(opt) {

    var doc = document.documentElement, //DOM基对象
        body = document.body,  //body
        dock = document.createElement('div'),   //程序托盘
        sheet = gatSheet();  //style对象

    //var iPPZ = 0;
    var time = new Date().getTime();
    var ww = doc.offsetWidth,  //窗口宽度
        wh = doc.clientHeight || doc.offsetHeight; //窗口高度 //ie

    var appWidth = 70,   //app宽度
        appHeight = 55,  //app高度
        appBottom = 30;  //app底部距离


    //托盘id
    var dockClass = getRandomChar() + new Date().getTime();
    //窗口class
    var winClass = getRandomChar() + new Date().getTime();

    dock.className = dockClass;


    //程序图标
    var appList = {};
    var appLen = 0;//1;
    for (var j in opt.icon) {
        appLen++;
        //重构appList
        var key = getRandomChar() + new Date().getTime();
        appList[key] = opt.icon[j];
        appList[key].id = j;

        var app = document.createElement('div');
        //var icon = appList[j][0].replace(/(.*\/)*([^.]+).*/ig, "$2");
        app.innerHTML = opt.icon[j].name;
        app.id = key;
        app.style.background = 'url("' + opt.img + '/' + j + '.png") top no-repeat';
        dock.appendChild(app);
    }

    /*
    //默认就有公司通讯
    var im = document.createElement('div');
    im.innerHTML = "消息";
    var imKey = getRandomChar() + new Date().getTime();
    im.id = imKey;
    im.style.background = 'url("' + opt.img + '/log.png") top no-repeat';
    im.style.position = 'relative';
    dock.appendChild(im);
    appList[imKey] = {
        id:'im',
        name: '消息',
        path: 'im_win.php',
        width: 700,
        height: 550
    }

    var msg = document.createElement('span');
    var msgKey = getRandomChar() + new Date().getTime();
    msg.id = msgKey;
    msg.style.cssText="background:red;font-size:10px;letter-spacing:0;position:absolute;top:0;right:5px;display:block;width:17px;height:17px;line-height:17px;border-radius:50%";
    im.appendChild(msg);
    msg.innerHTML = '5';
    */

    //设置dock布局样式表
    var dockWidth = (appWidth + 5 * 2) * appLen;


    //绑定弹窗事件
    var winCount = 0;
    dock.onmousedown = function (e) {
        var e = window.event || e;
        var t = e.target || e.srcElement;
        if (t.nodeName.toLowerCase() === 'div') {

            var ti = t.id;

            //判断是否是否存在
            var tw = document.getElementById(ti + time);
            if (tw) {//存在
                tw.style.zIndex = ++winCount;
            } else {
                //窗口对象
                winPop({
                    width: appList[ti].width,
                    height: appList[ti].height,
                    title: appList[ti].name,
                    id: ti + time,
                    content: '<iframe src="' + appList[ti].path + '?t=' + getRandomChar() + new Date().getTime() + '">'
                });
                //窗口计数
                document.getElementById(ti + time).style.zIndex = ++winCount;
            }
        }
    }

    //桌面加入dock
    body.appendChild(dock);


    //加入即时通讯框

    /*
     document.oncontextmenu = function () {
     return false;
     }

     document.onselectstart = function () {
     return false;
     }

     document.oncopy = function () {
     return false;
     }
     */

    //获取随机字母
    function getRandomChar(len) {
        var len = len || 4;
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


    var contentClass = getRandomChar();
    var titleClass = getRandomChar();
    var shadeIfrClass = getRandomChar();

    function winPop(winOpt) {

        /*{
         width: 700,
         height: 500,
         title: '测试弹窗',
         content: '测试内容'，
         id:'id'
         }*/

        //窗体
        var win = document.createElement('div');



        //标题
        var title = document.createElement('h3');
        title.className = titleClass;

        //主体
        var content = document.createElement('div');
        content.className = contentClass;

        //关闭
        var close = document.createElement('span');

        //遮挡iframe防止鼠标离开body
        var shadeIfr = document.createElement('div');
        shadeIfr.className = shadeIfrClass;

        //设置标题
        title.innerHTML = winOpt.title;

        //设置主体
        content.innerHTML = winOpt.content;

        //关闭
        close.innerHTML = '●';

        //移动动作
        title.onmousedown = function (e) {

            this.parentNode.style.zIndex = ++winCount;

            this.parentNode.appendChild(shadeIfr);

            var e = window.event || e;

            var winObj = this.parentNode;

            var x = e.clientX - winObj.offsetLeft;
            var y = e.clientY - winObj.offsetTop;

            body.onmousemove = function (event) {
                e = event || window.event;

                win.style.left = e.clientX - x + 'px';
                win.style.top = e.clientY - y + 'px';
            }
        };

        //解除移动
        body.onmouseup = function () {
            body.onmousemove = null;
            win.removeChild(shadeIfr);
        }

        //关闭动作
        close.onmousedown = function (e) {
            var e = window.event || e;
            if (document.all) {  //只有ie识别
                e.cancelBubble = true;
            } else {
                e.stopPropagation();
            }
            win.parentNode.removeChild(win);
        };

        var winSize = 'width:' + winOpt.width + 'px;' +
            'height:' + winOpt.height + 'px;' +
            'top:' + ((wh - winOpt.height) / 2) + 'px;' +
            'left:' + ((ww - winOpt.width) / 2) + 'px;';

        //加入关闭
        title.appendChild(close);
        //加入标题
        win.appendChild(title);
        //设置主体
        win.appendChild(content);
        //设置id
        win.className = winClass;
        win.style.cssText = winSize;
        win.id = winOpt.id;
        body.appendChild(win);
    }


    //设布局body
    addCSSRule(
        'body',
        'overflow:hidden;' +
        'margin:0;' +
        'width:' + ww + 'px;' +
        'background: url("' + opt.img + '/bg.jpg") bottom no-repeat;' +
        'height:' + wh + 'px;' +
        '-webkit-user-select:none;' +
        '-moz-user-select:none;' +
        '-o-user-select:none;' +
        'user-select:none;'
    );
    //设置托盘
    addCSSRule(
        '.' + dockClass,
        'width:' + dockWidth + 'px;' +
        'overflow:hidden;' +
        'font-size:12px;' +
        'position:absolute;' +
        'left:' + (ww - dockWidth - 45 * 2) / 2 + 'px;' +
        'bottom:' + appBottom + 'px;' +
        'padding:10px 45px 5px 45px;' +
        'border-radius:8px 8px 0 0;' +
        'border:1px solid rgba(255,255,255,0.4);' +
        'border-bottom:1px solid rgba(255,255,255,1);' +
        'background:rgba(240,240,240,0.4)'
    );

    //设置程序图标布局样式表
    addCSSRule(
        '.' + dockClass + ' div',
        'width:' + appWidth + 'px;' +
        'padding-top:' + appHeight + 'px;' +
        'float:left;' +
        'margin:0 5px;' +
        'text-align:center;' +
        'letter-spacing: 2px;' +
        'color:#fff;' +
        'text-shadow: 0 0 2px #000 ;' +
        'background:#ccc;' +
        'cursor:pointer;'
    );

    //设置布局
    addCSSRule(
        '.' + winClass,
        'position:absolute;' +
        'border:1px solid #ccc;'
    );


    //设置标题布局
    addCSSRule(
        '.' + titleClass,
        'text-align:center;' +
        'width:100%;' +
        'height:30px;' +
        'line-height:30px;' +
        'font-weight:normal;' +
        'font-size:14px;' +
        'letter-spacing: 1px;' +
        'cursor:move;' +
        'background:#ccc;' +
        'background:rgba(204,204,204,0.6);' +
        'border-radius:7px 7px 0 0;' +
        'margin:0;' +
        'left:-1px;' +
        'position:absolute;' +
        'top:-32px;' +
        'border:1px solid #ccc;' +
        'border-top:2px solid #ccc;' +
        'border-bottom:none;'
    );

    //设置主体布局
    addCSSRule(
        '.' + contentClass,
        'width:100%;' +
        'height:100%;' +
        'background:#fff;'
    )

    //设置标题布局
    addCSSRule(
        '.' + titleClass + " span",
        'color:red;' +
        'font-size:24px;' +
        'cursor:pointer;' +
        'position:absolute;' +
        'right:10px;' +
        'line-height:27px;'
    );

    //设置iframe布局
    addCSSRule(
        '.' + contentClass + " iframe",
        'width:100%;' +
        'height:100%;' +
        'border:none;'
    );

    //设置iframe布局
    addCSSRule(
        '.' + shadeIfrClass,
        'width:100%;' +
        'height:100%;' +
        'position:absolute;'+
        'top:0;'+
        'left:0;'
    );
}