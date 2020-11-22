var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var particle;

var plinkos = [];

var divisions = [];
var divisionHeight=300;

var score =0;

var turn = 0;

var gameState = "start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
}
 
function draw() {
  background("black");

  textSize(20)
  text("Score: " + score, 20, 30);

  fill("white");
  textSize(30);
  text("500", 15, 540);
  text("500", 95, 540);
  text("500", 175, 540);
  text("500", 255, 540);
  text("100", 335, 540);
  text("100", 415, 540);
  text("100", 495, 540);
  text("200", 575, 540);
  text("200", 655, 540);
  text("200", 735, 540);

  Engine.update(engine);

  ground.display();

  if(gameState == "end") {
    textSize(100);
    text("Game Over", 150, 250);
  }
 
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   
   if(particle != null) {
     particle.display();

     if(particle.body.position.y > 760) {
       if(particle.body.position.x < 315) {
         score = score + 500;
         particle = null;

         if(turn >= 5) {
           gameState = "end";
         }
       }
       else if(particle.body.position.x < 555 && particle.body.position.x > 316) {
         score = score + 100;
         particle = null;

         if(turn >= 5) {
           gameState = "end";
         }
       }
       else if(particle.body.position.x < 795 && particle.body.position.x > 556) {
         score = score + 100;
         particle = null;

         if(turn >= 5) {
           gameState = "end";
         }
       }
     }
   }
 
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
}

function mousePressed() {
  if(gameState !== "end") {
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}