// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.

dinnerPlannerApp.factory('Dinner',function ($resource,$cookieStore) {
  
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN'}); //18f3cT02U9f6yRl3OKDpP8NA537kxYKu
  this.Dish = $resource('http://api.bigoven.com/recipe/:RecipeID',{api_key:'XKEdN82lQn8x6Y5jm3K1ZX8L895WUoXN',RecipeID:'@RecipeID'}); //18f3cT02U9f6yRl3OKDpP8NA537kxYKu //1hg3g4Dkwr6pSt22n00EfS01rz568IR6
  
  // ?? Can we implement this in a cleaner version? It seems we need a variable to access it in the cookies setting
  var Dish = this.Dish;
 
  if(! $cookieStore.get('numberOfGuest')){
	   var numberOfGuest = 2;
  } else {
	   var numberOfGuest = $cookieStore.get('numberOfGuest');
  };
  
  var fullMenu = [];
  var fullMenuIDs = [];
  var fullMenuPrices = [];


  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
	$cookieStore.put('numberOfGuest',num);
  }

  this.getNumberOfGuests = function() {
	return numberOfGuest;
  }
  
  //DM
  this.getFullMenu = function () {
    return fullMenu;
  }

    this.getFullMenuPrices = function () {
        /*if(fullMenuPrices == null || fullMenuPrices.length == 0){
            fullMenuPrices = $cookieStore.get('fullMenuPrices');
        }*/
        return fullMenuPrices;
    }

    this.addDishToMenu = function (dish){
    if(fullMenu.indexOf(dish) == -1 ){
      fullMenu.push(dish);
	  fullMenuIDs.push(dish.RecipeID);
	  $cookieStore.put('fullMenuIDs',fullMenuIDs);
	  console.log("Full Menu: " + fullMenu);
      //$rootScope.$apply();
    }
  }

  this.removeDishFromMenu = function (dish){
    var index = fullMenu.indexOf(dish);
    if (index > -1) {
      fullMenu.splice(index, 1);
	  fullMenuIDs.splice(index, 1);
      $cookieStore.put('fullMenuIDs',fullMenuIDs);
      //$rootScope.$apply();
    }
  }

    this.addPriceToFullMenu = function(id, pricePerDish){
        fullMenuPrices.push({'id':id,'price':pricePerDish});
        $cookieStore.put('fullMenuPrices',fullMenuPrices);
        for (var i = 0; i < fullMenuPrices.length; i++) {
            console.log( " Prices : "+fullMenuPrices[i].id+" ,"+fullMenuPrices[i].price );
        }
    }

    this.deletePriceFromFullMenu = function (id){
        for (var i = 0; i < fullMenuPrices.length; i++) {
            if(fullMenuPrices[i].id == id){
                fullMenuPrices.splice(i, 1);
            }
            $cookieStore.put('fullMenuPrices',fullMenuPrices);
        }
    }

  //TODO: Sorting is not correct ??
  //Check the data in model or cookies else use API
  if(fullMenu.length > 0){
	// use fullMenu objects
	console.log("Objects already in fullMenu" + fullMenu);
  } else if ($cookieStore.get('fullMenuIDs')){
	// loop through the fullMenuID and fill the fullMenu with objects
	var fullMenuIDs = $cookieStore.get('fullMenuIDs');
	fullMenuIDs.forEach(function(id) {
		//console.log(id);
		status = "Processing";
		Dish.get({RecipeID:id},function(data){
			fullMenu.push(data);
			status = "Result Found";
			//console.log(data);
		},function(data){
			status = "There was an error";
		});
	});

      if(fullMenuPrices.length > 0){
          console.log("Objects already in fullMenurices" + fullMenuPrices);
      }else if ($cookieStore.get('fullMenuPrices')) {
          fullMenuPrices = $cookieStore.get('fullMenuPrices');
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