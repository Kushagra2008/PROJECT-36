//Create variables here
var database = firebase.database();
var TIMES = 0;
var textVal  = "";
var dogImg1, dogImg2, database
var dogSprite, foodS, foodStock
var remainingFood = 20;
var gamestate = 0;
var barksound, robotSound;
var ellapsedTime = 0;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg1 = loadImage('dogImg.png');
  dogImg2 = loadImage('dogImg1.png');
}

function setup() {
  var name = window.prompt("What should be your dog's name? : ");
  createCanvas(1150, 680);

  foodObj = new Food();

  dogSprite = createSprite(width/2, height/2);
  dogSprite.addImage(dogImg1)
  dogSprite.scale = 0.5;

  foodStock = database.ref('Food')
  foodStock.on('value', readStock)

  feed = createButton("Feed " + name)
  feed.position(700, 95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(800, 95)
  addFood.mousePressed(addfood);
}


function draw() 
{
  background(46, 139, 87);

    database.ref("lastFed").on("value", function(data)
    {
      lastFed = data.val();
    }
    )

    textSize(20);
    fill("purple")

    if (lastFed >= 12)
    {
      text("LAST FEED: " + lastFed%12, 350, 30)
    }
    else if (lastFed == 0)
    {
      text("Last Fed: 12 AM", 350, 30);
    }
    else 
    {
      text("Last Feed: " +  lastFed + " PM", 350, 30);
    }

    drawSprites();
    text('FOOD REMAINING: ' + foodS, 130, 60);
    foodObj.display();
  }

  function readStock(data)
  {
    foodS = data.val();
    foodObj.updateFoodStock(foodS)
  }

  function addfood(){
    console.log("addFood is working")
    if (foodS < 20)
    {
      foodS += 1
    }

      database.ref('/').update(
        {
          'Food': foodS
        }
      )

  }

  function feedDog()
  {
    foodObj.buttonPressed = true;
    dogSprite.addImage(dogImg2)
    console.log("FeedDog is working")
    foodS -= 1;
    if (foodS <= 0)
    {
      foodS = 0;
    } 
    lastFed = hour()
    database.ref("/").update(
      {
        'Food': foodObj.getFoodStock(),
        'lastFed': lastFed
      }
     foodObj.updateFoodStock(foodS)
    )
}




