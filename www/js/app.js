// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cathacklic', ['ionic', 'cgBusy', 'cathacklic.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.dashboard', {
    url: "",
    views: {
      'menuContent': {
        controller: "Dashboard.Ctrl",
        templateUrl: "templates/dashboard.html"
      }
    }
  })
  .state('app.exam', {
    abstract: true,
    url: "/exam",
    views: {
      'menuContent': {
        template: "<ion-nav-view name='examContent'></ion-nav-view>"
      }
    }
  })
  .state('app.exam.review', {
    url: "/exam/:id",
    views: {
      "examContent": {
        controller: "Exam.Review.Ctrl",
        templateUrl: "templates/examReview.html"
      }
    }
  })
  .state('app.exam.baker', {
    url: "/baker",
    views: {
      "examContent": {
        controller: "BAKER.Exam.Ctrl",
        templateUrl: "templates/exam/baker.html"
      }
    }
  })
  .state('app.playlists', {
    url: "/playlists",
    views: {
      'menuContent': {
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app');
});
