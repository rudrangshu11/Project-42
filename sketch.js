
var monkey , monkey_running, monkey_collide;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collide = loadAnimation("sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 500);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collide", monkey_collide);
  monkey.scale=0.17;
  
  ground = createSprite(450,375,900,10);
  ground.velocityX = -4;
  
 foodGroup = new Group();
 obstacleGroup = new Group();
}


function draw() {
  background('darkSeaGreen');
  //monkey.debug = true;
  monkey.setCollider("circle", 20,10 ,250);
  if(gameState === PLAY){
    if (ground.x < ground.width/2){
      ground.x = ground.width/2;
     }
    ground.velocityX = -(4+survivalTime*1.5/100);
      
      if(keyDown("space")&& monkey.y >=240){
    monkey.velocityY=-14;
  }
    survivalTime = survivalTime+ Math.round(getFrameRate()/62);
      monkey.velocityY = monkey.velocityY + 0.5;
      food();
  obstacles();
    
    if(monkey.isTouching(foodGroup)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
  if(gameState === END){
    ground.velocityX = 0;
    monkey.velocityY = monkey.velocityY + 0.5;
    monkey.changeAnimation("collide");
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("moving", monkey_running);
      score = 0;
      survivalTime = 0;
      gameState = PLAY; 
    }
  }
  

  monkey.collide(ground);
    drawSprites();
  
  stroke("white");
  textSize(20);
  fill ("white");
  text("Score : " + score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill ("black");
    text("Survival Time : " + survivalTime, 100, 50);
  //console.log(Math.round(monkey.y));
  //console.log(frameCount);
}

function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,Math.round(random(120,200)),10,10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 240;
    banana.velocityX =-(4+survivalTime*1.5/100);
    foodGroup.add(banana);
  }
 }

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite( 600, 335,10,10);
    obstacle.addImage("stone", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -(4+survivalTime*1.5/100);
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}





