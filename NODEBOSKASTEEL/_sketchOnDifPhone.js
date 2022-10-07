let scale1 = 1; 
let scale2 = 1; 
let scale3 = 1; 
let scale4 = 1; 

let IP;

let snelheidGran = 10; 

const socket = io.connect();

let IPconnection = {}
let socketid;

  // connect met socket
socket.on('connect', _=> {


  socketid = socket.id;
  // console.log(socketid)
  console.log("verbonden!");

      // stuur ID aan aperaat dat is verbonden
    socket.emit('phone',socket.id);
    })   

    // ontvang IP van alle connecties die worden gemaakt
    socket.on('phoneIDs', (arg)=>{
      IPconnection = arg;
      // console.log(IPconnection)

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

    socket.on('snelheidGran', function(msg){
      snelheidGran = msg;
    });
    

  //=================================================================================

let sketch1;
 
function setup(){
  console.log("idserver" , IPconnection[0], "IDSKETCH" , socketid)
  
  if (IPconnection[0] == socketid){
    sketch1 = new p5(phone1(color(100,200,0)));
  }

  else if (IPconnection[1] == socketid){
    // sketch1 = new p5(makeSketch("red"));
    sketch1 = new p5(phone2(color(200,0,100)));
  }
}

function draw() { 
  sketch1.OSC(scale1,scale2,scale3,scale4);
}










function phone1(color) {
  let cvn;
  let yoff = 0;
  let sound = false;
  let mic;
  let bc = 0;
  let amount = 2000;
  let xoff = 02;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 50;

  let env;
  let grains = 20;

  let samp = [];

  let index = 0;

  let val1;
  let val2;
  let val3;
  let val4;
  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/nosie.wav');
    }

    p.OSC = (OSC1,OSC2,OSC3,OSC4) =>{
      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
    }

    p.setup = () => {
      cnv = p.createCanvas(p.windowWidth, p.windowHeight)
      cnv.touchStarted(userStartAudio);
      cnv.mousePressed(userStartAudio);

      mic = new p5.AudioIn();
      mic.start();

      for(i = 0; i < movingSize; i++){
        movingA.push(0);
      }
    };
    
    p.draw = () => {
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
      if (modDepth > 1){
        modDepth = 1;
      }

      radius = startRadius + (startRadius * modDepth);

      cnv.stroke(0);
      cnv.strokeWeight(1);
      cnv.fill(color);
      cnv.translate(width/2 + val3 , height/2 + val4);
      p.beginShape();
      for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
        noiseV = p.map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);

        a = p.cos(-i) * radius * noiseV;
        b = p.sin(-i) * radius * noiseV;


        p.vertex(a * val1,b * val2);
      }
      p.endShape(CLOSE);
      yoff += 0.005;
    }

    p.touchStarted = () => {
      if(sound){
        sound = false;
        console.log('stop');
        mic.stop();
    
      } else if(!sound){
        // background(255);
        sound = true;
        console.log('start');
        mic.start();
      }
    }
  };
}


function phone2(color) {
  let cvn;
  let yoff = 0;
  let sound = false;
  let mic;
  let bc = 0;
  let amount = 2000;
  let xoff = 02;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 50;

  let env;
  let grains = 20;

  let samp = [];

  let index = 0;

  let val1;
  let val2;
  let val3;
  let val4;
  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/nosie.wav');
    }

    p.OSC = (OSC1,OSC2,OSC3,OSC4) =>{
      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
    }

    p.setup = () => {
      cnv = p.createCanvas(p.windowWidth, p.windowHeight)
      cnv.touchStarted(userStartAudio);
      cnv.mousePressed(userStartAudio);

      mic = new p5.AudioIn();
      mic.start();

      for(i = 0; i < movingSize; i++){
        movingA.push(0);
      }
    };
    
    p.draw = () => {
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
      if (modDepth > 1){
        modDepth = 1;
      }

      radius = startRadius + (startRadius * modDepth);

      cnv.stroke(0);
      cnv.strokeWeight(1);
      cnv.fill(color);
      cnv.translate(width/2 + val3 , height/2 + val4);
      p.beginShape();
      for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
        noiseV = p.map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);

        a = p.cos(-i) * radius * noiseV;
        b = p.sin(-i) * radius * noiseV;


        p.vertex(a * val1,b * val2);
      }
      p.endShape(CLOSE);
      yoff += 0.005;
    }

    p.touchStarted = () => {
      if(sound){
        sound = false;
        console.log('stop');
        mic.stop();
    
      } else if(!sound){
        // background(255);
        sound = true;
        console.log('start');
        mic.start();
      }
    }
  };
}




