/*{
  frameskip: 1,
  vertexMode: "TRIANGLES",
  PASSES: [{
    MODEL: {
      PATH: './sry00.obj',
    },
    vs: './sumo.vert',
    TARGET: 'deer',
  }, {}],
  "audio": true
}*/
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform int PASSINDEX;
uniform sampler2D deer;
uniform sampler2D map;
varying vec4 v_color;
varying vec2 vUv;
uniform sampler2D backbuffer;


void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    if (PASSINDEX == 0) {
      gl_FragColor = vec4(1);
    }
    else {
      vec4 deer = texture2D(deer, uv);
      vec2 texPos = vec2(gl_FragCoord.xy/resolution);
      vec4 shadow = texture2D(backbuffer, texPos)*0.9;
      gl_FragColor = vec4(uv.x*0.1, 0, uv.y*0.1, 1.) + deer + shadow;
    }
}
