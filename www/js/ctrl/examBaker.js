angular.module('cathacklic')

.controller('BAKER.Exam.Ctrl', function($scope, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading, DBAccessor, ExamineService) {

  $scope.close = function() {  $scope.addItemDialog.hide(); };
  $scope.showAddItem = function(){ $scope.addItemDialog.show(); };
  $scope.Save = function(){
    $scope.examination.blessings = $scope.blessings;
    $scope.examination.favors = $scope.favors;
    $scope.examination.weaknesses = $scope.weaknesses;
    $scope.examination.resolutions = $scope.resolutions;
    ExamineService.SaveExamination($scope.examination).then(function(data){
      console.info(data);
      alert("Saved");
    }, function(err){
      alert("Failed to Save!");
      console.warn(err);
    });
  };

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
      if(err){ alert("Not Added!", err); return;}
      $scope.AddItem = {};
    });
  };

  $scope.Load = function(){
    $ionicLoading.show({ template: 'Loading...' });
    DBAccessor.ReadFields(function(err, fields){
      if(err){
        console.warn("Can't Read :(", err);
        alert("Can't Read :(");
      }else {
        console.log(fields);
        fields.forEach(function(i){
          i.selected = false;
          if( i.page == "blessing") { $scope.blessings.push(i); }
          if( i.page == "favor") { $scope.favors.push(i); }
          if( i.page == "weakness") { $scope.weaknesses.push(i); }
          if( i.page == "resolution") { $scope.resolutions.push(i); }

        });
      }
      $ionicLoading.hide();
    });
  };

  $scope.AddItem = {};
  $scope.blessings = [];
  $scope.favors = [];
  $scope.weaknesses = [];
  $scope.resolutions = [];
  $scope.examination = ExamineService.NewExamination("BAKER");
  $ionicModal.fromTemplateUrl('templates/modal/add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addItemDialog = modal;
  });

  $scope.Load();
});
