// function makeIPs(){
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
    sketch1 = p5(visual(8, 7));
  }

  if (IPconnection[1] == socketid){
    sketch1 = p5(makeSketch('Blue'));
  }

}


function makeSketch(...colorArgs) {
  return (p) => {
    let bgColor;
    let black;
    let c;
    p.setup = () => {
      c = p.createCanvas(200, 200);
      bgColor = p.color(...colorArgs);
      black = p.color(0);
      
      c.elt.addEventListener('mouseenter', () => {
        p.loop();
      });
      c.elt.addEventListener('mouseleave', () => {
        p.noLoop();
      });
      
      let bounds = c.elt.getBoundingClientRect();
      
      // Just in case the mouse is already over the canvas when it is created.
      // This is also how you would use getBoundingClientRect from the draw()
      // and mouseMoved() functions instead of the mouseenter/mouseleave events.
      if (p.winMouseX < bounds.left ||
        p.winMouseX > bounds.right ||
        p.minMouseY < bounds.top ||
        p.winMouseY > bounds.bottom) {
        
        p.noLoop();
      }
    };
    
    p.draw = () => {
      p.background(p.lerpColor(
        bgColor,
        black,
        p.abs((p.frameCount % 240 - 120) / 120)
      ));
      
      
      let bounds = c.elt.getBoundingClientRect();
      p.fill('white');
      p.noStroke();
      p.text(`${p.winMouseX}, ${p.winMouseY} :: ${bounds.left}, ${bounds.top}, ${bounds.right}, ${bounds.bottom}`, 10, 10); 
    }
  };
}

function visual(){
  p.setup = () => {
    let cnv = createCanvas(windowWidth, windowHeight);
      cnv.touchStarted(userStartAudio);
      cnv.mousePressed(userStartAudio);
      // cnv.mousePressed(playSound);
  
      frameRate(30);
  
  
    mic = new p5.AudioIn();
    mic.start();
    // movingA.length = 50;
    for(i = 0; i < movingSize; i++){
      movingA.push(0);
    }
  }
  
  p.setup = () => {
      // background(0,0,200);
      if (IPconnection[0] == socket.id){
        scale(2,2);
        visual(8, 7)
        granulair(snelheidGran);
      }
      if (IPconnection[1] == socket.id){
        scale(0.1,0.1);
        visual(90, 65)
        granulair(snelheidGran);
      }
  }
  
  
  
  
  
  function visual(bignessXInput, bignessYInput){
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
  
    stroke(0);
    strokeWeight(1);
    fill(255,40);
    translate(width/2, height/2);
    beginShape();
    for( i = 0.0 ; i <= TWO_PI; i += TWO_PI / amount){
      noiseV = map(noise(cos(i)+1*modDepth, sin(i)+1*modDepth, yoff), 0.0, 1, 0, modDepth);
      // a = cos(-i) * radius * (micLevel + 1);
      // b = sin(-i) * radius * (micLevel + 1);
      //
      // a = a * (noiseV +1);
      // b = b * (noiseV +1);
      a = cos(-i) * radius * noiseV;
      b = sin(-i) * radius * noiseV;
  
  
      vertex(a * bignessXInput,b * bignessYInput);
    }
    endShape(CLOSE);
    yoff += 0.005;
  }
  
  function granulair(speed){
      if (frameCount % speed == 0){
        samp.play();
        samp.jump(random(10), random(0.5  ))
    }
  }
  
  
  
  function touchStarted(){
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
  

}
