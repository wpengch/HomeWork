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
//        vm.exams = Restangular.one('user', $rootScope.getSelfId()).all('work').getList().$object;
        vm.arranges = Restangular.all('userarrange').getList({user:$rootScope.getSelfId(), status:0}).$object;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
//            Restangular.all('userarrange').getList({user:$rootScope.getSelfId(), status:0})
//                .then(function(data) {
//                    $timeout(function () {
//                        vm.arranges = data.plain;
//                        if(angular.isArray(vm.arranges)) {
//                            angular.forEach(vm.arranges, function (arrange) {
//
//                            });
//                        }
//                    });
//                });
            $log.info('加载WorkListCtrl');
        }

    }

})();
