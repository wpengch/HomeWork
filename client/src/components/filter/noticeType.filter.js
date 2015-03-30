/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：noticeType
 * 作用：通知类型过滤器
 */
(function () {
  'use strict';

  angular.module('home').filter('noticeType', noticeTypeFilter);

  noticeTypeFilter.$inject = ['Config'];

  function noticeTypeFilter(Config) {
    return noticeTypeFilterImpl;


    function noticeTypeFilterImpl(value) {
      value = value || 1;
      return Config.NoticeTypes[value - 1].name;
    }
  }
})();
