/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：StudentListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('StudentListCtrl', StudentListCtrl);

    StudentListCtrl.$inject = ['$log', 'Config', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function StudentListCtrl($log, Config, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.course = Restangular.one('course', $stateParams.id).get().$object;
        vm.addStudent = addStudent;
        vm.removeStudent = removeStudent;
        vm.allUsers = Restangular.all('user').getList().$object;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载StudentListCtrl');
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
