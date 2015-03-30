/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DepartmentChangeCtrl
 * 作用：编辑部门控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('DepartmentChangeCtrl', DepartmentChangeCtrl);

    DepartmentChangeCtrl.$inject = ['$log', 'Config', '$state', '$stateParams', 'UserFactory', 'Restangular', '$timeout', 'DialogFactory'];

    function DepartmentChangeCtrl($log, Config, $state, $stateParams, UserFactory, Restangular, $timeout, DialogFactory) {
        //接口定义
        var vm = this;
        vm.origin = {};
        vm.department = vm.origin;
        vm.parentDepartment = {};
        vm.submit = submit;
        vm.department = {};
        vm.type = {};

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载DepartmentChangeCtrl');
            init();
        }

        /**
         * 初始化函数
         */
        function init() {
            Restangular.one('department', $stateParams.id).get()
                .then(function (data) {
                    $timeout(function () {
                        vm.origin = data;
                        vm.department = data;
                        vm.type = Config.DepartmentTypes[vm.department.type];
                    });
                });
        }

        /**
         * 提交
         * @param event 事件
         */
        function submit(event) {
            if (vm.addForm.$invalid) {
                return;
            }
            vm.department.save()
                .then(function () {
                    DialogFactory.success('部门更新成功', event).then(function () {
                        $state.go('main.dep.list');
                    });
                }).catch(function () {
                    DialogFactory.success('部门更新失败', event);
                });
        }
    }

})();
