/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：LoginCtrl
 * 作用：
 */
(function () {
  'use strict';

  angular.module('home').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$log', '$state', 'AuthFactory','Restangular'];

  function LoginCtrl($log, $state, AuthFactory,Restangular) {
    //接口定义
    var vm = this;
    vm.user = {};
    vm.login = login;
    vm.stuRegister = stuRegister;
    vm.teacherRegister = teacherRegister;

    activate();
    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载LoginCtrl开始...');
      $log.info('加载LoginCtrl结束');
    }

    /**
     * 私有函数，登陆处理
     * @param ev 事件
     */
    function login(ev) {
      if (vm.loginForm.$invalid) {
        return;
      }
      AuthFactory.login(vm.user.userName, vm.user.password, ev)
        .then(function () {
          $state.go('main.main');
        });
    }
    function stuRegister(ev) {
      $state.go('register', {type: 0});
    }

    function teacherRegister(ev) {
      $state.go('register', {type: 1});
    }
  }

})();
