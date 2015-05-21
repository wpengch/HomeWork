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
        vm.arrange = arrange;
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


        function arrange(ev) {
            $mdDialog.show({
                templateUrl        : 'components/dlg/arrange/dlg.arrange.html',
                disableParentScroll: true,
                hasBackdrop        : true,
                clickOutsideToClose: false,
                controller         : arrangeCtrl,
                controllerAs       : 'vm',
                targetEvent        : ev,
                locals             : {}
            }).then(function (data) {
                var model = {};
                model.courseIds = data.courses.joinMember('id', ',');
                model.userIds = data.users.joinMember('id', ',');
                model.teach = {id: $rootScope.getSelfId()};
                model.name = vm.exam.name;
                model.examination = {id: vm.exam.id};
                $rootScope.showProgress('正在安排作业', ev);
                Restangular.all('arrange').customPOST(model)
                    .then(function (data) {
                        $rootScope.hideAndSuccess('下发成功');
                        $rootScope.back();
                    }).catch(DialogFactory.showError('下发失败', ev));
            });
        }
    }

})();
