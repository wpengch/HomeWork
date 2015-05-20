/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：WorkListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('WorkListCtrl', WorkListCtrl);

    WorkListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function WorkListCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
        vm.user = Restangular.one('user', $rootScope.getSelfId()).get().$object;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载WorkListCtrl');
        }

    }

})();
