/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：modelEdit
 * 作用：跳转到模型编辑
 */
(function () {
    'use strict';

    angular.module('home').filter('modelEdit', modelEditFilter);

    modelEditFilter.$inject = ['Config'];

    function modelEditFilter(Config) {
        return modelEditFilterImpl;

        function modelEditFilterImpl(value) {
          return Config.Urls.RestUrl + "workflow/modeler.html?modelId=" + value;
        }
    }
})();
