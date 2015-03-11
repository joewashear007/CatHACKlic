angular.module('cathacklic')

.controller('Dashboard.Ctrl', function($scope, $state, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading, DBAccessor) {
  $scope.DoExamin = function(){
    $state.go("app.exam.baker");
  };

  $scope.ClearData = function(){
    var DBDeleteRequest = indexedDB.deleteDatabase("BAKER.Examination");
    DBDeleteRequest.onerror = function(event) { alert("Error deleting database."); };
    DBDeleteRequest.onsuccess = function(event) { alert("Database deleted successfully"); };
  };
});
