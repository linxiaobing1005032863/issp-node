var app = angular.module('materialAdd', ['toastr','ipCookie']);
app.controller('materialAddCtrl', function($scope,$state,toastr,materialSer,ipCookie,$location){

    $scope.materialAddFun = function(){
        $scope.add.suitableDateStart=angular.element('.starttime').val();
        $scope.add.suitableDateEnd=angular.element('.endtime').val();
        materialSer.addMaterial($scope.add).then(function(response){
            if(response.data.code == 0){
                $state.go('root.contract.material.list');
                toastr.success( $scope.add.customerName+"已成功添加", '温馨提示');
            }else if(response.data.code==403||response.data.code==401){
                toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes' });
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },2000)
            }
        });
    };
});





