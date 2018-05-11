var dataSourceApp = angular.module('dataSourceApp',['ngCookies']);
var recordsMap = {}
var dataSourceCollectState = {};

dataSourceApp
    .controller('dataSourceController',function ($cookieStore,$scope, $http,$interval,$timeout) {
        $scope.curDataSourceId = 0;
        $scope.user=$cookieStore.get("user");
        $scope.initNewDataSource={
            userId:$scope.user.id
            ,host:"localhost"
            ,port:80
        }
        $scope.newDataSource={
            userId:$scope.user.id
            ,host:"localhost"
            ,port:80
        }
        // 初始化数据源及其记录
        setDataSources($scope,$http,$timeout);
        // 设置开始统计事件监听
        setStartCollecting($scope,$http,$interval,$timeout);
        // 设置删除数据源事件监听
        setDeleteDataSource($scope,$http,$timeout);
        // 设置添加数据源事件监听
        setAddDataSource($scope,$http,$timeout);
        // 设置更改当前显示的记录事件监听
        setViewRecords($scope);
        // 设置删除记录事件监听
        setDeleteRecord($scope,$http,$timeout);
        $scope.hasRecords = function (dataSourceId) {
            if(recordsMap[dataSourceId]){
                var success_num = 0;
                recordsMap[dataSourceId].forEach(function(value){
                    if(value["result"]==1)
                        success_num++;
                });
                if(success_num>0)
                    return true;
            }
            return false;
        }
    })
    .directive("validHost",function () {
        return {
            require:'ngModel',//缺失的话，ctrl参数会未定义
            restrict:"EA",
            link:function (scope,ele,attrs,ctrl) {
                var target = attrs["validHost"];//获取自定义指令属性键值
                if (target) {//判断键是否存在
                    // scope.$watch(target, function () {//存在启动监听其值
                    //     ctrl.$validate()//每次改变手动调用验证
                    // }) // 似乎不需要手动调用，不知道在何处已经调用了一次

                    ctrl.$validators.validHost = function (modelValue, viewValue) {//自定义验证器内容
                        var domain_regex = new RegExp("[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\\.?")
                        var ip_regx = new RegExp("((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]\\d)|\\d)(\\.((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]\\d)|\\d)){3}")
                        var localhost_regex = new RegExp("localhost")
                        if(domain_regex.test(modelValue) || ip_regx.test(modelValue) || localhost_regex.test(modelValue))
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }

                    }
                }
            }
        }
    })
    .directive("validPort",function () {
        return {
            require:'ngModel',//缺失的话，ctrl参数会未定义
            restrict:"EA",
            link:function (scope,ele,attrs,ctrl) {
                var target = attrs["validPort"];//获取自定义指令属性键值
                if (target) {//判断键是否存在
                    ctrl.$validators.validPort = function (modelValue, viewValue) {//自定义验证器内容
                        if(modelValue>0)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }

                    }
                }
            }
        }
    })

// 显示操作状态信息
function deal_msg($scope,obj,type,$timeout) {
    var msg = '';
    switch(type){
        case 'result':
            msg = obj.msg;
            break;
        case 'error':
            msg = obj;
            break;
        case 'success':
            msg = obj;
            break;
    }
    $scope.msg = msg;
    // var promise = $timeout(function () {
    //     $scope.msg = '';
    // },1000);
}

function setDataSources($scope, $http,$timeout) {
    $http({
        method:'GET',
        url:'/statistic/getDataSources'
    }).then(function (value) {
        var result = value.data;
        if(result.errCode!=0){
            deal_msg($scope,result,'result',$timeout);
            return;
        }
        $scope.dataSources = value.data.data;
        deal_msg($scope,"成功获取数据源列表","success",$timeout);
        setRecords($scope,$http,$timeout);
    },function (reason) {
        deal_msg($scope,reason,'error',$timeout);
    })
}

function setRecords($scope, $http,$timeout) {
    $scope.records = []
    for(let i=0,len=$scope.dataSources.length;i<len;i++){
        let dataSourceId = $scope.dataSources[i].id;
        $http({
            method:'GET',
            url:'/statistic/getRecords?dataSourceId=' + dataSourceId
        }).then(function (value) {
            var result = value.data;
            if(result.errCode!=0){
                deal_msg($scope,result,'result',$timeout);
                return;
            }
            recordsMap[dataSourceId]=result.data;
            if(i==0){
                $scope.curDataSourceId = dataSourceId;
                $scope.records = recordsMap[dataSourceId];
            }
            deal_msg($scope,"成功获取统计记录","success",$timeout);
        },function (reason) {
            deal_msg($scope,reason,'error',$timeout);
        })
    }
}

function waitForCompletion($scope, $http,$interval,$timeout, dataSourceId) {
    var promise = $interval(function () {
        $http({
            method:'GET',
            url:'/statistic/isCompleted?dataSourceId='+dataSourceId
        }).then(function (value) {
            var result = value.data;
            if(result.errCode!=0){
                deal_msg($scope,result,'result',$timeout);
                return;
            }
            if(result.msg=="true"){
                addRecordCache($scope,result.data,dataSourceId);
                deal_msg($scope,"统计完成","success",$timeout);
                viewRecordsHelper($scope,dataSourceId);
                $interval.cancel(promise)
                dataSourceCollectState[dataSourceId]=0;
            }else{
                deal_msg($scope,"统计中","success",$timeout);
            }
        },function (reason) {
            deal_msg($scope,reason,'error',$timeout);
            $interval.cancel(promise)
            $scope.collectionState[dataSourceId]=false;
            dataSourceCollectState[dataSourceId]=0;
        })
    },5000);
}

function setStartCollecting($scope, $http,$interval,$timeout) {
    $scope.startCollecting = function (context) {
        if(!context) return;
        var dataSourceId = context.dataSource.id
        if(dataSourceCollectState[dataSourceId]){
            deal_msg($scope,"上一个统计未完成，请稍后",'result',$timeout);
            return;
        }
        dataSourceCollectState[dataSourceId]=1;
        $http({
            method:'GET',
            url:'/statistic/startDataCollecting?dataSourceId='+ dataSourceId
        }).then(function (value) {
            var result = value.data;
            if(result.errCode!=0){
                deal_msg($scope,result,'result',$timeout);
                return;
            }
            deal_msg($scope,"统计中","success",$timeout);
            waitForCompletion($scope,$http,$interval,$timeout,dataSourceId);
        },function (reason) {
            deal_msg($scope,reason,'error',$timeout);
        })
    };
}

function setDeleteDataSource($scope, $http, $timeout) {
    $scope.deleteDataSource = function (context) {
        if(!context) return;
        var dataSourceId = context.dataSource.id;
        $http({
            method:'GET',
            url:'/statistic/deleteDataSource?dataSourceId='+ dataSourceId
        }).then(function (value) {
            var result = value.data;
            if(result.errCode!=0){
                deal_msg($scope,result,'result',$timeout);
                return;
            }
            deal_msg($scope,"成功删除数据源","success",$timeout);
            clearRecordsCache($scope,dataSourceId);
            updateDataSource($scope,dataSourceId);
        },function (reason) {
            deal_msg($scope,reason,'error',$timeout);
        })
    }
}

function viewRecordsHelper($scope,dataSourceId) {
    $scope.curDataSourceId = dataSourceId;
    $scope.records = recordsMap[$scope.curDataSourceId];
}

function setViewRecords($scope) {
    $scope.viewRecords = function (context) {
        if(!context) return;
        viewRecordsHelper($scope,context.dataSource.id);
    }
}

function setDeleteRecord($scope,$http,$timeout) {
    $scope.deleteRecord = function (context) {
        if(!context) return;
        var recordId = context.record.id;
        var dataSourceId = context.record.dataSourceId;
        $http({
            method:'GET',
            url:'/statistic/deleteRecord?recordId='+recordId,
        }).then(function (value) {
            var result = value.data;
            if(result.errCode!=0){
                deal_msg($scope,result,'result',$timeout);
                return;
            }
            deal_msg($scope,"成功删除记录","success",$timeout);
            deleteRecordCache($scope,recordId,dataSourceId);
        },function (reason) {
            deal_msg($scope,reason,'error',$timeout);
        })
    }
}

function setAddDataSource($scope, $http, $timeout) {
    function checkInitNewDataSource() {
        if(!$scope.newDataSource.host || !$scope.newDataSource.host.length
            || !$scope.newDataSource || !$scope.newDataSource.port){
            $scope.newDataSource.host=$scope.initNewDataSource.host;
            $scope.newDataSource.port=$scope.initNewDataSource.port;
            return true;
        }
    }
    $scope.addDataSource = function (context) {
        checkInitNewDataSource();
        var data = $scope.newDataSource;
        $http({
            method:'POST',
            url:'/statistic/addDataSource',
            data:data
        }).then(function (value) {
            var result = value.data;
            if(result.errCode!=0){
                deal_msg($scope,result,'result',$timeout);
                return;
            }
            deal_msg($scope,"成功添加数据源","success",$timeout);
            if(result.data)
                $scope.dataSources.push(result.data)
            if($scope.curDataSourceId==0)
                $scope.curDataSourceId = result.data.id;
        },function (reason) {
            deal_msg($scope,reason,'error',$timeout);
        })
    }
}

function updateDataSource($scope, dataSourceId) {
    $scope.dataSources = util.removeItem($scope.dataSources,"id",dataSourceId);
    if($scope.curDataSourceId==dataSourceId)
        $scope.curDataSourceId=0;
}

function clearRecordsCache($scope, dataSourceId) {
    recordsMap[dataSourceId]=[];
    if(dataSourceId==$scope.curDataSourceId)
        $scope.records = [];
}

function deleteRecordCache($scope, recordId,dataSourceId) {
    recordsMap[dataSourceId]=util.removeItem(recordsMap[dataSourceId] || [],"id",recordId);
    if(dataSourceId==$scope.curDataSourceId)
        $scope.records = recordsMap[dataSourceId];
}

function addRecordCache($scope, record, dataSourceId) {
    if(recordsMap[dataSourceId]){
        var hasSameRecord = false;
        recordsMap[dataSourceId].forEach(function(value){
           if(value["id"]==record["id"]){
               hasSameRecord=true;
           }
        });
        if(!hasSameRecord)
            recordsMap[dataSourceId].push(record);
    }
    else
        recordsMap[dataSourceId]=[record];
    if(dataSourceId==$scope.curDataSourceId)
        $scope.records = recordsMap[dataSourceId];
}