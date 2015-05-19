/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：CourseListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('CourseListCtrl', CourseListCtrl);

    CourseListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function CourseListCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
        vm.user = Restangular.one('user', $rootScope.getSelfId()).get().$object;
        vm.addCourse = addCourse;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载CourseListCtrl');
        }

        function addCourse(ev) {

            $mdDialog.show({
                templateUrl: 'components/dlg/course.add.dlg.html',
                disableParentScroll: true,
                hasBackdrop: true,
                clickOutsideToClose: false,
                controller: courseCtrl,
                controllerAs: 'vm'
            }).then(function (data) {
                if (data) {
                    data.teach = vm.user;
                    $rootScope.showProgress("正在添加课程", ev);
                    Restangular.all('course').customPOST(data)
                        .then(function (data) {
                            $rootScope.hideDialog();
                            vm.user = Restangular.one('user', $rootScope.getSelfId()).get().$object;
                            DialogFactory.success("课程添加成功", ev);
                        }).catch(function (response) {
                            $rootScope.hideDialog();
                            DialogFactory.fail('课程添加失败', ev);
                        });
                }
            });
        }

        courseCtrl.$inject = ['$mdDialog'];
        function courseCtrl($mdDialog) {
            var vm = this;
            vm.course = {};

            vm.submit = function () {
                if(vm.addForm.$invalid) {
                    return;
                }
                $mdDialog.hide(vm.course);
            };
            vm.cancel = function () {
                $mdDialog.hide();
            };
            vm.getShow = function (item) {
                return item.name;
            };
        }
    }

})();
