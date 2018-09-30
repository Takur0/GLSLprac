#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform sampler2D backbuffer;

float circle(in vec2 _st, in float _radius){
  vec2 dist = _st;
	return 1.-smoothstep(_radius-(_radius*0.01),
                       _radius+(_radius*0.01),
                       dot(dist,dist)*4.0);
}

float rand (float seed){
  return fract(sin(seed)*100000.);
}

float noise(in float seed){
  float f = fract(seed);
  float i = float(seed);
  return mix(rand(i), rand(i+1.),smoothstep(0., 1., f));
}

void main(){
  vec2 r = resolution;
  vec2 st = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);

	vec3 color = vec3(circle(st,1.+noise(time)*1.));
  vec2 texPos = vec2(gl_FragCoord.xy/resolution);
	vec4 shadow = texture2D(backbuffer, texPos)*0.3;

	gl_FragColor = vec4( color, 1.0 ) + shadow;
}
