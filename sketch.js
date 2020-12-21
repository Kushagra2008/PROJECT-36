//Create variables here
var database = firebase.database();
var TIMES = 0;
var textVal  = "";
var dogImg1, dogImg2, database
var dogSprite, foodS, foodStack
var remainingFood = 20;
var gamestate = 0;
var barksound, robotSound;
var ellapsedTime = 0;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here

  dogImg1 = loadImage('dogImg.png');
  dogImg2 = loadImage('dogImg1.png');
  barksound = loadSound("bark.mp3")
  robotSound = loadSound("robot.mp3")
}

function setup() {
  var name = window.prompt("What should be your dog's name? : ");
  createCanvas(1000, 1000);

  foodObj = new Food();
  //foodObj.display.x = 200;
  feed = createButton("Feed " + name)
  feed.position(700, 95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(800, 95)
  addFood.mousePressed(addfood);

  dogSprite = createSprite(width/2, height/2);
  dogSprite.addImage(dogImg1)
  dogSprite.scale = 0.5;
  foodStack = database.ref('Food')
  foodStack.on('value', readStock)

  
}


function draw() 
{
  background(46, 139, 87);

  //   if (keyWentDown(UP_ARROW) && TIMES < 5)
  //   {
  //     writeStock(foodS)
  //     TIMES += 1;
  //     dogSprite.addImage(dogImg2)
  //     dogSprite.scale = 0.4;
  //   }

  // else if (keyWentDown(UP_ARROW) && TIMES >= 5)
  //     {
  //       textVal = "";
  //       barksound.play()
  //       text("translating", width/ 2, height / 2);
  //       sleep(2000);

  //       // TRANSLATING DOG LANGUAGE TO ENGLISH
  //         robotSound.play();
  //         sleep(2000);
  //       textVal = "HEY, I AM NOT HUNGRY NOW!"
  //     }
    drawSprites();
    fill("red");
    textSize(20);
    text("kushagra", width, height);

    text("PRESS UP ARROW TO FEED DRAGO MILK",45, 35);

    //text('FOOD REMAINING: ' + foodS, 130, 60);

    fill("purple")
    console.log(lastFed)

    //text("mouseX: " + mouseX + " mouseY: " + mouseY, mouseX, mouseY - 20);

    text("Last Fed: ", lastFed, + " AM", mouseX, mouseY);
    if (lastFed >= 12)
    {
 
    }
    else if (lastFed == 0)
    {
      text("Last Fed: 12 AM", mouseX, mouseY);
    }
    else 
    {
      text("Last Fed: ", lastFed, + " PM", mouseX, mouseY);
    }
   foodObj.display();
    

  }

  function readStock(data)
  {
    foodS = data.val();
    console.log(foodS)
}

function writeStock(x)
{
  if (x <= 0)
  {
    x = 0
  }
  else
  {
    x -= 1
  }
  console.log(x)
  remainingFood = x;
  reference = database.ref('/')
  reference.update({
    Food:x
  })
}



// if (gamestate == 0)
  // {
  //   a = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  //   rect(10, height/2 - 40, width - 20, 40)
  //   for (var x = 0; x < 10; x++)
  //   {
  //     if (keyWentDown())
  //     {
        
  //     }
  //   }
  //   if (keyWentDown("enter"))
  //   {
  //     gamestate = 1;
  //   }
  // }
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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
      console.log(foodS)

  }

  function feedDog()
  {
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
        'Food': foodS,
        'lastFed': lastFed
      }
    )
    console.log(foodS)
}


