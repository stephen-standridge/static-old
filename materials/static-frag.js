
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
    return smoothstep( pct-0.02, pct, st.y) -
            smoothstep( pct, pct+0.02, st.y );
}
float booleanToPosOrNeg(bool determiner){
    if(determiner == true){
        return 1.0;
    } else{
        return -1.0;
    }
}
float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float PI = 3.1415926535;
    float duration = 2000.0;
    float freq = 2.0;
    vec2 movement = vec2(1.5,1.5);
    vec2 power = vec2(1.5, 1.5);
    vec2 offset = vec2(23.0, -2.5);
    vec2 lineOffset = vec2(30.0, 60.0);
    vec2 linePower = vec2(2.0, 3.0);
    vec2 step = vec2(400.0,300.0);
    float row = st.y / step.y;
    float column = st.x /step.x;
    float rowPosOrNeg = booleanToPosOrNeg(bool(floor(mod((st.x*step.x), 2.0))));



    float horizontalVariation = pow(cos(u_time + ((st.x / 2.0) + lineOffset.x)), linePower.x);
    float verticalVariation = pow(cos(u_time + ((st.y / 2.0) + lineOffset.y)), linePower.y);
    float horizontalMovement = pow(sin((u_time / duration)* offset.x ) * horizontalVariation * freq, movement.x);
    float verticalMovement = pow(sin((u_time / duration)* offset.y) * verticalVariation *freq, movement.y);
    float verticalTracking = cos(u_time/duration / row * offset.y /(rand(vec2(u_time/duration - row, u_time/duration + row))));
    float horizontalTracking = (cos( u_time / duration * column)* offset.x ) * 2.0;
    float horizontalTest = float(mod((st.x*step.x)+(rowPosOrNeg * horizontalMovement)+horizontalTracking , 2.0));
    float verticalTest = float(mod( (st.y * step.y)+(rowPosOrNeg * verticalMovement) + verticalTracking, 2.0 ));

    bool p = bool((horizontalTest > float(1.0) &&
                    horizontalTest >  float(-1.0) &&
                    horizontalTest < float(0.0)) ||
                    !(horizontalTest > float(1.0) ||
                    horizontalTest >  float(-1.0) &&
                    horizontalTest < float(0.0)));
    bool q = bool(verticalTest < float(1.0) &&
                    verticalTest > float(0.0) &&
                    verticalTest < float(-1.0)) ||
                    !(verticalTest < float(1.0) &&
                    verticalTest > float(0.0) ||
                    verticalTest < float(-1.0));
    vec3 finalValue = vec3(float((p && q) || !(p || q) ) * rand(vec2(-1.0,2.0)));

    horizontalVariation = u_time + (st.x / 2.0) * lineOffset.x;
    verticalVariation = u_time + (st.y / 2.0) + lineOffset.y;
    horizontalMovement = pow(sin((u_time / duration)* offset.x ) + horizontalVariation * freq, movement.x);
    verticalMovement = pow(sin((u_time / duration)* offset.y) * verticalVariation *freq, movement.y);
    verticalTracking = u_time/duration / row * offset.y /(rand(vec2(u_time/duration - row, u_time/duration + row)));
    horizontalTracking = cos(( u_time / duration * column)* offset.x  * 2.0);
    horizontalTest = float(mod((st.x*step.x)+(rowPosOrNeg * horizontalMovement)+horizontalTracking , 2.0));
    verticalTest = float(mod( (st.y * step.y)+(rowPosOrNeg * verticalMovement) + verticalTracking, 2.0 ));

    p = bool((horizontalTest > float(1.0) &&
                    horizontalTest >  float(-1.0) &&
                    horizontalTest < float(0.0)) ||
                    !(horizontalTest > float(1.0) ||
                    horizontalTest >  float(-1.0) &&
                    horizontalTest < float(0.0)));
    q = bool(verticalTest < float(1.0) &&
                    verticalTest > float(0.0) &&
                    verticalTest < float(-1.0)) ||
                    !(verticalTest < float(1.0) &&
                    verticalTest > float(0.0) ||
                    verticalTest < float(-1.0));
    vec3 finalValue2 = vec3(float((p && q) || !(p || q) ) * rand(vec2(0.0,2.0)));


    vec4 color = vec4(vec3(finalValue), 0.5);
    vec4 color2 = vec4(vec3(finalValue2), 0.3);
    vec4 finalColor = vec4(color - color2);

    // float pct = plot(st, y);
    // color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = finalColor;
}