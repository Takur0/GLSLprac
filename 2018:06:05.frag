// Author @patriciogv - 2015
// Title: Mosaic
/*{ "audio": true ,
"midi": true}*/

#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;


float random (vec2 st) {
    return fract(sin(dot(st.xy,
      vec2(12.9898,78.233)))*
      43758.5453123);
}

void main() {
    vec2 r = resolution*vec2(3.);
    vec2 st = (gl_FragCoord.xy * 2.0 - r) / min(r.x, r.y);

    st *= 10.0; // Scale the coordinate system by 10
    vec2 ipos = floor(st);  // get the integer coords
    vec2 fpos = fract(st);  // get the fractional coords

    // Assign a random value based on the integer coord
    vec3 color = vec3(random( ipos*time*0.000000115 ));

    // Uncomment to see the subdivided grid
    // color = vec3(fpos,0.0);

    gl_FragColor = vec4(color,1.0);
}
