/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserAddCtrl
 * 作用：部门添加控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('UserAddCtrl', UserAddCtrl);

    UserAddCtrl.$inject = ['$log', 'Config', '$state', '$stateParams', 'Restangular', 'DialogFactory'];

    function UserAddCtrl($log, Config, $state, $stateParams, Restangular, DialogFactory) {
        //接口定义
        var vm = this;
        vm.depId = $stateParams.depId;
        vm.type = $stateParams.type;
        vm.department = Restangular.one('department', vm.depId).get().$object;
        var param = {depId: vm.depId};
        if(vm.type !== 4) {
            param.type = 1;
        }
        vm.users = Restangular.all('user').getList().$object;
        vm.updateUser = updateUser;
        vm.cancel = cancel;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载UserAddCtrl');
        }

        function getSelectUsers() {
            vm.depId = vm.department.id;
            var result = [];
            angular.forEach(vm.users, function (user) {
                if (user.selected) {
                    result.push(user.id);
                }
            });
            return result;
        }


        function updateUser(ev) {
            var updateUsers = getSelectUsers();
            if(updateUsers.length === 0) {
                DialogFactory.alert('必须至少选择一个人');
                return;
            }
            Restangular.one('department', vm.depId).all('user').customPOST(updateUsers)
                .then(function (data) {
                    DialogFactory.success('添加成功', ev)
                        .finally(function () {
                            $rootScope.back();
                        });
                }).catch(DialogFactory.showError('添加失败', ev));
        }

        function cancel(event) {
            $state.go('main.dep.list');
        }
    }

})();
