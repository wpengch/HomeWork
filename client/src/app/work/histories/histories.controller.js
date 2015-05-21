/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：HistoriesCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('HistoriesCtrl', HistoriesCtrl);

    HistoriesCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function HistoriesCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
        vm.arranges = Restangular.all('userarrange').getList({user:$rootScope.getSelfId(), status:2}).$object;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载HistoriesCtrl');
        }

    }

})();
