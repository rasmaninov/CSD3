class FBCombFilter{
  float y; float coeff;
  cBuffer circBufferW;
  FBCombFilter(int nSamps, float newCoeff){
    circBufferW = new cBuffer(nSamps+1,nSamps);
    coeff = newCoeff;
  }

  float calculate(float x){
    y = x + coeff * circBufferW.read();
    circBufferW.write(y);
    return y;
  }
};
