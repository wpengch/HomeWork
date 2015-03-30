/**
 * 登陆的factory
 */
(function () {
  'use strict';

  angular.module('home').service("$previousState", previousStateService);
  previousStateService.$inject = ['$rootScope', '$state'];
  function previousStateService($rootScope, $state) {
    var previous = null;
    var memos = {};

    var lastPrevious = null;

    $rootScope.$on("$stateChangeStart", function (evt, toState, toStateParams, fromState, fromStateParams) {
      lastPrevious = previous;
      previous = {state: fromState, params: fromStateParams};
    });

    $rootScope.$on("$stateChangeError", function () {
      previous = lastPrevious;
      lastPrevious = null;
    });

    $rootScope.$on("$stateChangeSuccess", function () {
      lastPrevious = null;
    });

    var $previousState = {
      get: function (memoName) {
        return memoName ? memos[memoName] : previous;
      },
      go: function (memoName) {
        var to = $previousState.get(memoName);
        return $state.go(to.state, to.params)
      },
      memo: function (memoName) {
        memos[memoName] = previous;
      }
    };

    return $previousState;
  }
})();