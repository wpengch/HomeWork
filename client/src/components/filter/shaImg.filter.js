/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：shaImg
 * 作用：将图片Sha1码转换成地址
 */
(function () {
  'use strict';

  angular.module('home').filter('shaImg', shaImgFilter);

  shaImgFilter.$inject = ['Config'];

  function shaImgFilter(Config) {
    return shaImgFilterImpl;

    function shaImgFilterImpl(value) {
      if(!value) {
        return 'assets/images/img/face.jpg';
      }
      value = value || '';
      return Config.Urls.fileUrl + value;
    }
  }
})();
