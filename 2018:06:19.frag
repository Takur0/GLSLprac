/*{ "audio": true }*/
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform sampler2D spectrum;
uniform float volume;

const float size = 1.;

float c (vec2 p) {
  float a = atan (p.y,p.x) * 2.;
  float c = 0.;
  float l = length(p);
  return sin(a * 3. + floor(l * 8.) * 0.5 - time * 5.);
  // return 0.1/l;
}

vec2 tile(vec2 _st, float _zoom){
  _st *= _zoom;
  return fract(_st);
}

void main(){
  vec2 r = resolution;
  vec2 st = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
  // st *= mat2(sin(time), 0, 0, cos(time));
  // st *= mat2(sin(time), 0, 0, sin(time));
  st = tile(st, 1.) -.5;
  st *= mat2(size, 0, 0, size);
  // Assign a random value based on the integer coord
  vec3 color;
  // color = vec3(sin(time),cos(time),sin(cos(time)));
  // color = vec3(volume*0.007);
  color = vec3(c(st-volume*0.001),c(st+0.015+volume*0.001),c(st+0.015+volume*0.001));
  // color = vec3(c(st),c(st+0.015),c(st+0.015));
  // Uncomment to see the subdivided grid
  // color = vec3(fpos,0.0);
  // color = vec3(0.);
  gl_FragColor = vec4(color,1.0);

}
