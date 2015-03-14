angular.module('cathacklic')

.controller('Exam.Review.Ctrl', function($scope, $state, $stateParams, ExamineService) {
  $scope.exam = null;
  $scope.Loading = ExamineService.GetExamination($stateParams.id).then(function(data){
    $scope.exam = data;
  }, function(err){
    alert("Failed to Load Examination");
    console.warn(err);
  });

});
