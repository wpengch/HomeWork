/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：RestInterceptor
 * 作用：Restangular拦截器工厂
 */
(function () {
  'use strict';

  angular.module('home').factory('RestInterceptor', RestInterceptor);

  RestInterceptor.$inject = ['$log', 'Config'];

  function RestInterceptor($log, Config) {
    //接口定义
    var factory = {};
    factory.fullRequestInterceptor = fullRequestInterceptor;
    factory.responseInterceptor = responseInterceptor;
    factory.errorInterceptor = errorInterceptor;
    activate();
    return factory;

    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载RestInterceptor');
    }

    function fullRequestInterceptor(element, operation, route, url, headers, params, httpConfig) {
      return {
        element: element,
        headers: headers,
        params: params,
        httpConfig: httpConfig
      };
    }

    function responseInterceptor(data, operation, what, url, response, deferred) {
      var header = data.header;
      var model = data.data;
      if (header && header.rc === 0) {
        return model;
      } else {
        if (header) {
          deferred.reject(header);
        } else {
          deferred.reject(response);
        }
      }
    }

    function errorInterceptor(response, deferred, responseHandler) {
      return true;
    }
  }

})();
