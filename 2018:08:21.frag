#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

#define PI 3.14159265359

vec2 tile(vec2 _st, float _zoom){
  return fract(_st * _zoom);
}

void main( void ) {
    vec2 p = (gl_FragCoord.xy*2.0-resolution) / min(resolution.x, resolution.y);
    p = tile(p, 2.) - .5;
    float r = distance(vec2(.0), p);
    float t = atan (p.y,p.x) * 2.;
    float a = mix(p.x * p.x,  p.y, sin(time)) + sin(t+time);
    float l = 0.3 / length(p + a);
    float _a = mix(p.y * p.y,  p.x, cos(time+PI)) + cos(t+time);
    float _l = 0.5 / length(p + _a);

    gl_FragColor = vec4( vec2( 1.0*_l, .5) * l, _l, 1.0 );
}
