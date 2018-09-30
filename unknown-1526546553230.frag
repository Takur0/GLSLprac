// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    // _stが_sizeより大きい時uvに1を代入。そうでないとき0を代入
    vec2 uv = smoothstep(_size,_size+aa,_st);
    // 1.0-_stが1.0-_sizeより大きい時uvに1を代入。そうでないとき0を代入
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    // x軸とy軸に対してどちらかが0なら、0を返す
    return uv.x*uv.y;

}

void main(void){
  vec2 r = resolution*vec2(3.);
  vec2 st = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);
    vec3 color = vec3(0.0);

    // Divide the space in 4
    st = tile(st,4.);

    // Use a matrix to rotate the space 45 degrees
    st = rotate2D(st,time*2.);

    // Draw a square
    color = vec3(box(st,vec2(0.5*(sin(time+1.5)+1.)),0.01),sin(time*0.5),cos(time*2.));
    // color = vec3(st,0.0);

    gl_FragColor = vec4(color,1.0);
}
