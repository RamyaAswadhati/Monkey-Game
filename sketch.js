
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup;
var survivalTime = 0;
var score;
var ground;
var bananaGroup, obstacleGroup;
var gameState = "play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  
  monkey = createSprite(100,340,20,50);
  ground = createSprite(400,350,800,10);
  foodGroup = createGroup();
  obstacleGroup = createGroup(obstacle);
  monkey.addAnimation("running", monkey_running);
  
}


function draw() {
  background(255);
  if(gameState === "play") {
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/30);
    text("Survival Time: " + survivalTime, 100, 50);
    if(keyDown("space") && monkey.y >= 314.3)  {
      monkey.velocityY = -25;
    }
    ground.velocityX = -4 - survivalTime / 5;
    if(ground.x >= 0) {
      ground.x = 400;
    }
    if(obstacleGroup.isTouching(monkey)) {
      gameState = "end";
    }
    food();
    obstacles();
    if(foodGroup.isTouching(monkey)) {
      survivalTime += 10;
      foodGroup.destroyEach();
    }
  }
  if(gameState === "end") {
    textSize(50);
    fill("red");
    stroke("red");
    textAlign(CENTER);
    background(50*(Math.sin(frameCount/40)),
               255*(Math.sin(frameCount/60)),40 + 
               215*(Math.sin(frameCount/92)));
    text("GAME OVER", 200,200);
    //
    textSize(20);
    fill("green");
    stroke("green");
    text("Refresh the page to play again",200,280);
    ground.velocityX = 0;
    //destroy everything!!!!!!!!!!!!!!!!!
    monkey.destroy();
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    ground.destroy();
  }//
  console.log(monkey.y);
  monkey.scale = 0.1;
  //
  monkey.velocityY += 1.5;
  monkey.collide(ground);
  
    drawSprites();
  

}
//other functions

function food() {
  if(frameCount % 80 === 0){
    banana = createSprite(400,Math.ceil(random(120,200)));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = ground.velocityX;
    banana.lifetime = canvas.width / abs(banana.velocityX);
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(400, 320,40,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = ground.velocityX;
    obstacle.lifetime = canvas.width / abs(ground.velocityX);
    obstacleGroup.add(obstacle);  
  }
}


