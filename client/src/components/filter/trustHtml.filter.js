
/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：trustHtml
 * 作用：将一般字符串转换成html信任域的字符串
 */
(function(){
    'use strict';

    angular.module('home').filter('trustHtml', trustHtmlFilter);

    trustHtmlFilter.$inject=['$sce'];

    function trustHtmlFilter($sce){
        return trustHtmlFilterImpl;

        function trustHtmlFilterImpl(value){
          value = value || "<p>未填写</p>";
          return $sce.trustAsHtml(value);
        }
    }
})();
