var app = angular.module('waitstaff', []);

app.controller('calculator', ['$scope', function($scope) {
    $scope.resetVariables = function() {
        $scope.mealPrice = 0;
        $scope.taxRate = 0;
        $scope.tipPercent = 0;
    };
    $scope.initCharges = function () {
      $scope.subtotal = 0;
      $scope.tip = 0;
      $scope.total = 0;
    };
    $scope.initEarnings = function() {
      $scope.earningsTipTotal = 0;
      $scope.mealCount = 0;
      $scope.earningsAvgTip = 0;
    };
    $scope.calculateMealValues = function() {
      $scope.subtotal = $scope.mealPrice + ($scope.mealPrice * ($scope.taxRate/100));
      $scope.tip = ($scope.mealPrice + ($scope.mealPrice * ($scope.taxRate/100))) * ($scope.tipPercent/100);
      $scope.total = $scope.subtotal + $scope.tip;
    };
    $scope.init = function() {
        $scope.resetVariables();
        $scope.initCharges();
        $scope.initEarnings();
        $scope.calculateMealValues();
    };
    $scope.init();
}]);
