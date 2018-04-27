var dataSourceApp = angular.module('userApp',[]);
var isRegisterUserNameUnique = true;
dataSourceApp
    .controller('userController',function ($scope, $http) {
        $scope.loginUser = {
            userName:null,
            psw:null
        }
        $scope.registerUser = {
            userName:null,
            psw:null,
            repeatPsw:null
        }
        $scope.registerInfo=null,
            $scope.loginInfo=null;
        $scope.loginModel=true,
            $scope.registerModel=!$scope.loginModel;
        $scope.switchFromModel = function(){
            $scope.loginModel=!$scope.loginModel,
                $scope.registerModel=!$scope.loginModel;
        }
        $scope.login = function () {
            if(!$scope.loginUser.userName){
                $scope.loginInfo="用户名不为空"
                return;
            }
            if(!$scope.loginUser.psw){
                $scope.loginInfo="密码不为空"
                return;
            }
            $http({
                method:'POST',
                url:'/user/dealLogin',
                data:$scope.loginUser
            }).then(function (value) {
                var result = value.data;
                if(result["errCode"]!=0){
                    $scope.loginInfo=result["msg"]
                    return;
                }
                window.location.href="/record"
            },function (reason) {
                deal_msg(reason,"error");
            })
        }
        
        $scope.register = function () {
            if(!$scope.registerUser.userName){
                $scope.registerInfo="用户名不为空";
                return;
            }
            if(!$scope.registerUser.psw){
                $scope.registerInfo="密码不为空";
                return;
            }
            if($scope.registerUser.psw!=$scope.registerUser.repeatPsw){
                $scope.registerInfo="密码不一致";
                return;
            }
            $http({
                method:'POST',
                url:'/user/dealRegister',
                data:$scope.registerUser
            }).then(function (value) {
                var result = value.data;
                if(result["errCode"]!=0){
                    $scope.registerInfo=result["msg"]
                    return;
                }
                window.location.href="/record"
            },function (reason) {
                deal_msg(reason,"error");
            })
        }

        var checkUserNameUnique =function() {
            if(!$scope.registerUser.userName){
                return;
            }
            $http({
                method:'GET',
                url:'/user/checkUserNameUnique?userName='+$scope.registerUser.userName
            }).then(function (value) {
                var result = value.data;
                if(result["errCode"]!=0){
                    $scope.registerInfo=result["msg"];
                    return;
                }
                console.log(result);
                $scope.registerInfo=null;
            },function (reason) {
                $scope.registerInfo=reason;
            })
        }

        function deal_msg(msg,reason) {
            $scope.info=msg;
        }

        $scope.$watch("registerUser.userName",checkUserNameUnique)
    })
