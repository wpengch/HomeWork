/**
 * 创建人：pengchao
 * 创建时间：2015-3-26-0026
 * 工厂名字：String
 * 作用：扩展String的方法
 */
(function () {
    'use strict';

    Array.prototype.customFind = function (func) {
        for (var i = 0; i < this.length; i++) {
            if (func(this[i])) {
                return this[i];
            }
        }
    };

    /**
     *
     * @param elOrFunc 元素 或者 函数
     * @param all 是否删除全部，如果为false，删除第一个预见的
     * @returns {number}
     */
    Array.prototype.customRemove = function (elOrFunc, all) {
        if (!elOrFunc) {
            return 0;
        }
        var result = 0;
        all = all || false;
        var isFunc = angular.isFunction(elOrFunc);
        if (all) {
            for (var i = this.length - 1; i >= 0; i--) {
                if ((isFunc && elOrFunc(this[i])) || (!isFunc && (elOrFunc === this[i]))) {
                    this.splice(i, 1);
                    result++;
                }
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                if ((isFunc && elOrFunc(this[i])) || (!isFunc && (elOrFunc === this[i]))) {
                    this.splice(i, 1);
                    result++;
                    break;
                }
            }
        }
        return result;
    };
})();
