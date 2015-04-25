/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('UserListCtrl', UserListCtrl);

    UserListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$timeout', '$mdDialog', 'Tree'];

    function UserListCtrl($log, Config, $state, Restangular, DialogFactory, $timeout, $mdDialog, Tree) {
        //接口定义
        var vm = this;
        vm.departmentTree = Tree.all('department').getList().$object;
        vm.depClick = depClick;
        vm.toggleTree = toggleTree;
        vm.addUser = addUser;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            initSelectDep();
            $log.info('加载UserListCtrl');
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
            vm.users = Restangular.one('department', vm.selectDep.id || 0).all('user').getList().$object;

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

        function addUser(ev) {
            if(!vm.selectDep.id || vm.selectDep.id === 0) {
                DialogFactory.alert('必须选择一个具体的组织结构');
                return;
            }
            $state.go('main.user.add', {depId: vm.selectDep.id,type:vm.selectDep.type});
        }

    }

})();
