/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('WorkCtrl', WorkCtrl);

    WorkCtrl.$inject = ['$scope', '$log', 'Config'];

    function WorkCtrl($scope, $log, Config) {
        //接口定义
        var vm = this;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('WorkCtrl');
        }
    }

})();
