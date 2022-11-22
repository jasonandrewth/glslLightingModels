precision highp float;

//Uniforms
uniform float uTime;
//Varyings
varying vec2 vUv;

vec3 red = vec3(1.0, 0.0, 0.0);
vec3 blue = vec3(0.0, 0.0, 1.0);
vec3 white = vec3(1.0, 1.0, 1.0);
vec3 black = vec3(0.0, 0.0, 0.0);
vec3 yellow = vec3(1.0, 1.0, 0.0);

//Util Functions
float map(float value, float inMin, float inMax, float outMin, float outMax) {
    return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

void main() {
    vec3 colour = vec3(0.0);

    colour.rg = vUv;
    colour.r = map(sin(uTime * 0.002), -1., 1., 0., 1.);

    gl_FragColor = vec4(colour, 1.0);

}
