//Uniforms
uniform vec3 uAmbientColor;
uniform float uAmbientReflectance;
uniform vec3 uLight;
uniform vec3 uDiffuseColour;
uniform float uSpecReflectance;
uniform float uSpecMag;
uniform vec3 uSpecColour;
uniform float uDiffuseReflectance;

varying vec3 vNormal;

vec3 linearTosRGB(vec3 value) {
    vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));

    vec3 v1 = value * 12.92;
    vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);

    return mix(v2, v1, lt);
}

// main function gets executed for every pixel
void main() {
    vec3 modelColour = vec3(1.0);
    vec3 lighting = vec3(0.0);

    vec3 normal = normalize(vNormal);

  // Diffuse lighting
    vec3 lightDir = normalize(uLight);
    vec3 lightColour = uDiffuseColour;
    float dp = max(0.0, dot(lightDir, normal));

    vec3 diffuse = dp * uDiffuseReflectance * lightColour;

    //Ambient
    //Clamp reflectance at 0.3 for moody lighting
    vec3 ambient = min(uAmbientReflectance, 0.3) * uAmbientColor;

    lighting = ambient + diffuse;

    vec3 colour = modelColour * lighting;
    colour = linearTosRGB(colour);
  //this colors all fragments (pixels) in the same color (RGBA)
    gl_FragColor = vec4(colour, 1.0);
}
