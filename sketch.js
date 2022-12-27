var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver,restart;
var gameOverImg,restartImg;

//to load all the images and animations 
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg =loadImage("gameOver.png");
  restartImg =loadImage("restart.png");
}

//to setup the canvas 
function setup() {
  createCanvas(600, 200);
  //to create the trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  //to create the ground 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver=createSprite(300,100,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  restart=createSprite(300,130,50,50);
     restart.addImage(restartImg);
     restart.scale=0.5;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  // to create groups for similar types of objects 
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  score = 0;
}

//to make the sprites visible on the score 
function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  
  
  if(gameState === PLAY){
       
    ground.velocityX = -4;
   
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    trex.velocityY = trex.velocityY + 0.8;

    //to create the function 
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
   
    gameOver.visible=false;
    restart.visible=false;

  }
   else if (gameState === END) {
       
      ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     
     gameOver.visible=true;
     restart.visible=true;
     
   }
  
   //to make the trex to stand on the ground 
  trex.collide(invisibleGround);
  drawSprites();
}

//to create the obstacles by 60 framecounts 
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 600;
    //add the obstacles to group 
    obstaclesGroup.add(obstacle);
 }
}

//to create the cloud  by 60 framecounts 
function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 600;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    //to add the clouds to group 
   cloudsGroup.add(cloud);
    }
}

