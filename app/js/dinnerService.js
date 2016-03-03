// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
  var numberOfGuest = 2;
  var fullMenu = [];
  //var dishes = [];
  //var dish;

  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
  }

  this.getNumberOfGuests = function() {
    return numberOfGuest;
  }
  
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'1hg3g4Dkwr6pSt22n00EfS01rz568IR6'}); //18f3cT02U9f6yRl3OKDpP8NA537kxYKu
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'1hg3g4Dkwr6pSt22n00EfS01rz568IR6'}); //18f3cT02U9f6yRl3OKDpP8NA537kxYKu
  
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

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});