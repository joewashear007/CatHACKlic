angular.module('cathacklic')

.controller('BAKER.Exam.Ctrl', function($scope, $ionicModal, $ionicSlideBoxDelegate) {
  $scope.AddItem ={};
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
      case 0: $scope.blessings.push($scope.AddItem); break;
      case 1: $scope.favors.push($scope.AddItem); break;
      case 2: $scope.weaknesses.push($scope.AddItem); break;
      case 4: $scope.resolutions.push($scope.AddItem); break;
      default: console.warn("Not on valid scope"); break;
    }

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

  $scope.Save = function(){
    console.info($scope.blessings);
  };

  catHACKlic.GetAllBakerExamFields("blessingList", "blessings", function(err, fields) {
    if(err){
      console.warn(err);
      return;
    }
    for(var f in fields){
      console.log(fields[f]);
    }
  });
});
