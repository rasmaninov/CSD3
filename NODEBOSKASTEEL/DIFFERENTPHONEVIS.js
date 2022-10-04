let message = 100; 
let poepje = 192;
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
  createCanvas(windowWidth, windowHeight);
  background(0,24,100)

}

function draw() {
  if (IPconnection[0] == socket.id){
    scale(1);
    visual(1, 200, 200)
  }
  if (IPconnection[1] == socket.id){
    scale(1);
    visual(100, 20, 100)
  }
  // visual(0, 20, 200)

  
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
