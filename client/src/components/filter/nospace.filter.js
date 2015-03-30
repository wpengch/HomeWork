
/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：nospace
 * 作用：将空值使用''并且去掉左右空格的过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('nospace', nospaceFilter);

    nospaceFilter.$inject=[];

    function nospaceFilter() {
      return nospaceFilterImpl;


      function nospaceFilterImpl(value) {
        return (!value) ? '' : value.replace(/ /g, '');
      }
    }
})();
