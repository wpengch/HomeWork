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
