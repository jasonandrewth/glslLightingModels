//Pass normals
varying vec3 vNormal;

vec3 linearTosRGB(vec3 value) {
    vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));

    vec3 v1 = value * 12.92;
    vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);

    return mix(v2, v1, lt);
}

// main function gets executed for every pixel
void main() {
    //Normals get interpolated between vertices so normalize again here
    vec3 normal = normalize(vNormal);
  //Bijective mapping
  //Map from [-1, 1] range to [0,1] range in rgb colour space
    vec3 colour = (normal + 1.) * 0.5;
    colour = linearTosRGB(colour);

  //this colors all fragments (pixels) in the same color (RGBA)
    gl_FragColor = vec4(colour, 1.0);
}
