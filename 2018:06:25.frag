/*{ "audio": true }*/
#ifdef GL_ES
precision mediump
float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;


void main()
{
    float speed = .5;
    vec2 p = gl_FragCoord.xy * 0.0025;
    for(int i=1; i<100; i++){
        float float_i = float(i);
        p.x+= 0.3/float_i *
        floor(sin(float_i*3.*p.y + time*speed
           + cos((time/(100.*float_i))*float_i)
           ))
           // + mouse.x/10.
           ;

        p.y+= 0.4/float_i *
        ceil(cos(float_i*3.*p.x + time*speed
          + sin((time/(200.*float_i))*float_i)
          ))
          // + mouse.y/10.
          ;
    }

    float r=cos(p.x+p.y+2.)*.5+.7;
    float g=sin(p.x+p.y+2.)*.5+.5;
    float b=(sin(p.x+p.y+1.)+cos(p.x+p.y+1.))*.3+.5;

    gl_FragColor = vec4(.3,b,b,1);
}
