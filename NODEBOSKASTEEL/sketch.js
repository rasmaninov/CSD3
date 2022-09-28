let message; 

const socket = io.connect();
console.log(socket);
  socket.on('connect', _=> {
    console.log("verbonden!");
    socket.emit('phone',socket.id);
  })   
  socket.on('message', function(msg){
    // document.querySelector('#message').innerText = msg;
    message = msg;
  });

let x = 20;
let osc;
let sound = false;


function setup() {
  createCanvas(600, 400);
  background(0);
  osc = new p5.SinOsc(440);
  osc.start();

  // document.addEventListener('DOMContentLoaded', function() {
   
  // });

}

function draw() {
  // background
  background(42, 169, message);

  // console.log(message);

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
