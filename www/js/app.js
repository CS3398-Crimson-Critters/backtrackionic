// Ionic template App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'SimpleRESTIonic' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SimpleRESTIonic', ['ionic', 'backand', 'SimpleRESTIonic.controllers', 'SimpleRESTIonic.services'])

  /*   .run(function (, Backand) {
   })
   */
  .config(function (BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
    // change here to your appName
    BackandProvider.setAppName('backtracker');

    BackandProvider.setSignUpToken('675ebb3d-3fa2-49db-9b4d-d5f5d8de093d');

    // token is for anonymous login. see http://docs.backand.com/en/latest/apidocs/security/index.html#anonymous-access
    BackandProvider.setAnonymousToken('fc121f4c-fe8e-4c08-ace1-4fe9c6f39cb6');

    $stateProvider
      .state('menu', {
        url: '/menu',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })

      .state('menu.dashboard', {
        url: '/dashboard',
        views: {
          'side-menu21': {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl as vm'
          }
        }
      })

      .state('menu.login', {
        url: '/login',
        views: {
          'side-menu21': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl as login'
          }
        }
      })

      .state('menu.chats', {
        url: '/chats',
        views: {
          'side-menu21': {
            templateUrl: 'templates/chats.html',
            controller: 'ChatsCtrl as vm'
          }
        }
      })

      .state('menu.signup', {
        url: '/signup',
        views: {
          'side-menu21': {
            templateUrl: 'templates/signup.html',
            controller: 'SignUpCtrl as vm'
          }
        }
      });

    $urlRouterProvider.otherwise('/menu/dashboard');
    $httpProvider.interceptors.push('APIInterceptor');
  })

  .run(function ($ionicPlatform, $rootScope, $state, LoginService, Backand) {

    $ionicPlatform.ready(function () {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }


      var isMobile = !(ionic.Platform.platforms[0] == "browser");
      Backand.setIsMobile(isMobile);
      Backand.setRunSignupAfterErrorInSigninSocial(true);
    });

    function unauthorized() {
      console.log("user is unauthorized, sending to login");
      $state.go('tab.login');
    }

    function signout() {
      LoginService.signout();
    }

    $rootScope.$on('unauthorized', function () {
      unauthorized();
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      if (toState.name == 'tab.login') {
        signout();
      }
      else if (toState.name != 'tab.login' && Backand.getToken() === undefined) {
        unauthorized();
      }
    });

  });
