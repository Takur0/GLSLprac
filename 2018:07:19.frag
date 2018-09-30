
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float random(vec2 st){
  return fract(sin(dot(st.x,st.y)*114514.));
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    // st.x *= resolution.x/resolution.y;

    vec3 color = vec3(.0);

    vec2 point[5];
    point[0] = vec2(0.83,0.75);
    point[1] = vec2(0.60,0.07);
    point[2] = vec2(0.28,0.64);
    point[3] = vec2(1.31,0.3);
    point[4] = mouse;

    float m_dist = 1.;

    for (int i = 0; i < 5; i++) {
        float dist = distance(st, point[i]);
        m_dist = min(m_dist, dist);
    }

    color += m_dist;
    // color -= step(.7,abs(sin(50.0*m_dist)))*.3;

    gl_FragColor = vec4(color,1.0);
}
