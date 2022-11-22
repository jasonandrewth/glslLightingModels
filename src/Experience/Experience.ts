import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";

import Camera from "./Camera";
import Renderer from "./Renderer";

import World from "./World/World.js";

let instance: Experience | null = null;

export default class Experience {
  canvas: HTMLCanvasElement;
  sizes: Sizes;
  time: Time;
  scene: THREE.Scene;
  camera: Camera;
  renderer: Renderer;
  world: World;
  resources: Resources;

  constructor(canvas?: HTMLCanvasElement) {
    // Singleton
    if (instance) {
      return instance;
    }

    instance = this;

    // Global access
    //@ts-ignore
    window.experience = this;

    // Options

    if (canvas) {
      this.canvas = canvas;
    }

    //Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
}
