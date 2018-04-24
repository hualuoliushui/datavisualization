<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>管理</title>
    <script src="/js/lib/angular/angular.js"></script>
    <link href="/js/lib/bootstrap/css/bootstrap.css" rel="stylesheet"/>
    <link href="/css/page/record.css" rel="stylesheet"/>
</head>
<body ng-app="dataSourceApp" ng-controller="dataSourceController">
<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">数据源及数据记录管理</a>
    <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
            <a class="nav-link" href="/">统计结果分析</a>
        </li>
    </ul>
</nav>
<div class="container-fluid">
    <main role="main" class="col-md-12">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <div>
                <h3>状态：{{msg}}</h3>
            </div>
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                    <button class="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#addDataSourceModal">添加数据源</button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row" id="manager">
                <div class="col-md-6 data-show" >
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-md-2">主机</div>
                                <div class="col-md-2">端口号</div>
                                <div class="col-md-3">创建时间</div>
                                <div class="col-md-2"></div>
                                <div class="col-md-1"></div>
                                <div class="col-md-2"></div>
                            </div>
                        </li>
                        <li class="list-group-item" ng-repeat="dataSource in dataSources" ng-class="{true:'active',false:''}[curDataSourceId==dataSource.id]">
                            <div class="row">
                                <div class="col-md-2">{{dataSource.host}}</div>
                                <div class="col-md-2">{{dataSource.port}}</div>
                                <div class="col-md-3">{{dataSource.createTime}}</div>
                                <div class="col-md-2">
                                    <input type="button" value="开始统计" ng-click="startCollecting(this)" ng-disabled="false"/>
                                </div>
                                <div class="col-md-1">
                                    <input type="button" value="删除" ng-click="deleteDataSource(this)"/>
                                </div>
                                <div class="col-md-2">
                                    <input type="button" value="查看记录" ng-click="viewRecords(this)"/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-md-6 data-show" >
                    <ul class="list-group">
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-md-4">创建时间</div>
                                <div class="col-md-2">执行结果</div>
                                <div class="col-md-4">失败原因</div>
                                <div class="col-md-2"></div>
                            </div>
                        </li>
                        <li class="list-group-item" ng-repeat="record in records">
                            <div class="row">
                                <div class="col-md-4">{{record.createTime}}</div>
                                <div class="col-md-2">{{record.result==1? "成功" : "失败"}}</div>
                                <div class="col-md-4">{{record.errMsg || ""}}</div>
                                <div class="col-md-2">
                                    <input type="button" value="删除" ng-click="deleteRecord(this)"/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
</div>

<!-- 模态框（Modal） -->
<div class="modal fade" id="addDataSourceModal" tabindex="-1" role="dialog" aria-labelledby="tipModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" name="newDataSource">
            <div class="modal-header">
                <h4 class="modal-title" id="tipModalLabel">添加数据源</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <label >主机地址</label>
                <input type="text" ng-model="newDataSource.host" valid-host="newDataSource.host" placeholder="{{initNewDataSource.host}}">
                <label >端口号</label>
                <input type="number" ng-model="newDataSource.port" valid-port="newDataSource.port" placeholder="{{initNewDataSource.port}}">
                <br/>
                <span style="color: red" ng-show="!newDataSource.host">非法的主机地址!</span>
                <span style="color: red" ng-show="!newDataSource.port">非法的端口号!</span>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="makeSure"
                        ng-show="newDataSource.host && newDataSource.port"
                        ng-click="addDataSource(this)">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>


<script src="/js/lib/jquery/jquery-3.3.1.js"></script>
<script src="/js/lib/bootstrap/js/bootstrap.js"></script>

<script src="/js/common/util.js"></script>

<script src="/js/page/record.js"></script>


</body>
</html>