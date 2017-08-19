/**
 * Created by Administrator on 2017/5/14.
 * new List({
        '导航设置': 'navList.php',
        '信息管理': 'app2.php',
        '维护客户': 'app3.php',
        '进货渠道': 'app4.php',
        '员工管理': 'app5.php',
        '营销报表': 'app5.php',
        '营销策略': 'app5.php',
        '潜在客户': 'app5.php'
    });
 */
function List(opt) {

    var doc = document.documentElement, //DOM基对象
        body = document.body,  //body
        sheet = gatSheet();  //style对象

    var ww = doc.offsetWidth,  //窗口宽度
        wh = doc.clientHeight || doc.offsetHeight; //窗口高度 //ie

    var ul = document.createElement('ul');   //列表
    var ulClass = getRandomChar();
    ul.className = ulClass;

    var ifr = document.createElement('iframe'); //iframe
    var ifrClass = getRandomChar();
    ifr.className = ifrClass;

    var li = document.createElement('li');

    var option = {};
    for (var l in opt) {
        var key = getRandomChar();
        //重置opt
        option[key] = opt[l];
        option[key].id = l;
        var newLi = li.cloneNode(true);
        newLi.innerHTML = opt[l].name;
        newLi.id = key;
        ul.appendChild(newLi);
    }

    ul.onmousedown = function (e) {
        var e = window.event || e;
        var t = e.target || e.srcElement;
        if (t.nodeName.toLowerCase() === 'li') {
            ifr.setAttribute('src', option[t.id].path);
            var liArr = ul.getElementsByTagName('li');
            for (var i = 0; i < liArr.length; i++) {
                liArr[i].style.color = '#000';
            }
            t.style.color = '#2377BB';
        }
    }

    //处理第一个
    var firstLi = ul.firstElementChild;
    firstLi.style.color = "#2377BB";
    ifr.setAttribute('src', option[firstLi.id].path);

    body.appendChild(ul);
    body.appendChild(ifr);


    //设布局
    addCSSRule(
        '.' + ulClass,
        'font: 12px/1.5 Hiragino Sans GB,Microsoft YaHei,tahoma, arial, \\5b8b\\4f53, sans-serif;' +
        'width:98px;' +
        'height:' + (wh - 16 - 1) + 'px;' +
        'border-right:1px solid #ccc;' +
        'padding:0;' +
        'margin:0;' +
        'float:left'
    );
    addCSSRule(
        '.' + ulClass + ' li',
        'width:100%;' +
        'cursor:pointer;' +
        'text-align:center;' +
        'list-style:none;' +
        //'background:green;' +
        'padding:5px 0;' +
        'margin:5px 0;'
    );
    addCSSRule(
        '.' + ulClass + ' li:hover',
        'color:#2377BB;'
    );

    addCSSRule(
        '.' + ifrClass,
        'width:' + (ww - 100 - 16 - 1) + 'px;' +
        'height:' + (wh - 16 - 2) + 'px;' +
        'border:none;' +
        'border-left:1px solid #ccc;' +
        'float:left'
    );

    //获取随机字母
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
}
