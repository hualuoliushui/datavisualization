<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>用户</title>
    <script src="/js/lib/angular/angular.js"></script>
    <link href="/js/lib/bootstrap/css/bootstrap.css" rel="stylesheet"/>
    <link href="/css/page/login.css" rel="stylesheet"/>
</head>
<body ng-app="userApp" ng-controller="userController">
<div class="container">
    <input type="hidden" ng-model="loginModel"/>
    <input type="hidden" ng-model="registerModel"/>
    <div class="form row" ng-model="loginUser" ng-show="loginModel">
        <div class="form-horizontal col-md-offset-3" ng-model="loginInfo">
            <h3 class="form-title">登录</h3>
            <div style="color:red">{{loginInfo}}</div>
            <div class="col-md-9">
                <div class="form-group">
                    <i class="fa fa-user fa-lg"></i>
                    <input class="form-control required" type="text" ng-model="loginUser.userName" placeholder="用户名" name="username" autofocus="autofocus" maxlength="20"/>
                </div>
                <div class="form-group">
                    <i class="fa fa-lock fa-lg"></i>
                    <input class="form-control required" type="password" ng-model="loginUser.psw" placeholder="密码"  name="password" maxlength="8"/>
                </div>
                <div class="form-group col-md-offset-9">
                    <button type="button" class="btn btn-success pull-right" name="login" ng-click="login()">登录</button>
                    <button type="button" class="btn btn-success pull-right" name="register" ng-click="switchFromModel()">注册</button>
                </div>
            </div>
        </div>
    </div>

    <div class="form row" ng-model="registerUser" ng-show="registerModel">
        <div class="form-horizontal col-md-offset-3"  ng-model="registerInfo">
            <h3 class="form-title">注册</h3>
            <div style="color:red">{{registerInfo}}</div>
            <div class="col-md-9">
                <div class="form-group">
                    <i class="fa fa-user fa-lg"></i>
                    <input class="form-control required" type="text" ng-model="registerUser.userName" placeholder="用户名" name="username" autofocus="autofocus" maxlength="20"/>
                </div>
                <div class="form-group">
                    <i class="fa fa-lock fa-lg"></i>
                    <input class="form-control required" type="password" ng-model="registerUser.psw" placeholder="密码"  name="password" maxlength="8"/>
                </div>
                <div class="form-group">
                    <i class="fa fa-lock fa-lg"></i>
                    <input class="form-control required" type="password" ng-model="registerUser.repeatPsw" placeholder="重复密码"  name="password" maxlength="8"/>
                </div>
                <div class="form-group col-md-offset-9">
                    <button type="button" class="btn btn-success pull-right" name="login" ng-click="switchFromModel()">登录</button>
                    <button type="button" class="btn btn-success pull-right" name="register" ng-click="register()">注册</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/js/lib/jquery/jquery-3.3.1.js"></script>
<script src="/js/lib/bootstrap/js/bootstrap.js"></script>

<script src="/js/common/util.js"></script>

<script src="/js/page/login.js"></script>


</body>
</html>