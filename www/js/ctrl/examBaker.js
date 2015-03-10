angular.module('cathacklic')

.controller('BAKER.Exam.Ctrl', function($scope, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading, DBAccessor) {

  $scope.close = function() {  $scope.addItemDialog.hide(); };
  $scope.showAddItem = function(){ $scope.addItemDialog.show(); }
  $scope.Save = function(){ console.info($scope.blessings); };

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
  };

  $scope.Load = function(){
    $ionicLoading.show({ template: 'Loading...' });
    DBAccessor.ReadFields(function(err, fields){
      if(err){ console.warn("Can't Read :(", err); return;}
      console.log(fields);
      fields.blessing.forEach(function(i){
        i.selected = false;
        $scope.blessings.push(i);
      });
      fields.favor.forEach(function(i){
        i.selected = false;
        $scope.favors.push(i);
      });
      fields.weakness.forEach(function(i){
        i.selected = false;
        $scope.weaknesses.push(i);
      });
      fields.resolution.forEach(function(i){
        i.selected = false;
        $scope.resolutions.push(i);
      });
      $ionicLoading.hide();
    });
  };

  $scope.AddItem = {};
  $scope.blessings = [];
  $scope.favors = [];
  $scope.weaknesses = [];
  $scope.resolutions = [];
  $ionicModal.fromTemplateUrl('templates/modal/add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addItemDialog = modal;
  });

  $scope.Load();
});
