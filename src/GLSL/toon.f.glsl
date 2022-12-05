uniform samplerCube specMap;
//Light Position
uniform vec3 uLight;

//Uniforms
uniform vec3 uDiffuseColour;
uniform float uSpecReflectance;
uniform float uSpecMag;
uniform vec3 uSpecColour;
uniform float uDiffuseReflectance;

varying vec3 vNormal;
varying vec3 vPosition;

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

void main() {
  vec3 modelColour = vec3(0.5);
  vec3 lighting = vec3(0.0);

  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Ambient
  vec3 ambient = vec3(1.0);

  // Hemi
  vec3 skyColour = vec3(0.0, 0.3, 0.6);
  vec3 groundColour = vec3(0.6, 0.3, 0.1);

  vec3 hemi = mix(groundColour, skyColour, remap(normal.y, -1.0, 1.0, 0.0, 1.0));

  // Diffuse lighting
  vec3 lightDir = normalize(uLight - vPosition);
  vec3 lightColour = vec3(1.0, 1.0, 0.9);
  float dp = max(0.0, dot(lightDir, normal));

  // A much longer version of the 3 colours with explanations.

    // Calculate the fully shadowed area by doing a step on the dot product of the
    // light direction and normal.
  float fullShadow = smoothstep(0.5, 0.505, dp);

    // Calculate the partially shadowed area by doing another step, but using a
    // higher threshold value than the fully shadowed area. Make the output from
    // this step 0.5 in the partially shadowed area, and 1.0 in the lit area.

    // FYI there are a bunch of ways to do this:
    // float partialShadow = remap(smoothstep(0.65, 0.655, dp), 0.0, 1.0, 0.5, 1.0);
    // float partialShadow = mix(0.5, 1.0, smoothstep(0.65, 0.655, dp));
  float partialShadow = smoothstep(0.65, 0.655, dp) * 0.5 + 0.5;

    // In this last step, you combine them. There are a couple ways you can do that.
    // You could also just do a min on the values.
  dp = min(partialShadow, fullShadow);

  vec3 specular = vec3(0.0);
  vec3 diffuse = dp * lightColour;

  // Specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue = max(0.0, dot(viewDir, r));
  phongValue = pow(phongValue, uSpecMag);

  // Fresnel
  float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
  fresnel = pow(fresnel, 2.0);
  fresnel = step(0.7, fresnel);

  specular += phongValue;
  specular = uSpecReflectance * smoothstep(0.5, 0.51, specular) * uSpecColour;
  lighting = hemi * (fresnel + 0.2) + diffuse * 0.8;

  vec3 colour = modelColour * lighting + specular;
  colour = linearTosRGB(colour);

  gl_FragColor = vec4(pow(colour, vec3(1.0 / 2.2)), 1.0);
}