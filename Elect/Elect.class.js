function Elect(opt) {
    for (var o in opt) {
        var elect = document.getElementById(o);
        elect.innerHTML = opt[o]['title'];
        var electContext = '';
        var ck = '';
        if (opt[o]['check']) {
            ck = 'ck="' + opt[o]['check'] + '"';
        }
        switch (opt[o]['type']) {
            case 'select':
                electContext = '<select ' + ck + '><option name="' + o + '" value="">== 请选择 ==</option>';
                for (var c in opt[o]['elect']) {
                    electContext += '<option name="' + o + '" value="' + c + '">' + opt[o]['elect'][c] + '</option>';
                }
                electContext += '</select>';
                break;
            case 'text':
                electContext = '<input ' + ck + ' type="text" name="' + o + '" value=""/>';
                break;
            case 'textarea':
                electContext = '<textarea ' + ck + ' name="' + o + '"></textarea>';
                break;
            case 'radio':
                for (var c in opt[o]['elect']) {
                    electContext += '<label><input type="radio" name="' + o + '" value="' + c + '"/>' + opt[o]['elect'][c] + '</label>';
                }
                break;
            case 'checkbox':
                for (var c in opt[o]['elect']) {
                    electContext += '<label><input type="checkbox" name="' + o + '" value="' + c + '"/>' + opt[o]['elect'][c] + '</label>';
                }
                break;
        }
        var nextSib = elect.nextSibling;
        if (nextSib.nodeType == 3) {
            nextSib = nextSib.nextSibling;
        }
        nextSib.innerHTML = electContext;

    }
}