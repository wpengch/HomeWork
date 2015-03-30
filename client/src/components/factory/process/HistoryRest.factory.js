/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：History
 * 作用：历史rest管理器
 */
(function () {
  'use strict';

  angular.module('home').factory('HistoryRest', HistoryRest);

  HistoryRest.$inject = ['$log', 'Config', 'Restangular'];

  function HistoryRest($log, Config, Restangular) {
    //接口定义
    var factory = Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl((Config.Urls.RestUrl || '') + 'history');
    });
    activate();
    return factory;

    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载History');
    }
  }

})();
