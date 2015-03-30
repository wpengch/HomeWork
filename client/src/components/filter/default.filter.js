/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：default
 * 作用：将空值使用'未填写'或者默认值并且去掉左右空格的过滤器
 */
(function () {
  'use strict';

  angular.module('home').filter('default', defaultFilter);

  defaultFilter.$inject = [];

  function defaultFilter() {
    return defaultFilterImpl;


    function defaultFilterImpl(value, def) {
      def = def || "未填写";
      if (!angular.isString(value)) {
        return (!value) ? def : value;
      }
      return (!value) ? def : value.replace(/ /g, '');
    }
  }
})();
