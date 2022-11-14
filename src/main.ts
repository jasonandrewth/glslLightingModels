/**
 * This is my minimal three.js boilerplate
 *
 **/

// External dependencies.
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/*******************************************************************************
 * Defines Settings and GUI.
 ******************************************************************************/

// Create GUI given a Settings object.
function createGUI(): dat.GUI {
  const gui: dat.GUI = new dat.GUI();

  return gui;
}

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

/**
 * Objects
 */

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

//Material
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Let there b light
 */

const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(3, 3, 3);
scene.add(pointLight);

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);

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

//Create GUI
createGUI();
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
