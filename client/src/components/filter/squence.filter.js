/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：dayAge
 * 作用：序列转化器 岁数的形式
 */
(function () {
    'use strict';

    angular.module('home').filter('sequence', sequence);

    sequence.$inject = ['$filter'];

    function sequence($filter) {
        return function (value, type, args) {
            type  = type || 'number';
            value = value || 0;
            if (!angular.isNumber(value)) {
                return value;
            }

            //显示数字
            if (type === 'number') {
                return value;
            }
            var result;
            //显示字母
            if (type === 'case') {
                args       = args || 'letter';
                var values = [
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
                ];
                result = '';
                do {
                    result += values[value % values.length];
                    value = value - values.length;
                } while (value > 0)
                result = result.reverse();
                return args === 'letter' ? result : result.toUpperCase();
            }

            //显示中文一二三四
            if (type === 'zh') {
                var ary0 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
                var ary1 = ["", "十", "百", "千"];
                var ary2 = ["", "万", "亿", "兆"];
                if(value === 0) {
                    return ary0[0];
                }
                var results = [];
                do{
                    var item = '';
                    var tmp = value % 10000;
                    if(tmp > 1000) {
                        item += ary0[tmp / 1000] + ary1[3];
                    }
                    tmp = tmp % 1000;
                    if(tmp > 100) {
                        item += ary0[tmp / 100] + ary1[2];
                    }

                    tmp = tmp % 100;
                    if(tmp > 10) {
                        item += ary0[tmp / 10] + ary1[1];
                    }
                    tmp = tmp % 10;
                    if(tmp > 0) {
                        item += ary0[tmp] + ary1[0];
                    }
                    results.push(item);
                    value = value / 10000;
                    value = Math.floor(value);
                }while(value > 0);

                results = results.reverse();
                result = '';

                for(var i = 0; i < results.length; i ++) {
                    result += results[length] + ary2[results.length - i - 1];
                }
                return result;
            }
        };

    }

})();