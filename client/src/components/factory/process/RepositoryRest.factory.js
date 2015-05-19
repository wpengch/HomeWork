/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：Repository
 * 作用：流程仓库的Rest工厂
 */
(function () {
    'use strict';

    angular.module('home').factory('RepositoryRest', RepositoryRest);

    RepositoryRest.$inject = ['$log', 'Config', 'Restangular'];

    function RepositoryRest($log, Config,Restangular) {
        //接口定义
        var factory = Restangular.withConfig(function(RestangularConfigurer) {
          RestangularConfigurer.setBaseUrl((Config.Urls.RestUrl || '') + 'repository');
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
          $log.info('加载Repository');
        }
    }

})();
