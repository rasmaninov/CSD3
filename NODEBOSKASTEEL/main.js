
let scale1 = 1; 
let scale2 = 1; 
let scale3 = 1; 
let scale4 = 1; 
let speedPhone1 = 10;
let speedPhone2 = 10;
let speedPhone3 = 10;
let speedPhone4 = 10;
let speedPhone5 = 10;
let speedPhone6 = 10;
let speedPhone7 = 10;
let speedPhone8 = 10;
let micInput; 
let mic;

let counter = 1;
let newSamp;

let vaag = 2;
let vaag2 = 40;

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
            sketch1 = new p5(phone1(breed,hoog,color(100,20,10,vaag2),color(0,vaag)));
            sketch1.OSC(
            scale1,scale2,scale3,scale4,mic,
            speedPhone1,speedPhone2,speedPhone3,speedPhone4,
            speedPhone5,speedPhone6,speedPhone7,speedPhone8
            );
            console.log("JA nummer 1")
            break;

          case IPconnection[1]:
            sketch1 = new p5(phone2(breed,hoog,color(100,200,10,vaag2),color(0,vaag)));
            sketch1.OSC(
            scale1,scale2,scale3,scale4,micInput,
            speedPhone1,speedPhone2,speedPhone3,speedPhone4,
            speedPhone5,speedPhone6,speedPhone7,speedPhone8
            );
            console.log("JA nummer 2")
            break;

          case IPconnection[2]:
            sketch1 = new p5(phone3(breed,hoog,color(10,200,100,vaag2),color(0,vaag)));
            sketch1.OSC(
            scale1,scale2,scale3,scale4,micInput,
            speedPhone1,speedPhone2,speedPhone3,speedPhone4,
            speedPhone5,speedPhone6,speedPhone7,speedPhone8
            );
            console.log("JA nummer 3")
            break;

          case IPconnection[3]:
            sketch1 = new p5(phone4(breed,hoog,color(10,200,0,vaag2),color(0,vaag)));
            sketch1.OSC(
            scale1,scale2,scale3,scale4,micInput,
            speedPhone1,speedPhone2,speedPhone3,speedPhone4,
            speedPhone5,speedPhone6,speedPhone7,speedPhone8
            );
            console.log("JA nummer 4")
            break;

          case IPconnection[4]:
            sketch1 = new p5(phone5(breed,hoog,color(255,200,0,vaag2),color(0,vaag)));
            sketch1.OSC(
            scale1,scale2,scale3,scale4,micInput,
            speedPhone1,speedPhone2,speedPhone3,speedPhone4,
            speedPhone5,speedPhone6,speedPhone7,speedPhone8
            );
            console.log("JA nummer 5")
            break;

          case IPconnection[5]:
            sketch1 = new p5(phone6(breed,hoog,color(255,200,20,vaag2),color(0,vaag)));
            sketch1.OSC(
            scale1,scale2,scale3,scale4,micInput,
            speedPhone1,speedPhone2,speedPhone3,speedPhone4,
            speedPhone5,speedPhone6,speedPhone7,speedPhone8
            );
            console.log("JA nummer 6")
            break;

          case IPconnection[6]:
            sketch1 = new p5(phone7(breed,hoog,color(0,100,20,vaag2),color(0,vaag)));
            sketch1.OSC(
            scale1,scale2,scale3,scale4,micInput,
            speedPhone1,speedPhone2,speedPhone3,speedPhone4,
            speedPhone5,speedPhone6,speedPhone7,speedPhone8
            );
            console.log("JA nummer 7")
            break;

          case IPconnection[7]:
              sketch1 = new p5(phone8());
              sketch1.OSC(
              scale1,scale2,scale3,scale4,micInput,
              speedPhone1,speedPhone2,speedPhone3,speedPhone4,
              speedPhone5,speedPhone6,speedPhone7,speedPhone8
              );
              console.log("JA nummer 7")
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

  socket.on('micInput', function (msg) {
    micInput = msg;
  });

  socket.on('speedPhone1', function (msg) {
    speedPhone1 = msg;
  });
  socket.on('speedPhone2', function (msg) {
    speedPhone2 = msg;
  });
  socket.on('speedPhone3', function (msg) {
    speedPhone3 = msg;
  });
  socket.on('speedPhone4', function (msg) {
    speedPhone4 = msg;
  });
  socket.on('speedPhone5', function (msg) {
    speedPhone5 = msg;
  });
  socket.on('speedPhone6', function (msg) {
    speedPhone6 = msg;
  });
  socket.on('speedPhone7', function (msg) {
    speedPhone7 = msg;
  });
  socket.on('speedPhone8', function (msg) {
    speedPhone8 = msg;
  });

}   

function draw() { 
  if (connected == true){
    sketch1.OSC(
      scale1,scale2,scale3,scale4,micInput,
      speedPhone1,speedPhone2,speedPhone3,speedPhone4,
      speedPhone5,speedPhone6,speedPhone7,speedPhone8
      ); 
  }
}

function phone1(breed,hoog,color,InnerCollor) {
  let yoff = 0;
  // let sound = false;
  // let mic;
  let amount = 200;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 40;
  let dur = 0;

  let C7 = [185.00, 207.65, 261.63, 369.99, 698.46, 523.25,246.94,880.00,466.16,440.00];

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
  let speedPhone1;
  let speedPhone2;
  let speedPhone3;
  let speedPhone4;
  let speedPhone5;
  let speedPhone6;
  let speedPhone7;
  let speedPhone8;

  let counter = 0 ;

  // let mic;



  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    // OSC waardes komen binnen
    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6, OSC7, OSC8, OSC9,OSC10, OSC11,OSC12) => {

      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      micInputInput = OSC5;
      speedPhone1 = OSC6;
      speedPhone2 = OSC7;
      speedPhone3 = OSC8;
      speedPhone4 = OSC9;
      speedPhone5 = OSC10;
      speedPhone6 = OSC10;
      speedPhone7 = OSC11;
      speedPhone8 = OSC12;
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
      
      env = new p5.Envelope();
      carrier = new p5.Oscillator('saw');
      modulator = new p5.Oscillator('sine');

      carrier.start();
      carrier.freq(220);
      carrier.amp(0.0);

      modulator.start();
      // modulator.disconnect();

      modulator.freq(460);
      // modulator.amp(0.0);
      modulator.amp(1)

      env.setADSR(0.01, 0.05, 0.01, 0.01);

    };

    
    p.draw = () => {
      
      p.visuals();
      p.granulair();
       
    }

    p.visuals = () => {      
      let sum = 0;
      movingA.push(micInputInput);
      movingA.shift();
      for(i = 0; i < movingA.length; i++){
        sum += movingA[i];
      }

      modDepth = (sum / movingA.length) * 1.;
      if (modDepth > 1){
        modDepth = 1;
      }

      radius = startRadius + (startRadius * modDepth);

      cnv.stroke(color);
      cnv.strokeWeight(4);
      cnv.fill(InnerCollor);
      // cnv.translate(width/2 + val3 , height/2 + val4);
      cnv.translate(breed/2 + 300 , hoog/2 + 0);

      p.beginShape();
      for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
        noiseV = p.map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);

        a = p.cos(-i) * radius * noiseV;
        b = p.sin(-i) * radius * noiseV;


        p.vertex(a * 1,b * 1.5);
      }
      p.endShape(CLOSE);
      yoff += 0.005;
    }
    
    p.granulair = () => {
      counter += 1;
      if (counter >= speedPhone1){
        counter = 0;

        let peop = int(random(10));

        // samp.play(0,1,0.8,random(20),0.2 )
        env.play(carrier);
        env.play(modulator);


        modulator.freq(C7[peop]*2)
        carrier.freq(modulator);

        // carrier.freq(C7[peop]);
        // osc.amp(0.5);

      }
    }
  }
};

function phone2(breed,hoog,color,InnerCollor) {
  let yoff = 0;
  // let sound = false;
  // let mic;
  let amount = 200;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 40;
  let dur = 0;

  let C7 = [185.00, 207.65, 261.63, 369.99, 698.46, 523.25,246.94,880.00,466.16,440.00];

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
  let speedPhone1;
  let speedPhone2;
  let speedPhone3;
  let speedPhone4;
  let speedPhone5;
  let speedPhone6;
  let speedPhone7;
  let speedPhone8;

  let counter = 0 ;

  // let mic;



  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    // OSC waardes komen binnen
    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6, OSC7, OSC8, OSC9,OSC10, OSC11,OSC12) => {

      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      micInputInput = OSC5;
      speedPhone1 = OSC6;
      speedPhone2 = OSC7;
      speedPhone3 = OSC8;
      speedPhone4 = OSC9;
      speedPhone5 = OSC10;
      speedPhone6 = OSC10;
      speedPhone7 = OSC11;
      speedPhone8 = OSC12;
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
      
      env = new p5.Envelope();
      carrier = new p5.Oscillator('sine');
      modulator = new p5.Oscillator('sine');

      carrier.start();
      carrier.freq(220);
      carrier.amp(0.0);

      modulator.start();
      // modulator.disconnect();

      modulator.freq(460);
      // modulator.amp(0.0);
      modulator.amp(1)


      env.setADSR(0.01, 0.05, 0.01, 0.01);

    };

    
    p.draw = () => {
      p.visuals();
        
      p.granulair();
       
    }

    p.visuals = () => {
      let sum = 0;
      movingA.push(micInputInput);
      movingA.shift();
      for(i = 0; i < movingA.length; i++){
        sum += movingA[i];
      }

      modDepth = (sum / movingA.length) * 1;
      if (modDepth > 1){
        modDepth = 1;
      }

      radius = startRadius + (startRadius * modDepth);

      cnv.stroke(color);
      cnv.strokeWeight(4);
      cnv.fill(InnerCollor);     // cnv.translate(width/2 + val3 , height/2 + val4);
      cnv.translate(breed/2 + 325 , hoog/2 + 625);

      p.beginShape();
      for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
        noiseV = p.map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);

        a = p.cos(-i) * radius * noiseV;
        b = p.sin(-i) * radius * noiseV;


        p.vertex(a * 1,b * 3);
      }
      p.endShape(CLOSE);
      yoff += 0.005;
    }
    
    p.granulair = () => {
      counter += 1;
      if (counter >= speedPhone2){
        counter = 0;

        let peop = int(random(10));

        // samp.play(0,1,0.8,random(20),0.2 )
        env.play(carrier);
        env.play(modulator);


        modulator.freq(C7[peop])
        carrier.freq(modulator);

        // carrier.freq(C7[peop]);
        // osc.amp(0.5);

      }
    }
  }
};

function phone3(breed,hoog,color,InnerCollor) {
  let yoff = 0;
  // let sound = false;
  // let mic;
  let amount = 200;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 40;
  let dur = 0;

  let C7 = [185.00, 207.65, 261.63, 369.99, 698.46, 523.25,246.94,880.00,466.16,440.00];

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
  let speedPhone1;
  let speedPhone2;
  let speedPhone3;
  let speedPhone4;
  let speedPhone5;
  let speedPhone6;
  let speedPhone7;
  let speedPhone8;

  let counter = 0 ;

  // let mic;



  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    // OSC waardes komen binnen
    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6, OSC7, OSC8, OSC9,OSC10, OSC11,OSC12) => {

      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      micInputInput = OSC5;
      speedPhone1 = OSC6;
      speedPhone2 = OSC7;
      speedPhone3 = OSC8;
      speedPhone4 = OSC9;
      speedPhone5 = OSC10;
      speedPhone6 = OSC10;
      speedPhone7 = OSC11;
      speedPhone8 = OSC12;
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
      
      env = new p5.Envelope();
      carrier = new p5.Oscillator('sine');
      modulator = new p5.Oscillator('sine');

      carrier.start();
      carrier.freq(220);
      carrier.amp(0.0);

      modulator.start();
      // modulator.disconnect();

      modulator.freq(460);
      // modulator.amp(0.0);
      modulator.amp(1)


      env.setADSR(0.01, 0.05, 0.01, 0.01);

    };

    
    p.draw = () => {
      p.visuals();
        
      p.granulair();
       
    }

    p.visuals = () => {
      let sum = 0;
      movingA.push(micInputInput);
      movingA.shift();
      for(i = 0; i < movingA.length; i++){
        sum += movingA[i];
      }

      modDepth = (sum / movingA.length) * 1.;
      if (modDepth > 1){
        modDepth = 1;
      }

      radius = startRadius + (startRadius * modDepth);

      cnv.stroke(color);
      cnv.strokeWeight(4);
      cnv.fill(InnerCollor);     // cnv.translate(width/2 + val3 , height/2 + val4);
      cnv.translate(breed/2 + 286 , hoog/2 - 450);

      p.beginShape();
      for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
        noiseV = p.map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);

        a = p.cos(-i) * radius * noiseV;
        b = p.sin(-i) * radius * noiseV;


        p.vertex(a * 1.,b * 2.5);
      }
      p.endShape(CLOSE);
      yoff += 0.005;
    }
    
    p.granulair = () => {
      counter += 1;
      if (counter >= speedPhone3){
        counter = 0;

        let peop = int(random(10));

        // samp.play(0,1,0.8,random(20),0.2 )
        env.play(carrier);
        env.play(modulator);


        modulator.freq(C7[peop])
        carrier.freq(modulator);

        // carrier.freq(C7[peop]);
        // osc.amp(0.5);

      }
    }
  }
};

function phone4(breed,hoog,color,InnerCollor) {
  let yoff = 0;
  // let sound = false;
  // let mic;
  let amount = 200;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 40;
  let dur = 0;

  let C7 = [185.00, 207.65, 261.63, 369.99, 698.46, 523.25,246.94,880.00,466.16,440.00];

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
  let speedPhone1;
  let speedPhone2;
  let speedPhone3;
  let speedPhone4;
  let speedPhone5;
  let speedPhone6;
  let speedPhone7;
  let speedPhone8;

  let counter = 0 ;

  // let mic;



  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    // OSC waardes komen binnen
    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6, OSC7, OSC8, OSC9,OSC10, OSC11,OSC12) => {

      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      micInputInput = OSC5;
      speedPhone1 = OSC6;
      speedPhone2 = OSC7;
      speedPhone3 = OSC8;
      speedPhone4 = OSC9;
      speedPhone5 = OSC10;
      speedPhone6 = OSC10;
      speedPhone7 = OSC11;
      speedPhone8 = OSC12;
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
      
      env = new p5.Envelope();
      carrier = new p5.Oscillator('sine');
      modulator = new p5.Oscillator('sine');

      carrier.start();
      carrier.freq(220);
      carrier.amp(0.0);

      modulator.start();
      // modulator.disconnect();

      modulator.freq(460);
      // modulator.amp(0.0);
      modulator.amp(1)


      env.setADSR(0.01, 0.05, 0.01, 0.01);

    };

    
    p.draw = () => {
      p.visuals();
        
      p.granulair();
       
    }

    p.visuals = () => {
      let sum = 0;
      movingA.push(micInputInput);
      movingA.shift();
      for(i = 0; i < movingA.length; i++){
        sum += movingA[i];
      }

      modDepth = (sum / movingA.length) * 1.3;
      if (modDepth > 1){
        modDepth = 1;
      }

      radius = startRadius + (startRadius * modDepth);

      cnv.stroke(color);
      cnv.strokeWeight(4);
      cnv.fill(InnerCollor);     // cnv.translate(width/2 + val3 , height/2 + val4);
      cnv.translate(breed/2 + 1 , hoog/2 + 1);

      p.beginShape();
      for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
        noiseV = p.map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);

        a = p.cos(-i) * radius * noiseV;
        b = p.sin(-i) * radius * noiseV;


        p.vertex(a * 1.3,b * 1.3);
      }
      p.endShape(CLOSE);
      yoff += 0.005;
    }
    
    p.granulair = () => {
      counter += 1;
      if (counter >= speedPhone4){
        counter = 0;

        let peop = int(random(10));

        // samp.play(0,1,0.8,random(20),0.2 )
        env.play(carrier);
        env.play(modulator);


        modulator.freq(C7[peop])
        carrier.freq(modulator);

        // carrier.freq(C7[peop]);
        // osc.amp(0.5);

      }
    }
  }
};

function phone5(breed,hoog,color,InnerCollor) {
  let yoff = 0;
  // let sound = false;
  // let mic;
  let amount = 200;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 40;
  let dur = 0;

  let C7 = [185.00, 207.65, 261.63, 369.99, 698.46, 523.25,246.94,880.00,466.16,440.00];

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
  let speedPhone1;
  let speedPhone2;
  let speedPhone3;
  let speedPhone4;
  let speedPhone5;
  let speedPhone6;
  let speedPhone7;
  let speedPhone8;

  let counter = 0 ;

  // let mic;



  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    // OSC waardes komen binnen
    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6, OSC7, OSC8, OSC9,OSC10, OSC11,OSC12) => {

      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      micInputInput = OSC5;
      speedPhone1 = OSC6;
      speedPhone2 = OSC7;
      speedPhone3 = OSC8;
      speedPhone4 = OSC9;
      speedPhone5 = OSC10;
      speedPhone6 = OSC10;
      speedPhone7 = OSC11;
      speedPhone8 = OSC12;
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
      
      env = new p5.Envelope();
      carrier = new p5.Oscillator('sine');
      modulator = new p5.Oscillator('sine');

      carrier.start();
      carrier.freq(220);
      carrier.amp(0.0);

      modulator.start();
      // modulator.disconnect();

      modulator.freq(460);
      // modulator.amp(0.0);
      modulator.amp(1)


      env.setADSR(0.01, 0.05, 0.01, 0.01);

    };

    
    p.draw = () => {
      p.visuals();
        
      p.granulair();
       
    }

    p.visuals = () => {
      let sum = 0;
      movingA.push(micInputInput);
      movingA.shift();
      for(i = 0; i < movingA.length; i++){
        sum += movingA[i];
      }

      modDepth = (sum / movingA.length) * 1;
      if (modDepth > 1){
        modDepth = 1;
      }

      radius = startRadius + (startRadius * modDepth);

      cnv.stroke(color);
      cnv.strokeWeight(4);
      cnv.fill(InnerCollor);     // cnv.translate(width/2 + val3 , height/2 + val4);
      cnv.translate(breed/2 -177 , hoog/2 + 180);

      p.beginShape();
      for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
        noiseV = p.map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);

        a = p.cos(-i) * radius * noiseV;
        b = p.sin(-i) * radius * noiseV;


        p.vertex(a * 1,b * 1);
      }
      p.endShape(CLOSE);
      yoff += 0.005;
    }
    
    p.granulair = () => {
      counter += 1;
      if (counter >= speedPhone5){
        counter = 0;

        let peop = int(random(10));

        // samp.play(0,1,0.8,random(20),0.2 )
        env.play(carrier);
        env.play(modulator);


        modulator.freq(C7[peop])
        carrier.freq(modulator);

        // carrier.freq(C7[peop]);
        // osc.amp(0.5);

      }
    }
  }
};

function phone6(breed,hoog,color,InnerCollor) {1
  let yoff = 0;
  // let sound = false;
  // let mic;
  let amount = 200;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 40;
  let dur = 0;

  let C7 = [185.00, 207.65, 261.63, 369.99, 698.46, 523.25,246.94,880.00,466.16,440.00];

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
  let speedPhone1;
  let speedPhone2;
  let speedPhone3;
  let speedPhone4;
  let speedPhone5;
  let speedPhone6;
  let speedPhone7;
  let speedPhone8;

  let counter = 0 ;

  // let mic;



  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    // OSC waardes komen binnen
    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6, OSC7, OSC8, OSC9,OSC10, OSC11,OSC12) => {

      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      micInputInput = OSC5;
      speedPhone1 = OSC6;
      speedPhone2 = OSC7;
      speedPhone3 = OSC8;
      speedPhone4 = OSC9;
      speedPhone5 = OSC10;
      speedPhone6 = OSC10;
      speedPhone7 = OSC11;
      speedPhone8 = OSC12;
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
      
      env = new p5.Envelope();
      carrier = new p5.Oscillator('sine');
      modulator = new p5.Oscillator('sine');

      carrier.start();
      carrier.freq(220);
      carrier.amp(0.0);

      modulator.start();
      // modulator.disconnect();

      modulator.freq(460);
      // modulator.amp(0.0);
      modulator.amp(1)


      env.setADSR(0.01, 0.05, 0.01, 0.01);

    };

    
    p.draw = () => {
      p.visuals();
        
      p.granulair();
       
    }

    p.visuals = () => {
      let sum = 0;
      movingA.push(micInputInput);
      movingA.shift();
      for(i = 0; i < movingA.length; i++){
        sum += movingA[i];
      }

      modDepth = (sum / movingA.length) * 1;
      if (modDepth > 1){
        modDepth = 1;
      }

      radius = startRadius + (startRadius * modDepth);

      cnv.stroke(color);
      cnv.strokeWeight(4);
      cnv.fill(InnerCollor);     // cnv.translate(width/2 + val3 , height/2 + val4);
      cnv.translate(breed/2 -249 , hoog/2 + 30);

      p.beginShape();
      for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
        noiseV = p.map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);

        a = p.cos(-i) * radius * noiseV;
        b = p.sin(-i) * radius * noiseV;


        p.vertex(a * 1,b * 1);
      }
      p.endShape(CLOSE);
      yoff += 0.005;
    }
    
    p.granulair = () => {
      counter += 1;
      if (counter >= speedPhone6){
        counter = 0;

        let peop = int(random(10));

        // samp.play(0,1,0.8,random(20),0.2 )
        env.play(carrier);
        env.play(modulator);


        modulator.freq(C7[peop])
        carrier.freq(modulator);

        // carrier.freq(C7[peop]);
        // osc.amp(0.5);

      }
    }
  }
};

function phone7(breed,hoog,color,InnerCollor) {
  let yoff = 0;
  // let sound = false;
  // let mic;
  let amount = 200;
  let radius;
  let startRadius = 500;
  let modDepth;
  let movingA = [];
  let movingSize = 40;
  let dur = 0;

  let C7 = [185.00, 207.65, 261.63, 369.99, 698.46, 523.25,246.94,880.00,466.16,440.00];

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
  let speedPhone1;
  let speedPhone2;
  let speedPhone3;
  let speedPhone4;
  let speedPhone5;
  let speedPhone6;
  let speedPhone7;
  let speedPhone8;

  let counter = 0 ;

  // let mic;



  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    // OSC waardes komen binnen
    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6, OSC7, OSC8, OSC9,OSC10, OSC11,OSC12) => {

      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      micInputInput = OSC5;
      speedPhone1 = OSC6;
      speedPhone2 = OSC7;
      speedPhone3 = OSC8;
      speedPhone4 = OSC9;
      speedPhone5 = OSC10;
      speedPhone6 = OSC10;
      speedPhone7 = OSC11;
      speedPhone8 = OSC12;
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
      
      env = new p5.Envelope();
      carrier = new p5.Oscillator('sine');
      modulator = new p5.Oscillator('sine');

      carrier.start();
      carrier.freq(220);
      carrier.amp(0.0);

      modulator.start();
      // modulator.disconnect();

      modulator.freq(460);
      // modulator.amp(0.0);
      modulator.amp(1)


      env.setADSR(0.01, 0.05, 0.01, 0.01);

    };

    
    p.draw = () => {
      p.visuals();
        
      p.granulair();
       
    }

    p.visuals = () => {
      let sum = 0;
      movingA.push(micInputInput);
      movingA.shift();
      for(i = 0; i < movingA.length; i++){
        sum += movingA[i];
      }

      modDepth = (sum / movingA.length) * 1;
      if (modDepth > 1){
        modDepth = 1;
      }

      radius = startRadius + (startRadius * modDepth);

      cnv.stroke(color);
      cnv.strokeWeight(4);
      cnv.fill(InnerCollor);     // cnv.translate(width/2 + val3 , height/2 + val4);
      cnv.translate(breed/2 -275 , hoog/2 -11);

      p.beginShape();
      for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
        noiseV = p.map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);

        a = p.cos(-i) * radius * noiseV;
        b = p.sin(-i) * radius * noiseV;


        p.vertex(a * 1,b * 1);
      }
      p.endShape(CLOSE);
      yoff += 0.005;
    }
    
    p.granulair = () => {
      counter += 1;
      if (counter >= speedPhone7){
        counter = 0;

        let peop = int(random(10));

        // samp.play(0,1,0.8,random(20),0.2 )
        env.play(carrier);
        env.play(modulator);


        modulator.freq(C7[peop])
        carrier.freq(modulator);

        // carrier.freq(C7[peop]);
        // osc.amp(0.5);

      }
    }
  }
};

function phone8() {
  // dit is vooir het scalen!
  let val1;
  let val2;
  let val3;
  let val4;
  // Dit is voor snelheid van afspelen sample
  let speed;
  // mic level vanuit max
  let speedPhone1;
  let speedPhone2;
  let speedPhone3;
  let speedPhone4;
  let speedPhone5;
  let speedPhone6;
  let speedPhone7;
  let speedPhone8;

  let counter = 0 ;

  return (p) => {
    p.preload = () => {
      samp = p.loadSound('audio_samples/bird.mp3');
    }

    // OSC waardes komen binnen
    p.OSC = (OSC1,OSC2,OSC3,OSC4,OSC5,OSC6, OSC7, OSC8, OSC9,OSC10, OSC11,OSC12) => {

      val1 = OSC1;
      val2 = OSC2;
      val3 = OSC3;
      val4 = OSC4;
      micInputInput = OSC5;
      speedPhone1 = OSC6;
      speedPhone2 = OSC7;
      speedPhone3 = OSC8;
      speedPhone4 = OSC9;
      speedPhone5 = OSC10;
      speedPhone6 = OSC10;
      speedPhone7 = OSC11;
      speedPhone8 = OSC12;
    }

    p.setup = () => {
      // moet blijbaar breed en hoog sturen vanuit de sketch, subsketch ziet geen height en width
      // - 200 anders die hij raar met het vullen van het scherm 
      cnv = p.createCanvas(1000,1000)
          
      cnv.touchStarted(userStartAudio);
      cnv.mousePressed(userStartAudio);
      

    };

    
    p.draw = () => {
      textSize(32)
      text("nee!NEE!!nee! verkeerd")  
    } 
  }
};
