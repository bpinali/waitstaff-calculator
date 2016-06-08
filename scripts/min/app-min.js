var app=angular.module("waitstaff",["ngRoute"]);app.config(["$routeProvider",function(e){e.when("/details",{templateUrl:"partials/details.html",controller:"detailsController"}).when("/charges",{templateUrl:"partials/charges.html",controller:"chargesController"}).when("/earnings",{templateUrl:"partials/earnings.html",controller:"earningsController"}).otherwise({redirectTo:"/charges"})}]),app.service("dataService",function(){var e=[],t={earningsTipTotal:0,mealCount:0,earningsAvgTip:0};return{addNewMeal:function(a){e.push(a),t.mealCount++,t.earningsTipTotal+=a.tip,t.earningsAvgTip=t.earningsTipTotal/t.mealCount},getMeals:function(){return e},getMealData:function(){return t},resetVariables:function(){e.length=0,t={earningsTipTotal:0,mealCount:0,earningsAvgTip:0}}}}),app.controller("detailsController",function(e,t){console.log("yo"),e.mealCount=1,e.clearForm=function(){e.mealPrice="",e.taxRate="",e.tipPercent=""},e.addNewMeal=function(){e.mealCount++;var a=parseFloat(e.mealPrice),n=parseFloat(e.taxRate),l=parseFloat(e.tipPercent);e.subtotal=a*(1+n/100),e.tip=a*(l/100),e.total=e.subtotal+e.tip;var r={subtotal:e.subtotal,tip:e.tip,total:e.total};t.addNewMeal(r),e.clearForm()}}),app.controller("chargesController",function(e,t){e.getMeals=function(){var a=t.getMeals();e.meals=a},e.getMeals(),e.mealCount=e.meals.length}),app.controller("earningsController",function(e,t){e.earningsTipTotal=t.getMealData().earningsTipTotal,e.mealCount=t.getMealData().mealCount,e.earningsAvgTip=t.getMealData().earningsAvgTip}),app.controller("resetController",function(e,t){e.resetVariables=function(){t.resetVariables()}}),app.controller("navControl",function(e,t){e.isActive=function(e){return e===t.path()},e.classActive=function(t){return e.isActive(t)?"active":"inactive"}});