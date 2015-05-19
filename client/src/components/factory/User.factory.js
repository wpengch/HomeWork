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
