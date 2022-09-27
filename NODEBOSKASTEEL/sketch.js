let amplitude = 0;
let speedAmp = 0.01;

let amplitude2 = 0;
let speedAmp2 = 0.01;

let freq = 440;
let speed = 0.01;

let rand;
let rand2;

let server;
let connect
let x, y;

function setup() {
  createCanvas(600, 400);
  background(0);
  frameRate(30);
  osc1 = new p5.SinOsc(440);
  osc2 = new p5.SinOsc(440);

  osc1.amp(0.1);
  osc1.freq(440);
  osc1.start();

  osc2.amp(0.1);
  osc2.freq(440);
  osc2.start();
}

function draw() {
  background(255);
  textAlign(CENTER);

  if (getAudioContext().state !== 'running') {
    text('click to start audio', width/2, height/2);
  } else {
    text('audio is enabled', width/2, height/2);
  }

  if (frameCount % 40 == 0){
    rand = 50 + random(200);
  } 
  if (frameCount % 10 == 0 ){
  rand2 = 500 + random(500);
  }
  osc1.freq(rand);
  osc2.freq(rand2);


  ampitudeTest();

  ellipse(x,y,25);


}

function ampitudeTest(){
  amplitude += speedAmp;
  if (amplitude > 0.5){
    speedAmp = speedAmp - 0.01;
  }
  if (amplitude < 0.1){
    speedAmp = speedAmp + 0.01;
  }

  amplitude2 += speedAmp2;
  if (amplitude2 > 0.5){
    speedAmp2 = speedAmp2 - 0.01;
  }
  if (amplitude2 < 0.1){
    speedAmp2 = speedAmp2 + 0.01;
  }

  osc1.amp(amplitude);
  osc2.amp(amplitude2);
}


function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}





// let x = 20;
// let osc;
// function setup() {
//   createCanvas(600, 400);
//   background(0);
//   osc = new p5.SinOsc(440);

// }

// function draw() {
//   // background
//   background(42, 169, 217);
//   osc.start();

//   osc.amp(1);
//   osc.freq(440);
//   // ellipse
//   fill(242, 228, 21);
//   ellipse(100,100,100,100);
//   //rectangle
//   fill(0,217, 39);
//   rect(x,100,150,150);
//   x += 10;
//   if(x >= height){
//     x = 0;
//   }
// }
