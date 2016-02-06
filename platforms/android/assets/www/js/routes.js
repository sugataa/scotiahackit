angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

      
        
    .state('tabsController.home', {
      url: '/home',
      views: {
        'tab1': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.stats', {
      url: '/stats',
      views: {
        'tab4': {
          templateUrl: 'templates/stats.html',
          controller: 'statsCtrl'
        }
      }
    })
        
      
    
      
    .state('tabsController', {
      url: '/page2',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    
      
        
    .state('tabsController.deposit', {
      url: '/deposit',
      views: {
        'tab2': {
          templateUrl: 'templates/deposit.html',
          controller: 'depositCtrl'
        }
      }
    })
        
      
    
      
        
    .state('tabsController.redeem', {
      url: '/redeem',
      views: {
        'tab3': {
          templateUrl: 'templates/redeem.html',
          controller: 'redeemCtrl'
        }
      }
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});