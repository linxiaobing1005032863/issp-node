var app = angular.module('infoAdd', ['toastr']);
app.controller('infoAddCtrl', function ($scope, infoSer, $state, toastr) {
    //获取网站名称
    infoSer.websiteName().then(function(response){
        if(response.data.code==0){
            $scope.webNames = response.data.data;
        }else{
            toastr.error(response.data.msg, '温馨提示');
        }
    });
        //获取网址
    infoSer.websiteUrl().then(function(response){
        if(response.data.code==0){
            $scope.urls = response.data.data;
        }else{
            toastr.error(response.data.msg, '温馨提示');
        }
    });
    //添加
    $scope.infoAddFun = function () {
        var vm = $scope;
        vm.information.webName = angular.element('.webName').val();
        vm.information.url = angular.element('.url').val();
        
        vm.information.registrationTime = angular.element('.registrationTime').val();
        vm.information.biddingTime = angular.element('.biddingTime').val();
        vm.information.buyTenderTime = angular.element('.buyTenderTime').val();
        vm.information.marginTime = angular.element('.marginTime').val();
        vm.information.backTimeDeposit = angular.element('.backTimeDeposit').val();
        infoSer.addInfo(vm.information).then(function (response) {
            if (response.data.code == 0) {
                $state.go('root.biddingManagement.biddingInformation.list');
                toastr.success("已成功添加", '温馨提示');
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });

    };

});




