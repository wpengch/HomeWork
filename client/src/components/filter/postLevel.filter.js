/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：postLevel
 * 作用：岗位等级过滤器
 */
(function () {
  'use strict';

  angular.module('home').filter('postLevel', postLevelFilter);

  postLevelFilter.$inject = ['UserFactory'];

  function postLevelFilter(UserFactory) {
    return postLevelFilterImpl;

    function postLevelFilterImpl(value) {
      if (!value) {
        return '未设置';
      }
      var type = UserFactory.postLevelMap[value] || {name: '岗位级别未初始化'};
      return type.name;
    }
  }
})();
