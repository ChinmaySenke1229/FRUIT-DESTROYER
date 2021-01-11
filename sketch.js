var knife,knifeImage
var fruit,fruit1Image,fruit2Image,fruit3Image,fruit4Image,
fruitGroup;
var monster,monster1Image,monster2Image,monsterGroup;
var PLAY=1;
var END=0;
var gameState=1;
var score;
var gameover,gameoverImage;
var knifeSound,gameOverSound;
var restart,restartImage;

function preload(){
  
  knifeImage=loadImage("sword.png");
  fruit1Image=loadImage("fruit1.png");
  fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
  fruit4Image=loadImage("fruit4.png");
  monster1Image=loadImage("alien1.png");
  monster2Image=loadImage("alien2.png");
  gameover=loadImage("gameover.png");
  knifeSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
  restartImage=loadImage("restart image.jpg");
  
  
}

function setup(){
  
  createCanvas(600,600);
  
  knife=createSprite(300,300);
  knife.addImage(knifeImage);
  knife.scale=0.5;
  restart=createSprite(300,400);
  restart.addImage(restartImage);
  restart.scale=0.5;
  
  score=0;
  
  fruitGroup=new Group()
  monsterGroup=new Group()
  
  
}

function draw(){
  background("lightblue");
  text("score:"+score,500,50);
  
  if(gameState===PLAY){
    knife.x=mouseX;
    knife.y=mouseY;
    restart.visible=false;
    fruits()
    enemy()
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      knifeSound.play()
      score=score+2;
    }
      if(knife.isTouching(monsterGroup)){
        gameState=END;
    }
  }
  else if(gameState===END){
    if(monsterGroup.isTouching(knife)){
      monsterGroup.destroyEach();
      fruitGroup.destroyEach();
      knife.addImage(gameover);
      monsterGroup.setVelocityXEach=0;
      knife.velocityX=0;
      gameOverSound.play();
      knife.x=300;
      knife.y=300;
      knife.scale=2;
      restart.visible=true;
    }
  }
  if(mousePressedOver(restart)){
    restart1()
  }
  drawSprites();
}

function fruits(){
  
  if(frameCount%80===0){
    fruit=createSprite(0,Math.round(random(50,500)));
    rand=Math.round(random(1,2));
    if(rand===1){
      fruit.x=600;
      fruit.velocityX=-(8+(score/10));
    }
    if(rand===2){
      fruit.x=0;
      fruit.velocityX=(8+(score/10));
    }
    r=Math.round(random(1,4))
    fruit.scale=0.2;
    if(r===1){
      fruit.addImage(fruit1Image);
       
       }
    else if(r===2){
      fruit.addImage(fruit2Image);
    }
    else if(r===3){
      fruit.addImage(fruit3Image);
    }
    else{
      fruit.addImage(fruit4Image);
    }
     fruit.lifetime=310;
    fruitGroup.add(fruit);
  }
  }
  function enemy(){
    
    if(frameCount%200===0){
   monster=createSprite(0,Math.round(random(100,300)));
      i=Math.round(random(7,8));
      if(i===7){
      monster.x=600;
      monster.velocityX=-(8+(score/10));
    }
    if(i===8){
      monster.x=0;
      monster.velocityX=(8+(score/10));
    }
      r=Math.round(random(1,2))
      monster.setLifetime=310;
      if(r===1){
        monster.addImage(monster1Image);
      }
      else {
        monster.addImage(monster2Image);
      }
      monsterGroup.add(monster);
    }
    
  }
function restart1(){
  gameState=PLAY
  knife.addImage(knifeImage);
  knife.scale=0.5;
  score=0;
}