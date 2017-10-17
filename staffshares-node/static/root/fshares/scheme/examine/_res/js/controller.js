var app = angular.module('schmExamine', ['toastr']);
app.controller('schmExamineCtrl', function($scope, schmSer,$stateParams,$state,toastr){
    var webData ={id: $stateParams.id};

    //获取ID
    schmSer.schmFindId(webData).then(function(response){
        if(response.data.code==0){
            $scope.sch = response.data.data;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }

    });

    //编辑点击提交
    $scope.schEditFun = function(){
        var vm = $scope;
        schmSer.schmExamine(vm.sch).then(function(response){
            if(response.data.code == 0){
                $state.go('root.fshares.scheme.list[12]');
                toastr.success( "编辑成功", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };
});





