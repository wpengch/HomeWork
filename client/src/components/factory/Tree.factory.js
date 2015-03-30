/**
 * 创建人：pengchao
 * 创建时间：2015-3-30-0030
 * 工厂名字：Tree
 * 作用：树形结构获取
 */
(function () {
    'use strict';

    angular.module('home').factory('Tree', Tree);

    Tree.$inject = ['$log', 'Config','Restangular'];

    function Tree($log, Config,Restangular) {
        //接口定义
        var factory = Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl((Config.Urls.RestUrl || '') + 'tree');
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