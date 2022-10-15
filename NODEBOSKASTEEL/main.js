let scale1 = 1; 
let scale2 = 1; 
let scale3 = 1; 
let scale4 = 1; 
let micInput = 1;
let snelheidGran = 10; 

let counter = 1;
let newSamp;
function preload() {
  loadSound("audio_samples/bird.mp3");
  loadSound("audio_samples/nosie.wav");
  loadSound("audio_samples/lion.mp3");
  loadSound("audio_samples/cow.wav");

}



let IP;

let IPconnection = {}

var connected = false;
let socketid;

function connect_sockets(){
  for (let i = 0; i < 4;i++){
    console.log( "ARRAY",IPconnection[i])
  }
    console.log( "SOCKET        ",socketid);
}


function setup() {
  frameRate(12);
  // het zit anders met hoogte en breedte in een subsketch, vabndaar geef in deze meer in de constructor 
  let hoog = windowHeight;
  let breed = windowWidth;
  console.log(breed,hoog);


  const socket = io.connect()
  // connect met socket
  socket.on('connect', _ => {
    socketid = socket.id;
    console.log("verbonden!");

    // ontvang IP van alle connecties die worden gemaakt
    socket.on('phoneIDs', (arg) => {

      // stuur ID aan aperaat dat is verbonden
      socket.emit('phone', socket.id);
      IPconnection = arg;
      connected = true;

      if (connected === true) {
        switch (socketid) {
          case IPconnection[0]:
            sketch1 = new p5(phone1(breed,hoog,color(100, 200, 0, 40),newSamp));
            sketch1.OSC(scale1, scale2, scale3, scale4, snelheidGran, micInput);
            console.log("JA nummer 1")
            break;

          case IPconnection[1]:
            sketch1 = new p5(phone1(breed,hoog,color(0, 100, 100, 40),newSamp));
            sketch1.OSC(scale1, scale2, scale3, scale4, snelheidGran, micInput);
            console.log("JA nummer 2")
            break;

          case IPconnection[2]:
            sketch1 = new p5(phone1(breed,hoog,color(200, 0, 0, 40),newSamp));
            sketch1.OSC(scale1, scale2, scale3, scale4, snelheidGran, micInput);
            console.log("JA nummer 3")
            break;

          case IPconnection[3]:
            sketch1 = new p5(phone1(breed,hoog,color(100, 200, 255, 40),newSamp));
            sketch1.OSC(scale1, scale2, scale3, scale4, snelheidGran, micInput);
            console.log("JA nummer 4")
            break;

          default:
        }
      }
    });
  })  
  
  // ontvang message van MAX
  socket.on('scale1', function (msg) {
    scale1 = msg;
  });
  socket.on('scale2', function (msg) {
    scale2 = msg;
  });
  socket.on('scale3', function (msg) {
    scale3 = msg;
  });
  socket.on('scale4', function (msg) {
    scale4 = msg;
  });

  socket.on('snelheidGran', function (msg) {
    snelheidGran = msg;
  });

  socket.on('micInput', function (msg) {
    micInput = msg;
  });
}   

function draw() { 
  if (connected == true){
    sketch1.OSC(scale1,scale2,scale3,scale4,snelheidGran,micInput); 
  }
}

function phone1(breed,hoog,color,newSample) {
  let yoff = 0;
  // let sound = false;
  // let mic;
  let amount = 20;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 40;
  let dur = 0;

  // sample die word ingeladen
  let samp;


  // dit is vooir het scalen!
  let val1;
  let val2;
  let val3;
  let val4;
  // Dit is voor snelheid van afspelen sample
  let speed;
  // mic level vanuit max
  let micLevel;

  let counter = 0 ;

  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    // OSC waardes komen binnen
    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6) => {
      if (OSC5 !== speed) {
        counter = 0;
      }
      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      speed = OSC5;
      micLevel = OSC6;
      
    }

    p.setup = () => {
      // moet blijbaar breed en hoog sturen vanuit de sketch, subsketch ziet geen height en width
      // - 200 anders die hij raar met het vullen van het scherm 
      cnv = p.createCanvas(breed,hoog)
      cnv.touchStarted(userStartAudio);
      cnv.mousePressed(userStartAudio);
      
      for(i = 0; i < movingSize; i++){
        movingA.push(0);
      }
      
      // samp.playMode('restart')
      env = new p5.Envelope();
      osc = new p5.Oscillator('sine');
      osc.start();
      osc.freq(100);
      osc.amp(0.8)
      env.setADSR(0.2, 0.01, 0.01, 0.1);

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

      cnv.stroke(color);
      cnv.strokeWeight(1);
      cnv.fill(0,3);
      // cnv.translate(width/2 + val3 , height/2 + val4);
      cnv.translate(breed/2, hoog/2);

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
      counter += 1;
      if (counter == speed){
        
        counter = 0;
        // samp.play(0,1,0.8,random(20),0.2 )
        // osc.freq(random(100)+ 100, 0.5);
        // osc.amp(1, 0.5);
        env.play();
        
        osc.freq(100 + random(500));
        // osc.amp(0.5);

      }
    }
  }
};

