/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：Deployment
 * 作用：部署
 */
(function () {
    'use strict';

    angular.module('home').factory('Definitions', Definitions);

    Definitions.$inject = ['$log', 'Config', 'RepositoryRest'];

    function Definitions($log, Config, RepositoryRest) {
        //接口定义
        return RepositoryRest.service(Config.Names.processDef);
    }

})();