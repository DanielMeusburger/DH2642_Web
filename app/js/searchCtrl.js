// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

 //TODO Still have to implement the case when it is still running.
 $scope.search = function(query) {
   $scope.status = "Searching...";
   Dinner.DishSearch.get({title_kw:query},function(data){
     $scope.dishes=data.Results;
     $scope.status = "Showing " + data.Results.length + " results";
   },function(data){
     $scope.status = "There was an error";
   });
 }
 
 // Adapted addDish function which takes the selected dish from the search (which returns less detail) and gets the full dish object (incl. ingredients etc.)
 $scope.addDish = function(dish){
    $scope.status = "Searching...";
    Dinner.Dish.get({RecipeID:dish.RecipeID},function(data){
		Dinner.addDishToMenu(data);
        $scope.status = "Result Found";
        console.log(data);
    },function(data){
        $scope.status = "There was an error";
    });
 }

});