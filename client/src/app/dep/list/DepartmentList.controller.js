/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DepartmentListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('DepartmentListCtrl', DepartmentListCtrl);

    DepartmentListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$timeout', '$mdDialog', 'Tree'];

    function DepartmentListCtrl($log, Config, $state, Restangular, DialogFactory, $timeout, $mdDialog, Tree) {
        //接口定义
        var vm = this;
        vm.departmentTree = Tree.all('department').getList().$object;
        vm.depClick = depClick;
        vm.toggleTree = toggleTree;
        vm.addDepartment = addDepartment;
        vm.getTypes = getTypes;
        vm.type = '0';
        vm.addDialog = addDialog;
        vm.editDepartment = editDepartment;
        vm.deleteDepartment = deleteDepartment;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            initSelectDep();
            $log.info('加载DepartmentListCtrl');
        }

        /**
         * 删除部门
         * @param ev 事件
         */
        function deleteDepartment(ev) {
            Restangular.one('department', vm.selectDep.id).remove()
                .then(function () {
                    DialogFactory.success('删除成功', ev);
                    vm.departmentTree = Tree.all('department').getList().$object;
                }).catch(function () {
                    DialogFactory.success('删除失败', ev);
                });
        }

        /**
         * 添加部门的时候弹出的选择对话框
         * @param scope 模型
         * @param event 事件
         */
        function addDialog(scope, event) {
            var types = getTypes(scope);
            $mdDialog.show({
                controller: TypeController,
                templateUrl: 'components/template/dlg.type.tmp.html',
                targetEvent: event,
                locals: {
                    types: types
                }
            })
                .then(function (type) {
                    vm.type = type.id;
                    addDepartment(scope);
                })
                .catch();
        }

        /**
         * 编辑部门
         */
        function editDepartment() {
            if (!vm.selectDep || !vm.selectDep.id) {
                alert("必须至少选择一个公司或者部门");
                return;
            }
            $state.go('main.dep.change', {id: vm.selectDep.id});
        }

        /**
         * 类型控制器，类型选择弹出框
         * @param $scope
         * @param types
         * @constructor
         */
        function TypeController($scope, types) {
            $scope.items = types;
            $scope.select = function (type) {
                $mdDialog.hide(type);
            };
        }

        /**
         * 根据类型选择能够添加的类型
         * @param scope 模型
         * @returns {Array} 类型数组
         */
        function getTypes(scope) {
            var dep = scope.$modelValue;
            var types = [];

            switch (dep.type) {
                case 1:
                    types.push(Config.DepartmentTypes[2]);
                    break;
                case 2:
                    types.push(Config.DepartmentTypes[2], Config.DepartmentTypes[3]);
                    break;
                case 3:
                    types.push(Config.DepartmentTypes[4]);
                    break;
            }
            return types;
        }

        /**
         * 初始化选择的部门
         */
        function initSelectDep() {
            vm.selectDep = (!vm.departmentTree || vm.departmentTree.length < 1) ? {} : vm.departmentTree[0];
            initTemplate();
        }

        /**
         * 初始化模板
         */
        function initTemplate() {
            vm.template = (!vm.selectDep.type) ? Config.DepartmentTypes['0'] : Config.DepartmentTypes[vm.selectDep.type];
        }

        /**
         * 属性展开与收缩
         * @param scope 模型
         */
        function toggleTree(scope) {
            scope.toggle();
        }

        /**
         * 树形点击处理
         * @param scope 模型
         */
        function depClick(scope) {
            $timeout(function () {
                vm.selectDep = scope.$modelValue;
                initTemplate();
            });
        }

        /**
         * 添加部门
         * @param scope 模型
         */
        function addDepartment(scope) {
            if (!scope) {
                $state.go('main.dep.add', {typeId: '1', depId: undefined});
            } else {
                var dep = scope.$modelValue;
                $state.go('main.dep.add', {typeId: vm.type, depId: dep.id});
            }
        }
    }

})();
