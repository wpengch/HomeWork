/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：TitleInfoCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('TitleInfoCtrl', TitleInfoCtrl);

    TitleInfoCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function TitleInfoCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.title = {};
        vm.addAnswer = addAnswer;
        vm.answers = [];
        vm.save = save;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载TitleInfoCtrl');
            Restangular.one('title', $stateParams.id).get()
                .then(function (data) {

                    $timeout(function () {
                        vm.title = data.plain();
                    });
                });
        }
        

        function addAnswer(ev) {
            vm.answers.push({
                userId:$rootScope.getSelfId()
            });
        }

        function save(ev) {
            $rootScope.showProgress('正在添加答案', ev);
            Restangular.one('title', $stateParams.id).all('answer').customPOST(vm.answers)
                .then(function (data) {
                    $rootScope.hideDialog();
                    vm.answers = [];
                    activate();
                }).catch(DialogFactory.showError('答案添加失败',ev));
        }

        function addStudent(ev) {
            var list = vm.allUsers.filterArr(vm.course.students, function (lhs, rhs) {
                return lhs.id === rhs.id;
            });
            var results = [];
            angular.forEach(list, function (item) {
                if (item.type === 0) {
                    results.push(item);
                }
            });
            $mdDialog.show({
                templateUrl: 'components/dlg/list.add.dlg.html',
                disableParentScroll: true,
                hasBackdrop: true,
                clickOutsideToClose: false,
                controller: studentCtrl,
                controllerAs: 'vm',
                locals: {
                    list: results
                }
            }).then(function (data) {
                if (data) {
                    $rootScope.showProgress("正在添加学生", ev);
                    vm.course.students.push(data.plain());
                    vm.course.save()
                        .then(function (data) {
                            $rootScope.hideDialog();
                            DialogFactory.success("学生添加成功", ev);
                        }).catch(function (response) {
                            $rootScope.hideDialog();
                            DialogFactory.fail('学生添加失败', ev);
                            var index = vm.course.indexOf(data);
                            if (index > -1) vm.course.splice(index, 1);
                        });
                }
            });
        }

        studentCtrl.$inject = ['list', '$mdDialog'];
        function studentCtrl(list, $mdDialog) {
            var vm = this;
            vm.list = list;
            vm.header = '选择学生';

            vm.submit = function (item) {
                $mdDialog.hide(item);
            };
            vm.cancel = function () {
                $mdDialog.hide();
            };
            vm.getShow = function (item) {
                return item.name;
            };
        }

        function removeStudent(student, index, ev) {
            var course = Restangular.copy(vm.course);
            course.students.splice(index, 1);
            $rootScope.showProgress("正在删除学生", ev);
            course.save()
                .then(function (data) {
                    $rootScope.hideDialog();
                    DialogFactory.success("学生删除成功", ev);
                    vm.course.students.splice(index, 1);
                }).catch(function (response) {
                    $rootScope.hideDialog();
                    DialogFactory.fail('学生删除失败', ev);
                });
        }
    }

})();
