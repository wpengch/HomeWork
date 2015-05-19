/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：dayAge
 * 作用：将日期转换成日期 岁数的形式
 */
(function () {
    'use strict';

    angular.module('home').filter('abcd', abcd);

    abcd.$inject = ['$filter'];

    function abcd($filter) {
        var dd = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        /**
         * 过滤器实现
         * @param value     原始值
         * @returns {string} 过滤后的值
         */
        return function (value, upper) {
            if (!angular.isNumber(value)) {
                return value;
            }
            upper = upper || 'letter';
            value = value % dd.length;
            if (upper === 'upper') {
                return dd[value].toUpperCase();
            } else if (upper === 'letter') {
                return dd[value];
            }
        }
    }
})();