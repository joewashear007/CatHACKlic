angular.module('cathacklic.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $ionicModal) {
  $scope.AddItem ={};
  $scope.blessings = [
    { title: 'Matthew', id: 1, selected: false },
    { title: 'Mark', id: 2, selected: false },
    { title: 'Luke', id: 3, selected: false },
    { title: 'John', id: 4, selected: false },
    { title: 'Paul', id: 5, selected: true },
    { title: 'Peter', id: 6, selected: false }
  ];
  $scope.showAddItem = function(){
    // $scope.blessings.push({title:title, selected: true});
    $scope.addItemDialog.show();
  };
  $scope.Add = function(){
    $scope.addItemDialog.hide();
    $scope.AddItem.selected = true;
    $scope.blessings.push($scope.AddItem);
    $scope.AddItem = {};
  };
  $scope.close = function() {
    $scope.addItemDialog.hide();
  };
  $ionicModal.fromTemplateUrl('templates/modal/add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addItemDialog = modal;
  });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
