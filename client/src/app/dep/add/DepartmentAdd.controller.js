/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DepartmentAddCtrl
 * 作用：部门添加控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('DepartmentAddCtrl', DepartmentAddCtrl);

    DepartmentAddCtrl.$inject = ['$log', 'Config', '$state', '$stateParams', 'Restangular', 'DialogFactory'];

    function DepartmentAddCtrl($log, Config, $state, $stateParams, Restangular, DialogFactory) {
        //接口定义
        var vm = this;
        vm.depId = $stateParams.depId;
        vm.type = Config.DepartmentTypes[$stateParams.typeId];
        vm.parentDepartment = Restangular.one('department', vm.depId);
        vm.pName = getParentName();
        vm.department = {
            pid: (!vm.depId) ? '0' : vm.depId,
            type: vm.type.id
        };
        vm.addDepartment = addDepartment;
        vm.cancel = cancel;
        vm.addForm = {};

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载DepartmentAddCtrl');
        }

        function getParentName() {
            if (!vm.parentDepartment) {
                return '根节点';
            }
            return vm.parentDepartment.name;
        }

        function addDepartment(ev) {
            if (vm.addForm.$invalid) {
                return;
            }
            Restangular.all('department').post(vm.department)
                .then(function (data) {
                    DialogFactory.success('部门添加成功', ev)
                        .finally(function () {
                            $state.go('main.dep.list');
                        });
                }).catch(function () {
                    DialogFactory.fail('部门添加失败', ev);
                });
        }

        function cancel(event) {
            $state.go('main.dep.list');
        }
    }

})();
