/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：ModelFactory
 * 作用：管理流程模型的工厂
 */
(function () {
    'use strict';

    angular.module('home').factory('Model', Model);

    Model.$inject = ['$log', 'Config', 'RepositoryRest'];

    function Model($log, Config, RepositoryRest) {
        //接口定义
        return RepositoryRest.service(Config.Names.models);
    }

})();
