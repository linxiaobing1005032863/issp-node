var app = angular.module('scheme', [{
    files:[
        "root/fshares/scheme/_res/js/service.js",
    ]
}]);
app.controller('schmCtrl',function ($scope,$state) {
    if ($state.current.url == '/scheme') {//默认加载列表
        $state.go('root.fshares.scheme.list[12]')
    }
    $scope.$emit('isVi',false);//判断是否出现搜索按钮
}).controller('schmMenuCtrl',function($scope,$state,$rootScope,$location,schmSer){
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass=urlName+"Menu";
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]' && window.location.href.indexOf('id=') == -1){
            $scope.menuClass = 'listMenu';
        }
    });
    //新增
    if (window.location.href.split('id=')[1]) {//如果是刷新进来的页面，没有经过list
        $scope.idListd = window.location.href.split('id=')[1];
        if($location.search().name){
            $scope.menuClass =$location.search().name + 'Menu';
        }
    }
    $scope.menuCheck = function (name) {
        var buttonName = name;
        $scope.buttonShow = true;
        schmSer.schmPermission(buttonName).then(function(response){
            if(response.data.code == 0 && response.data.data){
                $scope[buttonName] = true;
            }else{
                $scope[buttonName] = false;
            }
        });
        $scope.menuAdd = false;
    };
    //监听到父Ctrl后改变事件
    $scope.$on("getId", function(event, msg){
       $scope.idListd = msg;
    });

    $scope.$on('pageId',function(event,flag){
        $scope.page = flag;
    });
    if(!$scope.page){
        $scope.page =$location.search().page;
    }
    $scope.delete = function(){
        if($scope.idListd){
            $state.go('root.fshares.scheme.list[12]',{id:$scope.idListd,name:'delete',page:$scope.page});
            $scope.menuClass = 'deleteMenu'
        }
    };

    $scope.edit = function(){
        if($scope.idListd){
            $state.go('root.fshares.scheme.edit[12]',{id:$scope.idListd,page:$scope.page});
            $scope.menuClass = 'editMenu'
        }
    };
    $scope.issue = function(){
        if($scope.idListd){
            $state.go('root.fshares.scheme.issue[12]',{id:$scope.idListd,page:$scope.page});
            $scope.menuClass = 'issueMenu'
        }
    };
    $scope.examine = function(){
        if($scope.idListd){
            $state.go('root.fshares.scheme.examine[12]',{id:$scope.idListd,page:$scope.page});
            $scope.menuClass = 'examineMenu'
        }
    };
    $scope.list = function(){
        $scope.menuClass = 'listMenu'
    };
    $scope.add = function(){
        $scope.menuClass = 'addMenu';
        $scope.idListd = ''
    };
    schmSer.schmPermission().then(function(response){
        if(response.data.code == 0){
            var data = response.data.data;
            if(data && data.length){
                $scope.isHide = false;
                for(var i =0,len=data.length;i<len;i++){
                    var obj = data[i];
                    $scope[obj.name]=obj.flag;
                }
            }else if(response.data.data.length == 0){
                $scope.isHide = true;
            }
        }else{
            $scope.isHide = false;
        }
    });
});
//自定义过滤
app.filter('cover1', function(){
    return function (val) {
        var result;
        switch(val){
            case "SUBMIT":
                result = "已提交待审核";
                break;
            case "EXAMINE":
                result = "审核通过待发行";
                break;
            case "DELETE":
                result = "删除";
                break;
            case "NOEXAMINE":
                result = "审核不通过";
                break;
            case "ISSUED":
                result = "已发行";
                break;
            case "PRIMITIVE":
                result = "原始股";
                break;
            case "PERFORMANCE":
                result = "绩效股";
                break;
            case "TRADABLE":
                result = "流通股";
                break;
        }
        return result;
    }
});

