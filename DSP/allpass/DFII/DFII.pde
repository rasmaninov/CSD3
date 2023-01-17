//DFII
int n = 0; float x = 1; float y = 0; float w = 0; float wDelay;
cBuffer circBufferW = new cBuffer(9,8);

//w[n] = 0.167772 w[n-8] + x[n]
//y[n] = 0.167772 w[n] - w[n-8]

void draw(){
  y = 0;
  //impulse
  if(n == 0){
    println("DFII RESPONSE");
    x = 1;
  } else {
    x = 0;
  }

  wDelay = circBufferW.read();

  w = 0.167772 * wDelay + x;
  y += 0.167772 * w - wDelay;

  circBufferW.write(w);

  //print results
  println( "n: ", n++, "x:", x, "y: ", y);
  //stop response
  if(n == 25){
    stop();
  }
}

//homemade circbuffer
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
