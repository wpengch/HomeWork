/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DialogFactory
 * 作用：对话框工厂
 */
(function () {
  'use strict';

  angular.module('home').factory('DialogFactory', DialogFactory);

  DialogFactory.$inject = ['$log', '$mdDialog'];

  function DialogFactory($log, $mdDialog) {
    //接口定义
    var factory = {};
    factory.registerCallback = registerCallback;
    factory.alert = function (txt, ev) {
      return $mdDialog.show($mdDialog.alert().title('注意').content(txt).ok('确定').targetEvent(ev));
    };

    factory.fail = function (txt, ev) {
      return $mdDialog.show($mdDialog.alert().title('错误').content(txt).ok('确定').targetEvent(ev));
    };

    factory.success = function (txt, ev) {
      return $mdDialog.show($mdDialog.alert().title('成功').content(txt).ok('确定').targetEvent(ev));
    };

    var callbacks = {};
    activate();
    return factory;

    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载DialogFactory');
    }

    /**
     * 注册回调函数
     * @param id  需要监听的事件
     * @param callback 回调函数
     */
    function registerCallback(id, callback) {
      if (!callbacks[id]) {
        callbacks[id] = [];
      }
      callbacks[id].push(callback);
    }

    /**
     * 发送一个事件通知
     * @param id 事件ID
     */
    function notify(id) {
      var calls = callbacks[id];
      if (!calls) {
        return;
      }
      angular.forEach(calls, function (call) {
        call();
      });
    }
  }

})();
