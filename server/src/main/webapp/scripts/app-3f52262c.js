/**
 * 主配置文件
 */
(function () {

    'use strict';

    angular.module('home', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.tree', 'ngMaterial', 'ngMessages', 'angular-datepicker', 'textAngular', 'ui.router.stateHelper'])
        .config(['RestangularProvider', '$urlRouterProvider', 'stateHelperProvider', '$httpProvider', 'Theme', 'Router', 'Config', configProvider])
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
    function configProvider(RestangularProvider, $urlRouterProvider, stateHelperProvider, $httpProvider, Theme, Router, Config) {
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

//        $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
//        RestangularProvider.setDefaultHeaders({authToken:'token'});

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

    runConfig.$inject = ['$rootScope', 'Config', '$previousState', 'AuthFactory', '$state','$cookieStore','Restangular','$mdDialog','$mdToast'];
    function runConfig($rootScope, Config, $previousState, AuthFactory, $state,$cookieStore,Restangular,$mdDialog,$mdToast) {
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

        $rootScope.hideAndSuccess = function(content) {
            $rootScope.hideDialog();
            $mdToast.show(
                $mdToast.simple()
                    .content(content)
                    .hideDelay(2000)
            );
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
        progressCtrl.$inject = ["content"];




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

/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：Runtime
 * 作用：运行时Rest接口
 */
(function () {
    'use strict';

    angular.module('home').factory('RuntimeRest', RuntimeRest);

  RuntimeRest.$inject = ['$log', 'Config','Restangular'];

    function RuntimeRest($log, Config,Restangular) {
        //接口定义
      var factory = Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl((Config.Urls.RestUrl || '') + 'runtime');
      });
        activate();
        return factory;

        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
          $log.info('加载Runtime');
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：Runtime
 * 作用：运行时管理工厂
 */
(function () {
    'use strict';

    angular.module('home').factory('Runtime', Runtime);

    Runtime.$inject = ['$log', 'Config'];

    function Runtime($log, Config) {
        //接口定义
        var factory = {};
        factory.registerCallback = registerCallback;


        var callbacks = {};
        activate();
        return factory;

        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            log.info('加载Runtime');
        }

        /**
         * 注册回调函数
         * @param id  需要监听的事件
         * @param callback 回调函数
         */
        function registerCallback(id, callback) {
            if (!callbacks[id]) {
                callbacks[id] = [];
            }
            callbacks[id].push(callback);
        }

        /**
         * 发送一个事件通知
         * @param id 事件ID
         */
        function notify(id) {
            var calls = callbacks[id];
            if (!calls) {
                return;
            }
            angular.forEach(calls, function (call) {
                call();
            });
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：Repository
 * 作用：流程仓库的Rest工厂
 */
(function () {
    'use strict';

    angular.module('home').factory('RepositoryRest', RepositoryRest);

    RepositoryRest.$inject = ['$log', 'Config', 'Restangular'];

    function RepositoryRest($log, Config,Restangular) {
        //接口定义
        var factory = Restangular.withConfig(function(RestangularConfigurer) {
          RestangularConfigurer.setBaseUrl((Config.Urls.RestUrl || '') + 'repository');
        });
        activate();
        return factory;

        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
          $log.info('加载Repository');
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：Repository
 * 作用：仓库管理工厂
 */
(function () {
    'use strict';

    angular.module('home').factory('Repository', Repository);

    Repository.$inject = ['$log', 'Config','RepositoryRest'];

    function Repository($log, Config,RepositoryRest) {
        var models;
        //接口定义
        var factory = {};
        factory.Models = RepositoryRest.service(Config.Names.models);
        factory.getModels = getModels;
        factory.deployModel = deployModel;
        factory.createModel = createModel;

        activate();
        return factory;

        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载Repository');
        }

        function getModels(param) {
            models = RepositoryRest.all(Config.Names.models).getList();
            return models.$object;
        }

        function deployModel(model) {
            return RepositoryRest.one(Config.Names.deployments, model.id).post();
        }

        function createModel(model) {
            return models.post(model);
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：ModelFactory
 * 作用：管理流程模型的工厂
 */
(function () {
    'use strict';

    angular.module('home').factory('Model', Model);

    Model.$inject = ['$log', 'Config', 'RepositoryRest'];

    function Model($log, Config, RepositoryRest) {
        //接口定义
        return RepositoryRest.service(Config.Names.models);
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：History
 * 作用：历史rest管理器
 */
(function () {
  'use strict';

  angular.module('home').factory('HistoryRest', HistoryRest);

  HistoryRest.$inject = ['$log', 'Config', 'Restangular'];

  function HistoryRest($log, Config, Restangular) {
    //接口定义
    var factory = Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl((Config.Urls.RestUrl || '') + 'history');
    });
    activate();
    return factory;

    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载History');
    }
  }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：History
 * 作用：历史管理工厂
 */
(function () {
    'use strict';

    angular.module('home').factory('History', History);

    History.$inject = ['$log', 'Config'];

    function History($log, Config) {
        //接口定义
        var factory = {};
        factory.registerCallback = registerCallback;


        var callbacks = {};
        activate();
        return factory;

        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            log.info('加载History');
        }

        /**
         * 注册回调函数
         * @param id  需要监听的事件
         * @param callback 回调函数
         */
        function registerCallback(id, callback) {
            if (!callbacks[id]) {
                callbacks[id] = [];
            }
            callbacks[id].push(callback);
        }

        /**
         * 发送一个事件通知
         * @param id 事件ID
         */
        function notify(id) {
            var calls = callbacks[id];
            if (!calls) {
                return;
            }
            angular.forEach(calls, function (call) {
                call();
            });
        }
    }

})();

/**
 * �����ˣ�pengchao
 * ����ʱ�䣺2015-3-27-0027
 * �������֣�Deployment
 * ���ã�����
 */
(function () {
    'use strict';

    angular.module('home').factory('Deployment', Deployment);

    Deployment.$inject = ['$log', 'Config', 'RepositoryRest'];

    function Deployment($log, Config, RepositoryRest) {
        //�ӿڶ���
        return RepositoryRest.service(Config.Names.deployments);
    }

})();
/**
 * �����ˣ�pengchao
 * ����ʱ�䣺2015-3-27-0027
 * �������֣�Deployment
 * ���ã�����
 */
(function () {
    'use strict';

    angular.module('home').factory('Definitions', Definitions);

    Definitions.$inject = ['$log', 'Config', 'RepositoryRest'];

    function Definitions($log, Config, RepositoryRest) {
        //�ӿڶ���
        return RepositoryRest.service(Config.Names.processDef);
    }

})();
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

/**
 * 创建人：luqiao
 * 创建时间：15/5/19
 * 工厂名字：selectTitleCtrlCtrl
 * 作用：选择标题
 */
if(!selectTitleCtrl) {
    selectTitleCtrl.$inject = ['$mdDialog', 'titles','DialogFactory'];
    function selectTitleCtrl($mdDialog,titles,DialogFactory) {
        //接口定义
        var vm = this;
        vm.titles = titles;
        vm.selects = [];
        angular.forEach(vm.titles, function () {
            vm.selects.push(false);
        });
        vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.ok = function(ev) {
            var selects = [];
            for(var i = 0; i < vm.selects.length; i ++) {
                if(vm.selects[i]) {
                    selects.push(vm.titles[i]);
                }
            }
            if(selects.length === 0) {
                DialogFactory.fail('至少选择一个');
                return;
            }
            $mdDialog.hide(selects);
        };
    }
}

/**
 * 创建人：luqiao
 * 创建时间：15/5/19
 * 工厂名字：arrangeCtrlCtrl
 * 作用：选择标题
 */
if(!arrangeCtrl) {
    arrangeCtrl.$inject = ['$mdDialog','DialogFactory','$rootScope','Restangular'];
    function arrangeCtrl($mdDialog,DialogFactory,$rootScope,Restangular) {
        //接口定义
        var vm = this;
        vm.user = $rootScope.self;
        vm.users = Restangular.all('user').getList({type:0}).$object;
        vm.courseSelected = [];
        vm.userSelected = [];
        for(var i = 0; i < 1000; i ++) {
            vm.courseSelected.push(false);
            vm.userSelected.push(false);
        }

        vm.cancel = function() {
            $mdDialog.cancel();
        };

        vm.ok = function(ev) {
            var result = {
                courses: [],
                users  : []
            };
            for(var i = 0; i < 1000; i ++) {
                if(vm.courseSelected[i]) {
                    result.courses.push(vm.user.courses[i]);
                }
                if(vm.userSelected[i]) {
                    result.users.push(vm.users[i]);
                }
            }


            if(result.courses.length === 0 && result.users.length === 0) {
                DialogFactory.fail('至少选择一个');
                return;
            }
            $mdDialog.hide(result);
        };
    }
}

var module = angular.module('home');

module.directive('menuToggle', function () {
  return {
    scope: {
      section: '='
    },
    templateUrl:'components/directive/menuToggle/menu-toggle.tmpl.html',
    link:function($scope,$element) {
      var controller = $element.parent().controller();

      $scope.isOpen = function () {
        return controller.isOpen($scope.section);
      };

      $scope.toggle = function () {
        controller.toggleOpen($scope.section);
      };

      var parentNode = $element[0].parentNode.parentNode.parentNode;
      if(parentNode.classList.contains("parent-list-item")) {
        var heading = parentNode.querySelector('h2');
        $element[0].firstChild.setAttribute('aria-describedby', heading.id);
      }
    }
  };
});

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


/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：SubmitsCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('SubmitsCtrl', SubmitsCtrl);

    SubmitsCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function SubmitsCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
        vm.arranges = Restangular.all('userarrange').getList({user:$rootScope.getSelfId(), status:1}).$object;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载SubmitsCtrl');
        }

    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：SubmitCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('SubmitCtrl', SubmitCtrl);

    SubmitCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function SubmitCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.startAnswer = startAnswer;
        vm.submit = submit;
        vm.start = false;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载SubmitCtrl');
            Restangular.one('userarrange', $stateParams.id).one('respondent').get()
                .then(function (data) {
                    $timeout(function () {
                        vm.userarrange = data.plain();
                        vm.exam = vm.userarrange.arrange.examination;
                    });
                });
        }

        vm.filterCorrect = function (arr) {
            return arr.customFilter(function (obj) {
                return obj.correct === true;
            });
        };


        function startAnswer(ev) {
            vm.start = true;
        }

        function submit(ev) {
            var model = answer();
            if(model.unAnswers.length > 0) {
                DialogFactory.confirm('你还有 ' + model.unAnswers.length + ' 到题没有做',ev).then(function () {
                    send(model.answers,ev);
                });
            }else{
                send(model.answers,ev);
            }
        }

        function send(model, ev) {
            $rootScope.showProgress('正在提交答案', ev);
            Restangular.one('userarrange', vm.userarrange.id).all('respondent').customPOST(model)
                .then(function (data) {
                    $rootScope.hideAndSuccess('答案提交成功');
                    $rootScope.back();
                }).catch(DialogFactory.showError('答案提交失败', ev));
        }

        function answer() {
            var answers = [];
            var unAnswers = [];
            angular.forEach(vm.exam.titles, function (bt) {
                angular.forEach(bt.titles, function (title) {
                    var answer = {userArrangeId:vm.userarrange.id, bigTitleId: bt.id, titleId: title.id};
                    if(bt.type === 1) {
                        var items = [];
                        angular.forEach(title.answers, function (answer) {
                            if (answer.select) {
                                items.push(answer.id);
                            }
                        });
                        if(items.length === 0) {
                            unAnswers.push(answer);
                        }
                        answer.answer = items.join(',');
                    }else{
                        if(answer.answer === '' || !answer.answer) {
                            unAnswers.push(answer);
                        }
                        answer.answer = title.answer;
                    }
                    answers.push(answer);
                });
            });

            return {answers: answers, unAnswers: unAnswers};
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：WorkListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('WorkListCtrl', WorkListCtrl);

    WorkListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function WorkListCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
//        vm.exams = Restangular.one('user', $rootScope.getSelfId()).all('work').getList().$object;
        vm.arranges = Restangular.all('userarrange').getList({user:$rootScope.getSelfId(), status:0}).$object;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
//            Restangular.all('userarrange').getList({user:$rootScope.getSelfId(), status:0})
//                .then(function(data) {
//                    $timeout(function () {
//                        vm.arranges = data.plain;
//                        if(angular.isArray(vm.arranges)) {
//                            angular.forEach(vm.arranges, function (arrange) {
//
//                            });
//                        }
//                    });
//                });
            $log.info('加载WorkListCtrl');
        }

    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：WorkInfoCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('WorkInfoCtrl', WorkInfoCtrl);

    WorkInfoCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function WorkInfoCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.startAnswer = startAnswer;
        vm.submit = submit;
        vm.start = false;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载WorkInfoCtrl');
            Restangular.one('userarrange', $stateParams.id).get()
                .then(function (data) {
                    $timeout(function () {
                        vm.userarrange = data.plain();
                        vm.exam = vm.userarrange.arrange.examination;
                    });
                });
        }


        function startAnswer(ev) {
            vm.start = true;
        }

        vm.filterCorrect = function (arr) {
            return arr.customFilter(function (obj) {
                return obj.correct === true;
            });
        };

        function submit(ev) {
            var model = answer();
            if(model.unAnswers.length > 0) {
                DialogFactory.confirm('你还有 ' + model.unAnswers.length + ' 道题没有做',ev).then(function () {
                    send(model.answers,ev);
                });
            }else{
                send(model.answers,ev);
            }
        }

        function send(model, ev) {
            $rootScope.showProgress('正在提交答案', ev);
            Restangular.one('userarrange', vm.userarrange.id).all('respondent').customPOST(model)
                .then(function (data) {
                    $rootScope.hideAndSuccess('答案提交成功');
                    $rootScope.back();
                }).catch(DialogFactory.showError('答案提交失败', ev));
        }

        function answer() {
            var answers = [];
            var unAnswers = [];
            angular.forEach(vm.exam.titles, function (bt) {
                angular.forEach(bt.titles, function (title) {
                    var answer = {userArrangeId:vm.userarrange.id, bigTitleId: bt.id, titleId: title.id};
                    if(bt.type === 1) {
                        var items = [];
                        angular.forEach(title.answers, function (answer) {
                            if (answer.select) {
                                items.push(answer.id);
                            }
                        });
                        if(items.length === 0) {
                            unAnswers.push(answer);
                        }
                        answer.answer = items.join(',') || '';
                    }else{
                        if(title.answer === '' || !title.answer) {
                            unAnswers.push(answer);
                        }
                        answer.answer = title.answer || '';
                    }
                    answers.push(answer);
                });
            });

            return {answers: answers, unAnswers: unAnswers};
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：HistoryCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('HistoryCtrl', HistoryCtrl);

    HistoryCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function HistoryCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.startAnswer = startAnswer;
        vm.submit = submit;
        vm.start = false;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载HistoryCtrl');
            Restangular.one('userarrange', $stateParams.id).one('respondent').get()
                .then(function (data) {
                    $timeout(function () {
                        vm.userarrange = data.plain();
                        vm.exam = vm.userarrange.arrange.examination;
                    });
                });
        }

        vm.filterCorrect = function (arr) {
            return arr.customFilter(function (obj) {
                return obj.correct === true;
            });
        };


        function startAnswer(ev) {
            vm.start = true;
        }

        function submit(ev) {
            var model = answer();
            $rootScope.showProgress('正在提交答案', ev);
            Restangular.one('userarrange', vm.userarrange.id).all('respondent').customPUT(model)
                .then(function (data) {
                    $rootScope.hideAndSuccess('答案提交成功');
                    $rootScope.back();
                }).catch(DialogFactory.showError('答案提交失败', ev));
        }


        function answer() {
            var answers = [];
            angular.forEach(vm.exam.titles, function (bt) {
                angular.forEach(bt.titles, function (title) {
                    var answer = {id:title.respondentId, percent:title.percent};
                    answers.push(answer);
                });
            });

            return answers;
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：HistoriesCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('HistoriesCtrl', HistoriesCtrl);

    HistoriesCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function HistoriesCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
        vm.arranges = Restangular.all('userarrange').getList({user:$rootScope.getSelfId(), status:2}).$object;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载HistoriesCtrl');
        }

    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：CorrectsCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('CorrectsCtrl', CorrectsCtrl);

    CorrectsCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function CorrectsCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
        vm.arranges = Restangular.all('userarrange').getList({teach:$rootScope.getSelfId(), status:1}).$object;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载CorrectsCtrl');
        }

    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：CorrectCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('CorrectCtrl', CorrectCtrl);

    CorrectCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function CorrectCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.startAnswer = startAnswer;
        vm.submit = submit;
        vm.start = false;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载CorrectCtrl');
            Restangular.one('userarrange', $stateParams.id).one('respondent').get()
                .then(function (data) {
                    $timeout(function () {
                        vm.userarrange = data.plain();
                        vm.exam = vm.userarrange.arrange.examination;
                    });
                });
        }

        vm.filterCorrect = function (arr) {
            return arr.customFilter(function (obj) {
                return obj.correct === true;
            });
        };


        function startAnswer(ev) {
            vm.start = true;
        }

        function submit(ev) {
            var model = answer();
            $rootScope.showProgress('正在提交答案', ev);
            Restangular.one('userarrange', vm.userarrange.id).all('respondent').customPUT(model)
                .then(function (data) {
                    $rootScope.hideAndSuccess('答案提交成功');
                    $rootScope.back();
                }).catch(DialogFactory.showError('答案提交失败', ev));
        }


        function answer() {
            var answers = [];
            angular.forEach(vm.exam.titles, function (bt) {
                angular.forEach(bt.titles, function (title) {
                    var answer = {id:title.respondentId, percent:title.percent};
                    answers.push(answer);
                });
            });

            return answers;
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('UserListCtrl', UserListCtrl);

    UserListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$timeout', '$mdDialog', 'Tree'];

    function UserListCtrl($log, Config, $state, Restangular, DialogFactory, $timeout, $mdDialog, Tree) {
        //接口定义
        var vm = this;
        vm.departmentTree = Tree.all('department').getList().$object;
        vm.depClick = depClick;
        vm.toggleTree = toggleTree;
        vm.addUser = addUser;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            initSelectDep();
            $log.info('加载UserListCtrl');
        }



        /**
         * 初始化选择的部门
         */
        function initSelectDep() {
            vm.selectDep = (!vm.departmentTree || vm.departmentTree.length < 1) ? {} : vm.departmentTree[0];
            initTemplate();
        }

        /**
         * 初始化模板
         */
        function initTemplate() {
            vm.users = Restangular.one('department', vm.selectDep.id || 0).all('user').getList().$object;

        }

        /**
         * 属性展开与收缩
         * @param scope 模型
         */
        function toggleTree(scope) {
            scope.toggle();
        }

        /**
         * 树形点击处理
         * @param scope 模型
         */
        function depClick(scope) {
            $timeout(function () {
                vm.selectDep = scope.$modelValue;
                initTemplate();
            });
        }

        function addUser(ev) {
            if(!vm.selectDep.id || vm.selectDep.id === 0) {
                DialogFactory.alert('必须选择一个具体的组织结构');
                return;
            }
            $state.go('main.user.add', {depId: vm.selectDep.id,type:vm.selectDep.type});
        }

    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DepartmentChangeCtrl
 * 作用：编辑部门控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('DepartmentChangeCtrl', DepartmentChangeCtrl);

    DepartmentChangeCtrl.$inject = ['$log', 'Config', '$state', '$stateParams', 'UserFactory', 'Restangular', '$timeout', 'DialogFactory'];

    function DepartmentChangeCtrl($log, Config, $state, $stateParams, UserFactory, Restangular, $timeout, DialogFactory) {
        //接口定义
        var vm = this;
        vm.origin = {};
        vm.department = vm.origin;
        vm.parentDepartment = {};
        vm.submit = submit;
        vm.department = {};
        vm.type = {};

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载DepartmentChangeCtrl');
            init();
        }

        /**
         * 初始化函数
         */
        function init() {
            Restangular.one('department', $stateParams.id).get()
                .then(function (data) {
                    $timeout(function () {
                        vm.origin = data;
                        vm.department = data;
                        vm.type = Config.DepartmentTypes[vm.department.type];
                    });
                });
        }

        /**
         * 提交
         * @param event 事件
         */
        function submit(event) {
            if (vm.addForm.$invalid) {
                return;
            }
            vm.department.save()
                .then(function () {
                    DialogFactory.success('部门更新成功', event).then(function () {
                        $state.go('main.dep.list');
                    });
                }).catch(function () {
                    DialogFactory.success('部门更新失败', event);
                });
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserAddCtrl
 * 作用：部门添加控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('UserAddCtrl', UserAddCtrl);

    UserAddCtrl.$inject = ['$log', 'Config', '$state', '$stateParams', 'Restangular', 'DialogFactory'];

    function UserAddCtrl($log, Config, $state, $stateParams, Restangular, DialogFactory) {
        //接口定义
        var vm = this;
        vm.depId = $stateParams.depId;
        vm.type = $stateParams.type;
        vm.department = Restangular.one('department', vm.depId).get().$object;
        var param = {depId: vm.depId};
        if(vm.type !== 4) {
            param.type = 1;
        }
        vm.users = Restangular.all('user').getList().$object;
        vm.updateUser = updateUser;
        vm.cancel = cancel;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载UserAddCtrl');
        }

        function getSelectUsers() {
            vm.depId = vm.department.id;
            var result = [];
            angular.forEach(vm.users, function (user) {
                if (user.selected) {
                    result.push(user.id);
                }
            });
            return result;
        }


        function updateUser(ev) {
            var updateUsers = getSelectUsers();
            if(updateUsers.length === 0) {
                DialogFactory.alert('必须至少选择一个人');
                return;
            }
            Restangular.one('department', vm.depId).all('user').customPOST(updateUsers)
                .then(function (data) {
                    DialogFactory.success('添加成功', ev)
                        .finally(function () {
                            $rootScope.back();
                        });
                }).catch(DialogFactory.showError('添加失败', ev));
        }

        function cancel(event) {
            $state.go('main.dep.list');
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：TitleListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('TitleListCtrl', TitleListCtrl);

    TitleListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function TitleListCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
        vm.user = Restangular.one('user', $rootScope.getSelfId()).get().$object;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载TitleListCtrl');
        }

    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：TitleInfoCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('TitleInfoCtrl', TitleInfoCtrl);

    TitleInfoCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function TitleInfoCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.title = {};
        vm.addAnswer = addAnswer;
        vm.answers = [];
        vm.save = save;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载TitleInfoCtrl');
            Restangular.one('title', $stateParams.id).get()
                .then(function (data) {

                    $timeout(function () {
                        vm.title = data.plain();
                    });
                });
        }
        

        function addAnswer(ev) {
            vm.answers.push({
                userId:$rootScope.getSelfId()
            });
        }

        function save(ev) {
            $rootScope.showProgress('正在添加答案', ev);
            Restangular.one('title', $stateParams.id).all('answer').customPOST(vm.answers)
                .then(function (data) {
                    $rootScope.hideDialog();
                    vm.answers = [];
                    activate();
                }).catch(DialogFactory.showError('答案添加失败',ev));
        }

        function addStudent(ev) {
            var list = vm.allUsers.filterArr(vm.course.students, function (lhs, rhs) {
                return lhs.id === rhs.id;
            });
            var results = [];
            angular.forEach(list, function (item) {
                if (item.type === 0) {
                    results.push(item);
                }
            });
            $mdDialog.show({
                templateUrl: 'components/dlg/list.add.dlg.html',
                disableParentScroll: true,
                hasBackdrop: true,
                clickOutsideToClose: false,
                controller: studentCtrl,
                controllerAs: 'vm',
                locals: {
                    list: results
                }
            }).then(function (data) {
                if (data) {
                    $rootScope.showProgress("正在添加学生", ev);
                    vm.course.students.push(data.plain());
                    vm.course.save()
                        .then(function (data) {
                            $rootScope.hideDialog();
                            DialogFactory.success("学生添加成功", ev);
                        }).catch(function (response) {
                            $rootScope.hideDialog();
                            DialogFactory.fail('学生添加失败', ev);
                            var index = vm.course.indexOf(data);
                            if (index > -1) vm.course.splice(index, 1);
                        });
                }
            });
        }

        studentCtrl.$inject = ['list', '$mdDialog'];
        function studentCtrl(list, $mdDialog) {
            var vm = this;
            vm.list = list;
            vm.header = '选择学生';

            vm.submit = function (item) {
                $mdDialog.hide(item);
            };
            vm.cancel = function () {
                $mdDialog.hide();
            };
            vm.getShow = function (item) {
                return item.name;
            };
        }

        function removeStudent(student, index, ev) {
            var course = Restangular.copy(vm.course);
            course.students.splice(index, 1);
            $rootScope.showProgress("正在删除学生", ev);
            course.save()
                .then(function (data) {
                    $rootScope.hideDialog();
                    DialogFactory.success("学生删除成功", ev);
                    vm.course.students.splice(index, 1);
                }).catch(function (response) {
                    $rootScope.hideDialog();
                    DialogFactory.fail('学生删除失败', ev);
                });
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：TitleAddCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('TitleAddCtrl', TitleAddCtrl);

    TitleAddCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$timeout', '$rootScope'];

    function TitleAddCtrl($log, Config, $state, Restangular, DialogFactory, $timeout, $rootScope) {
        //接口定义
        var vm = this;
        vm.addTitle = addTitle;
        vm.addAnswer = addAnswer;
        vm.title = {
            initiator: $rootScope.getSelfId(),
            answers:[]
        };

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载TitleAddCtrl');
        }

        function addAnswer(ev) {
            vm.title.answers.push({});
        }

        function addTitle(ev) {
            if(vm.addForm.$invalid) {
                return;
            }
            $rootScope.showProgress("正在创建题目", ev);
            Restangular.all('title').customPOST(vm.title)
                .then(function (data) {
                    $rootScope.hideDialog();
                    $rootScope.initSelf();
                    DialogFactory.success('创建题目成功', ev)
                        .then(function () {
                            $state.go('main.title.list');
                        }).catch(function () {
                            vm.title.content = '';
                            vm.title.description = '';
                        });
                }).catch(function (response) {
                    $rootScope.hideDialog();
                    DialogFactory.success('创建题目失败', ev)
                });
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：ExamListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('ExamListCtrl', ExamListCtrl);

    ExamListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function ExamListCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
        vm.user = Restangular.one('user', $rootScope.getSelfId()).get().$object;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载ExamListCtrl');
        }

    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：ExamInfoCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('ExamInfoCtrl', ExamInfoCtrl);

    ExamInfoCtrl.$inject = ['$log', '$timeout', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function ExamInfoCtrl($log, $timeout, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.exam = Restangular.one('exam', $stateParams.id).get().$object;
        vm.arrange = arrange;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载ExamInfoCtrl');
            Restangular.one('title', $stateParams.id).get()
                .then(function (data) {

                    $timeout(function () {
                        vm.title = data.plain();
                    });
                });
        }


        function arrange(ev) {
            $mdDialog.show({
                templateUrl        : 'components/dlg/arrange/dlg.arrange.html',
                disableParentScroll: true,
                hasBackdrop        : true,
                clickOutsideToClose: false,
                controller         : arrangeCtrl,
                controllerAs       : 'vm',
                targetEvent        : ev,
                locals             : {}
            }).then(function (data) {
                var model = {};
                model.courseIds = data.courses.joinMember('id', ',');
                model.userIds = data.users.joinMember('id', ',');
                model.teach = {id: $rootScope.getSelfId()};
                model.name = vm.exam.name;
                model.examination = {id: vm.exam.id};
                $rootScope.showProgress('正在安排作业', ev);
                Restangular.all('arrange').customPOST(model)
                    .then(function (data) {
                        $rootScope.hideAndSuccess('下发成功');
                        $rootScope.back();
                    }).catch(DialogFactory.showError('下发失败', ev));
            });
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：ExamAddCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('ExamAddCtrl', ExamAddCtrl);

    ExamAddCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope', '$timeout'];

    function ExamAddCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope, $timeout) {
        //接口定义
        var vm       = this;
        vm.addAnswer = addAnswer;
        vm.exam      = {
            initiator: $rootScope.getSelfId(),
            bigTitles: []
        };
        vm.titles    = Restangular.all('title').getList().$object;

        vm.addBTitle   = addBTitle;
        vm.selectTitle = selectTitle;

        vm.deleteTitle = deleteTitle;

        vm.mark            = {};
        vm.enableTitleAdds = [];

        vm.up         = up;
        vm.down       = down;
        vm.upTop      = upTop;
        vm.downBottom = downBottom;

        vm.saveTitle       = saveTitle;
        vm.saveExamination = saveExamination;

        vm.addTitle = {
            answers: []
        };

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            vm.addBig      = {
                titles: []
            };
            vm.addBigTitle = false;
            $log.info('加载ExamAddCtrl');

            for (var i = 0; i < 100; i++) {
                vm.enableTitleAdds.push(false);
            }
        }

        function saveExamination(ev) {
            var valid = validExamination();
            if(valid !== '') {
                DialogFactory.fail(valid, ev);
                return;
            }
            vm.exam.initiator = $rootScope.self;
            var model = {
                name: vm.exam.name,
                initiator: {id:$rootScope.getSelfId()},
                titles:[]
            };
            var percent = 0;
            angular.forEach(vm.exam.bigTitles, function (big) {
                var item = {name: big.name, percent:big.percent, type:big.type, titles:[]};
                angular.forEach(big.titles, function (title) {
                    item.titles.push({id: title.id});
                });
                percent += big.titles.length * big.percent;
                model.titles.push(item);
            });
            model.percent = percent;

            $rootScope.showProgress('添加试卷', ev);
            Restangular.all('exam').customPOST(model)
                .then(function (data) {
                    $rootScope.hideAndSuccess('试卷添加成功', ev);
                }).catch(DialogFactory.showError('试卷添加失败', ev));
        }

        function validExamination() {
            if(vm.exam.bigTitles.length === 0) {
                return '必须至少具有一个大题';
            }
            for(var i = 0; i < vm.exam.bigTitles.length; i ++) {
                var item = vm.exam.bigTitles[i];
                if(item.titles.length === 0) {
                    return '每个大题下面都必须至少具有一个小题';
                }
            }
            return '';
        }


        function saveTitle(bigTitle, dx, ev) {
            if (!vm.addTitle.content) {
                alert('字段内容不准确');
                return;
            }
            if (bigTitle.type === 0 || bigTitle.type === 1) {
                if (vm.addTitle.answers.length === 0) {
                    DialogFactory.fail('必须输入答案');
                    return;
                }
                var corrects = vm.addTitle.answers.customFilter(function (obj) {
                    return obj.correct === true;
                });
                if (corrects.length === 0) {
                    DialogFactory.fail('必须具有一个正确答案');
                    return;
                }
                if (corrects.length > 1 && bigTitle.type === 0) {
                    DialogFactory.fail('只能具有一个正确答案');
                    return;
                }
            }
            vm.addTitle.initiator = $rootScope.getSelfId();
            $rootScope.showProgress('添加题目', ev);
            Restangular.all('title').customPOST(vm.addTitle)
                .then(function (data) {
                    $rootScope.hideAndSuccess('添加成功');
                    Restangular.one('title', data).get()
                        .then(function (data) {
                            $timeout(function () {
                                vm.titles.push(data);
                                bigTitle.titles.push(data);
                            });
                        });
                    vm.addTitle            = {answers: []};
                    vm.enableTitleAdds[dx] = false;
                }).catch(DialogFactory.showError('添加失败', ev));
        }

        function addAnswer(ev) {
            vm.title.answers.push({});
        }

        function addBTitle(ev) {
            vm.addBig.name = Config.TitleTypes[vm.addBig.type].name;
            vm.exam.bigTitles.push(vm.addBig);
            activate();
        }

        function deleteTitle(bigTitle, title, index, event) {
            $timeout(function () {
                bigTitle.titles.remove(index);
            });
        }

        function up(bigTitle, title, index, event) {
            bigTitle.titles.exchange(index - 1, index);
        }

        function down(bigTitle, title, index, event) {
            bigTitle.titles.exchange(index + 1, index);
        }

        function upTop(bigTitle, title, index, event) {
            bigTitle.titles.moveToFirst(index);
        }

        function downBottom(bigTitle, title, index, event) {
            bigTitle.titles.moveToLast(index);
        }

        function selectTitle(bigTitle, ev) {
            if (angular.isFunction(vm.titles.plain)) {
                vm.titles = vm.titles.plain();
            }

            var titles = vm.titles.customFilter(function (title) {
                if (bigTitle.type !== 0 && bigTitle.type !== 1) {
                    return true;
                }
                if (bigTitle.type === 1) {
                    return title.answers && title.answers.length > 0;
                } else {
                    var firstCorrect = false;
                    for (var i = 0; i < title.answers.length; i++) {
                        var item = title.answers[i];
                        if (item.correct) {
                            if (firstCorrect) {
                                return false;
                            } else {
                                firstCorrect = true;
                            }
                        }
                    }
                    return firstCorrect
                }

            }).filterArr(bigTitle.titles, function (bt, t) {
                return bt.id === t.id;
            });
            $mdDialog.show({
                templateUrl        : 'components/dlg/selectTitle/dlg.selectTitle.html',
                disableParentScroll: true,
                hasBackdrop        : true,
                clickOutsideToClose: true,
                controller         : selectTitleCtrl,
                controllerAs       : 'vm',
                targetEvent        : ev,
                locals             : {
                    titles: titles
                }
            }).then(function (selects) {
                bigTitle.titles = bigTitle.titles.concat(selects);
            });
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DepartmentListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('DepartmentListCtrl', DepartmentListCtrl);

    DepartmentListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$timeout', '$mdDialog', 'Tree'];

    function DepartmentListCtrl($log, Config, $state, Restangular, DialogFactory, $timeout, $mdDialog, Tree) {
        //接口定义
        var vm = this;
        vm.departmentTree = Tree.all('department').getList().$object;
        vm.depClick = depClick;
        vm.toggleTree = toggleTree;
        vm.addDepartment = addDepartment;
        vm.getTypes = getTypes;
        vm.type = '0';
        vm.addDialog = addDialog;
        vm.editDepartment = editDepartment;
        vm.deleteDepartment = deleteDepartment;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            initSelectDep();
            $log.info('加载DepartmentListCtrl');
        }

        /**
         * 删除部门
         * @param ev 事件
         */
        function deleteDepartment(ev) {
            Restangular.one('department', vm.selectDep.id).remove()
                .then(function () {
                    DialogFactory.success('删除成功', ev);
                    vm.departmentTree = Tree.all('department').getList().$object;
                }).catch(function () {
                    DialogFactory.success('删除失败', ev);
                });
        }

        /**
         * 添加部门的时候弹出的选择对话框
         * @param scope 模型
         * @param event 事件
         */
        function addDialog(scope, event) {
            var types = getTypes(scope);
            $mdDialog.show({
                controller: TypeController,
                templateUrl: 'components/template/dlg.type.tmp.html',
                targetEvent: event,
                locals: {
                    types: types
                }
            })
                .then(function (type) {
                    vm.type = type.id;
                    addDepartment(scope);
                })
                .catch();
        }

        /**
         * 编辑部门
         */
        function editDepartment() {
            if (!vm.selectDep || !vm.selectDep.id) {
                alert("必须至少选择一个公司或者部门");
                return;
            }
            $state.go('main.dep.change', {id: vm.selectDep.id});
        }

        /**
         * 类型控制器，类型选择弹出框
         * @param $scope
         * @param types
         * @constructor
         */
        function TypeController($scope, types) {
            $scope.items = types;
            $scope.select = function (type) {
                $mdDialog.hide(type);
            };
        }
        TypeController.$inject = ["$scope", "types"];

        /**
         * 根据类型选择能够添加的类型
         * @param scope 模型
         * @returns {Array} 类型数组
         */
        function getTypes(scope) {
            var dep = scope.$modelValue;
            var types = [];

            switch (dep.type) {
                case 1:
                    types.push(Config.DepartmentTypes[2]);
                    break;
                case 2:
                    types.push(Config.DepartmentTypes[2], Config.DepartmentTypes[3]);
                    break;
                case 3:
                    types.push(Config.DepartmentTypes[4]);
                    break;
            }
            return types;
        }

        /**
         * 初始化选择的部门
         */
        function initSelectDep() {
            vm.selectDep = (!vm.departmentTree || vm.departmentTree.length < 1) ? {} : vm.departmentTree[0];
            initTemplate();
        }

        /**
         * 初始化模板
         */
        function initTemplate() {
            vm.template = (!vm.selectDep.type) ? Config.DepartmentTypes['0'] : Config.DepartmentTypes[vm.selectDep.type];
        }

        /**
         * 属性展开与收缩
         * @param scope 模型
         */
        function toggleTree(scope) {
            scope.toggle();
        }

        /**
         * 树形点击处理
         * @param scope 模型
         */
        function depClick(scope) {
            $timeout(function () {
                vm.selectDep = scope.$modelValue;
                initTemplate();
            });
        }

        /**
         * 添加部门
         * @param scope 模型
         */
        function addDepartment(scope) {
            if (!scope) {
                $state.go('main.dep.add', {typeId: '1', depId: undefined});
            } else {
                var dep = scope.$modelValue;
                $state.go('main.dep.add', {typeId: vm.type, depId: dep.id});
            }
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DepartmentChangeCtrl
 * 作用：编辑部门控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('DepartmentChangeCtrl', DepartmentChangeCtrl);

    DepartmentChangeCtrl.$inject = ['$log', 'Config', '$state', '$stateParams', 'UserFactory', 'Restangular', '$timeout', 'DialogFactory'];

    function DepartmentChangeCtrl($log, Config, $state, $stateParams, UserFactory, Restangular, $timeout, DialogFactory) {
        //接口定义
        var vm = this;
        vm.origin = {};
        vm.department = vm.origin;
        vm.parentDepartment = {};
        vm.submit = submit;
        vm.department = {};
        vm.type = {};

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载DepartmentChangeCtrl');
            init();
        }

        /**
         * 初始化函数
         */
        function init() {
            Restangular.one('department', $stateParams.id).get()
                .then(function (data) {
                    $timeout(function () {
                        vm.origin = data;
                        vm.department = data;
                        vm.type = Config.DepartmentTypes[vm.department.type];
                    });
                });
        }

        /**
         * 提交
         * @param event 事件
         */
        function submit(event) {
            if (vm.addForm.$invalid) {
                return;
            }
            vm.department.save()
                .then(function () {
                    DialogFactory.success('部门更新成功', event).then(function () {
                        $state.go('main.dep.list');
                    });
                }).catch(function () {
                    DialogFactory.success('部门更新失败', event);
                });
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DepartmentAddCtrl
 * 作用：部门添加控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('DepartmentAddCtrl', DepartmentAddCtrl);

    DepartmentAddCtrl.$inject = ['$log', 'Config', '$state', '$stateParams', 'Restangular', 'DialogFactory'];

    function DepartmentAddCtrl($log, Config, $state, $stateParams, Restangular, DialogFactory) {
        //接口定义
        var vm = this;
        vm.depId = $stateParams.depId;
        vm.type = Config.DepartmentTypes[$stateParams.typeId];
        vm.parentDepartment = Restangular.one('department', vm.depId);
        vm.pName = getParentName();
        vm.department = {
            pid: (!vm.depId) ? '0' : vm.depId,
            type: vm.type.id
        };
        vm.addDepartment = addDepartment;
        vm.cancel = cancel;
        vm.addForm = {};

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载DepartmentAddCtrl');
        }

        function getParentName() {
            if (!vm.parentDepartment) {
                return '根节点';
            }
            return vm.parentDepartment.name;
        }

        function addDepartment(ev) {
            if (vm.addForm.$invalid) {
                return;
            }
            Restangular.all('department').post(vm.department)
                .then(function (data) {
                    DialogFactory.success('部门添加成功', ev)
                        .finally(function () {
                            $state.go('main.dep.list');
                        });
                }).catch(function () {
                    DialogFactory.fail('部门添加失败', ev);
                });
        }

        function cancel(event) {
            $state.go('main.dep.list');
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：StudentListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('StudentListCtrl', StudentListCtrl);

    StudentListCtrl.$inject = ['$log', 'Config', '$rootScope', 'Restangular', 'DialogFactory', '$mdDialog', '$stateParams'];

    function StudentListCtrl($log, Config, $rootScope, Restangular, DialogFactory, $mdDialog, $stateParams) {
        //接口定义
        var vm = this;
        vm.course = Restangular.one('course', $stateParams.id).get().$object;
        vm.addStudent = addStudent;
        vm.removeStudent = removeStudent;
        vm.allUsers = Restangular.all('user').getList().$object;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载StudentListCtrl');
        }

        function addStudent(ev) {
            var list = vm.allUsers.filterArr(vm.course.students, function (lhs, rhs) {
                return lhs.id === rhs.id;
            });
            var results = [];
            angular.forEach(list, function (item) {
                if (item.type === 0) {
                    results.push(item);
                }
            });
            $mdDialog.show({
                templateUrl: 'components/dlg/list.add.dlg.html',
                disableParentScroll: true,
                hasBackdrop: true,
                clickOutsideToClose: false,
                controller: studentCtrl,
                controllerAs: 'vm',
                locals: {
                    list: results
                }
            }).then(function (data) {
                if (data) {
                    $rootScope.showProgress("正在添加学生", ev);
                    Restangular.one('course', $stateParams.id).one('student', data.id).customPOST()
                        .then(function (data) {
                            $rootScope.hideDialog();
                            vm.course = Restangular.one('course', $stateParams.id).get().$object;
                            DialogFactory.success("学生添加成功", ev);
                        }).catch(function (response) {
                            $rootScope.hideDialog();
                            DialogFactory.fail('学生添加失败', ev);
                        });
                }
            });
        }

        studentCtrl.$inject = ['list', '$mdDialog'];
        function studentCtrl(list, $mdDialog) {
            var vm = this;
            vm.list = list;
            vm.header = '选择学生';

            vm.submit = function (item) {
                $mdDialog.hide(item);
            };
            vm.cancel = function () {
                $mdDialog.hide();
            };
            vm.getShow = function (item) {
                return item.name;
            };
        }

        function removeStudent(student, index, ev) {
            $rootScope.showProgress("正在删除学生", ev);
            Restangular.one('course', $stateParams.id).one('student', student.id).customDELETE()
                .then(function (data) {
                    $rootScope.hideDialog();
                    vm.course = Restangular.one('course', $stateParams.id).get().$object;
                    DialogFactory.success("学生删除成功", ev);
                }).catch(DialogFactory.showError('删除失败', ev));
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：CourseListCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('CourseListCtrl', CourseListCtrl);

    CourseListCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$mdDialog', '$rootScope'];

    function CourseListCtrl($log, Config, $state, Restangular, DialogFactory, $mdDialog, $rootScope) {
        //接口定义
        var vm = this;
        vm.user = Restangular.one('user', $rootScope.getSelfId()).get().$object;
        vm.addCourse = addCourse;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载CourseListCtrl');
        }

        function addCourse(ev) {
            $mdDialog.show({
                templateUrl: 'components/dlg/course.add.dlg.html',
                disableParentScroll: true,
                hasBackdrop: true,
                clickOutsideToClose: false,
                controller: courseCtrl,
                controllerAs: 'vm'
            }).then(function (data) {
                if (data) {
                    data.teach = {id: vm.user.id};
                    $rootScope.showProgress("正在添加课程", ev);
                    Restangular.all('course').customPOST(data)
                        .then(function (data) {
                            $rootScope.hideDialog();
                            vm.user = Restangular.one('user', $rootScope.getSelfId()).get().$object;
                            DialogFactory.success("课程添加成功", ev);
                        }).catch(function (response) {
                            $rootScope.hideDialog();
                            DialogFactory.fail('课程添加失败', ev);
                        });
                }
            });
        }

        courseCtrl.$inject = ['$mdDialog'];
        function courseCtrl($mdDialog) {
            var vm = this;
            vm.course = {};

            vm.submit = function () {
                if(vm.addForm.$invalid) {
                    return;
                }
                $mdDialog.hide(vm.course);
            };
            vm.cancel = function () {
                $mdDialog.hide();
            };
            vm.getShow = function (item) {
                return item.name;
            };
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：CourseAddCtrl
 * 作用：管理部门列表控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('CourseAddCtrl', CourseAddCtrl);

    CourseAddCtrl.$inject = ['$log', 'Config', '$state', 'Restangular', 'DialogFactory', '$timeout', '$rootScope'];

    function CourseAddCtrl($log, Config, $state, Restangular, DialogFactory, $timeout, $rootScope) {
        //接口定义
        var vm = this;
        vm.courses = Restangular.one('user', $rootScope.getSelfId()).all('course').getList().$object;
        vm.addCourse = addCourse;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载CourseAddCtrl');
        }

        function addCourse(ev) {

        }
    }

})();

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

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：userName
 * 作用：将个人ID转换成名字输出
 */
(function () {
  'use strict';

  angular.module('home').filter('userName', userNameFilter);

  userNameFilter.$inject = ['AuthFactory', 'UserFactory'];

  function userNameFilter(AuthFactory, UserFactory) {
    return userNameFilterImpl;

    function userNameFilterImpl(value) {
      var val = value || AuthFactory.loginID;
      var len = val.indexOf('@');
      if (len !== -1) {
        val = val.substr(0, len);
      }
      return UserFactory.findUserById(val).name;
    }
  }
})();


/**
 * 创建人：pengchao
 * 创建时间：2015-3-24-0024
 * 工厂名字：userItem
 * 作用：用户项过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('userItem', userItemFilter);

    userItemFilter.$inject=[];

    function userItemFilter(){
        return userItemFilterImpl;

        function userItemFilterImpl(user){
          if(!user){
            return '';
          }
          var space = "     ";
          return user.name + space + user.sex === 0 ? '男' : '女' + space +  (new Date().getYear() - new Date(user.birthday).getYear()) + "岁" + space + user.nation + space + user.school + space + user.professional + space + user.telephone;
        }
    }
})();


/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：trustHtml
 * 作用：将一般字符串转换成html信任域的字符串
 */
(function(){
    'use strict';

    angular.module('home').filter('trustHtml', trustHtmlFilter);

    trustHtmlFilter.$inject=['$sce'];

    function trustHtmlFilter($sce){
        return trustHtmlFilterImpl;

        function trustHtmlFilterImpl(value){
          value = value || "<p>未填写</p>";
          return $sce.trustAsHtml(value);
        }
    }
})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：dayAge
 * 作用：序列转化器 岁数的形式
 */
(function () {
    'use strict';

    angular.module('home').filter('sequence', sequence);

    sequence.$inject = ['$filter'];

    function sequence($filter) {
        return function (value, type, args) {
            type  = type || 'number';
            value = value || 0;
            if (!angular.isNumber(value)) {
                return value;
            }

            //显示数字
            if (type === 'number') {
                return value;
            }
            var result;
            //显示字母
            if (type === 'case') {
                args       = args || 'letter';
                var values = [
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
                ];
                result = '';
                do {
                    result += values[value % values.length];
                    value = value - values.length;
                } while (value > 0)
                result = result.reverse();
                return args === 'letter' ? result : result.toUpperCase();
            }

            //显示中文一二三四
            if (type === 'zh') {
                var ary0 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
                var ary1 = ["", "十", "百", "千"];
                var ary2 = ["", "万", "亿", "兆"];
                if(value === 0) {
                    return ary0[0];
                }
                var results = [];
                do{
                    var item = '';
                    var tmp = value % 10000;
                    if(tmp > 1000) {
                        item += ary0[tmp / 1000] + ary1[3];
                    }
                    tmp = tmp % 1000;
                    if(tmp > 100) {
                        item += ary0[tmp / 100] + ary1[2];
                    }

                    tmp = tmp % 100;
                    if(tmp > 10) {
                        item += ary0[tmp / 10] + ary1[1];
                    }
                    tmp = tmp % 10;
                    if(tmp > 0) {
                        item += ary0[tmp] + ary1[0];
                    }
                    results.push(item);
                    value = value / 10000;
                    value = Math.floor(value);
                }while(value > 0);

                results = results.reverse();
                result = '';

                for(var i = 0; i < results.length; i ++) {
                    result += results[length] + ary2[results.length - i - 1];
                }
                return result;
            }
        };

    }

})();
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


/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：sex
 * 作用：性别过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('sex', sexFilter);

    sexFilter.$inject=[];

    function sexFilter(){
        return sexFilterImpl;

        function sexFilterImpl(value){
          return value === 1 ? "女" : "男";
        }
    }
})();


/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：postType
 * 作用：岗位类型过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('postType', postTypeFilter);

    postTypeFilter.$inject=['UserFactory'];

    function postTypeFilter(UserFactory){
        return postTypeFilterImpl;

        function postTypeFilterImpl(value){
          if (!value) {
            return '未设置';
          }
          var type = UserFactory.postTypeMap[value] || {name: '岗位类型未初始化'};
          return type.name;
        }
    }
})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：postLevel
 * 作用：岗位等级过滤器
 */
(function () {
  'use strict';

  angular.module('home').filter('postLevel', postLevelFilter);

  postLevelFilter.$inject = ['UserFactory'];

  function postLevelFilter(UserFactory) {
    return postLevelFilterImpl;

    function postLevelFilterImpl(value) {
      if (!value) {
        return '未设置';
      }
      var type = UserFactory.postLevelMap[value] || {name: '岗位级别未初始化'};
      return type.name;
    }
  }
})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：noticeType
 * 作用：通知类型过滤器
 */
(function () {
  'use strict';

  angular.module('home').filter('noticeType', noticeTypeFilter);

  noticeTypeFilter.$inject = ['Config'];

  function noticeTypeFilter(Config) {
    return noticeTypeFilterImpl;


    function noticeTypeFilterImpl(value) {
      value = value || 1;
      return Config.NoticeTypes[value - 1].name;
    }
  }
})();


/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：nospace
 * 作用：将空值使用''并且去掉左右空格的过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('nospace', nospaceFilter);

    nospaceFilter.$inject=[];

    function nospaceFilter() {
      return nospaceFilterImpl;


      function nospaceFilterImpl(value) {
        return (!value) ? '' : value.replace(/ /g, '');
      }
    }
})();


/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：newType
 * 作用：新闻类型过滤器
 */
(function(){
    'use strict';

    angular.module('home').filter('newType', newTypeFilter);

    newTypeFilter.$inject=['Config'];

    function newTypeFilter(Config){
        return newTypeFilterImpl;

        function newTypeFilterImpl(value){
          value = value || 1;
          return Config.NewsTypes[value - 1].name;
        }
    }
})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-27-0027
 * 工厂名字：modelEdit
 * 作用：跳转到模型编辑
 */
(function () {
    'use strict';

    angular.module('home').filter('modelEdit', modelEditFilter);

    modelEditFilter.$inject = ['Config'];

    function modelEditFilter(Config) {
        return modelEditFilterImpl;

        function modelEditFilterImpl(value) {
          return Config.Urls.RestUrl + "workflow/modeler.html?modelId=" + value;
        }
    }
})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-24-0024
 * 工厂名字：humanizeDoc
 * 作用：
 */
(function () {
  'use strict';

  angular.module('home').filter('humanizeDoc', humanizeDocFilter);

  humanizeDocFilter.$inject = [];

  function humanizeDocFilter() {
    return humanizeDocFilterImpl;

    function humanizeDocFilterImpl(doc) {
      if (!doc) return;
      if (doc.type === 'directive') {
        return doc.name.replace(/([A-Z])/g, function ($1) {
          return '-' + $1.toLowerCase();
        });
      }
      return doc.label || doc.name;
    }
  }
})();

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

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：default
 * 作用：将空值使用'未填写'或者默认值并且去掉左右空格的过滤器
 */
(function () {
  'use strict';

  angular.module('home').filter('default', defaultFilter);

  defaultFilter.$inject = [];

  function defaultFilter() {
    return defaultFilterImpl;


    function defaultFilterImpl(value, def) {
      def = def || "未填写";
      if (!angular.isString(value)) {
        return (!value) ? def : value;
      }
      return (!value) ? def : value.replace(/ /g, '');
    }
  }
})();


/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：dayAge
 * 作用：将日期转换成日期 岁数的形式
 */
(function(){
    'use strict';

    angular.module('home').filter('dayAge', dayAgeFilter);

    dayAgeFilter.$inject=['$filter'];

    function dayAgeFilter($filter){
        return dayAgeFilterImpl;

      /**
       * 过滤器实现
       * @param value     原始值
       * @returns {string} 过滤后的值
       */
        function dayAgeFilterImpl(value){
          var date;
          if (!value) {
            return "未填写";
          } else {
            date = new Date(value);
          }
          return $filter('date')(date, 'yyyy年MM月dd日') + "   " + (new Date().getYear() - date.getYear()) + "岁";
        }
    }
})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：dayAge
 * 作用：将日期转换成日期 岁数的形式
 */
(function () {
    'use strict';

    angular.module('home').filter('abcd', abcd);

    abcd.$inject = ['$filter'];

    function abcd($filter) {
        var dd = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        /**
         * 过滤器实现
         * @param value     原始值
         * @returns {string} 过滤后的值
         */
        return function (value, upper) {
            if (!angular.isNumber(value)) {
                return value;
            }
            upper = upper || 'letter';
            value = value % dd.length;
            if (upper === 'upper') {
                return dd[value].toUpperCase();
            } else if (upper === 'letter') {
                return dd[value];
            }
        }
    }
})();
/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：md5Factory
 * 作用：md5码工厂
 */
(function () {
  'use strict';

  angular.module('home').factory('md5Factory', md5Factory);

  md5Factory.$inject = ['$log', 'Config'];

  function md5Factory($log, Config) {
    //接口定义
    var factory = md5;

    activate();
    return factory;

    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载md5Factory');
    }


    /**
     * 产生MD5码
     * @param string 需要产生md5的字符串
     * @param key    关键字
     * @param raw    原始串
     * @returns {*}  md5码值
     */
    function md5(string, key, raw) {
      if (!key) {
        if (!raw) {
          return hex_md5(string);
        }
        return raw_md5(string);
      }
      if (!raw) {
        return hex_hmac_md5(key, string);
      }
      return raw_hmac_md5(key, string);
    }

    /*
     * Take string arguments and return either raw or hex encoded strings
     */
    function raw_md5(s) {
      return rstr_md5(str2rstr_utf8(s));
    }

    function hex_md5(s) {
      return rstr2hex(raw_md5(s));
    }

    function raw_hmac_md5(k, d) {
      return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }

    function hex_hmac_md5(k, d) {
      return rstr2hex(raw_hmac_md5(k, d));
    }

    /*
     * Encode a string as utf-8
     */
    function str2rstr_utf8(input) {
      return unescape(encodeURIComponent(input));
    }

    /*
     * Convert a raw string to a hex string
     */
    function rstr2hex(input) {
      var hex_tab = '0123456789abcdef',
        output = '',
        x,
        i;
      for (i = 0; i < input.length; i += 1) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F) +
        hex_tab.charAt(x & 0x0F);
      }
      return output;
    }

    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    function rstr_hmac_md5(key, data) {
      var i,
        bkey = rstr2binl(key),
        ipad = [],
        opad = [],
        hash;
      ipad[15] = opad[15] = undefined;
      if (bkey.length > 16) {
        bkey = binl_md5(bkey, key.length * 8);
      }
      for (i = 0; i < 16; i += 1) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }
      hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
      return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
     * Calculate the MD5 of a raw string
     */
    function rstr_md5(s) {
      return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    function rstr2binl(input) {
      var i,
        output = [];
      output[(input.length >> 2) - 1] = undefined;
      for (i = 0; i < output.length; i += 1) {
        output[i] = 0;
      }
      for (i = 0; i < input.length * 8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
      }
      return output;
    }

    /*
     * Convert an array of little-endian words to a string
     */
    function binl2rstr(input) {
      var i,
        output = '';
      for (i = 0; i < input.length * 32; i += 8) {
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
      }
      return output;
    }

    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    function binl_md5(x, len) {
      /* append padding */
      x[len >> 5] |= 0x80 << (len % 32);
      x[(((len + 64) >>> 9) << 4) + 14] = len;

      var i, olda, oldb, oldc, oldd,
        a = 1732584193,
        b = -271733879,
        c = -1732584194,
        d = 271733878;

      for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;

        a = md5_ff(a, b, c, d, x[i], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
      }
      return [a, b, c, d];
    }

    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    function md5_cmn(q, a, b, x, s, t) {
      return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }

    function md5_ff(a, b, c, d, x, s, t) {
      return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function md5_gg(a, b, c, d, x, s, t) {
      return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function md5_hh(a, b, c, d, x, s, t) {
      return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function md5_ii(a, b, c, d, x, s, t) {
      return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    function safe_add(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    function bit_rol(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    }
  }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserFactory
 * 作用：用户管理的工厂
 */
(function () {
  'use strict';

  angular.module('home').factory('UserFactory', UserFactory);

  UserFactory.$inject = ['$log', 'Config', 'Restangular', '$q'];

  function UserFactory($log, Config, Restangular, $q) {
    //接口定义
    var factory = {};
    factory.registerCallback = registerCallback;
    factory.reload = reloadData;
    factory.findUserById = findUserById;
    factory.queryUsersByDep = queryUsersByDep;
    factory.findPositionByDepId = findPositionByDepId;
    factory.findPositionById = findPositionById;
    factory.getPostByDep = getPostByDep;
    factory.depMap = {};
    factory.userMap = {};
    factory.postMap = {};
    factory.postTypeMap = {};
    factory.postLevelMap = {};
    factory.registerCallback = registerCallback;
    factory.findDepartmentById = findDepartmentById;
    factory.findDepartmentsById = findDepartmentsById;
    factory.addDepartment = addDepartment;
    factory.adjustDepTree = adjustDepTree;
    factory.getPostButDep = getPostButDep;
    factory.addDepPost = addDepPost;
    factory.removePost = removePost;

    var callbacks = {};
    activate();
    return factory;

    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      //$q.all([
        //Restangular.all('department').getList().then(function (data) {
        //  factory.departments = data;
        //}),
        //Restangular.all('position').getList().then(function (data) {
        //  factory.positions = data;
        //}),
        //Restangular.all('userinfo').getList().then(function (data) {
        //  factory.users = data;
        //}),
        //Restangular.all('posttype').getList().then(function (data) {
        //  factory.postTypes = data;
        //}),
        //Restangular.all('postlevel').getList().then(function (data) {
        //  factory.postLevels = data;
        //}),
        //Restangular.all('userdeppost').getList().then(function (data) {
        //  factory.userDepPosts = data;
        //}),
        //Restangular.all('deppost').getList().then(function (data) {
        //  factory.depPosts = data;
        //})])
        //.finally(function () {
        //  adjustDepTree();
        //  $log.info('用户信息加载完成');
        //});
      $log.info('加载UserFactory');
    }

    /**
     * 重新加载数据
     */
    function reloadData() {
      activate();
    }

    /**
     * 调整树结构
     * @returns {Array}  组织树
     */
    function adjustDepTree() {
      var department, roots = [];
      factory.depMap = {}, factory.userMap = {}, factory.postMap = {}, factory.postTypeMap = {}, factory.postLevelMap = {};
      for (var i = 0; i < factory.departments.length; i++) {
        department = factory.departments[i];
        factory.depMap[department.id] = department;
        department.children = [];
      }

      angular.forEach(factory.postTypes, function (type) {
        factory.postTypeMap[type.id] = type;
      });
      angular.forEach(factory.postLevels, function (level) {
        factory.postLevelMap[level.id] = level;
      });

      angular.forEach(factory.positions, function (post) {
        factory.postMap[post.id] = post;
      });

      for (var i = 0; i < factory.users.length; i++) {
        var user = factory.users[i];
        factory.userMap[user.id] = user;
      }

      for (var i = 0; i < factory.departments.length; i++) {
        department = factory.departments[i];
        if (department.pid !== '0') {
          var parent = factory.depMap[department.pid];
          if (!parent) {
            continue;
          }
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(department);
        }
      }

      angular.forEach(factory.departments, function (dep) {
        if (dep.pid === '0') {
          roots.push(dep);
        }
      });
      factory.depTree = roots;
      notify(Config.Events.UserInitEvent);
      return roots;
    }

    /**
     * 通过用户ID查询用户信息
     * @param id 用户ID
     * @returns {{用户信息}}
     */
    function findUserById(id) {
      return factory.userMap[id];
    }

    /**
     * 查找部门下面的人员
     * @param dep 部门
     * @returns {*} 人员
     */
    function queryUsersByDep(dep) {
      if (!dep || dep.id === '0') {
        return factory.users;
      }
      var items = {};
      var children = depChildren(dep);
      angular.forEach(factory.userDepPosts, function (userDepPost) {
        if (children[userDepPost.depId] && factory.userMap[userDepPost.userId]) {
          items[userDepPost.userId] = factory.userMap[userDepPost.userId];
        }
      });
      var results = [];
      for (var key in items) {
        results.push(items[key]);
      }
      return results;
    }

    /**
     * 组织部门下面的children
     * @param dep 部门
     * @returns {{}} 所有的children
     */
    function depChildren(dep) {
      var results = {};
      var roots = [];
      roots.push(dep);
      while (roots && roots.length > 0) {
        var items = [];
        angular.forEach(roots, function (root) {
          results[root.id] = root;
          if (root.children && root.children.length > 0) {
            items = items.concat(root.children);
          }
        });
        roots = items;
      }
      return results;
    }

    /**
     * 查找部门下面的岗位
     * @param depId 部门ID
     * @returns {Array} 岗位列表
     */
    function findPositionByDepId(depId) {
      var results = [];
      angular.forEach(factory.depPosts, function (depPost) {
        if (depPost.depId === depId) {
          results.push(factory.postMap[depPost.postId]);
        }
      });
      return results;
    }

    /**
     * 通过部门查找岗位
     * @param dep 部门
     * @returns {Array} 包装过后的岗位列表
     */
    function getPostByDep(dep) {
      var results = [];
      if (dep) {
        angular.forEach(factory.depPosts, function (depPost) {
          if (depPost.depId === dep.id) {
            results.push({checked: false, post: factory.postMap[depPost.postId], depPost: depPost});
          }
        });
      }

      return results;
    }

    /**
     * 获取所有的岗位信息，将特定部门下的岗位标识为灰色
     * @param dep 部门
     * @returns {Array} 岗位列表包装
     */
    function getPostButDep(dep) {
      var results = {};
      for (var key in factory.postMap) {
        var position = factory.postMap[key];
        results[key] = {checked: false, disabled: false, post: position};
      }
      if (dep) {
        angular.forEach(factory.depPosts, function (depPost) {
          if (depPost.depId === dep.id) {
            results[depPost.postId].checked = true;
            results[depPost.postId].disabled = true;
            results[depPost.postId].depPost = depPost;
          }
        });
      }
      var dest = [];
      for (var key in results) {
        dest.push(results[key]);
      }
      return dest;
    }

    /**
     * 删除岗位
     * @param post 岗位
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|jQuery.ready.promise|*}
     */
    function removePost(post) {
      var def = $q.defer();
      post.remove()
        .then(function () {
          var index = factory.positions.indexOf(post);
          if (index > -1) factory.positions.splice(index, 1);
          adjustDepTree();
          def.resolve();
        })
        .catch(function (response) {
          def.reject(response);
        });
      return def.promise;
    }

    /**
     * 通过ID查找部门 递归到根节点
     * @param id 部门iD
     * @returns {Array} 列表
     */
    function findDepartmentsById(id) {
      var results = [];
      while (id !== '0') {
        var dep = findDepartmentById(id);
        if(!dep) {
          break;
        }
        results.push(dep);
        id = dep.pid;
      }
      results.reverse();
      return results;
    }

    /**
     * 添加部门岗位关联
     * @param posts 岗位
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|jQuery.ready.promise|*}
     */
    function addDepPost(posts) {
      var defer = $q.defer();
      Restangular.one('deppost').customPOST(posts, 'list')
        .then(function (data) {
          defer.resolve();
          Restangular.all('deppost').getList().then(function (data) {
            factory.depPosts = data;
            adjustDepTree();
          })
        })
        .catch(function (response) {
          defer.reject(response);
        });
      return defer.promise;
    }

    /**
     * 通过id查找岗位
     * @param id id
     * @returns {*} 岗位
     */
    function findPositionById(id) {
      return factory.postMap[id];
    }

    /**
     * 添加部门
     * @param department 部门
     */
    function addDepartment(department) {
      factory.departments.push(department);
      adjustDepTree();
    }

    /**
     * 根据部门ID查找部门
     * @param depId 部门ID
     * @returns {*} 部门
     */
    function findDepartmentById(depId) {
      if (!depId) {
        return null;
      }
      return factory.depMap[depId];
    }

    /**
     * 注册回调函数
     * @param id  需要监听的事件
     * @param callback 回调函数
     */
    function registerCallback(id, callback) {
      if (!callbacks[id]) {
        callbacks[id] = [];
      }
      callbacks[id].push(callback);
    }

    /**
     * 发送一个事件通知
     * @param id 事件ID
     */
    function notify(id) {
      var calls = callbacks[id];
      if (!calls) {
        return;
      }
      angular.forEach(calls, function (call) {
        call();
      });
    }
  }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-30-0030
 * 工厂名字：Tree
 * 作用：树形结构获取
 */
(function () {
    'use strict';

    angular.module('home').factory('Tree', Tree);

    Tree.$inject = ['$log', 'Config','Restangular'];

    function Tree($log, Config,Restangular) {
        //接口定义
        var factory = Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl((Config.Urls.RestUrl || '') + 'tree');
        });
        activate();
        return factory;

        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载Repository');
        }
    }

})();
/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：MenuFactory
 * 作用：主页菜单工厂
 */
(function () {
  'use strict';

  angular.module('home').factory('MenuFactory', MenuFactory);

  MenuFactory.$inject = ['$log', 'Config', 'Restangular', '$q','$rootScope'];

  function MenuFactory($log, Config, Restangular, $q,$rootScope) {
    var callbacks = [];
    //接口定义
    var factory = {};
    factory.getSections = function(){return  Restangular.all('menu').getList({user:$rootScope.getSelfId()}).$object;};
    factory.selectPage = selectPage;
    factory.selectSection = function (section) { factory.openedSection = section; };
    factory.toggleSelectSection = function (section) { factory.openedSection = (factory.openedSection === section ? null : section); };
    factory.isSectionSelected = function (section) { return factory.openedSection === section; };
    factory.isPageSelected = function (page) { return factory.currentPage === page; };
    factory.reload = reload;
    factory.registerCallback = registerCallback;
    activate();
    return factory;

    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载MenuFactory开始...');
      $log.info('加载MenuFactory结束');
    }

    function selectPage(section, page) {
      page && page.url && $location.path(page.url);
      factory.currectSection = section;
      factory.currentPage = page;
    }

    function reload() {
      var deferred = $q.defer();
      Restangular.all('menu').getList({user:$rootScope.getSelfId()})
          .then(function (data) {
            factory.sections = data;
            deferred.resolve(0);
            notify(Config.Events.MenuInit);
          })
          .catch(function (response) {
            deferred.reject();
          });
      return deferred.promise;
    }

    /**
     * 注册回调函数
     * @param id  需要监听的事件
     * @param callback 回调函数
     */
    function registerCallback(id, callback) {
      if (!callbacks[id]) {
        callbacks[id] = [];
      }
      callbacks[id].push(callback);
    }

    /**
     * 发送一个事件通知
     * @param id 事件ID
     */
    function notify(id) {
      var calls = callbacks[id];
      if (!calls) {
        return;
      }
      angular.forEach(calls, function (call) {
        call();
      });
    }
  }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DialogFactory
 * 作用：对话框工厂
 */
(function () {
  'use strict';

  angular.module('home').factory('DialogFactory', DialogFactory);

  DialogFactory.$inject = ['$log', '$mdDialog','$rootScope'];

  function DialogFactory($log, $mdDialog,$rootScope) {
    //接口定义
    var factory = {};
    factory.registerCallback = registerCallback;
    factory.alert = function (txt, ev) {
      return $mdDialog.show($mdDialog.alert().title('注意').content(txt).ok('确定').targetEvent(ev));
    };

    factory.fail = function (txt, ev) {
      return $mdDialog.show($mdDialog.alert().title('错误').content(txt).ok('确定').targetEvent(ev));
    };

    factory.success = function (txt, ev) {
      return $mdDialog.show($mdDialog.alert().title('成功').content(txt).ok('确定').targetEvent(ev));
    };

    factory.confirm = function (txt, ev, title, okLabel, cancelLabel) {
      okLabel     = okLabel || "确定";
      cancelLabel = cancelLabel || "取消";
      title = title || '确认';
      return $mdDialog.show($mdDialog.confirm().title(title).content(txt).ariaLabel('confirm').ok(okLabel).cancel(cancelLabel).targetEvent(ev));
    };

    factory.errorFromResponse = function(response) {
      if(!response){
        return '';
      }

      if(response.status) {
        return '跟服务器间的通信出现问题,请联系系统管理员';
      }

      if(response.rm) {
        return response.rm;
      }

      if(angular.isString(response)) {
        return response;
      }

      return '';
    };

    factory.showError = function(header, ev) {
      return function(response){
        $rootScope.hideDialog();
        header = header || '';
        var msg = factory.errorFromResponse(response);
        var show;
        if(msg && header) {
          show = header + ", " + msg;
        }else{
          show = header + msg;
        }
        factory.fail(show, ev);
      }
    };

    var callbacks = {};
    activate();
    return factory;

    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载DialogFactory');
    }

    /**
     * 注册回调函数
     * @param id  需要监听的事件
     * @param callback 回调函数
     */
    function registerCallback(id, callback) {
      if (!callbacks[id]) {
        callbacks[id] = [];
      }
      callbacks[id].push(callback);
    }

    /**
     * 发送一个事件通知
     * @param id 事件ID
     */
    function notify(id) {
      var calls = callbacks[id];
      if (!calls) {
        return;
      }
      angular.forEach(calls, function (call) {
        call();
      });
    }
  }

})();

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

/**
 * 创建人：pengchao
 * 创建时间：2015-3-26-0026
 * 工厂名字：String
 * 作用：扩展String的方法
 */
(function () {
    'use strict';


    Array.prototype.customFind = function (func) {
        for (var i = 0; i < this.length; i++) {
            if (func(this[i])) {
                return this[i];
            }
        }
    };

    Array.prototype.filterArr = function (arr, func) {
        var results = [];
        for (var i = 0; i < this.length; i++) {
            var item = this[i];
            if (!arr.customFind(function (obj) {
                    return func(obj, item);
                })) {
                results.push(item);
            }
        }
        return results;
    };

    if (!Array.prototype.customFilter) {
        Array.prototype.customFilter = function (func) {
            var results = [];
            angular.forEach(this, function (obj) {
                if (func(obj)) {
                    results.push(obj);
                }
            });
            return results;
        };
    }

    if (!Array.prototype.remove) {
        Array.prototype.remove = function (index) {
            this.splice(index, 1);
        };
    }

    if (!Array.prototype.exchange) {
        Array.prototype.exchange = function (dx1, dx2) {
            var tmp   = this[dx1];
            this[dx1] = this[dx2];
            this[dx2] = tmp;
        };
    }

    if (!Array.prototype.insert) {
        Array.prototype.insert = function (index, item) {
            this.splice(index, 0, item);
        };
    }

    if (!Array.prototype.moveTo) {
        Array.prototype.moveTo = function (init, to) {
            if (to > init) {
                this.insert(to, this[init]);
                this.splice(init, 1);
            }else{
                var tmp = this[init];
                this.splice(init, 1);
                this.insert(to);
            }
        };
    }

    if(!Array.prototype.moveToFirst) {
        Array.prototype.moveToFirst = function(dx) {
            if(dx != 0) {
                var item = this[dx];
                this.remove(dx);
                this.insert(0, item);
            }
        };
    }
    if(!Array.prototype.moveToLast) {
        Array.prototype.moveToLast = function(dx) {
            if(dx != this.length - 1) {
                var item = this[dx];
                this.remove(dx);
                this.push(item);
            }
        };
    }


    if(!Array.prototype.joinMember) {
        Array.prototype.joinMember = function(member, sperator) {
            var results = [];
            angular.forEach(this, function (obj) {
                if(obj[member]) {
                    results.push(obj[member]);
                }
            });
            return results.join(sperator);
        };
    }



    /**
     *
     * @param elOrFunc 元素 或者 函数
     * @param all 是否删除全部，如果为false，删除第一个预见的
     * @returns {number}
     */
    Array.prototype.customRemove = function (elOrFunc, all) {
        if (!elOrFunc) {
            return 0;
        }
        var result = 0;
        all        = all || false;
        var isFunc = angular.isFunction(elOrFunc);
        if (all) {
            for (var i = this.length - 1; i >= 0; i--) {
                if ((isFunc && elOrFunc(this[i])) || (!isFunc && (elOrFunc === this[i]))) {
                    this.splice(i, 1);
                    result++;
                }
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                if ((isFunc && elOrFunc(this[i])) || (!isFunc && (elOrFunc === this[i]))) {
                    this.splice(i, 1);
                    result++;
                    break;
                }
            }
        }
        return result;
    };
})
();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-26-0026
 * 工厂名字：String
 * 作用：扩展String的方法
 */
(function () {
    'use strict';
    if (!String.prototype.reverse) {
        String.prototype.reverse = function () {
            var str = "";
            var end = this.length - 1;
            for (; end >= 0; end--) {
                str = str + this.charAt(end);
            }

            return str;
        }
    }


    ///** 在字符串末尾追加字符串 **/
    //String.prototype.append = function (str) {
    //  return this.concat(str);
    //};
    //
    ///** 删除指定索引位置的字符，索引无效将不删除任何字符 **/
    //String.prototype.deleteCharAt = function (index) {
    //  if (index < 0 || index >= this.length) {
    //    return this.valueOf();
    //  }
    //  else if (index == 0) {
    //    return this.substring(1, this.length);
    //  }
    //  else if (index == this.length - 1) {
    //    return this.substring(0, this.length - 1);
    //  }
    //  else {
    //    return this.substring(0, index) + this.substring(index + 1);
    //  }
    //};
    //
    ///** 删除指定索引区间的字符串 **/
    //String.prototype.deleteString = function (start, end) {
    //  if (start == end) {
    //    return this.deleteCharAt(start);
    //  }
    //  else {
    //    if (start > end) {
    //      var temp = start;
    //      start = end;
    //      end = temp;
    //    }
    //    if (start < 0) {
    //      start = 0;
    //    }
    //    if (end > this.length - 1) {
    //      end = this.length - 1;
    //    }
    //    return this.substring(0, start) + this.substring(end + 1, this.length);
    //  }
    //};
    //
    ///** 检查字符串是否以subStr结尾 **/
    //String.prototype.endWith = function (subStr) {
    //  if (subStr.length > this.length) {
    //    return false;
    //  }
    //  else {
    //    return (this.lastIndexOf(subStr) == (this.length - subStr.length)) ? true : false;
    //  }
    //};
    //
    ///** 比较两个字符串是否相等，也可以直接用 == 进行比较 **/
    //String.prototype.equal = function (str) {
    //  if (this.length != str.length) {
    //    return false;
    //  }
    //  else {
    //    for (var i = 0; i < this.length; i++) {
    //      if (this.charAt(i) != str.charAt(i)) {
    //        return false;
    //      }
    //    }
    //    return true;
    //  }
    //};
    //
    //
    ///** 比较两个字符串是否相等，不区分大小写 **/
    //String.prototype.equalIgnoreCase = function (str) {
    //  var temp1 = this.toLowerCase();
    //  var temp2 = str.toLowerCase();
    //  return temp1.equal(temp2);
    //};
    //
    ///** 将指定的字符串插入到指定的位置后面，索引无效将直接追加到字符串的末尾 **/
    //String.prototype.insert = function (ofset, subStr) {
    //  if (ofset < 0 || ofset >= this.length - 1) {
    //    return this.append(subStr);
    //  }
    //  return this.substring(0, ofset + 1) + subStr + this.substring(ofset + 1);
    //};
    //
    ///** 判断字符串是否数字串 **/
    //String.prototype.isAllNumber = function () {
    //  for (var i = 0; i < this.length; i++) {
    //    if (this.charAt(i) < '0' || this.charAt(i) > '9') {
    //      return false;
    //    }
    //  }
    //  return true;
    //};
    //
    ///** 将字符串反序排列 **/
    //String.prototype.reserve = function () {
    //  var temp = "";
    //  for (var i = this.length - 1; i >= 0; i--) {
    //    temp = temp.concat(this.charAt(i));
    //  }
    //  return temp;
    //};
    //
    ///** 将指定的位置的字符设置为另外指定的字符或字符串.索引无效将直接返回不做任何处理 **/
    //String.prototype.setCharAt = function (index, subStr) {
    //  if (index < 0 || index > this.length - 1) {
    //    return this.valueOf();
    //  }
    //  return this.substring(0, index) + subStr + this.substring(index + 1);
    //};
    //
    ///** 检查字符串是否以subStr开头 **/
    //String.prototype.startWith = function (subStr) {
    //  if (subStr.length > this.length) {
    //    return false;
    //  }
    //  return (this.indexOf(subStr) == 0) ? true : false;
    //};
    //
    ///** 计算长度，每个汉字占两个长度，英文字符每个占一个长度 **/
    //String.prototype.charLength = function () {
    //  var temp = 0;
    //  for (var i = 0; i < this.length; i++) {
    //    if (this.charCodeAt(i) > 255) {
    //      temp += 2;
    //    }
    //    else {
    //      temp += 1;
    //    }
    //  }
    //  return temp;
    //};
    //
    //String.prototype.charLengthReg = function () {
    //  return this.replace(/[^\x00-\xff]/g, "**").length;
    //};
    //
    ///** 去掉首尾空格 **/
    //String.prototype.trim = function () {
    //  return this.replace(/(^\s*)|(\s*$)/g, "");
    //};
    ///** 测试是否是数字 **/
    //String.prototype.isNumeric = function () {
    //  var tmpFloat = parseFloat(this);
    //  if (isNaN(tmpFloat))
    //    return false;
    //  var tmpLen = this.length - tmpFloat.toString().length;
    //  return tmpFloat + "0".Repeat(tmpLen) == this;
    //};
    ///** 测试是否是整数 **/
    //String.prototype.isInt = function () {
    //  if (this == "NaN")
    //    return false;
    //  return this == parseInt(this).toString();
    //};
    //
    ///** 获取N个相同的字符串 **/
    //String.prototype.Repeat = function (num) {
    //  var tmpArr = [];
    //  for (var i = 0; i < num; i++) tmpArr.push(this);
    //  return tmpArr.join("");
    //};
    //
    ///** 合并多个空白为一个空白 **/
    //String.prototype.resetBlank = function () {
    //  return this.replace(/s+/g, " ");
    //};
    //
    ///** 除去左边空白 **/
    //String.prototype.LTrim = function () {
    //  return this.replace(/^s+/g, "");
    //};
    //
    ///** 除去右边空白 **/
    //String.prototype.RTrim = function () {
    //  return this.replace(/s+$/g, "");
    //};
    //
    ///** 除去两边空白 **/
    //String.prototype.trim = function () {
    //  return this.replace(/(^s+)|(s+$)/g, "");
    //};
    //
    ///** 保留数字 **/
    //String.prototype.getNum = function () {
    //  return this.replace(/[^d]/g, "");
    //};
    //
    ///** 保留字母 **/
    //String.prototype.getEn = function () {
    //  return this.replace(/[^A-Za-z]/g, "");
    //};
    //
    ///** 保留中文 **/
    //String.prototype.getCn = function () {
    //  return this.replace(/[^u4e00-u9fa5uf900-ufa2d]/g, "");
    //};
    //
    ///** 得到字节长度 **/
    //String.prototype.getRealLength = function () {
    //  return this.replace(/[^x00-xff]/g, "--").length;
    //};
    //
    ///** 从左截取指定长度的字串 **/
    //String.prototype.left = function (n) {
    //  return this.slice(0, n);
    //};
    //
    ///** 从右截取指定长度的字串 **/
    //String.prototype.right = function (n) {
    //  return this.slice(this.length - n);
    //};

})();

/**
 * MD5 码生成器
 */

(function () {
    'use strict';

    angular.module('home').constant('Config', {
        Nations: [
            {id: 0, name: '汉族'},
            {id: 1, name: '苗族'},
            {id: 2, name: '蒙古族'},
            {id: 3, name: '回族'},
            {id: 4, name: '壮族'},
            {id: 5, name: '维吾尔族'},
            {id: 6, name: '藏族'},
            {id: 7, name: '彝族'},
            {id: 8, name: '布依族'},
            {id: 9, name: '朝鲜族'},
            {id: 10, name: '满族'},
            {id: 11, name: '侗族'},
            {id: 12, name: '瑶族'},
            {id: 13, name: '白族'},
            {id: 14, name: '土家族'},
            {id: 15, name: '哈尼族'},
            {id: 16, name: '哈萨克族'},
            {id: 17, name: '傣族'},
            {id: 18, name: '黎族'},
            {id: 19, name: '僳僳族'},
            {id: 20, name: '佤族'},
            {id: 21, name: '畲族'},
            {id: 22, name: '拉祜族'},
            {id: 23, name: '水族'},
            {id: 24, name: '东乡族'},
            {id: 25, name: '纳西族'},
            {id: 26, name: '景颇族'},
            {id: 27, name: '柯尔克孜族'},
            {id: 28, name: '土族'},
            {id: 29, name: '达斡尔族'},
            {id: 30, name: '仫佬族'},
            {id: 31, name: '仡佬族'},
            {id: 32, name: '羌族'},
            {id: 33, name: '锡伯族'},
            {id: 34, name: '布朗族'},
            {id: 35, name: '撒拉族'},
            {id: 36, name: '毛南族'},
            {id: 37, name: '阿昌族'},
            {id: 38, name: '普米族'},
            {id: 39, name: '塔吉克族'},
            {id: 40, name: '怒族'},
            {id: 41, name: '乌孜别克族'},
            {id: 42, name: '俄罗斯族'},
            {id: 43, name: '鄂温克族'},
            {id: 44, name: '德昂族'},
            {id: 45, name: '保安族'},
            {id: 46, name: '裕固族'},
            {id: 47, name: '京族'},
            {id: 48, name: '基诺族'},
            {id: 49, name: '高山族'},
            {id: 50, name: '塔塔尔族'},
            {id: 51, name: '独龙族'},
            {id: 52, name: '鄂伦春族'},
            {id: 53, name: '赫哲族'},
            {id: 54, name: '门巴族'},
            {id: 55, name: '珞巴族'}
        ],
        Politicals: [
            {id: 0, name: '群众'},
            {id: 1, name: '团员'},
            {id: 2, name: '党员'},
            {id: 3, name: '预备党员'},
            {id: 4, name: '民主党派'},
            {id: 5, name: '罪犯'}
        ],
        Sexes: [
            {id: 0, name: '男'},
            {id: 1, name: '女'}
        ],
        Statuses: [
            {id: 0, name: '在职'},
            {id: 1, name: '离职'},
            {id: 2, name: '待岗'},
            {id: 3, name: '停职'},
            {id: 4, name: '退休'}
        ],
        Events: {
            UserInitEvent: "userInit",
            MenuInit: 'menuInit',
            ModelInit: 'ModelInit'
        },
        DepartmentTypes: [
            {id: '0', name: '未选择', infoUrl: 'components/template/department.no.info.tmp.html'},
            {
                id: '1',
                name: '学校',
                infoUrl: 'components/template/school.info.tmp.html',
                addUrl: 'components/template/school.add.tmp.html',
                editUrl: 'components/template/school.edit.tmp.html'
            },
            {
                id: '2',
                name: '院系',
                infoUrl: 'components/template/institute.info.tmp.html',
                addUrl: 'components/template/institute.add.tmp.html',
                editUrl: 'components/template/institute.edit.tmp.html'
            },
            {
                id: '3',
                name: '专业',
                infoUrl: 'components/template/professional.info.tmp.html',
                addUrl: 'components/template/professional.add.tmp.html',
                editUrl: 'components/template/professional.edit.tmp.html'
            },
            {
                id: '4',
                name: '班级',
                infoUrl: 'components/template/classes.info.tmp.html',
                addUrl: 'components/template/classes.add.tmp.html',
                editUrl: 'components/template/classes.edit.tmp.html'
            }
        ],
        toolbars: [
            ['h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'p',
                'pre',
                'quote',
                'bold',
                'italics',
                'underline',
                'strikeThrough',
                'ul',
                'ol',
                'undo',
                'redo',
                'clear',
                'justifyLeft',
                'justifyCenter',
                'justifyRight',
                'indent',
                'outdent',
                'html',
                'insertImage',
                'insertLink',
                'insertVideo']
        ],
        dateOptions: [
            {
                // Strings and translations
                monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                weekdaysFull: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                weekdaysShort: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                showMonthsShort: undefined,
                showWeekdaysFull: undefined,

                // Buttons
                today: '今天',
                clear: '清除',
                close: '关闭',

                // Accessibility labels
                labelMonthNext: '下个月',
                labelMonthPrev: '上个月',
                labelMonthSelect: '选择月份',
                labelYearSelect: '选择年份',

                // Formats
                format: 'yyyy年mm月dd日',
                formatSubmit: undefined,
                hiddenPrefix: undefined,
                hiddenSuffix: '_submit',
                hiddenName: undefined,

                // Editable input
                editable: undefined,

                // Dropdown selectors
                selectYears: undefined,
                selectMonths: undefined,

                // First day of the week
                firstDay: undefined,

                // Date limits
                min: undefined,
                max: undefined,

                // Disable dates
                disable: undefined,

                // Root picker container
                container: undefined,

                // Hidden input container
                containerHidden: undefined,

                // Close on a user action
                closeOnSelect: true,
                closeOnClear: true,

                // Events
                onStart: undefined,
                onRender: undefined,
                onOpen: undefined,
                onClose: undefined,
                onSet: undefined,
                onStop: undefined
            }
        ],
        RestOptions: {
            'get': {name: '获取', dlg: '正在加载数据,请稍候...'},
            'getList': {name: '获取', dlg: '正在加载数据,请稍候...'},
            'post': {name: '增加', dlg: '正在提交数据,请稍候...'},
            'put': {name: '更新', dlg: '正在更新数据,请稍候...'},
            'delete': {name: '删除', dlg: '正在删除数据,请稍候...'},
            'remove': {name: '删除', dlg: '正在删除数据,请稍候...'},
            'head': {name: '头部', dlg: '正在加载数据,请稍候...'},
            'options': {name: '选项', dlg: '正在加载数据,请稍候...'},
            'patch': {name: 'patch', dlg: '正在加载数据,请稍候...'},
            'trace': {name: '打印', dlg: '正在加载数据,请稍候...'}
        },
        NewsTypes: [
            {id: 1, name: '工程'},
            {id: 2, name: '企业文化'},
            {id: 3, name: '行业新闻'},
            {id: 4, name: '外部'},
            {id: 5, name: '综合新闻'}
        ],
        NoticeTypes: [
            {id: 1, name: '事务公告'},
            {id: 2, name: '招募公告'},
            {id: 3, name: '变更公告'},
            {id: 4, name: '启事公告'},
            {id: 5, name: '其他公告'}
        ],
        Urls: {
            fileUrl: 'http://192.168.0.240:9050/file/direct/origin/',
//            RestUrl: 'http://192.168.0.127:8080/'
            RestUrl: undefined
        },
        Names: {
            repository: 'repository',      //仓库
            deployments: 'deployments',    //部署
            resources: 'resources',        //资源
            resourcedata: 'resourcedata',  //资源内容
            processDef: 'process-definitions',
            model: 'model',
            identitylinks: 'identitylinks',
            models: 'models',
            source: 'source',
            sourceExtra: 'source-extra',

            runtime: 'runtime',
            processInstances: 'process-instances',
            diagram: 'diagram',
            users: 'users',
            variables: 'variables',
            executions: 'executions',
            activities: 'activities',
            scope: 'scope',
            tasks: 'tasks',
            cascadeHistory: 'cascadeHistory',
            deleteReason: 'deleteReason',
            comments: 'comments',
            events: 'events',
            attachments: 'attachments',
            content: 'content',
            signals: 'signals',

            history: 'history',
            historicProcessInstances: 'historic-process-instances',
            data: 'data',
            historicDetail: 'historic-detail',

            form: 'form',
            formData: 'form-data',

            management: 'management',
            tables: 'tables',
            properties: 'properties',
            engine: 'engine',
            jobs: 'jobs',
            exceptionStacktrace: 'exception-stacktrace',

            identity: 'identity',
            picture: 'picture',
            info: 'info',
            groups: 'groups',
            members: 'members'
        },
        CookieNames: {
            userId: 'userClientId',
            token: 'auth_tokenClient'
        },
        TitleTypes:[
            {id:0, name:'单选题'},
            {id:1, name:'多选题'},
            {id:2, name:'简答题'},
            {id:3, name:'计算题'},
            {id:4, name:'论述题'},
            {id:5, name:'编程题'},
            {id:6, name:'综合体'}
        ]

    });
})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-26-0026
 * 工厂名字：Theme
 * 作用：主题定义
 */
(function () {
    'use strict';

    angular.module('home').constant('Theme', {
      palettes:{
        white:{
          '50': '22fe22',
          '100': '36fe55',
          '200': '52fd14',
          '300': '65fd45',
          '400': '62ff15',
          '500': 'ffffff',
          '600': 'abfda1',
          '700': 'acfed5',
          '800': 'cdffe5',
          '900': 'cefed8',
          'A100': 'adfde5',
          'A200': 'cffca8',
          'A400': 'caff85',
          'A700': 'acffef'
        },
        altgreen:{
          '50': '#e0f2f1',
          '100': '#b2dfdb',
          '200': '#80cbc4',
          '300': '#4db6ac',
          '400': '#26a69a',
          '500': '#30b77a',
          '600': '#00897b',
          '700': '#00796b',
          '800': '#00695c',
          '900': '#004d40',
          'A100': '#a7ffeb',
          'A200': '#64ffda',
          'A400': '#1de9b6',
          'A700': '#00bfa5',
          'contrastDefaultColor': 'dark',
          'contrastLightColors': '500 600 700 800 900',
          'contrastStrongLightColors': '500 600 700'
        },
        gray: {
          '0': '#ffffff',
          '50': '#fafafa',
          '100': '#f5f5f5',
          '200': '#9e9e9e',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#eeeeee',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
          '1000': '#000000',
          'A100': '#ffffff',
          'A200': '#eeeeee',
          'A400': '#bdbdbd',
          'A700': '#616161',
          'contrastDefaultColor': 'dark',
          'contrastLightColors': '600 700 800 900'
        }
      },
      themes:[
        {name:'altTheme',primaryPalette:'white'},
        {name:'default',primaryPalette:'altgreen'},
        {name:'userTheme',primaryPalette:'gray'}
      ]
    });
})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-26-0026
 * 工厂名字：Router
 * 作用：路由配置
 */
(function () {
    'use strict';

    angular.module('home').constant('Router', {
        main    : {
            name        : 'main',
            url         : '/main',
            templateUrl : 'app/main/main.html',
            controller  : 'MainCtrl',
            controllerAs: 'vm',
            children    : [
                {
                    name        : 'change',
                    url         : '/change',
                    templateUrl : 'app/change/change.html',
                    controller  : 'ChangeCtrl',
                    controllerAs: 'vm'
                },
                {
                    name        : 'main',
                    url         : '/main',
                    templateUrl : 'app/desktop/desktop.html',
                    controller  : 'DesktopCtrl',
                    controllerAs: 'vm'
                },
                {
                    name        : 'user',
                    url         : '/user',
                    templateUrl : 'app/user/User.html',
                    controller  : 'UserCtrl',
                    controllerAs: 'vm',
                    children    : [
                        {
                            name        : 'list',
                            templateUrl : 'app/user/list/UserList.html',
                            controller  : 'UserListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'info',
                            url         : '/info/:id',
                            templateUrl : 'app/user/info/UserInfo.html',
                            controller  : 'UserInfoCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'change',
                            url         : '/change/:id',
                            templateUrl : 'app/user/change/UserChange.html',
                            controller  : 'UserChangeCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'add',
                            url         : '/add?depId&type',
                            templateUrl : 'app/user/add/UserAdd.html',
                            controller  : 'UserAddCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name        : 'dep',
                    url         : '/dep',
                    templateUrl : 'app/dep/Department.html',
                    controller  : 'DepartmentCtrl',
                    controllerAs: 'vm',
                    children    : [
                        {
                            name        : 'list',
                            url         : '/list',
                            templateUrl : 'app/dep/list/DepartmentList.html',
                            controller  : 'DepartmentListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'change',
                            url         : '/change/:id',
                            templateUrl : 'app/dep/change/DepartmentChange.html',
                            controller  : 'DepartmentChangeCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'add',
                            url         : '/add?typeId&depId',
                            templateUrl : 'app/dep/add/DepartmentAdd.html',
                            controller  : 'DepartmentAddCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name        : 'course',
                    url         : '/course',
                    templateUrl : 'app/course/Course.html',
                    controller  : 'CourseCtrl',
                    controllerAs: 'vm',
                    children    : [
                        {
                            name        : 'list',
                            url         : '/list',
                            templateUrl : 'app/course/list/CourseList.html',
                            controller  : 'CourseListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'students',
                            url         : '/students?id',
                            templateUrl : 'app/course/student/StudentList.html',
                            controller  : 'StudentListCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name        : 'title',
                    url         : '/title',
                    templateUrl : 'app/title/Title.html',
                    controller  : 'TitleCtrl',
                    controllerAs: 'vm',
                    children    : [
                        {
                            name        : 'list',
                            url         : '/list',
                            templateUrl : 'app/title/list/TitleList.html',
                            controller  : 'TitleListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'info',
                            url         : '/info?id',
                            templateUrl : 'app/title/info/TitleInfo.html',
                            controller  : 'TitleInfoCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'add',
                            url         : '/add',
                            templateUrl : 'app/title/add/TitleAdd.html',
                            controller  : 'TitleAddCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name        : 'exam',
                    url         : '/exam',
                    templateUrl : 'app/exam/exam.html',
                    controller  : 'ExamCtrl',
                    controllerAs: 'vm',
                    children    : [
                        {
                            name        : 'list',
                            url         : '/list',
                            templateUrl : 'app/exam/list/examList.html',
                            controller  : 'ExamListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'info',
                            url         : '/info?id',
                            templateUrl : 'app/exam/info/examInfo.html',
                            controller  : 'ExamInfoCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'add',
                            url         : '/add',
                            templateUrl : 'app/exam/add/examAdd.html',
                            controller  : 'ExamAddCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name        : 'work',
                    url         : '/work',
                    templateUrl : 'app/work/work.html',
                    controller  : 'WorkCtrl',
                    controllerAs: 'vm',
                    children    : [
                        {
                            name        : 'list',
                            url         : '/list',
                            templateUrl : 'app/work/list/workList.html',
                            controller  : 'WorkListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'submits',
                            url         : '/submits',
                            templateUrl : 'app/work/submits/submits.html',
                            controller  : 'SubmitsCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'corrects',
                            url         : '/corrects',
                            templateUrl : 'app/work/corrects/corrects.html',
                            controller  : 'CorrectsCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'histories',
                            url         : '/histories',
                            templateUrl : 'app/work/histories/histories.html',
                            controller  : 'HistoriesCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'info',
                            url         : '/info?id',
                            templateUrl : 'app/work/info/workInfo.html',
                            controller  : 'WorkInfoCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'submit',
                            url         : '/submit?id',
                            templateUrl : 'app/work/submit/submit.html',
                            controller  : 'SubmitCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'correct',
                            url         : '/correct?id',
                            templateUrl : 'app/work/correct/correct.html',
                            controller  : 'CorrectCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name        : 'history',
                            url         : '/history?id',
                            templateUrl : 'app/work/history/history.html',
                            controller  : 'HistoryCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                }
            ]
        },
        login   : {
            name        : 'login',
            url         : '/',
            templateUrl : 'app/login/login.html',
            controller  : 'LoginCtrl',
            controllerAs: 'vm'
        },
        register: {
            name        : 'register',
            url         : '/register?type',
            templateUrl : 'app/register/Register.html',
            controller  : 'RegisterController',
            controllerAs: 'vm'
        }
    });
})();

// Generated by CoffeeScript 1.9.1
(function() {
  var JSOG, JSOG_OBJECT_ID, hasCustomJsonificaiton, isArray, nextId;

  JSOG = {};

  nextId = 0;

  isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  hasCustomJsonificaiton = function(obj) {
    return obj.toJSON != null;
  };

  JSOG_OBJECT_ID = '__jsogObjectId';

  JSOG.encode = function(original) {
    var doEncode, idOf, sofar;
    sofar = {};
    idOf = function(obj) {
      if (!obj[JSOG_OBJECT_ID]) {
        obj[JSOG_OBJECT_ID] = "" + (nextId++);
      }
      return obj[JSOG_OBJECT_ID];
    };
    doEncode = function(original) {
      var encodeArray, encodeObject;
      encodeObject = function(original) {
        var id, key, result, value;
        id = idOf(original);
        if (sofar[id]) {
          return {
            '@ref': id
          };
        }
        result = sofar[id] = {
          '@id': id
        };
        for (key in original) {
          value = original[key];
          if (key !== JSOG_OBJECT_ID) {
            result[key] = doEncode(value);
          }
        }
        return result;
      };
      encodeArray = function(original) {
        var val;
        return (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = original.length; i < len; i++) {
            val = original[i];
            results.push(doEncode(val));
          }
          return results;
        })();
      };
      if (original == null) {
        return original;
      } else if (hasCustomJsonificaiton(original)) {
        return original;
      } else if (isArray(original)) {
        return encodeArray(original);
      } else if (typeof original === 'object') {
        return encodeObject(original);
      } else {
        return original;
      }
    };
    return doEncode(original);
  };

  JSOG.decode = function(encoded) {
    var doDecode, found;
    found = {};
    doDecode = function(encoded) {
      var decodeArray, decodeObject;
      decodeObject = function(encoded) {
        var id, key, ref, result, value;
        ref = encoded['@ref'];
        if (ref != null) {
          ref = ref.toString();
        }
        if (ref != null) {
          return found[ref];
        }
        result = {};
        id = encoded['@id'];
        if (id != null) {
          id = id.toString();
        }
        if (id) {
          found[id] = result;
        }
        for (key in encoded) {
          value = encoded[key];
          if (key !== '@id') {
            result[key] = doDecode(value);
          }
        }
        return result;
      };
      decodeArray = function(encoded) {
        var value;
        return (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = encoded.length; i < len; i++) {
            value = encoded[i];
            results.push(doDecode(value));
          }
          return results;
        })();
      };
      if (encoded == null) {
        return encoded;
      } else if (isArray(encoded)) {
        return decodeArray(encoded);
      } else if (typeof encoded === 'object') {
        return decodeObject(encoded);
      } else {
        return encoded;
      }
    };
    return doDecode(encoded);
  };

  JSOG.stringify = function(obj) {
    return JSON.stringify(JSOG.encode(obj));
  };

  JSOG.parse = function(str) {
    return JSOG.decode(JSON.parse(str));
  };

  if ((typeof module !== "undefined" && module !== null) && module.exports) {
    module.exports = JSOG;
  }

  if (typeof window !== "undefined" && window !== null) {
    window.JSOG = JSOG;
  }

  if (typeof define === 'function' && define.amd) {
    define('JSOG', [], function() {
      return JSOG;
    });
  }

  return JSOG;

}).call(this);

//JSON.stringify = JSOG.stringify;

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('WorkCtrl', WorkCtrl);

    WorkCtrl.$inject = ['$scope', '$log', 'Config'];

    function WorkCtrl($scope, $log, Config) {
        //接口定义
        var vm = this;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('WorkCtrl');
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
	'use strict';

	angular.module('home').controller('UserCtrl', UserCtrl);

	UserCtrl.$inject = ['$scope', '$log', 'Config'];

	function UserCtrl($scope, $log, Config) {
		//接口定义
		var vm = this;


		activate();
		////////////////////////////////////////////////
		////////////下面为私有函数定义////////////////////
		////////////////////////////////////////////////

		/**
		 * 启动逻辑逻辑
		 */
		function activate() {
			$log.info('加载UserCtrl');
		}
	}

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('TitleCtrl', TitleCtrl);

    TitleCtrl.$inject = ['$scope', '$log', 'Config'];

    function TitleCtrl($scope, $log, Config) {
        //接口定义
        var vm = this;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载TitleCtrl');
        }
    }

})();

/**
 * 创建人：田黄雪薇
 * 创建时间：2015-3-30-0030
 * 工厂名字：RegisterControllerCtrl
 * 作用：注册控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$log', '$state', '$timeout','$stateParams','Restangular','DialogFactory','md5Factory'];

    function RegisterController($log, $state, $timeout,$stateParams,Restangular,DialogFactory,md5Factory) {
        //接口定义
        var vm = this;
        vm.user = {
            type:$stateParams.type === '0' ? 0 : 1
        };
        vm.submit = submit;
        vm.ssn = vm.user.type == 0 ? '学号' : '教师编号';

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载RegisterControllerCtrl');
        }

        function submit(ev) {
            if(vm.newForm.$invalid) {
                return ;
            }
            if(vm.user.password !== vm.password) {
                DialogFactory.fail("两次输入的密码不符", ev);
                return;
            }

            vm.user.password = md5Factory(vm.password);

            Restangular.all('user').post(vm.user)
                .then(function (data) {
                    DialogFactory.success('用户创建成功, 跳转到登陆页面!',ev)
                        .finally(function () {
                            $state.go('login');
                        });
                })
                .catch(function (response) {
                    DialogFactory.fail('用户创建失败\n,'  + response.rm , ev);
                });
        }
    }

})();
/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：MainCtrl
 * 作用：主页控制器
 */
(function () {
  'use strict';

  angular.module('home').controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$log', 'Config', '$timeout', 'MenuFactory', '$rootScope', '$location', '$mdSidenav','$state','Restangular'];

  function MainCtrl($log, Config, $timeout, MenuFactory, $rootScope, $location, $mdSidenav,$state,Restangular) {
    //接口定义
    var vm = this;
    vm.sections = MenuFactory.getSections();
    vm.openMenu = openMenu;
    vm.closeMenu = closeMenu;
    vm.path = path;
    vm.goHome = goHome;
    vm.openPage = openPage;
    vm.isSectionSelected = isSectionSelected;
    vm.focusMainContent = focusMainContent;

    vm.isOpen = isOpen;
    vm.isSelected = isSelected;
    vm.toggleOpen = toggleOpen;
    vm.autoFocusContent = false;
    vm.goSelect = goSelect;
    vm.quit = quit;
    vm.change = change;

    var mainContentArea = document.querySelector("[role='main']");

    activate();
    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////


    function quit() {
      $state.go('login');
    }

    function change() {
      $state.go('main.change');

    }

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载MainCtrl开始...');
      MenuFactory.registerCallback(Config.Events.MenuInit, function () {
        $timeout(function () {
          vm.sections = MenuFactory.sections;
        });
      });
      $log.info('加载MainCtrl结束');
    }

    function openMenu() {
      $timeout(function () {
        $mdSidenav('left').open();
      });
    }

    function closeMenu() {
      $timeout(function () {
        try {
          $mdSidenav('left').close();
        } catch (e) {
          $log.info(e);
        }
      });
    }

    function goHome($event) {
      return $state.go('login');
    }

    function openPage() {
      //vm.closeMenu();
      //
      //if (self.autoFocusContent) {
      //  focusMainContent();
      //  self.autoFocusContent = false;
      //}
    }

    function path() {
      return $location.path();
    }

    function focusMainContent($event) {
      //if ($event) {
      //  $event.preventDefault();
      //}
      //
      //$timeout(function () {
      //  mainContentArea.focus();
      //}, 90);
    }

    function isSelected(page) {
      return MenuFactory.isPageSelected(page);
    }

    function goSelect(section,event) {
      $log.info('goSelect');
      $state.go(section.url);
      event.stopPropagation();
    }

    function isSectionSelected(section) {
      var selected = false;
      var openedSection = MenuFactory.openedSection;
      if (openedSection === section) {
        selected = true;
      } else if (section.children) {
        section.children.forEach(function (childSection) {
          if (childSection === openedSection) {
            selected = true;
          }
        });
      }

      return selected;
    }

    function isOpen(section) {
      return MenuFactory.isSectionSelected(section);
    }

    function toggleOpen(section) {
      MenuFactory.toggleSelectSection(section);
    }
  }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：LoginCtrl
 * 作用：
 */
(function () {
  'use strict';

  angular.module('home').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$log', '$state', 'AuthFactory','Restangular'];

  function LoginCtrl($log, $state, AuthFactory,Restangular) {
    //接口定义
    var vm = this;
    vm.user = {};
    vm.login = login;
    vm.stuRegister = stuRegister;
    vm.teacherRegister = teacherRegister;

    activate();
    ////////////////////////////////////////////////
    ////////////下面为私有函数定义////////////////////
    ////////////////////////////////////////////////

    /**
     * 启动逻辑逻辑
     */
    function activate() {
      $log.info('加载LoginCtrl开始...');
      $log.info('加载LoginCtrl结束');
    }

    /**
     * 私有函数，登陆处理
     * @param ev 事件
     */
    function login(ev) {
      if (vm.loginForm.$invalid) {
        return;
      }
      AuthFactory.login(vm.user.userName, vm.user.password, ev)
        .then(function () {
          $state.go('main.main');
        });
    }
    function stuRegister(ev) {
      $state.go('register', {type: 0});
    }

    function teacherRegister(ev) {
      $state.go('register', {type: 1});
    }
  }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('ExamCtrl', ExamCtrl);

    ExamCtrl.$inject = ['$scope', '$log', 'Config'];

    function ExamCtrl($scope, $log, Config) {
        //接口定义
        var vm = this;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('ExamCtrl');
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('DesktopCtrl', DesktopCtrl);

    DesktopCtrl.$inject = ['$rootScope', '$log', 'Config', 'Restangular'];

    function DesktopCtrl($rootScope, $log, Config,Restangular) {
        //接口定义
        var vm = this;
        vm.user = Restangular.one('user', $rootScope.getSelfId()).get().$object;
        vm.arranges = Restangular.all('userarrange').getList({user:$rootScope.getSelfId()}).$object;
        vm.submit = submit;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载DesktopCtrl');
        }

        function submit() {
            var model = vm.user.plain();
            vm.user.save()
                .then(function (){
                    alert('保存成功');
                })
                .catch(function() {
                    alert('保存失败');
                })
        }

    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：DepartmentCtrl
 * 作用：部门全局控制器
 */
(function () {
	'use strict';

	angular.module('home').controller('DepartmentCtrl', DepartmentCtrl);

	DepartmentCtrl.$inject = ['$scope', '$log', 'Config'];

	function DepartmentCtrl($scope, $log, Config) {
		//接口定义
		var vm = this;


		activate();
		////////////////////////////////////////////////
		////////////下面为私有函数定义////////////////////
		////////////////////////////////////////////////

		/**
		 * 启动逻辑逻辑
		 */
		function activate() {
			$log.info('加载DepartmentCtrl');
		}
	}

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('CourseCtrl', CourseCtrl);

    CourseCtrl.$inject = ['$scope', '$log', 'Config'];

    function CourseCtrl($scope, $log, Config) {
        //接口定义
        var vm = this;

        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            $log.info('加载CourseCtrl');
        }
    }

})();

/**
 * 创建人：pengchao
 * 创建时间：2015-3-23-0023
 * 工厂名字：UserCtrl
 * 作用：部门全局控制器
 */
(function () {
    'use strict';

    angular.module('home').controller('ChangeCtrl', ChangeCtrl);

    ChangeCtrl.$inject = ['$rootScope', '$log', '$state', 'Restangular','$timeout'];

    function ChangeCtrl($rootScope, $log, $state, Restangular,$timeout) {
        //接口定义
        var vm    = this;
        vm.user   = {};
        vm.submit = submit;
        activate();
        ////////////////////////////////////////////////
        ////////////下面为私有函数定义////////////////////
        ////////////////////////////////////////////////

        /**
         * 启动逻辑逻辑
         */
        function activate() {
            Restangular.one('user', $rootScope.getSelfId()).get()
                .then(function (data) {
                    $timeout(function () {
                        vm.user = data.plain();
                    })
                });
            $log.info('加载ChangeCtrl');
        }

        function submit() {
            var model = {};
            angular.forEach(vm.user, function (value, key) {
                if(!angular.isArray(value)) {
                    model[key] = value;
                }
            });
            Restangular.one('user', model.id).customPUT(model)
                .then(function () {
                    $rootScope.initSelf();
                    $state.go('main.main');
                })
                .catch(function () {
                    alert('保存失败');
                })
        }

    }

})();

angular.module("home").run(["$templateCache", function($templateCache) {$templateCache.put("app/course/Course.html","<div ui-view=\"\" class=\"content-padding\"></div>");
$templateCache.put("app/change/change.html","<form name=\"vm.addForm\"><md-content class=\"md-padding\"><md-toolbar layout=\"row\"><div flex=\"\" style=\"width: 50px;\">修改个人资料</div><md-button class=\"button-ctrl\" ng-click=\"vm.submit($event)\" ng-if=\"vm.addForm.$valid\">保存</md-button><md-button class=\"button-ctrl\" ng-click=\"back(\'main.desktop\')\">取消</md-button></md-toolbar><md-list flex=\"\" class=\"change-userinfo\"><md-item><md-input-container><label align=\"left\">姓名</label> <input ng-model=\"vm.user.name\"></md-input-container><md-select ng-model=\"vm.user.sex\" placeholder=\"性别\" style=\"margin: 0;display: block;height: 46px;\"><md-option data-ng-value=\"sex.id\" ng-repeat=\"sex in Config.Sexes\">{{sex.name}}</md-option></md-select><md-input-container><label align=\"left\">现居地址</label> <input ng-model=\"vm.user.address\" placeholder=\"请填写现居地址\"></md-input-container></md-item></md-list></md-content></form>");
$templateCache.put("app/login/login.html","<div style=\"position:absolute;top:50%;left:50%;\"><div layout=\"row\" style=\"width:500px;height:230px;position: relative; margin:-115px auto auto -250px;\"><div flex=\"\" hide-sm=\"\" flex-order=\"1\" align=\"right\" layout-padding=\"\"><img src=\"../assets/images/img/login_01.png\" layout-padding=\"\"><div class=\"login-font\">作业管理系统</div><p class=\"login-font-p\">2015年田黄雪薇版权所有</p></div><div flex=\"\" flex-order=\"2\" align=\"center\"><form name=\"vm.loginForm\" layout=\"column\" layout-align=\"center center\"><md-input-container flex=\"\"><label align=\"left\">账号</label> <input required=\"\" ng-model=\"vm.user.userName\" placeholder=\"请输入用户名\"><div ng-messages=\"vm.loginForm.user.userName.$error\"><div ng-message=\"required\">账号不能为空</div></div></md-input-container><md-input-container flex=\"\"><label align=\"left\">密码</label> <input required=\"\" ng-model=\"vm.user.password\" type=\"password\" placeholder=\"请输入密码\"><div ng-messages=\"vm.loginForm.user.password.$error\"><div ng-message=\"required\">密码不能为空</div></div></md-input-container><md-button class=\"md-raised md-primary\" style=\"width: 175px;box-shadow: none;color:#fff\" ng-click=\"vm.login($event)\" flex=\"\">登陆</md-button></form><md-button ng-click=\"vm.stuRegister($event)\" style=\"margin-top: 20px;color: green;padding: 10px\">学生注册</md-button><md-button ng-click=\"vm.teacherRegister($event)\" style=\"margin-top: 20px;color: green;padding: 10px\">老师注册</md-button></div></div></div>");
$templateCache.put("app/dep/Department.html","<div ui-view=\"\" class=\"content-padding\"></div>");
$templateCache.put("app/main/main.html","<section layout=\"row\" flex=\"\" class=\"body\"><md-sidenav class=\"site-sidenav md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\"><md-toolbar><h1 class=\"md-toolbar-tools\"><a ng-href=\"/\" layout=\"row\" flex=\"\" style=\"color:#fff\"><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewbox=\"0 0 100 100\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\" style=\"width: 40px; height: 40px;\"><path d=\"M 50 0 L 100 14 L 92 80 L 50 100 L 8 80 L 0 14 Z\" fill=\"#b2b2b2\"></path><path d=\"M 50 5 L 6 18 L 13.5 77 L 50 94 Z\" fill=\"#E42939\"></path><path d=\"M 50 5 L 94 18 L 86.5 77 L 50 94 Z\" fill=\"#B72833\"></path><path d=\"M 50 7 L 83 75 L 72 75 L 65 59 L 50 59 L 50 50 L 61 50 L 50 26 Z\" fill=\"#b2b2b2\"></path><path d=\"M 50 7 L 17 75 L 28 75 L 35 59 L 50 59 L 50 50 L 39 50 L 50 26 Z\" fill=\"#fff\"></path></svg><div class=\"docs-logotype\">作业管理系统</div></a></h1></md-toolbar><md-content flex=\"\" role=\"navigation\"><ul class=\"docs-menu\"><div layout=\"column\" layout-align=\"center center\" style=\"background-color: #f0f0f0\"><p>{{self.name}}</p><div layout=\"row\" layout-align=\"center center\"><md-button ng-click=\"vm.quit()\">退出系统</md-button><md-button ng-click=\"vm.change()\">修改个人资料</md-button></div></div><li ng-repeat=\"section in vm.sections\" class=\"parent-list-item\" ng-class=\"{\'parentActive\' : vm.isSectionSelected(section)}\"><h2 class=\"menu-heading\" ng-if=\"section.type === \'heading\'\" id=\"heading_{{ section.name | nospace}}\">{{section.name}}</h2><menu-link section=\"section\" ng-if=\"section.type === \'link\'\"></menu-link><menu-toggle section=\"section\" ng-if=\"section.type === \'toggle\'\"></menu-toggle><ul ng-if=\"section.children\" class=\"menu-nested-list\"><li ng-repeat=\"child in section.children\" ng-class=\"{\'childActive\' : isSectionSelected(child)}\"><menu-toggle section=\"child\"></menu-toggle></li></ul></li></ul></md-content></md-sidenav><div layout=\"column\" tabindex=\"-1\" role=\"main\" flex=\"\"><md-toolbar><div class=\"md-toolbar-tools\" ng-click=\"vm.openMenu()\"><button class=\"docs-menu-icon\" hide-gt-sm=\"\" aria-label=\"Toggle Menu\"><md-icon md-svg-src=\"../assets/images/svg/ic_menu_24px.svg\"></md-icon></button><div layout=\"row\" flex=\"\" class=\"fill-height\"><div class=\"md-toolbar-item md-breadcrumb\" style=\"color: #fff\"><span ng-if=\"vm.menu.currentPage.name !== vm.menu.currentSection.name\"><span hide-sm=\"\" hide-md=\"\">{{vm.menu.currentSection.name}}</span> <span class=\"docs-menu-separator-icon\" style=\"\" hide-sm=\"\" hide-md=\"\"><img src=\"../assets/images/icons/docArrow.png\" alt=\"\" aria-hidden=\"true\">]</span></span> <span class=\"md-breadcrumb-page\">{{(vm.menu.currentPage) || \'OA\' }}</span></div><span flex=\"\"></span><div class=\"md-toolbar-item md-tools docs-tools\" layout=\"column\" layout-gt-md=\"row\"><div><img src=\"../assets/images/img/face.jpg\" class=\"face\" alt=\"这个是我自己\"></div></div></div></div></md-toolbar><md-content ui-view=\"\" md-scroll-y=\"\" flex=\"\" style=\"background: #eee;height: 100%\"></md-content></div></section>");
$templateCache.put("app/register/Register.html","<md-content class=\"md-padding\" layout=\"column\" layout-align=\"center center\"><form name=\"vm.newForm\" layout=\"column\" layout-align=\"center center\"><md-input-container><label>账户</label> <input required=\"\" ng-model=\"vm.user.id\" placeholder=\"请输入账号\"></md-input-container><md-input-container><label>名字</label> <input required=\"\" ng-model=\"vm.user.name\" placeholder=\"请输入名字\"></md-input-container><md-input-container><label>{{vm.ssn}}</label> <input required=\"\" ng-model=\"vm.user.sn\" placeholder=\"请输入编号\"></md-input-container><md-input-container><label>密码</label> <input required=\"\" type=\"password\" ng-model=\"vm.user.password\" placeholder=\"请输入密码\"></md-input-container><md-input-container><label>确认密码</label> <input required=\"\" type=\"password\" ng-model=\"vm.password\" placeholder=\"请输入确认密码\"></md-input-container><md-button class=\"md-primary\" style=\"margin-top: 50px;min-width: 200px\" ng-click=\"vm.submit($event)\">提交</md-button></form></md-content>");
$templateCache.put("app/user/User.html","<div ui-view=\"\" class=\"content-padding\"></div>");
$templateCache.put("app/desktop/desktop.html","<div class=\"md-padding\"><md-content layout=\"column\" style=\"margin-top: 20px\" ng-if=\"vm.user.type === 1\"><md-toolbar><div class=\"md-toolbar-tools\" flex=\"\">试卷</div></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.user.examinations | limitTo:5\"><a ng-href=\"/#/main/exam/info?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"column\" flex=\"\"><span><h2>{{title.name}}</h2></span> <label>{{title.description}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.user.titles || vm.user.examinations.length === 0\"><md-button ng-href=\"/#/main/exam/add\">没有出过试卷，点此添加</md-button></div></div></md-content><md-content layout=\"column\" style=\"margin-top: 20px\" ng-if=\"vm.user.type === 1\"><md-toolbar><div class=\"md-toolbar-tools\" flex=\"\">课程</div></md-toolbar><div><div layout=\"column\" ng-repeat=\"course in vm.user.courses | limitTo:5\"><a ng-href=\"/#/main/course/students?id={{course.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"column\" flex=\"\"><h2>{{course.name}}</h2><label>{{course.type}}</label></div><span>学生数: {{course.students.length}}</span></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.user.courses || vm.user.courses.length === 0\"><md-button ng-click=\"vm.addCourse($event)\">没有课程，点此添加</md-button></div></div></md-content><md-content layout=\"column\" style=\"margin-top: 20px\" ng-if=\"vm.user.type === 1\"><md-toolbar><div class=\"md-toolbar-tools\" flex=\"\">题目</div></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.user.titles | limitTo:10\"><a ng-href=\"/#/main/title/info?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"column\" flex=\"\"><span><h2>{{title.content}}</h2></span> <label>{{title.description}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.user.titles || vm.user.titles.length === 0\"><md-button ng-href=\"/#/main/title/add\">没有出过题目，点此添加</md-button></div></div></md-content><md-content layout=\"column\" style=\"margin-top: 20px\" ng-if=\"vm.user.type === 0\"><md-toolbar><div class=\"md-toolbar-tools\" flex=\"\">我的作业</div></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.arranges | filter:{status:0} | limitTo:10\"><a ng-href=\"/#/main/work/info?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"row\" layout-align=\"center center\" flex=\"\"><span flex=\"\"><h2>{{title.arrange.name}}</h2></span> <label>教师: {{title.teach.name}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.arranges || vm.arranges.length === 0\"><label>你很棒,所有试题都组完了</label></div></div></md-content><md-content layout=\"column\" style=\"margin-top: 20px\" ng-if=\"vm.user.type === 0\"><md-toolbar><div class=\"md-toolbar-tools\" flex=\"\">已提交作业</div></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.arranges | filter:{status:1}| limitTo:10\"><a ng-href=\"/#/main/work/info?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"row\" layout-align=\"center center\" flex=\"\"><span flex=\"\"><h2>{{title.arrange.name}}</h2></span> <label>教师: {{title.teach.name}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.arranges || vm.arranges.length === 0\"><label>你很棒,所有试题都组完了</label></div></div></md-content><md-content layout=\"column\" style=\"margin-top: 20px\" ng-if=\"vm.user.type === 0\"><md-toolbar><div class=\"md-toolbar-tools\" flex=\"\">作业历史</div></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.arranges | filter:{status:2}| limitTo:10\"><a ng-href=\"/#/main/work/info?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"row\" layout-align=\"center center\" flex=\"\"><span flex=\"\"><h2>{{title.arrange.name}}</h2></span> <label>教师: {{title.teach.name}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.arranges || vm.arranges.length === 0\"><label>你很棒,所有试题都组完了</label></div></div></md-content></div>");
$templateCache.put("components/dlg/course.add.dlg.html","<md-dialog><md-subheader>添加课程</md-subheader><form name=\"vm.addForm\" layout=\"column\"><md-input-container><label>课程名字</label> <input type=\"text\" ng-model=\"vm.course.name\" required=\"\"></md-input-container><div layout=\"row\"><label>课程类型</label><md-select placeholder=\"课程类型\" ng-model=\"vm.course.type\"><md-option value=\"必修\">必修</md-option><md-option value=\"选修\">选修</md-option></md-select></div><div class=\"md-padding\" layout=\"row\"><md-button ng-click=\"vm.submit()\" flex=\"\">确定</md-button><md-button ng-click=\"vm.cancel()\" flex=\"\">取消</md-button></div></form></md-dialog>");
$templateCache.put("components/dlg/list.add.dlg.html","<md-dialog><md-subheader>{{vm.header}}</md-subheader><form name=\"vm.addForm\" layout=\"column\"><div ng-repeat=\"item in vm.list\" flex=\"\"><md-button ng-click=\"vm.submit(item)\" flex=\"\">{{vm.getShow(item)}}</md-button></div><div class=\"md-padding\" layout=\"row\"><md-button ng-click=\"vm.cancel()\" flex=\"\">取消</md-button></div></form></md-dialog>");
$templateCache.put("components/dlg/model.add.dlg.html","<md-dialog><md-subheader>创建模型</md-subheader><form name=\"vm.addForm\" layout=\"column\"><div class=\"md-padding\"><md-input-container><label>模型key</label><md-input required=\"\" ng-model=\"vm.model.key\"></md-input></md-input-container><md-input-container><label>模型名称</label><md-input required=\"\" ng-model=\"vm.model.name\"></md-input></md-input-container><md-input-container><label>模型描述</label><md-input required=\"\" ng-model=\"vm.model.description\"></md-input></md-input-container></div><div class=\"md-padding\" layout=\"row\"><md-button ng-click=\"vm.submit()\" flex=\"\">确定</md-button><md-button ng-click=\"vm.cancel()\" flex=\"\">取消</md-button></div></form></md-dialog>");
$templateCache.put("app/title/Title.html","<div ui-view=\"\" class=\"content-padding\"></div>");
$templateCache.put("app/work/work.html","<div ui-view=\"\" class=\"content-padding\"></div>");
$templateCache.put("app/exam/exam.html","<div ui-view=\"\" class=\"content-padding\"></div>");
$templateCache.put("components/template/classes.add.tmp.html","<md-whiteframe class=\"md-whiteframe-z2 md-padding\" layout=\"row\" layout-align=\"space-around start\" style=\"padding: 20px\"><md-whiteframe layout=\"column\" flex=\"30\"><div class=\"md-padding\"><md-input-container class=\"add-edit\"><label>班级名称</label> <input required=\"\" ng-model=\"vm.department.name\" type=\"text\"><div ng-messages=\"vm.addForm.department.name.$error\"><div ng-message=\"required\">班级名称不能为空</div></div></md-input-container><md-input-container class=\"add-edit\"><label>班级地址</label> <input required=\"\" ng-model=\"vm.department.address\" type=\"text\"><div ng-messages=\"vm.addForm.department.address.$error\"><div ng-message=\"required\">班级地址不能为空</div></div></md-input-container></div></md-whiteframe><md-whiteframe flex=\"70\"><md-content layout=\"column\" class=\"editer-total content-border\"><md-content class=\"md-toolbar-tools\">学校介绍</md-content><text-angular ng-model=\"vm.department.description\" ta-toolbar=\"{{Config.toolbars}}\"></text-angular><md-content><md-button class=\"md-toolbar-tools\" flex=\"\" ng-model=\"vm.department.attachment\">添加附件</md-button></md-content></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/classes.edit.tmp.html","<md-whiteframe class=\"md-padding\" layout=\"row\" layout-align=\"space-around start\" style=\"padding: 20px\"><md-whiteframe layout=\"column\" flex=\"30\"><form name=\"vm.addForm\" class=\"md-padding\"><md-input-container class=\"add-edit\"><label>班级名称</label> <input required=\"\" ng-model=\"vm.department.name\" type=\"text\"><div ng-messages=\"vm.addForm.department.name.$error\"><div ng-message=\"required\">班级名称不能为空</div></div></md-input-container><md-input-container class=\"add-edit\"><label>班级地址</label> <input required=\"\" ng-model=\"vm.department.address\" type=\"text\"><div ng-messages=\"vm.addForm.department.address.$error\"><div ng-message=\"required\">班级地址不能为空</div></div></md-input-container></form></md-whiteframe><md-whiteframe flex=\"70\"><md-content layout=\"column\" class=\"editer-total content-border\"><md-content class=\"md-toolbar-tools toolbar-border\">班级介绍</md-content><text-angular class=\"content-border\" ng-model=\"vm.department.description\" ta-toolbar=\"{{Config.toolbars}}\"></text-angular><md-content><md-button class=\"md-toolbar-tools\" flex=\"\" ng-model=\"vm.department.attachment\">添加附件</md-button></md-content></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/classes.info.tmp.html","<md-whiteframe class=\"md-padding\" layout=\"column\"><md-whiteframe layout=\"row\" layout-align=\"space-around start\"><div class=\"md-padding layout-form\" style=\"margin: 30px 30px 0 30px;\"><div class=\"info\"><span>班 级 名 称:<b class=\"force_justify\"></b></span> <label>{{vm.selectDep.name | default}}</label></div><div class=\"info\"><span>班 级地 址:<b class=\"force_justify\"></b></span> <label>{{vm.selectDep.address | default}}</label></div></div></md-whiteframe><md-whiteframe flex=\"\"><md-content layout=\"column\" class=\"dep-description\"><h2>班级介绍</h2><div ng-bind-html=\"vm.selectDep.description | trustHtml\"></div></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/department-add.tmp.html","<md-content style=\"height: 100%\"><script type=\"text/ng-template\" id=\"department_renderer.html\"><div layout=\"row\" ui-tree-handle data-nodrag layout-align=\"center center\"> <a style=\"margin-left: 5px\" data-nodrag ng-click=\"vm.toggleTree(this)\" ng-if=\"hasChild()\" aria-label=\"toggle\"><i class=\"fa\" ng-class=\"{\'fa-angle-down\': collapsed, \'fa-angle-up\': !collapsed}\"></i> </a> <md-button flex style=\"text-align: left\" data-nodrag ng-click=\"vm.depClick(this)\" aria-label=\"department.name\"> {{department.name}} </md-button> <a style=\"margin-right: 5px\" aria-label=\"dd\" ng-if=\"this.$modelValue.type !== 4\" ng-click=\"vm.addDialog(this,$event)\">+</a> </div> <ol ui-tree-nodes=\"\" ng-model=\"department.children\" ng-if=\"!collapsed\"> <li ng-repeat=\"department in department.children\" ui-tree-node ng-include=\"\'department_renderer.html\'\" data-nodrag> </li> </ol></script><div ui-tree=\"\" id=\"tree-root\" data-drag-enabled=\"false\"><ol ui-tree-nodes=\"\" ng-model=\"vm.departmentTree\"><li ng-repeat=\"department in vm.departmentTree\" ui-tree-node=\"\" ng-include=\"\'department_renderer.html\'\" data-nodrag=\"\"></li></ol></div></md-content>");
$templateCache.put("components/template/department.no.info.tmp.html","<md-content class=\"md-padding\" layout-align=\"center center\">请选择部门</md-content>");
$templateCache.put("components/template/department.tmp.html","<md-content style=\"height: 100%\"><script type=\"text/ng-template\" id=\"department_renderer.html\"><div layout=\"row\" ui-tree-handle data-nodrag layout=\"center center\"> <a data-nodrag ng-click=\"vm.toggleTree(this)\" ng-if=\"hasChild()\" aria-label=\"toggle\"><i class=\"fa\" ng-class=\"{\'fa-angle-down\': collapsed, \'fa-angle-up\': !collapsed}\"></i> </a> <md-button flex style=\"text-align: left\" data-nodrag ng-click=\"vm.depClick(this)\" aria-label=\"department.name\"> {{department.name}} </md-button> </div> <ol ui-tree-nodes=\"\" ng-model=\"department.children\" ng-if=\"!collapsed\"> <li ng-repeat=\"department in department.children\" ui-tree-node ng-include=\"\'department_renderer.html\'\" data-nodrag> </li> </ol></script><div ui-tree=\"\" id=\"tree-root\" data-drag-enabled=\"false\"><ol ui-tree-nodes=\"\" ng-model=\"vm.departmentTree\"><li ng-repeat=\"department in vm.departmentTree\" ui-tree-node=\"\" ng-include=\"\'department_renderer.html\'\" data-nodrag=\"\"></li></ol></div></md-content>");
$templateCache.put("components/template/dlg.dep.tmp.html","<md-dialog aria-label=\"选择部门\"><md-content><md-subheader class=\"md-sticky-no-effect\" style=\"background-color: #003399; color:white\">选择部门</md-subheader><div><div ng-include=\"\" src=\"\'components/template/department.tmp.html\'\"></div></div></md-content></md-dialog>");
$templateCache.put("components/template/dlg.edit.salary.tmp.html","<md-dialog aria-label=\"输入\"><md-content><md-subheader class=\"md-sticky-no-effect\" style=\"margin-left:-15px\">{{vm.header || \'请输入\'}}</md-subheader><form name=\"vm.inputForm\" layout=\"column\"><md-input-container><label>{{vm.name}}</label> <input required=\"\" type=\"number\" ng-model=\"vm.value\"></md-input-container><md-content layout=\"row\" layout-align=\"space-around center\"><md-button ng-click=\"vm.cancel()\" style=\"color: #999\">取消</md-button><md-button ng-click=\"vm.submit()\" style=\"color: #999\">确定</md-button></md-content></form></md-content></md-dialog>");
$templateCache.put("components/template/dlg.position.tmp.html","<md-dialog aria-label=\"选择岗位\"><md-content layout=\"column\" layout-align=\"center center\"><md-list><md-item ng-repeat=\"position in vm.positions\" style=\"width: 100%\"><md-button ng-click=\"vm.answer(position)\" style=\"width: 100%;color: #000000\">{{position.name}}</md-button></md-item></md-list><label ng-if=\"vm.positions.length < 1\">该部门下没有岗位</label><br><md-button ng-click=\"vm.cancel()\">取消</md-button></md-content></md-dialog>");
$templateCache.put("components/template/dlg.type.tmp.html","<md-dialog aria-label=\"选择类型\"><md-content><md-subheader class=\"md-sticky-no-effect\">选择类型</md-subheader><md-list><md-item ng-repeat=\"item in items\"><md-button aria-label=\"{{item.name}}\" ng-click=\"select(item)\" style=\"width: 100%\">{{item.name}}</md-button></md-item></md-list></md-content></md-dialog>");
$templateCache.put("components/template/institute.add.tmp.html","<md-whiteframe class=\"md-whiteframe-z2 md-padding\" layout=\"row\" layout-align=\"space-around start\" style=\"padding: 20px\"><md-whiteframe layout=\"column\" flex=\"30\"><div class=\"md-padding\"><md-input-container class=\"add-edit\"><label>学院名称</label> <input required=\"\" ng-model=\"vm.department.name\" type=\"text\"><div ng-messages=\"vm.addForm.department.name.$error\"><div ng-message=\"required\">学院名称不能为空</div></div></md-input-container><md-input-container class=\"add-edit\"><label>学院地址</label> <input required=\"\" ng-model=\"vm.department.address\" type=\"text\"><div ng-messages=\"vm.addForm.department.address.$error\"><div ng-message=\"required\">学院地址不能为空</div></div></md-input-container></div></md-whiteframe><md-whiteframe flex=\"70\"><md-content layout=\"column\" class=\"editer-total content-border\"><md-content class=\"md-toolbar-tools\">学院介绍</md-content><text-angular ng-model=\"vm.department.description\" ta-toolbar=\"{{Config.toolbars}}\"></text-angular><md-content><md-button class=\"md-toolbar-tools\" flex=\"\" ng-model=\"vm.department.attachment\">添加附件</md-button></md-content></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/institute.edit.tmp.html","<md-whiteframe class=\"md-padding\" layout=\"row\" layout-align=\"space-around start\" style=\"padding: 20px\"><md-whiteframe layout=\"column\" flex=\"30\"><form name=\"vm.addForm\" class=\"md-padding\"><md-input-container class=\"add-edit\"><label>学院名称</label> <input required=\"\" ng-model=\"vm.department.name\" type=\"text\"><div ng-messages=\"vm.addForm.department.name.$error\"><div ng-message=\"required\">学院名称不能为空</div></div></md-input-container><md-input-container class=\"add-edit\"><label>学院地址</label> <input required=\"\" ng-model=\"vm.department.address\" type=\"text\"><div ng-messages=\"vm.addForm.department.address.$error\"><div ng-message=\"required\">学院地址不能为空</div></div></md-input-container></form></md-whiteframe><md-whiteframe flex=\"70\"><md-content layout=\"column\" class=\"editer-total content-border\"><md-content class=\"md-toolbar-tools toolbar-border\">学院介绍</md-content><text-angular class=\"content-border\" ng-model=\"vm.department.description\" ta-toolbar=\"{{Config.toolbars}}\"></text-angular><md-content><md-button class=\"md-toolbar-tools\" flex=\"\" ng-model=\"vm.department.attachment\">添加附件</md-button></md-content></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/institute.info.tmp.html","<md-whiteframe class=\"md-padding\" layout=\"column\"><md-whiteframe layout=\"row\" layout-align=\"space-around start\"><div class=\"md-padding layout-form\" style=\"margin: 30px 30px 0 30px;\"><div class=\"info\"><span>学 院 名 称:<b class=\"force_justify\"></b></span> <label>{{vm.selectDep.name | default}}</label></div><div class=\"info\"><span>学 院 地 址:<b class=\"force_justify\"></b></span> <label>{{vm.selectDep.address | default}}</label></div></div></md-whiteframe><md-whiteframe flex=\"\"><md-content layout=\"column\" class=\"dep-description\"><h2>学院介绍</h2><div ng-bind-html=\"vm.selectDep.description | trustHtml\"></div></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/professional.add.tmp.html","<md-whiteframe class=\"md-whiteframe-z2 md-padding\" layout=\"row\" layout-align=\"space-around start\" style=\"padding: 20px\"><md-whiteframe layout=\"column\" flex=\"30\"><div class=\"md-padding\"><md-input-container class=\"add-edit\"><label>专业名称</label> <input required=\"\" ng-model=\"vm.department.name\" type=\"text\"><div ng-messages=\"vm.addForm.department.name.$error\"><div ng-message=\"required\">专业名称不能为空</div></div></md-input-container><md-input-container class=\"add-edit\"><label>专业地址</label> <input required=\"\" ng-model=\"vm.department.address\" type=\"text\"><div ng-messages=\"vm.addForm.department.address.$error\"><div ng-message=\"required\">专业地址不能为空</div></div></md-input-container></div></md-whiteframe><md-whiteframe flex=\"70\"><md-content layout=\"column\" class=\"editer-total content-border\"><md-content class=\"md-toolbar-tools\">专业介绍</md-content><text-angular ng-model=\"vm.department.description\" ta-toolbar=\"{{Config.toolbars}}\"></text-angular><md-content><md-button class=\"md-toolbar-tools\" flex=\"\" ng-model=\"vm.department.attachment\">添加附件</md-button></md-content></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/professional.edit.tmp.html","<md-whiteframe class=\"md-padding\" layout=\"row\" layout-align=\"space-around start\" style=\"padding: 20px\"><md-whiteframe layout=\"column\" flex=\"30\"><form name=\"vm.addForm\" class=\"md-padding\"><md-input-container class=\"add-edit\"><label>专业名称</label> <input required=\"\" ng-model=\"vm.department.name\" type=\"text\"><div ng-messages=\"vm.addForm.department.name.$error\"><div ng-message=\"required\">专业名称不能为空</div></div></md-input-container><md-input-container class=\"add-edit\"><label>专业地址</label> <input required=\"\" ng-model=\"vm.department.address\" type=\"text\"><div ng-messages=\"vm.addForm.department.address.$error\"><div ng-message=\"required\">专业地址不能为空</div></div></md-input-container></form></md-whiteframe><md-whiteframe flex=\"70\"><md-content layout=\"column\" class=\"editer-total content-border\"><md-content class=\"md-toolbar-tools toolbar-border\">专业介绍</md-content><text-angular class=\"content-border\" ng-model=\"vm.department.description\" ta-toolbar=\"{{Config.toolbars}}\"></text-angular><md-content><md-button class=\"md-toolbar-tools\" flex=\"\" ng-model=\"vm.department.attachment\">添加附件</md-button></md-content></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/professional.info.tmp.html","<md-whiteframe class=\"md-padding\" layout=\"column\"><md-whiteframe layout=\"row\" layout-align=\"space-around start\"><div class=\"md-padding layout-form\" style=\"margin: 30px 30px 0 30px;\"><div class=\"info\"><span>专 业 名 称:<b class=\"force_justify\"></b></span> <label>{{vm.selectDep.name | default}}</label></div><div class=\"info\"><span>专 业 地 址:<b class=\"force_justify\"></b></span> <label>{{vm.selectDep.address | default}}</label></div></div></md-whiteframe><md-whiteframe flex=\"\"><md-content layout=\"column\" class=\"dep-description\"><h2>专业介绍</h2><div ng-bind-html=\"vm.selectDep.description | trustHtml\"></div></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/school.add.tmp.html","<md-whiteframe class=\"md-whiteframe-z2 md-padding\" layout=\"row\" layout-align=\"space-around start\" style=\"padding: 20px\"><md-whiteframe layout=\"column\" flex=\"30\"><div class=\"md-padding\"><md-input-container class=\"add-edit\"><label>学校名称</label> <input required=\"\" ng-model=\"vm.department.name\" type=\"text\"><div ng-messages=\"vm.addForm.department.name.$error\"><div ng-message=\"required\">学校名称不能为空</div></div></md-input-container><md-input-container class=\"add-edit\"><label>学校地址</label> <input required=\"\" ng-model=\"vm.department.address\" type=\"text\"><div ng-messages=\"vm.addForm.department.address.$error\"><div ng-message=\"required\">学校地址不能为空</div></div></md-input-container></div></md-whiteframe><md-whiteframe flex=\"70\"><md-content layout=\"column\" class=\"editer-total content-border\"><md-content class=\"md-toolbar-tools\">学校介绍</md-content><text-angular ng-model=\"vm.department.description\" ta-toolbar=\"{{Config.toolbars}}\"></text-angular><md-content><md-button class=\"md-toolbar-tools\" flex=\"\" ng-model=\"vm.department.attachment\">添加附件</md-button></md-content></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/school.edit.tmp.html","<md-whiteframe class=\"md-padding\" layout=\"row\" layout-align=\"space-around start\" style=\"padding: 20px\"><md-whiteframe layout=\"column\" flex=\"30\"><form name=\"vm.addForm\" class=\"md-padding\"><md-input-container class=\"add-edit\"><label>学校名称</label> <input required=\"\" ng-model=\"vm.department.name\" type=\"text\"><div ng-messages=\"vm.addForm.department.name.$error\"><div ng-message=\"required\">学校名称不能为空</div></div></md-input-container><md-input-container class=\"add-edit\"><label>学校地址</label> <input required=\"\" ng-model=\"vm.department.address\" type=\"text\"><div ng-messages=\"vm.addForm.department.address.$error\"><div ng-message=\"required\">学校地址不能为空</div></div></md-input-container></form></md-whiteframe><md-whiteframe flex=\"70\"><md-content layout=\"column\" class=\"editer-total content-border\"><md-content class=\"md-toolbar-tools toolbar-border\">学校介绍</md-content><text-angular class=\"content-border\" ng-model=\"vm.department.description\" ta-toolbar=\"{{Config.toolbars}}\"></text-angular><md-content><md-button class=\"md-toolbar-tools\" flex=\"\" ng-model=\"vm.department.attachment\">添加附件</md-button></md-content></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("components/template/school.info.tmp.html","<md-whiteframe class=\"md-padding\" layout=\"column\"><md-whiteframe layout=\"row\" layout-align=\"space-around start\"><div class=\"md-padding layout-form\" style=\"margin: 30px 30px 0 30px;\"><div class=\"info\"><span>学 校 名 称:<b class=\"force_justify\"></b></span> <label>{{vm.selectDep.name | default}}</label></div><div class=\"info\"><span>学 校 地 址:<b class=\"force_justify\"></b></span> <label>{{vm.selectDep.address | default}}</label></div></div></md-whiteframe><md-whiteframe flex=\"\"><md-content layout=\"column\" class=\"dep-description\"><h2>学校介绍</h2><div ng-bind-html=\"vm.selectDep.description | trustHtml\"></div></md-content></md-whiteframe></md-whiteframe>");
$templateCache.put("app/course/add/CourseAdd.html","<div layout=\"row\"><form name=\"vm.addForm\" class=\"md-whiteframe-z4\" layout=\"column\" flex=\"\"><md-toolbar md-theme=\"altTheme\" layout=\"row\" class=\"toolbar-border\"><div class=\"md-toolbar-tools\" flex=\"\">课程列表</div><md-button ng-click=\"vm.addCourse($event)\">添加</md-button></md-toolbar><div layout=\"column\"><md-input-container><label>课程名字</label></md-input-container></div></form></div>");
$templateCache.put("app/course/list/CourseList.html","<md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">课程列表</div><md-button ng-click=\"vm.addCourse($event)\">添加</md-button></md-toolbar><div layout=\"column\" ng-repeat=\"course in vm.user.courses\"><a ng-href=\"/#/main/course/students?id={{course.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"column\" flex=\"\"><h2>{{course.name}}</h2><label>{{course.type}}</label></div><span>学生数: {{course.students.length}}</span></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.user.courses || vm.user.courses.length === 0\"><md-button ng-click=\"vm.addCourse($event)\">没有课程，点此添加</md-button></div></md-content>");
$templateCache.put("app/course/student/StudentList.html","<md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">{{vm.course.name}} 学生列表</div><md-button ng-click=\"vm.addStudent($event)\">添加学生</md-button></md-toolbar><div layout=\"column\" ng-repeat=\"student in vm.course.students\"><div class=\"container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"column\" flex=\"\"><h2>{{student.name}}</h2></div><md-button ng-click=\"vm.removeStudent(student, $index, $event)\">删除</md-button></div></div><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.course.students || vm.course.students.length === 0\"><md-button ng-click=\"vm.addStudent($event)\">没有学生，点此添加</md-button></div></md-content>");
$templateCache.put("app/dep/add/DepartmentAdd.html","<form name=\"vm.addForm\" layout=\"column\" class=\"doc-content\"><md-whiteframe class=\"md-padding\" layout=\"column\"><md-toolbar layout=\"row\" md-theme=\"altTheme\" class=\"box-shadow-none toolbar-border\"><div class=\"md-toolbar-tools\" flex=\"\">添加{{vm.type.name}}</div><md-button class=\"btn-ctrl\" ng-click=\"vm.addDepartment($event)\">提交</md-button><md-button class=\"btn-ctrl\" ng-click=\"back()\">取消</md-button></md-toolbar><md-content class=\"content-border\"><div ng-include=\"\" src=\"vm.type.addUrl\" class=\"info-border\"></div></md-content></md-whiteframe></form>");
$templateCache.put("app/dep/change/DepartmentChange.html","<form name=\"vm.addForm\" layout=\"column\" class=\"doc-content\"><md-whiteframe class=\"md-padding\" layout=\"column\"><md-toolbar md-theme=\"altTheme\" layout=\"row\" class=\"box-shadow-none toolbar-border\"><div class=\"md-toolbar-tools\" flex=\"\">编辑{{vm.department.name}}资料</div><md-button ng-click=\"vm.submit($event)\" class=\"btn-ctrl\">提交</md-button><md-button ng-click=\"back()\" class=\"btn-ctrl\">取消</md-button></md-toolbar><md-content class=\"content-border\"><div ng-include=\"\" src=\"vm.type.editUrl\" class=\"info-border\"></div></md-content></md-whiteframe></form>");
$templateCache.put("app/dep/list/DepartmentList.html","<div layout=\"row\"><md-content layout=\"column\" style=\"width: 300px;height: auto\"><md-toolbar layout=\"row\" class=\"box-shadow-none toolbar-border\"><div class=\"md-toolbar-tools\" style=\"width:120px;\" flex=\"\">组织结构</div><md-button ng-click=\"vm.addDepartment()\" class=\"btn-ctrl\">添加学校</md-button></md-toolbar><div class=\"content-border\" ng-include=\"\" src=\"\'components/template/department-add.tmp.html\'\"></div></md-content><md-content flex=\"98\" style=\"margin-left: 2%;\"><md-toolbar layout=\"row\" class=\"box-shadow-none toolbar-border\"><div class=\"md-toolbar-tools\" flex=\"\">{{vm.selectDep.name}}</div><md-button ng-click=\"vm.editDepartment($event)\" ng-if=\"!!vm.selectDep\" class=\"btn-ctrl\">编辑资料</md-button><md-button ng-click=\"vm.deleteDepartment($event)\" ng-if=\"!!vm.selectDep\" class=\"btn-ctrl\">删除部门</md-button></md-toolbar><md-content ng-include=\"\" src=\"vm.template.infoUrl\" class=\"content-border\"></md-content></md-content></div>");
$templateCache.put("app/user/add/UserAdd.html","<form name=\"vm.addForm\"><md-content layout=\"column\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">选择师生添加到{{vm.department.name}}</div><md-button class=\"btn-ctrl\" ng-click=\"vm.updateUser($event)\">提交</md-button><md-button class=\"btn-ctrl\" ng-click=\"back()\">取消</md-button></md-toolbar><md-content><div layout=\"row\" ng-repeat=\"user in vm.users | filter:{type:\'!2\'}\"><md-button>{{$index+1}}</md-button><md-checkbox ng-model=\"user.selected\" flex=\"\">{{user.name}}</md-checkbox></div></md-content></md-content></form>");
$templateCache.put("app/user/change/DepartmentChange.html","<form name=\"vm.addForm\" layout=\"column\" class=\"doc-content\"><md-whiteframe class=\"md-padding\" layout=\"column\"><md-toolbar md-theme=\"altTheme\" layout=\"row\" class=\"box-shadow-none toolbar-border\"><div class=\"md-toolbar-tools\" flex=\"\">编辑{{vm.department.name}}资料</div><md-button ng-click=\"vm.submit($event)\" class=\"btn-ctrl\">提交</md-button><md-button ng-click=\"back()\" class=\"btn-ctrl\">取消</md-button></md-toolbar><md-content class=\"content-border\"><div ng-include=\"\" src=\"vm.type.editUrl\" class=\"info-border\"></div></md-content></md-whiteframe></form>");
$templateCache.put("app/user/list/UserList.html","<div layout=\"row\"><md-content flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">过滤</div></md-toolbar><div class=\"content-border\" ng-include=\"\" src=\"\'components/template/department.tmp.html\'\"></div></md-content><md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">{{vm.selectDep.name | default:\'全部\'}} 师生列表</div><md-button ng-click=\"vm.addUser($event)\">添加</md-button></md-toolbar><div layout=\"row\" ng-repeat=\"user in vm.users\"><md-button>{{$index+1}}</md-button><md-button>{{user.name}}</md-button><md-button>{{user.type === 0 ? \'学生\':\'老师\'}}</md-button></div><div ng-if=\"!vm.users || vm.users.length === 0\"><md-button ng-click=\"vm.addUser($event)\">一个师生都没有,点此添加</md-button></div></md-content></div>");
$templateCache.put("components/directive/menuLink/menu-link.tmpl.html","<md-button ng-class=\"{\'active\' : isSelected()}\" ng-click=\"focusSection(section,$event)\">{{section | humanizeDoc}} <span class=\"visually-hidden\" ng-if=\"isSelected()\">current page</span></md-button>");
$templateCache.put("components/directive/menuToggle/menu-toggle.tmpl.html","<md-button class=\"md-button-toggle\" ng-click=\"toggle()\" aria-controls=\"docs-menu-{{section.name | nospace}}\" flex=\"\" layout=\"row\" aria-expanded=\"{{isOpen()}}\"><div flex=\"\" layout=\"row\">{{section.name}} <span flex=\"\"></span><span aria-hidden=\"true\" class=\"md-toggle-icon\" ng-class=\"{\'toggled\' : isOpen()}\"></span></div></md-button><ul ng-show=\"isOpen()\" id=\"docs-menu-{{section.name | nospace}}\" class=\"menu-toggle-list\"><li ng-repeat=\"page in section.children\"><menu-link section=\"page\"></menu-link></li></ul>");
$templateCache.put("app/title/add/TitleAdd.html","<form name=\"vm.addForm\" layout=\"column\" novalidate=\"\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">题目信息</div><md-button ng-click=\"vm.addTitle($event)\" ng-if=\"vm.addForm.$valid\">添加</md-button></md-toolbar><div layout=\"column\" class=\"container-padding\"><md-input-container><label>题目</label> <textarea ng-model=\"vm.title.content\" type=\"text\" required=\"\" name=\"content\"></textarea><div ng-messages=\"vm.addForm.content.$error\"><div ng-message=\"required\">题目不能为空</div></div></md-input-container><md-input-container><label>描述</label> <textarea ng-model=\"vm.title.description\" type=\"text\"></textarea></md-input-container></div><div layout=\"column\" class=\"container-padding\"><div layout=\"row\"><h2 flex=\"\">答案:</h2></div><div ng-repeat=\"answer in vm.title.answers\"><div style=\"border: solid chartreuse 1px; margin: 5px;\"><md-input-container><label>答案</label> <input multiple=\"\" type=\"text\" ng-model=\"answer.content\"></md-input-container><md-checkbox ng-model=\"answer.correct\">是否为正确答案</md-checkbox></div></div><md-button ng-click=\"vm.addAnswer($event)\">添加答案</md-button></div></form>");
$templateCache.put("app/title/info/TitleInfo.html","<md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">题目详情</div><md-button ng-click=\"back()\">返回</md-button></md-toolbar><div layout=\"column\" style=\"padding: 24px\"><div><span>题目:</span> <span>{{vm.title.content}}</span></div><div><span>描述:</span> <span>{{vm.title.description}}</span></div><div><h2>答案</h2><div ng-repeat=\"answer in vm.title.answers\" layout=\"column\" style=\"border: dashed green 1px; margin: 10px; border-radius: 5px\"><h4>答案{{$index + 1}}:</h4><div layout=\"row\" layout-align=\"center center\"><div style=\"border: solid 1px;padding: 10px;margin: 3px;border-radius: 5px\" flex=\"\">{{answer.content}}</div><div style=\"color: green;\">{{answer.correct ? \"正确答案\" : \'\'}}</div></div></div><form name=\"vm.answerForm\"><div ng-repeat=\"answer in vm.answers\" layout=\"column\" style=\"border: dashed blue 1px; margin: 10px; border-radius: 5px\"><md-input-container flex=\"\"><label>新增答案{{$index+1}}</label> <textarea type=\"text\" required=\"\" ng-model=\"answer.content\"></textarea></md-input-container><md-checkbox ng-model=\"answer.correct\">答案是否正确</md-checkbox></div><div layout=\"row\"><label flex=\"\"></label><md-button ng-click=\"vm.addAnswer($event)\">添加答案</md-button><md-button ng-click=\"vm.save($event)\" ng-if=\"vm.answers.length > 0 && vm.answerForm.$valid\">保存</md-button></div></form></div></div></md-content>");
$templateCache.put("app/title/list/TitleList.html","<md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">我的题目</div><md-button ng-href=\"/#/main/title/add\">添加</md-button></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.user.titles\"><a ng-href=\"/#/main/title/info?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"column\" flex=\"\"><span><h2>{{title.content}}</h2></span> <label>{{title.description}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.user.titles || vm.user.titles.length === 0\"><md-button ng-href=\"/#/main/title/add\">没有出过题目，点此添加</md-button></div></div></md-content>");
$templateCache.put("components/dlg/arrange/dlg.arrange.html","<md-dialog><md-dialog-content><md-tabs md-dynamic-height=\"\" md-border-bottom=\"\"><md-tab label=\"课程\"><md-content class=\"md-padding\"><md-checkbox ng-repeat=\"course in vm.user.courses\" ng-model=\"vm.courseSelected[$index]\">{{course.name}}</md-checkbox></md-content></md-tab><md-tab label=\"学生\"><md-content class=\"md-padding\"><md-checkbox ng-repeat=\"user in vm.users\" ng-model=\"vm.userSelected[$index]\">{{user.name}}</md-checkbox></md-content></md-tab></md-tabs></md-dialog-content><div class=\"md-actions\" layout=\"row\"><label flex=\"\"></label><md-button ng-click=\"vm.ok($event)\">确定</md-button><md-button ng-click=\"vm.cancel()\">取消</md-button></div></md-dialog>");
$templateCache.put("components/dlg/selectTitle/dlg.selectTitle.html","<md-dialog><h2>题目选择</h2><md-dialog-content layout=\"column\"><div layout=\"column\"><div ng-repeat=\"title in vm.titles\"><md-checkbox ng-model=\"vm.selects[$index]\">{{title.content}}</md-checkbox></div></div></md-dialog-content><div class=\"md-actions\" layout=\"row\"><label flex=\"\"></label><md-button ng-click=\"vm.ok($event)\">确定</md-button><md-button ng-click=\"vm.cancel()\">取消</md-button></div></md-dialog>");
$templateCache.put("app/work/corrects/corrects.html","<md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">待批改作业</div></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.arranges\"><a ng-href=\"/#/main/work/correct?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"row\" layout-align=\"center center\" flex=\"\"><span flex=\"\"><h2>{{title.arrange.name}}</h2></span> <label>学生: {{title.user.name}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.arranges || vm.arranges.length === 0\"><label>暂无待批改作业</label></div></div></md-content>");
$templateCache.put("app/work/histories/histories.html","<md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">历史作业</div></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.arranges\"><a ng-href=\"/#/main/work/history?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"row\" layout-align=\"center center\" flex=\"\"><span flex=\"\"><h2>{{title.arrange.name}}</h2></span> <label>教师: {{title.teach.name}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.arranges || vm.arranges.length === 0\"><label>暂无历史作业</label></div></div></md-content>");
$templateCache.put("app/work/info/workInfo.html","<md-content class=\"md-whiteframe-z1\" layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">试卷</div><md-button ng-click=\"vm.startAnswer($event)\" ng-if=\"!vm.start\">开始答题</md-button><md-button ng-click=\"vm.submit($event)\" ng-if=\"vm.start\">提交</md-button><md-button ng-click=\"back()\">返回</md-button></md-toolbar><div layout=\"column\" style=\"background-color: white; padding-bottom: 550px\"><div layout-align=\"center center\" layout=\"column\"><h1>{{vm.exam.name}}</h1><h3>{{\'共\' + vm.exam.titles.length + \' 题, 满分: \' + vm.exam.percent + \'分\' }}</h3></div><div style=\"border: dotted 1px #aaa;\"></div><div ng-repeat=\"bigTitle in vm.exam.titles\" style=\"margin: 10px 5px;\"><h2 flex=\"\">{{(($index + 1) | sequence:\'zh\')+ \' : \' + bigTitle.name + \'(每题 \' + bigTitle.percent + \"分, 共\" + bigTitle.titles.length + \" * \" + bigTitle.percent + \"= \" + (bigTitle.titles.length * bigTitle.percent) + \" 分)\"}}</h2><div ng-switch=\"bigTitle.type\"><div ng-switch-when=\"0\"><div ng-repeat=\"title in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{(($index + 1)) + \': \' + title.content}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-radio-group ng-model=\"title.answer\"><md-radio-button ng-disabled=\"!vm.start\" ng-repeat=\"answer in title.answers\" style=\"margin-left: 10px\" ng-value=\"answer.id\">{{($index | abcd:\'upper\') + \'. \' + answer.content}}</md-radio-button></md-radio-group></div></div><div ng-switch-when=\"1\"><div ng-repeat=\"title in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{(($index + 1)) + \': \' + title.content}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-checkbox ng-disabled=\"!vm.start\" ng-repeat=\"answer in title.answers\" style=\"margin-left: 10px\" ng-model=\"answer.select\">{{($index | abcd:\'upper\') + \'. \' + answer.content}}</md-checkbox></div></div><div ng-switch-default=\"\"><div ng-repeat=\"title in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{(($index + 1)) + \': \' + title.content}}</h4></div><md-input-container><label>答案:</label> <textarea ng-disabled=\"!vm.start\" ng-model=\"title.answer\" style=\"min-height: 300px\"></textarea></md-input-container></div></div></div></div></div></md-content>");
$templateCache.put("app/work/submit/submit.html","<md-content class=\"md-whiteframe-z1\" layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">试卷</div><md-button ng-click=\"back()\">返回</md-button></md-toolbar><div layout=\"column\" style=\"background-color: white; padding-bottom: 550px\"><div layout-align=\"center center\" layout=\"column\"><h1>{{vm.exam.name}}</h1><div layout=\"row\"><h3>{{\'共\' + vm.exam.titles.length + \' 题, 满分: \' + vm.exam.percent + \'分\' }}</h3><h2 ng-if=\"vm.userarrange.status === 2\">您的得分: {{vm.userarrange.percent}}</h2></div></div><div layout=\"column\"><div layout=\"row\" layout-align=\"center center\"><div style=\"height: 5px; width: 300px\" class=\"answerAllRight\"></div><label flex=\"\">代表你选到答案,同时也是正确答案</label></div><div layout=\"row\" layout-align=\"center center\"><div style=\"height: 5px; width: 300px\" class=\"answerYou\"></div><label flex=\"\">代表你选到答案,但不是正确答案</label></div><div layout=\"row\" layout-align=\"center center\"><div style=\"height: 5px; width: 300px\" class=\"answerRight\"></div><label flex=\"\">代表正确答案</label></div></div><div style=\"border: dotted 1px #aaa;\"></div><div ng-repeat=\"(bIndex, bigTitle) in vm.exam.titles\" style=\"margin: 10px 5px;\"><h2 flex=\"\">{{((bIndex + 1) | sequence:\'zh\')+ \' : \' + bigTitle.name + \'(每题 \' + bigTitle.percent + \"分, 共\" + bigTitle.titles.length + \" * \" + bigTitle.percent + \"= \" + (bigTitle.titles.length * bigTitle.percent) + \" 分)\"}}</h2><div ng-switch=\"bigTitle.type\"><div ng-switch-when=\"0\"><div ng-repeat=\"(tIndex,title) in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{((tIndex + 1)) + \': \' + title.content}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-radio-group><md-radio-button ng-repeat=\"(aIndex, answer) in title.answers\" style=\"margin-left: 10px\" disabled=\"\" ng-model=\"answer.select\" ng-class=\"{\'2\':\'answerAllRight\', \'1\':\'answerRight\', \'0\': \'answerYou\'}[answer.correct ? answer.select ? \'2\' : \'1\' : answer.select ? \'0\' : \'-1\']\">{{(aIndex | abcd:\'upper\') + \'. \' + answer.content}}</md-radio-button></md-radio-group></div></div><div ng-switch-when=\"1\"><div ng-repeat=\"(tIndex,title) in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{((tIndex + 1)) + \': \' + title.content}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-checkbox disabled=\"\" ng-repeat=\"(aIndex,answer) in title.answers\" style=\"margin-left: 10px\" ng-model=\"answer.select\" ng-class=\"{\'2\':\'answerAllRight\', \'1\':\'answerRight\', \'0\': \'answerYou\'}[answer.correct ? answer.select ? \'2\' : \'1\' : answer.select ? \'0\' : \'-1\']\">{{(aIndex | abcd:\'upper\') + \'. \' + answer.content}}</md-checkbox></div></div><div ng-switch-default=\"\"><div ng-repeat=\"(tIndex,title) in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{((tIndex + 1)) + \': \' + title.content}}</h4></div><div style=\"margin: 10px\"><label>答案:</label><p>{{title.answer}}</p></div><div><md-button ng-if=\"vm.filterCorrect(title.answers).length > 0\" ng-click=\"vm[\'_\'+bIndex + \'_\' + tIndex + \'_\'] = !vm[\'_\'+bIndex + \'_\' + tIndex + \'_\']\">参考答案</md-button><div ng-if=\"vm[\'_\'+bIndex + \'_\' + tIndex + \'_\']\" layout=\"row\" ng-repeat=\"(aIndex,answer) in vm.filterCorrect(title.answers)\"><label>{{aIndex+1}}:</label><p style=\"margin: 0px 20px\">{{answer.content}}</p></div></div></div></div></div></div></div></md-content>");
$templateCache.put("app/work/list/workList.html","<md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">我的作业</div><md-button ng-href=\"/#/main/exam/add\">添加</md-button></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.arranges\"><a ng-href=\"/#/main/work/info?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"row\" layout-align=\"center center\" flex=\"\"><span flex=\"\"><h2>{{title.arrange.name}}</h2></span> <label>教师: {{title.teach.name}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.arranges || vm.arranges.length === 0\"><label>你很棒,所有试题都组完了</label></div></div></md-content>");
$templateCache.put("app/work/submits/submits.html","<md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">已提交作业</div><md-button ng-href=\"/#/main/exam/add\">添加</md-button></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.arranges\"><a ng-href=\"/#/main/work/submit?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"row\" layout-align=\"center center\" flex=\"\"><span flex=\"\"><h2>{{title.arrange.name}}</h2></span> <label>教师: {{title.teach.name}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.arranges || vm.arranges.length === 0\"><label>暂无提交作业</label></div></div></md-content>");
$templateCache.put("app/work/history/history.html","<form name=\"vm.correctForm\" class=\"md-whiteframe-z1\" layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">作业</div><md-button ng-click=\"back()\">返回</md-button></md-toolbar><div layout=\"column\" style=\"background-color: white; padding-bottom: 550px\"><div layout-align=\"center center\" layout=\"column\"><h1>{{vm.exam.name}}</h1><div layout=\"row\"><h3>{{\'共\' + vm.exam.titles.length + \' 题, 满分: \' + vm.exam.percent + \'分\' }}</h3><h3 style=\"margin-left: 30px\">学生: {{vm.userarrange.user.name}} 得分: {{vm.userarrange.percent}}</h3></div></div><div layout=\"column\"><div layout=\"row\" layout-align=\"center center\"><div style=\"height: 5px; width: 300px\" class=\"answerAllRight\"></div><label flex=\"\">代表你选到答案,同时也是正确答案</label></div><div layout=\"row\" layout-align=\"center center\"><div style=\"height: 5px; width: 300px\" class=\"answerYou\"></div><label flex=\"\">代表你选到答案,但不是正确答案</label></div><div layout=\"row\" layout-align=\"center center\"><div style=\"height: 5px; width: 300px\" class=\"answerRight\"></div><label flex=\"\">代表正确答案</label></div></div><div style=\"border: dotted 1px #aaa;\"></div><div ng-repeat=\"(bIndex, bigTitle) in vm.exam.titles\" style=\"margin: 10px 5px;\"><h2 flex=\"\">{{((bIndex + 1) | sequence:\'zh\')+ \' : \' + bigTitle.name + \'(每题 \' + bigTitle.percent + \"分, 共\" + bigTitle.titles.length + \" * \" + bigTitle.percent + \"= \" + (bigTitle.titles.length * bigTitle.percent) + \" 分)\"}}</h2><div ng-switch=\"bigTitle.type\"><div ng-switch-when=\"0\"><div ng-repeat=\"(tIndex,title) in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{((tIndex + 1)) + \': \' + title.content + \' (分数: \' + title.percent + \' 分)\'}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-radio-group><md-radio-button ng-repeat=\"(aIndex, answer) in title.answers\" style=\"margin-left: 10px\" disabled=\"\" ng-model=\"answer.select\" ng-class=\"{\'2\':\'answerAllRight\', \'1\':\'answerRight\', \'0\': \'answerYou\'}[answer.correct ? answer.select ? \'2\' : \'1\' : answer.select ? \'0\' : \'-1\']\">{{(aIndex | abcd:\'upper\') + \'. \' + answer.content}}</md-radio-button></md-radio-group></div></div><div ng-switch-when=\"1\"><div ng-repeat=\"(tIndex,title) in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{((tIndex + 1)) + \': \' + title.content + \' (分数: \' + title.percent + \' 分)\'}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-checkbox disabled=\"\" ng-repeat=\"(aIndex,answer) in title.answers\" style=\"margin-left: 10px\" ng-model=\"answer.select\" ng-class=\"{\'2\':\'answerAllRight\', \'1\':\'answerRight\', \'0\': \'answerYou\'}[answer.correct ? answer.select ? \'2\' : \'1\' : answer.select ? \'0\' : \'-1\']\">{{(aIndex | abcd:\'upper\') + \'. \' + answer.content}}</md-checkbox></div></div><div ng-switch-default=\"\"><div ng-repeat=\"(tIndex,title) in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{((tIndex + 1)) + \': \' + title.content}}</h4><label>得分: {{title.percent}}</label></div><div style=\"margin: 10px\"><label>答案:</label><p>{{title.answer}}</p></div><div><md-button ng-if=\"vm.filterCorrect(title.answers).length > 0\" ng-click=\"vm[\'_\'+bIndex + \'_\' + tIndex + \'_\'] = !vm[\'_\'+bIndex + \'_\' + tIndex + \'_\']\">参考答案</md-button><div ng-if=\"vm[\'_\'+bIndex + \'_\' + tIndex + \'_\']\" layout=\"row\" ng-repeat=\"(aIndex,answer) in vm.filterCorrect(title.answers)\"><label>{{aIndex+1}}:</label><p style=\"margin: 0px 20px\">{{answer.content}}</p></div></div></div></div></div></div></div></form>");
$templateCache.put("app/work/correct/correct.html","<form name=\"vm.correctForm\" class=\"md-whiteframe-z1\" layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">试卷</div><md-button ng-click=\"back()\">返回</md-button><md-button ng-click=\"vm.submit($event)\">提交</md-button></md-toolbar><div layout=\"column\" style=\"background-color: white; padding-bottom: 550px\"><div layout-align=\"center center\" layout=\"column\"><h1>{{vm.exam.name}}</h1><div layout=\"row\"><h3>{{\'共\' + vm.exam.titles.length + \' 题, 满分: \' + vm.exam.percent + \'分\' }}</h3><h2>学生: {{vm.userarrange.user.name}}</h2></div></div><div layout=\"column\"><div layout=\"row\" layout-align=\"center center\"><div style=\"height: 5px; width: 300px\" class=\"answerAllRight\"></div><label flex=\"\">代表你选到答案,同时也是正确答案</label></div><div layout=\"row\" layout-align=\"center center\"><div style=\"height: 5px; width: 300px\" class=\"answerYou\"></div><label flex=\"\">代表你选到答案,但不是正确答案</label></div><div layout=\"row\" layout-align=\"center center\"><div style=\"height: 5px; width: 300px\" class=\"answerRight\"></div><label flex=\"\">代表正确答案</label></div></div><div style=\"border: dotted 1px #aaa;\"></div><div ng-repeat=\"(bIndex, bigTitle) in vm.exam.titles\" style=\"margin: 10px 5px;\"><h2 flex=\"\">{{((bIndex + 1) | sequence:\'zh\')+ \' : \' + bigTitle.name + \'(每题 \' + bigTitle.percent + \"分, 共\" + bigTitle.titles.length + \" * \" + bigTitle.percent + \"= \" + (bigTitle.titles.length * bigTitle.percent) + \" 分)\"}}</h2><div ng-switch=\"bigTitle.type\"><div ng-switch-when=\"0\"><div ng-repeat=\"(tIndex,title) in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{((tIndex + 1)) + \': \' + title.content + \' (分数: \' + (title.percent || 0) + \' 分)\'}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-radio-group><md-radio-button ng-repeat=\"(aIndex, answer) in title.answers\" style=\"margin-left: 10px\" disabled=\"\" ng-model=\"answer.select\" ng-class=\"{\'2\':\'answerAllRight\', \'1\':\'answerRight\', \'0\': \'answerYou\'}[answer.correct ? answer.select ? \'2\' : \'1\' : answer.select ? \'0\' : \'-1\']\">{{(aIndex | abcd:\'upper\') + \'. \' + answer.content}}</md-radio-button></md-radio-group></div></div><div ng-switch-when=\"1\"><div ng-repeat=\"(tIndex,title) in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{((tIndex + 1)) + \': \' + title.content + \' (分数: \' + (title.percent || 0) + \' 分)\'}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-checkbox disabled=\"\" ng-repeat=\"(aIndex,answer) in title.answers\" style=\"margin-left: 10px\" ng-model=\"answer.select\" ng-class=\"{\'2\':\'answerAllRight\', \'1\':\'answerRight\', \'0\': \'answerYou\'}[answer.correct ? answer.select ? \'2\' : \'1\' : answer.select ? \'0\' : \'-1\']\">{{(aIndex | abcd:\'upper\') + \'. \' + answer.content}}</md-checkbox></div></div><div ng-switch-default=\"\"><div ng-repeat=\"(tIndex,title) in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{((tIndex + 1)) + \': \' + title.content}}</h4></div><div style=\"margin: 10px\"><label>答案:</label><p>{{title.answer}}</p></div><md-input-container><label>分数</label> <input type=\"number\" required=\"\" ng-model=\"title.percent\"></md-input-container><div><md-button ng-if=\"vm.filterCorrect(title.answers).length > 0\" ng-click=\"vm[\'_\'+bIndex + \'_\' + tIndex + \'_\'] = !vm[\'_\'+bIndex + \'_\' + tIndex + \'_\']\">参考答案</md-button><div ng-if=\"vm[\'_\'+bIndex + \'_\' + tIndex + \'_\']\" layout=\"row\" ng-repeat=\"(aIndex,answer) in vm.filterCorrect(title.answers)\"><label>{{aIndex+1}}:</label><p style=\"margin: 0px 20px\">{{answer.content}}</p></div></div></div></div></div></div></div></form>");
$templateCache.put("app/exam/info/examInfo.html","<md-content class=\"md-whiteframe-z1\" layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">试卷</div><md-button ng-click=\"vm.arrange($event)\">下发试卷</md-button><md-button ng-click=\"back()\">返回</md-button></md-toolbar><div layout=\"column\" style=\"background-color: white; padding-bottom: 550px\"><div layout-align=\"center center\" layout=\"column\"><h1>{{vm.exam.name}}</h1><h3>{{\'共\' + vm.exam.titles.length + \' 题, 满分: \' + vm.exam.percent + \'分\' }}</h3></div><div style=\"border: dotted 1px #aaa;\"></div><div ng-repeat=\"bigTitle in vm.exam.titles\" style=\"margin: 10px 5px;\"><h2 flex=\"\">{{(($index + 1) | sequence:\'zh\')+ \' : \' + bigTitle.name + \'(每题 \' + bigTitle.percent + \"分, 共\" + bigTitle.titles.length + \" * \" + bigTitle.percent + \"= \" + (bigTitle.titles.length * bigTitle.percent) + \" 分)\"}}</h2><div ng-switch=\"bigTitle.type\"><div ng-switch-when=\"0\"><div ng-repeat=\"title in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{(($index + 1)) + \': \' + title.content}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-radio-group ng-model=\"title.answerId\"><md-radio-button ng-repeat=\"answer in title.answers\" style=\"margin-left: 10px\" data-ng-value=\"answer.id\">{{($index | abcd:\'upper\') + \'. \' + answer.content}}</md-radio-button></md-radio-group></div></div><div ng-switch-when=\"1\"><div ng-repeat=\"title in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{(($index + 1)) + \': \' + title.content}}</h4><label style=\"margin:0px 10px;\">(&nbsp;&nbsp;&nbsp;&nbsp;)</label></div><md-checkbox ng-repeat=\"answer in title.answers\" style=\"margin-left: 10px\" ng-model=\"answer.select\">{{($index | abcd:\'upper\') + \'. \' + answer.content}}</md-checkbox></div></div><div ng-switch-default=\"\"><div ng-repeat=\"title in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px;\"><div layout=\"row\" layout-align=\"center center\"><h4 style=\"color: #333333\" flex=\"\">{{(($index + 1)) + \': \' + title.content}}</h4></div><md-input-container><label>答案:</label> <textarea ng-model=\"title.answer\" style=\"min-height: 300px\"></textarea></md-input-container></div></div></div></div></div></md-content>");
$templateCache.put("app/exam/list/examList.html","<md-content layout=\"column\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">我的试卷</div><md-button ng-href=\"/#/main/exam/add\">添加</md-button></md-toolbar><div><div layout=\"column\" ng-repeat=\"title in vm.user.examinations\"><a ng-href=\"/#/main/exam/info?id={{title.id}}\" class=\"link container-padding\" flex=\"\"><div layout=\"row\" layout-align=\"center center\"><h3>{{$index+1}}</h3><span class=\"split-30\"></span><div layout=\"column\" flex=\"\"><span><h2>{{title.name}}</h2></span> <label>{{title.description}}</label></div></div></a><div class=\"list-divider\" ng-if=\"!$last\"></div></div><div ng-if=\"!vm.user.titles || vm.user.examinations.length === 0\"><md-button ng-href=\"/#/main/exam/add\">没有出过试卷，点此添加</md-button></div></div></md-content>");
$templateCache.put("components/template/dlg/rest.error.html","<md-dialog aria-label=\"输入\"><md-content layout=\"column\" layout-align=\"center center\"><h2>{{vm.title}}</h2><br><p>{{vm.content}}</p><br><md-button ng-click=\"vm.cancel()\">确定</md-button></md-content></md-dialog>");
$templateCache.put("components/template/dlg/rest.progress.html","<md-dialog aria-label=\"输入\"><md-content layout=\"column\" layout-align=\"center center\"><h2>{{vm.content}}</h2><br><md-progress-circular md-mode=\"indeterminate\"></md-progress-circular></md-content></md-dialog>");
$templateCache.put("app/exam/add/examAdd.html","<form name=\"vm.addForm\" class=\"md-whiteframe-z1\" layout=\"column\" novalidate=\"\" flex=\"\"><md-toolbar layout=\"row\"><div class=\"md-toolbar-tools\" flex=\"\">试卷</div><md-button ng-click=\"vm.saveExamination($event)\" ng-if=\"vm.addForm.$valid\">保存试卷</md-button><md-button ng-click=\"back()\">返回</md-button></md-toolbar><div layout=\"column\" style=\"background-color: white\"><md-input-container layout-align=\"center center\" style=\"font-size: large;\"><label>试卷名称</label> <input required=\"\" ng-model=\"vm.exam.name\" name=\"examName\"><div ng-messages=\"vm.addForm.examName.$error\"><div ng-message=\"required\">*</div></div></md-input-container><div ng-repeat=\"bigTitle in vm.exam.bigTitles\" style=\"background-color: #eee;margin: 10px 5px;\"><h2>{{($index + 1)+ \' : \' + bigTitle.name + \'(每题 \' + bigTitle.percent + \" 分)\"}}</h2><div ng-repeat=\"title in bigTitle.titles\" style=\"margin-bottom: 10px;padding: 10px; background: #dedede\"><div layout=\"row\"><h4 style=\"color: #333333\" flex=\"\">{{($index + 1) + \': \' + title.content}}</h4><md-button class=\"md-raised md-primary\" ng-click=\"vm.deleteTitle(bigTitle, title, $index, $event)\">删除</md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.up(bigTitle, title, $index, $event)\" ng-if=\"!$first\">上移</md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.down(bigTitle, title, $index, $event)\" ng-if=\"!$last\">下移</md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.upTop(bigTitle, title, $index, $event)\" ng-if=\"!$first\">移到顶</md-button><md-button class=\"md-raised md-primary\" ng-click=\"vm.downBottom(bigTitle, title, $index, $event)\" ng-if=\"!$last\">移到底</md-button></div><div ng-if=\"bigTitle.type === 0 || bigTitle.type === 1\"><div ng-repeat=\"answer in title.answers\" style=\"margin-left: 10px\" ng-class=\"{true:\'trueColor\', false:\'falseColor\'}[answer.correct]\"><label>{{$index | abcd:\'upper\'}}.</label> <label>{{answer.content}}</label></div></div></div><div ng-if=\"vm.enableTitleAdds[$index]\" style=\"margin-bottom: 10px;padding: 10px; background: #dedede\"><md-input-container><label>题目</label> <textarea required=\"\" ng-model=\"vm.addTitle.content\" name=\"titleContent\"></textarea><div ng-messages=\"vm.addForm.titleContent.$error\"><div ng-message=\"required\">*</div></div></md-input-container><md-input-container><label>描述</label> <textarea required=\"\" ng-model=\"vm.addTitle.description\" name=\"titleDescription\"></textarea><div ng-messages=\"vm.addForm.titleDescription.$error\"><div ng-message=\"required\">*</div></div></md-input-container><div ng-repeat=\"answer in vm.addTitle.answers\"><div layout=\"row\" layout-align=\"center center\"><label>{{$index | abcd:\'upper\'}}.</label><md-input-container flex=\"\"><label>答案</label> <textarea required=\"\" ng-model=\"answer.content\" name=\"answerName\"></textarea><div ng-messages=\"vm.addForm.answerName.$error\"><div ng-message=\"required\">*</div></div></md-input-container><md-checkbox ng-model=\"answer.correct\">是否为正确答案</md-checkbox></div></div><md-button class=\"md-primary\" ng-if=\"vm.addForm.$valid\" ng-click=\"vm.saveTitle(bigTitle, $index, $event)\">保存题目</md-button><md-button class=\"md-primary\" ng-click=\"vm.addTitle.answers.push({})\">添加答案</md-button><md-button class=\"md-primary\" ng-click=\"vm.addTitle = {answers:[]}\">清除内容</md-button></div><div layout=\"row\"><md-button class=\"md-primary\" ng-click=\"vm.selectTitle(bigTitle, $event)\">选择题目</md-button><md-button class=\"md-primary\" ng-click=\"vm.enableTitleAdds[$index]=!vm.enableTitleAdds[$index]\">{{vm.enableTitleAdds[$index] ? \'取消添加\' : \'新增题目\'}}</md-button></div></div><div ng-if=\"vm.addBigTitle\" style=\"background-color: #eee;margin: 10px 5px;\"><label>题目类型:</label><md-input-container flex=\"\"><md-select placeholder=\"请选择\" required=\"\" ng-model=\"vm.addBig.type\" name=\"type\"><md-option data-ng-value=\"type.id\" ng-repeat=\"type in Config.TitleTypes\">{{type.name}}</md-option></md-select><div ng-messages=\"vm.addForm.type.$error\"><div ng-message=\"required\">*</div></div></md-input-container><md-input-container><label>每题分值</label> <input type=\"number\" required=\"\" ng-model=\"vm.addBig.percent\" name=\"percent\"><div ng-messages=\"vm.addForm.percent.$error\"><div ng-message=\"required\">*</div></div></md-input-container><md-button class=\"md-raised md-primary\" ng-if=\"vm.addForm.$valid\" ng-click=\"vm.addBTitle($event)\">添加</md-button></div><md-button ng-click=\"vm.addBigTitle = true\" ng-if=\"!vm.addBigTitle\">添加大题</md-button></div></form>");}]);