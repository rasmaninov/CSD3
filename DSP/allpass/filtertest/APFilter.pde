class allpass {
cBuffer circBufferW; float y = 0; float w = 0; float wDelay;
float coeff;
  allpass(int nSamps, float newCoeff){
    circBufferW = new cBuffer(nSamps+1,nSamps);
    coeff = newCoeff;
  }

  float calculate(float x){
    y = 0;
    wDelay = circBufferW.read();

    w = coeff * wDelay + x;
    y += coeff * w - wDelay;

    circBufferW.write(w);
    return y;
  }
};
