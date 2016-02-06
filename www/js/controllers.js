angular.module('app.controllers', [])

.controller('MainCtrl', function($scope, $ionicModal, $state) {

  $ionicModal.fromTemplateUrl('profile.html', {
    scope: $scope,
    state: $state,
    animation: 'slide-in-up',
    backdropClickToClose: false,
  }).then(function(modal) {
    $scope.modal = modal;
  })  

    $scope.user = [];

  $scope.openModal = function() {
    console.log('Show');
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.createContact = function(u) {        
    $scope.user.push({ salary: u.salary, contributions: u.contributions });
    console.log(u.salary + ' ' + u.contributions);
    $scope.modal.hide();
    $state.go('tabsController.home');
  };

})

.controller('homeCtrl', function($scope, $ionicModal, $state) {

    $scope.navigateTo = function(state){
      return $state.go(state);
    }

      $ionicModal.fromTemplateUrl('add-debt.html', {
        scope: $scope,
        state: $state,
        animation: 'slide-in-up',
      }).then(function(modal) {
        $scope.modal = modal;
      })  

  $scope.debts = [];

  $scope.openModal = function() {
    console.log('Show');
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.createDebt = function(u) {        
    $scope.debts.push({ amount: u.amount, contribution_type: u.contributionType });
    $scope.modal.hide();
    $state.go('tabsController.home');
    console.log($scope.debts);
  };

})
   
.controller('statsCtrl', function($scope) {

$scope.labels = ["Mortgage", "Student Loan", "Rainy Day Money"];
  $scope.data = [300, 500, 500];
  // $scope.colors = [
  //   "#C21B04",
  //   "#5CB85C",
  //   "#F0AD4E"];

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
 