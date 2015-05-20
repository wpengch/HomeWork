/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：ExamInfoCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('ExamInfoCtrl', ExamInfoCtrl);

    ExamInfoCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function ExamInfoCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.exam = Restangular.one('exam', $stateParams.id).get().$object;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载ExamInfoCtrl');
            Restangular.one('title', $stateParams.id).get()
                .then(function (data) {

                    $timeout(function () {
                        vm.title = data.plain();
                    });
                });
        }

    }

})();
