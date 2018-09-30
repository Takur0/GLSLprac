/*
{audio: true}
*/
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
uniform float volume;

float random(in vec2 _st){
  return fract(sin(dot(_st,vec2(12.,78.)))*100000.);
}

float noise(in vec2 _st){
  vec2 i = floor(_st);
  vec2 f = fract(_st);
  vec2 u = f*f*(3.-2.*f);
  return
  mix(
    mix(
      random(i + vec2(0.,0.)),
      random(i + vec2(0.,1.)),
      u.x
      ),
    mix(
      random(i + vec2(1.,0.)),
      random(i + vec2(1.,1.)),
      u.x
      ),
      u.y
    );
}

mat2 rotate2D(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

float lines(in vec2 pos, float b){
  float scale = 50.;
  pos *= scale;
  return smoothstep(0.0,
    .5+.5*b,
    abs(sin(pos.x*3.1415)+b*3.0)*.5);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution;
  st.y *= resolution.y/resolution.x;
  vec2 pos = st.yx * vec2(1.,1.);
  float pattern = pos.x;
  pos = rotate2D( noise(pos) ) * pos * 1.5;
  pattern = lines(pos+time*1.,0.3);
  gl_FragColor = vec4(vec3(pattern),1.0);
}
