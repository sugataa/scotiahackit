angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope, $state) {

    $scope.navigateTo = function(state){
      return $state.go(state);
    }

})
   
.controller('statsCtrl', function($scope) {

})
      
.controller('depositCtrl', function($scope) {

})
   
.controller('redeemCtrl', function($scope) {

})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.navigateTo = function(state){
      return $state.go(state);
    }
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
 