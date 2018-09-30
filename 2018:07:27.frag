#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec2 rotate(vec2 p, float a){
  // return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
  return vec2(p * mat2(cos(a),-sin(a),sin(a),cos(a)));
}

float rand(float n){
  return fract(sin(n));
}

vec2 rand2(in vec2 p)
{
	return fract(vec2(sin(p.x * 1.32 + p.y * 54.077), cos(p.x * 91.32 + p.y * 9.077)));
}

float noise1(float p){
  float fl = floor(p);
  float fc = fract(p);
  return mix(rand(fl),rand(fl+1.),fc);
}

float voronoi(vec2 x){
  vec2 p = floor(x);
  vec2 f = fract(x);

  vec2 res = vec2(8.);
  for(int j=-1; j<=1; j++){
    for(int i=-1; i<=1; i++){
      vec2 b = vec2(i, j);
      vec2 r = b - f + rand2(p + b);
      float d = max(abs(r.x), abs(r.y));
      // d = (pow(r.x,2.)+pow(r.y,2.))/2.;
      if(d < res.x){
        res.y = res.x;
        res.x = d;
      }
      else if(d < res.y){
        res.y = d;
      }
    }
  }
  return res.y - res.x;
}

#define flicker (noise1(time *2.) * .9 + .5)

void main(){
  vec2 uv = gl_FragCoord.xy / resolution;
  uv = (uv - .5) * 2.;
  vec2 suv = uv;
  uv.x *= resolution.x / resolution.y;

  float v = 0.;

  uv *= .6 + sin(time * .1) * .1;
  uv = rotate(uv, sin(time*0.3) * 1.);
  uv += time * .4;

  float a = .6, f = 1.;
  for(int i = 0; i < 3; i++){
    float v1 = voronoi(uv * f + 1.);
    float v2 = 0.;

    if(i > 0){
      v2 = voronoi(uv * f * .5 + 5. + time);

      float va = 0., vb = 0.;
      va = 1. - smoothstep(.0, .1, v1);
      vb = 1. - smoothstep(.0, .08, v2);
      v += a * pow(va * (.5 + vb), 2.);
    }

    v1 = 1. - smoothstep(0., .3, v1);
    v2 = a * (noise1(v1 * 5.5 + .1));
    if(i == 0){
      v += v2 * flicker;
    }else{
      v += v2;
    }

    f *= 3.;
    a *= .7;
  }

  v *= exp(-.6 * length(suv)) * 1.2;
  vec3 cexp = vec3(3., 1., 1.);
  cexp *= 1.3;
  vec3 col = vec3(pow(v, cexp.x), pow(v, cexp.y), pow(v, cexp.z)) * 2.;
  gl_FragColor = vec4(col,1.);
}
