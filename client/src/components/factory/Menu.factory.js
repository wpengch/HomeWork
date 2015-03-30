/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：MenuFactory
 * 作用：主页菜单工厂
 */
(function () {
  'use strict';

  angular.module('home').factory('MenuFactory', MenuFactory);

  MenuFactory.$inject = ['$log', 'Config', 'Restangular', '$q'];

  function MenuFactory($log, Config, Restangular, $q) {
    //接口定义
    var factory = {};
    factory.registerCallback = registerCallback;
    factory.sections = [];
    factory.reload = reload;
    factory.selectPage = selectPage;
    factory.selectSection = function (section) { factory.openedSection = section; };
    factory.toggleSelectSection = function (section) { factory.openedSection = (factory.openedSection === section ? null : section); };
    factory.isSectionSelected = function (section) { return factory.openedSection === section; };
    factory.isPageSelected = function (page) { return factory.currentPage === page; };
    factory.registerCallback = registerCallback;

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
      $log.info('加载MenuFactory开始...');
      $log.info('加载MenuFactory结束');
    }

    function reload() {
      var deferred = $q.defer();
      Restangular.all('menu').getList()
        .then(function (data) {
          factory.sections = data;
          deferred.resolve(0);
          notify(Config.Events.MenuInit);
        })
        .catch(function (response) {
          deferred.reject();
        });
      return deferred.promise;
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

    function selectPage(section, page) {
      page && page.url && $location.path(page.url);
      factory.currectSection = section;
      factory.currentPage = page;
    }
  }

})();
