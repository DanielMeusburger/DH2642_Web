// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {
//Check the data in model or cookies else use API

  $scope.fullMenu = Dinner.getFullMenu();

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
	//$scope.getTotalCost();
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price
  


  $scope.getDishByID = function(dishID) {
    $scope.status = "Searching...";
    Dinner.Dish.get({RecipeID:dishID},function(data){
        $scope.dish = data;
        $scope.status = "Result Found";
        //console.log(data);
    },function(data){
        $scope.status = "There was an error";
    });
  }
  $scope.removeDish = function(dish) {
    Dinner.removeDishFromMenu(dish);
    Dinner.deletePriceFromFullMenu(dish.RecipeID);
  }

  $scope.fullPriceList = Dinner.getFullMenuPrices();

  $scope.getPrice = function(menu) {
    for (var i = 0; i < $scope.fullPriceList.length; i++) {
      if($scope.fullPriceList[i].id == menu.RecipeID){
        menu.individualPrice = $scope.fullPriceList[i].price;
      }
    }
  }
  
  $scope.getTotalCost = function() {
	$scope.totalCost = 0;
    for (var i = 0; i < $scope.fullPriceList.length; i++) {
      $scope.totalCost = $scope.totalCost + parseFloat($scope.fullPriceList[i].price);
    }
	//$scope.totalCost = $scope.fullPriceList.reduce((a, b) => a + b, 0);
	/*$scope.totalCost = $scope.totalCost * $scope.numberOfGuests*/;
	return $scope.totalCost;
	console.log("Costs: " + $scope.totalCost);
  }
  
  $scope.totalCost = $scope.getTotalCost(); // should this reference the dinner model?

    /*$scope.$watch('service.getFullMenu()', function(newVal) {

        console.log("New Data", newVal);
        $scope.fullMenu = Dinner.getFullMenu();
    });*/

});