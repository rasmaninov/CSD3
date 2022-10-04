let scale1 = 1; 
let scale2 = 1; 
let scale3 = 1; 
let scale4 = 1; 

let IPconnection = {};

const socket = io.connect();
console.log(socket);
// connect met socket
  socket.on('connect', _=> {
    console.log("verbonden!");
    // stuur ID aan aperaat dat is verbonden
    socket.emit('phone',socket.id);
  })   

  // ontvang IP van alle connecties die worden gemaakt
  socket.on('phoneIDs', (arg)=>{
    IPconnection = arg;
  });

  // ontvang message van MAX
  socket.on('scale1', function(msg){
    scale1 = msg;
  });
  socket.on('scale2', function(msg){
    scale2 = msg;
  });
  socket.on('scale3', function(msg){
    scale3 = msg;
  });
  socket.on('scale4', function(msg){
    scale4 = msg;
  });
//=================================================================================




let yoff = 0;
let sound = false;
let mic;
let bc = 0;
let amount = 2000;
let xoff = 02;
let radius;
let startRadius = 750;
let modDepth;
let movingA = [];
let movingSize = 1250;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
    cnv.touchStarted(userStartAudio);
    cnv.mousePressed(userStartAudio);

  mic = new p5.AudioIn();
  mic.start();
  // movingA.length = 50;
  for(i = 0; i < movingSize; i++){
    movingA.push(0);
  }
  // frameRate(1);
}



function draw() {
  let xStart, yStart;
  let sum = 0;

  micLevel = mic.getLevel() * 2;
  if (micLevel > 1){
    micLevel = 1;
  }
  movingA.push(micLevel);
  movingA.shift();
  // console.log(movingA);
  for(i = 0; i < movingA.length; i++){
    sum += movingA[i];
  }
  modDepth = (sum / movingA.length) * 2;
  if (modDepth > 1){
    modDepth = 1;
  }
  // modDepth = 0;
  // console.log('mod ' + modDepth);
  //
  radius = startRadius + (startRadius * modDepth);
  // radius = startRadius;
  // console.log('radius ' + radius);

  stroke(0);
  strokeWeight(1);
  fill(255,40);
  // fill(0);
  translate(width/2, height/2);
  beginShape();
  for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
    noiseV = map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, micLevel);
    // a = cos(-i) * radius * (micLevel + 1);
    // b = sin(-i) * radius * (micLevel + 1);
    //
    // a = a * (noiseV +1);
    // b = b * (noiseV +1);
    a = cos(-i) * radius * noiseV;
    b = sin(-i) * radius * noiseV;


    vertex(a,b);
  }
  endShape(CLOSE);
  // console.log('noiseV' + noiseV);
  yoff += 0.005;
}

function mainVisual(){


}

function touchStarted(){
  if(sound){
    sound = false;
    console.log('stop');
    mic.stop();

    // bc = 255;
  } else if(!sound){
    // background(255);
    sound = true;
    console.log('start');
    mic.start();
    // bc = 0;

  }
}
