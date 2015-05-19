
/**
 * 创建人：pengchao
 * 创建时间：2015-3-24-0024
 * 工厂名字：userItem
 * 作用：用户项过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('userItem', userItemFilter);

    userItemFilter.$inject=[];

    function userItemFilter(){
        return userItemFilterImpl;

        function userItemFilterImpl(user){
          if(!user){
            return '';
          }
          var space = "     ";
          return user.name + space + user.sex === 0 ? '男' : '女' + space +  (new Date().getYear() - new Date(user.birthday).getYear()) + "岁" + space + user.nation + space + user.school + space + user.professional + space + user.telephone;
        }
    }
})();
