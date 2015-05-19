
/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：newType
 * 作用：新闻类型过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('newType', newTypeFilter);

    newTypeFilter.$inject=['Config'];

    function newTypeFilter(Config){
        return newTypeFilterImpl;

        function newTypeFilterImpl(value){
          value = value || 1;
          return Config.NewsTypes[value - 1].name;
        }
    }
})();
