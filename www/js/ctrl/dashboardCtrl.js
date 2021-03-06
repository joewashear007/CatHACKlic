angular.module('cathacklic')

.controller('Dashboard.Ctrl', function($scope, $state, $ionicLoading, DBAccessor, ExamineService) {
  $scope.PastExamines = null;
  $scope.DoExamin = function(){
    $state.go("app.exam.baker");
  };


  $scope.GetPrev = function(){
    $scope.Loading = ExamineService.ListExaminations().then(function(data){
      $scope.PastExamines = data;
      console.log("Done Loading data.");
    }, function(err){
      console.warn(err);
    });
  };

  $scope.ClearData = function(){
    var DBDeleteRequest = indexedDB.deleteDatabase("BAKER.Examination");
    DBDeleteRequest.onerror = function(event) { alert("Error deleting database."); };
    DBDeleteRequest.onsuccess = function(event) { alert("Database deleted successfully"); };

    ExamineService.ClearData(function(err, data){
      if(err){
        console.warn("Error deleting database.", err);
      }else{
        console.log("Database deleted successfully");
      }
    });
  };

  $scope.GetPrev();
});
