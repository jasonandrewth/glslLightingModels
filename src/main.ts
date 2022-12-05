// External dependencies.
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { Settings, GUI } from "./guiHelper";

// load shaders
//@ts-ignore
import ambientVertexShader from "./GLSL/ambient.v.glsl?raw";
//@ts-ignore
import ambientFragmentShader from "./GLSL/ambient.f.glsl?raw";

/*******************************************************************************
 * Main Code
 ******************************************************************************/

/**
 * Setup
 */

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

const scene = new THREE.Scene();

//Create Settings
const settings = new Settings();

/**
 * Objects
 */

// Geometry
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 32);

//Declare Uniforms
const uniforms: { [uniform: string]: THREE.IUniform } = {
  uResolution: {
    value: new THREE.Vector2(sizes.width, sizes.height),
  },
  uTime: { value: 0.0 },
  uLight: {
    value: new THREE.Vector3(0, 1, 1),
  },
  uAmbientColor: { value: new THREE.Color(settings.ambient_color) },
  uAmbientReflectance: { value: 0.5 },
  uDiffuseColour: { value: new THREE.Color(settings.diffuse_color) },
  uDiffuseReflectance: { value: 1 },
  uSpecColour: { value: new THREE.Color(settings.specular_color) },
  uSpecReflectance: { value: 1 },
  uSpecMag: { value: 128 },
};

//Material
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: ambientVertexShader,
  fragmentShader: ambientFragmentShader,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Let there b light
 */
let light: THREE.Mesh;

// add light proxy
var lightgeo = new THREE.SphereGeometry(0.1, 32, 32);
var lightMaterial = new THREE.MeshBasicMaterial({ color: 0xff8010 });
light = new THREE.Mesh(lightgeo, lightMaterial);
light.position.set(settings.lightX, settings.lightY, settings.lightZ);
scene.add(light);

//Create GUI after objects
const guiInstance = new GUI(material, uniforms, settings, light);
console.log(guiInstance);

/**
 * Resize
 */

const onWindowResize = () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", onWindowResize);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, -0.25, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
// const clock = new THREE.Clock();

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  //Pass Time
  // mesh.material.uniforms.uTime.value = elapsedTime

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
