var dataSourceApp = angular.module('dataSourceApp',[]);
var recordsMap = {}

dataSourceApp.controller('dataSourceController',function ($scope, $http,$interval,$timeout) {
    $scope.curDataSourceId = 0;
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
    var promise = $timeout(function () {
        $scope.msg = '';
    },2000);
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
            console.log(dataSourceId);
            var result = value.data;
            if(result.errCode!=0){
                deal_msg($scope,result,'result',$timeout);
                return;
            }
            recordsMap[dataSourceId]=result.data;
            console.log(i);
            if(i==0){
                $scope.curDataSourceId = dataSourceId;
                console.log("cur " + $scope.curDataSourceId)
                $scope.records = recordsMap[dataSourceId];
                console.log($scope.records);
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
            console.log(result);
            if(result.errCode!=0){
                deal_msg($scope,result,'result',$timeout);
                return;
            }
            if(result.msg=="true"){
                addRecordCache($scope,result.data,dataSourceId);
                deal_msg($scope,"统计完成","success",$timeout);
                viewRecordsHelper($scope,dataSourceId);
                $interval.cancel(promise)
            }else{
                deal_msg($scope,"统计中","success",$timeout);
            }
        },function (reason) {
            deal_msg($scope,reason,'error',$timeout);
            $interval.cancel(promise)
            $scope.collectionState[dataSourceId]=false;
        })
    },5000);
}

function setStartCollecting($scope, $http,$interval,$timeout) {
    $scope.startCollecting = function (context) {
        if(!context) return;
        console.log(context.dataSource);
        console.log("开始统计")
        var dataSourceId = context.dataSource.id
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
        console.log(context.dataSource);
        console.log("删除数据源");
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
        console.log(context);
        viewRecordsHelper($scope,context.dataSource.id);
    }
}

function setDeleteRecord($scope,$http,$timeout) {
    $scope.deleteRecord = function (context) {
        if(!context) return;
        console.log(context);
        var recordId = context.record.id;
        var dataSourceId = context.record.dataSourceId;
        $http({
            method:'GET',
            url:'/statistic/deleteRecord?recordId='+recordId,
        }).then(function (value) {
            console.log(recordId,dataSourceId)
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
    $scope.addDataSource = function (context) {
        console.log(context);
        console.log("添加数据源");
        var host = $("#host").val() || $("#host").attr("placeholder");
        var port = $("#port").val() || $("#port").attr("placeholder");
        var data = {
            host: host,
            port: port
        }
        $http({
            method:'POST',
            url:'/statistic/addDataSource',
            data:data
        }).then(function (value) {
            console.log(data)
            console.log(value);
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

function removeItem(arr, proc, item,compare) {
    compare = compare || function (x, y) {
        if(x==y) return true;
        else return false;
    }
    var temp = [];
    for(var i=0,len=arr.length;i<len;i++){
        if(!compare(arr[i][proc],item))
            temp.push(arr[i]);
    }
    return temp;
}

function updateDataSource($scope, dataSourceId) {
    $scope.dataSources = removeItem($scope.dataSources,"id",dataSourceId);
    if($scope.curDataSourceId==dataSourceId)
        $scope.curDataSourceId=0;
}

function clearRecordsCache($scope, dataSourceId) {
    recordsMap[dataSourceId]=[];
    console.log(dataSourceId);
    console.log($scope.curDataSourceId);
    if(dataSourceId==$scope.curDataSourceId)
        $scope.records = [];
}

function deleteRecordCache($scope, recordId,dataSourceId) {
    recordsMap[dataSourceId]=removeItem(recordsMap[dataSourceId] || [],"id",recordId);
    if(dataSourceId==$scope.curDataSourceId)
        $scope.records = recordsMap[dataSourceId];
}

function addRecordCache($scope, record, dataSourceId) {
    if(recordsMap[dataSourceId])
        recordsMap[dataSourceId].push(record);
    else
        recordsMap[dataSourceId]=[record];
    if(dataSourceId==$scope.curDataSourceId)
        $scope.records = recordsMap[dataSourceId];
}