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
    $scope.init = function() {
        $scope.resetVariables();
        $scope.initCharges();
        $scope.initEarnings();
    };

    $scope.init();

    $scope.submitMealDetails = function () {
       if ($scope.enterMealDetails.$invalid) {
           $scope.formError = "Please enter valid meal details.";
       } else {
           $scope.formError = "";
           $scope.earningsTipTotal += $scope.tip;
           $scope.mealCount++;
       }
   };
   $scope.$watchGroup(['mealPrice', 'taxRate', 'tipPercent'], function (newValues, oldValues, scope) {
       if ($scope.enterMealDetails.$invalid) {
           $scope.initCharges();
       } else {
           $scope.formError = "";
           $scope.subtotal = $scope.mealPrice * (1 + $scope.taxRate / 100);
           $scope.tip = $scope.mealPrice * ($scope.tipPercent / 100);
           $scope.total = $scope.subtotal + $scope.tip;
       }
   });
   $scope.$watchGroup(['tipTotal', 'mealCount'], function (newValues, oldValues, scope) {
        if ($scope.mealCount !== 0) {
            $scope.earningsAvgTip = $scope.earningsTipTotal / $scope.mealCount;
        } else {
            $scope.earningsAvgTip = 0;
        }

    });
}]);
