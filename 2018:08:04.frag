#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable
#define PI 3.14159265359
#define SCALE 3.
#define CORNER 22.

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1., 2./3., 1./3., 3.);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6. - K.www);
  return c.z * mix(K.xxx, clamp(p-K.xxx, 0., 1.), c.y);
}

void main(){
  vec2 position = (gl_FragCoord.xy/resolution) - .5;
  position.x *= resolution.x / resolution.y;
  float s = sin(time*.1), c = cos(time*.1);
  mat2 rot = mat2(c, s, -s, c);
  position *= rot;

  vec2 mousePos = vec2(sin(time)*.2, cos(time)*.2);
  vec3 light = vec3((mousePos - position), .5);

  vec3 normal = normalize(vec3(tan(position.x * PI * SCALE), tan(position.y * PI * SCALE), CORNER));
  float bright = dot(normal, normalize(light));

  vec3 color = vec3(.125, .025, .125) * bright * 2.;
  vec3 heif = normalize(light + vec3(0., 0., 1.));
  vec3 spec = vec3(pow(dot(heif, normal), 420.));
  color += spec * .55;
  gl_FragColor = max (vec4(0.), vec4(color, 1.));
}
