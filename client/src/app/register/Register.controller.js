/**
 * 创建人：田黄雪薇
 * 创建时间：2015-3-30-0030
 * 工厂名字：RegisterControllerCtrl
 * 作用：注册控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$log', 'Config', '$timeout','$stateParams','Restangular','DialogFactory','md5Factory'];

    function RegisterController($log, Config, $timeout,$stateParams,Restangular,DialogFactory,md5Factory) {
        //接口定义
        var vm = this;
        vm.user = {
            type:$stateParams.type
        };
        vm.submit = submit;
        vm.ssn = vm.user.type == 0 ? '学号' : '教师编号';

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载RegisterControllerCtrl');
        }

        function submit(ev) {
            if(vm.newForm.$invalid) {
                return ;
            }
            if(vm.user.password !== vm.password) {
                DialogFactory.fail("两次输入的密码不符", ev);
                return;
            }

            vm.user.password = md5Factory(vm.password);

            Restangular.all('user').post(vm.user)
                .then(function (data) {
                    DialogFactory.success('用户创建成功, 跳转到登陆页面!',ev)
                        .finally(function () {
                            $state.go('login');
                        });
                })
                .catch(function (response) {
                    DialogFactory.fail('用户创建失败\n,'  + response.rm , ev);
                });
        }
    }

})();