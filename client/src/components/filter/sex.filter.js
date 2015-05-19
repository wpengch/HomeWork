
/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：sex
 * 作用：性别过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('sex', sexFilter);

    sexFilter.$inject=[];

    function sexFilter(){
        return sexFilterImpl;

        function sexFilterImpl(value){
          return value === 1 ? "女" : "男";
        }
    }
})();
