var backg, backgImg;
var playerImg, playerImg1,playerImg2,playerImg3;
var zombies,zombie,zombieImg;
var bullet,bullets,bulletImg
var explosion
var explosionImg
var bkgsound;





function preload(){
backg = loadImage("assets/bg.jpeg");
playerImg1 = loadImage("assets/shooter_1.png");
playerImg2 = loadImage("assets/shooter_2.png");
playerImg3 = loadImage("assets/shooter_3.png");
zombieImg = loadImage("assets/zombie.png");
bulletImg = loadImage("assets/bullet.png");
explosion = loadSound("assets/explosion.mp3");
explosionImg = loadImage("assets/explosion.jpg");
bkgsound = loadSound("assets/spooky.mp3");
}








function setup(){
createCanvas(windowWidth,windowHeight);

  player = createSprite(300,500);
  player.addImage(playerImg1);
  //player.addImage(playerImg2);
  //player.addImage(playerImg3);
  
  player.scale = 0.45

  bullets = new Group();
  zombies = new Group();

  
  

}







function draw(){
background(backg)
bkgsound.play();
if(keyWentDown ("space")){
  player.addImage(playerImg3);
  bullet = createSprite(player.x,player.y-30);
  bullet.addImage(bulletImg);
  bullet.velocityX = 20
  bullet.scale = 0.2
  bullets.add(bullet);
}

if(keyWentUp ("space")){
  player.addImage(playerImg1)
}

if (keyIsDown(UP_ARROW)){
  player.y-=8;

}

if (keyIsDown(DOWN_ARROW)){
  player.y+=8;
}

if(bullets.isTouching(zombies)){
  for(var i=0;i<zombies.length;i++){
    if(zombies[i].isTouching(bullets)){
      zombies[i].addImage(explosionImg);
      setInterval(destroyZombies(zombies[i]),5000);
      bullets.destroyEach();
      explosion.play();
    }
  }
}

if(zombies.isTouching(player)){
  player.destroy();
  zombies.setVelocityXEach(0);
}

createZombie();
drawSprites();
}



function createZombie(){
  if (frameCount % 100 ===0){
    zombie = createSprite(width,300);
    zombie.velocityX=-3;
    zombie.addImage(explosionImg)
    zombie.addImage(zombieImg);
    zombie.scale = 0.3;
    zombie.y = Math.round(random(100,height-100));
    zombies.add(zombie);
    zombie.setCollider("rectangle",0,0,200,300)
    zombie.debug=false
  }
}

 function destroyZombies(x){
x.destroy();
 }