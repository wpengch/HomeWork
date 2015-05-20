/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：ExamAddCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('ExamAddCtrl', ExamAddCtrl);

    ExamAddCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope', '$timeout'];

    function ExamAddCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope, $timeout) {
        //接口定义
        var vm       = this;
        vm.addAnswer = addAnswer;
        vm.exam      = {
            initiator: $rootScope.getSelfId(),
            bigTitles: []
        };
        vm.titles    = Restangular.all('title').getList().$object;

        vm.addBTitle   = addBTitle;
        vm.selectTitle = selectTitle;

        vm.deleteTitle = deleteTitle;

        vm.mark            = {};
        vm.enableTitleAdds = [];

        vm.up         = up;
        vm.down       = down;
        vm.upTop      = upTop;
        vm.downBottom = downBottom;

        vm.saveTitle       = saveTitle;
        vm.saveExamination = saveExamination;

        vm.addTitle = {
            answers: []
        };

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

            for (var i = 0; i < 100; i++) {
                vm.enableTitleAdds.push(false);
            }
        }

        function saveExamination(ev) {
            var valid = validExamination();
            if(valid !== '') {
                DialogFactory.fail(valid, ev);
                return;
            }
            vm.exam.initiator = $rootScope.self;
            var model = {
                name: vm.exam.name,
                initiator: {id:$rootScope.getSelfId()},
                titles:[]
            };
            var percent = 0;
            angular.forEach(vm.exam.bigTitles, function (big) {
                var item = {name: big.name, percent:big.percent, type:big.type, titles:[]};
                angular.forEach(big.titles, function (title) {
                    item.titles.push({id: title.id});
                });
                percent += big.titles.length * big.percent;
                model.titles.push(item);
            });
            model.percent = percent;

            $rootScope.showProgress('添加试卷', ev);
            Restangular.all('exam').customPOST(model)
                .then(function (data) {
                    $rootScope.hideAndSuccess('试卷添加成功', ev);
                }).catch(DialogFactory.showError('试卷添加失败', ev));
        }

        function validExamination() {
            if(vm.exam.bigTitles.length === 0) {
                return '必须至少具有一个大题';
            }
            for(var i = 0; i < vm.exam.bigTitles.length; i ++) {
                var item = vm.exam.bigTitles[i];
                if(item.titles.length === 0) {
                    return '每个大题下面都必须至少具有一个小题';
                }
            }
            return '';
        }


        function saveTitle(bigTitle, dx, ev) {
            if (!vm.addTitle.content) {
                alert('字段内容不准确');
                return;
            }
            if (bigTitle.type === 0 || bigTitle.type === 1) {
                if (vm.addTitle.answers.length === 0) {
                    DialogFactory.fail('必须输入答案');
                    return;
                }
                var corrects = vm.addTitle.answers.customFilter(function (obj) {
                    return obj.correct === true;
                });
                if (corrects.length === 0) {
                    DialogFactory.fail('必须具有一个正确答案');
                    return;
                }
                if (corrects.length > 1 && bigTitle.type === 0) {
                    DialogFactory.fail('只能具有一个正确答案');
                    return;
                }
            }
            vm.addTitle.initiator = $rootScope.getSelfId();
            $rootScope.showProgress('添加题目', ev);
            Restangular.all('title').customPOST(vm.addTitle)
                .then(function (data) {
                    $rootScope.hideAndSuccess('添加成功');
                    Restangular.one('title', data).get()
                        .then(function (data) {
                            $timeout(function () {
                                vm.titles.push(data);
                                bigTitle.titles.push(data);
                            });
                        });
                    vm.addTitle            = {answers: []};
                    vm.enableTitleAdds[dx] = false;
                }).catch(DialogFactory.showError('添加失败', ev));
        }

        function addAnswer(ev) {
            vm.title.answers.push({});
        }

        function addBTitle(ev) {
            vm.addBig.name = Config.TitleTypes[vm.addBig.type].name;
            vm.exam.bigTitles.push(vm.addBig);
            activate();
        }

        function deleteTitle(bigTitle, title, index, event) {
            $timeout(function () {
                bigTitle.titles.remove(index);
            });
        }

        function up(bigTitle, title, index, event) {
            bigTitle.titles.exchange(index - 1, index);
        }

        function down(bigTitle, title, index, event) {
            bigTitle.titles.exchange(index + 1, index);
        }

        function upTop(bigTitle, title, index, event) {
            bigTitle.titles.moveToFirst(index);
        }

        function downBottom(bigTitle, title, index, event) {
            bigTitle.titles.moveToLast(index);
        }

        function selectTitle(bigTitle, ev) {
            if (angular.isFunction(vm.titles.plain)) {
                vm.titles = vm.titles.plain();
            }

            var titles = vm.titles.customFilter(function (title) {
                if (bigTitle.type !== 0 && bigTitle.type !== 1) {
                    return true;
                }
                if (bigTitle.type === 1) {
                    return title.answers && title.answers.length > 0;
                } else {
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
    }

})();
