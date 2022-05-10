var gamestate = "play"
function preload(){
  treximg= loadAnimation("trex1.png","trex3.png","trex4.png") 
  groundimg = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")  
  ob2 = loadImage("obstacle2.png")  
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")    
  ob5 = loadImage("obstacle5.png")  
  ob6 = loadImage("obstacle6.png")  
}

function setup(){
  createCanvas(600, 200)
  trex = createSprite(50, 180, 50, 30)
  trex.addAnimation("trexani",treximg)
  trex.scale = 0.5
  ground = createSprite(300, 190, 600, 20)
  ground.addImage(groundimg)
  ground2 = createSprite(300, 200, 600, 20)
  ground2.visible = false
  obg = createGroup()
  cloudg = createGroup()
}

function draw(){
  background(173, 164, 173)
  if (gamestate === "play"){
   clouds()
   ground.velocityX = -5
   obstacles()
   trex.collide(ground2)
   if (ground.x<0){
     ground.x = 600
    }
    if (keyDown(" ") && trex.y>166){
     trex.velocityY = -6
    }
   trex.velocityY = trex.velocityY + 0.2
   if (trex.isTouching(obg)){
     gamestate = "end"
   }
 }
 if (gamestate === "end"){
   ground.velocityX = 0
   obg.setVelocityXEach(0)
   cloudg.setVelocityXEach(0)
   obg.setLifetimeEach(-5)
   cloudg.setLifetimeEach(-5)
   trex.velocityY = 0
 }
  drawSprites()  
}

function clouds(){
  if (frameCount%60===0){
   cloud = createSprite(600, random(20, 100), 40, 20)
   cloud.velocityX = -5
   cloud.addImage(cloudimg)
   cloud.scale = 0.8
   trex.depth = cloud.depth + 1
   cloud.lifetime = 120
   cloudg.add(cloud)
  }
}

function obstacles(){
  if (frameCount%70===0){
    ob = createSprite(600, 175, 30, 30)
    ob.velocityX = -5
    ob.scale = 0.5
    ob.lifetime = 120
    obg.add(ob)
    switch(Math.round(random(1,6))) {
      case 1: ob.addImage(ob1)
      break
      case 2: ob.addImage(ob2)
      break
      case 3: ob.addImage(ob3)
      break
      case 4: ob.addImage(ob4)
      break
      case 5: ob.addImage(ob5)
      break
      case 6: ob.addImage(ob6)
      break
    }
  }
}
