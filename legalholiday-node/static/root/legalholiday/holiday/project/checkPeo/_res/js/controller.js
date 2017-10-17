var app = angular.module('checkPeo', ['toastr']);
app.controller('checkPeoCtrl', function($scope, projectSer,$state,toastr,$stateParams){
    var companyId = {id : $stateParams.id};
    //查看更多
    $scope.moreList = function(event){
        angular.forEach($scope.checkPeoList.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };
    
    //获取值
    function activatePage(page) {
        var listData = {
            page:page,
            id:$stateParams.id
        }
        projectSer.checkPeoList(listData).then(function(response){
            if(response.data.code==0){
                $scope.checkPeoLists = response.data;
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    }

    $scope.project = {
        itemsCount: 9, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };
    projectSer.checkPeoCount(companyId).then(function(response){
        if(response.data.code == 0){
            $scope.project.itemsCount = response.data.data;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }
    });
});
   