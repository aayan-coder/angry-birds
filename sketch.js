const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird,bird2,bird3,bird4, slingshot;
var score=0
var gameState = "onSling";
var bg="sprites/bg.png";
var birds=[]
var s1,s2,s3


function preload() {
    //setBackground() 
s1=loadSound("bird_select.mp3")
s2=loadSound("bird_flying.mp3")
s3=loadSound("pig_snort.mp3")
backgroundImg=loadImage("sprites/bg.png")

}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    bird2 = new Bird(150,170);
    bird3 = new Bird(100,170);
    bird4 = new Bird(50,170);

    birds.push(bird4)
    birds.push(bird3)
    birds.push(bird2)
    birds.push(bird)

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(birds[birds.length-1].body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);
    text("Score  :"+ score,width-200,50)



    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();
pig1.score();
    box3.display();
    box4.display();
    pig3.display();
    log3.display();
pig3.score();
    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
   if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position,{x:5,y:-5})
    s1.play()
        return false;    
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
    birds.pop()
    s2.play()
    return false;    
}

function keyPressed(){
    if(keyCode === 32 && gameState === "launched" ){
        Matter.Body.setPosition(birds[birds.length-1].body,{x:200,y:50})
      slingshot.attach(birds[birds.length-1].body);  
      gameState="onSling"

    }
}


/*async function setBackground(){
var response =   await fetch("https://worldtimeapi.org/api/timezone/America/New_york")
var responsejson= await response.json()
console.log(responsejson)

var datetime = responsejson.datetime
console.log(datetime)
var hour=datetime.slice(11,13)
console.log(hour)

if(hour>= 06 && hour <=18){

    bg="sprites/bg.png";
}

else {
    bg="sprites/bg2.png";
}

backgroundImg= loadImage(bg)

}*/
