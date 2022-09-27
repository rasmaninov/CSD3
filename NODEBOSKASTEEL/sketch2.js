function setup() {   
  createCanvas(800, 400);
  //left canvas will be display area for story text	
	leftCanvas = createGraphics(400,400);
	//rightCanvas will be display are for story animation
	rightCanvas = createGraphics(400,400);

}

function draw() {
  drawRightCanvas();
	image(rightCanvas, 400, 0);
  drawLeftCanvas();
  image(leftCanvas, 0, 0);
  
}
//function to draw elements in the right canvas 
function drawRightCanvas() {
  rightCanvas.background(100, 100, 50);
  rightCanvas.fill(0,0,0);
}
//function to draw elements in the left canvas 
function drawLeftCanvas() {
  leftCanvas.background(200,0,0);
  leftCanvas.fill(0,0,0);
}