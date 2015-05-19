/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：TitleAddCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('TitleAddCtrl', TitleAddCtrl);

    TitleAddCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$timeout', '$rootScope'];

    function TitleAddCtrl($log, Config, $state, Restangular, DialogFactory, $timeout, $rootScope) {
        //接口定义
        var vm = this;
        vm.addTitle = addTitle;
        vm.addAnswer = addAnswer;
        vm.title = {
            initiator: $rootScope.getSelfId(),
            answers:[]
        };

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载TitleAddCtrl');
        }

        function addAnswer(ev) {
            vm.title.answers.push({});
        }

        function addTitle(ev) {
            if(vm.addForm.$invalid) {
                return;
            }
            $rootScope.showProgress("正在创建题目", ev);
            Restangular.all('title').customPOST(vm.title)
                .then(function (data) {
                    $rootScope.hideDialog();
                    $rootScope.initSelf();
                    DialogFactory.success('创建题目成功', ev)
                        .then(function () {
                            $state.go('main.title.list');
                        }).catch(function () {
                            vm.title.content = '';
                            vm.title.description = '';
                        });
                }).catch(function (response) {
                    $rootScope.hideDialog();
                    DialogFactory.success('创建题目失败', ev)
                });
        }
    }

})();
