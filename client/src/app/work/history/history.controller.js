/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：HistoryCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('HistoryCtrl', HistoryCtrl);

    HistoryCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function HistoryCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.startAnswer = startAnswer;
        vm.submit = submit;
        vm.start = false;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载HistoryCtrl');
            Restangular.one('userarrange', $stateParams.id).one('respondent').get()
                .then(function (data) {
                    $timeout(function () {
                        vm.userarrange = data.plain();
                        vm.exam = vm.userarrange.arrange.examination;
                    });
                });
        }

        vm.filterCorrect = function (arr) {
            return arr.customFilter(function (obj) {
                return obj.correct === true;
            });
        };


        function startAnswer(ev) {
            vm.start = true;
        }

        function submit(ev) {
            var model = answer();
            $rootScope.showProgress('正在提交答案', ev);
            Restangular.one('userarrange', vm.userarrange.id).all('respondent').customPUT(model)
                .then(function (data) {
                    $rootScope.hideAndSuccess('答案提交成功');
                    $rootScope.back();
                }).catch(DialogFactory.showError('答案提交失败', ev));
        }


        function answer() {
            var answers = [];
            angular.forEach(vm.exam.titles, function (bt) {
                angular.forEach(bt.titles, function (title) {
                    var answer = {id:title.respondentId, percent:title.percent};
                    answers.push(answer);
                });
            });

            return answers;
        }
    }

})();
