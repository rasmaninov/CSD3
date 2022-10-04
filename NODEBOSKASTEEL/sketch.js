let message; 
let poepje;

const socket = io.connect();
console.log(socket);
// connect met socket
  socket.on('connect', _=> {
    console.log("verbonden!");
    // stuur ID aan aperaat dat is verbonden
    socket.emit('phone',socket.id);
  })   


  // ontvang message van MAX
  socket.on('message', function(msg){
    message = msg;
  });
  socket.on('poepje', function(msg){
    poepje = msg;
  });

let x = 20;
let osc;
let sound = false;


function setup() {
  createCanvas(600, 400);
  background(0);
  osc = new p5.SinOsc(440);
  osc.start();
}

function draw() {
  // background
  background(42, poepje, message);
  
  console.log(message,poepje);

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
