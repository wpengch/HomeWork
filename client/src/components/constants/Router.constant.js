/**
 * 创建人：pengchao
 * 创建时间：2015-3-26-0026
 * 工厂名字：Router
 * 作用：路由配置
 */
(function () {
    'use strict';

    angular.module('home').constant('Router', {
        main: {
            name: 'main',
            url: '/main',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'vm',
            children: [
                {
                    name: 'user',
                    url: '/user',
                    templateUrl: 'app/user/user.html',
                    controller: 'UserCtrl',
                    controllerAs: 'vm',
                    children: [
                        {
                            name: 'list',
                            templateUrl: 'app/user/list/UserList.html',
                            controller: 'UserListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'info',
                            url: '/info/:id',
                            templateUrl: 'app/user/info/UserInfo.html',
                            controller: 'UserInfoCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'change',
                            url: '/change/:id',
                            templateUrl: 'app/user/change/UserChange.html',
                            controller: 'UserChangeCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'add',
                            url: '/add',
                            templateUrl: 'app/user/add/UserAdd.html',
                            controller: 'UserAddCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name: 'dep',
                    url: '/dep',
                    templateUrl: 'app/dep/Department.html',
                    controller: 'DepartmentCtrl',
                    controllerAs: 'vm',
                    children: [
                        {
                            name: 'list',
                            url: '/list',
                            templateUrl: 'app/dep/list/DepartmentList.html',
                            controller: 'DepartmentListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'change',
                            url: '/change/:id',
                            templateUrl: 'app/dep/change/DepartmentChange.html',
                            controller: 'DepartmentChangeCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'add',
                            url: '/add?typeId&depId',
                            templateUrl: 'app/dep/add/DepartmentAdd.html',
                            controller: 'DepartmentAddCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name: 'position',
                    url: '/position',
                    templateUrl: 'app/position/Position.html',
                    controller: 'PositionCtrl',
                    controllerAs: 'vm',
                    children: [
                        {
                            name: 'list',
                            url: '/list/:depId/postions',
                            templateUrl: 'app/position/list/PositionList.html',
                            controller: 'PositionListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'depAdd',
                            url: '/list/:depId/depadd',
                            templateUrl: 'app/position/depadd/DepPostAdd.html',
                            controller: 'DepPostAddCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'change',
                            url: '/change/:id',
                            templateUrl: 'app/position/change/PositionChange.html',
                            controller: 'PositionChangeCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'add',
                            url: '/add',
                            templateUrl: 'app/position/add/PositionAdd.html',
                            controller: 'PositionAddCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name: 'new',
                    url: '/new',
                    templateUrl: 'app/inf/new/new.html',
                    controller: 'NewCtrl',
                    controllerAs: 'vm',
                    children: [
                        {
                            name: 'list',
                            url: '/list',
                            templateUrl: 'app/inf/new/list/news.html',
                            controller: 'NewsCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'preview',
                            url: '/preview',
                            templateUrl: 'app/inf/new/preview/NewPreview.html',
                            controller: 'NewPreviewCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'add',
                            url: '/add',
                            templateUrl: 'app/inf/new/add/NewAdd.html',
                            controller: 'NewAddCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'info',
                            url: '/info/:id',
                            templateUrl: 'app/inf/new/info/NewInfo.html',
                            controller: 'NewInfoCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name: 'notice',
                    url: '/notice',
                    templateUrl: 'app/inf/notice/Notice.html',
                    controller: 'NoticeCtrl',
                    controllerAs: 'vm',
                    children: [
                        {
                            name: 'list',
                            url: '/list',
                            templateUrl: 'app/inf/notice/list/NoticeList.html',
                            controller: 'NoticeListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'add',
                            url: '/add',
                            templateUrl: 'app/inf/notice/add/NoticeAdd.html',
                            controller: 'NoticeAddCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'preview',
                            url: '/preview',
                            templateUrl: 'app/inf/notice/preview/NoticePreview.html',
                            controller: 'NoticePreviewCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'info',
                            url: '/info/:id',
                            templateUrl: 'app/inf/notice/info/NoticeInfo.html',
                            controller: 'NoticeInfoCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name: 'process',
                    url: '/process',
                    templateUrl: 'app/process/process.html',
                    controller: 'ProcessCtrl',
                    controllerAs: 'vm',
                    children: [
                        {
                            name: 'model',
                            url: '/model',
                            templateUrl: 'app/process/model/model.html',
                            controller: 'ModelCtrl',
                            controllerAs: 'vm',
                            children: [
                                {
                                    name: 'list',
                                    url: '/list',
                                    templateUrl: 'app/process/model/list/model.list.html',
                                    controller: 'ModelListCtrl',
                                    controllerAs: 'vm'
                                },
                                {
                                    name:'info',
                                    url:'/info/:id',
                                    templateUrl: 'app/process/model/info/ModelInfo.html',
                                    controller: 'ModelInfoCtrl',
                                    controllerAs: 'vm'
                                }
                            ]
                        },
                        {
                            name: 'deployment',
                            url: '/deployment',
                            templateUrl: 'app/process/deployment/Deployment.html',
                            controller: 'DeploymentCtrl',
                            controllerAs: 'vm',
                            children: [
                                {
                                    name: 'list',
                                    url: '/list',
                                    templateUrl: 'app/process/deployment/list/DeploymentList.html',
                                    controller: 'DeploymentListCtrl',
                                    controllerAs: 'vm'
                                }
                            ]
                        },
                        {
                            name: 'definition',
                            url: '/definition',
                            templateUrl: 'app/process/definition/Definition.html',
                            controller: 'DefinitionCtrl',
                            controllerAs: 'vm',
                            children: [
                                {
                                    name: 'list',
                                    url: '/list',
                                    templateUrl: 'app/process/definition/list/DefinitionList.html',
                                    controller: 'DefinitionListCtrl',
                                    controllerAs: 'vm'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        login: {
            name: 'login',
            url: '/',
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm'
        },
        register:{
            name:'register',
            url:'/register?type',
            templateUrl:'app/register/Register.html',
            controller: 'RegisterController',
            controllerAs:'vm'
        }
    });
})();
