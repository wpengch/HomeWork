/**
 * 登陆的factory
 */
(function () {
    'use strict';

    angular.module('home').service("$previousState", previousStateService);
    previousStateService.$inject = ['$rootScope', '$state', '$cookieStore'];
    function previousStateService($rootScope, $state, $cookieStore) {
        var previous = null;
        var memos    = {};

        var lastPrevious = null;

        $rootScope.$on("$stateChangeStart", function (evt, toState, toStateParams, fromState, fromStateParams) {
            lastPrevious = previous;
            previous     = {state: fromState, params: fromStateParams};
        });

        $rootScope.$on("$stateChangeError", function () {
            previous     = lastPrevious;
            lastPrevious = null;
        });

        $rootScope.$on("$stateChangeSuccess", function () {
            lastPrevious = null;
            if (previous.state && previous.state.name !== '') {
                var cookie = {state: previous.state.name, params: previous.params};
                $cookieStore.put('previouss', cookie);
            }
        });

        var $previousState = {
            get : function (memoName) {
                return memoName ? memos[memoName] : previous;
            },
            go  : function (memoName) {
                var to = $previousState.get(memoName);
                if (!to || !to.state || to.state.name === '') {
                    to = $cookieStore.get('previouss');
                }
                if (!to || !to.state || to.state.name === '') {
                    to = {state: 'main.desktop'};
                }
                return $state.go(to.state, to.params)
            },
            memo: function (memoName) {
                memos[memoName] = previous;
            }
        };

        return $previousState;
    }
})();
