/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：department
 * 作用：通过部门id显示部门名称或者部门路径
 */
(function () {
  'use strict';

  angular.module('home').filter('department', departmentFilter);

  departmentFilter.$inject = ['UserFactory'];

  function departmentFilter(UserFactory) {
    return departmentFilterImpl;

    /**
     * 过滤器实现
     * @param value     原始值
     * @param param     参数 plain是默认的，表示只显示本省，tree代表显示整个部门路径
     * @param space     间隔 两个部门之间的间隔是什么
     * @returns {string} 过滤后的值
     */
    function departmentFilterImpl(value, param, space) {
      param = param || 'plain';
      value = value || '0';
      space = space || ' ';
      if (param === 'plain') {
        var dep = UserFactory.findDepartmentById(value);
        return dep.name;
      } else if (param === 'tree') {
        var deps = UserFactory.findDepartmentsById(value);
        var result = '';
        for (var i = 0; i < deps.length; i++) {
          result += deps[i].name;
          if (i !== deps.length - 1) {
            result += space;
          }
        }
        return result;
      }
    }
  }
})();
