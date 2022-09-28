const maxApi = require('max-api');
const ioclient = require('socket.io-client');

let socketOSC; 

maxApi.addHandler('connect',(url) => {
    socketOSC = ioclient(url);
}); 

maxApi.addHandler('disconnect',(url) => {
  socketOSC.close();
}); 

maxApi.addHandler('message',(msg) => {
  socketOSC.emit('message',msg)
}); 


// function setup() {
//     createCanvas(600, 400);
//     background(0);
//     osc = new p5.SinOsc(440);
//     osc.start();
  
//   }
  
// function draw() {
//     // background
//     background(42, 169, 217);
  
//     osc.amp(1);
//     osc.freq(440);
//     // ellipse
//     fill(242, 228, 21);
//     ellipse(100,100,100,100);
//     //rectangle
//     fill(0,217, 39);
//     rect(x,100,150,150);
//     x += 10;
//     if(x >= height){
//       x = 0;
//     }
//   }