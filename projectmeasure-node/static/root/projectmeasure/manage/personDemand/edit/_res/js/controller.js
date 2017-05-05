/**
 * Created by ike on 2017/4/18.
 */
var app = angular.module('companyEdit', ['toastr']);
app.controller('companyEditCtrl', function($scope, marketserveSer,$state,toastr,$stateParams){
    var companyId = {id : $stateParams.id};
    //获取值
    marketserveSer.getOneById(companyId).then(function(response){
        if(response.data.code==0){
            $scope.data = response.data.data;
        }
    });
    //点击提交
    $scope.EditFun =function(){
        var data = $scope.data;
        data.id = companyId.id;
        marketserveSer.marketserveapplyEdit(data).then(function(response){
            if(response.data.code == 0){
                $state.go('root.projectmeasure.manage.personDemand.list');
                toastr.success('温馨提示',"此次编辑成功");
            }if(response.data.code == 403){
                toastr.error('温馨提示','提交错误')
            }
        })
    }
    
});
   