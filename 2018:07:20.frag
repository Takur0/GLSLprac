#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

vec2 random2(vec2 p){
  return fract(sin(vec2(dot(p,vec2(114.1,514.7)),dot(p,vec2(810.5,931.3))))*114514.5453);
}

void main(){
  vec2 st = gl_FragCoord.xy / resolution;
  st.x *= resolution.x/resolution.y;
  vec3 color = vec3(0.);

  st *= 5.;

  vec2 i_st = floor(st);
  vec2 f_st = fract(st);

  float m_dist = 10.;
  vec2 m_point;

  for(int j=-1; j<=1; j++){
    for(int i=-1; i<=1; i++){
      vec2 neighbor = vec2(float(i),float(j));
      vec2 point = random2(i_st + neighbor);
      point = 0.5 + 0.5 * sin(time + point * 6.28);
      vec2 diff = neighbor + point - f_st;
      float dist = length(diff);
      if(dist < m_dist){
        m_dist = dist;
        m_point = point;
      }
    }
  }
  color += dot(m_point,vec2(.3,.6));

  color -= abs(sin(40.*m_dist))*0.07;

  gl_FragColor = vec4(color,1.);

}
