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
        courseSelectedvm.selects = [];
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
