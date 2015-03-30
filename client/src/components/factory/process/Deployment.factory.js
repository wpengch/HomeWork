/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：Deployment
 * 作用：部署
 */
(function () {
    'use strict';

    angular.module('home').factory('Deployment', Deployment);

    Deployment.$inject = ['$log', 'Config', 'RepositoryRest'];

    function Deployment($log, Config, RepositoryRest) {
        //接口定义
        return RepositoryRest.service(Config.Names.deployments);
    }

})();