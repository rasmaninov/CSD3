 //DFI
cBuffer circBufferX = new cBuffer(9,8);
cBuffer circBufferY = new cBuffer(9,8);
int n = 0; float x = 0; float y = 0;

//y[n] = 0.167772 y[n-8] + 0.167772 x[n] - x[n-8]

void draw(){
  y = 0;
  //impulse
  if(n == 0){
    println("DFI RESPONSE");
    x = 1;
  } else {
    x = 0;
  }

  y += 0.167772 * (x + circBufferY.read()) - circBufferX.read();

  circBufferY.write(y);
  circBufferX.write(x);

  //print results
  println( "n: ", n++, "x:", x, "y: ", y);
  //stop response
  if(n == 25){
    stop();
  }
}

//homemade circBuffer
class cBuffer{
float[] buffer; int writeH; int readH; int size;

  cBuffer(int thissize, int numSamplesDelay){
    readH = thissize - numSamplesDelay;
    writeH = 0;
    buffer = new float[thissize];
    size = thissize;
    for(int i = 0; i < size; i++){
      buffer[i] = 0.0;
    }
  }

  void write(float value){
    buffer[writeH++] = value;

    writeH = wrap(writeH);
  }

  float read(){
    float value = buffer[readH++];
    readH = wrap(readH);
    return value;
  }

  int wrap(int head){
    if(head >= size){
      head -= size;

    }
    return head;
  }

};
