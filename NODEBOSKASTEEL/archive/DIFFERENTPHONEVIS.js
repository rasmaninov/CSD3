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




let x = 20;
let osc;
let sound = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,24,100)

}

function draw() { 
  if (IPconnection[0] == socket.id){
    scale(scale1,scale2);
    visual(1, 200, 200)
  }
  if (IPconnection[1] == socket.id){
    scale(message);
    visual(100, 20, 100)
  }
}

function visual( c1,  c2,  c3){
  background(20,255,53)
  fill(100,0,c3)
  ellipse(windowWidth/2, windowHeight/2, windowHeight/4,windowWidth /4);

}

function touchStarted(){
  if(sound){
    sound = false;
  } else if(!sound){
    sound = true;
}
}
