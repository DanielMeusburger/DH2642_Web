// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.

//DM - Is this the correct setup of $cookieStore below
dinnerPlannerApp.factory('Dinner',function ($resource,$cookieStore) {
  
 
  if(! $cookieStore.get('numberOfGuest')){
	   var numberOfGuest = 2;
  } else {
	   var numberOfGuest = $cookieStore.get('numberOfGuest');
  };
  
  var fullMenu = [];
  var fullMenuIds = [];
  //var dishes = [];
  //var dish;

  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
	$cookieStore.put('numberOfGuest',num);
  }

  this.getNumberOfGuests = function() {
	return numberOfGuest;
  }
  
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN'}); //18f3cT02U9f6yRl3OKDpP8NA537kxYKu
  this.Dish = $resource('http://api.bigoven.com/recipe/:RecipeID',{api_key:'XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN',RecipeID:'@RecipeID'}); //18f3cT02U9f6yRl3OKDpP8NA537kxYKu //1hg3g4Dkwr6pSt22n00EfS01rz568IR6
  
  //DM
  this.getFullMenu = function () {
    return fullMenu;
  }	

  this.addDishToMenu = function(dish){
    if(fullMenu.indexOf(dish) == -1 ){
      fullMenu.push(dish);
    }
  }

  this.removeDishFromMenu = function (dish){
    var index = fullMenu.indexOf(dish);
    if (index > -1) {
      fullMenu.splice(index, 1);
    }
  }

  /*
   if(fullMenu is in model){
      return
   }else if (fullMenu in cookies){
   call API (iterate Id from Cookies)
   store it in fullMenu Object
     return
   }
   */

  
  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});