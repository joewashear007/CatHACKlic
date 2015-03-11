angular.module('cathacklic')

.controller('Dashboard.Ctrl', function($scope, $state, $ionicModal, $ionicSlideBoxDelegate, $ionicLoading, DBAccessor) {
  $scope.DoExamin = function(){
    $state.go("app.exam.baker");
  };
});
