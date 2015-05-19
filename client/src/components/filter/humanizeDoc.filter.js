/**
 * 创建人：pengchao
 * 创建时间：2015-3-24-0024
 * 工厂名字：humanizeDoc
 * 作用：
 */
(function () {
  'use strict';

  angular.module('home').filter('humanizeDoc', humanizeDocFilter);

  humanizeDocFilter.$inject = [];

  function humanizeDocFilter() {
    return humanizeDocFilterImpl;

    function humanizeDocFilterImpl(doc) {
      if (!doc) return;
      if (doc.type === 'directive') {
        return doc.name.replace(/([A-Z])/g, function ($1) {
          return '-' + $1.toLowerCase();
        });
      }
      return doc.label || doc.name;
    }
  }
})();
