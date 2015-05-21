/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：SubmitCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('SubmitCtrl', SubmitCtrl);

    SubmitCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function SubmitCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
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
            $log.info('加载SubmitCtrl');
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
            if(model.unAnswers.length > 0) {
                DialogFactory.confirm('你还有 ' + model.unAnswers.length + ' 到题没有做',ev).then(function () {
                    send(model.answers,ev);
                });
            }else{
                send(model.answers,ev);
            }
        }

        function send(model, ev) {
            $rootScope.showProgress('正在提交答案', ev);
            Restangular.one('userarrange', vm.userarrange.id).all('respondent').customPOST(model)
                .then(function (data) {
                    $rootScope.hideAndSuccess('答案提交成功');
                    $rootScope.back();
                }).catch(DialogFactory.showError('答案提交失败', ev));
        }

        function answer() {
            var answers = [];
            var unAnswers = [];
            angular.forEach(vm.exam.titles, function (bt) {
                angular.forEach(bt.titles, function (title) {
                    var answer = {userArrangeId:vm.userarrange.id, bigTitleId: bt.id, titleId: title.id};
                    if(bt.type === 1) {
                        var items = [];
                        angular.forEach(title.answers, function (answer) {
                            if (answer.select) {
                                items.push(answer.id);
                            }
                        });
                        if(items.length === 0) {
                            unAnswers.push(answer);
                        }
                        answer.answer = items.join(',');
                    }else{
                        if(answer.answer === '' || !answer.answer) {
                            unAnswers.push(answer);
                        }
                        answer.answer = title.answer;
                    }
                    answers.push(answer);
                });
            });

            return {answers: answers, unAnswers: unAnswers};
        }
    }

})();
