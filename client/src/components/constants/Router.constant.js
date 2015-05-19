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
                    templateUrl: 'app/user/User.html',
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
                            url: '/add?depId&type',
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
                    name: 'course',
                    url: '/course',
                    templateUrl: 'app/course/Course.html',
                    controller: 'CourseCtrl',
                    controllerAs: 'vm',
                    children:[
                        {
                            name: 'list',
                            url: '/list',
                            templateUrl: 'app/course/list/CourseList.html',
                            controller: 'CourseListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'students',
                            url: '/students?id',
                            templateUrl: 'app/course/student/StudentList.html',
                            controller: 'StudentListCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name: 'title',
                    url: '/title',
                    templateUrl: 'app/title/Title.html',
                    controller: 'TitleCtrl',
                    controllerAs: 'vm',
                    children:[
                        {
                            name: 'list',
                            url: '/list',
                            templateUrl: 'app/title/list/TitleList.html',
                            controller: 'TitleListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'info',
                            url: '/info?id',
                            templateUrl: 'app/title/info/TitleInfo.html',
                            controller: 'TitleInfoCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'add',
                            url: '/add',
                            templateUrl: 'app/title/add/TitleAdd.html',
                            controller: 'TitleAddCtrl',
                            controllerAs: 'vm'
                        }
                    ]
                },
                {
                    name: 'exam',
                    url: '/exam',
                    templateUrl: 'app/exam/exam.html',
                    controller: 'ExamCtrl',
                    controllerAs: 'vm',
                    children:[
                        {
                            name: 'list',
                            url: '/list',
                            templateUrl: 'app/exam/list/examList.html',
                            controller: 'ExamListCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'info',
                            url: '/info?id',
                            templateUrl: 'app/exam/info/examInfo.html',
                            controller: 'ExamInfoCtrl',
                            controllerAs: 'vm'
                        },
                        {
                            name: 'add',
                            url: '/add',
                            templateUrl: 'app/exam/add/examAdd.html',
                            controller: 'ExamAddCtrl',
                            controllerAs: 'vm'
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
