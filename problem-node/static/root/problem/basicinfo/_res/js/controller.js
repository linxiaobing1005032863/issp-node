var app = angular.module('basicinfo', [{
    files:[
      //  "root/customer/basicinfo/_res/js/service.js"
    ]
}]);
app.controller('basicinfoCtrl',function ($scope,$state) {

    if ($state.current.url == '/basicinfo') {//默认加载列表
        $state.go('root.problem.basicinfo.list');
        console.log("需要加载列表咯")
    }

}).controller('basicinfoMenuCtrl',function($scope,$state){

    //监听到父Ctrl后改变事件
  /*  $scope.$on("listId", function(event, msg){
        $scope.idList = msg;
    });
    $scope.$on("getCustomer", function(event, num){
        $scope.customerNum = num;
    });*/
});
//自定义过滤器
app.filter('cover', function(){
    return function(val){
        var result;
        switch(val){
            case "WOMAN":
                result = "女";
                break;
            case "MAN":
                result = "男";
                break;
            case "VIP":
                result = "VIP";
                break;
            case "OLD":
                result = "老客户";
                break;
            case "COOPERATOR":
                result = "合作伙伴";
                break;
            case "ORDINARY":
                result = "普通客户";
                break;
            case "COMPLETEPROJECT":
                result = "已完成项目客户";
                break;
            case "PROJECTING":
                result = "现项目客户";
                break;
            case "POTENTIAL":
                result = "潜在客户";
                break;
            case "THAW":
                result = "解冻";
                break;
            case "CONGEAL":
                result = "冻结";
                break;
            case "DELETE":
                result = "删除";
                break;
            case "NOACTIVE":
                result = "未激活";
                break;
            case "UNREVIEW":
                result = "未审核";
                break;
        }
        return result;
    }

})

