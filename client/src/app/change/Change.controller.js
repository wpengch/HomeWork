/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('ChangeCtrl', ChangeCtrl);

    ChangeCtrl.$inject = ['$rootScope', '$log', '$state', 'Restangular','$timeout'];

    function ChangeCtrl($rootScope, $log, $state, Restangular,$timeout) {
        //接口定义
        var vm    = this;
        vm.user   = {};
        vm.submit = submit;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            Restangular.one('user', $rootScope.getSelfId()).get()
                .then(function (data) {
                    $timeout(function () {
                        vm.user = data.plain();
                    })
                });
            $log.info('加载ChangeCtrl');
        }

        function submit() {
            var model = {};
            angular.forEach(vm.user, function (value, key) {
                if(!angular.isArray(value)) {
                    model[key] = value;
                }
            });
            Restangular.one('user', model.id).customPUT(model)
                .then(function () {
                    $rootScope.initSelf();
                    $state.go('main.main');
                })
                .catch(function () {
                    alert('保存失败');
                })
        }

    }

})();
