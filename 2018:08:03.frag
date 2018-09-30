#ifdef GL_ES
precision mediump float;
#endif

#define NUMOCTAVE 16

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

mat3 rotX(float a){
  float c = cos(a);
  float s = sin(a);
  return mat3(1., 0., 0.,
              0., c, -s,
              0., s, c
    );
}

mat3 rotY(float a){
  float c = cos(a);
  float s = sin(a);
  return mat3(c, 0., -s,
              0., 1., 0.,
              s, 0., c
    );
}

float random(vec2 pos){
  return fract(sin(dot(pos,vec2(12.9898,72.54)))*42532.12);
}

float noise(vec2 pos){
  vec2 i = floor(pos);
  vec2 f = fract(pos);
  float a = random(i + vec2(0., 0.));
  float b = random(i + vec2(1., 0.));
  float c = random(i + vec2(0., 1.));
  float d = random(i + vec2(1., 1.));
  vec2 u = f * f * (3. - 2. * f);
  return mix(a,b,u.x) -

   (c - a) * u.y * (1. - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 pos){
  float v = 0.;
  float a = .5;
  vec2 shift = vec2(100.);
  mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
  for(int i = 0; i<NUMOCTAVE; i++){
    v = sin(v*1.07) + a * noise(pos);
    pos = rot * pos * 2. + shift;
    a *= .5;
  }
  return v;
}

void main(){
  vec2 p = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x,resolution.y);
  float t = 0., d;
  float time2 = time * 3. / 2.;
  vec2 q = vec2(0.);
  q.x = fbm(p + .00 * time2);
  q.y = fbm(p + vec2(1.));
  vec2 r = vec2(0.);
  r.x = fbm(p + 1. * q + vec2(1.7, 9.2) + .15 * time2);
  r.y = fbm(p + 1. * q + vec2(8.3, 2.8) + .126 * time2);
  float f = fbm(p + r);

  vec3 color = mix(
    vec3(sin(f*6.14)*.5+.5, .1, .1),
    vec3(.1, .1, cos(f*6.14)*.5+.5),
    1./(f*f)
  );

  color = mix(
		color,
		vec3(1., 0., 0.),
		clamp(length(q), 0.0, 1.0)
	);


	color = mix(
		color,
		vec3(1.17, 1.3, 1.3),
		clamp(length(r.x), 0.0, 1.0)
	);

	color = (f *f * f + 0.6 * f * f + 0.5 * f) * color;

  gl_FragColor = vec4(color,1.);

}
