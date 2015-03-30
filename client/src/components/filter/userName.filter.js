/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：userName
 * 作用：将个人ID转换成名字输出
 */
(function () {
  'use strict';

  angular.module('home').filter('userName', userNameFilter);

  userNameFilter.$inject = ['AuthFactory', 'UserFactory'];

  function userNameFilter(AuthFactory, UserFactory) {
    return userNameFilterImpl;

    function userNameFilterImpl(value) {
      var val = value || AuthFactory.loginID;
      var len = val.indexOf('@');
      if (len !== -1) {
        val = val.substr(0, len);
      }
      return UserFactory.findUserById(val).name;
    }
  }
})();
