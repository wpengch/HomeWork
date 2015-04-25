/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：MainCtrl
 * 作用：主页控制器
 */
(function () {
  'use strict';

  angular.module('home').controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$log', 'Config', '$timeout', 'MenuFactory', '$rootScope', '$location', '$mdSidenav','$state','Restangular'];

  function MainCtrl($log, Config, $timeout, MenuFactory, $rootScope, $location, $mdSidenav,$state,Restangular) {
    //接口定义
    var vm = this;
    vm.sections = MenuFactory.getSections();
    vm.openMenu = openMenu;
    vm.closeMenu = closeMenu;
    vm.path = path;
    vm.goHome = goHome;
    vm.openPage = openPage;
    vm.isSectionSelected = isSectionSelected;
    vm.focusMainContent = focusMainContent;

    vm.isOpen = isOpen;
    vm.isSelected = isSelected;
    vm.toggleOpen = toggleOpen;
    vm.autoFocusContent = false;
    vm.goSelect = goSelect;

    var mainContentArea = document.querySelector("[role='main']");

    activate();
    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载MainCtrl开始...');
      MenuFactory.registerCallback(Config.Events.MenuInit, function () {
        $timeout(function () {
          vm.sections = MenuFactory.sections;
        });
      });
      $log.info('加载MainCtrl结束');
    }

    function openMenu() {
      $timeout(function () {
        $mdSidenav('left').open();
      });
    }

    function closeMenu() {
      $timeout(function () {
        try {
          $mdSidenav('left').close();
        } catch (e) {
          $log.info(e);
        }
      });
    }

    function goHome($event) {
      return $state.go('login');
    }

    function openPage() {
      //vm.closeMenu();
      //
      //if (self.autoFocusContent) {
      //  focusMainContent();
      //  self.autoFocusContent = false;
      //}
    }

    function path() {
      return $location.path();
    }

    function focusMainContent($event) {
      //if ($event) {
      //  $event.preventDefault();
      //}
      //
      //$timeout(function () {
      //  mainContentArea.focus();
      //}, 90);
    }

    function isSelected(page) {
      return MenuFactory.isPageSelected(page);
    }

    function goSelect(section,event) {
      $log.info('goSelect');
      $state.go(section.url);
      event.stopPropagation();
    }

    function isSectionSelected(section) {
      var selected = false;
      var openedSection = MenuFactory.openedSection;
      if (openedSection === section) {
        selected = true;
      } else if (section.children) {
        section.children.forEach(function (childSection) {
          if (childSection === openedSection) {
            selected = true;
          }
        });
      }

      return selected;
    }

    function isOpen(section) {
      return MenuFactory.isSectionSelected(section);
    }

    function toggleOpen(section) {
      MenuFactory.toggleSelectSection(section);
    }
  }

})();
