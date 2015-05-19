
/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：postType
 * 作用：岗位类型过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('postType', postTypeFilter);

    postTypeFilter.$inject=['UserFactory'];

    function postTypeFilter(UserFactory){
        return postTypeFilterImpl;

        function postTypeFilterImpl(value){
          if (!value) {
            return '未设置';
          }
          var type = UserFactory.postTypeMap[value] || {name: '岗位类型未初始化'};
          return type.name;
        }
    }
})();
