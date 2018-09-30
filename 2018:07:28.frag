#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;


void main(){
  vec2 pos = gl_FragCoord.xy/resolution*vec2(8.)-vec2(4.,4.);
  pos.x = (pos.x/2.);
  if(pos.y>-8.4){
    for(float baud = 1.;  baud< 9.; baud += 1.){
      //縦横振動
      pos.y += mod(.1 * sin(.2*time/(1.+baud))/(1.+baud),0.1);
      pos.x += mod(.1 * cos(pos.y/4.2+4.8*time/(1.+baud))/(1.+baud),0.1)-.05;
    }
    //揺らぎ
    pos.y += .2*mod(sin(time*30.),1.);
  }
  pos.x = abs(pos.x);
  vec3 color = vec3(.1 * mouse.x,0.,0.);
  float p = .001;
  float y = -pow(pos.x,3.3)/(2.*p)*3.3;
  float dir = length(pos-vec2(pos.x,y))*sin(.26);
  if(dir < 0.7){
    color.rg += smoothstep(0., 1., .75 - dir);
    color.g /= 2.4;
  }
  color *= .2+abs(pos.y/4.2+4.2)/4.;
  color += pow(color.r,1.1);
  color *= cos(-.5+pos.y*.4);
  pos.y += 1.5;

  vec3 dolor = vec3(0.,0.,0.);
  y = -pow(pos.x,3.3)/(2.*p)*3.3;
  dir = length(pos-vec2(pos.x,y))*sin(.3);
  if(dir < .7){
    dolor.bg += smoothstep(0., 1.,.75 - dir);
    dolor.g /= 2.4;
  }
  dolor *= .2+abs(pos.y/4.2+4.2)/4.2;
  dolor += pow(color.r,1.1);
  dolor *= cos(-.6+pos.y*.4);
  dolor.r -= pow(length(dolor)/16.,33.);
  color = mix(color, dolor, .5);

  gl_FragColor = vec4(vec3(color),1.0);
}
