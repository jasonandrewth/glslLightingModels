varying vec2 vUvs;
varying vec3 vNormal;
varying vec3 vPosition;

// main function gets executed for every vertex
void main() {

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUvs = uv;
    // vNormal = normalMatrix * normal;
    vNormal = (transpose(inverse(modelMatrix)) * vec4(normal, 0.0)).xyz;
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}
