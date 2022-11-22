import * as THREE from "three";

import Experience from "../Experience";
import Environment from "./Environment";

//@ts-ignore
import fragment from "../GLSL/fragment.glsl?raw";
//@ts-ignore
import vertex from "../GLSL/vertex.glsl?raw";

export default class World {
  experience: Experience;
  scene: THREE.Scene;
  geometry: THREE.BufferGeometry;
  material: THREE.ShaderMaterial;
  environment: Environment;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // Geometry
    this.geometry = new THREE.BoxGeometry(1, 1, 1);

    //Material
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        resolution: {
          value: new THREE.Vector2(
            this.experience.sizes.width,
            this.experience.sizes.height
          ),
        },
        uTime: { value: 0.0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    // Mesh
    const testMesh = new THREE.Mesh(this.geometry, this.material);

    // Setup
    this.environment = new Environment();

    this.scene.add(testMesh);
  }

  update() {
    this.material.uniforms.uTime.value = this.experience.time.elapsed;
  }
}
