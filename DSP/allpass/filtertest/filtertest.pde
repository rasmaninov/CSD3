allpass a = new allpass(8, 0.167772);
int n = 0; int x = 0; float y = 0;

void draw(){
  if(n == 0){
    println("DFII RESPONSE");
    x = 1;
  } else {
    x = 0;
  }

  y = a.calculate(x);
  //print results
  println( "n: ", n++, "x:", x, "y: ", y);
  //stop response
  if(n == 25){
    stop();
}
}
