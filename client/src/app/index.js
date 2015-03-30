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
    }

    runConfig.$inject = ['$rootScope', 'Config', '$previousState', 'Restangular', 'AuthFactory', 'RestInterceptor', '$state', '$log'];
    function runConfig($rootScope, Config, $previousState, Restangular, AuthFactory, RestInterceptor, $state, $log) {
        //与登陆与验证有关的初始化
        $rootScope.toLogin = function () {
            $state.go('login');
        };
        $rootScope.isSelf = function (id) {
            return $rootScope.userId === id;
        };
        $rootScope.quit = AuthFactory.quit;


        //Restangular的拦截器初始化
        Restangular.addResponseInterceptor(RestInterceptor.responseInterceptor);
        Restangular.addFullRequestInterceptor(RestInterceptor.fullRequestInterceptor);
        Restangular.setErrorInterceptor(RestInterceptor.errorInterceptor);

        //拦截地址重定向的开始与完成事件
        $rootScope.$on('$locationChangeStart', function () {
            $log.info('开始验证');
            AuthFactory.auth().then(function () {
                $log.info('验证成功')
            }).catch(function () {
                $log.info('验证失败');
            });
        });
        $rootScope.$on('$locationChangeSuccess', function () {
            $log.info('加载完成');
        });

        //初始化前一个状态的信息
        $rootScope.$previousState = $previousState;
        $rootScope.back = function () {
            $previousState.go();
        };
        $rootScope.Config = Config;
        $rootScope.dateOptions = Config.dateOptions[0];
    }
})();
