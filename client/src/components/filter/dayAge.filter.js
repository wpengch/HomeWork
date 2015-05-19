
/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：dayAge
 * 作用：将日期转换成日期 岁数的形式
 */
(function(){
    'use strict';

    angular.module('home').filter('dayAge', dayAgeFilter);

    dayAgeFilter.$inject=['$filter'];

    function dayAgeFilter($filter){
        return dayAgeFilterImpl;

      /**
       * 过滤器实现
       * @param value     原始值
       * @returns {string} 过滤后的值
       */
        function dayAgeFilterImpl(value){
          var date;
          if (!value) {
            return "未填写";
          } else {
            date = new Date(value);
          }
          return $filter('date')(date, 'yyyy年MM月dd日') + "   " + (new Date().getYear() - date.getYear()) + "岁";
        }
    }
})();
