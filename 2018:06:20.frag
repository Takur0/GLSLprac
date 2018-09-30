
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
varying vec2 surfacePosition;

const float size = 5.;

float c (vec2 p) {
	float a = atan(p.x,p.y);
	float r = length(p);
	float c = sin(time/1.-r*2.-cos(a*13.0*sin(r*r/15.14+time/10.)));
	// c = sin(time*3./1.-r*2.-cos(a*13.0*sin(r*r/15.14+time/10.)));
  return c;
  // return 0.1/l;
}

void main(){
  vec2 r = resolution;
  vec2 st = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
  // st *= mat2(sin(time), 0, 0, cos(time));
  // st *= mat2(sin(time), 0, 0, sin(time));
  st *= mat2(size, 0, 0, size);
	// st += vec2(sin(sin(time))*2.,sin(cos(time)));
  // Assign a random value based on the integer coord
  vec3 color;
  // color = vec3(sin(time),cos(time),sin(cos(time)));
  // color = vec3(volume*0.007);
  // color = vec3(c(st-volume*0.001),c(st+0.015+volume*0.001),c(st+0.015+volume*0.001));
  color = vec3(c(st),c(st+0.015),c(st+0.015));
  // Uncomment to see the subdivided grid
  // color = vec3(fpos,0.0);
  // color = vec3(0.);
  // gl_FragColor = vec4(color,1.0);
	float c = c(st);
  gl_FragColor = vec4(-c*0.75,c*0.75,c*c*.9,1.0);

}
