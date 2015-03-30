/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：Repository
 * 作用：仓库管理工厂
 */
(function () {
    'use strict';

    angular.module('home').factory('Repository', Repository);

    Repository.$inject = ['$log', 'Config','RepositoryRest'];

    function Repository($log, Config,RepositoryRest) {
        var models;
        //接口定义
        var factory = {};
        factory.Models = RepositoryRest.service(Config.Names.models);
        factory.getModels = getModels;
        factory.deployModel = deployModel;
        factory.createModel = createModel;

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

        function getModels(param) {
            models = RepositoryRest.all(Config.Names.models).getList();
            return models.$object;
        }

        function deployModel(model) {
            return RepositoryRest.one(Config.Names.deployments, model.id).post();
        }

        function createModel(model) {
            return models.post(model);
        }
    }

})();
