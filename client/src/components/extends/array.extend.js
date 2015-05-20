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

    Array.prototype.filterArr = function (arr, func) {
        var results = [];
        for (var i = 0; i < this.length; i++) {
            var item = this[i];
            if (!arr.customFind(function (obj) {
                    return func(obj, item);
                })) {
                results.push(item);
            }
        }
        return results;
    };

    if (!Array.prototype.customFilter) {
        Array.prototype.customFilter = function (func) {
            var results = [];
            angular.forEach(this, function (obj) {
                if (func(obj)) {
                    results.push(obj);
                }
            });
            return results;
        };
    }

    if (!Array.prototype.remove) {
        Array.prototype.remove = function (index) {
            this.splice(index, 1);
        };
    }

    if (!Array.prototype.exchange) {
        Array.prototype.exchange = function (dx1, dx2) {
            var tmp   = this[dx1];
            this[dx1] = this[dx2];
            this[dx2] = tmp;
        };
    }

    if (!Array.prototype.insert) {
        Array.prototype.insert = function (index, item) {
            this.splice(index, 0, item);
        };
    }

    if (!Array.prototype.moveTo) {
        Array.prototype.moveTo = function (init, to) {
            if (to > init) {
                this.insert(to, this[init]);
                this.splice(init, 1);
            }else{
                var tmp = this[init];
                this.splice(init, 1);
                this.insert(to);
            }
        };
    }

    if(!Array.prototype.moveToFirst) {
        Array.prototype.moveToFirst = function(dx) {
            if(dx != 0) {
                var item = this[dx];
                this.remove(dx);
                this.insert(0, item);
            }
        };
    }
    if(!Array.prototype.moveToLast) {
        Array.prototype.moveToLast = function(dx) {
            if(dx != this.length - 1) {
                var item = this[dx];
                this.remove(dx);
                this.push(item);
            }
        };
    }

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
        all        = all || false;
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
})
();
