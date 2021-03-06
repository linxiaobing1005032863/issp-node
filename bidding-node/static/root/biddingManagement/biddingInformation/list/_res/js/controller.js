var app = angular.module('infoList', ['ng-pagination','toastr']);
app.controller('infoListCtrl',function($scope,infoSer,toastr,$stateParams,$state,$location){
    $scope.$emit('changeId', null);
    //删除
    //获取id
    
    if($stateParams.id){
        switch ($stateParams.name){
            case 'delete':
                $scope.delShow = true;
                break;
        }
    }
    $scope.cancel = function(){//取消删除
        $scope.delShow = false;
        $state.go('' +
            'root.biddingManagement.biddingInformation.list[12]',{id:null,name:null});
    };
    var count=0;
    $scope.delFn = function(){//确认删除

        var data = {
            id:$stateParams.id
        };
        infoSer.deleteInfo(data).then(function(response){
            if(response.data.code==0){
                count++;
                toastr.info( "信息已删除", '温馨提示');
                $scope.deledId = $stateParams.id;
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.biddingManagement.biddingInformation.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.biddingManagement.biddingInformation.list[12]',{id:null,name:null,page:$stateParams.page-1});
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    //监听切换搜索是否出现
    $scope.$on('iSsearch',function(event,newIs){
        $scope.isView = newIs;
    });
    //获取搜索字段
    $scope.webName = $stateParams.webName?$stateParams.webName:'';
    $scope.url = $stateParams.url?$stateParams.url:'';
    $scope.provinces = $stateParams.provinces?$stateParams.provinces:'';
    $scope.cities = $stateParams.cities?$stateParams.cities:'';
    if($stateParams.webName || $stateParams.url || $stateParams.provinces || $stateParams.cities){
        $scope.$emit('isId', false);
        $scope.isView = false;
    }else{
        $scope.$emit('isId', true);
    }
    //搜索
    $scope.collect = function(){
        $state.go('root.biddingManagement.biddingInformation.list[12]',{webName:$scope.webName,url:$scope.url,provinces:$scope.provinces,cities:$scope.cities,page:1});
    }
    function activatePage(page) {
        var data = {
                webName: $scope.webName || " ",
                url: $scope.url || " ",
                provinces: $scope.provinces || " ",
                cities: $scope.cities || " ",
                page: page || 1
            };
        infoSer.infoList(data).then(function(response){
            if(response.data.code == 0){
                $scope.infoLists = response.data.data;
                if($stateParams.id){
                    angular.forEach($scope.infoLists,function(obj){
                        if(obj.id == $stateParams.id){
                            obj._selectList = true;
                        }
                    });
                    //向父Ctrl传递事件
                    $scope.$emit('changeId', $stateParams.id);
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
        infoSer.countInfo(data).then(function(response){
            if(response.data.code==0){
                $scope.custom.itemsCount = response.data.data;
                $scope.num = $location.search().page*10>10?($location.search().page-1)*10:null;
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        })
    }
    // 搜索功能字段
    $scope.titles = ['网站名称','网址','省份','地市'];
    $scope.selectList = function(event){
        angular.forEach($scope.infoLists,function(obj){
                obj._selectList = false
        });
        event._selectList = true;
        $scope.idListd = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idListd);
        $scope.$emit('page',$location.search().page);
    };
    //点击更多详细
    $scope.moreList = function(event){
        angular.forEach($scope.infoLists,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };

//分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };
});

