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
