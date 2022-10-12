<<<<<<< HEAD
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
let movingSize = 125;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
    cnv.touchStarted(userStartAudio);
    cnv.mousePressed(userStartAudio);

  mic = new p5.AudioIn();
  mic.start();
  for(i = 0; i < movingSize; i++){
    movingA.push(0.8);
  }
<<<<<<< HEAD
  background(0);
=======
>>>>>>> mainScaling
}



function draw() {
  scale(scale1,scale2)
  visual(scale3,scale4);
}

function visual(bignessXInput, bignessYInput){
  let sum = 0;
  micLevel = mic.getLevel() * 2;
  if (micLevel > 1){
    micLevel = 1;
  }

  movingA.push(0.5);
  movingA.shift();
  for(i = 0; i < movingA.length; i++){
    sum += movingA[i];

  }
  modDepth = (sum / movingA.length) * 2;
  console.log(modDepth);
  if (modDepth > 1){
    modDepth = 1;
  }
<<<<<<< HEAD
  // modDepth = 0;
  // console.log('mod ' + modDepth);
  //
  // radius = startRadius + (startRadius * modDepth);
  radius = 1250;

  // radius = startRadius;
  // console.log('radius ' + radius);
=======

  radius = startRadius + (startRadius * modDepth);
>>>>>>> mainScaling

  stroke(255);
  strokeWeight(1);
<<<<<<< HEAD
  fill(0,20);
  // fill(0);
=======
  fill(255,40);
>>>>>>> mainScaling
  translate(width/2, height/2);
  beginShape();
  for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
    noiseV = map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);
    // a = cos(-i) * radius * (micLevel + 1);
    // b = sin(-i) * radius * (micLevel + 1);
    //
    // a = a * (noiseV +1);
    // b = b * (noiseV +1);
    a = cos(-i) * radius * noiseV;
    b = sin(-i) * radius * noiseV;


    vertex(a * bignessXInput,b * bignessYInput);
  }
  endShape(CLOSE);
  yoff += 0.005;
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
=======
>>>>>>> 077c3349bb1bfba4819ae3ec41c298530676389d
