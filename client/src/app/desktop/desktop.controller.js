/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('DesktopCtrl', DesktopCtrl);

    DesktopCtrl.$inject = ['$rootScope', '$log', 'Config', 'Restangular'];

    function DesktopCtrl($rootScope, $log, Config,Restangular) {
        //接口定义
        var vm = this;
        vm.user = Restangular.one('user', $rootScope.getSelfId()).get().$object;
        vm.submit = submit;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载DesktopCtrl');
        }

        function submit() {
            var model = vm.user.plain();
            vm.user.save()
                .then(function (){
                    alert('保存成功');
                })
                .catch(function() {
                    alert('保存失败');
                })
        }

    }

})();
