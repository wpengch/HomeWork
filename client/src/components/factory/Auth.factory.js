/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：AuthenticationFactory
 * 作用：证明，鉴定;身份验证;认证;密押
 */
(function () {
    'use strict';

    angular.module('home').factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$rootScope', '$log', 'Restangular', '$q', '$cookieStore', 'MenuFactory', '$location', 'md5Factory','Config'];

    function AuthFactory($rootScope, $log, Restangular, $q, $cookieStore, MenuFactory, $location, md5Factory,Config) {
        //接口定义
        var factory = {};
        factory.auth = auth;
        factory.quit = quit;
        factory.login = login;
        activate();
        return factory;

        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载AuthenticationFactory开始...');
            $log.info('加载AuthenticationFactory结束');
        }

        /**
         * 验证
         * @returns {*} 验证是否成功
         */
        function auth() {
            var def = $q.defer();
            if ($location.path() === '/' || $location.path() === '/' || $location.path() === '/register') {
                def.resolve(0);
            } else {
                var query = $location.search();
                var token = query.token;
                if(!token) {
                    MenuFactory.reload();
                    initSelf();
                    def.resolve(0);
                } else {
                    Restangular.one('auth').customPOST({token: token}, 'auth')
                        .then(function (data) {
                            setAuth(data.username, token, true);
                            initSelf();
                            MenuFactory.reload();
                            def.resolve(0);
                        })
                        .catch(function (response) {
                            $rootScope.toLogin();
                            def.reject(response);
                        });
                }
            }
            return def.promise;
        }

        /**
         * 登陆接口
         * @param userName 用户名
         * @param password 密码
         * @returns {*} 登陆事件的promise
         */
        function login(userName, password) {
            var deferred = $q.defer();
            clearAuth();
            if (!userName || !password) {
                deferred.reject();
            } else {
                Restangular.one('auth').customGET('login', {username: userName, password: md5Factory(password)})
                    .then(function (data) {
                        setAuth(userName, data.token, true);
                        initSelf();
                        MenuFactory.reload();
                        deferred.resolve(data);
                    }, function (response) {
                        factory.isLogin = false;
                        deferred.reject(response);
                    });

            }
            return deferred.promise;
        }

        function initSelf() {
            $rootScope.self = Restangular.one('user', $rootScope.getSelfId()).get().$object;
        };

        /**
         * 退出登录
         */
        function quit() {
            clearAuth();
            $rootScope.toLogin();
        }

        /**
         * 清除登陆信息
         */
        function clearAuth() {
            setAuth();
        }

        /**
         * 设置登录信息
         * @param id  登陆ID
         * @param token token
         * @param login 是否登陆
         */
        function setAuth(id, token, login) {
            $rootScope.token = token;
            if (token) {
                $cookieStore.put(Config.CookieNames.token, token);
            } else {
                $cookieStore.remove(Config.CookieNames.token);
            }
            if(id) {
                $cookieStore.put(Config.CookieNames.userId, id);
            }
            $rootScope.userId = id;
        }


    }

})();
