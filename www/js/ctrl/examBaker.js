angular.module('cathacklic')

.controller('BAKER.Exam.Ctrl', function($scope, $state, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading, DBAccessor, ExamineService) {
  var _edit_index;

  $scope.close = function() {  $scope.addItemDialog.hide(); };
  $scope.CloseEditDialog = function() {  $scope.EditItemDialog.hide(); };
  $scope.showAddItem = function($event){$scope.addItemDialog.show();};
  $scope.ShowEditItem = function($index, $event){
    switch($ionicSlideBoxDelegate.currentIndex()){
      case 0: $scope.ItemToEdit = $scope.blessings[$index]; break;
      case 1: $scope.ItemToEdit = $scope.favors[$index]; break;
      case 2: $scope.ItemToEdit = $scope.weaknesses[$index]; break;
      case 4: $scope.ItemToEdit = $scope.resolutions[$index]; break;
      default: console.warn("Not on valid scope"); break;
    }
    _edit_index = $index;
    $event.stopPropagation();
    $scope.EditItemDialog.show();
  };
  $scope.Save = function(){
    $scope.examination.blessings = $scope.blessings;
    $scope.examination.favors = $scope.favors;
    $scope.examination.weaknesses = $scope.weaknesses;
    $scope.examination.resolutions = $scope.resolutions;
    ExamineService.SaveExamination($scope.examination).then(function(data){
      console.info(data);
      alert("Saved");
      $state.go("app.dashboard");
    }, function(err){
      alert("Failed to Save!");
      console.warn(err);
    });
  };

  $scope.Add = function(){
    $scope.AddItem.selected = true;
    switch($ionicSlideBoxDelegate.currentIndex()){
      case 0: $scope.AddItem.page = "blessing"; break;
      case 1: $scope.AddItem.page = "favor"; break;
      case 2: $scope.AddItem.page = "weakness"; break;
      case 4: $scope.AddItem.page = "resolution"; break;
      default: console.warn("Not on valid scope"); break;
    }
    DBAccessor.AddItem($scope.AddItem, function(err, id){
      if(err){ alert("Not Added!", err); return;}
      $scope.AddItem._id = id[0];
      if( $scope.AddItem.page == "blessing") { $scope.blessings.push($scope.AddItem); }
      if( $scope.AddItem.page == "favor") { $scope.favors.push($scope.AddItem); }
      if( $scope.AddItem.page == "weakness") { $scope.weaknesses.push($scope.AddItem); }
      if( $scope.AddItem.page == "resolution") { $scope.resolutions.push($scope.AddItem); }
      $scope.AddItem = {};
      $scope.addItemDialog.hide();
    });
  };

  $scope.EditItem = function(){
    var _item_id;
    switch($ionicSlideBoxDelegate.currentIndex()){
      case 0: $scope.blessings[_edit_index] = $scope.ItemToEdit; _item_id = $scope.blessings[_edit_index]._id; break;
      case 1: $scope.favors[_edit_index] = $scope.ItemToEdit; _item_id = $scope.favors[_edit_index]._id; break;
      case 2: $scope.weaknesses[_edit_index] = $scope.ItemToEdit; _item_id = $scope.weaknesses[_edit_index]._id; break;
      case 4: $scope.resolutions[_edit_index] = $scope.ItemToEdit; _item_id = $scope.resolutions[_edit_index]._id; break;
      default: console.warn("Not on valid scope"); break;
    }
    DBAccessor.EditItem(_item_id, $scope.ItemToEdit, function(err, id){
      if(err){ alert("Not Edited!", err); return;}
      $scope.EditItemDialog.hide();
    });
  };

  $scope.DeleteItem = function(){
    var _item_id;
    switch($ionicSlideBoxDelegate.currentIndex()){
      case 0: _item_id = $scope.blessings[_edit_index]._id; $scope.blessings.splice(_edit_index,1); break;
      case 1: _item_id = $scope.favors[_edit_index]._id; $scope.favors.splice(_edit_index,1); break;
      case 2: _item_id = $scope.weaknesses[_edit_index]._id; $scope.weaknesses.splice(_edit_index,1); break;
      case 4: _item_id = $scope.resolutions[_edit_index]._id; $scope.resolutions.splice(_edit_index,1); break;
      default: console.warn("Not on valid scope"); break;
    }
    DBAccessor.RemoveItem(_item_id, function(err, id){
      if(err){ alert("Not Removed!", err); return;}
      $scope.EditItemDialog.hide();
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
  $scope.ItemToEdit = {};
  $scope.blessings = [];
  $scope.favors = [];
  $scope.weaknesses = [];
  $scope.resolutions = [];
  $scope.examination = ExamineService.NewExamination("BAKER");
  $ionicModal.fromTemplateUrl('templates/modal/add.html', {scope: $scope}).then(function(modal) {
    $scope.addItemDialog = modal;
  });
  $ionicModal.fromTemplateUrl('templates/modal/edit.html', {scope: $scope}).then(function(modal) {
    $scope.EditItemDialog = modal;
  });

  $scope.Load();
});
