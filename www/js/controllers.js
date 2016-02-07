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

  $scope.slideHasChanged = function($index){
    // jQuery('.slider-slide[data-index="'+$index+'"]').find('.amount').delay('1000').fadeOut();
    jQuery('.slider-slide[data-index="'+$index+'"]').find('.amount').hide();
    jQuery('.slider-slide[data-index="'+$index+'"]').find('.label').show();
    jQuery('.slider-slide[data-index="'+$index+'"]').find('.label').delay('500').fadeOut();
    jQuery('.slider-slide[data-index="'+$index+'"]').find('.amount').delay('1000').fadeIn();
  };

  $scope.createDebt = function(u) {
   $rootScope.debts.push({ amount: u.amount, contribution_type: u.contributionType });
    $scope.modal.hide();

    jQuery('.add-debt').html('<i class="fa fa-spinner fa-spin"></i>');
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();

    jQuery('span.level-up').html('Level 2 <i class="fa fa-trophy">').fadeOut().fadeIn();

    //$state.go('tabsController.home');
    //$ionicTabsDelegate.select(0);
  };

})

.controller('statsCtrl', function($scope, $rootScope) {

$scope.labels = ["Student Loan", "Credit Card (VISA)", "Installment Loan"];
  $rootScope.data = [21000, 1800, 4800];
  // $scope.colors = [
  //   "#C21B04",
  //   "#5CB85C",
  //   "#F0AD4E"];
  $scope.SL = String(((28000/$rootScope.data[0])*100) + 1000) + "px";
  $scope.CC = String(((1800/$rootScope.data[1])*100) + 1000) + "px";
  $scope.CL = String(((4800/$rootScope.data[2])*100) + 1000) + "px";

  $rootScope.total = function() {
    var temp = 0;
    for (var i = 0; i < $rootScope.data.length; i++) {
      temp = temp + $rootScope.data[i];
    }
    return temp;
  };
})

.controller('depositCtrl', function($scope, $ionicPopup, $rootScope) {

  $scope.myAmount = {
    myValue: 0
  };

  $scope.clientSideList = [
    { text: "Student Loan", value: 0 },
    { text: "Credit Card (VISA)", value: 1 },
    { text: "Installment Loan", value: 2 },
  ];



  $scope.myChoice = {
    myValue: 0
  };

  console.log($scope.myChoice);

  console.log($scope.user);

  // $scope.myAmount = 0;

  $scope.master = {};

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
  $scope.showConfirm = function(user) {
    console.log($scope.myChoice.myValue.myValue);

    var points;
    console.log($scope.user);
    console.log($scope.myAmount);
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

    console.log($scope.myAmount);
    console.log($scope.myChoice);
    console.log($scope.myPoints);
    // change the rootscope data on update
    console.log($rootScope.data);

    var temp;
    if ($scope.myChoice.myValue == 0) {
      console.log($rootScope.data[0]);
      console.log($scope.myAmount.myValue);
      temp = $rootScope.data[0] - $scope.myAmount.myValue;
      console.log(temp);
      $rootScope.data[0] = temp;
      console.log($rootScope.data[0]);
    }
    if ($scope.myChoice.myValue == 1) {
      $rootScope.data[1] = $rootScope.data[1] - $scope.myAmount;
    }
    if ($scope.myChoice.myValue == 2) {
      $rootScope.data[2] = $rootScope.data[2] - $scope.myAmount;
    }
    console.log($rootScope.data);
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



$scope.update = function(user) {
    $scope.master = angular.copy(user);
    console.log(user);

    // change the rootscope data on update
    if (user.choice == 0) {
      $rootscope.data[0] = $rootscope.data[0] - user.amount;
    }
    if (user.choice == 1) {
      $rootscope.data[1] = $rootscope.data[1] - user.amount;
    }
    if (user.choice == 2) {
      $rootscope.data[2] = $rootscope.data[2] - user.amount;
    }
};
      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
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

});
