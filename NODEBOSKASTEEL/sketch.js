let x = 20;
let osc;
let sound = false;
function setup() {

  createCanvas(600, 400);
  background(0);

  //oscillator
  osc = new p5.SinOsc(600);
  osc.start();

  //delay
  delay = new p5.Delay();
  // source, delayTime (in seconds), feedback, filter frequency
  delay.process(osc, 0.12, .7, 2300);
  
  reverb = new p5.Reverb();
  // connect soundFile to reverb, process w/
  // 3 second reverbTime, decayRate of 2%
  reverb.process(osc, 10, 3);

}

function draw() {
  // background
  background(100, 0, 217);

  osc.amp(1);
  osc.freq(440);
  // ellipse
  fill(242, 228, 21);
  ellipse(100,100,100,100);
  //rectangle
  fill(0,217, 39);
  rect(x,100,150,150);
  x += 10;
  if(x >= height){
    x = 0;
  }
}

function touchStarted(){
  if(sound){
    sound = false;
    osc.stop();
  } else if(!sound){
    sound = true;
    osc.start();
  }
}
