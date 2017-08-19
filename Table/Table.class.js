/**
 * Author 成龙哥哥
 * Version 20175290152
 *
 new Table({
        id: 'navTable',                                 // 容器id
        page: 3,                                      // 当前页
        allPage: 6,                                   // 总页数
        handle: {add: true,delete:true,modify:true,detail:true},                                 // 是否开启操作按钮
        imgPath: '<?=ENG_RES . '/img/handle.png'?>',    //操作按钮图标
        thead: ['导航名称', '排序'],                      // 表头
        tbody: [
            ['1', '姓名', '1'],                           //表体，第一个默认为内容的id，用于开启checkbox操作值，不开启则留空
            ['2', '性别', '2'],
            ['3', '爱好', '3'],
            ['4', '地址', '4'],
            ['5', '电话', '5'],
            ['6', 'qq', '6'],
            ['7', '微信', '7'],
            ['8', '婚否', '8'],
            ['9', '存款', '9']
        ],
        onClickAdd: function (rtArr) {                  //点击添加按钮，rtArr为选中的checkbox值，当checkbox开启时使用
            alert(rtArr);
        },
        onClickDelete: function (rtArr) {               //同上
            alert(rtArr);
        },
        onClickModify: function (rtArr) {               //同上
            alert(rtArr);
        },
        onClickDetail: function (rtArr) {               //同上
            alert(rtArr);
        }
    });
 */
function Table(opt) {

    var page = opt.page || 1;
    var allPage = opt.allPage || 0;

    var doc = document.documentElement, //DOM基对象
        body = document.body,  //body
        tableContainer = document.getElementById(opt.id),   //表格容器
        sheet = gatSheet();  //style对象

    var ww = doc.offsetWidth,  //窗口宽度
        wh = doc.clientHeight || doc.offsetHeight; //窗口高度 //ie

    var table = document.createElement('table');//表格
    var tableId = getRandomChar();
    table.id = tableId;
    var odd = getRandomChar();
    var even = getRandomChar();
    var currentPage = getRandomChar();

    /*
     var relUrl = GetUrlRelativePath();
     relUrl = relUrl.substr(0, relUrl.indexOf('.'));
     */
    /*
    var havePageBar = false;
    if(allPage > 0){
        havePageBar = true;
    }
    */


    //操作表
    var add, del, modify, detail, checkBoxName;
    var handleFlag = false;
    if (opt.handle.add || opt.handle.delete || opt.handle.modify || opt.handle.detail) {
        handleFlag = true;
    }

    if (handleFlag) {
        checkBoxName = getRandomChar();
        var handle = document.createElement('div');
        var item = document.createElement('span');
        var handleClass = getRandomChar();
        handle.className = handleClass;

        //增
        if (opt.handle.add) {
            add = item.cloneNode(true);
            add.innerHTML = '添加';
            add.style.backgroundPosition = '1px 4px';
            handle.appendChild(add);
        }


        //删
        if (opt.handle.delete) {
            del = item.cloneNode(true);
            del.innerHTML = '删除';
            del.style.backgroundPosition = '1px -13px';
            handle.appendChild(del);
        }

        //改
        if (opt.handle.modify) {
            modify = item.cloneNode(true);
            modify.innerHTML = '修改';
            modify.style.backgroundPosition = '1px -31px';
            handle.appendChild(modify);
        }

        //查
        if (opt.handle.detail) {
            detail = item.cloneNode(true);
            detail.innerHTML = '查看';
            detail.style.backgroundPosition = '1px -47px';
            handle.appendChild(detail);
        }

        tableContainer.appendChild(handle);

        addCSSRule(
            '.' + handleClass,
            'width:100%;'
        );
        addCSSRule(
            '.' + handleClass + ' span',
            'background: url("' + opt.imgPath + '") no-repeat;' +
            'float: left;' +
            'padding-left: 15px;' +
            'margin: 0 10px 5px 0;' +
            'cursor: pointer;'
        );

    }
    /*表头*/
    var thead = document.createElement('thead');
    var thTr = document.createElement('tr');

    var theadArr = opt.thead;
    var columnLen = theadArr.length;
    var checkAll;
    if (handleFlag) {
        var thTh = document.createElement('th');
        checkAll = document.createElement('input');
        checkAll.setAttribute('type', 'checkbox');
        checkAll.onchange = function () {
            var checkList = document.getElementsByName(checkBoxName);
            if (this.checked) {
                for (var c in checkList) {
                    checkList[c].checked = true;
                }
            } else {
                for (var c in checkList) {
                    checkList[c].checked = false;
                }
            }
        }
        thTh.appendChild(checkAll);
        thTr.appendChild(thTh);
    }
    for (var i = 0; i < columnLen; ++i) {
        var thTh = document.createElement('th');
        thTh.innerHTML = opt.thead[i];
        thTr.appendChild(thTh);
    }
    thead.appendChild(thTr);
    table.appendChild(thead);

    /*表体*/
    var tbody = document.createElement('tbody');
    var tbodyArr = opt.tbody;
    var tb = '';
    var trTmp = 'class=';
    var trStart = 0;
    for (var i = 0; i < tbodyArr.length; ++i) {
        if (i % 2 == 0) {
            trTmp += odd;
        } else {
            trTmp += even;
        }
        var tbTr = '<tr ' + trTmp + '>';
        if (handleFlag) {
            tbTr += '<td><input type="checkbox" value="' + tbodyArr[i][0] + '" name="' + checkBoxName + '"></td>';
        }
        for (var j = 1; j <= columnLen; ++j) {
            tbTr += '<td>' + tbodyArr[i][j] + '</td>';
        }
        tb += tbTr + '</tr>';
        trTmp = 'class=';
    }
    tbody.innerHTML = tb;
    table.appendChild(tbody);

    /*表尾*/

    var tfoot = document.createElement('tfoot');
    if (handleFlag) {
        columnLen += 1;
    }

    var tfTr = '<tr><td colspan="' + columnLen + '">';
    var aTmp = '';
    for (var i = 1; i <= allPage; ++i) {
        if (i == page) {
            aTmp = 'class=' + currentPage;
        }
        tfTr += '<span ' + aTmp + '>' + i + '</span>';
        aTmp = '';
    }
    tfTr += '<div>共 ' + allPage + ' 页 | 跳转到 <input type="text"/> 页 确定</div></td></tr>';
    tfoot.innerHTML = tfTr;
    table.appendChild(tfoot);


    tableContainer.appendChild(table);


    tfoot.onmousedown = function (e) {
        var e = window.event || e;
        var t = e.target || e.srcElement;
        if (t.nodeName.toLowerCase() === 'span') {
            htmlPost({
                data: {
                    page: t.innerHTML
                }
            });
        }
    }


    //回调参数
    if (handleFlag) {
        if (opt.handle.add) {
            add.onmousedown = function () {
                opt.onClickAdd(getChecked().join(","));
            }
        }

        if (opt.handle.delete) {
            del.onmousedown = function () {
                var check_val = getChecked();
                if (check_val.length == 0) {
                    alert('未选择删除的内容！');
                } else {
                    if (confirm('确实要删除该内容吗?')) {
                        opt.onClickDelete(check_val.join(","));
                    }
                }
            }
        }

        if (opt.handle.modify) {
            modify.onmousedown = function () {
                var check_val = getChecked();
                if (check_val.length == 0) {
                    alert('未选择修改的内容！');
                } else if (check_val.length > 1) {
                    alert('一次只可修改一条！');
                } else {
                    opt.onClickModify(check_val.join(","));
                }
            }
        }

        if (opt.handle.detail) {
            detail.onmousedown = function () {
                var check_val = getChecked();
                if (check_val.length == 0) {
                    alert('未选择查看的内容！');
                } else if (check_val.length > 1) {
                    alert('一次只可查看一条！');
                } else {
                    opt.onClickDetail(check_val.join(","));
                }
            }
        }
    }


    //获取选中的值
    function getChecked() {
        var obj = document.getElementsByName(checkBoxName);
        var check_val = [];
        for (var o = 0; o < obj.length; ++o) {
            if (obj[o].checked)
                check_val.push(obj[o].value);
        }
        return check_val;
    }

    function GetUrlRelativePath() {
        var url = document.location.toString();
        var arrUrl = url.split("//");

        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

        if (relUrl.indexOf("?") != -1) {
            relUrl = relUrl.split("?")[0];
        }
        return relUrl;
    }

    //私有方法
    function htmlPost(opt) {
        var temp = document.createElement("form");
        temp.action = opt.url || '';
        temp.method = 'post';
        temp.style.display = "none";
        for (var x in opt.data) {
            var input = document.createElement("input");
            input.name = x;
            input.value = opt.data[x];
            temp.appendChild(input);
        }
        document.body.appendChild(temp);
        temp.submit();
        temp.parentNode.removeChild(temp);
    }

    //设布局body
    addCSSRule(
        '#' + opt.id,
        'font: 12px/1.5 Hiragino Sans GB,Microsoft YaHei,tahoma, arial, \\5b8b\\4f53, sans-serif;'
    );
    addCSSRule(
        '#' + tableId,
        'text-align:center;' +
        'border-collapse: collapse;' +
        'width:100%;' +
        'border: 1px solid #CCC;' +
        'border-bottom: none;' +
        'border-right: none;'
    );
    addCSSRule(
        '#' + tableId + ' thead th',
        //'background: #DBEFFA;' +
        'letter-spacing: 2px;' +
        'border: 1px solid #CCC;' +
        'border-top: none;' +
        'border-left: none;' +
        'padding: 2px 0;' +
        'background:-moz-linear-gradient(top, rgba(220, 231, 245,0.1), rgba(220, 231, 245, 1));' +
        'background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(220, 231, 245,0.1)), to(rgba(220, 231, 245, 0.9)));'
    );
    addCSSRule(
        '#' + tableId + ' tbody td',
        'border: 1px solid #CCC;' +
        'border-top: none;' +
        'border-left: none;' +
        'padding: 5px 0;'
    );
    addCSSRule(
        '.' + odd,
        'background: #ffffff;'
    );
    addCSSRule(
        '.' + even,
        'background: #FEFEFE;'
    );
    addCSSRule(
        '.' + odd + ':hover, .' + even + ':hover',
        //'background: #C1DCFC;'
        'background:-moz-linear-gradient(top, rgba(235, 243, 253,0.1), rgba(193, 220, 252, 0.3));' +
        'background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(235, 243, 253,0.1)), to(rgba(193, 220, 252, 0.4)));'
    );
    addCSSRule(
        '#' + tableId + ' tfoot td',
        'padding:5px 0;' +
        'border: 1px solid #CCC;' +
        'border-top: none;' +
        'border-left: none;'
    );
    addCSSRule(
        '#' + tableId + ' tfoot td span',
        'display: inline-block;' +
        'cursor:pointer;' +
        'padding: 0 5px;'
    );
    addCSSRule(
        '#' + tableId + ' tfoot td div',
        'display: inline-block;' +
        'padding: 0 5px;'
    );
    addCSSRule(
        '#' + tableId + ' tfoot td div input',
        'width: 25px;' +
        'height: 18px;' +
        'padding: 0 5px;'
    );
    addCSSRule(
        '.' + currentPage,
        'font-weight: bold;' +
        'font-size: 14px;' +
        'text-decoration: underline;'
    );


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