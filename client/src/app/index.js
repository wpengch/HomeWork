/**
 * 主配置文件
 */
(function () {

    'use strict';

    angular.module('home', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.tree', 'ngMaterial', 'ngMessages', 'angular-datepicker', 'textAngular', 'ui.router.stateHelper'])
        .config(['RestangularProvider', '$urlRouterProvider', 'stateHelperProvider', '$mdThemingProvider', 'Theme', 'Router', 'Config', configProvider])
        .run(runConfig);

    /**
     *
     * @param RestangularProvider
     * @param $urlRouterProvider
     * @param stateHelperProvider
     * @param $mdThemingProvider
     * @param Theme
     * @param Router
     */
    function configProvider(RestangularProvider, $urlRouterProvider, stateHelperProvider, $mdThemingProvider, Theme, Router, Config) {
        /**
         * 主题
         */
        //angular.forEach(Theme.palettes, function (palette, name) {
        //    $mdThemingProvider.definePalette(name, palette);
        //});
        //angular.forEach(Theme.themes, function (theme) {
        //    $mdThemingProvider.theme(theme.name).primaryPalette(theme.primaryPalette);
        //});

        //配置路由
        angular.forEach(Router, function (router, key) {
            stateHelperProvider.state(router);
        });
        $urlRouterProvider.otherwise('/');

        if (Config.Urls.RestUrl) {
            RestangularProvider.setDefaultHttpFields({
                'withCredentials': true
            });
            RestangularProvider.setBaseUrl(Config.Urls.RestUrl);
        }


        RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            var header = data.header;
            var model = data.data;
            model = JSOG.decode(model);
            if (header && header.rc === 0) {
                return model;
            } else {
                if (header) {
//                    if(header.rc === 1 && location.hash !== '#/') {
//                        location.href = "/";
//                    }
                    deferred.reject(header);
                } else {
                    deferred.reject(data.header);
                }
            }
        });
    }

    runConfig.$inject = ['$rootScope', 'Config', '$previousState', 'AuthFactory', '$state','$cookieStore','Restangular','$mdDialog'];
    function runConfig($rootScope, Config, $previousState, AuthFactory, $state,$cookieStore,Restangular,$mdDialog) {
        //与登陆与验证有关的初始化
        $rootScope.toLogin = function () {
            $state.go('login');
        };
        $rootScope.isSelf = function (id) {
            return $rootScope.userId === id;
        };


        $rootScope.quit = AuthFactory.quit;
        $rootScope.self = {};
        $rootScope.initSelf = function() {
            $rootScope.self = Restangular.one('user', $rootScope.getSelfId()).get().$object;
        };

        $rootScope.getSelfId = function () {
            return $cookieStore.get(Config.CookieNames.userId);
        };

        $rootScope.showProgress = function (content, ev) {
            $mdDialog.show({
                templateUrl: 'components/template/dlg/rest.progress.html',
                disableParentScroll: true,
                hasBackdrop: true,
                clickOutsideToClose: false,
                controller: progressCtrl,
                controllerAs: 'vm',
                targetEvent: ev,
                locals: {
                    content: content
                }
            });
        };

        $rootScope.showInputText = function (header, name, ev) {
            return $mdDialog.show({
                templateUrl: 'components/dlg/dlg.edit.text.tmp.html',
                disableParentScroll: true,
                hasBackdrop: true,
                clickOutsideToClose: false,
                controller: inputTextCtrl,
                controllerAs: 'vm',
                locals: {
                    header: header,
                    name: name
                }
            });

        };

        inputTextCtrl.$inject = ['header', 'name', '$mdDialog'];
        function inputTextCtrl(header, name, $mdDialog) {
            var vm = this;
            vm.header = header;
            vm.name = name;
            vm.submit = function (ev) {
                if (vm.inputForm.$invalid) {
                    return;
                }
                $mdDialog.hide(vm.value);
            };

            vm.cancel = function (ev) {
                $mdDialog.hide();
            };
        }

        $rootScope.hideDialog = function () {
            $mdDialog.hide();
        };

        progressCtrl.$injector = ['content'];
        function progressCtrl(content) {
            var vm = this;
            vm.content = content;
        }




        //初始化前一个状态的信息
        $rootScope.$previousState = $previousState;
        $rootScope.back = function () {
            $previousState.go();
        };
        $rootScope.Config = Config;
        $rootScope.dateOptions = Config.dateOptions[0];

        AuthFactory.auth();
    }
})();
