//Uniforms
uniform vec3 uLight;
uniform vec3 uDiffuseColour;
uniform float uSpecReflectance;
uniform float uSpecMag;
uniform vec3 uSpecColour;
uniform float uDiffuseReflectance;

//diffuse varyings
varying vec3 vNormal;
varying vec3 vPosition;

const float SRGB_ALPHA = 0.055;
float inverseLerp(float v, float minValue, float maxValue) {
    return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(v, inMin, inMax);
    return mix(outMin, outMax, t);
}

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

  //Normalized normal
    vec3 normal = normalize(vNormal);
  //Vector from camera to fragment
    vec3 viewDir = normalize(cameraPosition - vPosition);

  // Diffuse lighting
    vec3 lightDir = normalize(uLight - vPosition);
    float dp = max(0.0, dot(lightDir, normal));

    vec3 diffuse = dp * uDiffuseReflectance * uDiffuseColour;

   //BLINN-PHONG
    vec3 halfVector = normalize(lightDir + viewDir);
    float NdotH = max(0.0, dot(normal, halfVector));
    float phongVal = pow(NdotH, uSpecMag);

    vec3 specular = uSpecReflectance * phongVal * uSpecColour;

    lighting = diffuse;

    vec3 colour = modelColour * lighting + specular;
    colour = linearTosRGB(colour);
  //this colors all fragments (pixels) in the same color (RGBA)
    gl_FragColor = vec4(colour, 1.0);
}
