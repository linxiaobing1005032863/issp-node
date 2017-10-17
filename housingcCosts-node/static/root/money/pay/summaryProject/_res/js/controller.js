var app = angular.module('summaryProject', ['toastr','angularjs-dropdown-multiselect','ng-laybox']);
app.controller('summaryProjectCtrl', function($scope, paingSer,toastr){
    $scope.project = [];
    $scope.stringSettings = {template : '{{option}}', smartButtonTextConverter(skip, option) { return option; }};
    $scope.show =false;
    $scope.lists = ['地区','项目','年份','月份','房租地址','租金','水费','电费','管理费','其他费用','合计','房东姓名','联系电话','交租确认'];
    $scope.contrast = ['area','project','year','month','rentAddress','rent','water','energy','fee','otherFee','total','landlord','contact','taxesConfirm'];
    $scope.layData = {
      titles: $scope.lists,
      theme:'汇总详情',
      style:{
          width:700,
          height:450
      }
    };
    $scope.layClick = function(val){//弹出框的触发事件
        if(val=='合计' || $scope.isShow)return;
        if(val){
            var arr = [val];
            $scope.collect(false,arr);
        }
    }
    
    //获取项目
    paingSer.projectPaying().then(function(response){
        if(response.data.code == 0){
            $scope.workOptions = response.data.data;
        }else {
            toastr.error(response.data.msg,'温馨提示')
        }
    });
    
    //修改时间格式
    $scope.back = function(val,bool){
        var time = val.split('-').splice(0,2).join('-');
        if(bool)$scope.start = time;
        if(!bool)$scope.end = time;
    }
    var year = new Date().getFullYear();
    var month = new Date().getMonth()+1;
    if(month<10)month = '0'+month;
    $scope.start = $scope.end = year + '-' + month;
    $scope.collect = function(bool,isLay){
        var vm = $scope;
        var o = isLay ||  vm.project;
        vm.sum={
            startTime:$scope.start,
            endTime:$scope.end,
            projects:o.join(',')
        };
        if(!$scope.start || !$scope.end){
            toastr.info( '请填写日期', '温馨提示');
            return;
        }
        if(bool){//汇总
            paingSer.summaryProject(vm.sum).then(function(response){
                if(response.data.code == 0){
                    $scope.isShow = false;
                    $scope.summaryLists = response.data.data;
                    if($scope.summaryLists[0].year){
                        $scope.isDate = $scope.summaryLists[0].year;
                    }
                }else{
                    toastr.error( response.data.msg, '温馨提示');
                }
            })
        }else if(!bool){//汇总详情
            paingSer.summaryProjectDetail(vm.sum).then(function(response){
                if(response.data.code == 0){
                    if(isLay){
                        var arr = [];
                        var data = response.data.data;
                        for(var i = 0;i< data.length;i++){
                            var o = {};
                            for(var j = 0;j < $scope.contrast.length;j++){
                                var p = $scope.contrast[j];
                                var v = data[i][p];
                                o[p] = v;
                            }
                            arr.push(o);
                        }
                        $scope.layData.lists = arr;
                        $scope.show = true;
                    }else {
                        $scope.summaryLists = response.data.data;
                        $scope.isShow = true;
                    }
                }else{
                    toastr.error( response.data.msg, '温馨提示');
                }
            })
        }
        
    };
});





