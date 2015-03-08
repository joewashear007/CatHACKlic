angular.module('cathacklic')

.controller('BAKER.Exam.Ctrl', function($scope, $ionicModal) {
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
  }
  $scope.Add = function(){
    $scope.addItemDialog.hide();
    $scope.AddItem.selected = true;
    $scope.blessings.push($scope.AddItem);
    $scope.AddItem = {};
  }
  $scope.close = function() {
    $scope.addItemDialog.hide();
  };
  $ionicModal.fromTemplateUrl('templates/modal/add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addItemDialog = modal;
  });

});
