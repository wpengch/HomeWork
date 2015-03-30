/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：Runtime
 * 作用：运行时Rest接口
 */
(function () {
    'use strict';

    angular.module('home').factory('RuntimeRest', RuntimeRest);

  RuntimeRest.$inject = ['$log', 'Config','Restangular'];

    function RuntimeRest($log, Config,Restangular) {
        //接口定义
      var factory = Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl((Config.Urls.RestUrl || '') + 'runtime');
      });
        activate();
        return factory;

        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
          $log.info('加载Runtime');
        }
    }

})();
