
let scale1 = 1; 
let scale2 = 1; 
let scale3 = 1; 
let scale4 = 1; 
let micInput;

let IP;

let snelheidGran = 10; 

let IPconnection = {}

var connected = false;
let socketid;



function OSCdingen(socket){
  
   // connect met socket
   socket.on('connect', _=> {
    socketid = socket.id;
    // console.log(socketid)
    console.log("verbonden!");
      connected = true;

        
      // ontvang IP van alle connecties die worden gemaakt
      socket.on('phoneIDs', (arg)=>{
      IPconnection = arg;
      connect_sockets();
      });
        
      // stuur ID aan aperaat dat is verbonden
    socket.emit('phone',socket.id);
    })   

    if (connected === true){
      console.log("JA",socketid)
    }

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

    socket.on('micInput', function(msg){
      micInput = msg;
    });


    return socketid;
  }


  //=================================================================================

let sketch1;
 
function connect_sockets(){
  for (let i = 0; i < 4;i++){
    console.log( "ARRAY",IPconnection[i])
  }
    console.log( "SOCKET        ",socketid);
}




OSCdingen(socket = io.connect())

function setup(){
  // const ;
  
  console.log(connected)

  if (socket.id = socket.id){

  }




 


    // switch (socketid) {
    //   case IPconnection[0]:
    //     // sketch1 = new p5(phone1(color(100,200,0, 40)));
    //     console.log("JA")
    //     break;
    //   case IPconnection[1]:
    //     // sketch1 = new p5(phone2(color(0,0,100, 40)));
    //     break;
    //   case IPconnection[2]:
    //     // sketch1 = new p5(phone3(color(100,0,0,40)));
    //     break;
    //   case IPconnection[3]:
    //     // sketch1 = new p5(phone4(color(0,50,0,40)));
    //     break;
    //     default:
    // }
  }   




function draw() { 
  // sketch1.OSC(scale1,scale2,scale3,scale4,snelheidGran,micInput); 
}

function phone1(color) {
  let yoff = 0;
  let sound = false;
  let mic;
  let amount = 100;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 400;

  let samp = [];

  let val1;
  let val2;
  let val3;
  let val4;
  let speed;
  let micLevel;

  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/nosie.wav');
    }

    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6) => {
      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      speed = OSC5;
      micLevel = OSC6;
    }

    p.touchStarted = () => {
      
      fullscreen();
    }

    p.setup = () => {
      cnv = p.createCanvas(p.windowWidth, p.windowHeight)
      cnv.touchStarted(userStartAudio);
      cnv.mousePressed(userStartAudio);

      for(i = 0; i < movingSize; i++){
        movingA.push(0);
      }
    };
    
    p.draw = () => {
      p.visuals();
      p.granulair(); 
    }


    p.visuals = () => {
      let sum = 0;

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
    

    p.granulair = () => {
      if (frameCount % speed == 0){
        samp.play();
        samp.jump(random(5), 0.05)
      }

    }

    p.wrap = (point) => {
      if (point => speed) {
        point = 0;
      } 
    }
  };
}

function phone2(color) {
  let yoff = 0;
  let sound = false;
  let mic;
  let amount = 1000;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 100;

  let samp = [];

  let val1;
  let val2;
  let val3;
  let val4;
  let speed;
  let micLevel;

  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6) => {
      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      speed = OSC5;
      micLevel = OSC6;
    }

    p.touchStarted = () => {
      
      fullscreen();
    }

    p.setup = () => {
      cnv = p.createCanvas(p.windowWidth, p.windowHeight)
      cnv.touchStarted(userStartAudio);
      cnv.mousePressed(userStartAudio);

      for(i = 0; i < movingSize; i++){
        movingA.push(0);
      }
    };
    
    p.draw = () => {
      p.visuals();
      p.granulair(); 
    }


    p.visuals = () => {
      let sum = 0;

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
    

    p.granulair = () => {
      if (frameCount % speed == 0){
        samp.play();
        samp.jump(random(5), 0.05)
      }

    }

    p.wrap = (point) => {
      if (point => speed) {
        point = 0;
      } 
    }
  };
}

function phone3(color) {
  let yoff = 0;
  let sound = false;
  let mic;
  let amount = 1000;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 100;

  let samp = [];

  let val1;
  let val2;
  let val3;
  let val4;
  let speed;
  let micLevel;

  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6) => {
      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      speed = OSC5;
      micLevel = OSC6;
    }

    p.touchStarted = () => {
      
      fullscreen();
    }

    p.setup = () => {
      cnv = p.createCanvas(p.windowWidth, p.windowHeight)
      cnv.touchStarted(userStartAudio);
      cnv.mousePressed(userStartAudio);

      for(i = 0; i < movingSize; i++){
        movingA.push(0);
      }
    };
    
    p.draw = () => {
      p.visuals();
      p.granulair(); 
    }


    p.visuals = () => {
      let sum = 0;

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
    

    p.granulair = () => {
      if (frameCount % speed == 0){
        samp.play();
        samp.jump(random(5), 0.05)
      }

    }

    p.wrap = (point) => {
      if (point => speed) {
        point = 0;
      } 
    }
  };
}


function phone4(color) {
  let yoff = 0;
  let sound = false;
  let mic;
  let amount = 1000;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 100;

  let samp = [];

  let val1;
  let val2;
  let val3;
  let val4;
  let speed;
  let micLevel;

  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6) => {
      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      speed = OSC5;
      micLevel = OSC6;
    }

    p.touchStarted = () => {
      
      fullscreen();
    }

    p.setup = () => {
      cnv = p.createCanvas(p.windowWidth, p.windowHeight)
      cnv.touchStarted(userStartAudio);
      cnv.mousePressed(userStartAudio);

      for(i = 0; i < movingSize; i++){
        movingA.push(0);
      }
    };
    
    p.draw = () => {
      p.visuals();
      p.granulair(); 
    }


    p.visuals = () => {
      let sum = 0;

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
    

    p.granulair = () => {
      if (frameCount % speed == 0){
        samp.play();
        samp.jump(random(5), 0.05)
      }

    }

    p.wrap = (point) => {
      if (point => speed) {
        point = 0;
      } 
    }
  };
}



