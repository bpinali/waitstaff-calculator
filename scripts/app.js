var app = angular.module('waitstaff', ['ngRoute','ngAnimate']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/details', {
            templateUrl: 'partials/details.html',
            controller: 'detailsController'
        })
        .when('/charges', {
            templateUrl: 'partials/charges.html',
            controller: 'chargesController'
        })
        .when('/earnings', {
            templateUrl: 'partials/earnings.html',
            controller: 'earningsController'
        })
        .otherwise({
            redirectTo: '/details'
        });
}]);

app.service('dataService', function() {
    var meals = [];

    var mealData = {
        earningsTipTotal: 0,
        mealCount: 0,
        earningsAvgTip: 0,
    };

    return {
        addNewMeal: function(meal) {
            meals.push(meal);
            mealData.mealCount++;
            mealData.earningsTipTotal += meal.tip;
            mealData.earningsAvgTip = (mealData.earningsTipTotal / mealData.mealCount);
        },
        getMeals: function() {
            return meals;
        },
        getMealData: function() {
            return mealData;
        },
        resetVariables: function() {
            meals.length = 0;
            mealData = {
                earningsTipTotal: 0,
                mealCount: 0,
                earningsAvgTip: 0
            };
        }
    };
});

app.controller('detailsController', function($scope, dataService) {

    $scope.mealCount = 1;

    $scope.clearForm = function() {
        $scope.mealPrice = '';
        $scope.taxRate = '';
        $scope.tipPercent = '';
    };

    $scope.addNewMeal = function() {
        $scope.mealCount++;

        var mealPrice = parseFloat($scope.mealPrice);
        var taxRate = parseFloat($scope.taxRate);
        var tipPercent = parseFloat($scope.tipPercent);

        $scope.subtotal = mealPrice * (1 + taxRate / 100);
        $scope.tip = mealPrice * (tipPercent / 100);
        $scope.total = $scope.subtotal + $scope.tip;

        var meal = {
            subtotal: $scope.subtotal,
            tip: $scope.tip,
            total: $scope.total
        };
        dataService.addNewMeal(meal);
        $scope.clearForm();
    };

});

app.controller('chargesController', function($scope, dataService) {

      $scope.getMeals = function () {
        var meals = dataService.getMeals();
        $scope.meals = meals;
      };

      $scope.getMeals();

      $scope.mealCount = $scope.meals.length;
});

app.controller('earningsController', function($scope, dataService) {

  $scope.earningsTipTotal = dataService.getMealData().earningsTipTotal;
  $scope.mealCount = dataService.getMealData().mealCount;
  $scope.earningsAvgTip = dataService.getMealData().earningsAvgTip;


});

app.controller('resetController', function($scope, dataService) {
  $scope.resetVariables = function () {
    dataService.resetVariables();
  };
});
app.controller('navControl', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.classActive = function (viewLocation) {
        if ($scope.isActive(viewLocation)) {
            return 'active';
        } else {
            return 'inactive';
        }
    };
});
