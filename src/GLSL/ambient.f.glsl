//ambientColor
uniform vec3 uAmbientColor;
uniform float uAmbientReflectance;

// main function gets executed for every pixel
void main() {
  vec3 baseColour = vec3(1.0);
  vec3 lighting = vec3(0.0);

  //Ambient
  vec3 ambient = uAmbientReflectance * uAmbientColor;
  lighting = ambient;

  vec3 colour = baseColour * lighting;
  //this colors all fragments (pixels) in the same color (RGBA)
  gl_FragColor = vec4(colour, 1.0);
}
