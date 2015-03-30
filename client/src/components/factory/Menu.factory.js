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
    factory.getSections = function(){return  Restangular.all('menu').getList().$object;};
    factory.selectPage = selectPage;
    factory.selectSection = function (section) { factory.openedSection = section; };
    factory.toggleSelectSection = function (section) { factory.openedSection = (factory.openedSection === section ? null : section); };
    factory.isSectionSelected = function (section) { return factory.openedSection === section; };
    factory.isPageSelected = function (page) { return factory.currentPage === page; };
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

    function selectPage(section, page) {
      page && page.url && $location.path(page.url);
      factory.currectSection = section;
      factory.currentPage = page;
    }
  }

})();
