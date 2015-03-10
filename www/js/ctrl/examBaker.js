angular.module('cathacklic')

.controller('BAKER.Exam.Ctrl', function($scope, $ionicModal, $ionicSlideBoxDelegate, DBAccessor) {

  $scope.AddItem = {};
  $scope.blessings = [
    { title: 'Item 1', selected: false },
    { title: 'Item 2', selected: false },
    { title: 'Item 3', selected: false },
  ];
  $scope.favors = [
    { title: 'Item 1', selected: false },
    { title: 'Item 2', selected: false },
    { title: 'Item 3', selected: false },
  ];
  $scope.weaknesses = [
    { title: 'Item 1', selected: false },
    { title: 'Item 2', selected: false },
    { title: 'Item 3', selected: false },
  ];
  $scope.resolutions = [
    { title: 'Item 1', selected: false },
    { title: 'Item 2', selected: false },
    { title: 'Item 3', selected: false },
  ];

  $scope.showAddItem = function(){
    // $scope.blessings.push({title:title, selected: true});
    $scope.addItemDialog.show();
  }
  $scope.Add = function(){
    $scope.addItemDialog.hide();
    $scope.AddItem.selected = true;
    switch($ionicSlideBoxDelegate.currentIndex()){
      case 0: $scope.blessings.push($scope.AddItem); $scope.AddItem.page = "blessing"; break;
      case 1: $scope.favors.push($scope.AddItem); $scope.AddItem.page = "favor"; break;
      case 2: $scope.weaknesses.push($scope.AddItem); $scope.AddItem.page = "weakness"; break;
      case 4: $scope.resolutions.push($scope.AddItem); $scope.AddItem.page = "resolution"; break;
      default: console.warn("Not on valid scope"); break;
    }
    DBAccessor.AddItem($scope.AddItem, function(err, id){
      if(err){ console.warn("Not Added!", err); return;}
      console.info("Added: ", id);
    });
  }
  $scope.close = function() {
    $scope.addItemDialog.hide();
  };
  $ionicModal.fromTemplateUrl('templates/modal/add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addItemDialog = modal;
  });

  $scope.Save = function(){
    console.info($scope.blessings);
  };

  DBAccessor.ReadFields(function(err, fields){
    if(err){ console.warn("Can't Read :(", err); return;}
    console.log(fields);
  });
});
