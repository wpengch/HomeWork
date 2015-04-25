/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：CourseAddCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('CourseAddCtrl', CourseAddCtrl);

    CourseAddCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$timeout', '$rootScope'];

    function CourseAddCtrl($log, Config, $state, Restangular, DialogFactory, $timeout, $rootScope) {
        //接口定义
        var vm = this;
        vm.courses = Restangular.one('user', $rootScope.getSelfId()).all('course').getList().$object;
        vm.addCourse = addCourse;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载CourseAddCtrl');
        }

        function addCourse(ev) {

        }
    }

})();
