#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

vec2 random2(vec2 p){
  return fract(sin(vec2( dot(p,vec2(114.,514.)),dot(p,vec2(810.,1919.)) ))*114514.);
}

#define ANIMATE
vec3 voronoi(vec2 x, float rnd){
  vec2 n = floor(x);
  vec2 f = fract(x);

  vec2 mg, mr;
  float md = 8.;
  for(int j=-1; j<=1; j++){
    for(int i=-1; i<=1; i++){
      vec2 g = vec2(float(i),float(j));
      vec2 o = vec2(random2(n+g)*rnd);
      #ifdef ANIMATE
      o = .5 + .5 * sin(time + 6.2831 * o);
      #endif
      vec2 r = g + o - f;
      float d = dot(r,r);
      if(d<md){
        md = d;
        mr = r;
        mg = g;
      }
    }
  }
  md = 8.;
  for(int j=-2; j<=2; j++){
    for(int i=-2; i<=2; i++){
      vec2 g = mg + vec2(float(i),float(j));
      vec2 o = random2(n+g)*rnd;
      #ifdef ANIMATE
      o = .5 + .5*sin(time + o*6.2831);
      #endif
      vec2 r = g + o - f;
      if(dot(mr-r,mr-r)<10.){
        md = min(md, dot(0.5*(mr+r),normalize(r-mr)));
      }
    }
  }
  return vec3(md,mr);
}

void main(){
  vec2 st = gl_FragCoord.xy/resolution;
  // st.x = resolution.x/resolution.y;
  // st.x = (st.x-.5)*.75+.5;

  if(resolution.y > resolution.x){
    st.y *= resolution.y/resolution.x;
    st.y -= (resolution.y*.5-resolution.x*.5)/resolution.x;
  } else {
    st.x *= resolution.x / resolution.y;
    st.x -= (resolution.x*.5-resolution.y*.5)/resolution.y;
  }
  vec3 color = vec3(0.,0.5,0.5);
  float d = dot(st-.5,st-.5);
  vec3 c = voronoi(20.*st,pow(d,.4));

  color = mix( vec3(1.0), color, smoothstep( 0.01, 0.02, c.x ) );

  float dd = length(c.yz);
  color += vec3(1.)*(1.-smoothstep(0.0,0.2,dd));
  color -= vec3(1.)*(1.-smoothstep(0.0,0.15,dd));

  gl_FragColor = vec4(color,1.);
}
