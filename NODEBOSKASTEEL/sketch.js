// let x = 20;
// let osc;
// function setup() {
//
//   createCanvas(600, 400);
//   background(0);
//   osc = new p5.SinOsc(440);
//
// }
//
// function draw() {
//   // background
//   background(42, 169, 217);
//   osc.start();
//
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

function draw() {
  background(255);
  textAlign(CENTER);

  if (getAudioContext().state !== 'running') {
    text('click to start audio', width/2, height/2);
  } else {
    text('audio is enabled', width/2, height/2);
  }
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  var synth = new p5.MonoSynth();
  synth.play('A4', 0.5, 0, 0.2);
}
