/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：ExamAddCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('ExamAddCtrl', ExamAddCtrl);

    ExamAddCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function ExamAddCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm       = this;
        vm.addTitle  = addTitle;
        vm.addAnswer = addAnswer;
        vm.exam      = {
            initiator: $rootScope.getSelfId(),
            bigTitles: []
        };
        vm.titles    = Restangular.all('title').getList().$object;

        vm.addBTitle   = addBTitle;
        vm.selectTitle = selectTitle;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            vm.addBig      = {
                titles: []
            };
            vm.addBigTitle = false;
            $log.info('加载ExamAddCtrl');
        }

        function addAnswer(ev) {
            vm.title.answers.push({});
        }

        function addBTitle(ev) {
            vm.addBig.name = Config.TitleTypes[vm.addBig.type].name;
            vm.exam.bigTitles.push(vm.addBig);
            activate();
        }

        function selectTitle(bigTitle, ev) {
            var titles = vm.titles.customFilter(function (title) {
                if (bigTitle.type === 1) {
                    var firstCorrect = false;
                    for (var i = 0; i < title.answers.length; i++) {
                        var item = title.answers[i];
                        if (item.correct) {
                            if (firstCorrect) {
                                return false;
                            } else {
                                firstCorrect = true;
                            }
                        }
                    }
                    return firstCorrect
                }
                return true;
            }).filterArr(bigTitle.titles, function (bt, t) {
                    return bt.id === t.id;
                });
            $mdDialog.show({
                templateUrl        : 'components/dlg/selectTitle/dlg.selectTitle.html',
                disableParentScroll: true,
                hasBackdrop        : true,
                clickOutsideToClose: true,
                controller         : selectTitleCtrl,
                controllerAs       : 'vm',
                targetEvent        : ev,
                locals             : {
                    titles: titles
                }
            }).then(function (selects) {
                bigTitle.titles = bigTitle.titles.concat(selects);
            });
        }

        function addTitle(ev) {
            if (vm.addForm.$invalid) {
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
                            vm.title.content     = '';
                            vm.title.description = '';
                        });
                }).catch(function (response) {
                    $rootScope.hideDialog();
                    DialogFactory.success('创建题目失败', ev)
                });
        }
    }

})();
