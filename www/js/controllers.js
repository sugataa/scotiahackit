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

.controller('homeCtrl', function($scope, $ionicModal, $state, $rootScope, $ionicHistory) {

     $rootScope.debts = [];

      $scope.getInclude = function(){

          if(Object.keys($scope.debts).length > 0){
              return "templates/modules/full-state.html";
          }
          return "templates/modules/empty-state.html";
      }

      $scope.getProgressInclude = function(){

          if(Object.keys($scope.debts).length > 0){
              return "templates/modules/full-progress-bar.html";
          }
          return "";
      }

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

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.createDebt = function(u) {
   $rootScope.debts.push({ amount: u.amount, contribution_type: u.contributionType });
    $scope.modal.hide();

    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();


    //$state.go('tabsController.home');
    //$ionicTabsDelegate.select(0);
  };

})

.controller('statsCtrl', function($scope) {

$scope.labels = ["Mortgage", "Student Loan", "Rainy Day Money"];
  $scope.data = [3500, 490, 50];
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

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

// Triggered on a button click, or some other target
$scope.showPopup = function() {
 $scope.data = {};


 // An elaborate, custom popup
 var myPopup = $ionicPopup.show({
   template: '<input type="password" ng-model="data.wifi">',
   title: 'Enter Wi-Fi Password',
   subTitle: 'Please use normal things',
   scope: $scope,
   buttons: [
     { text: 'Cancel' },
     {
       text: '<b>Save</b>',
       type: 'button-positive',
       onTap: function(e) {
         if (!$scope.data.wifi) {
           //don't allow the user to close unless he enters wifi password
           e.preventDefault();
         } else {
           return $scope.data.wifi;
         }
       }
     }
   ]
 });

 myPopup.then(function(res) {
   console.log('Tapped!', res);
 });

 $timeout(function() {
    myPopup.close(); //close the popup after 3 seconds for some reason
 }, 3000);
};

// A confirm dialog
$scope.showConfirm = function() {
  var points;
  var confirmPopup = $ionicPopup.confirm({
    title: 'Confirm Deposit',
    template: 'Are you sure you want to fund this goal?'

  });

  confirmPopup.then(function(res) {
    if(res) {
      console.log('You are sure');
    } else {
      console.log('You are not sure');
    }
  });
};

// An alert dialog
$scope.showAlert = function() {
  var alertPopup = $ionicPopup.alert({

    buttons: [
    {  text: 'Okay',
    type: 'button-positive',
  }
    ]
  });

  alertPopup.then(function(res) {
    console.log('Thank you for not eating my delicious ice cream cone');
  });
};
});
