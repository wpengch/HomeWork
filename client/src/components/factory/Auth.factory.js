/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：AuthenticationFactory
 * 作用：证明，鉴定;身份验证;认证;密押
 */
(function () {
    'use strict';

    angular.module('home').factory('AuthFactory', AuthFactory);

    AuthFactory.$inject = ['$rootScope', '$log', 'Restangular', '$q', '$cookieStore', 'MenuFactory', '$location', 'md5Factory'];

    function AuthFactory($rootScope, $log, Restangular, $q, $cookieStore, MenuFactory, $location, md5Factory) {
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
            if ($rootScope.isLogin || $location.path() === '/' || $location.path() === '/register') {
                def.resolve(0);
            } else {
                var query = $location.search();
                var token = query.token || $cookieStore.get('auth_token');
                if (!token || !angular.isString(token)) {
                    def.reject(0);
                    $rootScope.toLogin();
                } else {
                    Restangular.one('auth').customPOST({token: token}, 'auth')
                        .then(function (data) {
                            setAuth(data.username, token, true);
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
                        deferred.resolve(data);
                    }, function (response) {
                        factory.isLogin = false;
                        deferred.reject(response);
                    });

                return deferred.promise;
            }
        }

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
                //$cookieStore.put('auth_token', token);
            } else {
                $cookieStore.remove('auth_token');
            }
            $rootScope.userId = id;
            $rootScope.isLogin = login;
        }


    }

})();
