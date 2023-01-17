FBCombFilter hey = new FBCombFilter(50, 0.8);
int n = 0; int x = 0; float y;

void draw(){
  y = 0;
  if(n == 0){
    println("FBCF RESPONSE");
    x = 1;
  } else {
    x = 0;
  }

  y = hey.calculate(x);
  //print results
  println( "n:", n++, "x:", x, "y: ", y);
  //stop response
  if(n == 51){
    stop();
  }

}
