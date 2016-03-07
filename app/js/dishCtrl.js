// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
    $scope.id = $routeParams.dishId;

    $scope.status = "Searching...";
    Dinner.Dish.get({RecipeID:$routeParams.dishId},function(data){
        $scope.dish = data;
        $scope.status = "Result Found";
        console.log(data);
    },function(data){
        $scope.status = "There was an error";
    });

    $scope.total = 0
    $scope.setTotals = function(ingredient){
        if (ingredient){
            $scope.total += (ingredient.Quantity * 1);
        }
    }

    $scope.addDish = function(dish){
        Dinner.addDishToMenu(dish);
    }
});