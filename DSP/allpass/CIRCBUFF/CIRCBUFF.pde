//y[n] = 0.167772 y[n-8] + 0.167772 x[n] - x[n-8]
//DFII EN DFI
cBuffer circBuffer = new cBuffer(25,1);

void setup(){
  size(200,200);
  frameRate(2);
}

void draw(){
  circBuffer.write(float(frameCount)/100);

  println(circBuffer.read(), "circ", frameCount, "frame");
}

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
