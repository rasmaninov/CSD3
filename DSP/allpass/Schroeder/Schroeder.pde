import processing.sound.*;
Waveform waveform1;
Waveform waveform2;
int sampleLength = 4;
int samples = 44100;
allpass a = new allpass(347, 0.7);
allpass b = new allpass(113,0.7);
allpass c = new allpass(37,0.7);
FBCombFilter d = new FBCombFilter(1687, 0.773);
FBCombFilter e = new FBCombFilter(1601, 0.802);
FBCombFilter f = new FBCombFilter(2053, 0.753);
FBCombFilter g = new FBCombFilter(2251, 0.733);
float sum;

float y = 0; float x = 0;
AudioSample sample;
AudioSample sampleProcessed;

void setup(){

  size(400,400);
  strokeWeight(2);
  noFill();

  float[] sinewave = new float[samples * sampleLength];
  float[] sineProcessed = new float[samples * sampleLength];


  for (int i = 0; i < samples * sampleLength; i++) {
    y = 0; sum = 0;
    if(i <= samples/2){
      x = (sin(TWO_PI*i/samples*200)+sin(TWO_PI*i/samples*300)+sin(TWO_PI*i/samples*400))*0.3;

    } else {
      x = 0;
    }
    sinewave[i] = x;

    x = (d.calculate(x) + e.calculate(x) + f.calculate(x) + g.calculate(x))*0.25;
    x = c.calculate(b.calculate(a.calculate(x)));
    sineProcessed[i] = x;
  }


  //play created samples in a loop with a frequency of 1hz
  sample = new AudioSample(this, sinewave, samples);
  sample.loop();
  waveform1 = new Waveform(this, samples);
  waveform1.input(sample);

  sampleProcessed = new AudioSample(this, sineProcessed, samples);
  // sampleProcessed.loop();
  sampleProcessed.amp(1);
  waveform2 = new Waveform(this, samples);
  waveform2.input(sampleProcessed);

}

void draw(){
  background(0);

  waveform1.analyze();


  stroke(255);

  beginShape();
  for(int i = 0; i < samples; i++)
  {
    vertex(
      map(i, 0, samples, 0, width),
      map(waveform1.data[i], -1, 1, 0, height)
    );
  }
  endShape();

  waveform2.analyze();
  stroke(255,0,0);
  beginShape();
  for(int i = 0; i < samples; i++)
  {
    vertex(
      map(i, 0, samples, 0, width),
      map(waveform2.data[i], -5, 5, 0 , height)
    );
  }
  endShape();


}
