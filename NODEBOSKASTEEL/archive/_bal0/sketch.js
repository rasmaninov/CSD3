let yoff = 0;
let sound = false;
let mic;
let bc = 0;
let amount = 2000;
let xoff = 02;
let radius;
let startRadius = 10000;
let modDepth;
let movingA = [];
let movingSize = 10;

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
  scale(2)
  visual();
}

function visual(){
  let xStart, yStart;
  let sum = 0;

  micLevel = mic.getLevel() * 2;
  if (micLevel > 1){
    micLevel = 1;
  }
  movingA.push(micLevel);
  movingA.shift();
  for(i = 0; i < movingA.length; i++){
    sum += movingA[i];
  }
  modDepth = (sum / movingA.length) * 2;
  // console.log(modDepth);
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
    noiseV = map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);
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
