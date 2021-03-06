#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


void main( void ) {

	vec2 pos = ( gl_FragCoord.xy / resolution.xy ) - vec2(0.5,0.5) + vec2(mouse.x * 0.5 - 0.25,mouse.y * 0.5 - 0.25);
        float horizon = 0.0;
        float fov = 0.5;
	float scaling = 0.1;

	vec3 p = vec3(pos.x, fov, pos.y - horizon);
	vec2 s = vec2(p.x/p.z, p.y/p.z + time*2.) * scaling;

	//checkboard texture
	float color = sign((mod(s.x, 0.1) - 0.05) * (mod(s.y, 0.1) - 0.05));
	//fading
	color *= p.z*p.z*10.0;

	gl_FragColor = vec4( color*0.5,color*0.7,color, 0.2);

}
