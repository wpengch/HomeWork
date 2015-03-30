/**
 *
 * @type {module}
 */

var module = angular.module('home');


module.directive('menuLink', function () {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'components/directive/menuLink/menu-link.tmpl.html',
    link: function ($scope, $element) {
      var controller = $element.parent().controller();

      $scope.isSelected = function () {
        return controller.isSelected($scope.section);
      };

      $scope.focusSection = function (section,event) {
        controller.autoFocusContent = true;
        controller.goSelect(section,event);
      };
    }
  };
});

