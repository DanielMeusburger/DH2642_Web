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
  //var dishes = [];
  //var dish;

  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
	$cookieStore.put('numberOfGuest',num);
  }

  this.getNumberOfGuests = function() {
	return numberOfGuest;
  }
  
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'66J8l00npnHHZcCNLRhxkfW1OHxbojy4'}); //18f3cT02U9f6yRl3OKDpP8NA537kxYKu
  this.Dish = $resource('http://api.bigoven.com/recipe/:RecipeID',{api_key:'66J8l00npnHHZcCNLRhxkfW1OHxbojy4',RecipeID:'12'}); //18f3cT02U9f6yRl3OKDpP8NA537kxYKu //1hg3g4Dkwr6pSt22n00EfS01rz568IR6
  
  //DM
  this.getFullMenu = function () {
    return fullMenu;
  }	

  this.addDishToMenu = function(id){
    if(fullMenu.indexOf(id) == -1 ){
      fullMenu.push(id);
    }
  }

  this.removeDishFromMenu = function (id){
    var index = fullMenu.indexOf(id);
    if (index > -1) {
      fullMenu.splice(index, 1);
    }
  }

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});