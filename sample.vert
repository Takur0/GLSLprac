/*{
  "pixelRatio": 1,
  "vertexCount": 3000,
  "vertexMode": "POINTS",
}*/
precision mediump float;
attribute float vertexId;
uniform float vertexCount;
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
varying vec4 v_color;

void main() {
  float t = time * 1.;
  float i = vertexId + sin(vertexId) * 2.;

  vec3 pos = vec3(
    sin(t + vertexId + i * 2.) * sin(t * .21 + i),
    cos(t + vertexId - i) * cos(t * .19 + i),
    cos(t) * sin(t + vertexId)
  );
  // 
  // gl_Position = vec4(pos.x, pos.y * resolution.x / resolution.y, pos.z * .1, 1);
  // gl_PointSize = 3. / max(abs(pos.z), .1);
  //

  // pos = vec3(sin(vertexId)*cos(time * vertexId), cos(vertexId)*sin(t * vertexId), cos(t)+sin(t + vertexId));

  v_color = vec4(
    fract(pos.x + i*3.),
    fract(pos.y + i*3.),
    fract(pos.z + i*3.),
    1.
  );

  gl_Position = vec4(pos.x, pos.y * resolution.x / resolution.y, pos.z * .1, 1);
  gl_PointSize = 3. / max(abs(pos.z), .1);
  // v_color = vec4(0.5,0.5,0.5,1.);
}
