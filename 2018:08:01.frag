#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

const float PI = 3.14159265;

float sphere(float t, float k){
  float d = 1.+t*t-t*t*k*k;
  if (d<=0.){
    return -3.;
  }
  float x = (k - sqrt(d))/(1. + t*t);
  return asin(x*t);
}

void main(){
  vec4 texColor = vec4(.3,.0,.3,.5);
  vec2 uv = gl_FragCoord.xy - .5*resolution;
  float v = resolution.x;
  if(v > resolution.y){
    v = resolution.y;
    uv /= v;
  }
  uv *= 3.;
  float len = length(uv);
  float k = 1.;
  float len2 = sphere(len*k,sqrt(2.))/sphere(1.*k,sqrt(2.));
  uv = uv * len2 * .5 /len;
  uv += .5;
  vec2 pos = uv;
  float t = time;
  float rotateSpeed = 10.;
  float r = cos(pos.x*90.+t*rotateSpeed)+sin(pos.y*40.);
  float g = r + sin(pos.y*10. * cos(t*.4));
  float b = g - sin(pos.x+pos.y + cos(t*.3)) + .8;

//光の量をつかさどる
  float glow = .004/(.01 + .5*distance(len, 1.));

  vec4 col2 = vec4(r, g, b, 1.);
  gl_FragColor = step(len, 1.) * .5 * col2 + glow * col2;
}
