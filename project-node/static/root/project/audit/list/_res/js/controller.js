var app = angular.module('auditList', ['ng-pagination','toastr','ipCookie']);
app.controller('auditListCtrl',function($scope,auditSer,toastr,ipCookie,$location) {
   //选择
    $scope.selectList = function(event){
        angular.forEach($scope.auditLists.data,function(obj){
            obj._selectList = false
        });
        event._selectList = true;
        $scope.idList = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idList);
    };
    //查看更多
    $scope.moreList = function(event){
        angular.forEach($scope.auditLists.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList = false
            }
        });
        event._moreList = !event._moreList;
    };

    function activatePage(page) {
        var listData = {
            page:page
        }
        auditSer.listAudit(listData).then(function(response){
            if(response.data.code==0){
                $scope.auditLists = response.data
            }else if(response.data.code==1){
                toastr.error( response.data.msg, '温馨提示');
            }else if(response.data.code==403||response.data.code==401){
                toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com'});
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },2000)
            }
        });
        $scope.collect = function(){
            $scope.abili = {
                itemsCount: 12,//总条数
                take: 10,        //每页显示
                activatePage: activatePage, //当前页
            };
            auditSer.countAudit2($scope.saleNum,$scope.signProjectCondition).then(function (response) {
                if(response.data.code==0){
                    $scope.abili.itemsCount = response.data.data;
                }else if(response.data.code==1){
                    toastr.error( response.data.msg, '温馨提示');
                }else if(response.data.code==403||response.data.code==401){
                    toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                    var absurl = $location.absUrl();
                    ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com'});
                    setTimeout(function(){
                        window.location.href='http://localhost/login'
                    },2000)
                }
            })
            var data = {
                saleNum: $scope.saleNum,
                signProjectCondition: $scope.signProjectCondition,
                page: page
            };
            auditSer.searchAudit(data).then(function(response){
                if(response.data.code == 0){
                    $scope.auditLists = response.data
                }else if(response.data.code==1){
                    toastr.error( response.data.msg, '温馨提示');
                }else if(response.data.code==403||response.data.code==401){
                    toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                    var absurl = $location.absUrl();
                    ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com'});
                    setTimeout(function(){
                        window.location.href='http://localhost/login'
                    },2000)
                }
            });
        };
    }
    $scope.abili = {
        itemsCount: 14, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };
    auditSer.countAudit().then(function(response){
        if(response.data.code==0){
            $scope.abili.itemsCount = response.data.data;
        }else if(response.data.code==1){
            toastr.error( response.data.msg, '温馨提示');
        }else if(response.data.code==403||response.data.code==401){
            toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
            var absurl = $location.absUrl();
            ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes',domain:'issp.bjike.com'});
            setTimeout(function(){
                window.location.href='http://localhost/login'
            },2000)
        }
    });
    //删除
    $scope.$on('deletedId',function(event,delid){
        angular.forEach($scope.auditLists.data,function(obj){
            if(obj.id == delid){
                obj._delete = true
            }
        })
    });
});
